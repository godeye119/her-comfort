import { create } from 'zustand';

export type Season = 'winter' | 'spring' | 'summer' | 'autumn';
export type WinterState = 'idle' | 'comfort' | 'expression';
export type SpringState = 'idle' | 'play' | 'expression' | 'flow';

interface SeasonState {
  season: Season;
  setSeason: (season: Season) => void;
  // Winter Phase State
  winterState: WinterState;
  setWinterState: (state: WinterState) => void;
  // Spring Phase State
  springState: SpringState;
  setSpringState: (state: SpringState) => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

export const useSeasonStore = create<SeasonState>((set) => ({
  season: 'winter', // 🔒 Eternal Winter Mode - Locked
  setSeason: () => {}, // Disabled - season switching removed
  winterState: 'idle',
  setWinterState: (state) => set({ winterState: state }),
  springState: 'idle',
  setSpringState: (state) => set({ springState: state }),
  isSoundEnabled: true,
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
}));
