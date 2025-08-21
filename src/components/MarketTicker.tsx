import { useState, useEffect } from 'react';

interface MarketData {
  currency: string;
  value: number;
  change: number;
  symbol: string;
}

const MarketTicker = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { currency: 'USD', value: 97.45, change: +0.32, symbol: '$' },
    { currency: 'EUR', value: 105.78, change: -0.15, symbol: '€' },
    { currency: 'CNY', value: 13.42, change: +0.08, symbol: '¥' },
    { currency: 'Золото', value: 7850.00, change: +125.50, symbol: '🥇' },
    { currency: 'Платина', value: 3145.00, change: -45.20, symbol: '⚪' },
    { currency: 'Серебро', value: 98.75, change: +2.30, symbol: '🥈' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => ({
        ...item,
        value: item.value + (Math.random() - 0.5) * 2,
        change: (Math.random() - 0.5) * 5
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 overflow-hidden relative">
      <div className="animate-scroll flex whitespace-nowrap">
        {[...marketData, ...marketData].map((item, index) => (
          <div key={index} className="flex items-center mx-8 min-w-0">
            <span className="mr-2 text-lg">{item.symbol}</span>
            <span className="font-semibold mr-2">{item.currency}:</span>
            <span className="mr-2">{item.value.toFixed(2)} ₽</span>
            <span className={`text-sm ${item.change >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTicker;