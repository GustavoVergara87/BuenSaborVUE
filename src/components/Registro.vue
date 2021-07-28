<template>
  <form class="container" @submit.prevent="handleRegistro">
    <label for="Email">Email</label>
    <input type="email" name="email" v-model="form.Email" placeholder="Email" />

    <label for="Clave">Clave</label>
    <input
      type="password"
      name="password"
      v-model="form.Clave"
      placeholder="Clave"
    />

    <label for="Nombre">Nombre</label>
    <input
      type="text"
      name="nombre"
      v-model="form.Nombre"
      placeholder="Nombre"
    />

    <label for="Apellido">Apellido</label>
    <input
      type="text"
      name="apellido"
      v-model="form.Apellido"
      placeholder="Apellido"
    />

    <label for="Telefono">Telefono</label>
    <input
      type="number"
      name="telefono"
      v-model="form.Telefono"
      placeholder="Telefono"
    />

    <button type="submit">Registrarse</button>
  </form>
</template>

<script>
import { registrarCliente,login } from "../services/Login";

export default {
  data() {
    return {
      form: {
        Email: "",
        Clave: "",
        Nombre: "",
        Apellido: "",
        Telefono: "",
      },
    };
  },
  methods: {
    login,
    handleRegistro() {
      const AuthRequest = {
        NombreUsuario: this.form.Email,
        Clave: this.form.Clave,
      };
      registrarCliente(this.form).then(async () => {
        await this.login(AuthRequest).then(this.$emit("registrado"));
      });
    },
  },
};
</script>

<style scoped>
/* Full-width inputs */
input[type="text"],
input[type="password"],
input[type="email"],
input[type="number"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Bordered form */
form {
  border: 3px solid #f1f1f1;
  margin-top: 2em;
}

/* Set a style for all buttons */
button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}
</style>