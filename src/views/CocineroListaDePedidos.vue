<template>
  <div class="contenedor">
    <div class="lista">
      <h2>Pedidos Pendientes</h2>
      <ul>
        <li
          :key="pedido.id"
          v-for="pedido in todosLosPedidos.filter(
            (pedido) => pedido.estado == PE.APROBADO
          )"
        >
          <b-button @click="verDetallePedido(pedido.id)">Ver</b-button>

          <span class="estado">
            Cliente:
            <span v-show="!cargando[pedido.id]">{{ pedido.clienteID }}</span>
            <b-spinner
              class="spinnerChico"
              v-show="cargando[pedido.id]"
              variant="primary"
              label="Spinning"
            ></b-spinner>
          </span>

          <b-button variant="success" @click="aprobarPedido(pedido.id)"
            >Aprobar
          </b-button>
        </li>
      </ul>
    </div>

    <div class="lista">
      <h2>Pedidos Cocinando</h2>
      <ul>
        <li
          :key="pedido.id"
          v-for="pedido in todosLosPedidos.filter(
            (pedido) => pedido.estado == PE.COCINANDO
          )"
        >
          <b-button @click="verDetallePedido(pedido.id)">Ver</b-button>

          <span class="estado">
            Cliente:
            <span v-show="!cargando[pedido.id]">{{ pedido.clienteID }}</span>
            <b-spinner
              class="spinnerChico"
              v-show="cargando[pedido.id]"
              variant="primary"
              label="Spinning"
            ></b-spinner>
          </span>

          <b-button variant="danger" @click="retornarPedidoPendiente(pedido.id)"
            >Retornar a Pendientes
          </b-button>
          <b-button variant="success" @click="pedidoCocinado(pedido.id)"
            >PedidoCocinado</b-button
          >
        </li>
      </ul>
    </div>

    <div class="lista">
      <h2>Pedidos Cocinados</h2>
      <ul>
        <li
          :key="pedido.id"
          v-for="pedido in todosLosPedidos.filter(
            (pedido) =>
              pedido.estado == PE.LISTO_ENTREGA_LOCAL ||
              pedido.estado == PE.PENDIENTE_ENTREGA
          )"
        >
          <b-button @click="verDetallePedido(pedido.id)">Ver</b-button>

          <span class="estado">
            Cliente:
            <span v-show="!cargando[pedido.id]">{{ pedido.clienteID }}</span>
            <b-spinner
              class="spinnerChico"
              v-show="cargando[pedido.id]"
              variant="primary"
              label="Spinning"
            ></b-spinner>
          </span>

          <!-- <b-button variant="success" @click="pedidoTermiando(pedido.id)"
            >Pedido terminado
          </b-button> -->
          <b-button variant="danger" @click="pedidoNoCocinado(pedido.id)"
            >Retornar a Cocinando</b-button
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//importo los Getters y las Acciones de Vuex
//la idea es que: **con la acciones vas a modificar la lista en el BACK y en el FRONT (osea en el state de vuex)**
//todo lo de vuex pedidos lo podes ver en src/store/modules/pedidos
import { mapGetters, mapActions } from "vuex";
import PE from "../services/PedidoEstados";
import TE from "../services/TipoEnvio";
export default {
  data() {
    return { PE: PE, TE: TE };
  },
  computed: {
    ...mapGetters(["todosLosPedidos", "cargando", "todosLosClientes"]),
  },
  methods: {
    ...mapActions(["fetchTodosLosPedidos", "editPedido", "getPedido"]),

    verDetallePedido(idPedido) {
      this.$router.push({
        name: "CocineroPedidoDetalle",
        params: { idPedido: idPedido },
      });
    },

    async aprobarPedido(idPedido) {
      const pedido = await this.getPedido(idPedido);
      pedido.estado = PE.COCINANDO;
      this.editPedido(pedido);
    },

    async retornarPedidoPendiente(idPedido) {
      const pedido = await this.getPedido(idPedido);
      pedido.estado = PE.APROBADO;
      this.editPedido(pedido);
    },
    async pedidoCocinado(idPedido) {
      const pedido = await this.getPedido(idPedido);

      pedido.detallesPedido.map((detalle) => {
        detalle.estado = 1;
        fetch("/api/DetallesPedidos/" + detalle.id, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(detalle),
        });
      });
      if (pedido.tipoEnvio == TE.DOMICILIO) {
        pedido.estado = PE.PENDIENTE_ENTREGA;
      } else {
        pedido.estado = PE.LISTO_ENTREGA_LOCAL;
      }

      this.editPedido(pedido);
    },

    async pedidoNoCocinado(idPedido) {
      const pedido = await this.getPedido(idPedido);
      pedido.estado = PE.COCINANDO;
      this.editPedido(pedido);
    },
  },
  async created() {
    await this.fetchTodosLosPedidos();
  },
};
</script>

<style scoped>
@media screen and (max-width: 801px) {
  li {
    display: flex;
    width: 75%;
  }
  .contenedor {
    display: grid;
  }
  button,
  .estado {
    font-size: 0.8rem !important;
  }
}

.estado {
  display: inline-block;
  width: 6em;
  margin-left: 1em;
}

.lista {
  float: left;
  width: 33.3%;
}
</style>