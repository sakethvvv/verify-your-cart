import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";
import { mockAnalyzeProduct } from "./mockAnalysisService";

// ✅ VITE-SAFE environment variable (FRONTEND)
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

// TEMP: confirm env injection (remove later if you want)
console.log("API KEY:", apiKey);

// Initialize AI only if key exists
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Analyzes a product URL to determine if it's fake or genuine.
 */
export const analyzeProduct = async (url: string): Promise<AnalysisResult> => {
  // ✅ Fallback if API key missing
  if (!apiKey || !ai) {
    console.warn("API Key missing. Using Mock Analysis Service.");
    return mockAnalyzeProduct(url);
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: `
You are an expert "Fake Online Product Detector" AI.

Analyze this product URL: ${url}

Rules:
- Trusted domains → high trust
- Fake domains / typos → mark Fake
- Extremely low price → Suspicious/Fake

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
    response.candidates?.[0]?.groundingMetadata?.groundingChunks?.forEach(
      (chunk: any) => {
        if (chunk.web?.uri) sources.push(chunk.web.uri);
      }
    );

    let verdict: AnalysisResult["verdict"] = "Suspicious";
    const v = (result.verdict || "").toLowerCase();
    if (v.includes("genuine")) verdict = "Genuine";
    else if (v.includes("fake")) verdict = "Fake";

    return {
      trust_score: result.trust_score ?? 0,
      verdict,
      reasons: result.reasons ?? ["Analysis based on domain reputation."],
      advice: result.advice ?? "Proceed with caution.",
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
    console.error("AI Analysis Failed:", error);
    return mockAnalyzeProduct(url);
  }
};
