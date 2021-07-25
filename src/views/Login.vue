<template>
  <form @submit.prevent="usuarioLoggin">
    <div class="container">
      <label for="NombreUsuario"><b>Cliente</b></label>
      <input
        type="text"
        placeholder="Cliente"
        autocomplete="username"
        name="NombreUsuario"
        v-model="AuthRequest.NombreUsuario"
        required
      />

      <label for="Clave"><b>Clave</b></label>
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

    <!-- <div class="container" style="background-color:#f1f1f1"> -->
    <!-- <button type="button" class="cancelbtn">Cancelar</button> -->
    <!-- <span class="psw">Forgot <a href="#">password?</a></span> -->
    <!-- </div> -->
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      AuthRequest: {
        NombreUsuario: "",
        Clave: "",
      },
    };
  },
  computed: { ...mapGetters(["traerCliente", "traerRolId"]) },
  methods: {
    ...mapActions(["setRol", "obtenerToken"]),
    joinRolIdToGroup() {
      this.removeFromAllGroups();
      this.$connectionHub
        .invoke("JoinRolIDToGroup", this.traerRolId)
        .catch((err) => {
          console.log(err);
        });
    },
    joinClienteToGroup() {
      this.removeFromAllGroups();
      this.$connectionHub
        .invoke("JoinClienteIDToGroup", this.traerCliente.id)
        .catch((err) => {
          console.log(err);
        });
    },
    removeFromAllGroups() {
      this.$connectionHub
        .invoke("RemoveRolIDFromGroup", this.traerRolId)
        .catch((err) => {
          console.log(err);
        });
      if (this.traerCliente == null) return;
      this.$connectionHub
        .invoke("RemoveClienteIDFromGroup", this.traerCliente.id)
        .catch((err) => {
          console.log(err);
        });
    },

    async usuarioLoggin() {
      const enroute = {
        Cliente: () => {
          //asocia el cliente que se acaba de loggear a un grupo (de un solo miembro) para recibir mensajes via SignalR
          this.joinClienteToGroup();
          this.$router.push({ name: "ClientePlatos" });
        },
        Administrador: () => this.$router.push({ name: "AdministradorPlatos" }),
        Cajero: () => {
          this.joinRolIdToGroup();
          this.$router.push({ name: "CajeroListaDePedidos" });
        },
        Cocinero: () => {
          this.joinRolIdToGroup();
          this.$router.push({ name: "CocineroListaDePedidos" });
        },
        Delivery: () => {
          this.joinRolIdToGroup();
          this.$router.push({ name: "DeliveryListaDePedidos" });
        },
      };

      const resp = await this.obtenerToken(this.AuthRequest);

      enroute[resp.rol]();
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