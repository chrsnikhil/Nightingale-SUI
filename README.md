# Knightingale

[![Godot Engine](https://img.shields.io/badge/Built%20With-Godot-478CBF?logo=godot-engine&logoColor=white)](https://godotengine.org)
[![Sui Blockchain](https://img.shields.io/badge/Powered%20By-Sui-3E9ADA?logo=blockchain.com&logoColor=white)](https://sui.io)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js-black?logo=next.js)](https://nextjs.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deployed on Netlify](https://img.shields.io/badge/Hosted%20On-Netlify-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com)

**Knightingale** is a competitive two-player local PvP game built with the **Godot Engine** and powered by the **Sui Blockchain**. Players engage in fast-paced battles with real stakes—wagering Suicoins, where the winner takes all.

The project integrates **Mysten Labs' Sui Dapp Kit** for secure wallet connections and uses **on-chain smart contracts** to manage wagers and NFT ownership. A companion web app built with **Next.js** enables smooth wallet interactions and access to an in-game NFT store.

---

## Features

### Local PvP Combat
- Two-player strategic, reflex-based gameplay
- Built in Godot, playable in-browser via WebAssembly
- Balanced mechanics that prioritize skill

### On-Chain Wagering
- Players wager Suicoins before each match
- Autonomous payouts via Move smart contracts
- Transparent, decentralized staking system

### NFT Ownership
- Custom in-game NFTs
- Earn or buy using Suicoins
- Fully minted and verifiable on the Sui Blockchain

### Wallet Integration
- Wallet connection via Sui Dapp Kit
- Smart contract-based interactions
- User-retained control over wagers and assets

### Companion Web Platform
- Built with Next.js
- Wallet dashboard, leaderboard, and NFT store
- Hosted on Netlify for global access

---

## Tech Stack

| Layer         | Tech                              |
|---------------|-----------------------------------|
| Game Engine   | [Godot](https://godotengine.org) (WASM-compatible) |
| Frontend      | [Next.js](https://nextjs.org) (React) |
| Blockchain    | [Sui](https://sui.io)             |
| Smart Contracts | Move                             |
| Wallet Kit    | Mysten Labs’ Sui Dapp Kit         |
| Hosting       | [Netlify](https://www.netlify.com) |
| NFT Minting   | On-chain via Sui Infrastructure   |

---

## Development Challenges

- WebAssembly and Wallet Integration: Syncing browser-based Godot builds with wallet connections and dynamic routing
- Smart Contract Logic: Ensuring secure wager handling and NFT minting logic in Move
- Game and Blockchain State Bridging: Connecting Godot's runtime logic with on-chain contract state

---

## Roadmap

- [ ] Online multiplayer with global matchmaking
- [ ] Wallet-linked global leaderboard with seasonal rewards
- [ ] In-game NFT marketplace for buying, selling, and auctioning
- [ ] Quest and player ranking system powered by smart contracts
- [ ] Mobile deployment for Android and iOS
- [ ] DAO governance for player-driven decisions
- [ ] Sui-backed in-game events and staking incentives

---

## Why Knightingale

Unlike many Web3 games, Knightingale does not treat blockchain as a gimmick. NFTs are just in-game assets. No speculative tokens. No unnecessary collectibles. Just:

- Real-time on-chain wagering
- Verifiable NFT ownership
- Competitive, skill-first gameplay

Knightingale demonstrates how Web3 can enhance, not complicate, gaming experiences.

---


