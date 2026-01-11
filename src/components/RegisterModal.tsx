import { useState, FormEvent } from 'react';
import { Eye, EyeOff, User, Lock, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

/**
 * Interface para os dados do formulário de registro
 */
export interface RegisterFormData {
  name: string;
  password: string;
  confirmPassword: string;
}

/**
 * Props do componente RegisterModal
 */
interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: RegisterFormData) => void;
}

/**
 * Modal de registro de nova conta
 * Design minimalista e futurista para o sistema NOAI
 */
const RegisterModal = ({ isOpen, onClose, onSubmit }: RegisterModalProps) => {
  // Estado do formulário
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Limpa o formulário
   */
  const resetForm = () => {
    setName('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError('');
  };

  /**
   * Handler para fechar o modal
   */
  const handleClose = () => {
    resetForm();
    onClose();
  };

  /**
   * Handler do submit do formulário
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validação de senhas
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      if (onSubmit) {
        await onSubmit({ name, password, confirmPassword });
      }
      
      // TODO: Implementar chamada à API de registro
      console.log('Register attempt:', { name });
      handleClose();
    } catch (err) {
      console.error('Register error:', err);
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent 
        className="bg-card border-border max-w-sm mx-4 sm:mx-auto"
        aria-describedby="register-description"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground text-center">
            Criar Conta
          </DialogTitle>
        </DialogHeader>

        <p id="register-description" className="sr-only">
          Formulário para criar uma nova conta no sistema NOAI
        </p>

        <form 
          onSubmit={handleSubmit} 
          className="space-y-4 mt-4"
          aria-label="Formulário de registro"
        >
          {/* Mensagem de erro */}
          {error && (
            <div 
              className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg 
                         text-destructive text-sm text-center"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Campo Nome */}
          <div className="space-y-2">
            <label htmlFor="register-name" className="sr-only">
              Nome
            </label>
            <div className="relative">
              <User 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" 
                aria-hidden="true"
              />
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                required
                autoComplete="name"
                className="w-full h-12 pl-11 pr-4 bg-secondary border border-border rounded-lg
                           text-foreground placeholder:text-muted-foreground
                           focus:outline-none focus:border-primary/50 noai-input-glow
                           transition-all duration-300"
                aria-required="true"
              />
            </div>
          </div>

          {/* Campo Senha */}
          <div className="space-y-2">
            <label htmlFor="register-password" className="sr-only">
              Senha
            </label>
            <div className="relative">
              <Lock 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" 
                aria-hidden="true"
              />
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
                autoComplete="new-password"
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

          {/* Campo Confirmação de Senha */}
          <div className="space-y-2">
            <label htmlFor="register-confirm-password" className="sr-only">
              Confirmação de Senha
            </label>
            <div className="relative">
              <Lock 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" 
                aria-hidden="true"
              />
              <input
                id="register-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmação de Senha"
                required
                autoComplete="new-password"
                className="w-full h-12 pl-11 pr-12 bg-secondary border border-border rounded-lg
                           text-foreground placeholder:text-muted-foreground
                           focus:outline-none focus:border-primary/50 noai-input-glow
                           transition-all duration-300"
                aria-required="true"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground
                           hover:text-foreground transition-colors"
                aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Botão de Criar Conta */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary text-primary-foreground font-medium rounded-lg
                       noai-button-glow disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300 hover:brightness-110 mt-2"
            aria-busy={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 
                               border-t-primary-foreground rounded-full animate-spin" />
                Criando...
              </span>
            ) : (
              'Criar Conta'
            )}
          </button>

          {/* Link para voltar */}
          <button
            type="button"
            onClick={handleClose}
            className="w-full text-sm text-muted-foreground hover:text-foreground 
                       noai-link transition-colors py-2"
          >
            Já tenho uma conta
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
