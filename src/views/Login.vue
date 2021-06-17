<template>
  <div class="centered">
    <p>Elija su rol</p>
    <b-dropdown text="Rol" class="m-md-2">
      <b-dropdown-item @click="usuarioLoggin">Usuario</b-dropdown-item>
      <b-dropdown-item @click="administradorLoggin"
        >Administrador</b-dropdown-item
      >
      <b-dropdown-item>Cajero</b-dropdown-item>
      <b-dropdown-item>Cocinero</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["setRol", "setProxyNavActual"]),
    usuarioLoggin() {
      this.setRol("Usuario");
      this.$router.push("usuario");
      this.setProxyNavActual("/usuario");
    },
    administradorLoggin() {
      this.setRol("Administrador");
      this.$router.push("administrador");
      this.setProxyNavActual("/administrador");
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
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
</style>