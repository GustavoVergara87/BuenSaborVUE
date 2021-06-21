<template>
  <div class="centered">
    <p>Elija su rol</p>
    <b-dropdown text="Rol" class="m-md-2">
      <b-dropdown-item @click="usuarioLoggin">Usuario</b-dropdown-item>
      <b-dropdown-item @click="administradorLoggin"
        >Administrador</b-dropdown-item
      >
      <b-dropdown-item @click="cajeroLoggin">Cajero</b-dropdown-item>
      <b-dropdown-item @click="cocineroLoggin">Cocinero</b-dropdown-item>
      <b-dropdown-item @click="deliveryLoggin">Delivery</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["setRol"]),
    usuarioLoggin() {
      this.setRol("Usuario");
      this.$router.push({ name: "UsuarioPlatos" });
    },
    administradorLoggin() {
      this.setRol("Administrador");
      this.$router.push({ name: "AdministradorPlatos" });
    },
    cajeroLoggin() {
      this.setRol("Cajero");
      this.$router.push({ name: "CajeroListaDePedidos" });
    },
    cocineroLoggin() {
      this.setRol("Cocinero");
      this.$router.push({ name: "CocineroListaDePedidos" });
    },
    deliveryLoggin() {
      this.setRol("Delivery");
      this.$router.push({ name: "DeliveryListaDePedidos" });
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
</style>