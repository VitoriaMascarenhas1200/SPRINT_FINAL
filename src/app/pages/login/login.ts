import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMsg = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Se já estiver logado, vai direto para o match (com os pets já carregados).
    if (this.authService.isLogado()) {
      this.router.navigate(['/match']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMsg = 'Preencha todos os campos corretamente.';
      return;
    }

    const dados = this.loginForm.value as { email: string; senha: string };

    this.authService.login(dados.email, dados.senha).subscribe({
      next: (user) => {
        this.authService.salvarUsuario(user);
        // Após o login, o usuário vai direto para o match, já com pets exibidos.
        this.router.navigate(['/match']);
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Erro ao realizar login.';
      }
    });
  }
}