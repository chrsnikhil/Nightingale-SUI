import React from "react";

export default function GameControlsPopup() {
  return (
    <div className="bg-black p-8 rounded-lg border border-gray-800 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-white text-2xl font-press-start-2p">How to Play</h2>
      </div>
      
      <div className="space-y-6">
        {/* Player 1 Controls */}
        <div>
          <h3 className="text-white text-xl font-press-start-2p mb-4">Player 1 Controls</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-2">
                <span className="text-white font-press-start-2p">W</span>
              </div>
              <span className="text-gray-400 text-sm font-press-start-2p">Up</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-2">
                <span className="text-white font-press-start-2p">A</span>
              </div>
              <span className="text-gray-400 text-sm font-press-start-2p">Left</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-2">
                <span className="text-white font-press-start-2p">S</span>
              </div>
              <span className="text-gray-400 text-sm font-press-start-2p">Down</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-2">
                <span className="text-white font-press-start-2p">D</span>
              </div>
              <span className="text-gray-400 text-sm font-press-start-2p">Right</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-lg p-3 w-24 h-12 flex items-center justify-center mb-2">
                <span className="text-white font-press-start-2p">L Ctrl</span>
              </div>
              <span className="text-gray-400 text-sm font-press-start-2p">Strike</span>
            </div>
          </div>
        </div>

        {/* Player 2 Controls */}
        <div>
          <h3 className="text-white text-xl font-press-start-2p mb-4">Player 2 Controls</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </div>
              <span className="text-gray-400 text-sm font-press-start-2p">Up</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="text-gray-400 text-sm font-press-start-2p">Left</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <span className="text-gray-400 text-sm font-press-start-2p">Down</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <span className="text-gray-400 text-sm font-press-start-2p">Right</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-lg p-3 w-24 h-12 flex items-center justify-center mb-2">
                <span className="text-white font-press-start-2p">R Ctrl</span>
              </div>
              <span className="text-gray-400 text-sm font-press-start-2p">Strike</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 