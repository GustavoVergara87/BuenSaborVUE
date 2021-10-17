<template>
  <div class="contenedor">
    <template v-for="plato in getCarrito">
      <TarjetaCarrito class="mt-2" :plato="plato" :key="plato.id" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TarjetaCarrito from "./TarjetaCarrito.vue";

export default {
  props: [],
  computed: {
    ...mapGetters(["getCarrito"]),
  },
  components: { TarjetaCarrito },
  methods: {},
  created() {},
};
</script>

<style scoped>
.contenedor {
  border: 1px;
  margin-top: 1em;
  /* height: calc(95vh - 150px); */
  /* height: calc(95vh - 150px); */
  /* overflow-y: scroll; */
  overflow-y: auto;
}

/* @media (max-width: 686px) {
  .contenedor {
  height: 100%;
} */
/* } */

@media (min-width: 848px) {
  .contenedor {
  height: calc(95vh - 150px);
}
}

</style>