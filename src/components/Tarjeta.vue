<template>
  <div v-show="mostrar">
    <b-card tag="article" style="max-width: 20rem" class="mb-2">
      <b-card-title :title="plato.plato"></b-card-title>

      <router-link :to="/Detalleplato/ + plato.id">
        <b-card-img
          :src="articulosImageApiProxy + plato.Imagen"
          :alt="plato.Imagen"
          style="max-height: 500px"
        ></b-card-img>
      </router-link>

      <b-card-text>
        <p class="precio">${{ numFormat(plato.PrecioVenta) }}</p>
        <p>Descripcion: {{ plato.Descripcion }}</p>
        <template
          v-if="['Administrador', 'Cajero', 'Cocinero'].includes(traerRol)"
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

      <!-- --------------------------------------------Editar y Borrar -->
      <template
        v-if="['Administrador', 'Cajero', 'Cocinero'].includes(traerRol)"
      >
        <router-link :to="{name:'AdminEditarArticulo', params:plato.id}">
          <i class="fas fa-edit edit"></i>
        </router-link>
      </template>

      <template v-if="['Administrador'].includes(traerRol)">
        <i @click="Borrarplato" class="fas fa-trash-alt delete"></i>
      </template>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "tarjeta",
  data() {
    return {
      mostrar: true,
    };
  },
  props: ["plato"],
  computed: mapGetters([
    "traerRol",
    "articulosImageApiProxy",
  ]),
  methods: {
    ...mapActions(["deleteArticulo"]),
    numFormat(nStr) {
      nStr += "";
      var x = nStr.split(".");
      var x1 = x[0];
      var x2 = x.length > 1 ? "." + x[1] : "";
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "." + "$2");
      }
      return x1 + x2;
    },
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
  right: 0px;
  cursor: pointer;
  margin: 5%;
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
.vendidos {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 15px;
  letter-spacing: 0px;
  word-spacing: 2px;
  color: #000000;
  font-weight: 400;
  text-decoration: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
}
.costoEnvioGratis {
  font-family: Verdana, sans-serif;
  font-size: 12px;
  letter-spacing: 0px;
  word-spacing: 0px;
  color: #00d9ff;
  font-weight: 400;
  text-decoration: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
}
.costoEnvio {
  font-family: Verdana, sans-serif;
  font-size: 12px;
  letter-spacing: 0px;
  word-spacing: 0px;
  color: #ff9100;
  font-weight: 400;
  text-decoration: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
}
</style>