"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Share2, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import BirthdayCard from "@/components/BirthdayCard";
import ConfettiButton from "@/components/ConfettiButton";
import ColorPicker from "@/components/ColorPicker";

export default function Home() {
  const [name, setName] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [cardColor, setCardColor] = useState("#FF69B4");
  const [confettiDensity, setConfettiDensity] = useState(50);
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Birthday Wishes!",
          text: `Check out this birthday greeting I made for ${name}!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Share this link with your friends!",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-950 dark:to-purple-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!showCard ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-xl"
            >
              <div className="text-center space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                  Create Birthday Magic!
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Craft a special birthday message with custom colors and effects
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Birthday Star's Name</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="name"
                      placeholder="Enter name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Palette className="w-4 h-4" />
                    <span>Card Color</span>
                  </Label>
                  <ColorPicker color={cardColor} onChange={setCardColor} />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Confetti Intensity</span>
                  </Label>
                  <Slider
                    value={[confettiDensity]}
                    onValueChange={([value]) => setConfettiDensity(value)}
                    max={100}
                    step={1}
                  />
                </div>

                <ConfettiButton
                  onClick={() => setShowCard(true)}
                  disabled={!name}
                  density={confettiDensity}
                  className="w-full"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Create Birthday Card
                </ConfettiButton>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <BirthdayCard
                name={name}
                color={cardColor}
                onBack={() => setShowCard(false)}
              />
              
              <div className="flex justify-center space-x-4">
                <Button onClick={handleShare} variant="secondary">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button onClick={() => setShowCard(false)} variant="outline">
                  Create Another
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}