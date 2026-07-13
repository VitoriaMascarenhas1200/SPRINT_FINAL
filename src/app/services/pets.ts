
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
      id: 1, nome: 'Caramelo', especie: 'cachorro', raca: 'Golden Retriever', porte: 'grande',
      faixaEtaria: 'adulto', idadeAnos: 3, sexo: 'macho', cidade: 'Salvador', estado: 'BA',
      ong: 'ONG Patinhas do Bem', foto: '/img/Caramelo.jpg',
      descricao: 'Caramelo é um cão dócil e brincalhão, resgatado das ruas após um acidente. Já está recuperado, castrado e pronto para uma família amorosa.',
      temperamento: ['Dócil', 'Brincalhão', 'Sociável'], vacinado: true, castrado: true,
      dataResgate: '2026-06-20', recemResgatado: true
    },
    {
      id: 2, nome: 'Mel', especie: 'gato', raca: 'SRD', porte: 'pequeno',
      faixaEtaria: 'filhote', idadeAnos: 0, sexo: 'femea', cidade: 'Salvador', estado: 'BA',
      ong: 'Instituto Focinhos Felizes', foto: '/img/Mel.jpeg',
      descricao: 'Mel foi encontrada em uma caixa abandonada com seus irmãos. É curiosa, cheia de energia e adora colo.',
      temperamento: ['Curiosa', 'Carinhosa'], vacinado: true, castrado: false,
      dataResgate: '2026-06-28', recemResgatado: true
    },
    {
      id: 3, nome: 'Thor', especie: 'cachorro', raca: 'Golden Retriever', porte: 'pequeno',
      faixaEtaria: 'adulto', idadeAnos: 4, sexo: 'macho', cidade: 'Lauro de Freitas', estado: 'BA',
      ong: 'ONG Patinhas do Bem', foto: '/img/Thor.jpg',
      descricao: 'Thor é forte e protetor, mas extremamente carinhoso com quem confia. Ideal para casas com quintal.',
      temperamento: ['Protetor', 'Leal', 'Calmo'], vacinado: true, castrado: true,
      dataResgate: '2026-05-15', recemResgatado: false
    },
    {
      id: 4, nome: 'Luna', especie: 'gato', raca: 'SRD', porte: 'pequeno',
      faixaEtaria: 'adulto', idadeAnos: 2, sexo: 'femea', cidade: 'Salvador', estado: 'BA',
      ong: 'Instituto Focinhos Felizes', foto: '/img/Luna.avif',
      descricao: 'Luna é independente, elegante e adora observar tudo de um cantinho alto. Já está vacinada e castrada.',
      temperamento: ['Independente', 'Observadora'], vacinado: true, castrado: true,
      dataResgate: '2026-04-02', recemResgatado: false
    },
    {
      id: 5, nome: 'Bidu', especie: 'cachorro', raca: 'Schnauzer', porte: 'pequeno',
      faixaEtaria: 'idoso', idadeAnos: 9, sexo: 'macho', cidade: 'Camaçari', estado: 'BA',
      ong: 'Abrigo Amigo Fiel', foto: '/img/Bidu.jpg',
      descricao: 'Bidu é um companheiro tranquilo, perfeito para quem busca um pet mais calmo. Precisa de cuidados veterinários de rotina.',
      temperamento: ['Calmo', 'Companheiro'], vacinado: true, castrado: true,
      dataResgate: '2026-06-25', recemResgatado: true
    },
    {
      id: 6, nome: 'Nina', especie: 'cachorro', raca: 'SRD', porte: 'medio',
      faixaEtaria: 'filhote', idadeAnos: 0, sexo: 'femea', cidade: 'Salvador', estado: 'BA',
      ong: 'ONG Patinhas do Bem', foto: '/img/Nina.jpg',
      descricao: 'Nina foi resgatada junto com a mãe e os irmãos. É elétrica, adora brincar e está aprendendo a confiar em humanos.',
      temperamento: ['Elétrica', 'Brincalhona'], vacinado: true, castrado: false,
      dataResgate: '2026-07-01', recemResgatado: true
    },
    {
      id: 7, nome: 'Simba', especie: 'gato', raca: 'SRD', porte: 'pequeno',
      faixaEtaria: 'adulto', idadeAnos: 3, sexo: 'macho', cidade: 'Lauro de Freitas', estado: 'BA',
      ong: 'Instituto Focinhos Felizes', foto: '/img/Simba.avif',
      descricao: 'Simba é brincalhão e adora perseguir bolinhas. Convive bem com outros gatos.',
      temperamento: ['Brincalhão', 'Sociável'], vacinado: true, castrado: true,
      dataResgate: '2026-03-18', recemResgatado: false
    },
    {//AQUI VERIFICAR INFORMAÇÕES DO PET, SE ESTÃO CORRETAS
      id: 8, nome: 'Amora', especie: 'gato', raca: 'SRD', porte: 'pequeno',
      faixaEtaria: 'idoso', idadeAnos: 8, sexo: 'femea', cidade: 'Salvador', estado: 'BA',
      ong: 'Abrigo Amigo Fiel', foto: '/img/Amora.avif',
      descricao: 'Amora é tranquila e carinhosa, ideal para uma casa mais quieta. Já perdeu a família por mudança e busca um novo lar definitivo.',
      temperamento: ['Tranquila', 'Carinhosa'], vacinado: true, castrado: true,
      dataResgate: '2026-02-10', recemResgatado: false
    },
    {
      id: 9, nome: 'Robson', especie: 'cachorro', raca: 'Pastor Misto', porte: 'grande',
      faixaEtaria: 'adulto', idadeAnos: 5, sexo: 'macho', cidade: 'Camaçari', estado: 'BA',
      ong: 'Abrigo Amigo Fiel', foto: '/img/Robson.jpg',
      descricao: 'Robson é inteligente e obediente, já responde a comandos básicos. Foi resgatado de maus-tratos e hoje confia em pessoas gentis.',
      temperamento: ['Inteligente', 'Obediente'], vacinado: true, castrado: true,
      dataResgate: '2026-06-30', recemResgatado: true
    },
    {
      id: 10, nome: 'Bela', especie: 'cachorro', raca: 'SRD', porte: 'pequeno',
      faixaEtaria: 'adulto', idadeAnos: 2, sexo: 'femea', cidade: 'Salvador', estado: 'BA',
      ong: 'ONG Patinhas do Bem', foto: '/img/Bela.jpg',
      descricao: 'Bela é pequena, esperta e adora colo. Se dá muito bem com crianças e outros pets.',
      temperamento: ['Esperta', 'Afetuosa'], vacinado: true, castrado: true,
      dataResgate: '2026-05-22', recemResgatado: false
    },
    {//AQUI AS IMAGENS
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
    },
    {
      id: 13, nome: 'Floquinho', especie: 'coelho', raca: 'Coelho Anão', porte: 'pequeno',
      faixaEtaria: 'filhote', idadeAnos: 0, sexo: 'macho', cidade: 'Salvador', estado: 'BA',
      ong: 'Refúgio Patas Miúdas', foto: 'https://images.unsplash.com/photo-1591561582301-7ce6588cc286?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/600/450?image=1',
      descricao: 'Floquinho foi entregue ao refúgio por uma família que não podia mais cuidar dele. É dócil, adora feno fresco e já está se adaptando bem ao contato humano.',
      temperamento: ['Dócil', 'Curioso'], vacinado: true, castrado: false,
      dataResgate: '2026-07-05', recemResgatado: true
    },
    {
      id: 14, nome: 'Neve', especie: 'coelho', raca: 'Coelho Angorá', porte: 'pequeno',
      faixaEtaria: 'adulto', idadeAnos: 2, sexo: 'femea', cidade: 'Lauro de Freitas', estado: 'BA',
      ong: 'Refúgio Patas Miúdas', foto: 'https://images.unsplash.com/photo-1643010815957-716ca660593d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/600/450?image=2',
      descricao: 'Neve tem uma pelagem branca e macia que precisa de escovação regular. É tranquila e se dá bem com outros coelhos.',
      temperamento: ['Tranquila', 'Sociável'], vacinado: true, castrado: true,
      dataResgate: '2026-06-10', recemResgatado: false
    },
    {
      id: 15, nome: 'Pipoca', especie: 'porquinho-da-india', raca: 'Porquinho-da-índia SRD', porte: 'pequeno',
      faixaEtaria: 'filhote', idadeAnos: 0, sexo: 'femea', cidade: 'Salvador', estado: 'BA',
      ong: 'Refúgio Patas Miúdas', foto: 'https://images.unsplash.com/photo-1512087499053-023f060e2cea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/600/450?image=3',
      descricao: 'Pipoca foi resgatada de um cativeiro superlotado. É agitada, adora vegetais frescos e vive fazendo barulhinhos de felicidade.',
      temperamento: ['Agitada', 'Vocal', 'Sociável'], vacinado: true, castrado: false,
      dataResgate: '2026-07-08', recemResgatado: true
    },
    {
      id: 16, nome: 'Tico', especie: 'porquinho-da-india', raca: 'Porquinho-da-índia Peruano', porte: 'pequeno',
      faixaEtaria: 'adulto', idadeAnos: 1, sexo: 'macho', cidade: 'Camaçari', estado: 'BA',
      ong: 'Refúgio Patas Miúdas', foto: 'https://images.unsplash.com/photo-1512483652399-7a1f99aa0dd3?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/600/450?image=4',
      descricao: 'Tico tem uma pelagem longa que precisa de cuidados extras. É calmo e adora se esconder em tocas de brinquedo.',
      temperamento: ['Calmo', 'Caseiro'], vacinado: true, castrado: true,
      dataResgate: '2026-05-20', recemResgatado: false
    },
    {
      id: 17, nome: 'Amendoim', especie: 'hamster', raca: 'Hamster Sírio', porte: 'pequeno',
      faixaEtaria: 'filhote', idadeAnos: 0, sexo: 'macho', cidade: 'Salvador', estado: 'BA',
      ong: 'Refúgio Patas Miúdas', foto: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/600/450?image=5',
      descricao: 'Amendoim é pequeno, elétrico e adora correr na rodinha à noite. Está pronto para um novo lar com bastante enriquecimento ambiental.',
      temperamento: ['Ativo', 'Independente'], vacinado: false, castrado: false,
      dataResgate: '2026-07-09', recemResgatado: true
    },
    {
      id: 18, nome: 'Gengibre', especie: 'hamster', raca: 'Hamster Anão Russo', porte: 'pequeno',
      faixaEtaria: 'adulto', idadeAnos: 1, sexo: 'femea', cidade: 'Lauro de Freitas', estado: 'BA',
      ong: 'Refúgio Patas Miúdas', foto: 'https://images.unsplash.com/photo-1599154820236-ebe408351213?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/600/450?image=6',
      descricao: 'Gengibre é curiosa e adora explorar túneis. Já está acostumada a ser manuseada com cuidado por voluntários do refúgio.',
      temperamento: ['Curiosa', 'Dócil'], vacinado: false, castrado: false,
      dataResgate: '2026-06-15', recemResgatado: false
    },
    {
      id: 19, nome: 'Piu', especie: 'calopsita', raca: 'Calopsita Perolada', porte: 'pequeno',
      faixaEtaria: 'filhote', idadeAnos: 0, sexo: 'macho', cidade: 'Salvador', estado: 'BA',
      ong: 'Refúgio Patas Miúdas', foto: 'https://images.unsplash.com/photo-1615827453817-128e639ba2cf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/600/450?image=7',
      descricao: 'Piu foi resgatado após ser encontrado sozinho em uma praça. Já assobia pequenas melodias e adora interagir com pessoas.',
      temperamento: ['Falante', 'Sociável', 'Curioso'], vacinado: true, castrado: false,
      dataResgate: '2026-07-06', recemResgatado: false
    },
    {
      id: 20, nome: 'Sol', especie: 'calopsita', raca: 'Calopsita Lutino', porte: 'pequeno',
      faixaEtaria: 'adulto', idadeAnos: 3, sexo: 'femea', cidade: 'Camaçari', estado: 'BA',
      ong: 'Refúgio Patas Miúdas', foto: 'https://plus.unsplash.com/premium_photo-1710347001600-411ae83fb6a4?q=80&w=1195&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/600/450?image=8',
      descricao: 'Sol é tranquila e adora ficar no ombro de quem cuida dela. Foi entregue ao refúgio após uma mudança de cidade da família anterior.',
      temperamento: ['Tranquila', 'Carinhosa'], vacinado: true, castrado: false,
      dataResgate: '2026-04-28', recemResgatado: false
    },
    {
      id: 21, nome: 'Kiwi', especie: 'periquito', raca: 'Periquito Australiano', porte: 'pequeno',
      faixaEtaria: 'filhote', idadeAnos: 0, sexo: 'macho', cidade: 'Salvador', estado: 'BA',
      ong: 'Refúgio Patas Miúdas', foto: 'https://images.unsplash.com/photo-1781060658692-42811d2ed0bb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/600/450?image=9',
      descricao: 'Kiwi é pequeno e cheio de energia, adora voar entre poleiros. Está em fase de socialização com voluntários.',
      temperamento: ['Ativo', 'Brincalhão'], vacinado: true, castrado: false,
      dataResgate: '2026-07-04', recemResgatado: true
    },
    {//FALTA BUSCAR IMAGENS
      id: 22, nome: 'Flor', especie: 'periquito', raca: 'Periquito Inglês', porte: 'pequeno',
      faixaEtaria: 'idoso', idadeAnos: 4, sexo: 'femea', cidade: 'Lauro de Freitas', estado: 'BA',
      ong: 'Refúgio Patas Miúdas', foto: 'https://placehold.co/600x450/2E8B57/FFFFFF?text=Flor+%F0%9F%A6%9C',
      descricao: 'Flor é serena e gosta de observar o movimento da casa de um poleiro tranquilo. Precisa de um lar silencioso e paciente.',
      temperamento: ['Serena', 'Observadora'], vacinado: true, castrado: false,
      dataResgate: '2026-03-30', recemResgatado: false
    },
    {
      id: 23, nome: 'Mimi', especie: 'gato', raca: 'Persa Misto', porte: 'pequeno',
      faixaEtaria: 'adulto', idadeAnos: 3, sexo: 'femea', cidade: 'Salvador', estado: 'BA',
      ong: 'Instituto Focinhos Felizes', foto: 'https://placekitten.com/600/450?image=5',
      descricao: 'Mimi é elegante e um pouco tímida no início, mas se torna extremamente carinhosa depois que ganha confiança.',
      temperamento: ['Tímida', 'Carinhosa'], vacinado: true, castrado: true,
      dataResgate: '2026-05-02', recemResgatado: false
    },
    {
      id: 24, nome: 'Zeus', especie: 'cachorro', raca: 'Vira-lata Caramelo', porte: 'medio',
      faixaEtaria: 'filhote', idadeAnos: 0, sexo: 'macho', cidade: 'Camaçari', estado: 'BA',
      ong: 'ONG Patinhas do Bem', foto: 'https://placedog.net/600/450?id=9',
      descricao: 'Zeus foi resgatado junto com a ninhada em um terreno baldio. É brincalhão, saudável e cheio de energia para uma nova família.',
      temperamento: ['Brincalhão', 'Energético'], vacinado: true, castrado: false,
      dataResgate: '2026-07-10', recemResgatado: false
    },
    {
      id: 25, nome: 'Pluma', especie: 'coelho', raca: 'Coelho Holandês', porte: 'pequeno',
      faixaEtaria: 'idoso', idadeAnos: 3, sexo: 'femea', cidade: 'Salvador', estado: 'BA',
      ong: 'Refúgio Patas Miúdas', foto: 'https://placehold.co/600x450/2E8B57/FFFFFF?text=Pluma+%F0%9F%90%B0',
      descricao: 'Pluma é uma coelha tranquila que precisa de um espaço seguro para saltar. Já está castrada e habituada ao convívio humano.',
      temperamento: ['Tranquila', 'Independente'], vacinado: true, castrado: true,
      dataResgate: '2026-02-18', recemResgatado: false
    },
    {
      id: 26, nome: 'Cacau', especie: 'hamster', raca: 'Hamster Chinês', porte: 'pequeno',
      faixaEtaria: 'adulto', idadeAnos: 1, sexo: 'macho', cidade: 'Salvador', estado: 'BA',
      ong: 'Refúgio Patas Miúdas', foto: 'https://placehold.co/600x450/2E8B57/FFFFFF?text=Cacau+%F0%9F%90%B9',
      descricao: 'Cacau é pequeno, esperto e adora guardar comida nas bochechas. Está pronto para um novo lar com gaiola adequada.',
      temperamento: ['Esperto', 'Reservado'], vacinado: false, castrado: false,
      dataResgate: '2026-07-11', recemResgatado: false
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
 