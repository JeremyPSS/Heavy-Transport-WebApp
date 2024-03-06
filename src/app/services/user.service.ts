import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3800/api/usuario';

  constructor(private http: HttpClient) { }

  getListaUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
  AgregarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const url = `${this.apiUrl}/${usuario.id}`;
    return this.http.put<Usuario>(url, usuario);
  }

  eliminarUsuario(usuario: Usuario): Observable<Usuario> {
    const url = `${this.apiUrl}/${usuario.id}`;
    return this.http.delete<Usuario>(url);
  }
}
