<template>
  <div class="borde" v-show="mostrar">
    <div class="contenedorAumentarDisminuir outlined">
      <span
        class="btn button-text aumentarDisminuir"
        v-on:click="cantidadDisminuir(plato)"
        >-</span
      >
      <span class="cantidad">{{ plato.cantidad }}</span>
      <span
        class="btn button-text aumentarDisminuir"
        v-on:click="cantidadAumentar(plato)"
        >+</span
      >
    </div>

    <div class="contenedorImagen">
      <img
        :src="'/image/' + plato.Imagen"
        :alt="plato.Imagen"
        class="imagenTarjetaCarrito outlined"
        height="50em"
      />
    </div>

    <div class="tablaTarjetaCarrito outlined">
      <div class="textFloatLeft outlined">
        {{ plato.plato }}
      </div>

      <div class="textFloatRight outlined">
        ${{ numFormat(plato.PrecioVenta * plato.cantidad) }}
      </div>
    </div>

    <span
      class="eliminar btn button-text outlined"
      v-on:click="deleteFromCarrito(plato)"
      >x</span
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { numFormat } from "../services/Auxiliares";

export default {
  name: "tarjeta",
  data() {
    return {
      mostrar: true,
    };
  },
  props: ["plato"],
  computed: { ...mapGetters(["traerUsuario"]) },
  methods: {
    ...mapActions([
      "addCarrito",
      "cantidadAumentar",
      "cantidadDisminuir",
      "deleteFromCarrito",
    ]),
    numFormat,
  },
};
</script>

<style  scoped>
.contenedorImagen {
  /* flex-grow: 1; */
  display: flex;
  margin: auto;
  width: 5em;
  height: 3.2em;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin-left: 0.5em;
  margin-right: 0.5em;
}
.cantidad {
  font-size: 200%;
  width: 1.5em;
  text-align: center;
}


.textFloatLeft {
  order: 1;
  flex-grow: 1;
  margin: auto;
}

@media (max-width: 768px) {
  .contenedorImagen {
    display: none;
  }

  .cantidad {
    font-size: 150%;
  }


}

.borde {
  /* background: rgb(245, 245, 245); */
  background: white;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  /* color: rgba(255, 255, 255, 1)!important; */
  filter: drop-shadow(0px 0px 4px rgb(220, 220, 220, 0.5));
}



.textFloatRight {
  order: 2;
  margin: auto;
  margin-right: 1em;
  white-space: nowrap;
}

.botonQuitarCarrito {
  float: right;
  opacity: 50;
}

.contenedorAumentarDisminuir {
  display: flex;
  align-items: center;
  float: left;
  /* border: 1px solid lightgray; */
  background: rgb(252, 252, 252);
  border-radius: 0.5em;
}



.aumentarDisminuir {
  font-size: 150%;
  font-weight: 100;
}

.eliminar {
  position: absolute;
  font-size: 150%;
  transform: scaleY(0.75);
  font-weight: 100;
  right: 1em;
  line-height: 0%;
  margin-top: -0.5em;
  margin-right: -0.5em;

  height: 0.55em;
}

.button-text {
  color: gray;
  cursor: pointer;
  width: 1em;
  box-sizing: border-box;
  padding: 0.2em;
}
.button-text:hover {
  color: black;
  font-weight: 400;
  /* background-color: lightgray; */
}

.tablaTarjetaCarrito {
  display: inline-block;
  width: calc(100% - 9em) !important;
  display: flex;
  height: 3em;
}

.descripcionCarrito {
  font-size: 70%;
  color: #000000;
}
</style>