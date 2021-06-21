<template>
  <div>
    <p>Ingresar API/formulario de MercadoPago</p>
    <b-button @click="AbonarMercadoPago">MercadoPagar</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    AbonarMercadoPago() {
      //Hacer algo con la Api de mercadoPago y volver a ver platos con algun mensaje
      //de  "Su pedido esta pendiente de aprobacion"
      alert("Su pedido esta pendiente de aprobacion");
      this.$router.push({ name: 'UsuarioPlatos' });
    },
  },
};
</script>

<style>
</style>