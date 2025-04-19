import React, { useState } from 'react';
import { Shield, Plus, Trash2 } from 'lucide-react';

interface ModRule {
  id: string;
  type: 'word' | 'pattern' | 'link' | 'spam';
  value: string;
  action: 'delete' | 'timeout' | 'ban';
  duration?: number;
}

export function Moderation() {
  const [rules, setRules] = useState<ModRule[]>([]);
  const [type, setType] = useState<ModRule['type']>('word');
  const [value, setValue] = useState('');
  const [action, setAction] = useState<ModRule['action']>('delete');
  const [duration, setDuration] = useState(300);

  const addRule = () => {
    if (!value) return;

    setRules([
      ...rules,
      {
        id: Date.now().toString(),
        type,
        value,
        action,
        duration: action === 'timeout' ? duration : undefined,
      },
    ]);
    setValue('');
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Moderation Settings</h2>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ModRule['type'])}
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          >
            <option value="word">Banned Word</option>
            <option value="pattern">Regex Pattern</option>
            <option value="link">URL Filter</option>
            <option value="spam">Spam Detection</option>
          </select>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value..."
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          />
          <select
            value={action}
            onChange={(e) => setAction(e.target.value as ModRule['action'])}
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          >
            <option value="delete">Delete Message</option>
            <option value="timeout">Timeout User</option>
            <option value="ban">Ban User</option>
          </select>
          {action === 'timeout' && (
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              placeholder="Timeout duration (seconds)"
              className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
            />
          )}
        </div>
        <button
          onClick={addRule}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="inline mr-2" /> Add Rule
        </button>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="bg-gray-800 p-4 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Shield className="text-blue-400" />
              <div>
                <p className="text-white font-medium">{rule.type}</p>
                <p className="text-sm text-gray-400">{rule.value}</p>
                <p className="text-xs text-gray-500">
                  Action: {rule.action}
                  {rule.duration ? ` (${rule.duration}s)` : ''}
                </p>
              </div>
            </div>
            <button
              onClick={() => deleteRule(rule.id)}
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