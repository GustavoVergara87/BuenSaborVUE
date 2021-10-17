<template>
  <div>
    <b-nav-item-dropdown
      text=""
      block
      class="nav-link-mod nav-link-semiopaco"
      no-caret
      menu-class=""
    >
      <template slot="button-content">
        <div class="avatar-nombre-contenedor">
          <i class="fas fa-user-circle avatar"></i>
          <span class="responsiveHide"> {{ nombre }}</span>
        </div>
      </template>
      <div v-show="nombre == ''">
        <b-dropdown-item v-b-modal.modal-login> Login </b-dropdown-item>
        <b-dropdown-item v-b-modal.modal-registro>Registrarse</b-dropdown-item>
      </div>
      <div v-show="nombre != ''">
        <b-dropdown-item v-show="rol == 'cliente'" @click="irAMiCuenta()"
          >Mi cuenta</b-dropdown-item
        >
        <b-dropdown-item @click="logout()"> Salir </b-dropdown-item>
      </div>
    </b-nav-item-dropdown>
  </div>
</template>

<script>
export default {
  props: ["nombre", "rol"],
  methods: {
    logout() {
      this.$root.$emit("logout"); //emite un evento que puede ser escuchado globalmente. LoginModal lo escucha
    },
    irAMiCuenta() {
      if (this.$router.currentRoute.name != "ClienteCuenta") {
        this.$router.push({ name: "ClienteCuenta" });
      }
    },
  },
};
</script>

<style scoped>
.avatar-nombre-contenedor {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar {
  font-size: 1.5em;
}
</style>          
          

