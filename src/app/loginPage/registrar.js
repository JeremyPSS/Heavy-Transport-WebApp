import { ManageAccount } from '../javascript/conectfirebase.js';
document.getElementById("formulario-crear").addEventListener("submit", (event) => {
  event.preventDefault();
  
  const email = document.getElementById("correo").value;
  const password = document.getElementById("confirmPassword").value;

  const account = new ManageAccount();
  account.register(email, password);
});

console.log('Formulario de Registro');