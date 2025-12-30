import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SidebarState } from '../types';

const initialState: SidebarState = {
  isCollapsed: false,
  activeSection: 'timesheets',
  expandedMenus: [],
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    toggleMenu: (state, action: PayloadAction<string>) => {
      const menuId = action.payload;
      if (state.expandedMenus.includes(menuId)) {
        state.expandedMenus = state.expandedMenus.filter((id) => id !== menuId);
      } else {
        state.expandedMenus.push(menuId);
      }
    },
    expandMenu: (state, action: PayloadAction<string>) => {
      if (!state.expandedMenus.includes(action.payload)) {
        state.expandedMenus.push(action.payload);
      }
    },
  },
});

export const { toggleCollapse, setActiveSection, toggleMenu, expandMenu } = sidebarSlice.actions;
export default sidebarSlice.reducer;
