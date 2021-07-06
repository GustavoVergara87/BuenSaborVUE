<template>
  <div v-show="mostrar">
    <b-card img-left>
      <i class="fas fa-times"></i>
      <table class="tablaTarjetaCarrito txtCol">
        <tr>
          <td class="imgCol">
            <b-img
              :src="'/image/' + plato.Imagen"
              width="70%"
              :alt="plato.Imagen"
              class="imagenTarjetaCarrito"
            ></b-img>
          </td>
          <td>
              <div class="dottedRow">
                <span class="dottedLeft">{{ plato.plato }}</span>
                <span class="dottedDots"></span>
                <span class="dottedRight"
                  >${{ numFormat(plato.PrecioVenta) }}</span
                >
              </div>
              <div class="dottedRow">
                <span class="precio dottedLeft">x{{ plato.cantidad }}</span>
                <span class="dottedDots"></span>
                <span class="precio dottedRight"
                  >${{ numFormat(plato.PrecioVenta * plato.cantidad) }}</span
                >
              </div>

          </td>
        </tr>
      </table>
      <i class="fas fa-plus-square"></i>
      <i class="fas fa-minus-square"></i>

      <!-- <span class="descripcionCarrito">{{ plato.Descripcion }}</span>  -->
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
  computed: mapGetters(["traerRol"]),
  methods: {
    ...mapActions(["deleteArticulo", "addCarrito"]),
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
    agregarAlCarrito() {},
  },
};
</script>

<style  scoped>

.botonQuitarCarrito {
  float: right;
  opacity: 50;
}

.imgCol {
  width: 50px;
}

.imagenTarjetaCarrito {
  padding: 0.25em;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 0.25rem;
}

i {
  font-size: 150%;
  position: relative;
  bottom: 0px;
  /* right: 0px; */
  float: right;
  cursor: pointer;
  margin: 5%;
}

.delete {
  color: rgb(211, 0, 0);
}

.tablaTarjetaCarrito {
  width: 98%;
}

.tituloTarjetaCarrito {
  font-family: Verdana, sans-serif;
  font-size: 90%;
  color: #000000;
  font-weight: 400;
}

.descripcionCarrito {
  font-size: 70%;
  color: #000000;
}

.precio {
  font-weight: 800;
}





</style>