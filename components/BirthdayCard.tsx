"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Cake, Heart, Music, PartyPopper, Stars } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BirthdayCardProps {
  name: string;
  color: string;
  onBack: () => void;
}

export default function BirthdayCard({ name, color, onBack }: BirthdayCardProps) {
  const icons = [PartyPopper, Cake, Stars, Music, Heart];
  
  return (
    <motion.div
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color}22, ${color}44)`,
      }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>

      <div className="p-8 md:p-12 text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center space-x-4"
        >
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Icon
                className="w-8 h-8 md:w-10 md:h-10"
                style={{ color }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-bold">
            Happy Birthday,
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${color}, ${color}dd)`,
              }}
            >
              {name}!
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300"
          >
            Wishing you a day filled with joy, laughter, and unforgettable moments!
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9, type: "spring" }}
          className="relative"
        >
          <div
            className="absolute inset-0 blur-xl opacity-30"
            style={{ backgroundColor: color }}
          />
          <p className="relative text-lg md:text-xl font-medium">
            May all your dreams and wishes come true! 🎉
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}