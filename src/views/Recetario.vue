<template>
  <div>
    <h1>Recetas Pendientes</h1>
      <template v-for="plato in platosFiltrados">
        <div :plato="plato" :key="plato.id" >
           <b-card  :style="{'background-color' :plato.Ingredientes.length==0 ?'red':'green'}">
                <b-card-title>{{plato.plato}}</b-card-title>

          <b-button @click="verDetallePedidoReceta(pedido.id)">Editar receta</b-button>
            </b-card>

        
        </div>
      </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  computed: {
    ...mapGetters(["todosLosPlatos"]),
    platosFiltrados() {
      var tmpPlatosFiltrados = [];

      tmpPlatosFiltrados = this.todosLosPlatos.filter(
        (plato) => plato.EsManufacturado == true
      );
console.log(tmpPlatosFiltrados)
      return tmpPlatosFiltrados;
    },
  },

  methods: {
    ...mapActions(["fetchTodosLosPlatos"]), //los tres puntitos son para que ademas de las actions podamos poner otros metodos
  },
  async created() {
    await this.fetchTodosLosPlatos();
   
  },
};
</script>

<style>
</style>