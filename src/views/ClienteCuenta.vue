<template>
  <div style="padding: 1em">
    <h4>Mi cuenta</h4>
    <div style="margin-top: 1.5em"></div>
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

    <h4>Domicilios registrados</h4>
    <div style="margin-top: 1.5em"></div>

    <form class="container">
      <DomiciliosLista
        :disabled="noHayLoggin"
        :modoEditar="true"
        ref="DomiciliosListaCuenta"
      ></DomiciliosLista>
    </form>

    <h4>Historial de Pedidos</h4>

    <div style="margin-top: 1.5em"></div>

    <div class="container">
      <b-table striped hover :items="pedidos" :fields="fields">
        <template #cell(verFactura)="data">
          <!-- `data.value` is the value after formatted by the Formatter -->
          <div class="div-boton-tabla">
            <b-button
              v-show="data.value != ''"
              @click="traerFacturaSegunPedido(data.value)"
            >
              <i class="fas fa-file-invoice-dollar"></i>
            </b-button>
          </div>

          <!-- <a :href="data.value">ver factura</a> -->
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
import { numFormat } from "../services/Auxiliares";

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
      fields: [
        { key: "id", label: "N°" },
        // { key: "formaPago", label: "Forma de Pago" },
        // { key: "tipoEnvio", label: "Tipo de Envio" },
        { key: "fecha", label: "Fecha" },
        { key: "total", label: "Total" },
        { key: "verFactura", label: "Factura" },
      ],
    };
  },
  methods: {
    numFormat,
    ...mapActions(["setCliente", "setClienteManteniendoDomicilio"]),
    async filtrarPedidos(clienteId) {
      const pedidos = await fetchTodosLosPedidos();
      const pedidosFiltrados = await pedidos.filter(
        (pedido) => pedido.clienteID == clienteId
      );
      const pedidosFiltradosCampos = pedidosFiltrados
        .map((pedido) => {
          return {
            id: pedido.id,
            formaPago: pedido.formaPago,
            tipoEnvio: pedido.tipoEnvio ? "domicilio" : "local",
            fecha:
              " " +
              // pedido.fecha.substring(2, 10) +
              pedido.fecha.substring(8, 10) +
              "/" +
              pedido.fecha.substring(5, 7) +
              "/" +
              pedido.fecha.substring(2, 4) +
              " " +
              pedido.fecha.substring(11, 16),
            total: "$ " + numFormat(pedido.total),
            verFactura:
              pedido.estado != 0 ?  process.env.VUE_APP_BACKURL + "/api/Facturas/PDF/" + pedido.id : "",
          };
        })
        .reverse();
      // console.log(pedidosFiltrados);
      return pedidosFiltradosCampos;
    },
    async traerFacturaSegunPedido(facturaDePedido) {
      let filename = "";
      await fetch(facturaDePedido, {
        headers: {
          "Content-Type": "application/pdf",
          Authorization: "Bearer " + this.traerToken,
        },
      })
        .then((response) => {
          const header = response.headers.get("Content-Disposition");
          const parts = header.split(";");
          filename = parts[1].split("=")[1];
          return response.blob();
        })
        .then((blob) => {
          // Create blob link to download
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          filename = filename.replaceAll('"', "");
          link.setAttribute("download", filename);
          // Append to html link element page
          document.body.appendChild(link);
          // Start download
          link.click();
          // Clean up and remove the link
          link.parentNode.removeChild(link);
        });
      console.log(facturaDePedido);
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
        const mensaje = "Cambios guardados";
        this.$root.$emit("alerta", mensaje);
      }
      //  console.log(errores);
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
        const mensaje = "Cambios guardados. Logueese de nuevo";
        this.$root.$emit("alerta", mensaje);
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
      "traerToken",
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

<style>
@media (max-width: 767px) {
  .table td,
  .table th {
    padding: 0rem;
    vertical-align: middle;
    border-top: 1px solid #dee2e6;
    text-align: center;
  }
}

.div-boton-tabla {
  height: 3em;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}
</style>
