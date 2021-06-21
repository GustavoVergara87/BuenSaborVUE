<template>
  <div>
    Detalle Pedido
    <b-button @click="aprobarPedido">Aprobar</b-button>
    <b-button @click="anularPedido">Anular</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    aprobarPedido() {
      //aprobar el pedido y volver a la lista de pedidos
      this.$router.push({ name: "CajeroListaDePedidos" });
    },
    anularPedido() {
      //anular el pedido y volver a la lista de pedidos
      this.$router.push({ name: "CajeroListaDePedidos" });
    },
  },
};
</script>

<style>
</style>