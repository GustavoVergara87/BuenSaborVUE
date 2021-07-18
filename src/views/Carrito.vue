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
            <form>
              <!-- <div class="dottedRow">
                <label class="precio dottedLeft">N° de pedido:</label>
                <span class="dottedDots"></span>
                <span class="precio dottedRight">recien despues de crear el pedido lo obtenemos</span>
              </div> -->

              <!-- <div class="dottedRow">
                <label class="precio dottedLeft">Fecha:</label>
                <span class="dottedDots"></span>
                <span class="precio dottedRight"> despues de crear el pedido, fecha actual pedida por el servidor o un servidor externo</span>
              </div> -->

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

              <b-form-group label="Retira en:">
                <b-form-radio v-model="form.retiraEn" name="Domicilio" value="A"
                  >Domicilio</b-form-radio
                >
                <b-form-radio
                  v-model="form.retiraEn"
                  name="some-radios"
                  value="B"
                  >Local</b-form-radio
                >
              </b-form-group>

              <p>Direccion de entrega:</p>
              <b-form-input
                v-model="form.direccionEntrega"
                placeholder="Direccion deberia permitir escribir texto o elegir entre los cargados del cliente"
              ></b-form-input>

              <b-form-group id="input-group-3" label="" label-for="input-3">
                <b-form-select
                  id="input-3"
                  v-model="form.food"
                  :options="foods"
                  required
                ></b-form-select>
              </b-form-group>

              <div class="dottedRow">
                <label class="precio dottedLeft">Descuentos:</label>
                <span class="dottedDots"></span>
                <span class="precio dottedRight">{{ PrecioTotal }}</span>
              </div>

              <label>Forma de pago:</label>
              <b-form-radio
                v-model="form.formaPago"
                name="some-radios"
                value="A"
                >Efectivo</b-form-radio
              >
              <b-form-radio
                v-model="form.formaPago"
                name="some-radios"
                value="B"
                >Mercado Pago habilita el boton de mercado pago</b-form-radio
              >

              <div class="dottedRow">
                <label class="precio dottedLeft">Total:</label>
                <span class="dottedDots"></span>
                <span class="precio dottedRight">{{ PrecioTotal }}</span>
              </div>

              <div class="dottedRow">
                <label class="precio dottedLeft">Tiempo de entrega:</label>
                <span class="dottedDots"></span>
                <span class="precio dottedRight">{{ PrecioTotal }}</span>
              </div>

              <b-button @click="confirmarCarrito">Confirmar</b-button>
              <div class="cho-container"></div>
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

export default {
  components: { PlatosCarrito },
  data() {
    return {
      form: {
        retiraEn: "",
        direccionEntrega: "",
        formaPago: "",
      },
      compraId:"",
    

      show: true,
    };
  },

  computed: {
    ...mapGetters(["getCarrito", "traerUsuario", "traerCliente"]),
    PrecioTotal() {
      return this.getCarrito.reduce(
        (suma, item) => suma + this.val(item.PrecioVenta),
        0
      );
    },
    foods() {
      return this.traerCliente.domicilios.map(d =>{return (d.calle + " " +  d.numero + ", " + d.localidad )})
      // return [
      //   { text: "Direcciones guardadas", value: null },
      //   this.traerCliente.domicilios
      // ];
    },
  },

  methods: {
    val(a) {
      
      if (a != null && a != undefined) return parseInt(a);
      if (a == null || a == undefined) return 0;
    },
    async confirmarCarrito() {
    let pago = await fetch(`/api/pedidos/${this.PrecioTotal}`, {
       method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'

        },
    });
    let res =await pago.json()
    this.compraId = String(res.id);



 this.$loadScript("https://sdk.mercadopago.com/js/v2")
      .then(() => {
        // Agrega credenciales de SDK
        // eslint-disable-next-line no-undef
        const mp = new MercadoPago("TEST-6a6c0062-d292-415b-bc19-b06e5773b493", {
          locale: "es-AR",
        });

 

        // Inicializa el checkout
        mp.checkout({
          preference: {
            id: this.compraId
            
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
</style>