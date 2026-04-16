import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";
import { mockAnalyzeProduct } from "./mockAnalysisService";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const analyzeProduct = async (url: string): Promise<AnalysisResult> => {
  if (!apiKey || !ai) {
    console.warn("API key missing. Using mock analysis service.");
    return mockAnalyzeProduct(url);
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: `
You are an expert AI assistant for e-commerce risk awareness.

Analyze this product URL: ${url}

Rules:
- This is an educational risk assessment, not a guarantee of authenticity.
- Trusted domains can increase trust score.
- Suspicious domains, typos, unrealistic discounts, poor seller signals, and misleading descriptions should reduce trust.
- If evidence is uncertain, return Suspicious rather than Fake.

Return ONLY JSON.
      `,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            trust_score: { type: Type.NUMBER },
            verdict: { type: Type.STRING },
            breakdown: {
              type: Type.OBJECT,
              properties: {
                reviews: { type: Type.ARRAY, items: { type: Type.STRING } },
                sentiment: { type: Type.ARRAY, items: { type: Type.STRING } },
                price: { type: Type.ARRAY, items: { type: Type.STRING } },
                seller: { type: Type.ARRAY, items: { type: Type.STRING } },
                description: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            reasons: { type: Type.ARRAY, items: { type: Type.STRING } },
            advice: { type: Type.STRING }
          }
        }
      }
    });

    const result = JSON.parse(response.text || "{}");

    const sources: string[] = [];
    response.candidates?.[0]?.groundingMetadata?.groundingChunks?.forEach((chunk: any) => {
      if (chunk.web?.uri) sources.push(chunk.web.uri);
    });

    let verdict: AnalysisResult["verdict"] = "Suspicious";
    const v = (result.verdict || "").toLowerCase();

    if (v.includes("genuine")) verdict = "Genuine";
    else if (v.includes("fake")) verdict = "Fake";

    return {
      trust_score: result.trust_score ?? 0,
      verdict,
      reasons: result.reasons ?? ["Analysis based on domain reputation and listing signals."],
      advice: result.advice ?? "Proceed with caution and verify seller details independently.",
      url,
      timestamp: new Date().toISOString(),
      sources: sources.slice(0, 3),
      breakdown: {
        reviews: result.breakdown?.reviews ?? [],
        sentiment: result.breakdown?.sentiment ?? [],
        price: result.breakdown?.price ?? [],
        seller: result.breakdown?.seller ?? [],
        description: result.breakdown?.description ?? []
      }
    };
  } catch (error) {
    console.error("AI analysis failed:", error);
    return mockAnalyzeProduct(url);
  }
};
