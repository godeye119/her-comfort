import { create } from 'zustand';

export type Season = 'winter';
export type WinterState = 'idle' | 'comfort' | 'expression';

interface SeasonState {
  season: Season;
  // Winter Phase State
  winterState: WinterState;
  setWinterState: (state: WinterState) => void;
}

export const useSeasonStore = create<SeasonState>((set) => ({
  season: 'winter',
  winterState: 'idle',
  setWinterState: (state) => set({ winterState: state }),
}));
