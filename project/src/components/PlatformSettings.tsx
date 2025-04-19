import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { usePlatformStore } from '../lib/store';

export function PlatformSettings() {
  const { platforms, togglePlatform } = usePlatformStore();
  const [rumbleKey, setRumbleKey] = useState('');
  const [kickKey, setKickKey] = useState('');
  const [worldswaveKey, setWorldswaveKey] = useState('');
  const [youtubeKey, setYoutubeKey] = useState('');
  const [twitchKey, setTwitchKey] = useState('');

  const handleRumbleConnect = () => {
    if (rumbleKey) {
      togglePlatform('rumble');
    }
  };

  const handleKickConnect = () => {
    if (kickKey) {
      togglePlatform('kick');
    }
  };

  const handleWorldswaveConnect = () => {
    if (worldswaveKey) {
      togglePlatform('worldswave');
    }
  };

  const handleYoutubeConnect = () => {
    if (youtubeKey) {
      togglePlatform('youtube');
    }
  };

  const handleTwitchConnect = () => {
    if (twitchKey) {
      togglePlatform('twitch');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Platform Settings</h2>
      
      <div className="space-y-6">
        {/* Rumble Integration */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 text-green-400">R</div>
              <h3 className="text-lg font-medium">Rumble</h3>
            </div>
            <div className="flex items-center gap-2">
              {platforms.rumble ? (
                <span className="flex items-center gap-1 text-green-400">
                  <Check size={16} />
                  Connected
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-400">
                  <X size={16} />
                  Not Connected
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">API Key</label>
              <input
                type="password"
                value={rumbleKey}
                onChange={(e) => setRumbleKey(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                placeholder="Enter your Rumble API Key"
              />
            </div>
            <button
              onClick={handleRumbleConnect}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              {platforms.rumble ? 'Update Connection' : 'Connect Rumble'}
            </button>
          </div>
        </div>

        {/* Kick Integration */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 text-red-400">K</div>
              <h3 className="text-lg font-medium">Kick</h3>
            </div>
            <div className="flex items-center gap-2">
              {platforms.kick ? (
                <span className="flex items-center gap-1 text-green-400">
                  <Check size={16} />
                  Connected
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-400">
                  <X size={16} />
                  Not Connected
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">API Key</label>
              <input
                type="password"
                value={kickKey}
                onChange={(e) => setKickKey(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                placeholder="Enter your Kick API Key"
              />
            </div>
            <button
              onClick={handleKickConnect}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              {platforms.kick ? 'Update Connection' : 'Connect Kick'}
            </button>
          </div>
        </div>

        {/* WorldsWave Integration */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 text-purple-400">W</div>
              <h3 className="text-lg font-medium">WorldsWave</h3>
            </div>
            <div className="flex items-center gap-2">
              {platforms.worldswave ? (
                <span className="flex items-center gap-1 text-green-400">
                  <Check size={16} />
                  Connected
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-400">
                  <X size={16} />
                  Not Connected
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">API Key</label>
              <input
                type="password"
                value={worldswaveKey}
                onChange={(e) => setWorldswaveKey(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                placeholder="Enter your WorldsWave API Key"
              />
            </div>
            <button
              onClick={handleWorldswaveConnect}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            >
              {platforms.worldswave ? 'Update Connection' : 'Connect WorldsWave'}
            </button>
          </div>
        </div>

        {/* YouTube Integration */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 text-red-500">Y</div>
              <h3 className="text-lg font-medium">YouTube</h3>
            </div>
            <div className="flex items-center gap-2">
              {platforms.youtube ? (
                <span className="flex items-center gap-1 text-green-400">
                  <Check size={16} />
                  Connected
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-400">
                  <X size={16} />
                  Not Connected
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">API Key</label>
              <input
                type="password"
                value={youtubeKey}
                onChange={(e) => setYoutubeKey(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                placeholder="Enter your YouTube API Key"
              />
            </div>
            <button
              onClick={handleYoutubeConnect}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              {platforms.youtube ? 'Update Connection' : 'Connect YouTube'}
            </button>
          </div>
        </div>

        {/* Twitch Integration */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 text-purple-500">T</div>
              <h3 className="text-lg font-medium">Twitch</h3>
            </div>
            <div className="flex items-center gap-2">
              {platforms.twitch ? (
                <span className="flex items-center gap-1 text-green-400">
                  <Check size={16} />
                  Connected
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-400">
                  <X size={16} />
                  Not Connected
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">API Key</label>
              <input
                type="password"
                value={twitchKey}
                onChange={(e) => setTwitchKey(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                placeholder="Enter your Twitch API Key"
              />
            </div>
            <button
              onClick={handleTwitchConnect}
              className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600"
            >
              {platforms.twitch ? 'Update Connection' : 'Connect Twitch'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}