<template>
  <div>
    <div v-if="!plato">
      <b-spinner class="spinner" variant="primary" label="Spinning"></b-spinner>
    </div>
    <div v-if="plato">
      <div class="derecha">
        <b-button id="goBackButton" @click="$router.go(-1)"
          ><i class="fas fa-arrow-left"></i
        ></b-button>
      </div>
      <b-container>
        <b-row>
          <b-col sm="auto">
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
              <div v-if="plato.Descripcion">
                <!-- <h5>Descripción</h5> -->
                {{ plato.Descripcion }}
              </div>
            </div>
          </b-col>
          <b-col class="col-derecha" style="text-align: left">
            <div style="padding: 10px">
              <br />
              <h2 style="font-weight: bold">{{ plato.plato }}</h2>
              <h1>$ {{ plato.PrecioVenta }}</h1>
              <br />

              <div v-if="plato.TiempoEstimadoCocina">
                <h5>Tiempo estimado en cocina</h5>
                <p>{{ plato.TiempoEstimadoCocina }} min</p>
                <br />
              </div>
              <h5>Categoria</h5>
              <p>{{ plato.grupo }}</p>
              <br />

              <div v-if="plato.ingredientes.length != 0">
                <h5>Ingredientes</h5>
                <ul>
                  <li
                    v-for="ingrediente in plato.ingredientes"
                    :key="ingrediente.id"
                  >
                    {{ ingrediente.denominacion }}, {{ ingrediente.cantidad }}
                    {{ ingrediente.unidadMedida }}
                  </li>
                </ul>
              </div>
            </div>
          </b-col>
        </b-row>
        <br />
        <br />
        <br />
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
.col-derecha {
  border-left: 1px solid;
}

@media (max-width: 991px) {
  .col-derecha {
    border-left: 0px solid;
  }
}

#goBackButton {
  width: 5em;
  opacity: 70%;
  background-color: darkgoldenrod;
  border: 0px;
}

.imagen {
  max-width: 100%;
  max-height: 500px;
}
.derecha {
  margin-top: 1em;
  margin-bottom: 1em;
  margin-right: 1em;
  /* float: right; */
  text-align: right;
  /* outline: 1px solid red; */
}
</style>