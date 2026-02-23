import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

async function testKeys() {
    const keysFromEnv = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || "";
    const keys = keysFromEnv.split(",").map((k) => k.trim()).filter((k) => k.length > 0);

    console.log(`Found ${keys.length} keys.`);

    for (let i = 0; i < keys.length; i++) {
        console.log(`Testing key ${i}...`);
        try {
            const ai = new GoogleGenAI({ apiKey: keys[i] });
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: "Hello",
            });
            console.log(`Key ${i} works! Response: ${response.text}`);
        } catch (error: any) {
            console.log(`Key ${i} failed. Status: ${error?.status}, Message: ${error?.message}`);
        }
    }
}

testKeys();
