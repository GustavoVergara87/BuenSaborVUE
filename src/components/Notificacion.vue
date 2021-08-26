<template>
  <div class="noti">
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
</template>

<script>
import { mapActions } from "vuex";
import TE from "../services/TipoEnvio";

export default {
  props: ["id", "mensaje", "pedido"],
  data() {
    return {
      TE: TE, //permite usar el autocompletar dentro del template para saber a que tipoenvio nos referimos
    };
  },
  mounted() {
    console.log("pedido",this.pedido)
  },
  methods: {
    ...mapActions(["deleteFromNotificaciones"]),
    deleteNotificacion() {
      this.deleteFromNotificaciones(this.id);
    },
  },
};
</script>

<style scoped>
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