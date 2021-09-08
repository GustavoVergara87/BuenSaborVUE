<template>
  <div>
    <NavBarCocinero></NavBarCocinero>
    <router-view />
  </div>
</template>

<script>
import NavBarCocinero from "../components/NavBarCocinero.vue";
export default {
  components: { NavBarCocinero },

};
</script>

<style>
</style>