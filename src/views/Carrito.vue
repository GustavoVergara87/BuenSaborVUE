<template>
  <div>
    <div v-if="generandoPedidoYDetallesPedido" style="z-index: 2000">
      <div
        style="
          margin: 0px;
          padding: 0px;
          top: 0px;
          z-index: 1000;
          opacity: 70%;
          background-color: #ffff;
          width: 100%;
          height: 100vh;
          outline: 10px red solid;
          position: fixed;
        "
      ></div>

      <b-spinner class="spinner" variant="primary" label="Spinning"></b-spinner>
      <span class="spinnerText"><h1>Generando Pedido</h1></span>
    </div>
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
                  @change="cargarDireccionCajero"
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
                  $ {{ numFormat(sumaDeDetalles * descuento, 0) }}</span
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
                @hide="cancelarPedido"
                @show="generandoPedidoYDetallesPedidoFin"
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
import {
  addPedido,
  finalizarPedido,
  deletePedido,
} from "../services/PedidosController";
import { addDetallePedido } from "../services/DetallesPedidosController";
import DomiciliosLista from "../components/DomiciliosLista.vue";
import TE from "../services/TipoEnvio";
import PE from "../services/PedidoEstados";
import { estaAbierto, proximoHdA, DiaDeLaSemana } from "../services/Tiempo";
import {
  stockTotalParaArticulosManufacturados,
  stockTotalParaArticulosNoManufacturados,
} from "../services/ArticulosController";

export default {
  components: { PlatosCarrito, DomiciliosLista },
  data() {
    return {
      TE: TE, //permite usar el autocompletar dentro del template para saber a que tipoenvio nos referimos
      PE: PE,
      generandoPedidoYDetallesPedido: false,
      form: {
        retiraEn: TE.DOMICILIO,
        direccionEntrega: "",
        formaPago: "MercadoPago",
      },
      mercadoPagoModalShow: false,
      show: true,
      preferencia: {
        pedidoId: 0,
        total: 0,
      },
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
    generandoPedidoYDetallesPedidoFin() {
      this.generandoPedidoYDetallesPedido = false;
    },

    async cancelarPedido() {
      //si el pedido no fue pagado y se apretó cancelar o se hizo click fuera del b-modal de MP, cancelarlo

      console.log("cancelarPedido", this.preferencia.pedidoId);
      await deletePedido(this.preferencia.pedidoId);
      this.preferencia.pedidoId = 0;
      this.preferencia.total = 0;
    },

    numFormat,
    val,

    soloHabilitarMercadoPago() {
      this.form.formaPago = "MercadoPago";
      this.form.direccionEntrega == "";
    },
    cargarDireccionCajero() {
      this.form.direccionEntrega = "Cajero";
    },

    async CheckearStock() {
      for (const carritoElement of this.getCarrito) {
        if (!carritoElement.EsManufacturado) {
          const stockParaArt = await stockTotalParaArticulosNoManufacturados(
            carritoElement.id
          );

          if (stockParaArt.StockTotal < carritoElement.cantidad) {
            console.log(carritoElement);
            alert(
              "lo sentimos, no contamos con esa cantidad de " +
                stockParaArt.Denominacion +
                ". Hay " +
                stockParaArt.StockTotal
            );
          }
        }

        const stockParaArt = await stockTotalParaArticulosManufacturados(
          carritoElement.id
        );

        let ingredienteLimitante = {
          hayIngredientePara: Number.MAX_SAFE_INTEGER,
        };

        stockParaArt.forEach((ingrediente) => {
          if (
            ingrediente.hayIngredientePara <
            ingredienteLimitante.hayIngredientePara
          ) {
            ingredienteLimitante = ingrediente;
          }
        });

        ingredienteLimitante.hayIngredientePara = Math.floor(
          ingredienteLimitante.hayIngredientePara
        );

        console.log(ingredienteLimitante);
        console.log(
          "Cantidad Pedida",
          carritoElement.cantidad,
          "CantidadDisponible",
          ingredienteLimitante.hayIngredientePara
        );

        if (ingredienteLimitante.hayIngredientePara < carritoElement.cantidad) {
          // console.log(carritoElement);
          alert(
            "lo sentimos, no contamos con " +
              ingredienteLimitante.Denominacion1 +
              " para esa cantidad de " +
              carritoElement.plato +
              ". Hay para " +
              ingredienteLimitante.hayIngredientePara
          );
        }
      }
    },

    async confirmarCompra() {
      this.CheckearStock();

      if (!(await estaAbierto())) {
        let rta = "Esta fuera del horario de atencion. ";
        const pHdA = await proximoHdA();
        rta +=
          "Los esperamos a partir del dia " +
          DiaDeLaSemana[pHdA.dia1] +
          " a las " +
          pHdA.hora1 +
          " horas.";
        alert(rta);

        // return
      }

      if (this.form.direccionEntrega == "") {
        alert("debe ingresar la dirección");
        return
      } 

        this.generandoPedidoYDetallesPedido = true;
        //Pide el Id del domicilio. Si es un domicilio nuevo, lo creará y traerá el Id
        let domicilioID;

        if (this.form.direccionEntrega == "Cajero") {
          domicilioID = 120;
        } else {
          domicilioID = await this.$refs.DomiciliosListaCarrito.getId();
        }
        const nuevoPedidoId = await this.enviarCarrito(
          domicilioID,
          this.form.retiraEn
        );

        if (this.form.formaPago == "Efectivo") {
          console.log("paga efectivo");
        } else {
          this.preferencia.pedidoId = nuevoPedidoId;
          this.preferencia.total = this.PrecioTotal;

          //El total no puede ser cero pesos porque MP explota
          if (this.PrecioTotal==0) {
            alert("nada es gratis. El carrito no puede salir 0 pesos. ESTO DEBE VERIFICARSE ANTES");
            return;
          }

          const res = await GenerarTicketMercadoPagoPreference(
            this.preferencia
          );
          const preferenceId = String(res.id);
          this.MPcheckout(preferenceId);
        }
      
    },

    async enviarCarrito(domicilioID, tipoEnvio) {
      //Creo un pedido
      const pedido = {
        TipoEnvio: tipoEnvio,
        ClienteID: this.traerCliente.id,
        DomicilioID: domicilioID,
        Estado:
          this.form.formaPago == "Efectivo"
            ? PE.PENDIENTE
            : PE.PAGO_PENDIENTE_MP,
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

      return nuevoPedido.id;
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
              container: ".cho-container", // Indica dónde se mostrará el botón de pago, el "check out container"
              label: "Pagar", // Cambia el texto del botón de pago (opcional)
            },
          });
        })
        .catch((error) => {
          console.log(error);
          // Failed to fetch script
        });
    },
  },
};
</script>


<style  scoped>
.abajoDerecha {
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