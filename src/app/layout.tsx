// src/app/layout.tsx
import "./globals.css";

export const metadata = {
    title: "Anonymous AI Assistant",
    description: "Privacy-focused AI assistant using Groq and Llama-3"
};

export default function RootLayout({
                                       children
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}
