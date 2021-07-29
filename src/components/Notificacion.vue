<template>
  <div>
    <span>{{id}}</span>
    <div class="texto-centrado">
      <h4>{{ mensaje }}</h4>
    </div>
    <div class="texto-pedido">
      <span>Pedido: {{ pedido.id }}</span>
      <span>fecha: {{ pedido.fecha.slice(0,10) }}</span>
      <span>horaEstimadaFin: {{  pedido.horaEstimadaFin.slice(11,16) }}</span>
      <span>tipoEnvio: {{ pedido.tipoEnvio }}</span>
      <span>total: {{ pedido.total }}</span>
      <span>domicilioID: {{ pedido.domicilioID }}</span>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  props: ["id", "mensaje", "pedido"],
};
</script>

<style scoped>
.texto-centrado {
  text-align: center;
}

.texto-pedido > span {
  display: block;
}
</style>