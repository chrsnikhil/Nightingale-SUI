"use client";

import React from 'react';
import Image from 'next/image';

interface GlossyCardProps {
  imageUrl: string;
  title: string;
  description: string;
  className?: string;
}

const GlossyCard: React.FC<GlossyCardProps> = ({ 
  imageUrl, 
  title, 
  description, 
  className = '' 
}) => {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 ${className}`}>
      <div className="relative aspect-video w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default GlossyCard; 