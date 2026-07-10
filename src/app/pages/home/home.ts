import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { PetService } from '../../services/pets';
import { User } from '../../../../models/user.model';
import { Pet } from '../../../../models/pet.model';

declare const bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true, // Garanta que esta linha existe se for standalone
  imports: [CommonModule, RouterModule] // ISSO diz para o HTML o que é *ngIf, *ngFor e routerLink
})
export class HomeComponent implements OnInit, OnDestroy {

  usuario: User | null = null;
  petsRecentes: Pet[] = [];
  userMenuAberto = false;

  slideAtivo = 1; 
  carrosselTimer: any;

  petSelecionado: Pet | null = null;
  mostrarModalDetalhe = false;
  mostrarModalLoginNecessario = false;


  constructor(
    private authService: AuthService,
    private petService: PetService,
    private router: Router
  ) {}

  
  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
    this.petService.getPetsRecentes().subscribe(pets => {
      this.petsRecentes = pets;
    });
    this.iniciarCarrossel();
  }

  ngOnDestroy(): void {
    // Limpa o timer se o usuário sair da página Home
    if (this.carrosselTimer) {
      clearInterval(this.carrosselTimer);
    }
  }

  iniciarCarrossel(): void {
    this.carrosselTimer = setInterval(() => {
      // Vai de 1 a 3, e depois volta para o 1
      this.slideAtivo = this.slideAtivo === 3 ? 1 : this.slideAtivo + 1;
    }, 4000); // 4000ms = 4 segundos
  }

  // Permite mudar o slide manualmente ao clicar nos botões/setas
  mudarSlideManualmente(numeroSlide: number): void {
    this.slideAtivo = numeroSlide;
    // Reinicia o timer para não pular rápido demais logo após o clique do usuário
    clearInterval(this.carrosselTimer);
    this.iniciarCarrossel();
  }

  darMatch(): void {
    if (this.authService.isLogado()) {
      this.router.navigate(['/match']);
    } else {
      this.router.navigate(['/login'], { queryParams: { redirect: 'match' } });
    }
  }

  // Chamado pelo botão "Dar Match" de cada card na grade de pets.
  // Só mostra os detalhes do pet se o usuário estiver logado;
  // caso contrário, exibe o pop-up pedindo login/cadastro.
  darMatchPet(pet: Pet): void {
    if (this.authService.isLogado()) {
      this.petSelecionado = pet;
      this.mostrarModalDetalhe = true;
    } else {
      this.mostrarModalLoginNecessario = true;
    }
  }

  fecharModalDetalhe(): void {
    this.mostrarModalDetalhe = false;
    this.petSelecionado = null;
  }

  fecharModalLoginNecessario(): void {
    this.mostrarModalLoginNecessario = false;
  }

  irParaLogin(): void {
    this.mostrarModalLoginNecessario = false;
    this.router.navigate(['/login'], { queryParams: { redirect: 'match' } });
  }

  private abrirDetalhesPet(pet: Pet): void {
    this.petSelecionado = pet;
    const modalEl = document.getElementById('modalDetalhePetHome');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  private abrirModalLoginNecessario(): void {
    const modalEl = document.getElementById('modalLoginNecessario');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  logout(): void {
    this.authService.logout();
    this.usuario = null;
    this.userMenuAberto = false;
    this.router.navigate(['/']);
  }
}
