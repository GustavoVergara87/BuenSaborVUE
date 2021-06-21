<template>
  <div>
    <NavBarAdministrador></NavBarAdministrador>
    <router-view />
  </div>
</template>

<script>
import NavBarAdministrador from "@/components/NavBarAdministrador.vue";
export default {
  components: {
    NavBarAdministrador,
  },
};
</script>

<style>
</style>