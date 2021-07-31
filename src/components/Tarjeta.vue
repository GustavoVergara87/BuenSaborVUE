<template>
  <b-card
    v-show="mostrar"
    tag="article"
    style="position: relativie; min-width: 15rem; max-width: 20rem"
    class="mb-2 tarjeta"
  >
    <b-card-title :title="plato.plato"></b-card-title>

    <router-link :to="{ name: 'DetallePlato', params: { id: plato.id } }">
      <b-card-img
        :src="'/image/' + plato.Imagen"
        :alt="plato.Imagen"
        style="max-height: 500px"
      ></b-card-img>
    </router-link>

    <b-card-text>
      <p class="precio">${{ numFormat(plato.PrecioVenta) }}</p>
      <p>{{ plato.Descripcion }}</p>
      <template
        v-if="['Cocinero'].includes(traerUsuario.rol)"
      >
        <p>Ingredientes:</p>
        <ul>
          <li v-for="ingrediente in plato.Ingredientes" :key="ingrediente.id">
            {{ ingrediente.Denominacion }}, {{ ingrediente.Cantidad }}
            {{ ingrediente.UnidadMedida }}
          </li>
        </ul>
      </template>
    </b-card-text>
    <!-- --------------------------------------------AddToCarrito -->

    <b-button @click="addCarrito(plato)" class="button" variant="success">
      <i class="fas fa-shopping-cart addToCarrito"></i>
    </b-button>

    <!-- --------------------------------------------Editar y Borrar -->
    <template v-if="['Cocinero'].includes(traerUsuario.rol)">
      <router-link
        :to="
            traerUsuario.rol == 'Cocinero'
            ? { name: 'CocineroEditarArticulo', params: { id: plato.id } }
            : {}
        "
      >
        <i class="fas fa-edit edit"></i>
      </router-link>
    </template>
    
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { numFormat } from "../services/Auxiliares.js";
export default {
  name: "tarjeta",
  data() {
    return {
      mostrar: true,
    };
  },
  props: ["plato"],
  computed: mapGetters(["traerUsuario"]),
  methods: {
    ...mapActions(["deleteArticulo", "addCarrito"]),
    numFormat,
    async Borrarplato() {
      //this.$router.push("/Productos"); //no refresca la pagina, no recarga la tarjeta
      //this.$router.go(0); //refrescar la pagina es una forma poco elegante de recargar la tarjeta
      this.deleteArticulo(this.plato.id);
      this.mostrar = false;
      this.$emit("tarjeta-borrada");
    },
  },
};
</script>

<style  scoped>
i {
  font-size: 150%;
  position: relative;
  bottom: 0px;
  /* right: 0px; */
  float: right;
  cursor: pointer;
  margin: 5%;
}
.addToCarrito {
  color: rgb(255, 255, 255);
  opacity: 90%;
}
.edit {
  color: rgb(0, 204, 211);
}
.delete {
  color: rgb(211, 0, 0);
}
.precio {
  font-family: Verdana, sans-serif;
  font-size: 20px;
  letter-spacing: 0px;
  word-spacing: 2px;
  color: #000000;
  font-weight: 800;
  text-decoration: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
}

.tarjeta {
  filter: drop-shadow(0px 0px 8px #dfb6a6);
}

.button {
  position: absolute;
  right: 0.5em;
  bottom: 0.5em;
  font-size: 70%;
}
</style>