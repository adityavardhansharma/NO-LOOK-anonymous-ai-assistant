"use client";
// src/components/Chat.tsx
import React, { useState, FormEvent } from "react";
import ModeSelection, { Mode } from "./ModeSelection";

const Chat: React.FC = () => {
    const [selectedMode, setSelectedMode] = useState<Mode>("General Chat");
    const [prompt, setPrompt] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError("");
        setResponse("");

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt, mode: selectedMode })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setResponse(data.response);
        } catch (err: any) {
            console.error("Error submitting chat:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to get a response. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Anonymous AI Assistant</h1>
            <div className="mb-6">
                <ModeSelection
                    selectedMode={selectedMode}
                    onModeChange={setSelectedMode}
                />
            </div>
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                    <label htmlFor="prompt" className="block mb-2 font-medium">
                        Your Question:
                    </label>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full p-2 border rounded-md h-32 resize-none"
                        placeholder="Type your question here..."
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                >
                    {isLoading ? "Getting Response..." : "Submit"}
                </button>
            </form>
            {error && (
                <div className="p-4 bg-red-100 border border-red-500 text-red-700 rounded-md">
                    {error}
                </div>
            )}
            {response && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Response:</h2>
                    <div className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap">
                        {response}
                    </div>
                </div>
            )}
            <div className="mt-8 text-sm text-gray-500">
                <p>
                    <strong>Privacy Notice:</strong> No data is stored on our servers.
                </p>
            </div>
        </div>
    );
};

export default Chat;
