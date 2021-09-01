<template>
  <div class="home">
    <div>
      <NavBarCliente></NavBarCliente>
      <b-jumbotron header="El Buen Sabor" lead="Horario de atención:">
        <p>Lunes a Domingos de 20:00 a 00:00</p>
        <p>Sábados y Domingos de 11:00 a 15:00</p>
        <reloj-analogico></reloj-analogico>
      </b-jumbotron>
    </div>

    <div class="zocalo">
      <span class="DireccionLocal">Av. El Buen Sabor, GodoyCruz, Mendoza</span>
      <span class="hora">{{ now | moment("h:mm a") }}</span>
    </div>
  </div>
</template>

<script>
import NavBarCliente from "@/components/NavBarCliente.vue";
import RelojAnalogico from "../components/RelojAnalogico.vue";
export default {
  name: "Home",
  components: {
    NavBarCliente,
    RelojAnalogico,
  },
  mounted() {
    var self = this;
    setInterval(function () {
      self.now = Date.now();
    }, 1000);
  },
  data() {
    return {
      now:0,
    };
  },
  methods: {},
};
</script>

<style scoped>
.DireccionLocal {
  color: white;
  margin-left: 1em;
  font-size: 80%;
  opacity: 80%;
}

.hora {
  color: white;
  float: right;
  margin-right: 1em;
  font-size: 80%;
  opacity: 80%;
}

.zocalo {
  position: fixed;
  bottom: 0px;
  background: rgb(144, 70, 17);
  background-image: url("../../public/images/hamb.jpg");
  width: 100%;
}
</style>
