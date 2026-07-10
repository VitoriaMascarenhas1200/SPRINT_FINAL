import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor e os pipes (titlecase, lowercase, slice)
import { ReactiveFormsModule } from '@angular/forms'; // Para [formGroup] e formControlName
import { RouterModule } from '@angular/router'; // Para routerLink da navbar
import { AuthService } from '../../services/auth';
import { PetService } from '../../services/pets';
import { Pet, PetFiltro } from '../../../../models/pet.model';
import { User } from '../../../../models/user.model';

declare const bootstrap: any;

@Component({
  selector: 'app-match',
  templateUrl: './match.html',
  styleUrls: ['./match.css'],
  standalone: true, // Certifique-se de que está true se for componente autônomo
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
    const modalEl = document.getElementById('modalDetalhePet');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  confirmarMatch(pet: Pet): void {
    this.matchesConfirmados.add(pet.id);
  }

  jaTemMatch(pet: Pet): boolean {
    return this.matchesConfirmados.has(pet.id);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
