"use client";

import { useState, useEffect } from 'react';

export function EthPrice() {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEth, setIsEth] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setPrice(data.ethereum.usd);
      } catch (error) {
        console.error('Error fetching price:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 6000); // Update every 6 seconds
    return () => clearInterval(interval);
  }, []);

  const toggleToken = () => {
    setIsEth(!isEth);
  };

  const chilePrice = price ? (100 / 100000) * price : null; // Calculate CHILE price based on treasury value

  return (
    <div className="flex items-center space-x-2 text-white">
      {loading ? (
        <span>Loading...</span>
      ) : (
        <span className="animate-fade-in-down relative group" onClick={toggleToken} style={{ cursor: 'pointer' }}>
          <img src={isEth ? "/ethicon.jpg" : "/chiletokenicon.png"} alt={isEth ? "ETH" : "CHILE"} className="inline-block w-4 h-4 mr-1" />
          <span className="text-white font-semibold">${isEth ? price?.toFixed(2) : chilePrice?.toFixed(2)} USD</span>
          <span className={`absolute top-full left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity ${isEth ? 'max-w-xs' : 'max-w-2xl'} mt-2`}>
            {isEth ? "Live price of ETH/USD pair from CoinGecko" : "Native token of ChileDAO, today's price based on liquid capital in treasury on Colony (Arbitrum chain)"}
          </span>
        </span>
      )}
    </div>
  );
} 