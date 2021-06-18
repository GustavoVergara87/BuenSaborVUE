<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <PlatosCarrito></PlatosCarrito>
      </b-col>
      <b-col>
        <h3>Resumen</h3>
        <h3>Total: {{ PrecioTotal }}</h3>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import PlatosCarrito from "../components/PlatosCarrito.vue";

export default {
  components: { PlatosCarrito },
  computed: {
    ...mapGetters(["getCarrito"]),
    PrecioTotal() {
      return this.getCarrito.reduce(
        (suma, item) => suma + this.val(item.PrecioVenta)
      );
    },
  },
  methods: {
    val(a) {
      if (a!=null && a!= undefined) return parseInt(a);
    },
  },
};
</script>


<style  scoped>
</style>