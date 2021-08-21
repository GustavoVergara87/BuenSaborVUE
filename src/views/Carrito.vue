<template>
  <div>
    <div class="resumenPedidoMarco">
      <h5>Resumen de pedido</h5>
      <b-container fluid>
        <b-row>
          <b-col>
            <PlatosCarrito></PlatosCarrito>
          </b-col>

          <b-col>
            <div>
              <p v-show="traerCliente.nombre == ''">
                Debe loggearse para poder pagar
              </p>
            </div>
            <form class="columnaDerecha" :class="{ formDisabled: noHayLoggin }">
              <div class="dottedRow">
                <label class="precio dottedLeft">Cliente:</label>
                <span class="dottedDots"></span>
                <span class="precio dottedRight"
                  >{{ traerCliente.nombre }} {{ traerCliente.apellido }}</span
                >
              </div>

              <div class="dottedRow">
                <label class="precio dottedLeft">Telefono:</label>
                <span class="dottedDots"></span>
                <span class="precio dottedRight">{{
                  traerCliente.telefono
                }}</span>
              </div>
              <!-- ---------------------------------------------------------Direccion de Entrega -->
              <b-form-group label="Retira en:" class="grupoEncabezado">
                <b-form-radio
                  v-model="form.retiraEn"
                  :value="TE.DOMICILIO"
                  :disabled="noHayLoggin"
                  @change="soloHabilitarMercadoPago"
                  >Domicilio</b-form-radio
                >
                <b-form-radio
                  v-model="form.retiraEn"
                  :value="TE.LOCAL"
                  :disabled="noHayLoggin"
                  >Local</b-form-radio
                >
              </b-form-group>

              <div v-show="form.retiraEn == TE.DOMICILIO">
                <b-form-group label="Direccion de entrega:">
                  <DomiciliosLista
                    :disabled="noHayLoggin"
                    v-model="form.direccionEntrega"
                    :modoEditar="false"
                    ref="DomiciliosListaCarrito"
                  ></DomiciliosLista>
                </b-form-group>
              </div>
              <!-- ----------------------------------------------------------------------Fin Direccion de Entrega -->

              <div v-show="descuento != 0" class="dottedRow">
                <label class="precio dottedLeft">Descuento 10%:</label>
                <span class="dottedDots"></span>
                <span class="precio dottedRight">
                  $ {{ numFormat(PrecioTotal * 0.1) }}</span
                >
              </div>

              <!-- ----------------------------------------------------------------------Forma de pago-->
              <b-form-group label="Forma de pago:" class="grupoEncabezado">
                <b-form-radio
                  v-model="form.formaPago"
                  name="Efectivo"
                  value="Efectivo"
                  :disabled="noHayLoggin || form.retiraEn == TE.DOMICILIO"
                  >Efectivo</b-form-radio
                >
                <b-form-radio
                  v-model="form.formaPago"
                  name="MercadoPago"
                  value="MercadoPago"
                  :disabled="noHayLoggin"
                  >Mercado Pago</b-form-radio
                >
              </b-form-group>
              <!-- ----------------------------------------------------------------------Fin Forma de pago-->

              <div class="dottedRow">
                <label class="precio dottedLeft">Total:</label>
                <span class="dottedDots"></span>
                <span class="precio dottedRight"
                  ><b>$ {{ numFormat(PrecioTotal) }}</b></span
                >
              </div>

              <b-button
                class="btn btn-success abajoDerecha"
                @click="confirmarCompra"
                :disabled="noHayLoggin"
                >Confirmar compra</b-button
              >

              <b-modal
                v-model="mercadoPagoModalShow"
                ok-only
                ok-variant="secondary"
                ok-title="Cancelar"
                :hide-header="true"
              >
                <div class="cho-container centerDiv">
                  <img
                    src="../../public/images/mercadoPagoLogo.svg"
                    width="20%"
                    class="imagenMP"
                  />
                </div>
              </b-modal>
            </form>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import PlatosCarrito from "../components/PlatosCarrito.vue";
