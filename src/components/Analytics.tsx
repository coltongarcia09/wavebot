import React, { useState } from 'react';
import { BarChart2, TrendingUp, Users, MessageCircle, Clock, Eye, Calendar, Download } from 'lucide-react';

interface AnalyticsData {
  date: string;
  viewers: number;
  chatMessages: number;
  newFollowers: number;
  streamDuration: number;
}

export function Analytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'rumble' | 'kick' | 'worldswave' | 'youtube'>('all');

  // Mock analytics data
  const analyticsData: AnalyticsData[] = [
    { date: '2024-01-01', viewers: 45, chatMessages: 234, newFollowers: 12, streamDuration: 3.5 },
    { date: '2024-01-02', viewers: 52, chatMessages: 189, newFollowers: 8, streamDuration: 4.2 },
    { date: '2024-01-03', viewers: 38, chatMessages: 156, newFollowers: 15, streamDuration: 2.8 },
    { date: '2024-01-04', viewers: 67, chatMessages: 298, newFollowers: 23, streamDuration: 5.1 },
    { date: '2024-01-05', viewers: 41, chatMessages: 167, newFollowers: 9, streamDuration: 3.7 },
    { date: '2024-01-06', viewers: 58, chatMessages: 245, newFollowers: 18, streamDuration: 4.5 },
    { date: '2024-01-07', viewers: 73, chatMessages: 312, newFollowers: 27, streamDuration: 6.2 },
  ];

  const totalStats = {
    avgViewers: Math.round(analyticsData.reduce((sum, day) => sum + day.viewers, 0) / analyticsData.length),
    totalMessages: analyticsData.reduce((sum, day) => sum + day.chatMessages, 0),
    totalFollowers: analyticsData.reduce((sum, day) => sum + day.newFollowers, 0),
    totalHours: analyticsData.reduce((sum, day) => sum + day.streamDuration, 0),
  };

  const topCommands = [
    { command: '!hello', uses: 156, percentage: 23 },
    { command: '!discord', uses: 134, percentage: 20 },
    { command: '!socials', uses: 98, percentage: 14 },
    { command: '!uptime', uses: 87, percentage: 13 },
    { command: '!rank', uses: 76, percentage: 11 },
  ];

  const chatActivity = [
    { hour: '12:00', messages: 45 },
    { hour: '13:00', messages: 67 },
    { hour: '14:00', messages: 89 },
    { hour: '15:00', messages: 123 },
    { hour: '16:00', messages: 156 },
    { hour: '17:00', messages: 134 },
    { hour: '18:00', messages: 98 },
    { hour: '19:00', messages: 87 },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value as any)}
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          >
            <option value="all">All Platforms</option>
            <option value="rumble">Rumble</option>
            <option value="kick">Kick</option>
            <option value="worldswave">WorldsWave</option>
            <option value="youtube">YouTube</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="text-blue-400" />
            <h3 className="text-gray-400 text-sm">AVG VIEWERS</h3>
          </div>
          <p className="text-2xl font-bold">{totalStats.avgViewers}</p>
          <p className="text-sm text-green-400">+12% from last period</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="text-green-400" />
            <h3 className="text-gray-400 text-sm">CHAT MESSAGES</h3>
          </div>
          <p className="text-2xl font-bold">{totalStats.totalMessages.toLocaleString()}</p>
          <p className="text-sm text-green-400">+8% from last period</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-purple-400" />
            <h3 className="text-gray-400 text-sm">NEW FOLLOWERS</h3>
          </div>
          <p className="text-2xl font-bold">{totalStats.totalFollowers}</p>
          <p className="text-sm text-green-400">+25% from last period</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-yellow-400" />
            <h3 className="text-gray-400 text-sm">STREAM HOURS</h3>
          </div>
          <p className="text-2xl font-bold">{totalStats.totalHours.toFixed(1)}</p>
          <p className="text-sm text-red-400">-5% from last period</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Viewer Trend Chart */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="text-blue-400" />
            Viewer Trends
          </h3>
          <div className="space-y-3">
            {analyticsData.map((day, index) => (
              <div key={day.date} className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{new Date(day.date).toLocaleDateString()}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-400 h-2 rounded-full" 
                      style={{ width: `${(day.viewers / 100) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{day.viewers}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Commands */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart2 className="text-green-400" />
            Top Commands
          </h3>
          <div className="space-y-3">
            {topCommands.map((cmd) => (
              <div key={cmd.command} className="flex items-center justify-between">
                <span className="text-sm font-mono">{cmd.command}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-400 h-2 rounded-full" 
                      style={{ width: `${cmd.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400 w-12 text-right">{cmd.uses}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Activity Heatmap */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <MessageCircle className="text-purple-400" />
          Chat Activity by Hour
        </h3>
        <div className="grid grid-cols-8 gap-2">
          {chatActivity.map((hour) => (
            <div key={hour.hour} className="text-center">
              <div className="text-xs text-gray-400 mb-2">{hour.hour}</div>
              <div 
                className="bg-purple-400 rounded mx-auto"
                style={{ 
                  height: `${(hour.messages / 200) * 100}px`,
                  width: '20px',
                  minHeight: '10px'
                }}
              ></div>
              <div className="text-xs text-gray-500 mt-1">{hour.messages}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Insights */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Growth Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-green-500/20 border border-green-500/30 p-4 rounded-lg">
            <h4 className="font-bold text-green-400 mb-2">Peak Performance</h4>
            <p className="text-sm text-gray-300">Your best stream was on Jan 7th with 73 average viewers and 312 chat messages.</p>
          </div>
          <div className="bg-blue-500/20 border border-blue-500/30 p-4 rounded-lg">
            <h4 className="font-bold text-blue-400 mb-2">Engagement Rate</h4>
            <p className="text-sm text-gray-300">Your chat engagement is 15% above average. Keep encouraging interaction!</p>
          </div>
          <div className="bg-yellow-400/20 border border-yellow-400/30 p-4 rounded-lg">
            <h4 className="font-bold text-yellow-400 mb-2">Growth Opportunity</h4>
            <p className="text-sm text-gray-300">Streaming during 3-6 PM shows highest viewer retention. Consider adjusting schedule.</p>
          </div>
        </div>
      </div>
    </div>
  );
}