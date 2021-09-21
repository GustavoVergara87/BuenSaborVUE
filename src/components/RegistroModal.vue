<template>
  <div>
    <b-modal
      id="modal-registro"
      ok-only
      ok-variant="secondary"
      ok-title="Cancelar"
      :hide-header="true"
    >
      <form class="container" @submit.prevent="handleRegistro">
        <label for="Email">Email</label>
        <input
          type="email"
          name="email"
          v-model="form.Email"
          placeholder="Email"
          required
        />

        <label for="Clave">Clave</label>
        <input
          type="password"
          name="password"
          v-model="form.Clave"
          placeholder="Clave"
          required
        />

        <label for="Nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          v-model="form.Nombre"
          placeholder="Nombre"
          required
        />

        <label for="Apellido">Apellido</label>
        <input
          type="text"
          name="apellido"
          v-model="form.Apellido"
          placeholder="Apellido"
          required
        />

        <label for="Telefono">Telefono</label>
        <input
          type="phone"
          name="telefono"
          v-model="form.Telefono"
          placeholder="Telefono"
          required
        />

        <button type="submit">Registrarse</button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { registrarNuevoCliente } from "../services/AutenticacionController";

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
      AuthRequest: {
        NombreUsuario: "",
        Clave: "",
      },
    };
  },
  methods: {
    registrarNuevoCliente,
    async handleRegistro() {
      this.AuthRequest.NombreUsuario = this.form.Email;
      this.AuthRequest.Clave = this.form.Clave;


      await this.registrarNuevoCliente(this.form).then(() => {
        //this.$root.$emit() emite un evento que puede ser escuchado globalmente
        this.$root.$emit("nuevoClienteRegistrado", this.AuthRequest);
        this.$bvModal.hide("modal-registro");
        this.$bvModal.show("modal-login");
      }).catch((a)=>alert(a))  ;
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