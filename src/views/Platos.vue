<template>
  <div class="contenedor">
    <b-card-group deck>
      <template v-for="plato in platosFiltrados">
        <Tarjeta :plato="plato" :key="plato.id" />
      </template>
    </b-card-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Tarjeta from "@/components/Tarjeta.vue";
export default {
  props: [],
  computed: {
    ...mapGetters(["todosLosPlatos"]),
    platosFiltrados() {
      var tmpPlatosFiltrados = [];
      if (this.$route.query.porPalabraClave !== undefined) {
        tmpPlatosFiltrados = this.todosLosPlatos
          .filter(
            (plato) =>
              plato.Descripcion !== null &&
              plato.plato !== null &&
              plato.plato !== undefined
          )
          .filter((plato) =>
            plato.plato
              .toLowerCase()
              .includes(this.$route.query.porPalabraClave.toLowerCase())
          );
        return tmpPlatosFiltrados;
      }

      if (this.$route.query.porRubro !== undefined) {
        tmpPlatosFiltrados = this.todosLosPlatos
          .filter((plato) => plato.grupo !== null && plato.grupo !== undefined)
          .filter((plato) =>
            plato.grupo
              .toLowerCase()
              .includes(this.$route.query.porRubro.toLowerCase())
          );
        return tmpPlatosFiltrados;
      }

      return this.todosLosPlatos;
    },
  },
  components: { Tarjeta },
  methods: {
    ...mapActions(["fetchTodosLosPlatos"]), //los tres puntitos son para que ademas de las actions podamos poner otros metodos
  },
  async created() {
   await this.fetchTodosLosPlatos();
  },
};
</script>

<style scoped>
.contenedor {
  /* display: flex; */
  padding: 2em;
  /* flex-direction:column; */
  
}
</style>