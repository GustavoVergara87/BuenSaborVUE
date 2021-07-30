<template>
<div>
  <div v-if="elPedido.detallesPedido[0].cocinado === undefined">
  comunismo
  </div>
    <div v-else>
     <h1>
      Detalle Pedido
    
    </h1>
  
    <ul>
      <li :key="detalle.index" v-for="detalle in elPedido.detallesPedido" >
        
        <div class="elemento" :style="{'background-color' : detalle.cocinado}">
        <p>
          {{detalle.cantidad}}
          </p>  
      <p>{{detalle.articulo.denominacion}}
        </p>   <b-button @click="setPlatoCocinado()">Cocinado</b-button>
      
        </div>
        
      </li>
     
    </ul>
    <b-button @click="setPedidoCocinado(1)">Todo Cocinado</b-button>
  </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    computed: {
    ...mapGetters(["elPedido"]),
  },
  methods: {
    ...mapActions([
      "fetchTodosLosPedidos",
      "editPedido",
      "getPedido",
      "getCliente",
    ]),

    setPlatoCocinado() {
      this.elementoListo = "#3ade5b";
    },
    setPedidoCocinado() {
      //settear el pedido completo como cocinado y volver a la lista de pedidos
      this.$router.push({ name: "CocineroListaDePedidos" });
    },
  },
  async created() {
    await this.getPedido(this.$route.params.idPedido);

    this.elPedido.detallesPedido.forEach((detalle) => {
      detalle.cocinado = false;
      console.log(detalle.cocinado);
    });

    console.log(this.elPedido.detallesPedido[0].cocinado)
  },
};
</script>

<style scoped>
p {
  font-size: 30px;
  font-weight: 500;
  padding: 10px;
}
.elemento {
  padding: 15px;
  background-color: rgb(63, 216, 63);
  border: 1px solid black;
  width: 25%;
}
</style>