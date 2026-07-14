export type StatusMatch =
  | 'aguardando_contato'
  | 'visita_agendada'
  | 'adocao_concluida';

export interface MatchRegistro {
  petId: number;
  status: StatusMatch;
  dataMatch: string;
}