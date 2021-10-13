<template>
  <div>
    <div v-if="!plato">
      <b-spinner class="spinner" variant="primary" label="Spinning"></b-spinner>
    </div>
    <div v-if="plato">
      <h1>{{ plato.plato }}</h1>
      <h3>Ingredientes</h3>
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
              <!-- {{ ingrediente.detalleRecetasId }} -->
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
                <template v-for="ingrediente in articulosFiltrados()">
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
                type="number"
                v-model="cantidadIngrediente"
                placeholder="ingrese la cantidad"
                min="1"
              />
            </td>
            <td>{{ cambiarUnidadMedida() }}</td>
            <td @click="agregarIngrediente()"><i class="fas fa-check"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="volver()">Volver</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  addDetalleReceta,
  deleteDetalleReceta,
} from "../services/RecetaController";
export default {
  data() {
    return {
      ingredientes: [],
      ingredienteSeleccionado: String,
      cantidadIngrediente: "",
    };
  },
  computed: {
    ...mapGetters(["plato", "todosLosArticulos"]),
  },

  methods: {
    ...mapActions(["getPlato", "fetchTodosLosArticulos", "setPlato"]),

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

    async agregarIngrediente() {
      let ingrediente = this.ingredientes.filter(
        (ingrediente) =>
          ingrediente.denominacion == this.ingredienteSeleccionado
      );

      let platoActual = JSON.parse(JSON.stringify(this.plato));

      let detalleReceta = {
        ArticuloID: ingrediente[0].id,
        Cantidad: this.cantidadIngrediente,
        RecetaID: this.plato.RecetaId,
      };

      let detalleRecetaFront = {
        articuloID: this.plato.id,
        cantidad: this.cantidadIngrediente,
        denominacion: ingrediente[0].denominacion,
        detalleRecetasId: "",
        insumoID: ingrediente[0].id,
        unidadMedida: ingrediente[0].unidadMedida,
      };

      // console.log(this.plato);

      const responseJson = await addDetalleReceta(detalleReceta);
      detalleRecetaFront.detalleRecetasId = responseJson.id;
      platoActual.ingredientes.push(detalleRecetaFront);
      await this.setPlato(platoActual);
      this.cantidadIngrediente = "";
      this.ingredienteSeleccionado = "";
      this.articulosFiltrados();
    },

    async quitarIngrediente(detalleRecetaId) {
      let platoActual = JSON.parse(JSON.stringify(this.plato));

      platoActual.ingredientes = platoActual.ingredientes.filter(
        (ingrediente) => ingrediente.detalleRecetasId != detalleRecetaId
      
      );

      await this.setPlato(platoActual);
      await deleteDetalleReceta(detalleRecetaId);
      this.articulosFiltrados();
     
    },

    volver() {
      this.$router.push({ name: "Recetario" });
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
button {
  float: right;
  margin-right: 10%;
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