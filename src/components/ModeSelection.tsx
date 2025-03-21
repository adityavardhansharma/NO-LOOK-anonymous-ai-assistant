"use client";
// src/components/ModeSelection.tsx
import React, { FC } from "react";

export type Mode = "Legal" | "Medical" | "Study Research" | "General Chat";

interface ModeSelectionProps {
    selectedMode: Mode;
    onModeChange: (mode: Mode) => void;
}

const ModeSelection: FC<ModeSelectionProps> = ({
                                                   selectedMode,
                                                   onModeChange
                                               }) => {
    const modes: Mode[] = ["Legal", "Medical", "Study Research", "General Chat"];

    const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onModeChange(e.target.value as Mode);
    };

    return (
        <div className="mode-selection">
            <label htmlFor="mode-selector" className="block mb-2 font-medium">
                Select Assistant Mode:
            </label>
            <select
                id="mode-selector"
                value={selectedMode}
                onChange={handleModeChange}
                className="w-full p-2 border rounded-md bg-white"
            >
                {modes.map((mode) => (
                    <option key={mode} value={mode}>
                        {mode}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ModeSelection;
