// src/lib/prependPrompt.ts
import { Mode } from "@/components/ModeSelection";

/**
 * Returns the complete prompt with a mode-specific prefix.
 * @param userPrompt - The user's original message.
 * @param mode - The selected assistant mode.
 * @returns The modified prompt.
 */
export function prependPrompt(userPrompt: string, mode: Mode): string {
    const promptPrefixes: Record<Mode, string> = {
        Legal:
            "You are a helpful legal assistant. Only answer questions about law and legal topics. Do not provide legal advice. User question: ",
        Medical:
            "You are a helpful medical assistant. Only answer questions about medicine and medical topics. Do not provide medical advice. User question: ",
        "Study Research":
            "You are a helpful assistant for study and academic research. Only answer questions about study techniques and academic research. User question: ",
        "General Chat":
            "You are a general assistant. Answer any question to the best of your ability. User question: "
    };

    return promptPrefixes[mode] + userPrompt;
}
