<template>
  <div>
    <div class="lista">
      <h2>Pedidos Pendientes</h2>
      <ul>
        <li
          :key="pedido.id"
          v-for="pedido in todosLosPedidos.filter(
            (pedido) => pedido.estado == PE.PENDIENTE
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
          <b-button variant="danger" @click="cancelarPedido(pedido.id)"
            >Cancelar</b-button
          >
        </li>
      </ul>
    </div>

    <div class="lista">
      <h2>Pedidos Aprobados</h2>
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

          <b-button
            variant="success"
            @click="retornarPedidoPendiente(pedido.id)"
            >Retornar a Pendientes
          </b-button>
        </li>
      </ul>
    </div>

    <div class="lista">
      <h2>Pedidos Cancelados</h2>
      <ul>
        <li
          :key="pedido.id"
          v-for="pedido in todosLosPedidos.filter(
            (pedido) => pedido.estado == PE.CANCELADO
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

          <b-button
            variant="success"
            @click="retornarPedidoPendiente(pedido.id)"
            >Retornar a Pendientes
          </b-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import Vue from "vue";
//importo los Getters y las Acciones de Vuex
//la idea es que: **con la acciones vas a modificar la lista en el BACK y en el FRONT (osea en el state de vuex)**
//todo lo de vuex pedidos lo podes ver en src/store/modules/pedidos
import { mapGetters, mapActions } from "vuex";
import PE from "../services/PedidoEstados";

export default {
  data() {
    return {PE: PE};
  },
  computed: {
    ...mapGetters(["todosLosPedidos", "cargando", "todosLosClientes"]),
  },
  methods: {
    ...mapActions(["fetchTodosLosPedidos", "editPedido", "getPedido"]),

    verDetallePedido(idPedido) {
      this.$router.push({
        name: "CajeroPedidoDetalle",
        params: { idPedido: idPedido },
      });
    },

    async aprobarPedido(idPedido) {
      const pedido = await this.getPedido(idPedido);
      pedido.estado = PE.PENDIENTE;
      this.editPedido(pedido);
    },

    async cancelarPedido(idPedido) {
      const pedido = await this.getPedido(idPedido);
      pedido.estado = PE.CANCELADO;
      this.editPedido(pedido);
    },
    async retornarPedidoPendiente(idPedido) {
      const pedido = await this.getPedido(idPedido);
      pedido.estado = PE.PENDIENTE;
      this.editPedido(pedido);
    },
  },
  async created() {
    await this.fetchTodosLosPedidos();
  },
};
</script>

<style scoped>
.spinnerChico {
  --size: 1rem;
  width: var(--size);
  height: var(--size);
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