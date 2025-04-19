import React, { useState } from 'react';
import { 
  MessageSquare, 
  Timer, 
  Command, 
  Users, 
  Shield,
  Gift, 
  Bell,
  Activity,
  Zap,
  LogOut,
  Crown,
  Settings,
  Calendar,
  Star,
  Clock,
  Eye,
  BarChart2,
  MessageCircle,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { useAuthStore, usePlatformStore } from './lib/store';
import { Auth } from './components/Auth';
import { TimedMessages } from './components/TimedMessages';
import { ChatCommands } from './components/ChatCommands';
import { Moderation } from './components/Moderation';
import { Loyalty } from './components/Loyalty';
import { PlatformSettings } from './components/PlatformSettings';
import { Campaigns } from './components/Campaigns';
import { Premium } from './components/Premium';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { isAuthenticated, user, logout } = useAuthStore();
  const { platforms, stats } = usePlatformStore();

  const quickActions = [
    { id: 'command', label: 'Create Command', icon: <Command className="w-8 h-8" />, onClick: () => setActiveSection('chat') },
    { id: 'schedule', label: 'Schedule Message', icon: <Calendar className="w-8 h-8" />, onClick: () => setActiveSection('timers') },
    { id: 'reward', label: 'Create Reward', icon: <Star className="w-8 h-8" />, onClick: () => setActiveSection('loyalty') },
    { id: 'alert', label: 'Configure Alert', icon: <Bell className="w-8 h-8" />, onClick: () => setActiveSection('alerts') },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity /> },
    { id: 'chat', label: 'Chat Commands', icon: <Command /> },
    { id: 'timers', label: 'Timed Messages', icon: <Timer /> },
    { id: 'moderation', label: 'Moderation', icon: <Shield /> },
    { id: 'giveaways', label: 'Giveaways', icon: <Gift /> },
    { id: 'alerts', label: 'Alerts', icon: <Bell /> },
    { id: 'loyalty', label: 'Loyalty System', icon: <Crown /> },
    { id: 'campaigns', label: 'Ad Campaigns', icon: <DollarSign /> },
    { id: 'settings', label: 'Settings', icon: <Settings /> },
  ];

  if (!isAuthenticated) {
    return <Auth />;
  }

  const totalStats = {
    views: Object.values(stats).reduce((sum, platform) => sum + platform.totalViews, 0),
    hoursViewed: Object.values(stats).reduce((sum, platform) => sum + platform.hoursViewed, 0),
    followers: Object.values(stats).reduce((sum, platform) => sum + platform.followers, 0),
    chatMessages: Object.values(stats).reduce((sum, platform) => sum + platform.chatMessages, 0),
    peakViewers: Object.values(stats).reduce((sum, platform) => sum + platform.peakViewers, 0),
    earnings: Object.values(stats).reduce((sum, platform) => sum + (platform.earnings || 0), 0),
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4">
        <div className="flex items-center gap-2 mb-8">
          <Zap className="w-8 h-8 text-blue-400" />
          <h1 className="text-xl font-bold">TheWaveBot</h1>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
          <h3 className="font-bold flex items-center gap-2">
            <Crown className="w-4 h-4 text-yellow-400" />
            Free Plan
          </h3>
          <p className="text-sm text-gray-200 mt-1">Upgrade to Premium for more features!</p>
          <button
            onClick={() => setActiveSection('premium')}
            className="mt-3 w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm backdrop-blur-sm transition-colors"
          >
            Upgrade Now
          </button>
        </div>

        <div className="mt-auto pt-8">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700"
          >
            <LogOut />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {activeSection === 'dashboard' && (
            <div className="space-y-8">
              {/* Overall Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Eye className="text-blue-400" />
                    <h3 className="text-gray-400 text-sm">TOTAL VIEWS</h3>
                  </div>
                  <p className="text-2xl font-bold">{totalStats.views.toLocaleString()}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="text-purple-400" />
                    <h3 className="text-gray-400 text-sm">HOURS VIEWED</h3>
                  </div>
                  <p className="text-2xl font-bold">{totalStats.hoursViewed.toFixed(2)}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="text-red-400" />
                    <h3 className="text-gray-400 text-sm">FOLLOWERS</h3>
                  </div>
                  <p className="text-2xl font-bold">{totalStats.followers}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <MessageCircle className="text-green-400" />
                    <h3 className="text-gray-400 text-sm">CHAT MESSAGES</h3>
                  </div>
                  <p className="text-2xl font-bold">{totalStats.chatMessages.toLocaleString()}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="text-yellow-400" />
                    <h3 className="text-gray-400 text-sm">PEAK VIEWERS</h3>
                  </div>
                  <p className="text-2xl font-bold">{totalStats.peakViewers}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="text-green-400" />
                    <h3 className="text-gray-400 text-sm">EARNINGS</h3>
                  </div>
                  <p className="text-2xl font-bold">${totalStats.earnings.toFixed(2)}</p>
                </div>
              </div>

              {/* Platform Stats */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Platform Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Rumble Stats */}
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text

-green-400 font-bold">R</div>
                        <h3 className="text-lg font-medium">Rumble</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${platforms.rumble ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                        {platforms.rumble ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400">Followers</p>
                        <p className="text-2xl font-bold">{stats.rumble.followers}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Avg. Viewers</p>
                        <p className="text-2xl font-bold">{stats.rumble.avgViewers}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Stream Uptime</p>
                        <p className="text-lg">{stats.rumble.streamUptime} hours</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Chat Messages</p>
                        <p className="text-lg">{stats.rumble.chatMessages}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Earnings</p>
                        <p className="text-lg text-green-400">${stats.rumble.earnings}</p>
                      </div>
                    </div>
                  </div>

                  {/* Kick Stats */}
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-red-400 font-bold">K</div>
                        <h3 className="text-lg font-medium">Kick</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${platforms.kick ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                        {platforms.kick ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400">Followers</p>
                        <p className="text-2xl font-bold">{stats.kick.followers}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Avg. Viewers</p>
                        <p className="text-2xl font-bold">{stats.kick.avgViewers}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Stream Uptime</p>
                        <p className="text-lg">{stats.kick.streamUptime} hours</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Chat Messages</p>
                        <p className="text-lg">{stats.kick.chatMessages}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Earnings</p>
                        <p className="text-lg text-green-400">${stats.kick.earnings}</p>
                      </div>
                    </div>
                  </div>

                  {/* WorldsWave Stats */}
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-purple-400 font-bold">W</div>
                        <h3 className="text-lg font-medium">WorldsWave</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${platforms.worldswave ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                        {platforms.worldswave ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400">Followers</p>
                        <p className="text-2xl font-bold">{stats.worldswave.followers}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Avg. Viewers</p>
                        <p className="text-2xl font-bold">{stats.worldswave.avgViewers}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Stream Uptime</p>
                        <p className="text-lg">{stats.worldswave.streamUptime} hours</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Chat Messages</p>
                        <p className="text-lg">{stats.worldswave.chatMessages}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Earnings</p>
                        <p className="text-lg text-green-400">${stats.worldswave.earnings}</p>
                      </div>
                    </div>
                  </div>

                  {/* YouTube Stats */}
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-red-500 font-bold">Y</div>
                        <h3 className="text-lg font-medium">YouTube</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${platforms.youtube ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                        {platforms.youtube ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400">Followers</p>
                        <p className="text-2xl font-bold">{stats.youtube.followers}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Avg. Viewers</p>
                        <p className="text-2xl font-bold">{stats.youtube.avgViewers}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Stream Uptime</p>
                        <p className="text-lg">{stats.youtube.streamUptime} hours</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Chat Messages</p>
                        <p className="text-lg">{stats.youtube.chatMessages}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Earnings</p>
                        <p className="text-lg text-green-400">${stats.youtube.earnings}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={action.onClick}
                      className="bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center gap-4 hover:bg-gray-700 transition-colors"
                    >
                      {action.icon}
                      <span className="text-sm font-medium">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Recent Activity</h2>
                  <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">New Follower</p>
                        <p className="text-sm text-gray-400">User123 followed your channel</p>
                      </div>
                      <span className="ml-auto text-sm text-gray-400">2m ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'timers' && <TimedMessages />}
          {activeSection === 'chat' && <ChatCommands />}
          {activeSection === 'moderation' && <Moderation />}
          {activeSection === 'loyalty' && <Loyalty />}
          {activeSection === 'settings' && <PlatformSettings />}
          {activeSection === 'campaigns' && <Campaigns />}
          {activeSection === 'premium' && <Premium />}

          {(activeSection === 'giveaways' || activeSection === 'alerts') && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">
                {menuItems.find(item => item.id === activeSection)?.label}
              </h2>
              <p className="text-gray-400">This feature is coming soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;