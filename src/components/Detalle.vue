<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <b-img
          :src="'/images/' + plato.imagen"
          fluid-grow
          alt="Fluid-grow image"
        ></b-img>
        <br />
        <br />
        <p class="descripcion">Descripcion</p>
        <p class="descripcion">{{ plato.descripcion }}</p>
      </b-col>
      <b-col>
        <p class="vendidos">{{ plato.cantidadVendida }} vendidos</p>
        <h3>{{ plato.plato }}</h3>

        <p class="precio">${{ numFormat(plato.precio) }}</p>
        <span>Marca: {{ plato.marca }}</span>
        <br />
        <span>Modelo: {{ plato.modelo }}</span>
        <br />
        <br />
        <p>Costo envío</p>
        <p class="costoEnvioGratis" v-if="plato.costoEnvio === 'G'">
          <i class="fas fa-truck"></i> Envió gratis a todo el país
        </p>
        <p class="costoEnvio" v-else>
          Costo de Envio al interior de Argentina: ${{
            numFormat(plato.costoEnvio)
          }}
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Detalle",
  methods: {
    async fetchplato() {
      const idInst = this.$route.params.id;
      const resp = await fetch("https://localhost:44350/api/platos");
      const respJson = await resp.json();
      this.plato = respJson.find(item => item.id == idInst);
    },
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
  data() {
    return {
      plato: {},
    };
  },
  mounted() {
    this.fetchplato();
  },
};
</script>

<style>
.descripcion {
  font-family: Verdana, sans-serif;
  font-size: 80%;
  letter-spacing: 0px;
  word-spacing: 2px;
  color: #000000;
  font-weight: 400;
  text-decoration: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
}
.precio {
  font-family: Verdana, sans-serif;
  font-size: 30px;
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