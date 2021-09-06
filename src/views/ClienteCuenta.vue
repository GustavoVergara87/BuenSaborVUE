<template>
  <div>
    <h4>Mis datos de la cuenta</h4>

    <form class="container" @submit.prevent="handleRegistro">
      <label for="Email">Email</label>
      <input
        type="email"
        name="email"
        v-model="form.Email"
        placeholder="Email"
      />

      <label for="Clave">Clave</label>
      <input
        type="password"
        name="password"
        v-model="form.Clave"
        placeholder="Clave"
      />

      <label for="Nombre">Nombre</label>
      <input
        type="text"
        name="nombre"
        v-model="form.Nombre"
        placeholder="Nombre"
      />

      <label for="Apellido">Apellido</label>
      <input
        type="text"
        name="apellido"
        v-model="form.Apellido"
        placeholder="Apellido"
      />

      <label for="Telefono">Telefono</label>
      <input
        type="number"
        name="telefono"
        v-model="form.Telefono"
        placeholder="Telefono"
      />
      <h3>Domicilios registrados</h3>
      <b-form-group>
        <DomiciliosLista
          :disabled="noHayLoggin"
          :modoEditar="true"
          ref="DomiciliosListaCarrito"
        ></DomiciliosLista>
      </b-form-group>

      <button type="submit">Guardar cambios</button>
    </form>

    <h4>Mis Facturas</h4>
    <h5>Lista de facturas</h5>
    <!-- <b-table striped hover :items="facturas"></b-table> -->
    <!-- <div v-for="factura in facturas" :key="factura.id">
    <p>{{factura.numero}}</p>
    <p>{{factura.fecha}}</p>
    <p>{{factura.montoDescuento}}</p>
    <p>{{factura.total}}</p>
    <p>{{factura.PedidoId}}</p>
    </div> -->
    <b-table striped hover :items="pedidos">
       <template #cell(verFactura)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <a :href="data.value">ver factura</a>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DomiciliosLista from "../components/DomiciliosLista.vue";
import { getFacturas } from "../services/FacturasController";
import { fetchTodosLosPedidos } from "../services/PedidosController";
export default {
  components: {
    DomiciliosLista,
  },

  data() {
    return {
      form: {
        Email: "",
        Clave: "",
        Nombre: "",
        Apellido: "",
        Telefono: "",
      },
      domicilioNuevo: {
        calle: "",
        numero: "",
        localidad: "",
      },
      facturas: null,
      pedidos: null,
    };
  },
  methods: {
    async filtrarPedidos(clienteId) {
      const pedidos = await fetchTodosLosPedidos();
      const pedidosFiltrados = await pedidos.filter(
        (pedido) => pedido.clienteID == clienteId
      );
      console.log(pedidosFiltrados);
      const pedidosFiltradosCampos = pedidosFiltrados.map((pedido) => {
        return {
          id: pedido.id,
          formaPago: pedido.formaPago,
          tipoEnvio: pedido.tipoEnvio? "domicilio" : "local" ,
          fecha: pedido.fecha,
          total: pedido.total,
          verFactura:   "https://localhost:44350/api/Facturas/PDF/"+pedido.id
        };
      });
      return pedidosFiltradosCampos;
    },
  },
  computed: {
    ...mapGetters(["getCarrito", "traerUsuario", "traerCliente"]),
    noHayLoggin() {
      return this.traerCliente.nombre == "";
    },
  },
  async mounted() {
    this.pedidos = await this.filtrarPedidos(this.traerCliente.id);
    this.facturas = await getFacturas();
  },
};
</script>

<style  scoped>
/* Full-width inputs */
input[type="text"],
input[type="password"],
input[type="email"],
input[type="number"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.lista-domicilios {
  height: 6em;
  overflow-y: auto;
}
</style>
