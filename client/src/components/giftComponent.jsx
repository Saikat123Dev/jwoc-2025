import { Award, Gift, Medal, Trophy } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from './ui/card';

const PrizeCards = () => {
  const prizes = [
    {
      rank: "First Prize",
      icon: <Trophy className="w-12 h-12 text-cyan-400" />,
      description: "Exclusive Mystery Box",
      bgGradient: "bg-gradient-to-br from-cyan-200 via-cyan-100 to-blue-200",
      borderColor: "border-cyan-400",
      glowColor: "shadow-cyan-400/50"
    },
    {
      rank: "Second Prize",
      icon: <Medal className="w-12 h-12 text-teal-400" />,
      description: "Special Surprise Package",
      bgGradient: "bg-gradient-to-br from-teal-200 via-cyan-100 to-blue-200",
      borderColor: "border-teal-400",
      glowColor: "shadow-teal-400/50"
    },
    {
      rank: "Third Prize",
      icon: <Award className="w-12 h-12 text-blue-400" />,
      description: "Mystery Gift Box",
      bgGradient: "bg-gradient-to-br from-blue-200 via-cyan-100 to-teal-200",
      borderColor: "border-blue-400",
      glowColor: "shadow-blue-400/50"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4  rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-cyan-50 drop-shadow-lg text-glow">
        ✨ Surprise Prizes! ✨
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {prizes.map((prize, index) => (
          <Card
            key={index}
            className={`relative overflow-hidden ${prize.bgGradient} border-2 ${prize.borderColor}
              transform hover:scale-105 transition-transform duration-200
              shadow-lg hover:shadow-xl ${prize.glowColor} rounded-xl
              backdrop-blur-sm backdrop-filter`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 p-4">
                <Gift className="w-8 h-8 text-cyan-500 animate-bounce" />
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className={`rounded-full p-4 bg-white/90 shadow-lg ${prize.glowColor}`}>
                  {prize.icon}
                </div>

                <h3 className="text-xl font-bold text-center text-cyan-900">{prize.rank}</h3>

                <p className="text-center text-cyan-800">{prize.description}</p>

                <div className="mt-4">
                  <span className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer">
                    Click to Reveal!
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PrizeCards;
