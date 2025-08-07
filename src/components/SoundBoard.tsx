import React, { useState } from 'react';
import { Volume2, Plus, Trash2, Play, Pause, Upload, Settings } from 'lucide-react';

interface SoundEffect {
  id: string;
  name: string;
  file: string;
  volume: number;
  hotkey?: string;
  category: string;
  duration: number;
}

export function SoundBoard() {
  const [sounds, setSounds] = useState<SoundEffect[]>([
    {
      id: '1',
      name: 'Applause',
      file: 'applause.mp3',
      volume: 80,
      hotkey: 'F1',
      category: 'reactions',
      duration: 3.2
    },
    {
      id: '2',
      name: 'Airhorn',
      file: 'airhorn.mp3',
      volume: 60,
      hotkey: 'F2',
      category: 'hype',
      duration: 2.1
    },
    {
      id: '3',
      name: 'Sad Trombone',
      file: 'sad-trombone.mp3',
      volume: 70,
      hotkey: 'F3',
      category: 'reactions',
      duration: 4.5
    },
    {
      id: '4',
      name: 'Victory',
      file: 'victory.mp3',
      volume: 75,
      hotkey: 'F4',
      category: 'gaming',
      duration: 5.8
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newSound, setNewSound] = useState({
    name: '',
    category: 'reactions',
    hotkey: '',
    volume: 80
  });

  const categories = ['all', 'reactions', 'hype', 'gaming', 'music', 'custom'];

  const filteredSounds = selectedCategory === 'all' 
    ? sounds 
    : sounds.filter(sound => sound.category === selectedCategory);

  const playSound = (sound: SoundEffect) => {
    // In a real implementation, this would play the actual audio file
    console.log(`Playing sound: ${sound.name}`);
  };

  const deleteSound = (id: string) => {
    setSounds(sounds.filter(sound => sound.id !== id));
  };

  const updateVolume = (id: string, volume: number) => {
    setSounds(sounds.map(sound => 
      sound.id === id ? { ...sound, volume } : sound
    ));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Sound Board</h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Sound
          </button>
        </div>
      </div>

      {/* Add New Sound */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4">Add New Sound</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            value={newSound.name}
            onChange={(e) => setNewSound({ ...newSound, name: e.target.value })}
            placeholder="Sound Name"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          />
          <select
            value={newSound.category}
            onChange={(e) => setNewSound({ ...newSound, category: e.target.value })}
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          >
            <option value="reactions">Reactions</option>
            <option value="hype">Hype</option>
            <option value="gaming">Gaming</option>
            <option value="music">Music</option>
            <option value="custom">Custom</option>
          </select>
          <input
            type="text"
            value={newSound.hotkey}
            onChange={(e) => setNewSound({ ...newSound, hotkey: e.target.value })}
            placeholder="Hotkey (e.g., F5)"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          />
          <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add Sound
          </button>
        </div>
      </div>

      {/* Sound Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {filteredSounds.map((sound) => (
          <div key={sound.id} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm truncate">{sound.name}</h3>
              <button
                onClick={() => deleteSound(sound.id)}
                className="text-red-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => playSound(sound)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Play
              </button>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Volume</span>
                  <span className="text-xs text-gray-400">{sound.volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sound.volume}
                  onChange={(e) => updateVolume(sound.id, Number(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="text-xs text-gray-400 space-y-1">
                <div>Category: {sound.category}</div>
                <div>Duration: {sound.duration}s</div>
                {sound.hotkey && <div>Hotkey: {sound.hotkey}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Settings */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Settings className="text-blue-400" />
          Global Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Master Volume</label>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="80"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Output Device</label>
            <select className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white">
              <option>Default Audio Device</option>
              <option>Virtual Audio Cable</option>
              <option>OBS Audio Monitor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Fade Duration</label>
            <select className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white">
              <option>No Fade</option>
              <option>0.5 seconds</option>
              <option>1 second</option>
              <option>2 seconds</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
          <h4 className="font-bold text-blue-400 mb-2">Pro Tip</h4>
          <p className="text-sm text-gray-300">
            Use hotkeys to trigger sounds during your stream without switching windows. 
            Make sure to set up a virtual audio cable to route sounds to your streaming software.
          </p>
        </div>
      </div>
    </div>
  );
}