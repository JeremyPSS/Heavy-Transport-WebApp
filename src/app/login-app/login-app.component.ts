import { Component } from '@angular/core';
import {AuthService} from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent {
  
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router:Router) { }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Manejar la respuesta del servidor aquí
        console.log(response);
        // Por ejemplo, podrías guardar el token de autenticación en el almacenamiento local
        localStorage.setItem('token', response.token);
        this.router.navigate(['/admin']);
      },
      (error) => {
        // Manejar errores de la solicitud
        console.error(error);
        this.errorMessage = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
      }
    );
  }

}
