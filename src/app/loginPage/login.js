import { ManageAccount } from '../javascript/conectfirebase.js';

document.getElementById("formulario-sesion").addEventListener("submit",async (event) => {
  event.preventDefault();

  const email = document.getElementById("correo").value;
  const password = document.getElementById("confirmPassword").value;

  const account = new ManageAccount();
 
  const loginSuccessful = await  account.authenticate(email, password);
    if (loginSuccessful) {
      // Llama a la función para ocultar los botones después de iniciar sesión
      hideLoginButtons();
    }
});