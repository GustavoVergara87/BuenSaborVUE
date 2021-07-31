<template>
  <div id="app">
    <LoginModal></LoginModal>
    <RegistroModal></RegistroModal>
    <router-view />
  </div>
</template>

<script>
import LoginModal from "./components/LoginModal.vue";
import RegistroModal from "./components/RegistroModal.vue";
export default {
  components:{
    LoginModal,
    RegistroModal,
  }
};
</script>

<style lang="scss"></style>
