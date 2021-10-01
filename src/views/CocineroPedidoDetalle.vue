<template>
  <div>
    <div>
      <h3>Detalle Pedido</h3>
      <div>
        <b-row>
          <b-col class="informacionPrincipal" sm="2">
            <p>Id:</p>
          </b-col>
          <b-col>
            <p>{{ elPedido.id }}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="2">
            <p>Nombre del Cliente:</p>
          </b-col>
          <b-col>
            <p>
              {{ elPedido.cliente.nombre + " " + elPedido.cliente.apellido }}
            </p>
          </b-col>
        </b-row>
      </div>
      <ul>
        <li :key="detalle.index" v-for="detalle in elPedido.detallesPedido">
          <div
            class="elemento"
            :style="{ 'background-color': platoListo(detalle) }"
          >
            <p>
              {{ detalle.cantidad }}
            </p>
            <p>{{ detalle.articulo.denominacion }}</p>
            <b-button @click="setPlatoCocinado(detalle.id)">{{
              detalle.estado ? "Pendiente" : "Listo"
            }}</b-button>
          </div>
        </li>
      </ul>
      <b-button @click="volver()">Volver</b-button>
      <b-button @click="setPedidoCocinado()">Todo Cocinado</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PE from "../services/PedidoEstados";
import TE from "../services/TipoEnvio";
import { editDetallePedido } from "../services/DetallesPedidosController";

export default {
  data() {
    return { PE: PE, TE: TE };
  },

  computed: {
    ...mapGetters(["elPedido"]),
  },
  methods: {
    ...mapActions([
      "fetchTodosLosPedidos",
      "editPedido",
      "getPedido",
      "getCliente",
    ]),

    async setPlatoCocinado(id) {
      let detalle = this.elPedido.detallesPedido.filter(
        (detalle) => detalle.id == id
      );

      detalle[0].estado = +!detalle[0].estado;
      await editDetallePedido(detalle[0]);
    },

    platoListo(detalle) {
      if (detalle.estado == 1) {
        return "#7BDA01";
      } else {
        return "red";
      }
    },

    async setPedidoCocinado() {
      await this.elPedido.detallesPedido.map((detalle) => {
        detalle.estado = 1;
        editDetallePedido(detalle);
      });

      if (this.elPedido.tipoEnvio == TE.DOMICILIO) {
        this.elPedido.estado = PE.PENDIENTE_ENTREGA;
      } else {
        this.elPedido.estado = PE.LISTO_ENTREGA_LOCAL;
      }
      this.editPedido(this.elPedido);

      this.$router.push({ name: "CocineroListaDePedidos" });
    },

    volver() {
      this.$router.push({ name: "CocineroListaDePedidos" });
    },
  },
  async created() {
    await this.getPedido(this.$route.params.idPedido);
  },
};
</script>

<style scoped>
@media screen and (max-width: 801px) {
  .elemento {
    width: 80% !important;
  }
}
p {
  font-size: 15px;
  font-weight: 500;
  padding: 5px;
}
.elemento {
  padding: 15px;
  background-color: rgb(63, 216, 63);
  border: 1px solid black;
  width: 50%;
}
button {
  margin: 10px;
}
</style>