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
    
  },
};
</script>
