import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { PetService } from '../../services/pets';
import { MatchService } from '../../services/match';
import { Pet } from '../../../../models/pet.model';
import { User } from '../../../../models/user.model';
import { StatusMatch } from '../../../../models/match';

interface MatchComPet {
  pet: Pet;
  status: StatusMatch;
  dataMatch: string;
}

// Números de WhatsApp de exemplo para cada ONG parceira.
// Substitua pelos números reais de contato de cada ONG.
const TELEFONES_ONG: Record<string, string> = {
  'ONG Patinhas do Bem': '5571991234001',
  'Instituto Focinhos Felizes': '5571991234002',
  'Abrigo Amigo Fiel': '5571991234003'
};

@Component({
  selector: 'app-status',
  templateUrl: './status.html',
  styleUrls: ['./status.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class StatusComponent implements OnInit {

  usuario: User | null = null;
  matches: MatchComPet[] = [];
  carregando = true;
  userMenuAberto = false;

  constructor(
    private authService: AuthService,
    private petService: PetService,
    private matchService: MatchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();

    if (!this.usuario) {
      this.carregando = false;
      return;
    }

    const registros = this.matchService.listar(this.usuario.email);

    if (!registros.length) {
      this.carregando = false;
      return;
    }

    let restantes = registros.length;
    registros.forEach(registro => {
      this.petService.getPetPorId(registro.petId).subscribe(pet => {
        if (pet) {
          this.matches.push({ pet, status: registro.status, dataMatch: registro.dataMatch });
        }
        restantes--;
        if (restantes === 0) {
          this.matches.sort((a, b) => new Date(b.dataMatch).getTime() - new Date(a.dataMatch).getTime());
          this.carregando = false;
        }
      });
    });
  }

  statusLabel(status: StatusMatch): string {
    const labels: Record<StatusMatch, string> = {
      aguardando_contato: 'Aguardando contato da ONG',
      visita_agendada: 'Visita agendada',
      adocao_concluida: 'Adoção concluída'
    };
    return labels[status];
  }

  linkWhatsapp(match: MatchComPet): string {
    const numero = TELEFONES_ONG[match.pet.ong] || '5571999999999';
    const mensagem = `Olá, ${match.pet.ong}! Tenho interesse em adotar o(a) ${match.pet.nome}, com quem dei match no MatchPet. Podemos conversar sobre os próximos passos?`;
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  }

  logout(): void {
    this.authService.logout();
    this.userMenuAberto = false;
    this.router.navigate(['/']);
  }
}