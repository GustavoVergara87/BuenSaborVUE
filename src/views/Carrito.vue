<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <PlatosCarrito></PlatosCarrito>
      </b-col>
      <b-col>
        <h5>Resumen</h5>
        <h6>Total: {{ PrecioTotal }}</h6>
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
        (suma, item) => suma + this.val(item.PrecioVenta),0
      );
    },
  },
  methods: {
    val(a) {
        console.log(a)
      if (a!=null && a!= undefined) return parseInt(a);
      if (a==null || a== undefined) return 0;
    },
  },
};
</script>


<style  scoped>
</style>