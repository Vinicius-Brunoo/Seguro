import type { AtendimentoStatus } from './data/statusOptions';

export type QuoteId = string | number;

export type Quote = {
  id: QuoteId;
  nome: string | null;
  sobrenome: string | null;
  cpf: string | null;
  estado_civil: string | null;
  placa: string | null;
  cep: string | null;
  tipo_moradia: string | null;
  ano_modelo: string | null;
  under_26: boolean | string | number | null;
  uso_veiculo: string | null;
  detalhe_uso_profissional: string | null;
  is_insured: boolean | string | number | null;
  apolice_recebida: boolean | string | number | null;
  apolice_media_id: string | null;
  apolice_tipo: string | null;
  origem: string | null;
  campanha: string | null;
  tipo_veiculo: string | null;
  status: string | null;
  step: string | number | null;
  enviado_leo: boolean | string | number | null;
  status_atendimento: AtendimentoStatus | null;
  created_at: string | null;
  [key: string]: unknown;
};
