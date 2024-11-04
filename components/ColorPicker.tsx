"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = [
  "#FF69B4", // Hot Pink
  "#FF1493", // Deep Pink
  "#FF4500", // Orange Red
  "#9370DB", // Medium Purple
  "#4169E1", // Royal Blue
  "#32CD32", // Lime Green
  "#FFD700", // Gold
  "#FF8C00", // Dark Orange
];

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2">
        {COLORS.map((c) => (
          <button
            key={c}
            className={cn(
              "w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2",
              color === c && "ring-2 ring-offset-2"
            )}
            style={{ backgroundColor: c }}
            onClick={() => onChange(c)}
          >
            {color === c && (
              <Check className="w-4 h-4 mx-auto text-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}