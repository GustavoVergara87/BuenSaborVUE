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
// import { ServerNow } from "./services/Tiempo";
import Vue from 'vue'
export default {
  components:{
    LoginModal,
    RegistroModal,
  },
  async mounted() {
    Vue.prototype.$horaDiff = 0
    // const resp = await ServerNow()
    // const _ServerNow = Date.parse(resp.datetime)
    // const ClientNow = Date.now()
    Vue.prototype.$horaDiff = 0 //_ServerNow - ClientNow 
    // console.log("milisegundos de diferencia cliente servidor",this.$horaDiff) 
  },
};
</script>

<style></style>
