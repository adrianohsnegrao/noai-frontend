import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotificationsPanel from './NotificationsPanel';

interface AppHeaderProps {
  showHomeButton?: boolean;
}

const AppHeader = ({ showHomeButton = true }: AppHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {showHomeButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/home')}
              className="text-muted-foreground hover:text-foreground hover:bg-noai-surface-hover"
            >
              <Home className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Right side - Notifications */}
        <div className="flex items-center gap-2">
          <NotificationsPanel />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
