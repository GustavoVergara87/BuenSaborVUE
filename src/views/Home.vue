<template>
  <div class="home">
    <div>
      <NavBarCliente></NavBarCliente>
      <b-jumbotron style="font-size:90%;" header="El Buen Sabor" lead="Horario de atención:">
        <!-- <p>Lunes a Domingos de 20:00 a 00:00</p>
        <p>Sábados y Domingos de 11:00 a 15:00</p> -->
        <p>Lunes a Viernes <br> 20hs a 00hs</p>
        <p>Sábados y Domingos <br> 11hs a 15hs y de 20hs a 00hs</p>
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

};
</script>

<style scoped>
</style>
