<template>
  <div class="noti">
    <div class="texto-centrado">
      <h4>{{ mensaje }}</h4>
    </div>
    <div class="texto-pedido">
      <span>Pedido: {{ pedido.id }}</span>
      <span>fecha: {{ pedido.fecha.slice(0, 10) }}</span>
      <span>horaEstimadaFin: {{ pedido.horaEstimadaFin.slice(11, 16) }}</span>
      <span>tipoEnvio: {{ pedido.tipoEnvio }}</span>
      <span>total: {{ pedido.total }}</span>
      <span>domicilioID: {{ pedido.domicilioID }}</span>
    </div>
    <hr />
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
.noti {
  background-color: white;
  margin-bottom: 1em;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.3);
  padding: 1em;
}
</style>