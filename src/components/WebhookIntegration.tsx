import React, { useState } from 'react';
import { Webhook, Plus, Trash2, TestTube, Copy, Shield } from 'lucide-react';

interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  events: string[];
  secret: string;
  enabled: boolean;
  lastTriggered?: Date;
  totalCalls: number;
}

export function WebhookIntegration() {
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([
    {
      id: '1',
      name: 'Discord Bot',
      url: 'https://discord.com/api/webhooks/123456789/abcdef',
      events: ['new_follower', 'donation', 'subscription'],
      secret: 'webhook_secret_123',
      enabled: true,
      lastTriggered: new Date('2024-01-07T15:30:00'),
      totalCalls: 45
    },
    {
      id: '2',
      name: 'Custom Analytics',
      url: 'https://myapi.example.com/stream-events',
      events: ['stream_start', 'stream_end', 'chat_message'],
      secret: 'analytics_secret_456',
      enabled: false,
      totalCalls: 0
    }
  ]);

  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: [] as string[],
    secret: ''
  });

  const availableEvents = [
    'new_follower',
    'subscription',
    'donation',
    'chat_message',
    'stream_start',
    'stream_end',
    'raid_received',
    'host_received',
    'bits_received'
  ];

  const addWebhook = () => {
    if (!newWebhook.name || !newWebhook.url) return;

    const webhook: WebhookEndpoint = {
      id: Date.now().toString(),
      ...newWebhook,
      secret: newWebhook.secret || `webhook_${Date.now()}`,
      enabled: true,
      totalCalls: 0
    };

    setWebhooks([...webhooks, webhook]);
    setNewWebhook({ name: '', url: '', events: [], secret: '' });
  };

  const deleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== id));
  };

  const toggleWebhook = (id: string) => {
    setWebhooks(webhooks.map(webhook => 
      webhook.id === id ? { ...webhook, enabled: !webhook.enabled } : webhook
    ));
  };

  const testWebhook = async (webhook: WebhookEndpoint) => {
    // In a real implementation, this would send a test payload
    console.log(`Testing webhook: ${webhook.name}`);
    
    // Simulate API call
    try {
      const testPayload = {
        event: 'test',
        timestamp: new Date().toISOString(),
        data: {
          message: 'This is a test webhook from TheWaveBot'
        }
      };
      
      // Mock successful test
      alert(`Test webhook sent successfully to ${webhook.name}`);
    } catch (error) {
      alert(`Failed to send test webhook to ${webhook.name}`);
    }
  };

  const generateWebhookUrl = () => {
    return `${window.location.origin}/api/webhooks/${Date.now()}`;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Webhook Integration</h2>
        <button
          onClick={() => setNewWebhook({ ...newWebhook, url: generateWebhookUrl() })}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Webhook className="w-4 h-4" />
          Generate URL
        </button>
      </div>

      {/* Add New Webhook */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4">Add New Webhook</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={newWebhook.name}
              onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
              placeholder="Webhook Name"
              className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
            />
            <input
              type="url"
              value={newWebhook.url}
              onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
              placeholder="Webhook URL"
              className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Events to Subscribe</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableEvents.map(event => (
                <label key={event} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={newWebhook.events.includes(event)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewWebhook({
                          ...newWebhook,
                          events: [...newWebhook.events, event]
                        });
                      } else {
                        setNewWebhook({
                          ...newWebhook,
                          events: newWebhook.events.filter(e => e !== event)
                        });
                      }
                    }}
                    className="rounded bg-gray-700 border-gray-600"
                  />
                  {event.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </label>
              ))}
            </div>
          </div>

          <input
            type="text"
            value={newWebhook.secret}
            onChange={(e) => setNewWebhook({ ...newWebhook, secret: e.target.value })}
            placeholder="Webhook Secret (optional)"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          />

          <button
            onClick={addWebhook}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Webhook
          </button>
        </div>
      </div>

      {/* Webhook List */}
      <div className="space-y-4">
        {webhooks.map((webhook) => (
          <div key={webhook.id} className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">{webhook.name}</h3>
                <p className="text-sm text-gray-400 font-mono">{webhook.url}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWebhook(webhook.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    webhook.enabled 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {webhook.enabled ? 'Enabled' : 'Disabled'}
                </button>
                <button
                  onClick={() => testWebhook(webhook)}
                  className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/20"
                >
                  <TestTube className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(webhook.url)}
                  className="p-2 rounded-lg text-purple-400 hover:bg-purple-500/20"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteWebhook(webhook.id)}
                  className="p-2 rounded-lg text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-400">Total Calls</p>
                <p className="text-lg font-bold">{webhook.totalCalls}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Events</p>
                <p className="text-lg font-bold">{webhook.events.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className={`text-lg font-bold ${webhook.enabled ? 'text-green-400' : 'text-gray-400'}`}>
                  {webhook.enabled ? 'Active' : 'Inactive'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Last Triggered</p>
                <p className="text-sm">
                  {webhook.lastTriggered 
                    ? webhook.lastTriggered.toLocaleDateString() 
                    : 'Never'
                  }
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-400">Subscribed Events:</p>
              <div className="flex flex-wrap gap-2">
                {webhook.events.map(event => (
                  <span
                    key={event}
                    className="px-2 py-1 rounded-full bg-gray-700 text-xs"
                  >
                    {event.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                ))}
              </div>
            </div>

            {webhook.secret && (
              <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-400">Webhook Secret</span>
                </div>
                <p className="text-sm font-mono text-gray-300">{webhook.secret}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Documentation */}
      <div className="mt-8 bg-blue-500/20 border border-blue-500/30 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4 text-blue-400">Webhook Documentation</h3>
        <div className="space-y-4 text-sm text-gray-300">
          <div>
            <h4 className="font-bold mb-2">Payload Format</h4>
            <pre className="bg-gray-800 p-3 rounded text-xs overflow-x-auto">
{`{
  "event": "new_follower",
  "timestamp": "2024-01-07T15:30:00Z",
  "platform": "rumble",
  "data": {
    "username": "new_viewer",
    "display_name": "New Viewer",
    "followed_at": "2024-01-07T15:30:00Z"
  }
}`}
            </pre>
          </div>
          <div>
            <h4 className="font-bold mb-2">Security</h4>
            <p>All webhook requests include a signature header for verification. Use your webhook secret to validate incoming requests.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Retry Policy</h4>
            <p>Failed webhook deliveries will be retried up to 3 times with exponential backoff.</p>
          </div>
        </div>
      </div>
    </div>
  );
}