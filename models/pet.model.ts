export type Especie = 'cachorro' | 'gato' | 'coelho' | 'porquinho-da-india' | 'hamster' | 'calopsita' | 'periquito';

export type Porte = 'pequeno' | 'medio' | 'grande';
export type FaixaEtaria = 'filhote' | 'adulto' | 'idoso';
export type Sexo = 'macho' | 'femea';

export interface Pet {
  id: number;
  nome: string;
  especie: Especie;
  raca: string;
  porte: Porte;
  faixaEtaria: FaixaEtaria;
  idadeAnos: number;
  sexo: Sexo;
  cidade: string;
  estado: string;
  ong: string;
  foto: string;
  descricao: string;
  temperamento: string[];
  vacinado: boolean;
  castrado: boolean;
  dataResgate: string;
  recemResgatado: boolean;
}

export interface PetFiltro {
  especie?: Especie | '';
  porte?: Porte | '';
  faixaEtaria?: FaixaEtaria | '';
  sexo?: Sexo | '';
}