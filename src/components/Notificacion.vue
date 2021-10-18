<template>
  <transition name="right-slide-fade">
    <div v-show="showNoti" class="noti">
      <div class="cerrar">
        <i
          @click="deleteNotificacion()"
          class="fas fa-times boton-cerrar-notificacion"
        ></i>
      </div>
      <div class="texto-centrado">
        <h4>{{ mensaje }}</h4>
      </div>
      <div class="texto-pedido">
        <span>Pedido: {{ pedido.id }}</span>
        <span>fecha: {{ pedido.fecha.slice(0, 10) }}</span>
        <span>Hora estimada: {{ pedido.horaEstimadaFin.slice(11, 16) }}</span>
        <span
          >Tipo de Envio:
          {{ pedido.tipoEnvio == TE.DOMICILIO ? "Domicilio" : "Local" }}</span
        >
        <span>Total: {{ pedido.total }}</span>
        <!-- PARCHE, REVISAR -->
        <div v-if="pedido.domicilio != null">
          <span
            >Domicilio:
            {{
              pedido.domicilio.calle +
              ", " +
              pedido.domicilio.numero +
              ", " +
              pedido.domicilio.localidad
            }}</span
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from "vuex";
import TE from "../services/TipoEnvio";
import { delay } from "../services/Auxiliares";

export default {
  props: ["id", "mensaje", "pedido"],
  data() {
    return {
      TE: TE, //permite usar el autocompletar dentro del template para saber a que tipoenvio nos referimos
      showNoti:true,
    };
  },
  mounted() {
    // console.log("pedido", this.pedido);
  },
  methods: {
    ...mapActions(["deleteFromNotificaciones"]),
   async deleteNotificacion() {
      this.showNoti=false;
      await delay(400) //espera los 400ms de la animacion
      this.deleteFromNotificaciones(this.id);
    },
  },
};
</script>

<style scoped>

/*Animacion de entrada y salida*/
.right-slide-fade-enter-active {
  transition: all 0.3s ease;
}
.right-slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.right-slide-fade-enter, .right-slide-fade-leave-to{
  transform: translateX(150px);
  opacity: 0;
}
/*Fin Animacion*/


.boton-cerrar-notificacion {
  position: absolute;
  right: 1em;
  top: 1em;
}

.texto-centrado {
  margin-top: 1.2em;
  text-align: center;
}

.texto-pedido {
  padding-bottom: 1em;
}

.texto-pedido > span {
  display: block;
}
.noti {
  position: relative;
  background-color: white;
  margin-bottom: 1em;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.3);
  padding: 1em;
}
</style>