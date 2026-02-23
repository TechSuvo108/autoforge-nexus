import { geminiService } from "../../src/lib/gemini.js";

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { prompt } = req.body;
        const model = "gemini-2.0-flash";

        const systemInstruction = `You are an expert SDV (Software Defined Vehicle) Systems Engineer. 
    Your goal is to help users define vehicle features into structured requirements compliant with ISO 26262 and ASPICE.
    Ask clarifying questions about safety levels (ASIL), performance, and hardware constraints.
    Return responses in a helpful, professional tone.`;

        const response = await geminiService.sendMessage(
            model,
            { systemInstruction },
            prompt
        );
        res.status(200).json({ text: response.text });
    } catch (error: any) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: error.message || 'An error occurred during API request' });
    }
}
