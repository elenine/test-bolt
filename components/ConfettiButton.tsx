"use client";

import { useCallback } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfettiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  density?: number;
}

export default function ConfettiButton({
  children,
  className,
  density = 50,
  onClick,
  ...props
}: ConfettiButtonProps) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const count = density * 0.7;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      scalar: 0.8,
    });

    fire(0.2, {
      spread: 60,
      scalar: 1.2,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      scalar: 1.2,
    });

    onClick?.(e);
  }, [density, onClick]);

  return (
    <Button
      onClick={handleClick}
      className={cn("bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white", className)}
      {...props}
    >
      {children}
    </Button>
  );
}