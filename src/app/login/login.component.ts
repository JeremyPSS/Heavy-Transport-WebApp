import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../Models/Usuario';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup;
  signupForm1: FormGroup;
  ListaUsuarios: Usuario[] = [];
  showLogin:boolean=true;
  @Input() Nuevo: Usuario = {
    id: '',
    nombre: '',
    apellido: '',
    correo: '',
    contrasenia: ''
  };

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { 
    this.signupForm = this.fb.group({
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required],
    });
    this.signupForm1 = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required],
    });
    this.userService.getListaUsuarios().subscribe(usuario => {
      this.ListaUsuarios = usuario;
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof this.Nuevo.nombre === 'string') {
      this.signupForm1 = this.fb.group({
        nombre: [this.Nuevo.nombre, Validators.required],
        apellido: [this.Nuevo.apellido, Validators.required],
        correo: [this.Nuevo.correo, Validators.required],
        contrasenia: [this.Nuevo.contrasenia, Validators.required],
      });
    } else {
      this.signupForm1 = this.fb.group({
        nombre: [this.Nuevo.nombre, Validators.required],
        apellido: [this.Nuevo.apellido, Validators.required],
        correo: [this.Nuevo.correo, Validators.required],
        contrasenia: [this.Nuevo.contrasenia, Validators.required],
      });
    }
  }

  Insert() {
    if (this.Nuevo.nombre.trim().length === 0) {
      return;
    }
    this.Nuevo.id = (Math.floor(Math.random() * 9999) + 1).toString();

    this.userService.AgregarUsuario(this.Nuevo).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        console.log('User added successfully!!');
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
    this.Nuevo = {
      id: '',
      nombre: '',
      apellido: '',
      correo: '',
      contrasenia: ''
    };
  }

  onSubmit(){
    if (this.signupForm.valid) {
      const correo = this.signupForm.get('correo')?.value;
      const contrasenia = this.signupForm.get('contrasenia')?.value;

      // Verificar si el usuario existe en la lista de usuarios
      const usuario = this.ListaUsuarios.find(user => user.correo === correo && user.contrasenia === contrasenia);

      if (usuario) {
        // Usuario encontrado, redirigir a la página de inicio
        // Aquí podrías guardar el usuario en el servicio de autenticación si lo necesitas
        // this.router.navigate(['/inicio']);
        console.log('usuario', usuario);
        console.log('Login successfully');
        localStorage.setItem('isLoggedIn', 'true');
        // Redirigir al componente de administrador u otra ruta adecuada
        this.router.navigate(['/admin'])
      } else {
        // Usuario no encontrado, mostrar mensaje de error o manejar la situación
        console.log('Usuario no encontrado');
      }
    }
  }


  onSubmit1() {
    if (this.signupForm1.valid) {
      console.log('Form data:', this.signupForm1);
      this.Nuevo = this.signupForm1.value;
      console.log('Nuevo:', this.Nuevo);
      this.Insert();
      this.signupForm1.reset();
    }
  }

  openSignUp() {
    this.showLogin = false
  }
  openLogin() {
    this.showLogin = true;
  }


}
