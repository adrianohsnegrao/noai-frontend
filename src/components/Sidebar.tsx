import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Users, TrendingUp, Radio, LogOut, Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarProps {
  user: {
    id: string;
    full_name: string;
    avatar_url?: string;
  };
  onNavigateToProfile: (userId: string) => void;
  onLogout: () => void;
}

const Sidebar = ({ user, onNavigateToProfile, onLogout }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { icon: Users, label: 'People nearby', path: '/people-nearby' },
    { icon: TrendingUp, label: 'Most searched', path: '/most-searched' },
    { icon: Radio, label: 'People live', path: '/people-live' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search for:', searchQuery);
  };

  const handleNavigationClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path: string) => location.pathname === path;

  const sidebarContent = (
    <>
      <div
        onClick={() => onNavigateToProfile(user.id)}
        className="flex items-center gap-3 p-4 cursor-pointer
                   hover:bg-noai-surface-hover rounded-lg transition-colors
                   group"
        role="button"
        tabIndex={0}
        aria-label={`View profile of ${user.full_name}`}
      >
        <Avatar className="w-12 h-12 border-2 border-border group-hover:border-primary transition-colors">
          <AvatarImage src={user.avatar_url} alt={user.full_name} />
          <AvatarFallback className="bg-secondary text-foreground">
            {user.full_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {user.full_name}
          </p>
        </div>
      </div>

      <form onSubmit={handleSearchSubmit} className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search people..."
            className="w-full h-10 pl-10 pr-4 bg-secondary border border-border rounded-lg
                     text-foreground placeholder:text-muted-foreground
                     focus:outline-none focus:border-primary/50 noai-input-glow
                     transition-all duration-300"
          />
        </div>
      </form>

      <nav className="flex-1 px-2 py-3 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActivePath(item.path);
          return (
            <button
              key={item.path}
              onClick={() => handleNavigationClick(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3
                       rounded-lg transition-all duration-200 group
                       ${isActive 
                         ? 'bg-primary/10 text-primary' 
                         : 'text-muted-foreground hover:text-foreground hover:bg-noai-surface-hover'
                       }`}
            >
              <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'group-hover:text-primary'}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3
                   bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground
                   rounded-lg font-medium transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logoff</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-card border border-border rounded-lg
                 text-foreground hover:bg-noai-surface-hover transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-72 bg-card border-r border-border
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {sidebarContent}
      </aside>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
