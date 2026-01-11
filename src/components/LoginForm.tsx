import { useState, FormEvent } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

/**
 * Interface para os dados do formulário de login
 * Preparado para integração futura com API
 */
interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Props do componente LoginForm
 */
interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
  onForgotPassword?: () => void;
  onCreateAccount?: () => void;
}

/**
 * Componente de formulário de login
 * Design minimalista e futurista para o sistema NOAI
 */
const LoginForm = ({ 
  onSubmit, 
  onForgotPassword, 
  onCreateAccount 
}: LoginFormProps) => {
  // Estado do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handler do submit do formulário
   * Preparado para integração com API de autenticação
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Callback para integração externa
      if (onSubmit) {
        await onSubmit({ email, password });
      }
      
      // TODO: Implementar chamada à API de autenticação
      console.log('Login attempt:', { email });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-sm space-y-5 animate-fade-in-delay-2"
      aria-label="Formulário de login"
    >
      {/* Campo de Email */}
      <div className="space-y-2">
        <label 
          htmlFor="email" 
          className="sr-only"
        >
          Email
        </label>
        <div className="relative">
          <Mail 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" 
            aria-hidden="true"
          />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            autoComplete="email"
            className="w-full h-12 pl-11 pr-4 bg-secondary border border-border rounded-lg
                       text-foreground placeholder:text-muted-foreground
                       focus:outline-none focus:border-primary/50 noai-input-glow
                       transition-all duration-300"
            aria-required="true"
          />
        </div>
      </div>

      {/* Campo de Senha */}
      <div className="space-y-2">
        <label 
          htmlFor="password" 
          className="sr-only"
        >
          Senha
        </label>
        <div className="relative">
          <Lock 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" 
            aria-hidden="true"
          />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
            autoComplete="current-password"
            className="w-full h-12 pl-11 pr-12 bg-secondary border border-border rounded-lg
                       text-foreground placeholder:text-muted-foreground
                       focus:outline-none focus:border-primary/50 noai-input-glow
                       transition-all duration-300"
            aria-required="true"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground
                       hover:text-foreground transition-colors"
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Botão de Entrar */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-primary text-primary-foreground font-medium rounded-lg
                   noai-button-glow disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300 hover:brightness-110"
        aria-busy={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-primary-foreground/30 
                           border-t-primary-foreground rounded-full animate-spin" />
            Entrando...
          </span>
        ) : (
          'Entrar'
        )}
      </button>

      {/* Links auxiliares */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-muted-foreground hover:text-foreground 
                     noai-link transition-colors"
        >
          Esqueci minha senha
        </button>
        <span className="hidden sm:block text-border">|</span>
        <button
          type="button"
          onClick={onCreateAccount}
          className="text-sm text-muted-foreground hover:text-foreground 
                     noai-link transition-colors"
        >
          Criar conta
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
