<template>
     <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <div style="padding: 10px">
            <img
              style="height: 400px"
              :src=" platoEncontrado.imagen"
            />
            <b-row>Descripción</b-row>
            <b-row>{{ platoEncontrado.descripcion }}</b-row>
          </div>
        </b-col>
        <b-col style="border-left: 1px solid; text-align: left;">
       
           
              <h2  style="font-weight: bold;">{{ platoEncontrado.plato }}</h2>
              <h1>$ {{ platoEncontrado.precio }}</h1>
              <br />
            
             
            </b-col>
          </b-row>
          <br />
          <br />
          <br />
          <b-row style="text-align: center">
            <b-col> 
              
              <router-link :to="['/']" > VOLVER</router-link>
               
              ></b-col
            >
          </b-row>
   
     
    </b-container>
  </div>

</template>
<script>
export default {
  name: "DetallePlato",
  mounted() {
    this.getPlato();
  },
  data() {
    return {
      platoEncontrado: [],
    };
  },
  methods: {
    async getPlato() {
      const parametroId = this.$route.params.id;
      const res = await fetch(
        `http://localhost:44350/api/Articulos/ParaFront/${parametroId}`
      );
      const resJson = await res.json();
      this.platoEncontrado = resJson[0];
    },
  },
};
</script>