<template>
  <div>
    <h1>{{ detalle.status == "rejected" ? "Pago rechazado" : "" }}</h1>
    <h1>{{ detalle.status == "approved" ? "Pago aprobado" : "" }}</h1>
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
    //si se aprueba el pago, el pedido pasa a pendiente
    if (this.$route.query.status == "approved") {
      getPedido(this.$route.query.external_reference).then((pedido) => {
        pedido.Estado = PE.PENDIENTE;
        editPedido(pedido)
      });
    }
  },
};
</script>

<style>
</style>