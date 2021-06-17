<template>
  <div class="home">
    <div>
      <NavBarUsuario></NavBarUsuario>
      <b-jumbotron header="El Buen Sabor" lead="Comida">
        <p>Buena comida</p>
      </b-jumbotron>

    </div>
  </div>
</template>

<script>
import NavBarUsuario from "@/components/NavBarUsuario.vue";
export default {
  name: "Home",
  components: {
    NavBarUsuario
  },
  mounted() {
    // this.getPlatos();
  },
  data() {
    return {
      // platosData: []
    };
  },
  methods: {
    // async getPlatos() {
    //   const res = await fetch("/platos.json");
    //   const resJson = await res.json();
    //   console.log(resJson);
    //   this.platosData = resJson.platos;
    // }
  },
};
</script>
