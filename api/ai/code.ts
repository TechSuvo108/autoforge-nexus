import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { requirement, language = 'python' } = req.body;
        const model = "gemini-2.0-flash";

        const prompt = `Generate a MISRA-compliant ${language} microservice for the following SDV requirement:
    "${requirement}"
    
    Include:
    1. The code implementation.
    2. RAG Citations (simulated) for MISRA rules applied.
    3. A brief explanation of the architecture.
    
    Format the output as Markdown.`;

        const response = await ai.models.generateContent({
            model,
            contents: prompt
        });

        res.status(200).json({ text: response.text });
    } catch (error: any) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: error.message || 'An error occurred during API request' });
    }
}
