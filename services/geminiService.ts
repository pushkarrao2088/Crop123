
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBeginnerPlantingPlan = async (data: { soil: string, weather: string, crop: string }) => {
  const prompt = `Act as a senior agricultural consultant for a beginner farmer.
  User Profile:
  - Soil Type: ${data.soil}
  - Current/Expected Weather: ${data.weather}
  - Target Crop: ${data.crop}
  
  Provide a "Perfect Beginner Success Plan" including:
  1. Preparation Checklist (Seeds, Tools, Fertilizers).
  2. Day 1 to Day 30 Critical Milestones.
  3. Irrigation frequency for these conditions.
  4. Top 2 risks to avoid for beginners.
  Format as structured Markdown with bold titles.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return response.text;
};

export const getCropIntelligence = async (cropName: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a comprehensive agricultural profile for "${cropName}". 
    Include:
    1. Seasonality (Kharif/Rabi/Zaid) and specific months.
    2. Harvesting window.
    3. Major Pests & Diseases.
    4. Recommended Pesticides and organic alternatives.
    5. Water requirements.
    Format as structured Markdown with clear headings.`,
  });

  return response.text;
};

export const analyzeSoilHealth = async (data: any) => {
  const prompt = `Act as a friendly local agriculture expert helping a basic farmer understand their soil test.
  
  Current Soil Levels:
  Nitrogen (N - For Greenery): ${data.nitrogen} 
  Phosphorus (P - For Roots): ${data.phosphorus}
  Potassium (K - For Strength): ${data.potassium}
  pH (Sweetness/Sourness): ${data.ph}
  Location: ${data.location}
  
  Please provide a report in very simple, easy-to-understand terms:
  1. Overall Soil Status (e.g., "Your soil is hungry" or "Your soil is strong").
  2. What is missing in simple words (e.g., "Needs more energy for leaves").
  3. Exactly which fertilizers or natural manure (like cow dung) to add.
  4. 3 Crops that will grow very easily in this specific soil.
  5. One "Golden Tip" for a better harvest.
  
  Avoid scientific jargon. Use natural, reassuring language.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return response.text;
};

export const getCropAdvisory = async ({ crop }: { crop: string }) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As an expert agronomist, provide specific agricultural advice for growing "${crop}". 
    Focus on soil preparation, optimal planting time, and yield maximization strategies. 
    Format as natural advice for a farmer.`,
  });

  return response.text;
};

export const getMarketInsights = async (region: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Current market trends, supply/demand gaps, and prices for crops in ${region}. Suggest what farmers should plant next to avoid oversupply based on current trends.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const generateWeatherAlert = async (location: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Get current weather and 3-day forecast for ${location}. Provide 3 specific 'Farmer Action Alerts'.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  return response.text;
};

export const analyzeCropHealth = async (imageBase64: string) => {
  const imagePart = {
    inlineData: { mimeType: 'image/jpeg', data: imageBase64 },
  };
  const textPart = {
    text: `Identify plant and disease. Provide Risk Score (Low/Med/High) and treatment.`
  };
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts: [imagePart, textPart] },
  });
  return response.text;
};
