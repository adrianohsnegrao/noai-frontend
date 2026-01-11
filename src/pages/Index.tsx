import LoginForm from '@/components/LoginForm';
import Footer from '@/components/Footer';

/**
 * Página principal de login do sistema NOAI
 * Design minimalista, futurista e 100% responsivo
 */
const Index = () => {
  /**
   * Handler para submit do login
   * Preparado para integração com API de autenticação
   */
  const handleLogin = async (data: { email: string; password: string }) => {
    // TODO: Implementar integração com API de autenticação
    console.log('Login data:', data);
  };

  /**
   * Handler para "Esqueci minha senha"
   */
  const handleForgotPassword = () => {
    // TODO: Navegar para página de recuperação de senha
    console.log('Navigate to forgot password');
  };

  /**
   * Handler para "Criar conta"
   */
  const handleCreateAccount = () => {
    // TODO: Navegar para página de criação de conta
    console.log('Navigate to create account');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Área principal centralizada */}
      <main className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-sm flex flex-col items-center text-center">
          {/* Título NOAI */}
          <h1 className="noai-title text-5xl sm:text-6xl md:text-7xl font-bold 
                         text-foreground animate-fade-in">
            NOAI
          </h1>

          {/* Subtítulo */}
          <p className="mt-4 text-base sm:text-lg text-muted-foreground 
                        tracking-wide animate-fade-in-delay-1">
            Pessoas. Não algoritmos
          </p>

          {/* Separador visual */}
          <div className="w-12 h-px bg-border my-8 animate-fade-in-delay-1" />

          {/* Formulário de Login */}
          <LoginForm
            onSubmit={handleLogin}
            onForgotPassword={handleForgotPassword}
            onCreateAccount={handleCreateAccount}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
