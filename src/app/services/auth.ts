import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Simula uma base de usuários cadastrados (persistida no navegador).
  private readonly USERS_KEY = 'matchpet_users';
  private readonly SESSION_KEY = 'matchpet_user';

  constructor() {}

  private getUsuarios(): User[] {
    const dados = localStorage.getItem(this.USERS_KEY);
    return dados ? JSON.parse(dados) : [];
  }

  private salvarUsuarios(usuarios: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(usuarios));
  }

  cadastrar(novoUsuario: { nome: string; email: string; senha: string; aceitouTermos: boolean; aceitouLGPD: boolean; }): Observable<User> {
    const usuarios = this.getUsuarios();

    if (!novoUsuario.aceitouTermos || !novoUsuario.aceitouLGPD) {
      return throwError(() => ({ error: { message: 'É necessário aceitar os Termos de Uso e a Política de Privacidade (LGPD).' } }));
    }

    const jaExiste = usuarios.some(u => u.email.toLowerCase() === novoUsuario.email.toLowerCase());
    if (jaExiste) {
      return throwError(() => ({ error: { message: 'Já existe uma conta cadastrada com este e-mail.' } }));
    }

    const usuario: User = {
      id: Date.now(),
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      senha: novoUsuario.senha,
      aceitouTermos: novoUsuario.aceitouTermos,
      aceitouLGPD: novoUsuario.aceitouLGPD,
      criadoEm: new Date().toISOString()
    };

    usuarios.push(usuario);
    this.salvarUsuarios(usuarios);

    return of(usuario).pipe(delay(400));
  }

  login(email: string, senha: string): Observable<User> {
    const usuarios = this.getUsuarios();
    const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha);

    if (!usuario) {
      return throwError(() => ({ error: { message: 'E-mail ou senha inválidos.' } }));
    }

    return of(usuario).pipe(delay(400));
  }

  salvarUsuario(user: User): void {
    const { senha, ...usuarioSemSenha } = user;
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(usuarioSemSenha));
  }

  getUsuario(): User | null {
    const user = sessionStorage.getItem(this.SESSION_KEY);
    return user ? JSON.parse(user) : null;
  }

  isLogado(): boolean {
    return !!sessionStorage.getItem(this.SESSION_KEY);
  }

  logout(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
  }
}
