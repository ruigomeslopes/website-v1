import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode | string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

/**
 * EmptyState Component
 * Used when filters return no results or content is not available
 */
export function EmptyState({
  icon = '🔍',
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      {/* Icon */}
      <div className="mb-6 flex items-center justify-center">
        {typeof icon === 'string' ? (
          <span className="text-6xl opacity-50">{icon}</span>
        ) : (
          <div className="text-text-tertiary opacity-50">{icon}</div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold font-heading text-text-primary mb-3">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-base text-text-secondary max-w-md mb-6">
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

/**
 * Pre-configured empty state for "No Results"
 */
export function NoResultsEmptyState({
  onClearFilters,
  clearFiltersLabel = 'Clear Filters',
}: {
  onClearFilters?: () => void;
  clearFiltersLabel?: string;
}) {
  return (
    <EmptyState
      icon="🔍"
      title="Nenhum resultado encontrado"
      description="Não encontrámos artigos que correspondam aos filtros selecionados. Tenta ajustar os filtros ou limpar a pesquisa."
      action={
        onClearFilters
          ? {
              label: clearFiltersLabel,
              onClick: onClearFilters,
            }
          : undefined
      }
    />
  );
}

/**
 * Pre-configured empty state for "Coming Soon"
 */
export function ComingSoonEmptyState() {
  return (
    <EmptyState
      icon="🚧"
      title="Em breve"
      description="Estamos a trabalhar em novos conteúdos. Volta em breve para veres as novidades!"
    />
  );
}

/**
 * Pre-configured empty state for "No Content"
 */
export function NoContentEmptyState({ category }: { category?: string }) {
  return (
    <EmptyState
      icon="📝"
      title={category ? `Sem artigos em ${category}` : 'Sem conteúdo'}
      description="Ainda não há artigos disponíveis nesta categoria. Estamos a trabalhar em novos conteúdos!"
    />
  );
}
