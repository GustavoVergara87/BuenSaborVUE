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
              <!-- --------------------------------------------------------------------------------Direccion de Entrega -->
              <b-form-group label="Retira en:">
                <b-form-radio
                  v-model="form.retiraEn"
                  name="Domicilio"
                  value="0"
                  :disabled="noHayLoggin"
                  @change="soloHabilitarMercadoPago"
                  >Domicilio</b-form-radio
                >
                <b-form-radio
                  v-model="form.retiraEn"
                  name="Local"
                  value="1"
                  :disabled="noHayLoggin"
                  >Local</b-form-radio
                >
              </b-form-group>

              <div v-show="form.retiraEn == '0'">
                <b-form-group label="Direccion de entrega:">
                  <b-form-radio
                    v-model="domicilio"
                    name="DomicilioGuardado"
                    value="DomicilioGuardado"
                    :disabled="noHayLoggin"
                    >Guardado</b-form-radio
                  >
                  <b-form-radio
                    v-model="domicilio"
                    name="DomicilioNuevo"
                    value="DomicilioNuevo"
                    :disabled="noHayLoggin"
                    >Nuevo</b-form-radio
                  >
                </b-form-group>

                <b-form-group
                  label=""
                  v-show="domicilio == 'DomicilioGuardado'"
                >
                  <b-form-select
                    v-model="form.direccionEntrega"
                    required
                    :disabled="noHayLoggin"
                  >
                    <option
                      v-for="domicilio in domicilios"
                      v-bind:value="domicilio.value"
                      v-bind:key="domicilio.value"
                    >
                      {{ domicilio.text }}
                    </option>
                  </b-form-select>
                </b-form-group>

                <div v-show="domicilio == 'DomicilioNuevo'">
                  <b-form-input
                    v-model="domicilioNuevo.calle"
                    placeholder="calle"
                    :disabled="noHayLoggin"
                  ></b-form-input>
                  <b-form-input
                    v-model="domicilioNuevo.numero"
                    type="number"
                    placeholder="numero"
                    :disabled="noHayLoggin"
                  ></b-form-input>
                  <b-form-input
                    v-model="domicilioNuevo.localidad"
                    placeholder="localidad"
                    :disabled="noHayLoggin"
                  ></b-form-input>
                </div>
              </div>
              <!-- --------------------------------------------------------------------------------Fin Direccion de Entrega -->

              <div class="dottedRow">
                <label class="precio dottedLeft">Descuentos:</label>
                <span class="dottedDots"></span>
                <span class="precio dottedRight">{{ PrecioTotal }}</span>
              </div>

              <label>Forma de pago:</label>
              <b-form-radio
                v-model="form.formaPago"
                name="Efectivo"
                value="Efectivo"
                :disabled="noHayLoggin || form.retiraEn == '0'"
                >Efectivo</b-form-radio
              >
              <b-form-radio
                v-model="form.formaPago"
                name="MercadoPago"
                value="MercadoPago"
                :disabled="noHayLoggin"
                >Mercado Pago</b-form-radio
              >

              <div class="dottedRow">
                <label class="precio dottedLeft">Total:</label>
                <span class="dottedDots"></span>
                <span class="precio dottedRight"
                  >$ {{ numFormat(PrecioTotal) }}</span
                >
              </div>

              <b-button
                class="btn btn-success"
                @click="confirmarCarrito"
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
import { numFormat, val } from "../services/comunes";
import { enviarCarrito } from "../services/Carrito";
import { GenerarTicketMercadoPagoPreference } from "../services/MercadoPago";
import { addDomicilio } from "../services/DomiciliosController";

export default {
  components: { PlatosCarrito },
  data() {
    return {
      form: {
        retiraEn: "0",
        direccionEntrega: "",
        formaPago: "MercadoPago",
      },

      domicilioNuevo: {
        calle: "",
        numero: "",
        localidad: "",
      },
      domicilio: "DomicilioGuardado",
      mercadoPagoModalShow: false,
      show: true,
    };
  },

  computed: {
    ...mapGetters(["getCarrito", "traerUsuario", "traerCliente"]),
    PrecioTotal() {
      return this.getCarrito.reduce(
        (suma, item) =>
          suma + this.val(item.PrecioVenta) * this.val(item.cantidad),
        0
      );
    },
    noHayLoggin() {
      return this.traerCliente.nombre == "";
    },
    domicilios() {
      return this.traerCliente.domicilios.map((d) => {
        return {
          text: d.calle + " " + d.numero + ", " + d.localidad,
          value: d.id,
        };
      });
    },
  },

  methods: {
    enviarCarrito,
    numFormat,
    val,

    soloHabilitarMercadoPago() {
      this.form.formaPago = "MercadoPago";
    },

    async confirmarCarrito() {
      if (this.form.formaPago == "Efectivo") {
        console.log("paga efectivo");
      } else {
        const res = await GenerarTicketMercadoPagoPreference(this.PrecioTotal);
        const preferenceId = String(res.id);
        this.MPcheckout(preferenceId);
      }

      let domicilioID = undefined;

      if (this.domicilio == "DomicilioGuardado") {
        domicilioID = this.form.direccionEntrega;
      } else {
        //Creo un domicilio si es necesario
        const domicilio = JSON.parse(JSON.stringify(this.domicilioNuevo));
        domicilio.clienteID = this.traerCliente.id;
        const domicilioNuevo = await addDomicilio(domicilio);
        domicilioID = domicilioNuevo.id;
        //DEBERIA RECARGAR EL CLIENTE O LOS DOMICILIOS PARA QUE ESTÉ INCLUIDO EL NUEVO
      }

      this.enviarCarrito(domicilioID, this.form.retiraEn);
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