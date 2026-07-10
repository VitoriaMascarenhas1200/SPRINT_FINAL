import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importante para o *ngIf
import { ReactiveFormsModule } from '@angular/forms'; // Importante para o [formGroup]
import { RouterModule } from '@angular/router'; // Caso use links de navegação (ex: routerLink)
import { AuthService } from '../../services/auth';

function senhasIguaisValidator(control: AbstractControl): ValidationErrors | null {
  const senha = control.get('senha')?.value;
  const confirmarSenha = control.get('confirmarSenha')?.value;
  return senha === confirmarSenha ? null : { senhasDiferentes: true };
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css'],
  standalone: true, // Certifique-se de que está definido como true se for um Standalone Component
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class CadastroComponent implements OnInit {

  cadastroForm!: FormGroup;
  errorMsg = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]],
      aceitouTermos: [false, [Validators.requiredTrue]],
      aceitouLGPD: [false, [Validators.requiredTrue]]
    }, { validators: senhasIguaisValidator });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      this.errorMsg = this.cadastroForm.errors?.['senhasDiferentes']
        ? 'As senhas não conferem.'
        : 'Preencha todos os campos e aceite os termos para continuar.';
      return;
    }

    const dados = this.cadastroForm.value as {
      nome: string; email: string; senha: string; aceitouTermos: boolean; aceitouLGPD: boolean;
    };

    this.authService.cadastrar(dados).subscribe({
      next: (usuario) => {
        this.authService.salvarUsuario(usuario);
        this.router.navigate(['/match']);
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Erro ao criar conta.';
      }
    });
  }
}
