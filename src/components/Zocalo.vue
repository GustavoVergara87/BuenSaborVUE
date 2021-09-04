<template>
  <div class="zocalo">
    <span class="DireccionLocal">Av. El Buen Sabor, GodoyCruz, Mendoza</span>
    <span class="hora">{{ now | moment("h:mm a") }}</span>

    <span class="abierto" v-if="abierto">
      Abierto
    </span>
    <span class="cerrado" v-if="!abierto">
      Cerrado
    </span>
  </div>
</template>

<script>
import Vue from "vue";
import { estaAbierto } from "../services/Tiempo";
export default {
  mounted() {
    var self = this;
    setInterval(async function () {
      self.now = Date.now() + Vue.prototype.$horaDiff;
      this.abierto = estaAbierto();
    }, 1000);
  },
  data() {
    return {
      now: Date.now(),
      abierto: estaAbierto(),
    };
  },
};
</script>

<style scoped>
.zocalo {
  position: fixed;
  bottom: 0px;
  background: rgb(144, 70, 17);
  background-image: url("../../public/images/hamb.jpg");
  width: 100%;
}

.hora {
  color: white;
  float: right;
  margin-right: 1em;
  font-size: 80%;
  opacity: 80%;
}

.DireccionLocal {
  color: white;
  margin-left: 1em;
  font-size: 80%;
  opacity: 80%;
}

.cerrado {
  color: white;
  font-weight: bolder;
  float: right;
  margin-right: 1em;
  font-size: 80%;
  opacity: 80%;
  
  animation: anim 1s infinite ease-in-out;
}

@keyframes anim {
    0% {filter: drop-shadow(0px 0px 5px white) drop-shadow(0px 0px 5px white);}
    50% {filter: drop-shadow(0px 0px 5px red) drop-shadow(0px 0px 5px red);}
    100% {filter: drop-shadow(0px 0px 5px white) drop-shadow(0px 0px 5px white);}
}
.abierto {
  color: white;
  /* font-weight: bolder; */
  float: right;
  margin-right: 1em;
  font-size: 80%;
  opacity: 80%;
    /* filter: drop-shadow(1px 1px 2px rgb(0, 0, 0)); */
}

</style>