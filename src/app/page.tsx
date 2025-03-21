"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
    const router = useRouter();

    const goToChat = () => {
        router.push("/chat");
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="mb-8 text-4xl font-bold">
                Welcome to Anonymous AI Assistant
            </h1>
            <button
                onClick={goToChat}
                className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
                Chat Now
            </button>
        </main>
    );
}
