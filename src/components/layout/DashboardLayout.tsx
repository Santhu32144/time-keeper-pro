import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/reducers/authReducer';
import { toggleCollapse, setActiveSection } from '@/store/reducers/sidebarReducer';
import { cn } from '@/lib/utils';
import {
  Clock,
  FolderKanban,
  Users,
  CheckSquare,
  DollarSign,
  Calendar,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  { id: 'timesheets', label: 'Time Sheets', icon: Clock, path: '/dashboard/timesheets' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, path: '/dashboard/projects' },
  { id: 'users', label: 'Users', icon: Users, path: '/dashboard/users' },
  { id: 'approvals', label: 'Approvals', icon: CheckSquare, path: '/dashboard/approvals' },
  { id: 'salary', label: 'Salary Part', icon: DollarSign, path: '/dashboard/salary' },
  { id: 'holidays', label: 'Holidays', icon: Calendar, path: '/dashboard/holidays' },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { isAuthenticated, currentUser } = useAppSelector((state) => state.auth);
  const { isCollapsed, activeSection } = useAppSelector((state) => state.sidebar);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find((item) => currentPath.startsWith(item.path));
    if (activeItem) {
      dispatch(setActiveSection(activeItem.id));
    }
  }, [location.pathname, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
    navigate('/auth');
  };

  const handleMenuClick = (item: typeof menuItems[0]) => {
    dispatch(setActiveSection(item.id));
    navigate(item.path);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full bg-sidebar z-50 transition-all duration-300 ease-in-out flex flex-col',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-sidebar-foreground">TimeTracker</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleCollapse())}
            className="text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-2 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                  'text-sidebar-foreground hover:bg-sidebar-accent'
                )}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {currentUser?.username?.slice(0, 2).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="text-sm font-medium truncate">{currentUser?.username}</p>
                    <p className="text-xs text-sidebar-muted truncate capitalize">{currentUser?.role}</p>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{currentUser?.username}</p>
                <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          'flex-1 min-h-screen transition-all duration-300 ease-in-out',
          isCollapsed ? 'ml-16' : 'ml-64'
        )}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
