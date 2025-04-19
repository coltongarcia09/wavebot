import React, { useState } from 'react';
import { Crown, Coins, Gift, Award } from 'lucide-react';

interface Reward {
  id: string;
  name: string;
  cost: number;
  description: string;
}

export function Loyalty() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [newReward, setNewReward] = useState({
    name: '',
    cost: 1000,
    description: '',
  });

  const addReward = () => {
    if (!newReward.name) return;

    setRewards([
      ...rewards,
      {
        id: Date.now().toString(),
        ...newReward,
      },
    ]);
    setNewReward({ name: '', cost: 1000, description: '' });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Loyalty System</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Coins className="text-yellow-400" />
            <h3 className="text-lg font-medium">Points Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Points per minute</label>
              <input
                type="number"
                defaultValue={10}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Subscriber multiplier</label>
              <input
                type="number"
                defaultValue={2}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-purple-400" />
            <h3 className="text-lg font-medium">Ranks</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Bronze: 0 - 1000 points</p>
            <p className="text-sm text-gray-400">Silver: 1000 - 5000 points</p>
            <p className="text-sm text-gray-400">Gold: 5000 - 10000 points</p>
            <p className="text-sm text-gray-400">Diamond: 10000+ points</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="text-green-400" />
            <h3 className="text-lg font-medium">Add Reward</h3>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              value={newReward.name}
              onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
              placeholder="Reward name"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
            />
            <input
              type="number"
              value={newReward.cost}
              onChange={(e) => setNewReward({ ...newReward, cost: Number(e.target.value) })}
              placeholder="Cost"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
            />
            <textarea
              value={newReward.description}
              onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
              placeholder="Description"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
            />
            <button
              onClick={addReward}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Add Reward
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Available Rewards</h3>
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-gray-800 p-4 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Crown className="text-yellow-400" />
              <div>
                <p className="text-white font-medium">{reward.name}</p>
                <p className="text-sm text-gray-400">{reward.description}</p>
                <p className="text-xs text-yellow-400">{reward.cost} points</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}