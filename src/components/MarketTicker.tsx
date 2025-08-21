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
    <div className="bg-blue-700 text-white py-3 overflow-hidden">
      <div className="animate-scroll flex whitespace-nowrap items-center">
        {[...marketData, ...marketData].map((item, index) => (
          <div key={index} className="flex items-center mx-6 text-sm font-medium">
            <span className="mr-2 text-base">{item.symbol}</span>
            <span className="font-bold mr-2 text-white">{item.currency}:</span>
            <span className="mr-2 text-white">{item.value.toFixed(2)} ₽</span>
            <span className={`font-semibold ${item.change >= 0 ? 'text-green-200' : 'text-red-200'}`}>
              {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTicker;