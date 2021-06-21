<template>
  <div>
    <ul>
      <li>
        Pedido1<b-button @click="verDetallePedido(1)">Ver</b-button>
        Estado:Aprobado
      </li>
      <li>Pedido2<b-button>Ver</b-button> Estado:Aprobado</li>
      <li>Pedido3<b-button>Ver</b-button> Estado:Anulado</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    verDetallePedido(idPedido) {
      this.$router.push({
        name: "CajeroPedidoDetalle",
        params: { idPedido: idPedido },
      });
    },
  },
};
</script>

<style>
</style>