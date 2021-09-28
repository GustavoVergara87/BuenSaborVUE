<template>
  <div class="home">
    <div>
      <NavBarCliente></NavBarCliente>
      <b-jumbotron header="El Buen Sabor" lead="Horario de atención:">
        <p>Lunes a Domingos de 20:00 a 00:00</p>
        <p>Sábados y Domingos de 11:00 a 15:00</p>
        <!-- {{ dummy }} -->
        <reloj-analogico></reloj-analogico>
      </b-jumbotron>
    </div>
    <Zocalo></Zocalo>
  </div>
</template>

<script>
import NavBarCliente from "@/components/NavBarCliente.vue";
import RelojAnalogico from "../components/RelojAnalogico.vue";
import { estaAbierto } from "../services/Tiempo";
import Zocalo from "../components/Zocalo.vue";
export default {
  name: "Home",
  components: {
    NavBarCliente,
    RelojAnalogico,
    Zocalo,
  },
  data() {
    return {
      abierto: estaAbierto(),
      dummy:"",
    };
  },

  methods: {},
  async mounted() {
    const resp = await fetch("http://elbuensabor.ddns.net:82/api/articulos");
    const respJson = await resp.json();
    this.dummy = respJson;
  },
};
</script>

<style scoped>
</style>
