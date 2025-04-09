"use client";
import '@mysten/dapp-kit/dist/index.css';
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { type ReactNode } from 'react';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-press-start-2p',
});

const queryClient = new QueryClient();
const networks = {
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={pressStart2P.variable}>
      <head>
        <style jsx global>{`
          :root {
            --font-press-start-2p: ${pressStart2P.style.fontFamily};
          }
          body {
            font-family: ${pressStart2P.style.fontFamily};
          }
        `}</style>
      </head>
      <body className={pressStart2P.className}>
        <QueryClientProvider client={queryClient}>
          <SuiClientProvider networks={networks} defaultNetwork="testnet">
            <WalletProvider>
              {children}
            </WalletProvider>
          </SuiClientProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
