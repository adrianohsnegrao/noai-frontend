import { useState, useEffect } from 'react';
import { X, CheckCircle, Bug, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

/**
 * Interface para os dados de versão retornados pela API
 */
interface VersionData {
  version: string;
  features: string[];
  bugFixes: string[];
}

/**
 * Props do componente VersionModal
 */
interface VersionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVersion: string;
}

/**
 * URL da API de versão - pode ser configurada via variável de ambiente
 * Em produção, definir VITE_VERSION_API_URL no ambiente
 */
const VERSION_API_URL = import.meta.env.VITE_VERSION_API_URL || '';

/**
 * Modal de informações de versão do sistema NOAI
 * Busca dados de versão de uma API REST
 */
const VersionModal = ({ isOpen, onClose, currentVersion }: VersionModalProps) => {
  const [versionData, setVersionData] = useState<VersionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Busca os dados de versão da API quando o modal é aberto
   */
  useEffect(() => {
    if (isOpen) {
      fetchVersionData();
    }
  }, [isOpen]);

  /**
   * Função para buscar dados da API de versão
   * Preparada para receber URL via variável de ambiente
   */
  const fetchVersionData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Se não houver URL configurada, usa dados mock
      if (!VERSION_API_URL) {
        // Simula delay de rede para demonstração
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Dados mock para demonstração
        setVersionData({
          version: currentVersion,
          features: [
            'Interface de login modernizada',
            'Sistema de autenticação preparado para API',
            'Modal de versão com integração REST',
            'Design responsivo para todos os dispositivos',
            'Suporte a internacionalização futura'
          ],
          bugFixes: [
            'Correção de contraste em campos de input',
            'Ajuste de espaçamento em telas mobile',
            'Melhoria na acessibilidade de formulários'
          ]
        });
        return;
      }

      // Chamada real à API
      const response = await fetch(VERSION_API_URL);
      
      if (!response.ok) {
        throw new Error('Falha ao carregar informações de versão');
      }

      const data = await response.json();
      setVersionData(data);
    } catch (err) {
      console.error('Error fetching version data:', err);
      setError('Não foi possível carregar as informações de versão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="bg-card border-border max-w-md mx-4"
        aria-describedby="version-modal-description"
      >
        <DialogHeader>
          <DialogTitle className="font-mono text-xl tracking-wide">
            NOAI <span className="text-primary">{currentVersion}</span>
          </DialogTitle>
        </DialogHeader>

        <p id="version-modal-description" className="sr-only">
          Informações sobre a versão atual do sistema NOAI
        </p>

        <div className="mt-4 space-y-6">
          {/* Estado de carregamento */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <span className="ml-2 text-muted-foreground">Carregando...</span>
            </div>
          )}

          {/* Estado de erro */}
          {error && !isLoading && (
            <div className="text-center py-8">
              <p className="text-destructive">{error}</p>
              <button
                onClick={fetchVersionData}
                className="mt-4 text-sm text-primary hover:underline"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {/* Dados de versão */}
          {versionData && !isLoading && !error && (
            <>
              {/* Features */}
              <section>
                <h3 className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Novas funcionalidades
                </h3>
                <ul className="space-y-2 pl-6">
                  {versionData.features.map((feature, index) => (
                    <li 
                      key={index}
                      className="text-sm text-muted-foreground list-disc"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Bug Fixes */}
              <section>
                <h3 className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                  <Bug className="w-4 h-4 text-primary" />
                  Correções
                </h3>
                <ul className="space-y-2 pl-6">
                  {versionData.bugFixes.map((fix, index) => (
                    <li 
                      key={index}
                      className="text-sm text-muted-foreground list-disc"
                    >
                      {fix}
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VersionModal;
