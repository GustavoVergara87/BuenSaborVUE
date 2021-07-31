<template>
  <div>
    <NavBarCliente></NavBarCliente>
    <router-view />
  </div>
</template>

<script>
import NavBarCliente from "@/components/NavBarCliente.vue";
export default {
  components: {
    NavBarCliente,
  },
};
</script>

<style>
</style>