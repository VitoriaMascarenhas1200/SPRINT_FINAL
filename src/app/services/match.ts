import { Injectable } from '@angular/core';
import { MatchRegistro, StatusMatch } from '../../../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private chave(email: string): string {
    return `matchpet_matches_${email.toLowerCase()}`;
  }

  listar(email: string): MatchRegistro[] {
    const dados = localStorage.getItem(this.chave(email));
    return dados ? JSON.parse(dados) : [];
  }

  private salvar(email: string, registros: MatchRegistro[]): void {
    localStorage.setItem(this.chave(email), JSON.stringify(registros));
  }

  registrarMatch(email: string, petId: number): void {
    const registros = this.listar(email);
    if (registros.some(r => r.petId === petId)) {
      return;
    }
    registros.push({
      petId,
      status: 'aguardando_contato',
      dataMatch: new Date().toISOString()
    });
    this.salvar(email, registros);
  }

  jaTemMatch(email: string, petId: number): boolean {
    return this.listar(email).some(r => r.petId === petId);
  }
}