<template>
  <div>
    <NavBarDelivery></NavBarDelivery>
    <router-view />
  </div>
</template>

<script>
import NavBarDelivery from "@/components/NavBarDelivery.vue";
export default {
  components:{
    NavBarDelivery,
  }
};
</script>

<style>
</style>