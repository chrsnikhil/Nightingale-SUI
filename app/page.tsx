"use client";
import TextPressure from '@/components/TextPressure';
import GridDistortion from '@/components/GridDistortion';
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <GridDistortion className="opacity-50" />
      
      {/* Hero Section with TextPressure */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/12.jpg"
            alt="Hero Background"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
          <TextPressure 
            text="KNIGHTINGALE"
            fontFamily="Minecraft"
            className="text-center"
          />
          <div className="flex justify-center gap-8 mt-12">
            <Link href="/game">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-gray-200 transition-colors"
                style={{ fontFamily: 'Minecraft' }}
              >
                Play
              </motion.button>
            </Link>
            <Link href="/store">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-gray-200 transition-colors"
                style={{ fontFamily: 'Minecraft' }}
              >
                Store
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="relative z-10">
        {/* Godot Game Section */}
        <section id="game" className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/12.jpg"
              alt="Game Background"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold" style={{ fontFamily: 'Minecraft' }}>Godot Game</h2>
              <p className="text-gray-300 text-lg" style={{ fontFamily: 'Minecraft' }}>
                Experience our immersive game built with Godot Engine. 
                Battle against other players, collect unique NFTs, and earn rewards.
              </p>
            </div>
            <div className="w-full h-[600px]">
              <CardContainer className="w-full h-full">
                <CardBody className="bg-transparent">
                  <CardItem
                    translateZ="100"
                    className="w-full h-full relative rounded-xl overflow-hidden"
                  >
                    <Image
                      src="/12.jpg"
                      alt="Godot Game"
                      fill
                      className="object-cover"
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </section>

        {/* Wager System Section */}
        <section id="wager" className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/12.jpg"
              alt="Wager Background"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full h-[600px]">
              <CardContainer className="w-full h-full">
                <CardBody className="bg-transparent">
                  <CardItem
                    translateZ="100"
                    className="w-full h-full relative rounded-xl overflow-hidden"
                  >
                    <Image
                      src="/12.jpg"
                      alt="Wager System"
                      fill
                      className="object-cover"
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold" style={{ fontFamily: 'Minecraft' }}>Wager System</h2>
              <p className="text-gray-300 text-lg" style={{ fontFamily: 'Minecraft' }}>
                Our innovative wager system allows you to bet SUI tokens on matches.
                Win big with our secure and transparent smart contracts.
              </p>
            </div>
          </div>
        </section>

        {/* NFT Store Section */}
        <section id="store" className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/12.jpg"
              alt="Store Background"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold" style={{ fontFamily: 'Minecraft' }}>NFT Store</h2>
              <p className="text-gray-300 text-lg" style={{ fontFamily: 'Minecraft' }}>
                Browse and purchase unique NFTs in our marketplace.
                Each NFT is a one-of-a-kind digital asset on the Sui blockchain.
              </p>
            </div>
            <div className="w-full h-[600px]">
              <CardContainer className="w-full h-full">
                <CardBody className="bg-transparent">
                  <CardItem
                    translateZ="100"
                    className="w-full h-full relative rounded-xl overflow-hidden"
                  >
                    <Image
                      src="/12.jpg"
                      alt="NFT Store"
                      fill
                      className="object-cover"
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/12.jpg"
              alt="Team Background"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 py-20 space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Minecraft' }}>Our Team</h2>
              <p className="text-gray-300 text-lg" style={{ fontFamily: 'Minecraft' }}>
                Meet the talented individuals behind this project
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="h-[400px]">
                <CardContainer className="w-full h-full">
                  <CardBody className="bg-transparent">
                    <CardItem
                      translateZ="100"
                      className="w-full h-full relative rounded-xl overflow-hidden"
                    >
                      <Image
                        src="/12.jpg"
                        alt="John Doe"
                        fill
                        className="object-cover"
                      />
                    </CardItem>
                  </CardBody>
                </CardContainer>
                <h3 className="text-2xl font-bold mt-4 text-center" style={{ fontFamily: 'Minecraft' }}>John Doe</h3>
                <p className="text-gray-400 text-center" style={{ fontFamily: 'Minecraft' }}>Lead Developer</p>
              </div>
              <div className="h-[400px]">
                <CardContainer className="w-full h-full">
                  <CardBody className="bg-transparent">
                    <CardItem
                      translateZ="100"
                      className="w-full h-full relative rounded-xl overflow-hidden"
                    >
                      <Image
                        src="/12.jpg"
                        alt="Jane Smith"
                        fill
                        className="object-cover"
                      />
                    </CardItem>
                  </CardBody>
                </CardContainer>
                <h3 className="text-2xl font-bold mt-4 text-center" style={{ fontFamily: 'Minecraft' }}>Jane Smith</h3>
                <p className="text-gray-400 text-center" style={{ fontFamily: 'Minecraft' }}>Game Designer</p>
              </div>
              <div className="h-[400px]">
                <CardContainer className="w-full h-full">
                  <CardBody className="bg-transparent">
                    <CardItem
                      translateZ="100"
                      className="w-full h-full relative rounded-xl overflow-hidden"
                    >
                      <Image
                        src="/12.jpg"
                        alt="Mike Johnson"
                        fill
                        className="object-cover"
                      />
                    </CardItem>
                  </CardBody>
                </CardContainer>
                <h3 className="text-2xl font-bold mt-4 text-center" style={{ fontFamily: 'Minecraft' }}>Mike Johnson</h3>
                <p className="text-gray-400 text-center" style={{ fontFamily: 'Minecraft' }}>Blockchain Expert</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
