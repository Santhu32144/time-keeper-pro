import { createAction } from '@reduxjs/toolkit';

export const toggleCollapse = createAction('sidebar/toggleCollapse');
export const setActiveSection = createAction<string>('sidebar/setActiveSection');
export const toggleMenu = createAction<string>('sidebar/toggleMenu');
export const expandMenu = createAction<string>('sidebar/expandMenu');
