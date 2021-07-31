<template>
  <div class="home">
    <div>
      <NavBarCliente></NavBarCliente>
      <b-jumbotron header="El Buen Sabor" lead="Comida">
        <p>Buena comida</p>
      </b-jumbotron>

    </div>
  </div>
</template>

<script>
import NavBarCliente from "@/components/NavBarCliente.vue";
export default {
  name: "Home",
  components: {
    NavBarCliente
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
    
  },
};
</script>
