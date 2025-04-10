"use client";
import TextPressure from '@/components/TextPressure';
import GridDistortion from '@/components/ui/GridDistortion';
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-['Press_Start_2P']">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
  <GridDistortion
            imageSrc="/home.png"
    grid={10}
    mouse={0.1}
    strength={0.15}
    relaxation={0.9}
            className="w-full h-full"
  />
</div>
        <div className="relative z-10 w-full mx-auto px-4">
          <TextPressure 
            text="KNIGHTINGALE"
            fontFamily="Gia Variable"
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
      </section>

      {/* Game Section */}
      <section className="relative min-h-screen flex items-center py-16 bg-[url('/angelicdash.png')] bg-cover bg-center bg-opacity-30">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Godot Game</h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Experience our immersive game built with Godot Engine with a medieval theme. 
              Battle against other players, collect unique NFTs, and earn rewards.
            </p>
          </div>
          <div className="w-full h-64 md:h-96 flex justify-end">
            <CardContainer className="w-full h-full">
              <CardBody className="bg-transparent">
                <CardItem
                  translateZ="100"
                  className="w-full h-full relative rounded-xl overflow-hidden"
                >
                  <Image
                    src="/gamescreen.png"
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
      <section className="relative min-h-screen flex items-center py-16 bg-[url('/betting.png')] bg-cover bg-center bg-opacity-30">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 w-full h-64 md:h-96 flex justify-start">
            <CardContainer className="w-full h-full">
              <CardBody className="bg-transparent">
                <CardItem
                  translateZ="100"
                  className="w-full h-full relative rounded-xl overflow-hidden"
                >
                  <Image
                    src="/wagerscreen.png"
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
      <section className="relative min-h-screen flex items-center py-16 bg-[url('/nft1.png')] bg-cover bg-center bg-opacity-30">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">NFT Store</h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Browse and purchase unique NFTs in our marketplace.
              Each NFT is a one-of-a-kind digital asset on the Sui blockchain.
            </p>
          </div>
          <div className="w-full h-64 md:h-96 flex justify-end">
            <CardContainer className="w-full h-full">
              <CardBody className="bg-transparent">
                <CardItem
                  translateZ="100"
                  className="w-full h-full relative rounded-xl overflow-hidden"
                >
                  <Image
                    src="/storescreen.png"
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
      <section className="relative min-h-screen flex items-center py-16 bg-[url('/nightchat.png')] bg-cover bg-center bg-opacity-30">
        <div className="absolute inset-0 bg-black/50" />
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
                      src="/jerriks.png"
                      alt="John Doe"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-lg md:text-xl font-bold text-white">Jerriks</h3>
                      <p className="text-gray-300 text-xs md:text-sm">Game Dev</p>
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
                      src="/chris.png"
                      alt="Jane Smith"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-lg md:text-xl font-bold text-white">Chris</h3>
                      <p className="text-gray-300 text-xs md:text-sm">Web & Blockchain Dev</p>
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
                      src="/aditya.png"
                      alt="Aditya"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-lg md:text-xl font-bold text-white">Aditya</h3>
                      <p className="text-gray-300 text-xs md:text-sm">Web Dev</p>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}