// Auth Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  managerId?: string;
  createdAt: string;
}

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  registeredUsers: User[];
}

// Project Types
export interface Project {
  id: string;
  name: string;
  code: string;
  startDate: string;
  createdAt: string;
  createdBy: string;
  status: 'active' | 'completed' | 'on-hold';
}

export interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

// User Types
export interface AppUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  managerId?: string;
  createdAt: string;
}

export interface UserState {
  users: AppUser[];
  isLoading: boolean;
  error: string | null;
}

// Sidebar Types
export interface SidebarState {
  isCollapsed: boolean;
  activeSection: string;
  expandedMenus: string[];
}

// Root State Type
export interface RootState {
  auth: AuthState;
  projects: ProjectState;
  users: UserState;
  sidebar: SidebarState;
}
