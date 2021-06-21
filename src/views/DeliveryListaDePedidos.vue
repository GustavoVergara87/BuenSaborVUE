<template>
  <div>
    <ul>
      <li>
        Pedido1<b-button @click="settearPedidoEntregado(1)">Ver</b-button>
        Estado:A repartir
      </li>
      <li>Pedido2<b-button>Ver</b-button> Estado:Entregado</li>
      <li>Pedido3<b-button>Ver</b-button> Estado:Entregado</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    settearPedidoEntregado(idPedido) {
      this.$router.push({
        name: "DeliveryPedidoDetalle",
        params: { idPedido: idPedido },
      });
    },
  },
};
</script>

<style>
</style>