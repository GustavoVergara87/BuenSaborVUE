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
          <tr
            :key="ingrediente.id"
            v-for="ingrediente in this.plato.ingredientes"
          >
            <td>{{ ingrediente.denominacion }}</td>
            <td>{{ ingrediente.cantidad }}</td>
            <td>{{ ingrediente.unidadMedida }}</td>
            <td @click="quitarIngrediente(ingrediente.detalleRecetasId)">
              <i class="fas fa-times"></i>
            </td>
          </tr>
          <tr>
            <td>
              <label for="cars">Elija un ingrediente</label>
              <select
                class="m-md-2"
                v-model="ingredienteSeleccionado"
                text="Elija el ingrediente"
                @change="cambiarUnidadMedida()"
              >
                <template v-for="ingrediente in ingredientes">
                  <option
                    :key="ingrediente.id"
                    :value="ingrediente.denominacion"
                  >
                    {{ ingrediente.denominacion }}
                  </option>
                </template>
              </select>
            </td>
            <td>
              <input
                v-model="cantidadIngrediente"
                placeholder="ingrese la cantidad"
              />
            </td>
            <td>{{ cambiarUnidadMedida() }}</td>
            <td @click="agregarIngrediente()"><i class="fas fa-check"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import {
  addDetalleReceta,
  deleteDetalleReceta,
} from "../services/RecetaController";
export default {
  data() {
    return {
      ingredientes: [],
      ingredienteSeleccionado: String,
      cantidadIngrediente: 0,
    };
  },
  computed: {
    ...mapGetters(["plato", "todosLosArticulos"]),
  },

  methods: {
    ...mapActions(["getPlato", "fetchTodosLosArticulos"]),
    ...mapMutations(["setPlato"]),
    articulosFiltrados() {
      var tmpArticulosFiltrados = [];
      tmpArticulosFiltrados = this.todosLosArticulos.filter(
        (articulo) => articulo.aLaVenta == false
      );
      let arrayElementos = this.plato.ingredientes.map(
        (ingrediente) => ingrediente.denominacion
      );

      let filtradosFinal = tmpArticulosFiltrados.filter(
        (articulo) => !arrayElementos.includes(articulo.denominacion)
      );

      return filtradosFinal;
    },
    cambiarUnidadMedida() {
      let ingrediente = this.ingredientes.filter(
        (ingrediente) =>
          ingrediente.denominacion == this.ingredienteSeleccionado
      );
      if (ingrediente != "") {
        return ingrediente[0].unidadMedida;
      }

      return "";
    },
    agregarIngrediente() {
      let ingrediente = this.ingredientes.filter(
        (ingrediente) =>
          ingrediente.denominacion == this.ingredienteSeleccionado
      );

      // let platoActual = JSON.parse(JSON.stringify(this.plato));

      let detalleReceta = {
        ArticuloID: ingrediente[0].id,
        Cantidad: this.cantidadIngrediente,
        // denominacion: ingrediente[0].denominacion,
        RecetaID: this.plato.RecetaId,
        // unidadmedida: ingrediente[0].unidadMedida,
      };
      console.log(this.plato);
      // platoActual.ingredientes.push(detalleReceta);
      addDetalleReceta(detalleReceta);
      // this.setPlato(platoActual);

      // console.log(this.plato.ingredientes[0]);
    },
    quitarIngrediente(detalleRecetaId) {
      console.log(detalleRecetaId);
      deleteDetalleReceta(detalleRecetaId);
    },
  },
  async created() {
    await this.getPlato(this.$route.params.idReceta);
    await this.fetchTodosLosArticulos();

    this.ingredientes = this.articulosFiltrados();
  },
};
</script>

<style scoped>
table {
  width: 100%;
}
input {
  border: solid 1px black;
}
.fa-times {
  color: red;
  margin: 0 33%;
}
.fa-check {
  color: rgb(23, 240, 3);
  margin: 0 33%;
}
</style>