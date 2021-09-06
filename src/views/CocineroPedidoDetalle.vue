<template>
  <div>
    <div>
      <h1>Detalle Pedido</h1>
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
            <p>{{ elPedido.cliente.nombre + " " + elPedido.cliente.apellido }}</p>
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

export default {
  data() {
    return { PE: PE };
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

      await fetch("/api/DetallesPedidos/" + id, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(detalle[0]),
      });
    },

    platoListo(detalle) {
      if (detalle.estado == 1) {
        return "#7BDA01";
      } else {
        return "red";
      }
    },

    async setPedidoCocinado() {
      this.elPedido.detallesPedido.map((detalle) => {
        detalle.estado = 1;
         fetch("/api/DetallesPedidos/" + detalle.id, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(detalle),
        });
      });

      if (this.elPedido.tipoEnvio == 0) {
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
p {
  font-size: 30px;
  font-weight: 500;
  padding: 10px;
}
.elemento {
  padding: 15px;
  background-color: rgb(63, 216, 63);
  border: 1px solid black;
  width: 25%;
}
button {
  margin: 10px;
}
</style>