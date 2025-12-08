"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Pred",
  afterLabel = "Po",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[16/9] cursor-ew-resize overflow-hidden select-none ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After Image (Full) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          className="object-cover grayscale"
          priority
        />
      </div>

      {/* Slider Line */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-gold cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        whileHover={{ scale: 1.1 }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg">
          <div className="flex gap-1">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-charcoal border-b-[6px] border-b-transparent" />
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-charcoal border-b-[6px] border-b-transparent" />
          </div>
        </div>
      </motion.div>

      {/* Label - shows only one based on slider position */}
      {sliderPosition >= 50 ? (
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 px-3 py-1.5 md:px-4 md:py-2 bg-charcoal/80 backdrop-blur-sm text-white text-xs md:text-sm uppercase tracking-wider">
          {beforeLabel}
        </div>
      ) : (
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 px-3 py-1.5 md:px-4 md:py-2 bg-gold text-charcoal text-xs md:text-sm uppercase tracking-wider">
          {afterLabel}
        </div>
      )}
    </div>
  );
}



