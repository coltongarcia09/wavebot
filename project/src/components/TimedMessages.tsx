import React, { useState } from 'react';
import { Plus, Trash2, Clock } from 'lucide-react';

interface TimedMessage {
  id: string;
  message: string;
  interval: number;
  enabled: boolean;
}

export function TimedMessages() {
  const [messages, setMessages] = useState<TimedMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [interval, setInterval] = useState(5);

  const addMessage = () => {
    if (!newMessage) return;
    
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        message: newMessage,
        interval,
        enabled: true,
      },
    ]);
    setNewMessage('');
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const toggleMessage = (id: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, enabled: !msg.enabled } : msg
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Timed Messages</h2>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Enter message..."
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          <div className="w-32">
            <input
              type="number"
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              min="1"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          <button
            onClick={addMessage}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            <Plus />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-gray-800 p-4 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Clock className="text-blue-400" />
              <div>
                <p className="text-white">{msg.message}</p>
                <p className="text-sm text-gray-400">Every {msg.interval} minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleMessage(msg.id)}
                className={`px-4 py-2 rounded-lg ${
                  msg.enabled ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                {msg.enabled ? 'Enabled' : 'Disabled'}
              </button>
              <button
                onClick={() => deleteMessage(msg.id)}
                className="text-red-400 hover:text-red-500"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}