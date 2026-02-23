import { GoogleGenAI } from "@google/genai";

export class GeminiService {
    private _keys: string[] | null = null;
    private currentKeyIndex: number = 0;
    private _ai: GoogleGenAI | null = null;

    private get keys(): string[] {
        if (!this._keys) {
            const keysFromEnv = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || "";
            this._keys = keysFromEnv.split(",").map((k) => k.trim()).filter((k) => k.length > 0);
            if (this._keys.length === 0) {
                console.warn("No Gemini API keys found in environment variables.");
            }
        }
        return this._keys;
    }

    private get ai(): GoogleGenAI {
        if (!this._ai) {
            this._ai = new GoogleGenAI({ apiKey: this.getCurrentKey() });
        }
        return this._ai;
    }

    private getCurrentKey(): string {
        return this.keys[this.currentKeyIndex] || "";
    }

    private rotateKey(): boolean {
        if (this.currentKeyIndex < this.keys.length - 1) {
            this.currentKeyIndex++;
            console.log(`[GeminiService] Rotating to API key index ${this.currentKeyIndex}`);
            this._ai = new GoogleGenAI({ apiKey: this.getCurrentKey() });
            return true;
        }
        console.error("[GeminiService] All API keys have been exhausted.");
        return false;
    }

    public async generateContent(model: string, contents: any, config?: any): Promise<any> {
        let attempts = 0;
        const maxAttempts = this.keys.length;

        while (attempts <= maxAttempts) {
            try {
                return await this.ai.models.generateContent({ model, contents, config });
            } catch (error: any) {
                if (this.isQuotaError(error)) {
                    console.warn(`[GeminiService] Quota/Rate limit encountered with key index ${this.currentKeyIndex}.`);
                    if (this.rotateKey()) {
                        attempts++;
                        continue;
                    }
                }
                throw error;
            }
        }
        throw new Error("All Gemini API keys exhausted or rate limited.");
    }

    public async sendMessage(model: string, config: any, message: string): Promise<any> {
        let attempts = 0;
        const maxAttempts = this.keys.length;

        while (attempts <= maxAttempts) {
            try {
                const chat = this.ai.chats.create({ model, config });
                return await chat.sendMessage({ message });
            } catch (error: any) {
                if (this.isQuotaError(error)) {
                    console.warn(`[GeminiService] Quota/Rate limit encountered with key index ${this.currentKeyIndex}.`);
                    if (this.rotateKey()) {
                        attempts++;
                        continue;
                    }
                }
                throw error;
            }
        }
        throw new Error("All Gemini API keys exhausted or rate limited.");
    }

    private isQuotaError(error: any): boolean {
        const status = error?.status;
        const message = error?.message?.toLowerCase() || "";
        return status === 429 || message.includes("quota") || message.includes("rate limit") || message.includes("exhausted");
    }
}

export const geminiService = new GeminiService();
