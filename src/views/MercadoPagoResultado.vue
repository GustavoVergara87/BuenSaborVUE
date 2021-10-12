<template>
  <div class="div-centrar">
    <div class="sub-div-centrar">
      <h1 v-show="detalle.status == 'rejected'" class="resultado">
        Pago rechazado
      </h1>

      <h1 v-show="detalle.status == 'approved'" class="resultado">
        Pago aprobado
      </h1>

      <div class="circulo" @click="irAPlatos">
        <i class="fas fa-utensils platos"></i>
      </div>
    </div>
    <!-- Pedido Id: {{ detalle.external_reference }} -->
    <!-- collection_id=1240110439
    collection_status=approved
    payment_id=1240110439
    status=approved
    external_reference=null
    payment_type=credit_card
    merchant_order_id=3146642924
    preference_id=155784029-e4189a77-b71e-41bf-8a10-657b1976bb19
    site_id=MLA
    processing_mode=aggregator
    merchant_account_id=null -->
  </div>
</template>

<script>
import {
  deletePedido,
  editPedido,
  getPedido,
} from "../services/PedidosController";
import PE from "../services/PedidoEstados";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      PE: PE,
    };
  },
  computed: {
    detalle() {
      return this.$route.query;
    },
  },
  created() {
    //si se rechaza el pago, se borra el pedido
    if (this.$route.query.status == "rejected") {
      deletePedido(this.$route.query.external_reference).then((error) =>
        console.log(error)
      );
    }

    if (this.$route.query.status == "approved") {
      //Como la compra fue exitosa borrar el carrito
      this.resetCarrito();
      getPedido(this.$route.query.external_reference)
        //si se aprueba el pago, el pedido pasa a pendiente
        .then((pedido) => {
          pedido.Estado = PE.PENDIENTE;
          editPedido(pedido);
        });
    }
  },
  methods: {
    ...mapActions(["resetCarrito"]),
    irAPlatos() {
      this.$router.push({name: "ClientePlatos"})
    },
  },
};
</script>

<style scoped>
.div-centrar {
  display: flex;
  position: fixed;
  top: 0px;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.resultado {
  color: white;
  filter: drop-shadow(1px 1px 10px black);
}

.resultado {
  color: white;
  filter: drop-shadow(1px 1px 10px black);
}

.platos {
  font-size: 300%;
  background-color: #565656;
  color: transparent;
  text-shadow: 0px 2px 3px rgba(255, 255, 255, 0.5);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
}

.circulo {
  margin-top: 1em;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: white;
  filter: drop-shadow(1px 1px 10px black);
  width: 5em;
  height: 5em;
  cursor: pointer;
}

.sub-div-centrar {
  display: flex;
  flex-flow: column;
  /* position: fixed; */
  /* top: 0px; */
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100%;
  /* height: 100vh; */
}
</style>