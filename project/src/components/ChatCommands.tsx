import React, { useState } from 'react';
import { Plus, Trash2, Command } from 'lucide-react';

interface ChatCommand {
  id: string;
  command: string;
  response: string;
  cooldown: number;
  userLevel: 'everyone' | 'subscriber' | 'moderator' | 'broadcaster';
}

export function ChatCommands() {
  const [commands, setCommands] = useState<ChatCommand[]>([]);
  const [newCommand, setNewCommand] = useState('');
  const [newResponse, setNewResponse] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [userLevel, setUserLevel] = useState<ChatCommand['userLevel']>('everyone');

  const addCommand = () => {
    if (!newCommand || !newResponse) return;

    setCommands([
      ...commands,
      {
        id: Date.now().toString(),
        command: newCommand,
        response: newResponse,
        cooldown,
        userLevel,
      },
    ]);
    setNewCommand('');
    setNewResponse('');
  };

  const deleteCommand = (id: string) => {
    setCommands(commands.filter((cmd) => cmd.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Chat Commands</h2>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={newCommand}
            onChange={(e) => setNewCommand(e.target.value)}
            placeholder="!command"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          />
          <input
            type="text"
            value={newResponse}
            onChange={(e) => setNewResponse(e.target.value)}
            placeholder="Response message"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          />
          <input
            type="number"
            value={cooldown}
            onChange={(e) => setCooldown(Number(e.target.value))}
            placeholder="Cooldown (seconds)"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          />
          <select
            value={userLevel}
            onChange={(e) => setUserLevel(e.target.value as ChatCommand['userLevel'])}
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          >
            <option value="everyone">Everyone</option>
            <option value="subscriber">Subscribers</option>
            <option value="moderator">Moderators</option>
            <option value="broadcaster">Broadcaster</option>
          </select>
        </div>
        <button
          onClick={addCommand}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="inline mr-2" /> Add Command
        </button>
      </div>

      <div className="space-y-4">
        {commands.map((cmd) => (
          <div
            key={cmd.id}
            className="bg-gray-800 p-4 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Command className="text-blue-400" />
              <div>
                <p className="text-white font-medium">{cmd.command}</p>
                <p className="text-sm text-gray-400">{cmd.response}</p>
                <p className="text-xs text-gray-500">
                  {cmd.cooldown}s cooldown • {cmd.userLevel} can use
                </p>
              </div>
            </div>
            <button
              onClick={() => deleteCommand(cmd.id)}
              className="text-red-400 hover:text-red-500"
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}