<template>
  <div>
    <ul>
      <li :key="pedido.id" v-for="pedido in todosLosPedidos">
        <b-button @click="verDetallePedido(pedido.id)">Ver</b-button>

        <span class="estado">
          Estado:
          <span v-show="!cargando[pedido.id]">{{ pedido.estado }}</span>
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
</template>

<script>
//importo los Getters y las Acciones de Vuex
//la idea es que: **con la acciones vas a modificar la lista en el BACK y en el FRONT (osea en el state de vuex)**
//todo lo de vuex pedidos lo podes ver en src/store/modules/pedidos
import { mapGetters, mapActions } from "vuex";

export default {
  // data() {
  //   // return { pedidos: [] };
  // },
  computed: {
    ...mapGetters(["todosLosPedidos", "cargando"]),
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
      // let res = await fetch(`https://localhost:44350/api/pedidos/${idPedido}`);
      // let pedido = await res.json();
      const pedido = await this.getPedido(idPedido);
      // console.log(pedido);

      // pedido.estado++;
      pedido.estado = 1;

      // await fetch(`https://localhost:44350/api/pedidos/${idPedido}`, {
      //   method: "PUT",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(pedido),
      // });
      this.editPedido(pedido);
    },

    async cancelarPedido(idPedido) {
      // let res = await fetch(`https://localhost:44350/api/pedidos/${idPedido}`);
      // let pedido = await res.json();
      const pedido = await this.getPedido(idPedido);

      // console.log(pedido);
      pedido.estado = 4;

      // await fetch(`https://localhost:44350/api/pedidos/${idPedido}`, {
      //   method: "PUT",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(pedido),
      // });
      this.editPedido(pedido);
    },
  },
  async created() {
    // let res = await fetch("/api/pedidos/");
    // let todosPedidos = await res.json();
    // const todosPedidos = await this.fetchTodosLosPedidos();
    await this.fetchTodosLosPedidos();
    console.log(this.todosLosPedidos);
    // this.pedidos = todosPedidos.filter((pedido) => pedido.estado == 0);
    // this.pedidos = todosPedidos;
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
</style>