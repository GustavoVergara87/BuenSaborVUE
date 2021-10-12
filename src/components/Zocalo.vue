<template>
  <div class="zocalo">
    <span class="DireccionLocal">Av. El Buen Sabor, G.Cruz, Mendoza</span>
    <span class="hora">{{ now | moment("h:mm a") }}</span>
    <span class="abierto" v-show="abierto">
      Abierto
    </span>
    <span class="cerrado" v-show="!abierto">
        
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
      self.abierto = await estaAbierto();
    }, 1000);
  },
  data() {
    return {
      now: Date.now(),
      abierto: true,
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
  float: left;
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
  
  animation: anim 3s infinite ease-in-out;
}

@keyframes anim {
    0% {filter: drop-shadow(0px 0px 5px rgb(127,0,0)) drop-shadow(0px 0px 5px rgb(127,0,0));}
    50% {filter: drop-shadow(0px 0px 5px red) drop-shadow(0px 0px 5px red);}
    100% {filter: drop-shadow(0px 0px 5px rgb(127,0,0)) drop-shadow(0px 0px 5px rgb(127,0,0));}
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