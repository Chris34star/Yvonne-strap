import { useEffect, useState } from 'react';

const STORAGE_KEY = 'yvone-website-progress';

export interface SavedState {
  answers: Record<string, unknown>;
  currentScreen: string;
  finalResponse: string | null;
  dateResponse: string | null;
  questionForChris: string | null;
  sharedWithChris: boolean;
}

const defaultState: SavedState = {
  answers: {},
  currentScreen: 'intro',
  finalResponse: null,
  dateResponse: null,
  questionForChris: null,
  sharedWithChris: false,
};

export function loadState(): SavedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<SavedState>;
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

export function saveState(state: SavedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function useSavedState() {
  const [state, setState] = useState<SavedState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  return [state, setState] as const;
}
