import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateRequirements(prompt: string, history: any[] = []) {
  const model = "gemini-3.1-pro-preview";
  
  const systemInstruction = `You are an expert SDV (Software Defined Vehicle) Systems Engineer. 
  Your goal is to help users define vehicle features into structured requirements compliant with ISO 26262 and ASPICE.
  Ask clarifying questions about safety levels (ASIL), performance, and hardware constraints.
  Return responses in a helpful, professional tone.`;

  const chat = ai.chats.create({
    model,
    config: { systemInstruction }
  });

  // In a real app we'd pass history, for now just simple message
  const response = await chat.sendMessage({ message: prompt });
  return response.text;
}

export async function generateCode(requirement: string, language: 'python' | 'cpp' | 'rust' = 'python') {
  const model = "gemini-3.1-pro-preview";
  
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

  return response.text;
}
