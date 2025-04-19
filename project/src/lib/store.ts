import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

interface PlatformStats {
  followers: number;
  avgViewers: number;
  totalViews: number;
  hoursViewed: number;
  chatMessages: number;
  peakViewers: number;
  streamUptime: number;
  earnings: number;
}

interface PlatformState {
  platforms: {
    rumble: boolean;
    kick: boolean;
    worldswave: boolean;
    youtube: boolean;
  };
  stats: {
    rumble: PlatformStats;
    kick: PlatformStats;
    worldswave: PlatformStats;
    youtube: PlatformStats;
  };
  togglePlatform: (platform: 'rumble' | 'kick' | 'worldswave' | 'youtube') => void;
  updateStats: (platform: 'rumble' | 'kick' | 'worldswave' | 'youtube', stats: Partial<PlatformStats>) => void;
}

export const usePlatformStore = create<PlatformState>((set) => ({
  platforms: {
    rumble: false,
    kick: false,
    worldswave: false,
    youtube: false,
  },
  stats: {
    rumble: {
      followers: 181,
      avgViewers: 41,
      totalViews: 13010,
      hoursViewed: 41.45,
      chatMessages: 1205,
      peakViewers: 156,
      streamUptime: 6.8,
      earnings: 15.75,
    },
    kick: {
      followers: 0,
      avgViewers: 0,
      totalViews: 0,
      hoursViewed: 0,
      chatMessages: 0,
      peakViewers: 0,
      streamUptime: 0,
      earnings: 0,
    },
    worldswave: {
      followers: 0,
      avgViewers: 0,
      totalViews: 0,
      hoursViewed: 0,
      chatMessages: 0,
      peakViewers: 0,
      streamUptime: 0,
      earnings: 0,
    },
    youtube: {
      followers: 0,
      avgViewers: 0,
      totalViews: 0,
      hoursViewed: 0,
      chatMessages: 0,
      peakViewers: 0,
      streamUptime: 0,
      earnings: 0,
    },
  },
  togglePlatform: (platform) =>
    set((state) => ({
      platforms: {
        ...state.platforms,
        [platform]: !state.platforms[platform],
      },
    })),
  updateStats: (platform, newStats) =>
    set((state) => ({
      stats: {
        ...state.stats,
        [platform]: {
          ...state.stats[platform],
          ...newStats,
        },
      },
    })),
}));