<template>
  <div>
    <NavBarCliente></NavBarCliente>
    <router-view />
    <Zocalo></Zocalo>
  </div>
</template>

<script>
import NavBarCliente from "@/components/NavBarCliente.vue";
import Zocalo from '../components/Zocalo.vue';
export default {
  components: {
    NavBarCliente,
    Zocalo
  },
};
    
</script>

<style>
</style>