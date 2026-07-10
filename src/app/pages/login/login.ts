import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Adicione esta linha
import { ReactiveFormsModule } from '@angular/forms'; // Adicione esta linha
import { RouterModule } from '@angular/router'; // Adicione se usar routerLink aqui também
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true, // Certifique-se de que está como true se for um componente Standalone
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
  private redirect = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.redirect = this.route.snapshot.queryParamMap.get('redirect') || '';

    if (this.authService.isLogado()) {
      this.irParaDestino();
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
        this.irParaDestino();
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Erro ao realizar login.';
      }
    });
  }

  private irParaDestino(): void {
    this.router.navigate([this.redirect === 'match' ? '/match' : '/']);
  }
}
