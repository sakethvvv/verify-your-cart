import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';
import { mockAnalyzeProduct } from './mockAnalysisService';

// Guideline: The API key must be obtained exclusively from the environment variable process.env.API_KEY.
// We assume process.env.API_KEY is available and valid as per guidelines.
// If process is not defined in types, we declare it to satisfy TypeScript.
declare var process: { env: any };

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes a product URL to determine if it's fake or genuine.
 * Uses Google Gemini AI with Search Grounding for accuracy.
 */
export const analyzeProduct = async (url: string): Promise<AnalysisResult> => {
    // 1. If no valid API Key is found, use the Mock Logic
    if (!process.env.API_KEY || process.env.API_KEY === "PLACEHOLDER_API_KEY") {
        console.warn("API Key missing. Using Mock Analysis Service.");
        return mockAnalyzeProduct(url);
    }

    try {
        // 2. Real AI Analysis with Search Tool
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp', // Use latest experimental for best reasoning
            contents: `You are an expert "Fake Online Product Detector" AI. Your job is to protect users from scams by verifying e-commerce URLs.

            Analyze this product URL: ${url}
            
            Use Google Search to verify:
            1. Is the domain legitimate (e.g., amazon.com vs amazon-cheap-deals.com)?
            2. Does the product exist at this price point elsewhere?
            3. Are there scam reports for this specific seller or website?

            STRICT ANALYSIS RULES:
            - If the URL is from a major, trusted retailer (Amazon, Flipkart, BestBuy, Apple, Nike, Myntra, Ajio) AND the domain is correct: Start with a high trust score (>85). Only flag as "Risky" if the price is impossibly low (e.g. iPhone 15 for $100) or the specific seller page has bad reputation.
            - If the URL is a new domain, uses a strange TLD (.xyz, .top), or mimics a brand (typosquatting): Flag as "Likely Fake" immediately.
            - If you cannot access the specific product page details, rely on the domain reputation and URL structure.

            Perform the following checks for the output:
            
            1. Reviews & Ratings: Look for patterns of fake reviews or copy-paste text.
            2. Review Sentiment: Does the text match the star rating?
            3. Price Analysis: Is it significantly lower (>50%) than market average?
            4. Seller Trust: Is the seller new? Do they have a profile?
            5. Product Description: Is it generic, copied, or poorly written?

            Return a detailed JSON object.
            `,
            config: {
                tools: [{googleSearch: {}}],
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        trust_score: { type: Type.NUMBER, description: "Confidence Score 0-100" },
                        verdict: { type: Type.STRING, description: "Must be exactly: 'Genuine', 'Suspicious', or 'Fake'" },
                        breakdown: {
                            type: Type.OBJECT,
                            properties: {
                                reviews: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Findings about reviews/ratings" },
                                sentiment: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Findings about sentiment mismatch" },
                                price: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Findings about price comparison" },
                                seller: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Findings about seller reputation" },
                                description: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Findings about product text quality" }
                            }
                        },
                        reasons: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 short summary reasons" },
                        advice: { type: Type.STRING, description: "Final recommendation for the user" }
                    }
                }
            }
        });

        const result = JSON.parse(response.text || "{}");
        
        // Extract grounding chunks (sources) if available
        const sources: string[] = [];
        if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
            response.candidates[0].groundingMetadata.groundingChunks.forEach((chunk: any) => {
                if (chunk.web?.uri) {
                    sources.push(chunk.web.uri);
                }
            });
        }

        // Map the verbose verdict to our internal types
        let mappedVerdict: AnalysisResult['verdict'] = 'Suspicious';
        const v = result.verdict?.toLowerCase() || '';
        if (v.includes('genuine') || v.includes('safe')) mappedVerdict = 'Genuine';
        else if (v.includes('fake')) mappedVerdict = 'Fake';
        else mappedVerdict = 'Suspicious';

        // Ensure breakdown arrays exist even if AI returned null
        const safeBreakdown = {
            reviews: result.breakdown?.reviews || ["Analysis of reviews inconclusive."],
            sentiment: result.breakdown?.sentiment || ["Sentiment analysis unavailable."],
            price: result.breakdown?.price || ["Price comparison unavailable."],
            seller: result.breakdown?.seller || ["Seller details not found."],
            description: result.breakdown?.description || ["Description check passed."]
        };

        return {
            trust_score: result.trust_score || 0,
            verdict: mappedVerdict,
            reasons: result.reasons || ["Analysis completed based on domain reputation."],
            advice: result.advice || "Proceed with caution and verify independently.",
            url: url,
            timestamp: new Date().toISOString(),
            sources: sources.slice(0, 3), // Limit to top 3 sources
            breakdown: safeBreakdown
        };

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        // Fallback to mock if API fails
        return mockAnalyzeProduct(url);
    }
};