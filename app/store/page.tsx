"use client";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NFT_DATA = [
  {
    id: 1,
    name: "Cosmic Explorer",
    price: "0.5 SUI",
    image: "/12.jpg",
    description: "A journey through the cosmos",
  },
  {
    id: 2,
    name: "Digital Dreamer",
    price: "0.3 SUI",
    image: "/12.jpg",
    description: "Where reality meets imagination",
  },
  {
    id: 3,
    name: "Neon Warrior",
    price: "0.7 SUI",
    image: "/12.jpg",
    description: "Fight in the digital realm",
  },
  {
    id: 4,
    name: "Pixel Pioneer",
    price: "0.4 SUI",
    image: "/12.jpg",
    description: "Leading the pixel revolution",
  },
  {
    id: 5,
    name: "Cyber Samurai",
    price: "0.6 SUI",
    image: "/12.jpg",
    description: "Ancient warrior in a digital world",
  },
  {
    id: 6,
    name: "Quantum Artist",
    price: "0.8 SUI",
    image: "/12.jpg",
    description: "Creating art in multiple dimensions",
  },
  {
    id: 7,
    name: "Virtual Voyager",
    price: "0.9 SUI",
    image: "/12.jpg",
    description: "Exploring digital frontiers",
  },
  {
    id: 8,
    name: "Neon Nomad",
    price: "0.6 SUI",
    image: "/12.jpg",
    description: "Wandering through cyberspace",
  },
  {
    id: 9,
    name: "Digital Dancer",
    price: "0.7 SUI",
    image: "/12.jpg",
    description: "Moving through the matrix",
  },
];

export default function StorePage() {
  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            NFT Store
          </h1>
          <p className="text-gray-400 text-sm">Discover unique digital collectibles</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {NFT_DATA.map((nft) => (
            <CardContainer 
              key={nft.id} 
              className="w-full"
              containerClassName="w-full"
            >
              <CardBody className="bg-black relative group/card hover:shadow-2xl hover:shadow-gray-500/[0.1] border-gray-800 w-auto h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-white"
                >
                  <div className="relative w-full h-40 mb-4 overflow-hidden rounded-xl bg-gray-900">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover rounded-xl group-hover/card:shadow-xl"
                    />
                  </div>
                </CardItem>
                <CardItem
                  as="h3"
                  translateZ="60"
                  className="text-lg font-bold mb-2 text-white"
                >
                  {nft.name}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-gray-400 text-sm max-w-sm mb-4 line-clamp-2"
                >
                  {nft.description}
                </CardItem>
                <div className="flex justify-between items-center mt-4">
                  <CardItem
                    translateZ={20}
                    translateX={-10}
                    as="span"
                    className="text-base font-bold text-white"
                  >
                    {nft.price}
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    translateX={10}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:scale-105 transition-transform hover:bg-gray-200"
                  >
                    Buy Now
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </div>
  );
} 