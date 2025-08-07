import { Campaigns } from './components/Campaigns';
import { Premium } from './components/Premium';
import { StreamOverlays } from './components/StreamOverlays';
import { Analytics } from './components/Analytics';
import { SoundBoard } from './components/SoundBoard';
import { WebhookIntegration } from './components/WebhookIntegration';

function App() {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 /> },
    { id: 'chat', label: 'Chat Commands', icon: <Command /> },
    { id: 'timers', label: 'Timed Messages', icon: <Timer /> },
    { id: 'soundboard', label: 'Sound Board', icon: <MessageSquare /> },
    { id: 'overlays', label: 'Stream Overlays', icon: <Eye /> },
    { id: 'moderation', label: 'Moderation', icon: <Shield /> },
    { id: 'giveaways', label: 'Giveaways', icon: <Gift /> },
    { id: 'alerts', label: 'Alerts', icon: <Bell /> },
    { id: 'loyalty', label: 'Loyalty System', icon: <Crown /> },
    { id: 'campaigns', label: 'Ad Campaigns', icon: <DollarSign /> },
    { id: 'webhooks', label: 'Webhooks', icon: <Zap /> },
    { id: 'settings', label: 'Settings', icon: <Settings /> },
  ];

          {activeSection === 'timers' && <TimedMessages />}
          {activeSection === 'chat' && <ChatCommands />}
          {activeSection === 'analytics' && <Analytics />}
          {activeSection === 'soundboard' && <SoundBoard />}
          {activeSection === 'overlays' && <StreamOverlays />}
          {activeSection === 'moderation' && <Moderation />}
          {activeSection === 'loyalty' && <Loyalty />}
          {activeSection === 'settings' && <PlatformSettings />}
          {activeSection === 'campaigns' && <Campaigns />}
          {activeSection === 'webhooks' && <WebhookIntegration />}
          {activeSection === 'premium' && <Premium />}

          {(activeSection === 'giveaways' || activeSection === 'alerts') && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">
                {menuItems.find(item => item.id === activeSection)?.label}