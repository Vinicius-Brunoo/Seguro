import { useEffect } from 'react';

import type { Quote } from '../types';
import {
  formatBoolean,
  formatDate,
  formatEmpty,
  getQuoteFullName,
} from '../utils/quoteFormatters';

type QuoteDetailsModalProps = {
  quote: Quote | null;
  onClose: () => void;
};

export function QuoteDetailsModal({ quote, onClose }: QuoteDetailsModalProps) {
  useEffect(() => {
    if (!quote) {
      return undefined;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, quote]);

  if (!quote) {
    return null;
  }

  const details = [
    { label: 'Nome', value: formatEmpty(quote.nome) },
    { label: 'Sobrenome', value: formatEmpty(quote.sobrenome) },
    { label: 'CPF', value: formatEmpty(quote.cpf) },
    { label: 'Estado Civil', value: formatEmpty(quote.estado_civil) },
    { label: 'CEP', value: formatEmpty(quote.cep) },
    { label: 'Placa', value: formatEmpty(quote.placa) },
    { label: 'Tipo Moradia', value: formatEmpty(quote.tipo_moradia) },
    { label: 'Ano Modelo', value: formatEmpty(quote.ano_modelo) },
    { label: 'Menor de 26', value: formatBoolean(quote.under_26) },
    { label: 'Uso Veículo', value: formatEmpty(quote.uso_veiculo) },
    { label: 'Detalhe Uso Profissional', value: formatEmpty(quote.detalhe_uso_profissional) },
    { label: 'Possui Seguro', value: formatBoolean(quote.is_insured) },
    { label: 'Origem', value: formatEmpty(quote.origem) },
    { label: 'Campanha', value: formatEmpty(quote.campanha) },
    { label: 'Tipo Veículo', value: formatEmpty(quote.tipo_veiculo) },
    { label: 'Data de criação', value: formatDate(quote.created_at) },
  ];

  return (
    <div className="admin-modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="admin-modal__header">
          <div>
            <span>Detalhes da cotação</span>
            <h2 id="quote-details-title">{getQuoteFullName(quote)}</h2>
          </div>
          <button className="admin-icon-button" type="button" aria-label="Fechar detalhes" onClick={onClose}>
            X
          </button>
        </header>

        <dl className="admin-details-grid">
          {details.map((detail) => (
            <div key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
