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
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 pointer-events-auto">
        <GridDistortion
          imageSrc="/12.jpg"
          grid={15}
          mouse={0.15}
          strength={0.1}
          relaxation={0.95}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10 p-8 pointer-events-none">
        <div className="w-1/2 flex justify-center items-center pointer-events-auto">
          <TextPressure
            text="Knightingale"
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
          <Link href="/store">
            <Button className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6">
              Visit Store
            </Button>
          </Link>
          <Link href="/game">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-blue-500 text-white hover:bg-blue-600 text-lg px-8 py-6">
                Play Game
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
