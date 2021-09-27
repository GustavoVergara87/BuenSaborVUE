<template>
  <div class="contenedor">
    <div class="tipoPedidos">
      <h2>Pendientes</h2>
      <div class="lista">
        <ul>
          <li
            :key="pedido.id"
            v-for="pedido in losPedidos.filter(
              (pedido) => pedido.estado == PE.PENDIENTE
            )"
          >
            <div class="estado">
              <div>Cliente: {{ pedido.cliente.nombre }}</div>
              <div>Pedido: {{ pedido.id }}</div>
              <div>Forma de Pago: {{ pedido.formaPago }}</div>
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
              <b-button variant="danger" @click="cancelarPedido(pedido.id)"
                >Cancelar</b-button
              >
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="tipoPedidos">
      <h2>Mandados a Cocina</h2>
      <div class="lista">
        <ul>
          <li
            :key="pedido.id"
            v-for="pedido in losPedidos.filter(
              (pedido) => pedido.estado == PE.APROBADO
            )"
          >
            <div class="estado">
              <div>Cliente: {{ pedido.cliente.nombre }}</div>
              <div>Pedido: {{ pedido.id }}</div>
              <div>Forma de Pago: {{ pedido.formaPago }}</div>
              <b-spinner
                class="spinnerChico"
                v-show="cargando[pedido.id]"
                variant="primary"
                label="Spinning"
              ></b-spinner>

              <b-button @click="verDetallePedido(pedido.id)">Ver</b-button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="tipoPedidos">
      <h2>Cocinando</h2>
      <div class="lista">
        <ul>
          <li
            :key="pedido.id"
            v-for="pedido in losPedidos.filter(
              (pedido) => pedido.estado == PE.COCINANDO
            )"
          >
            <div class="estado">
              <div>Cliente: {{ pedido.cliente.nombre }}</div>
              <div>Pedido: {{ pedido.id }}</div>
              <div>Forma de Pago: {{ pedido.formaPago }}</div>
              <b-spinner
                class="spinnerChico"
                v-show="cargando[pedido.id]"
                variant="primary"
                label="Spinning"
              ></b-spinner>

              <b-button @click="verDetallePedido(pedido.id)">Ver</b-button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="tipoPedidos">
      <h2>Para Retirar en Salón</h2>
      <div class="lista">
        <ul>
          <li
            :key="pedido.id"
            v-for="pedido in losPedidos.filter(
              (pedido) => pedido.estado == PE.LISTO_ENTREGA_LOCAL
            )"
          >
            <div class="estado">
              <div>Cliente: {{ pedido.cliente.nombre }}</div>
              <div>Pedido: {{ pedido.id }}</div>
              <div>Forma de Pago: {{ pedido.formaPago }}</div>
              <b-spinner
                class="spinnerChico"
                v-show="cargando[pedido.id]"
                variant="primary"
                label="Spinning"
              ></b-spinner>

              <b-button @click="verDetallePedido(pedido.id)">Ver</b-button>
              <b-button variant="success" @click="pedidoEntregado(pedido.id)"
                >Pedido entregado
              </b-button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="tipoPedidos">
      <h2>En Reparto</h2>
      <div class="lista">
        <ul>
          <li
            :key="pedido.id"
            v-for="pedido in losPedidos.filter(
              (pedido) => pedido.estado == PE.PENDIENTE_ENTREGA
            )"
          >
            <div class="estado">
              <div>Cliente: {{ pedido.cliente.nombre }}</div>
              <div>Pedido: {{ pedido.id }}</div>
              <div>Forma de Pago: {{ pedido.formaPago }}</div>
              <b-spinner
                class="spinnerChico"
                v-show="cargando[pedido.id]"
                variant="primary"
                label="Spinning"
              ></b-spinner>

              <b-button @click="verDetallePedido(pedido.id)">Ver</b-button>
              <b-button variant="success" @click="pedidoEntregado(pedido.id)"
                >Pedido entregado
              </b-button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="tipoPedidos">
      <h2>Entregados</h2>
      <div class="lista">
        <ul>
          <li
            :key="pedido.id"
            v-for="pedido in losPedidos.filter(
              (pedido) => pedido.estado == PE.ENTREGADO
            )"
          >
            <div class="estado">
              <div>Cliente: {{ pedido.cliente.nombre }}</div>
              <div>Pedido: {{ pedido.id }}</div>
              <div>Forma de Pago: {{ pedido.formaPago }}</div>
              <b-spinner
                class="spinnerChico"
                v-show="cargando[pedido.id]"
                variant="primary"
                label="Spinning"
              ></b-spinner>

              <b-button @click="verDetallePedido(pedido.id)">Ver</b-button>
              <b-button
                variant="success"
                @click="retornarPedidoPendienteEntrega(pedido.id)"
                >Retornar a pendiente de entrega
              </b-button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="tipoPedidos">
      <h2>Cancelados</h2>
      <div class="lista">
        <ul>
          <li
            :key="pedido.id"
            v-for="pedido in losPedidos.filter(
              (pedido) => pedido.estado == PE.CANCELADO
            )"
          >
            <div class="estado">
              <div>Cliente: {{ pedido.cliente.nombre }}</div>
              <div>Pedido: {{ pedido.id }}</div>
              <div>Forma de Pago: {{ pedido.formaPago }}</div>
              <b-spinner
                class="spinnerChico"
                v-show="cargando[pedido.id]"
                variant="primary"
                label="Spinning"
              ></b-spinner>

              <b-button @click="verDetallePedido(pedido.id)">Ver</b-button>
              <b-button
                variant="success"
                @click="retornarPedidoPendiente(pedido.id)"
                >Retornar a Pendientes
              </b-button>
            </div>
          </li>
        </ul>
      </div>
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
    return { PE: PE };
  },
  computed: {
    ...mapGetters(["todosLosPedidos", "cargando", "todosLosClientes"]),
    losPedidos() {
      if (this.$route.query.cliente !== undefined) {
        return this.todosLosPedidos
          .filter(
            (pedido) => pedido.cliente.nombre !== null && pedido.cliente.nombre !== undefined
          )
          .filter((pedido) =>
            pedido.cliente.nombre
              .toLowerCase()
              .includes(this.$route.query.cliente.toLowerCase())
          );
      }
      return this.todosLosPedidos
    },
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

      pedido.estado = PE.APROBADO;
      this.editPedido(pedido).catch((a) => {
        alert(a);
        pedido.estado = PE.PENDIENTE;
      });
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
    async retornarPedidoPendienteEntrega(idPedido) {
      const pedido = await this.getPedido(idPedido);

      if (pedido.tipoEnvio == 0) {
        pedido.estado = PE.PENDIENTE_ENTREGA;
      } else {
        pedido.estado = PE.LISTO_ENTREGA_LOCAL;
      }

      this.editPedido(pedido);
    },
    async pedidoEntregado(idPedido) {
      const pedido = await this.getPedido(idPedido);
      pedido.estado = PE.ENTREGADO;
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
  height: 300px;
  padding: 0.5em;
  overflow: hidden;
}

.lista {
  height: calc(300px - 2em);
  overflow: auto;
}

.lista ul {
  list-style-type: none;
  padding: 0;
}
</style>