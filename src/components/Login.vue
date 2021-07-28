<template>
  <div>
    <form @submit.prevent="handleLogin">
      <div class="container">
        <input
          type="text"
          placeholder="Cliente"
          autocomplete="username"
          name="NombreUsuario"
          v-model="AuthRequest.NombreUsuario"
          required
        />

        <input
          type="password"
          placeholder="Clave"
          autocomplete="current-password"
          name="Clave"
          v-model="AuthRequest.Clave"
          required
        />

        <button type="submit">Login</button>
        <label>
          <!-- <input type="checkbox" checked="checked" name="remember"> Remember me -->
        </label>
      </div>
    </form>
    <div >
      <GoogleButton  @logout="logout" @logeado="$emit('logeado')"></GoogleButton>
    </div>
    <!-- <div class="container" style="background-color:#f1f1f1"> -->
    <!-- <button type="button" class="cancelbtn">Cancelar</button> -->
    <!-- <span class="psw">Forgot <a href="#">password?</a></span> -->
    <!-- </div> -->
    <hr />
    <button @click="handleRegistrarse">Registrarse</button>
  </div>
</template>

<script>
import GoogleButton from "./GoogleButton.vue";
import { logout, login } from "../services/Login.js";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    GoogleButton,
  },
  data() {
    return {
      AuthRequest: {
        NombreUsuario: "",
        Clave: "",
      },
    };
  },
  computed: { ...mapGetters(["traerCliente", "traerRolId", "traerRol"]) },
  methods: {
    login,
    logout,
    ...mapActions(["setRol"]),
    async handleLogin() {
      await login(this.AuthRequest).then(this.$emit("logeado"));
    },
    handleRegistrarse() {
      this.$emit("registrarse");
    },
  },
};
</script>

<style scoped>
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Bordered form */
form {
  border: 3px solid #f1f1f1;
}

/* Full-width inputs */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
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

/* Extra style for the cancel button (red) */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

/* Avatar image */
img.avatar {
  width: 40%;
  border-radius: 50%;
}

/* Add padding to containers */
.container {
  padding: 16px;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>