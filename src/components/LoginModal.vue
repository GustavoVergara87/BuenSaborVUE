<template>
  <div>
    <b-modal
      id="modal-login"
      ok-only
      ok-variant="secondary"
      ok-title="Cancelar"
      :hide-header="true"
    >
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
      <div>
        <GoogleButton
          @logout="logout"
          @logeado="handleGoogleLogin"
        ></GoogleButton>
      </div>
      <!-- <hr /> -->
      <!-- <button @click="handleRegistrarse">Registrarse</button> -->
    </b-modal>
  </div>
</template>

<script>
import GoogleButton from "./GoogleButton.vue";
import { mapActions, mapGetters } from "vuex";
// import store from "../store/index";
// import Vue from "vue";
// import router from "@/router";

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
  created() {
    //Cuando desde RegistroModal se emite el evento "nuevoClienteRegistrado" toma los datos del registro
    this.$root.$on("nuevoClienteRegistrado", (AuthRequestInicial) => {
      this.AuthRequest = AuthRequestInicial;
    });
    //Cuando un componente (como LoginDropdown) emite un  "logout", ejecuta el metodo logout
    this.$root.$on("logout", () => {
      this.logout();
    });
  },
  computed: {
    ...mapGetters(["traerCliente", "traerUsuario"]),
  },
  methods: {
    ...mapActions([
      "setUsuario",
      "obtenerJwToken",
      "resetUsuario",
      "resetCarrito",
      "resetCliente",
      "resetNotificaciones",
    ]),
    handleGoogleLogin() {
      this.$bvModal.hide("modal-login");
      this.posLogin();
    },
    async handleLogin() {
      await this.login(this.AuthRequest).then((resp) => {
        if (resp == true) {
          this.$bvModal.hide("modal-login");
          this.posLogin();
        }
      });
    },

    //---------------SignalR------------------------------

    joinRolIdToGroup(id) {
      this.removeStoredFromAllGroups();
      this.$connectionHub.invoke("JoinRolIDToGroup", id).catch((err) => {
        console.log(err);
      });
    },
    joinClienteToGroup(id) {
      this.removeStoredFromAllGroups();
      this.$connectionHub.invoke("JoinClienteIDToGroup", id).catch((err) => {
        console.log(err);
      });
    },
    removeStoredFromAllGroups() {
      let rolID = 0;
      if (this.traerUsuario.rolID != 0) {
        rolID = this.traerUsuario.rolID;
      }
      let clienteId = 0;
      if (this.traerCliente.id != 0) {
        clienteId = this.traerCliente.id;
      }

      this.$connectionHub.invoke("RemoveRolIDFromGroup", rolID).catch((err) => {
        console.log(err);
      });

      this.$connectionHub
        .invoke("RemoveClienteIDFromGroup", parseInt(clienteId))
        .catch((err) => {
          console.log(err);
        });
    },

    //---------------Fin SignalR------------------------------

    async login(AuthRequest) {
      const resp = await this.obtenerJwToken(AuthRequest);
      if (resp == null) {
        const mensaje = "Usuario y/o Contraseña incorrectos";
        this.$root.$emit("alerta", mensaje);
        return null;
      }
      AuthRequest.NombreUsuario = "";
      AuthRequest.Clave = "";
      return true;
    },

    async logout() {
      //volver al menú principal
      if (this.$router.currentRoute.name != "Home") {
        this.$router.push({ name: "Home" });
      }
      //Reset Vuex
      await this.resetUsuario();
      await this.resetCliente();
      await this.resetCarrito();
      await this.resetNotificaciones();

      //LogOut from google
      await this.$gAuth.signOut();
    },

    posLogin() {
      let rolID;
      if (this.traerUsuario.rolID != 0) {
        rolID = this.traerUsuario.rolID;
      }
      let clienteId;
      if (this.traerCliente.id != 0) {
        clienteId = this.traerCliente.id;
      }

      const enroute = {
        Cliente: () => {
          //asocia el cliente que se acaba de loggear a un grupo (de un solo miembro) para recibir mensajes via SignalR
          this.joinClienteToGroup(clienteId);
          if (this.$router.currentRoute.name != "ClientePlatos") {
            this.$router.push({ name: "ClientePlatos" });
          }
        },
        Cajero: () => {
          this.joinRolIdToGroup(rolID);
          if (this.$router.currentRoute.name != "CajeroListaDePedidos") {
            this.$router.push({ name: "CajeroListaDePedidos" });
          }
        },
        Cocinero: () => {
          this.joinRolIdToGroup(rolID);
          if (this.$router.currentRoute.name != "CocineroListaDePedidos") {
            this.$router.push({ name: "CocineroListaDePedidos" });
          }
        },
      };

      enroute[this.traerUsuario.rol]();
    },
  }, //fin methods
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