<template>
  <div>
    <h4>Mi cuenta</h4>

    <form class="container">
      <label for="Email">Email</label>
      <input
        type="email"
        name="email"
        v-model="formUsuario.Email"
        placeholder="Email"
        :disabled="traerGoogleLogin"
      />

      <template v-if="!traerGoogleLogin">
        <label for="passwordVieja">Clave vieja</label>
        <input
          type="password"
          name="passwordVieja"
          v-model="formUsuario.ClaveVieja"
          placeholder="Clave"
        />
      </template>

      <label for="password">Clave nueva</label>
      <input
        type="password"
        name="password"
        v-model="formUsuario.Clave"
        placeholder="Clave"
        :disabled="traerGoogleLogin"
      />

      <template v-if="!traerGoogleLogin">
        <b-button
          type="button"
          class="btnGuardar"
          variant="success"
          @click="handleGuardarCambiosUsuario"
        >
          Guardar cambios
        </b-button>
      </template>

      <label for="Nombre">Nombre</label>
      <input
        type="text"
        name="nombre"
        v-model="formCliente.Nombre"
        placeholder="Nombre"
      />

      <label for="Apellido">Apellido</label>
      <input
        type="text"
        name="apellido"
        v-model="formCliente.Apellido"
        placeholder="Apellido"
      />

      <label for="Telefono">Telefono</label>
      <input
        type="number"
        name="telefono"
        v-model="formCliente.Telefono"
        placeholder="Telefono"
      />

      <b-button
        type="button"
        class="btnGuardar"
        variant="success"
        @click="handleGuardarCambios"
      >
        Guardar cambios
      </b-button>
    </form>

    <h3>Domicilios registrados</h3>
    <form class="container">
      <DomiciliosLista
        :disabled="noHayLoggin"
        :modoEditar="true"
        ref="DomiciliosListaCuenta"
      ></DomiciliosLista>
    </form>

    <h4>Mis Pedidos</h4>
    <h5>Lista de Pedidos</h5>

    <div class="container">
      <b-table striped hover :items="pedidos">
        <template #cell(verFactura)="data">
          <!-- `data.value` is the value after formatted by the Formatter -->
          <a :href="data.value">ver factura</a>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DomiciliosLista from "../components/DomiciliosLista.vue";
import { getFacturas } from "../services/FacturasController";
import { fetchTodosLosPedidos } from "../services/PedidosController";
import { getCliente, editCliente } from "../services/ClientesController";
import { editUsuario } from "../services/UsuariosController";

export default {
  components: {
    DomiciliosLista,
  },

  data() {
    return {
      formUsuario: {
        Email: "",
        ClaveVieja: "",
        Clave: "",
      },
      formCliente: {
        Nombre: "",
        Apellido: "",
        Telefono: 0,
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
    ...mapActions(["setCliente"]),
    async filtrarPedidos(clienteId) {
      const pedidos = await fetchTodosLosPedidos();
      const pedidosFiltrados = await pedidos.filter(
        (pedido) => pedido.clienteID == clienteId
      );
      // console.log(pedidosFiltrados);
      const pedidosFiltradosCampos = pedidosFiltrados.map((pedido) => {
        return {
          id: pedido.id,
          formaPago: pedido.formaPago,
          tipoEnvio: pedido.tipoEnvio ? "domicilio" : "local",
          fecha: pedido.fecha,
          total: pedido.total,
          verFactura: "https://localhost:44350/api/Facturas/PDF/" + pedido.id,
        };
      });
      return pedidosFiltradosCampos;
    },
    async handleGuardarCambios() {
      const cliente = await getCliente(this.traerCliente.id);
      let clienteAGuardar = {
        Id: cliente.id,
        Nombre: this.formCliente.Nombre,
        Apellido: this.formCliente.Apellido,
        Telefono: this.formCliente.Telefono,
        UsuarioID: cliente.usuarioID,
      };
      const errores = await editCliente(clienteAGuardar);
      const clienteVuex = {
        id: clienteAGuardar.Id,
        nombre: clienteAGuardar.Nombre,
        apellido: clienteAGuardar.Apellido,
        telefono: clienteAGuardar.Telefono,
      };

      this.setClienteManteniendoDomicilio(clienteVuex);

      if (errores != null) {
        alert("Cambios guardados");
      }
      // console.log(errores);
    },

    async handleGuardarCambiosUsuario() {
      const usuarioChange = {
        NombreUsuarioViejo: this.traerUsuario.nombreUsuario,
        ClaveVieja: this.formUsuario.ClaveVieja,
        NombreUsuarioNuevo: this.formUsuario.Email,
        ClaveNueva: this.formUsuario.Clave,
      };
      const errores = await editUsuario(usuarioChange);

      if (errores == null) {
        this.$root.$emit("logout"); //emite un evento que puede ser escuchado globalmente. LoginModal lo escucha y desloguea al usuario para que se reloguee
        alert("Cambios guardados. Logueese de nuevo");
      }
      // console.log(errores);
    },
  },
  computed: {
    ...mapGetters([
      "getCarrito",
      "traerUsuario",
      "traerCliente",
      "traerGoogleLogin",
    ]),
    noHayLoggin() {
      return this.traerCliente.nombre == "";
    },
  },
  async mounted() {
    this.pedidos = await this.filtrarPedidos(this.traerCliente.id);
    this.facturas = await getFacturas();
    this.formUsuario.Email = this.traerUsuario.nombreUsuario;
    this.formUsuario.Clave = "*****";
    this.formCliente.Nombre = this.traerCliente.nombre;
    this.formCliente.Apellido = this.traerCliente.apellido;
    this.formCliente.Telefono = this.traerCliente.telefono;
  },
};
</script>

<style  scoped>
.container {
  margin-bottom: 3.5em;
}

.btnGuardar {
  float: right;
  margin-top: 0.5em;
}

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
