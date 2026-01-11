import { useState } from 'react';
import VersionModal from './VersionModal';

/**
 * Versão atual do projeto
 * Em produção, pode ser injetada via build
 */
const PROJECT_VERSION = 'v1.0.0';

/**
 * Componente Footer do sistema NOAI
 * Dividido em três seções: trademark, créditos do desenvolvedor e versão
 */
const Footer = () => {
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);

  return (
    <>
      <footer 
        className="fixed bottom-0 left-0 right-0 py-4 px-6 
                   border-t border-border/50 bg-background/80 backdrop-blur-sm"
        role="contentinfo"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center 
                        justify-between gap-3 text-xs text-muted-foreground">
          {/* Seção Esquerda - Trademark */}
          <div className="order-2 sm:order-1">
            <span className="font-mono tracking-wider">NOAI™</span>
          </div>

          {/* Seção Central - Créditos do desenvolvedor */}
          <div className="order-1 sm:order-2 text-center">
            <span>Desenvolvido por </span>
            <a
              href="https://github.com/adrianohsnegrao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary noai-link transition-colors"
              aria-label="Perfil do GitHub de Adriano Negrão (abre em nova aba)"
            >
              Adriano Negrão
            </a>
          </div>

          {/* Seção Direita - Versão */}
          <div className="order-3">
            <button
              onClick={() => setIsVersionModalOpen(true)}
              className="font-mono hover:text-primary transition-colors"
              aria-label={`Versão ${PROJECT_VERSION}. Clique para ver detalhes`}
            >
              {PROJECT_VERSION}
            </button>
          </div>
        </div>
      </footer>

      {/* Modal de Versão */}
      <VersionModal
        isOpen={isVersionModalOpen}
        onClose={() => setIsVersionModalOpen(false)}
        currentVersion={PROJECT_VERSION}
      />
    </>
  );
};

export default Footer;