import { numFormat, val } from "../services/Auxiliares";
import { GenerarTicketMercadoPagoPreference } from "../services/MercadoPago";
import { addPedido, finalizarPedido } from "../services/PedidosController";
import { addDetallePedido } from "../services/DetallesPedidosController";
import DomiciliosLista from "../components/DomiciliosLista.vue";
import TE from "../services/TipoEnvio";
export default {
  components: { PlatosCarrito, DomiciliosLista },
  data() {
    return {
      TE: TE, //permite usar el autocompletar dentro del template para saber a que tipoenvio nos referimos
      form: {
        retiraEn: TE.DOMICILIO,
        direccionEntrega: "",
        formaPago: "MercadoPago",
      },
      mercadoPagoModalShow: false,
      show: true,
    };
  },

  computed: {
    ...mapGetters(["getCarrito", "traerUsuario", "traerCliente"]),

    sumaDeDetalles() {
      return this.getCarrito.reduce(
        (suma, item) =>
          suma + this.val(item.PrecioVenta) * this.val(item.cantidad),
        0
      );
    },
    descuento() {
      if (this.form.retiraEn == TE.LOCAL) return 0.1;
      return 0;
    },
    PrecioTotal() {
      return this.sumaDeDetalles * (1 - this.descuento);
    },
    noHayLoggin() {
      return this.traerCliente.nombre == "";
    },
  },

  methods: {
    mostrarPorConsola(obj) {
      console.log(obj);
    },
    numFormat,
    val,

    soloHabilitarMercadoPago() {
      this.form.formaPago = "MercadoPago";
    },

    async confirmarCompra() {
      if (this.form.formaPago == "Efectivo") {
        console.log("paga efectivo");
      } else {
        const res = await GenerarTicketMercadoPagoPreference(this.PrecioTotal);
        const preferenceId = String(res.id);
        this.MPcheckout(preferenceId);
      }

      //Pide el Id del domicilio. Si es un domicilio nuevo, lo creará y traerá el Id
      const domicilioID = await this.$refs.DomiciliosListaCarrito.getId();
      this.enviarCarrito(domicilioID, this.form.retiraEn);
    },

    async enviarCarrito(domicilioID, tipoEnvio) {
      //Creo un pedido
      const pedido = {
        tipoEnvio: tipoEnvio,
        ClienteID: this.traerCliente.id,
        domicilioID: domicilioID,
      };

      //envio pedido y lo recibo completo con el id nuevo
      const nuevoPedido = await addPedido(pedido);

      console.log("nuevoPedido", nuevoPedido);

      //Recorro el carrito y creo pedidos
      for (let index = 0; index < this.getCarrito.length; index++) {
        const dPedido = this.getCarrito[index];

        //creo detalles de pedido y los vinculo al pedido recien creado
        const detallePedido = {
          pedidoID: nuevoPedido.id,
          cantidad: dPedido.cantidad,
          articuloID: dPedido.id,
        };
        //Envio DetallePedido
        const nuevoDetallePedido = await addDetallePedido(detallePedido);
        console.log("nuevoDetallePedido", nuevoDetallePedido);
      }

      //Finalizo el pedido (aviso que no se van a agregar mas detallePedido)
      const pedidoTerminado = await finalizarPedido(nuevoPedido.id);
      console.log("pedidoTerminado", pedidoTerminado);
    },

    MPcheckout(preferenceId) {
      this.mercadoPagoModalShow = true;

      this.$loadScript("https://sdk.mercadopago.com/js/v2")
        .then(() => {
          // Agrega credenciales de SDK
          // eslint-disable-next-line no-undef
          const mp = new MercadoPago(
            "TEST-6a6c0062-d292-415b-bc19-b06e5773b493",
            {
              locale: "es-AR",
            }
          );
          mp.checkout({
            // Inicializa el checkout
            preference: {
              id: preferenceId,
            },
            render: {
              container: ".cho-container", // Indica dónde se mostrará el botón de pago
              label: "Pagar", // Cambia el texto del botón de pago (opcional)
            },
          });
        })
        .catch(() => {
          // Failed to fetch script
        });
    },
  },
};
</script>


<style  scoped>

.abajoDerecha{
  margin-top: 1em;
  float: right;
}

.grupoEncabezado {
  margin-top: 1em;
}

.resumenPedidoMarco {
  margin: 2em;
}

.imagenMP {
  margin: 2em;
}

.centerDiv {
  display: flex;
  align-items: center;
  justify-content: center;
}

.formDisabled {
  /* pointer-events: none; */
  color: gray;
}

.columnaDerecha {
  padding-top: 1.5em;
}
</style>