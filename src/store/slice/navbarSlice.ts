// navbarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavbarState {
  activeSection: string;
  userMenuOpen: boolean;
}

const initialState: NavbarState = {
  activeSection: '',
  userMenuOpen: false,
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    toggleUserMenu: (state) => {
      state.userMenuOpen = !state.userMenuOpen;
    },
    closeUserMenu: (state) => {
      state.userMenuOpen = false;
    },
  },
});

export const { setActiveSection, toggleUserMenu, closeUserMenu } = navbarSlice.actions;
export default navbarSlice.reducer;
