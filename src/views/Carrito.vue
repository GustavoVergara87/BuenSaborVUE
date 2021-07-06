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
              <div class="dottedRow">
                <label class="precio dottedLeft">N° de pedido:</label>
                <span class="dottedDots"></span>
                <span class="precio dottedRight">{{ PrecioTotal }}</span>
              </div>

              <div class="dottedRow">
                <label class="precio dottedLeft">Fecha:</label>
                <span class="dottedDots"></span>
                <span class="precio dottedRight">{{ PrecioTotal }}</span>
              </div>

              <div class="dottedRow">
                <label class="precio dottedLeft">Cliente:</label>
                <span class="dottedDots"></span>
                <span class="precio dottedRight">{{ PrecioTotal }}</span>
              </div>

              <div class="dottedRow">
                <label class="precio dottedLeft">Telefono:</label>
                <span class="dottedDots"></span>
                <span class="precio dottedRight">{{ PrecioTotal }}</span>
              </div>

              <b-form-group label="Retira en:">
                <b-form-radio v-model="selected2" name="Domicilio" value="A"
                  >Domicilio</b-form-radio
                >
                <b-form-radio v-model="selected2" name="some-radios" value="B"
                  >Local</b-form-radio
                >
              </b-form-group>

              <p>Direccion de entrega:</p>
              <b-form-input
                v-model="text"
                placeholder="Direccion"
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
              <b-form-radio v-model="selected" name="some-radios" value="A"
                >Efectivo</b-form-radio
              >
              <b-form-radio v-model="selected" name="some-radios" value="B"
                >Mercado Pago</b-form-radio
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
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      foods: [
        { text: "Direcciones guardadas", value: null },
        "J.B Alberdi 244 - Ciudad - Mendoza cp:5000",
        "Beruti 2020 - Ciudad - Mendoza cp:5000",
        "Laboulaye 475 - Godoy Cruz - Mendoza CP:5000",
      ],
      show: true,
    };
  },

  computed: {
    ...mapGetters(["getCarrito"]),
    PrecioTotal() {
      return this.getCarrito.reduce(
        (suma, item) => suma + this.val(item.PrecioVenta),
        0
      );
    },
  },
  methods: {
    val(a) {
      console.log(a);
      if (a != null && a != undefined) return parseInt(a);
      if (a == null || a == undefined) return 0;
    },
    confirmarCarrito() {
      this.$router.push({
        name: "usuarioMercadoPago",
        params: { idPedido: 2 },
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