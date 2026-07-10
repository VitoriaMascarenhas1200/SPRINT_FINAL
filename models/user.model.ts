export interface User {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  aceitouTermos: boolean;
  aceitouLGPD: boolean;
  criadoEm: string;
}
