<template>
  <b-card v-show="mostrar" tag="article" class="mb-2 tarjeta">
    <div class="plusOneContainer">
      <transition name="slide-fade">
        <div v-show="showPlusOne" class="plusOne">+1</div>
      </transition>
    </div>

    <b-card-title :title="plato.plato"></b-card-title>

    <router-link :to="{ name: 'DetallePlato', params: { id: plato.id } }">
      <b-card-img
        :src="'/image/' + plato.Imagen"
        :alt="plato.Imagen"
        style="min-height: 200px; max-height: 500px"
        loading="lazy"
        :class="imageState"
        @load="imagenCargada"
      ></b-card-img>
    </router-link>

    <b-card-text>
      <p class="precio">${{ numFormat(plato.PrecioVenta) }}</p>
      <p>{{ plato.Descripcion }}</p>
      <template v-if="['Cocinero'].includes(traerUsuario.rol)">
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

    <b-button
      @click="addCarrito(plato), (showPlusOne = !showPlusOne)"
      class="button"
      variant="success"
    >
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
      showPlusOne: false,
      imageState: "loading",
    };
  },
  props: ["plato"],
  computed: mapGetters(["traerUsuario"]),
  methods: {
    imagenCargada() {
      // console.log("imagenCargada");
      this.imageState = "loaded";
    },
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
.loading {
  background: transparent
    url("https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif") center
    no-repeat;
}

.loaded {
  animation: bounce 0.8s ease;
}

@keyframes bounce {
  0% {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
    20% {
    opacity: 1;
    transform: scale(1.1, 1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1, 1);
  }
}

/*Animacion de entrada y salida*/

.slide-fade-enter-active {
  animation: rise 0.3s ease;
}

.slide-fade-leave-active {
  animation: rise 0.3s ease;
}

@keyframes rise {
  0% {
    opacity: 0;
    transform: translateY(+1.5em);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-1.5em);
  }
}

/*Fin Animacion*/
.plusOneContainer {
  position: absolute;
  right: 1em;
  bottom: 2em;
  /* outline: 1px black solid; */
}

.plusOne {
  font-size: 150%;
  margin-right: 0%;
  opacity: 0;
}

i {
  font-size: 150%;
  position: relative;
  bottom: 0px;
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
  position: relative;
  min-width: 15rem;
  max-width: 20rem;
}

.button {
  position: absolute;
  right: 0.5em;
  bottom: 0.5em;
  font-size: 70%;
}
</style>