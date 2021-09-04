<template>
  <div v-show="!cargandoHora" class="contenedor loaded">
    <div class="sombra"></div>
    <div class="fondo"></div>
    <div class="background-horas" :style="{ ...ComputedCone }"></div>
    <div class="background-horas-oscurecer" :style="{ ...ComputedCone }"></div>
    <div class="hours" :style="{ transform: hourComputedRotation }"></div>
    <div class="minutes" :style="{ transform: minComputedRotation }"></div>
    <div class="segundos" :style="{ transform: segComputedRotation }"></div>
    <div class="marco"></div>
   
  </div>
</template>

<script>
// import Vue from 'vue';
import { CorrectNow, proximoHdA } from "../services/Tiempo";
export default {
  data() {
    return {
      CorrectNow: Date.now(),
      cargandoHora: true,
      abierto: {
        hora1: 0,
        hora2: 12,
      },
    };
  },
  computed: {
    ComputedCone() {
      //   return "conic-gradient("
      // +"rgb(0, 0, 0) calc(8deg * 360 / 12),"
      // +"rgba(255, 255, 255, 0) calc(8deg * 360 / 12));"

      let _rotate = Math.floor(((24 - this.abierto.hora1) % 12) * (360 / 12));
      let _finTransparecia = Math.floor(
        ((this.abierto.hora2 + (24 - this.abierto.hora1)) % 12) * (360 / 12)
      );
      return {
        background:
          " conic-gradient(" +
          "rgba(255, 255, 255, 0) " +
          _finTransparecia +
          "deg," +
          "rgb(0, 0, 0) " +
          _finTransparecia +
          "deg",
        transform: "rotate(-" + _rotate + "deg)",
      };
    },

    abiertoOscurecer() {
      return this.abierto + "-oscurecer";
    },

    segundos() {
      var segundos = new Date(this.CorrectNow).getSeconds();
      return (segundos * 360) / 60;
    },
    minutos() {
      var minutos = new Date(this.CorrectNow).getMinutes();
      return (minutos * 360) / 60;
    },
    hora() {
      var hora = new Date(this.CorrectNow).getHours();
      return (hora * 360) / 12;
    },
    segComputedRotation() {
      return (
        "translateX(calc(((50 /48) - 1) * 100%)) translateY(calc(((50 / (48 * 0.9)) - 1) * 100%)) rotate(" +
        this.segundos +
        "deg)"
      );
    },
    minComputedRotation() {
      return (
        "translateX(calc(((50 /48) - 1) * 100% + 0.5px)) translateY(calc(((50 / (48 * 0.9)) - 1) * 100% - 0.5px)) rotate(" +
        this.minutos +
        "deg)"
      );
    },
    hourComputedRotation() {
      // translateX(calc((50-ancho)/ancho * 100% + 2.5px))
      return (
        "translateX(calc(5em - 0.41em )) translateY(calc(((50 / (40 * 0.9)) - 1) * 100%)) rotate(" +
        this.hora +
        "deg)"
      );
    },
  },
  mounted() {
    var self = this;
    self.cargandoHora = false;

    proximoHdA().then((pHdA) => {
      this.abierto.hora1 = pHdA.hora1;
      this.abierto.hora2 = pHdA.hora2;
    });

    setInterval(async function () {
      self.CorrectNow = await CorrectNow();
    }, 1000);
    setInterval(() => {
      proximoHdA().then((pHdA) => {
        this.abierto.hora1 = pHdA.hora1;
        this.abierto.hora2 = pHdA.hora2;
      });
    }, 10000);
  },
};
</script>

<style scoped>
.loaded {
  animation: bounce 0.8s ease;
}

@keyframes bounce {
  0% {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
  20% {
    opacity: 1;
    transform: scale(1.1, 1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1, 1);
  }
}

.fondo {
  position: absolute;
  border-radius: 50%;
  border: 0px solid grey;
  --tamano: 100%;
  width: var(--tamano);
  height: var(--tamano);
  padding: 0;
  margin: 0;
  background-size: 160% 100%;
  background-position-x: 50%;
  background-position-y: 10%;
  background-image: url("../../public/images/hamb.jpg");
  /* background-image: url("../../public/images/logo.svg"); */
  /* background-size: 240%; */
  /* background-position-x: -15%;
  background-position-y: 99%; */
  filter: blur(5px) brightness(1.2) contrast(1.1);
  clip-path: circle(5em at center);
}



.sombra {
  position: absolute;
  border-radius: 50%;
  background-color: white;
  --tamano: 100%;
  width: var(--tamano);
  height: var(--tamano);
  padding: 0;
  margin: 0;
  filter: drop-shadow(3px 3px 5px grey);
}

.contenedor {
  position: absolute;
  border-radius: 50%;
  border: 5px solid rgb(218, 218, 218);
  --tamano: 10em;
  width: var(--tamano);
  height: var(--tamano);
  padding: 0;
  margin: 0;
  filter: drop-shadow(0px 0px 0px grey);
}

.marco {
  position: absolute;
  border-radius: 50%;
  border: 5px solid rgb(255, 255, 218);
  --tamano: calc(100% + 10px);
  transform: translateX(-5px) translateY(-5px);
  width: var(--tamano);
  height: var(--tamano);
  padding: 0;
  margin: 0;
  /* filter: drop-shadow(1px 1px 2px grey); */
  opacity: 60%;
}

.background-horas-oscurecer {
  position: absolute;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  mix-blend-mode: normal;
  opacity: 20%;
}

.background-horas {
  position: absolute;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  mix-blend-mode: color;
  opacity: 50%;
}

.segundos {
  width: 48%;
  height: 48%;
  border-right: 1px solid white;
  /* transform-origin: bottom right; */
  transform-origin: right 90%;
  position: absolute;
  opacity: 100%;
  /* mix-blend-mode: overlay; */
  filter: drop-shadow(1px 0.5px 2px rgba(0, 0, 0, 0.8));
}

.minutes {
  width: 48%;
  height: 48%;
  border-right: 2px solid white;
  transform-origin: right 90%;
  position: absolute;
  opacity: 100%;
  /* mix-blend-mode: overlay; */
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5));
}

.hours {
  width: 0.4em;
  height: 40%;
  border-radius: 25% 25% 0% 0%;
  background-color: white;
  transform-origin: 50% 90%;
  position: absolute;
  opacity: 100%;
  /* mix-blend-mode: overlay; */
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5));
}
</style>