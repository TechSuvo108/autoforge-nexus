import { GoogleGenAI } from "@google/genai";

export class GeminiService {
    private _keys: string[] | null = null;
    private currentKeyIndex: number = 0;
    private _ai: GoogleGenAI | null = null;

    private get keys(): string[] {
        if (!this._keys) {
            const primary = process.env.GEMINI_API_KEY || "";
            const backup1 = process.env.BACKUP_GEMINI_API_KEY || "";
            const backup2 = process.env.BACKUP2_GEMINI_API_KEY || "";

            this._keys = [primary, backup1, backup2].filter(k => k.trim().length > 0);

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

    private rotateKey(): void {
        this.currentKeyIndex = (this.currentKeyIndex + 1) % this.keys.length;
        console.log(`[GeminiService] Rotating to API key index ${this.currentKeyIndex}`);
        this._ai = new GoogleGenAI({ apiKey: this.getCurrentKey() });
    }

    public async generateContent(model: string, contents: any, config?: any): Promise<any> {
        let attempts = 0;
        const maxAttempts = this.keys.length;

        while (attempts < maxAttempts) {
            try {
                return await this.ai.models.generateContent({ model, contents, config });
            } catch (error: any) {
                attempts++;
                if (this.isQuotaError(error)) {
                    console.warn(`[GeminiService] Quota/Rate limit encountered with key index ${this.currentKeyIndex}.`);
                    if (attempts < maxAttempts) {
                        this.rotateKey();
                        continue;
                    } else {
                        console.error("[GeminiService] All API keys have been exhausted for this request.");
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

        while (attempts < maxAttempts) {
            try {
                const chat = this.ai.chats.create({ model, config });
                return await chat.sendMessage({ message });
            } catch (error: any) {
                attempts++;
                if (this.isQuotaError(error)) {
                    console.warn(`[GeminiService] Quota/Rate limit encountered with key index ${this.currentKeyIndex}.`);
                    if (attempts < maxAttempts) {
                        this.rotateKey();
                        continue;
                    } else {
                        console.error("[GeminiService] All API keys have been exhausted for this request.");
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
