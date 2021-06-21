<template>
  <div>
    Mapa con la direccion de entrega
    <b-button @click="settearPedidoEntregado(1)">Entregado</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    settearPedidoEntregado() {
      //settear el pedido como Entregado y volver a la lista de pedidos
      this.$router.push({ name: "DeliveryListaDePedidos" });
    },
  },
};
</script>

<style>
</style>