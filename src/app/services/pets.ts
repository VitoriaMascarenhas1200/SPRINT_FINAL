import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Pet, PetFiltro } from '../../../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  // Dados simulados representando pets cadastrados por ONGs parceiras.
  // Em uma versão futura, isso viria de uma API real.
  private pets: Pet[] = [
    {
      id: 1, nome: 'Caramelo', especie: 'cachorro', raca: 'SRD', porte: 'medio',
      faixaEtaria: 'adulto', idadeAnos: 3, sexo: 'macho', cidade: 'Salvador', estado: 'BA',
      ong: 'ONG Patinhas do Bem', foto: 'https://placedog.net/600/450?id=1',
      descricao: 'Caramelo é um cão dócil e brincalhão, resgatado das ruas após um acidente. Já está recuperado, castrado e pronto para uma família amorosa.',
      temperamento: ['Dócil', 'Brincalhão', 'Sociável'], vacinado: true, castrado: true,
      dataResgate: '2026-06-20', recemResgatado: true
    },
    {
      id: 2, nome: 'Mel', especie: 'gato', raca: 'SRD', porte: 'pequeno',
      faixaEtaria: 'filhote', idadeAnos: 0, sexo: 'femea', cidade: 'Salvador', estado: 'BA',
      ong: 'Instituto Focinhos Felizes', foto: 'https://placecats.com/bella/300/200',
      descricao: 'Mel foi encontrada em uma caixa abandonada com seus irmãos. É curiosa, cheia de energia e adora colo.',
      temperamento: ['Curiosa', 'Carinhosa'], vacinado: true, castrado: false,
      dataResgate: '2026-06-28', recemResgatado: true
    },
    {
      id: 3, nome: 'Thor', especie: 'cachorro', raca: 'Vira-lata Grande', porte: 'grande',
      faixaEtaria: 'adulto', idadeAnos: 4, sexo: 'macho', cidade: 'Lauro de Freitas', estado: 'BA',
      ong: 'ONG Patinhas do Bem', foto: 'https://placedog.net/600/450?id=2',
      descricao: 'Thor é forte e protetor, mas extremamente carinhoso com quem confia. Ideal para casas com quintal.',
      temperamento: ['Protetor', 'Leal', 'Calmo'], vacinado: true, castrado: true,
      dataResgate: '2026-05-15', recemResgatado: false
    },
    {
      id: 4, nome: 'Luna', especie: 'gato', raca: 'Siamês', porte: 'pequeno',
      faixaEtaria: 'adulto', idadeAnos: 2, sexo: 'femea', cidade: 'Salvador', estado: 'BA',
      ong: 'Instituto Focinhos Felizes', foto: 'https://placekitten.com/600/450?image=2',
      descricao: 'Luna é independente, elegante e adora observar tudo de um cantinho alto. Já está vacinada e castrada.',
      temperamento: ['Independente', 'Observadora'], vacinado: true, castrado: true,
      dataResgate: '2026-04-02', recemResgatado: false
    },
    {
      id: 5, nome: 'Bidu', especie: 'cachorro', raca: 'Poodle', porte: 'pequeno',
      faixaEtaria: 'idoso', idadeAnos: 9, sexo: 'macho', cidade: 'Camaçari', estado: 'BA',
      ong: 'Abrigo Amigo Fiel', foto: 'https://placedog.net/600/450?id=3',
      descricao: 'Bidu é um companheiro tranquilo, perfeito para quem busca um pet mais calmo. Precisa de cuidados veterinários de rotina.',
      temperamento: ['Calmo', 'Companheiro'], vacinado: true, castrado: true,
      dataResgate: '2026-06-25', recemResgatado: true
    },
    {
      id: 6, nome: 'Nina', especie: 'cachorro', raca: 'SRD', porte: 'medio',
      faixaEtaria: 'filhote', idadeAnos: 0, sexo: 'femea', cidade: 'Salvador', estado: 'BA',
      ong: 'ONG Patinhas do Bem', foto: 'https://placedog.net/600/450?id=4',
      descricao: 'Nina foi resgatada junto com a mãe e os irmãos. É elétrica, adora brincar e está aprendendo a confiar em humanos.',
      temperamento: ['Elétrica', 'Brincalhona'], vacinado: true, castrado: false,
      dataResgate: '2026-07-01', recemResgatado: true
    },
    {
      id: 7, nome: 'Simba', especie: 'gato', raca: 'SRD', porte: 'medio',
      faixaEtaria: 'adulto', idadeAnos: 3, sexo: 'macho', cidade: 'Lauro de Freitas', estado: 'BA',
      ong: 'Instituto Focinhos Felizes', foto: 'https://placekitten.com/600/450?image=3',
      descricao: 'Simba é brincalhão e adora perseguir bolinhas. Convive bem com outros gatos.',
      temperamento: ['Brincalhão', 'Sociável'], vacinado: true, castrado: true,
      dataResgate: '2026-03-18', recemResgatado: false
    },
    {
      id: 8, nome: 'Amora', especie: 'gato', raca: 'SRD', porte: 'pequeno',
      faixaEtaria: 'idoso', idadeAnos: 8, sexo: 'femea', cidade: 'Salvador', estado: 'BA',
      ong: 'Abrigo Amigo Fiel', foto: 'https://placekitten.com/600/450?image=4',
      descricao: 'Amora é tranquila e carinhosa, ideal para uma casa mais quieta. Já perdeu a família por mudança e busca um novo lar definitivo.',
      temperamento: ['Tranquila', 'Carinhosa'], vacinado: true, castrado: true,
      dataResgate: '2026-02-10', recemResgatado: false
    },
    {
      id: 9, nome: 'Rex', especie: 'cachorro', raca: 'Pastor Misto', porte: 'grande',
      faixaEtaria: 'adulto', idadeAnos: 5, sexo: 'macho', cidade: 'Camaçari', estado: 'BA',
      ong: 'Abrigo Amigo Fiel', foto: 'https://placedog.net/600/450?id=5',
      descricao: 'Rex é inteligente e obediente, já responde a comandos básicos. Foi resgatado de maus-tratos e hoje confia em pessoas gentis.',
      temperamento: ['Inteligente', 'Obediente'], vacinado: true, castrado: true,
      dataResgate: '2026-06-30', recemResgatado: true
    },
    {
      id: 10, nome: 'Bela', especie: 'cachorro', raca: 'SRD', porte: 'pequeno',
      faixaEtaria: 'adulto', idadeAnos: 2, sexo: 'femea', cidade: 'Salvador', estado: 'BA',
      ong: 'ONG Patinhas do Bem', foto: 'https://placedog.net/600/450?id=6',
      descricao: 'Bela é pequena, esperta e adora colo. Se dá muito bem com crianças e outros pets.',
      temperamento: ['Esperta', 'Afetuosa'], vacinado: true, castrado: true,
      dataResgate: '2026-05-22', recemResgatado: false
    },
    {
      id: 11, nome: 'Salém', especie: 'gato', raca: 'Preto SRD', porte: 'medio',
      faixaEtaria: 'filhote', idadeAnos: 0, sexo: 'macho', cidade: 'Lauro de Freitas', estado: 'BA',
      ong: 'Instituto Focinhos Felizes', foto: 'https://placecats.com/neo/300/200',
      descricao: 'Salém é cheio de energia e curiosidade, típico de filhote. Está em processo de socialização.',
      temperamento: ['Curioso', 'Ativo'], vacinado: false, castrado: false,
      dataResgate: '2026-07-03', recemResgatado: true
    },
    {
      id: 12, nome: 'Duque', especie: 'cachorro', raca: 'Labrador Misto', porte: 'grande',
      faixaEtaria: 'idoso', idadeAnos: 10, sexo: 'macho', cidade: 'Salvador', estado: 'BA',
      ong: 'Abrigo Amigo Fiel', foto: 'https://placedog.net/600/450?id=7',
      descricao: 'Duque já foi cão de família e ficou sem lar após o falecimento do tutor. É manso, treinado e merece uma velhice tranquila.',
      temperamento: ['Manso', 'Treinado'], vacinado: true, castrado: true,
      dataResgate: '2026-01-12', recemResgatado: false
    }
  ];

  constructor() {}

  getPetsRecentes(): Observable<Pet[]> {
    const recentes = this.pets.filter(p => p.recemResgatado);
    return of(recentes).pipe(delay(300));
  }

  buscarPets(filtro: PetFiltro): Observable<Pet[]> {
    const resultado = this.pets.filter(pet => {
      if (filtro.especie && pet.especie !== filtro.especie) { return false; }
      if (filtro.porte && pet.porte !== filtro.porte) { return false; }
      if (filtro.faixaEtaria && pet.faixaEtaria !== filtro.faixaEtaria) { return false; }
      if (filtro.sexo && pet.sexo !== filtro.sexo) { return false; }
      return true;
    });
    return of(resultado).pipe(delay(500));
  }

  getPetPorId(id: number): Observable<Pet | undefined> {
    return of(this.pets.find(p => p.id === id)).pipe(delay(150));
  }
}
