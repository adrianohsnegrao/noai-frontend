import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import AppHeader from '@/components/AppHeader';

interface DiscoveryLayoutProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
}

const DiscoveryLayout = ({ title, subtitle, icon, children }: DiscoveryLayoutProps) => {
  const navigate = useNavigate();

  // Mock current user - in real app, this would come from auth context
  const currentUser = {
    id: 'current-user',
    full_name: 'John Doe',
    avatar_url: undefined,
  };

  const handleNavigateToProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar
        user={currentUser}
        onNavigateToProfile={handleNavigateToProfile}
        onLogout={handleLogout}
      />

      <main className="flex-1 min-h-screen flex flex-col">
        <AppHeader />
        
        <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
          {/* Page Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/home')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              {icon && (
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {icon}
                </div>
              )}
              <div>
                <h1 className="text-xl font-semibold text-foreground">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default DiscoveryLayout;
