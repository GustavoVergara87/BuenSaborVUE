<template>
  <div>
    <NavBarUsuario></NavBarUsuario>
    <router-view />
  </div>
</template>

<script>
import NavBarUsuario from "@/components/NavBarUsuario.vue";
export default {
  components: {
    NavBarUsuario,
  },
};
</script>

<style>
</style>