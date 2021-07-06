<template>
  <div>
    <div v-if="!plato">
      <b-spinner class="spinner" variant="primary" label="Spinning"></b-spinner>
    </div>
    <div v-if="plato">
      <b-container>
        <b-row>
          <b-col>
            <div style="padding: 10px">
              <br />
              <b-img
                class="imagen"
                rounded
                :src="'/image' + plato.Imagen"
                alt="Rounded image"
              ></b-img>
              <br /><br />
              <!-- <b-row>Descripción</b-row> -->
              <h5>Descripción</h5>
              {{ plato.Descripcion }}
            </div>
          </b-col>
          <b-col style="border-left: 1px solid; text-align: left">
            <br />
            <h2 style="font-weight: bold">{{ plato.plato }}</h2>
            <h1>$ {{ plato.PrecioVenta }}</h1>
            <br />

            <h5>TiempoEstimadoCocina</h5>
            <p>{{ plato.TiempoEstimadoCocina }} min</p>
            <br />

            <h5>Categoria</h5>
            <p>{{ plato.grupo }}</p>
            <br />

            <h5>Ingredientes</h5>
            <ul>
              <li
                v-for="ingrediente in plato.ingredientes"
                :key="ingrediente.id"
              >
                {{ ingrediente.Denominacion }}, {{ ingrediente.Cantidad }}
                {{ ingrediente.UnidadMedida }}
              </li>
            </ul>
          </b-col>
        </b-row>
        <br />
        <br />
        <br />
        <b-row style="text-align: center">
          <b-col>
            <!-- <router-link :to="['/']" > VOLVER</router-link> -->
            <b-button @click="$router.go(-1)">VOLVER</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {

  name: "DetallePlato",

  beforeDestroy() {
    this.$store.dispatch("deletePlatoTemporal");
  },

  created() {
    this.getPlato(this.$route.params.id);
  },

  computed: {
    ...mapGetters(["plato"]),
  },

  methods: {
    ...mapActions(["getPlato", "deletePlatoTemporal"]),
  },

};
</script>

<style scoped>
.imagen {
  height: 400px;
}



</style>