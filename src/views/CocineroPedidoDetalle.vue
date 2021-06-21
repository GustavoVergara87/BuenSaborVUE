<template>
  <div>
    Detalle Pedido
    <ul>
      <li>
        plato1<b-button @click="setPlatoCocinado(1)">Cocinado</b-button>
        Estado:Cocinado
      </li>
      <li>plato2<b-button>Cocinado</b-button> Estado:En preparacion</li>
      <li>plato3<b-button>Cocinado</b-button> Estado:En preparacion</li>
    </ul>
    <b-button @click="setPedidoCocinado(1)">Todo Cocinado</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    setPlatoCocinado() {
      //settear el plato como cocinado. Cuando todos los platos estén cocinados,
      //el pedido está cocinado y vuelve a la lista de pedidos
    },
    setPedidoCocinado() {
      //settear el pedido completo como cocinado y volver a la lista de pedidos
      this.$router.push({ name: "CocineroListaDePedidos" });
    },
  },
};
</script>

<style>
</style>