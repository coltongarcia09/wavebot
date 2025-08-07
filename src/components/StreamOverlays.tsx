import React, { useState } from 'react';
import { Monitor, Plus, Trash2, Eye, Settings, Download } from 'lucide-react';

interface Overlay {
  id: string;
  name: string;
  type: 'alert' | 'chat' | 'recent_followers' | 'donation_goal' | 'custom';
  position: { x: number; y: number };
  size: { width: number; height: number };
  enabled: boolean;
  settings: Record<string, any>;
}

export function StreamOverlays() {
  const [overlays, setOverlays] = useState<Overlay[]>([
    {
      id: '1',
      name: 'Follow Alert',
      type: 'alert',
      position: { x: 50, y: 20 },
      size: { width: 400, height: 100 },
      enabled: true,
      settings: {
        duration: 5000,
        sound: true,
        animation: 'slide-in'
      }
    },
    {
      id: '2',
      name: 'Chat Display',
      type: 'chat',
      position: { x: 20, y: 70 },
      size: { width: 300, height: 200 },
      enabled: true,
      settings: {
        maxMessages: 10,
        hideCommands: true,
        fontSize: 14
      }
    }
  ]);

  const [newOverlay, setNewOverlay] = useState({
    name: '',
    type: 'alert' as Overlay['type'],
  });

  const addOverlay = () => {
    if (!newOverlay.name) return;

    const overlay: Overlay = {
      id: Date.now().toString(),
      name: newOverlay.name,
      type: newOverlay.type,
      position: { x: 50, y: 50 },
      size: { width: 300, height: 100 },
      enabled: true,
      settings: {}
    };

    setOverlays([...overlays, overlay]);
    setNewOverlay({ name: '', type: 'alert' });
  };

  const deleteOverlay = (id: string) => {
    setOverlays(overlays.filter(overlay => overlay.id !== id));
  };

  const toggleOverlay = (id: string) => {
    setOverlays(overlays.map(overlay => 
      overlay.id === id ? { ...overlay, enabled: !overlay.enabled } : overlay
    ));
  };

  const generateOverlayUrl = (overlay: Overlay) => {
    return `${window.location.origin}/overlay/${overlay.id}`;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Stream Overlays</h2>
        <div className="flex items-center gap-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Preview Mode
          </button>
        </div>
      </div>

      {/* Add New Overlay */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4">Create New Overlay</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newOverlay.name}
            onChange={(e) => setNewOverlay({ ...newOverlay, name: e.target.value })}
            placeholder="Overlay Name"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          />
          <select
            value={newOverlay.type}
            onChange={(e) => setNewOverlay({ ...newOverlay, type: e.target.value as Overlay['type'] })}
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          >
            <option value="alert">Alert Overlay</option>
            <option value="chat">Chat Display</option>
            <option value="recent_followers">Recent Followers</option>
            <option value="donation_goal">Donation Goal</option>
            <option value="custom">Custom HTML</option>
          </select>
          <button
            onClick={addOverlay}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Overlay
          </button>
        </div>
      </div>

      {/* Overlay List */}
      <div className="space-y-4">
        {overlays.map((overlay) => (
          <div key={overlay.id} className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">{overlay.name}</h3>
                <p className="text-sm text-gray-400 capitalize">{overlay.type.replace('_', ' ')}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleOverlay(overlay.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    overlay.enabled 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {overlay.enabled ? 'Enabled' : 'Disabled'}
                </button>
                <button className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/20">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-purple-400 hover:bg-purple-500/20">
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteOverlay(overlay.id)}
                  className="p-2 rounded-lg text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-400">Position</p>
                <p className="text-sm">{overlay.position.x}%, {overlay.position.y}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Size</p>
                <p className="text-sm">{overlay.size.width}x{overlay.size.height}px</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Type</p>
                <p className="text-sm capitalize">{overlay.type.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className={`text-sm ${overlay.enabled ? 'text-green-400' : 'text-gray-400'}`}>
                  {overlay.enabled ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>

            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Browser Source URL</p>
                  <p className="text-sm font-mono text-blue-400">{generateOverlayUrl(overlay)}</p>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(generateOverlayUrl(overlay))}
                  className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-500"
                >
                  Copy URL
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-500/20 border border-blue-500/30 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-2 text-blue-400">How to Use Overlays in OBS</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
          <li>Copy the Browser Source URL from any overlay above</li>
          <li>In OBS, add a new "Browser Source"</li>
          <li>Paste the URL and set the width/height to match the overlay size</li>
          <li>Position the source on your scene as desired</li>
          <li>The overlay will automatically update when events occur on your stream</li>
        </ol>
      </div>
    </div>
  );
}