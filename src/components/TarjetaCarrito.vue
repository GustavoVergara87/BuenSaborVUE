<template>
  <div class="borde" v-show="mostrar">
    <div class="contenedorAumentarDisminuir outlined">
      <span class="btn aumentarDisminuir" v-on:click="cantidadDisminuir(plato)"
        >-</span
      >
      <span class="cantidad">{{ plato.cantidad }}</span>
      <span class="btn aumentarDisminuir" v-on:click="cantidadAumentar(plato)"
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

    <span class="tachito outlined" v-on:click="deleteFromCarrito(plato)"
      >x</span
    >
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
  computed: { ...mapGetters(["traerRol"]) },
  methods: {
    ...mapActions([
      "addCarrito",
      "cantidadAumentar",
      "cantidadDisminuir",
      "deleteFromCarrito",
    ]),

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

.borde {
  /* background: rgb(245, 245, 245); */
  background: white;
  padding: 1em;
  display: flex;
  /* color: rgba(255, 255, 255, 1)!important; */
  filter: drop-shadow(0px 0px 4px rgb(220, 220, 220, 0.5));
}

.textFloatLeft {
  order: 1;
  flex-grow: 1;
  margin: auto;
}
.textFloatRight {
  order: 2;
  margin: auto;
  margin-right: 1em;
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

.cantidad {
  font-size: 200%;
  width: 1.5em;
  text-align: center;
}

.aumentarDisminuir {
  font-size: 150%;
  font-weight: 100;
}

.tachito {
  font-size: 150%;
  transform: scaleY(0.75);
  font-weight: 100;
  color: lightgray;
  float: right;
  line-height: 0%;
  margin-top: -0.5em;
  margin-right: -0.5em;
  cursor: pointer;
  height: 0.55em;
}

.tachito:hover {
  color: black;
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