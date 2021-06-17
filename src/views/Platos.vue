<template>
  <div class="contenedor">
    <template v-for="plato in platosFiltrados">
      <Tarjeta :plato="plato" :key="plato.id" />
    </template>
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
      this.todosLosPlatos.forEach((element) => {
        if (
          (element.Descripcion &&
            element.Descripcion.toLowerCase().includes(
              this.$route.query.porPalabraClave.toLowerCase()
            )) ||
          (element.plato &&
            element.plato
              .toLowerCase()
              .includes(this.$route.query.porPalabraClave.toLowerCase()))
        ) {
          tmpPlatosFiltrados.push(element);
        }
      });
      return tmpPlatosFiltrados;
    },
  },

  components: { Tarjeta },

  methods: {
    ...mapActions(["fetchTodosLosPlatos"]), //los tres puntitos son para que ademas de las actions podamos poner otros metodos
  },

  created() {
    this.fetchTodosLosPlatos();
  },
  
};
</script>

<style scoped>
.contenedor {
  padding: 1em;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 1em;
}
</style>