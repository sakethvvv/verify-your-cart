import { AnalysisResult } from "../types";
import { mockAnalyzeProduct } from "./mockAnalysisService";

export const analyzeProduct = async (url: string): Promise<AnalysisResult> => {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data: AnalysisResult = await response.json();
    return data;
  } catch (error) {
    console.warn("API request failed or unavailable, falling back to client heuristic analysis:", error);
    return mockAnalyzeProduct(url);
  }
};

