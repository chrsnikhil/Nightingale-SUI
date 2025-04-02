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
      <div className="absolute inset-0">
        <GridDistortion
          imageSrc="/12.jpg"
          grid={10}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className="custom-class"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10 p-8">
        <div className="w-1/2 flex justify-center items-center">
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
        <div className="flex gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button 
              variant="default" 
              size="sm"
              onClick={handlePlayClick}
              className="bg-white/10 text-white hover:bg-white/20 border-white/20 px-4 py-2 text-sm font-light tracking-wide"
            >
              Play
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link href="/store">
              <Button 
                variant="default" 
                size="sm"
                className="bg-white/10 text-white hover:bg-white/20 border-white/20 px-4 py-2 text-sm font-light tracking-wide"
              >
                Store
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
