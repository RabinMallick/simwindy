import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DocsState {
  selectedVersion: string;
  activeCodeTab: string;
  openSubmenus: Record<string, boolean>;
  mobileSidebarOpen: boolean;
  currentHash: string;
}

const initialState: DocsState = {
  selectedVersion: '2025-08-29 (latest)',
  activeCodeTab: 'Shell',
  openSubmenus: {},
  mobileSidebarOpen: false,
  currentHash: '',
};

const docsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setSelectedVersion: (state, action: PayloadAction<string>) => {
      state.selectedVersion = action.payload;
    },
    setActiveCodeTab: (state, action: PayloadAction<string>) => {
      state.activeCodeTab = action.payload;
    },
    toggleSubmenu: (state, action: PayloadAction<string>) => {
      state.openSubmenus[action.payload] = !state.openSubmenus[action.payload];
    },
    setMobileSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileSidebarOpen = action.payload;
    },
    setCurrentHash(state, action: PayloadAction<string>) {
      state.currentHash = action.payload;
    },
  },
});

export const {
  setSelectedVersion,
  setActiveCodeTab,
  toggleSubmenu,
  setMobileSidebarOpen,
  setCurrentHash,
} = docsSlice.actions;

export default docsSlice.reducer;
