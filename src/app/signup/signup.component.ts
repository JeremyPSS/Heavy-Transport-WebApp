import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Usuario } from '../Models/Usuario';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  // id:string;
  // nombre:string;
  // apellido:string;
  // correo:string;
  // contrasenia:string;

  signupForm: FormGroup;
  ListaUsuarios: Usuario[] = [];
  @Input() Nuevo: Usuario = {
    id: '',
    nombre: '',
    apellido: '',
    correo: '',
    contrasenia: ''
  };

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.signupForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required],
    });
    this.userService.getListaUsuarios().subscribe(usuario => {
      this.ListaUsuarios = usuario;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof this.Nuevo.nombre === 'string') {
      this.signupForm = this.fb.group({
        nombre: [this.Nuevo.nombre, Validators.required],
        apellido: [this.Nuevo.apellido, Validators.required],
        correo: [this.Nuevo.correo, Validators.required],
        contrasenia: [this.Nuevo.contrasenia, Validators.required],
      });
    } else {
      this.signupForm = this.fb.group({
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

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form data:', this.signupForm);
      this.Nuevo = this.signupForm.value;
      console.log('Nuevo:', this.Nuevo);
      this.Insert();
      this.signupForm.reset();
    }
  }
}
