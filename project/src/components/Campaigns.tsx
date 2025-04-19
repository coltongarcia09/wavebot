import React, { useState } from 'react';
import { DollarSign, Plus, Trash2, Play, Pause } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  message: string;
  platforms: string[];
  budget: number;
  cpm: number;
  status: 'active' | 'paused' | 'completed';
  impressions: number;
  spent: number;
}

export function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    message: '',
    platforms: [] as string[],
    budget: 100,
    cpm: 2,
  });

  const addCampaign = () => {
    if (!newCampaign.name || !newCampaign.message) return;

    setCampaigns([
      ...campaigns,
      {
        id: Date.now().toString(),
        ...newCampaign,
        status: 'active',
        impressions: 0,
        spent: 0,
      },
    ]);
    setNewCampaign({
      name: '',
      message: '',
      platforms: [],
      budget: 100,
      cpm: 2,
    });
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(
      campaigns.map((campaign) => {
        if (campaign.id === id) {
          return {
            ...campaign,
            status: campaign.status === 'active' ? 'paused' : 'active',
          };
        }
        return campaign;
      })
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Ad Campaigns</h2>
        <div className="flex items-center gap-4">
          <div className="bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-400">Total Earnings</span>
            <p className="text-xl font-bold text-green-400">$1,234.56</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4">Create New Campaign</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={newCampaign.name}
            onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
            placeholder="Campaign Name"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          />
          <input
            type="number"
            value={newCampaign.budget}
            onChange={(e) => setNewCampaign({ ...newCampaign, budget: Number(e.target.value) })}
            placeholder="Budget (USD)"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          />
          <textarea
            value={newCampaign.message}
            onChange={(e) => setNewCampaign({ ...newCampaign, message: e.target.value })}
            placeholder="Ad Message"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          />
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Select Platforms</p>
            {['YouTube', 'Kick', 'WorldsWave'].map((platform) => (
              <label key={platform} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newCampaign.platforms.includes(platform)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setNewCampaign({
                        ...newCampaign,
                        platforms: [...newCampaign.platforms, platform],
                      });
                    } else {
                      setNewCampaign({
                        ...newCampaign,
                        platforms: newCampaign.platforms.filter((p) => p !== platform),
                      });
                    }
                  }}
                  className="rounded bg-gray-700 border-gray-600"
                />
                {platform}
              </label>
            ))}
          </div>
        </div>
        <button
          onClick={addCampaign}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="inline mr-2" /> Create Campaign
        </button>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">{campaign.name}</h3>
                <p className="text-sm text-gray-400">{campaign.message}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleCampaignStatus(campaign.id)}
                  className={`p-2 rounded-lg ${
                    campaign.status === 'active'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {campaign.status === 'active' ? <Pause /> : <Play />}
                </button>
                <button
                  onClick={() => deleteCampaign(campaign.id)}
                  className="p-2 rounded-lg text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-400">Budget</p>
                <p className="text-lg font-bold">${campaign.budget}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Spent</p>
                <p className="text-lg font-bold">${campaign.spent}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Impressions</p>
                <p className="text-lg font-bold">{campaign.impressions}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">CPM</p>
                <p className="text-lg font-bold">${campaign.cpm}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">Platforms</p>
              <div className="flex gap-2 mt-1">
                {campaign.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 rounded-full bg-gray-700 text-xs"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}