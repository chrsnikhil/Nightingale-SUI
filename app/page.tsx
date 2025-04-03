"use client";
import GridDistortion from '@/components/GridDistortion';
import TextPressure from '@/components/TextPressure';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback } from 'react';

export default function Home() {
  const handlePlayClick = useCallback(() => {
    // Handle play click
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <div className="absolute inset-0 pointer-events-auto">
        <GridDistortion
          imageSrc="/12.jpg"
          grid={15}
          mouse={0.15}
          strength={0.1}
          relaxation={0.95}
          className="w-full h-full"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10 p-8 pointer-events-none">
        <div className="w-1/2 flex justify-center items-center pointer-events-auto">
          <TextPressure
            text="Nightingale"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={16}
          />
        </div>
        <div className="flex gap-4 pointer-events-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white text-black rounded-lg font-medium"
          >
            Play
          </motion.button>
          <Link href="/store">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white text-black rounded-lg font-medium"
            >
              Store
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}
