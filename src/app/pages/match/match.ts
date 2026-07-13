import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { PetService } from '../../services/pets';
import { Pet, PetFiltro } from '../../../../models/pet.model';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-match',
  templateUrl: './match.html',
  styleUrls: ['./match.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class MatchComponent implements OnInit {

  usuario: User | null = null;
  filtroForm!: FormGroup;

  resultados: Pet[] = [];
  buscou = false;
  carregando = false;

  petSelecionado: Pet | null = null;
  mostrarModalDetalhe = false;
  matchesConfirmados = new Set<number>();

  userMenuAberto = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private petService: PetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();

    this.filtroForm = this.fb.group({
      especie: [''],
      porte: [''],
      faixaEtaria: [''],
      sexo: ['']
    });

    // Já mostra pets assim que a página abre (após login/cadastro),
    // sem exigir que o usuário faça uma busca primeiro.
    this.buscarPets();
  }

  buscarPets(): void {
    this.carregando = true;
    this.buscou = true;
    const filtro = this.filtroForm.value as PetFiltro;

    this.petService.buscarPets(filtro).subscribe(pets => {
      this.resultados = pets;
      this.carregando = false;
    });
  }

  verDetalhes(pet: Pet): void {
    this.petSelecionado = pet;
    this.mostrarModalDetalhe = true;
  }

  fecharModalDetalhe(): void {
    this.mostrarModalDetalhe = false;
    this.petSelecionado = null;
  }

  confirmarMatch(pet: Pet): void {
    this.matchesConfirmados.add(pet.id);
  }

  jaTemMatch(pet: Pet): boolean {
    return this.matchesConfirmados.has(pet.id);
  }

  logout(): void {
    this.authService.logout();
    this.userMenuAberto = false;
    this.router.navigate(['/']);
  }
}