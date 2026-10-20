
import { GoogleGenAI, Type } from "@google/genai";
import { AuditResult, KeywordRecommendation, OffPageStrategy, TechnicalSEOAudit, BlogPost, CompetitorComparison } from "../types";

const API_KEY = process.env.GEMINI_API_KEY || '';

export const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const performSEOAudit = async (content: string): Promise<AuditResult> => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following web content for On-Page SEO performance and provide a detailed audit in JSON format: \n\n${content}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          readability: { type: Type.STRING },
          tone: { type: Type.STRING },
          keywordsFound: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                priority: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const generateBlogPost = async (topic: string, keywords: string[]): Promise<BlogPost> => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Write a high-ranking professional SEO blog post about "${topic}". Use these keywords: ${keywords.join(', ')}. Include an optimized title, full content in markdown, a meta description, and a list of H2/H3 headings used. Return JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.STRING },
          metaDescription: { type: Type.STRING },
          slug: { type: Type.STRING },
          headings: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const compareCompetitors = async (myDomain: string, compDomain: string): Promise<CompetitorComparison[]> => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Compare the SEO performance of ${myDomain} vs ${compDomain}. Provide a simulated comparison of metrics like Domain Authority, Organic Traffic Share, Keyword Overlap, and Backlink Profile. Return a JSON array of comparisons.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            metric: { type: Type.STRING },
            you: { type: Type.STRING },
            competitor: { type: Type.STRING },
            advantage: { type: Type.STRING },
            recommendation: { type: Type.STRING }
          }
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};

export const generateSchema = async (type: string, data: string): Promise<string> => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a valid JSON-LD SEO Schema markup for a ${type} based on this information: "${data}". Return ONLY the JSON-LD code block.`,
  });
  return response.text || '';
};

export const analyzeOffPage = async (niche: string): Promise<OffPageStrategy> => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a comprehensive Off-Page SEO strategy and Guest Post opportunities for the niche: "${niche}". Return as JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          backlinkIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
          guestPostOpportunities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                siteType: { type: Type.STRING },
                authority: { type: Type.STRING },
                pitchAngle: { type: Type.STRING }
              }
            }
          },
          socialSignals: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const analyzeTechnicalSEO = async (domainInfo: string): Promise<TechnicalSEOAudit[]> => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Perform a simulated Technical SEO audit for: "${domainInfo}". Return JSON array.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING },
            area: { type: Type.STRING },
            issue: { type: Type.STRING },
            solution: { type: Type.STRING }
          }
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};

export const generateKeywords = async (topic: string): Promise<KeywordRecommendation[]> => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 10 SEO keyword recommendations for the topic: "${topic}". Return JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            keyword: { type: Type.STRING },
            volume: { type: Type.STRING },
            difficulty: { type: Type.INTEGER },
            intent: { type: Type.STRING },
            trend: { type: Type.STRING }
          }
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};
