<template>
  <div>
    <NavBarCajero></NavBarCajero>
    <router-view />
  </div>
</template>

<script>
import NavBarCajero from "@/components/NavBarCajero.vue";
export default {
  components: {
    NavBarCajero,
  },
};
</script>

<style>
</style>