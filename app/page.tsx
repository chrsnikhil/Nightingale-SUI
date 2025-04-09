"use client";
import TextPressure from '@/components/TextPressure';
import GridDistortion from '@/components/GridDistortion';
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-['Press_Start_2P']">
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
            fontFamily="Press Start 2P"
            className="text-center"
          />
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <Link href="/game">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-200 transition-colors"
              >
                Play
              </motion.button>
            </Link>
            <Link href="/store">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-200 transition-colors"
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
        <section id="game" className="relative min-h-screen flex items-center py-16">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/12.jpg"
              alt="Game Background"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Godot Game</h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Experience our immersive game built with Godot Engine. 
                Battle against other players, collect unique NFTs, and earn rewards.
              </p>
            </div>
            <div className="w-full h-64 md:h-96">
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
        <section id="wager" className="relative min-h-screen flex items-center py-16">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/12.jpg"
              alt="Wager Background"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 w-full h-64 md:h-96">
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
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Wager System</h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Our innovative wager system allows you to bet SUI tokens on matches.
                Win big with our secure and transparent smart contracts.
              </p>
            </div>
          </div>
        </section>

        {/* NFT Store Section */}
        <section id="store" className="relative min-h-screen flex items-center py-16">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/12.jpg"
              alt="Store Background"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">NFT Store</h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Browse and purchase unique NFTs in our marketplace.
                Each NFT is a one-of-a-kind digital asset on the Sui blockchain.
              </p>
            </div>
            <div className="w-full h-64 md:h-96">
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
        <section id="team" className="relative min-h-screen flex items-center py-16">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/12.jpg"
              alt="Team Background"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 py-12 space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
              <p className="text-gray-300 text-sm md:text-base">
                Meet the talented individuals behind this project
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="h-64 md:h-80">
                <CardContainer className="w-full h-full">
                  <CardBody className="bg-transparent">
                    <CardItem
                      translateZ="100"
                      className="w-full h-full relative rounded-xl overflow-hidden group"
                    >
                      <Image
                        src="/12.jpg"
                        alt="John Doe"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                        <h3 className="text-lg md:text-xl font-bold text-white">John Doe</h3>
                        <p className="text-gray-300 text-xs md:text-sm">Lead Developer</p>
                      </div>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
              
              {/* Team Member 2 */}
              <div className="h-64 md:h-80">
                <CardContainer className="w-full h-full">
                  <CardBody className="bg-transparent">
                    <CardItem
                      translateZ="100"
                      className="w-full h-full relative rounded-xl overflow-hidden group"
                    >
                      <Image
                        src="/12.jpg"
                        alt="Jane Smith"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                        <h3 className="text-lg md:text-xl font-bold text-white">Jane Smith</h3>
                        <p className="text-gray-300 text-xs md:text-sm">Game Designer</p>
                      </div>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
              
              {/* Team Member 3 */}
              <div className="h-64 md:h-80 sm:col-span-2 lg:col-span-1 sm:mx-auto lg:mx-0 sm:w-1/2 lg:w-full">
                <CardContainer className="w-full h-full">
                  <CardBody className="bg-transparent">
                    <CardItem
                      translateZ="100"
                      className="w-full h-full relative rounded-xl overflow-hidden group"
                    >
                      <Image
                        src="/12.jpg"
                        alt="Mike Johnson"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                        <h3 className="text-lg md:text-xl font-bold text-white">Mike Johnson</h3>
                        <p className="text-gray-300 text-xs md:text-sm">Blockchain Expert</p>
                      </div>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
