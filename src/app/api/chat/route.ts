// src/app/api/chat/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {Groq} from "groq-sdk";
import { prependPrompt } from "@/lib/prependPrompt";
import { Mode } from "@/components/ModeSelection";

interface RequestData {
    prompt: string;
    mode: Mode;
}

export async function POST(request: NextRequest) {
    try {
        const body: RequestData = await request.json();
        const { prompt, mode } = body;

        if (!prompt || !mode) {
            return NextResponse.json(
                { response: "", error: "Prompt and mode are required." },
                { status: 400 }
            );
        }

        // Prepend the mode-specific prompt text
        const fullPrompt = prependPrompt(prompt, mode);

        // Initialize the Groq client with the API key from the environment
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });

        // Send the request to the Groq API
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: fullPrompt }],
            model: "llama3-70b-8192", // Adjust the model if necessary
            temperature: 0.7,
            max_tokens: 2048
        });

        const responseText =
            completion.choices[0]?.message?.content || "No response";

        return NextResponse.json({ response: responseText });
    } catch (error: any) {
        console.error("Error processing chat request:", error);
        return NextResponse.json(
            {
                response: "",
                error:
                    error.message ||
                    "Failed to process your request. Please try again."
            },
            { status: 500 }
        );
    }
}
