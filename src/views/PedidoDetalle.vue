<template>
  <div>
    <div v-if="elCliente == null">Loading....</div>
    <div v-else>
      <h3>Detalle Pedido</h3>
      <b-row>
        <b-col sm="2"><label> Id:</label> </b-col>
        <b-col>{{ elPedido.id }}</b-col>
      </b-row>
      <b-row>
        <b-col sm="2"><label> Cliente:</label> </b-col>
        <b-col>{{ elCliente.nombre }} {{ elCliente.apellido }}</b-col>
      </b-row>
      <b-row>
        <b-col sm="2"><label>usuario: </label> </b-col>
        <b-col>{{ elCliente.usuario.nombreUsuario }} </b-col>
      </b-row>
      <b-row>
        <b-col sm="2"><label>Detalles del Pedido: </label> </b-col>

        <b-col>
          <ul>
            <li :key="detalle.index" v-for="detalle in elPedido.detallesPedido">
              {{ detalle.cantidad + " " + detalle.articulo.denominacion }}
            </li>
          </ul>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="2"><label> Domicilio: </label></b-col>
        <b-col>{{ elPedido.domicilio }}</b-col>
      </b-row>
      <b-row>
        <b-col sm="2"><label> Estado:</label> </b-col>
        <b-col>{{ estados(elPedido.estado) }}</b-col>
      </b-row>
      <b-row>
        <b-col sm="2"><label> Fecha: </label></b-col>
        <b-col>{{ elPedido.fecha }}</b-col>
      </b-row>
      <b-row>
        <b-col sm="2"><label> Hora Estimada: </label></b-col>
        <b-col>{{ elPedido.horaEstimadaFin }}</b-col>
      </b-row>
      <b-row>
        <b-col sm="2"><label> Tipo Envio:</label> </b-col>
        <b-col>{{
          elPedido.tipoEnvio ? "envio a domicilio" : "retiro en local"
        }}</b-col>
      </b-row>
      <b-row>
        <b-col sm="2"><label> Total</label> </b-col>
        <b-col>${{ elPedido.total }}</b-col>
      </b-row>

      <b-button router-link :to="{ name: 'CajeroListaDePedidos' }"
        >Volver
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["elPedido", "elCliente"]),
  },

  methods: {
    ...mapActions([
      "fetchTodosLosPedidos",
      "editPedido",
      "getPedido",
      "getCliente",
    ]),
    estados(estado) {
      const enEstado = {
        0: "Pendiente",
        1: "Aprobado",
        2: "Listo para entrega en local",
        3: "Terminado",
        4: "Pendiente de entrega delivery",
        5: "Entregado",
        6: "Cancelado",
        7: "Cocinando",
      };
      return enEstado[estado];
    },
  },

  async created() {
    await this.getPedido(this.$route.params.idPedido);

    await this.getCliente(this.elPedido.clienteID);
  },
};
</script>

<style scoped>
label {
  font-weight: 500;
}
</style>