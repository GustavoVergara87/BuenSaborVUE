<template>
  <div id="app">
    <LoginModal></LoginModal>
    <RegistroModal></RegistroModal>
    <b-modal id="modal-alertas" title="El Buen Sabor" ok-only >
      <p class="my-4">{{mensaje}}</p>
    </b-modal>
    <router-view />
  </div>
</template>

<script>
import LoginModal from "./components/LoginModal.vue";
import RegistroModal from "./components/RegistroModal.vue";
// import { ServerNow } from "./services/Tiempo";
import Vue from "vue";
export default {
  components: {
    LoginModal,
    RegistroModal,
  },
  data() {
    return {
      mensaje: "",
    };
  },
  async mounted() {
    Vue.prototype.$horaDiff = 0;
    // const resp = await ServerNow()
    // const _ServerNow = Date.parse(resp.datetime)
    // const ClientNow = Date.now()
    Vue.prototype.$horaDiff = 0; //_ServerNow - ClientNow
    // console.log("milisegundos de diferencia cliente servidor",this.$horaDiff)
  },
  created() {
    //Cuando desde cualquier lado se emite un evento de alerta se muestra el modal
    this.$root.$on("alerta", (mensaje) => {
      this.mensaje = mensaje;
      this.$bvModal.show("modal-alertas");
    });


  },
};
</script>

<style></style>
