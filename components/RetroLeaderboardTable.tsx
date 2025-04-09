import { motion } from "framer-motion";
import React from "react";

export default function RetroLeaderboardTable() {
  const playerData = [
    { rank: 1, player: "0x6f...3a2e", wagers: 15, winRate: "85%", totalWon: "45.5 SUI" },
    { rank: 2, player: "0x4d...8b1c", wagers: 12, winRate: "75%", totalWon: "32.2 SUI" },
    { rank: 3, player: "0x2a...9f4d", wagers: 18, winRate: "72%", totalWon: "28.7 SUI" },
    { rank: 4, player: "0x8c...5e3f", wagers: 10, winRate: "70%", totalWon: "25.1 SUI" },
    { rank: 5, player: "0x1b...7d2a", wagers: 8, winRate: "65%", totalWon: "18.9 SUI" }
  ];

  return (
    <div className="bg-black p-8 rounded-lg border border-black max-w-4xl mx-auto overflow-hidden">
      <div className="mb-6">
        <h2 className="text-white text-2xl font-press-start-2p">Top Players</h2>
      </div>
      <p className="text-gray-400 mb-8 font-press-start-2p">Check out the top performers in the game</p>
      
      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="pb-4 px-4 text-gray-400 font-press-start-2p w-1/6">Rank</th>
              <th className="pb-4 px-4 text-gray-400 font-press-start-2p w-2/6">Player</th>
              <th className="pb-4 px-4 text-gray-400 font-press-start-2p w-1/6">Wagers</th>
              <th className="pb-4 px-4 text-gray-400 font-press-start-2p w-1/6">Win Rate</th>
              <th className="pb-4 px-4 text-gray-400 font-press-start-2p w-1/6">Total Won</th>
            </tr>
          </thead>
          <tbody>
            {playerData.map((player, index) => (
              <motion.tr
                key={player.rank}
                className="border-b border-gray-800/50 hover:bg-gray-900/30 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="py-4 px-4 text-white font-press-start-2p">#{player.rank}</td>
                <td className="py-4 px-4 text-white font-press-start-2p">{player.player}</td>
                <td className="py-4 px-4 text-white font-press-start-2p">{player.wagers}</td>
                <td className="py-4 px-4 text-green-400 font-press-start-2p">{player.winRate}</td>
                <td className="py-4 px-4 text-yellow-400 font-press-start-2p">{player.totalWon}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 