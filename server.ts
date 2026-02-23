import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  app.use(express.json());

  app.post("/api/ai/requirements", async (req, res) => {
    try {
      const { prompt } = req.body;
      const model = "gemini-2.0-flash";

      const systemInstruction = `You are an expert SDV (Software Defined Vehicle) Systems Engineer. 
      Your goal is to help users define vehicle features into structured requirements compliant with ISO 26262 and ASPICE.
      Ask clarifying questions about safety levels (ASIL), performance, and hardware constraints.
      Return responses in a helpful, professional tone.`;

      const chat = ai.chats.create({
        model,
        config: { systemInstruction }
      });

      const response = await chat.sendMessage({ message: prompt });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/ai/code", async (req, res) => {
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

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Mock telemetry data stream endpoint (simulated)
  app.get("/api/telemetry", (req, res) => {
    const data = {
      speed: Math.floor(Math.random() * 120),
      battery: Math.floor(Math.random() * 100),
      temp: 20 + Math.random() * 10,
      timestamp: new Date().toISOString()
    };
    res.json(data);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Tata Elxsi Teliport DEMO Server running on http://localhost:${PORT}`);
  });
}

startServer();
