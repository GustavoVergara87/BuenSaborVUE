<template>
  <div>
    <div v-if="!plato">
      <b-spinner class="spinner" variant="primary" label="Spinning"></b-spinner>
    </div>
    <div v-if="plato">
      <h1>Ingredientes</h1>
      <table>
        <thead>
          <tr>
            <th>Denominación</th>
            <th>Cantidad</th>
            <th>Unidad de Medida</th>
            <th>Agregar/Quitar</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="ingrediente.id" v-for="ingrediente in plato.ingredientes">
            <td>{{ ingrediente.Denominacion }}</td>
            <td>{{ ingrediente.Cantidad }}</td>
            <td>{{ ingrediente.UnidadMedida }}</td>
            <td>Agregar o quitar</td>
          </tr>
          <tr>
            <td>
            <b-nav-item-dropdown class="m-md-2" text="Elija el ingrediente">
              <template  v-for="ingrediente in ingredientes">
              <b-dropdown-item :key="ingrediente.id">{{ingrediente.denominacion}}</b-dropdown-item>
              </template>
            </b-nav-item-dropdown>
          </td>
            <!-- <td>{{ ingrediente.Cantidad }}</td>
            <td>{{ ingrediente.UnidadMedida }}</td>
            <td>Agregar o quitar</td>  -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data(){
    return{
      ingredientes:[],
    }
  },
  computed: {
    ...mapGetters(["plato", "todosLosArticulos"]),
  },
  methods: {
    ...mapActions(["getPlato", "fetchTodosLosArticulos"]),
    articulosFiltrados() {
      console.log("patara");
      var tmpArticulosFiltrados = [];
      console.log(this.todosLosArticulos);
      tmpArticulosFiltrados = this.todosLosArticulos.filter(
        (articulo) => articulo.aLaVenta == false
      );
      console.log(tmpArticulosFiltrados);
      return tmpArticulosFiltrados;
    },
  },

  async created() {
    await this.getPlato(this.$route.params.idReceta);
    await this.fetchTodosLosArticulos();
 
   this.ingredientes= this.articulosFiltrados();
  },
};
</script>

<style scoped>
table {
  width: 100%;
}
</style>