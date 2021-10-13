<template>
  <div class="contenedor">
    <div class="tipoPedidos">
      <h2>Esperando Preparación</h2>
      <div class="lista">
        <ul>
          <li
            :key="pedido.id"
            v-for="pedido in todosLosPedidos.filter(
              (pedido) => pedido.estado == PE.APROBADO
            )"
          >
            <div class="estado">
              Cliente:
              <span v-show="!cargando[pedido.id]">{{
                pedido.cliente.nombre
              }}</span>
              <div>Pedido: {{ pedido.id }}</div>
              <b-spinner
                class="spinnerChico"
                v-show="cargando[pedido.id]"
                variant="primary"
                label="Spinning"
              ></b-spinner>

            <b-button @click="verDetallePedido(pedido.id)">Ver</b-button>
            <b-button variant="success" @click="aprobarPedido(pedido.id)"
              >Aprobar
            </b-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="tipoPedidos">
      <h2>Pedidos Cocinando</h2>
      <div class="lista">
        <ul>
          <li
            :key="pedido.id"
            v-for="pedido in todosLosPedidos.filter(
              (pedido) => pedido.estado == PE.COCINANDO
            )"
          >
            <div class="estado">
              Cliente:
              <span v-show="!cargando[pedido.id]">{{
                pedido.cliente.nombre
              }}</span>
              <div>Pedido: {{ pedido.id }}</div>
              <b-spinner
                class="spinnerChico"
                v-show="cargando[pedido.id]"
                variant="primary"
                label="Spinning"
              ></b-spinner>

            <b-button @click="verDetallePedido(pedido.id)">Ver</b-button>
            <b-button
              variant="danger"
              @click="retornarPedidoPendiente(pedido.id)"
              >Retornar a Pendientes
            </b-button>
            <b-button variant="success" @click="pedidoCocinado(pedido.id)"
              >PedidoCocinado</b-button
            >
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="tipoPedidos">
      <h2>Pedidos Cocinados</h2>
      <div class="lista">
        <ul>
          <li
            :key="pedido.id"
            v-for="pedido in todosLosPedidos.filter(
              (pedido) =>
                pedido.estado == PE.LISTO_ENTREGA_LOCAL ||
                pedido.estado == PE.PENDIENTE_ENTREGA
            )"
          >
            <div class="estado">
              Cliente:
              <span v-show="!cargando[pedido.id]">{{
                pedido.cliente.nombre
              }}</span>
              <div>Pedido: {{ pedido.id }}</div>
              <b-spinner
                class="spinnerChico"
                v-show="cargando[pedido.id]"
                variant="primary"
                label="Spinning"
              ></b-spinner>

            <!-- <b-button variant="success" @click="pedidoTermiando(pedido.id)"
            >Pedido terminado
          </b-button> -->
            <b-button @click="verDetallePedido(pedido.id)">Ver</b-button>
            <b-button variant="danger" @click="pedidoNoCocinado(pedido.id)"
              >Retornar a Cocinando</b-button
            >
            </div>
          </li>
        </ul>
      </div>
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
import { editDetallePedido } from "../services/DetallesPedidosController";

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
      await pedido.detallesPedido.map((detalle) => {
        detalle.estado = 1;
        editDetallePedido(detalle);
      });

      if (pedido.tipoEnvio == TE.DOMICILIO) {
        pedido.estado = PE.PENDIENTE_ENTREGA;
      } else {
        pedido.estado = PE.LISTO_ENTREGA_LOCAL;
      }

      await this.editPedido(pedido);
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
  h2 {
    font-size: 1rem;
  }

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
  .tipoPedidos {
    width: 100% !important;
  }
}

h2 {
  font-size: 150%;
}

.estado {
  display: inline-block;
  width: 100%;
  padding: 0.5em;
  /* border: 1px solid grey; */
  background-color: lightgray;
  margin-bottom: 1em;
}

.tipoPedidos {
  float: left;
  width: 33.3%;
  border: 1px solid gray;
  height: 100%;
  padding: 0.5em;
  overflow: hidden;
}

.lista {
  /* height: calc(300px - 2em); */
  height: 100vh;
  overflow: auto;
}

.lista ul {
  list-style-type: none;
  padding: 0;
}
</style>