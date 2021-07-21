<template>
  <div>
    <h3>

    Detalle Pedido
    </h3>
            <b-row>
                 <b-col sm="2"> Id: </b-col>
          <b-col>{{ elPedido.id }}</b-col>
        </b-row>
               <b-row>
                 <b-col sm="2"> Cliente: </b-col>
          <b-col>{{ elPedido.cliente }}</b-col>
        </b-row>
               <b-row>
                 <b-col sm="2"> Detalles del Pedido: </b-col>
          <b-col>{{ elPedido.detallesPedido }}</b-col>
        </b-row>
               <b-row>
                 <b-col sm="2"> Domicilio: </b-col>
          <b-col>{{ elPedido.domicilio }}</b-col>
        </b-row>
               <b-row>
                 <b-col sm="2"> Estado: </b-col>
          <b-col>{{ elPedido.estado }}</b-col>
        </b-row>
               <b-row>
                 <b-col sm="2"> Fecha: </b-col>
          <b-col>{{ elPedido.fecha}}</b-col>
        </b-row>
               <b-row>
                 <b-col sm="2"> Hora Estimada: </b-col>
          <b-col>{{ elPedido.horaEstimadaFin }}</b-col>
        </b-row>
                       <b-row>
                 <b-col sm="2"> Tipo Envio: </b-col>
          <b-col>{{ elPedido.tipoEnvio }}</b-col>
        </b-row>
            <b-row>
                 <b-col sm="2"> Total </b-col>
          <b-col>{{ elPedido.total }}</b-col>
        </b-row>
    <div v-if="elPedido.estado == 0">
        <b-button variant="success" @click="aprobarPedido(elPedido.id)">Aprobar</b-button>
    <b-button variant="danger" @click="cancelarPedido(elPedido.id)">Cancelar</b-button>
    </div>
    <div v-if="elPedido.estado == 1 || elPedido.estado == 4 ">
        <b-button  variant="success" @click="retornarPedidoPendiente(elPedido.id)">Retornar a Pendientes</b-button>
 
    </div>
  
   <b-button  href="/cajero/ListaDePedidos">Volver</b-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {

    ...mapGetters(["elPedido"]),
  },

   

  methods: { 
    ...mapActions(["fetchTodosLosPedidos", "editPedido", "getPedido"]),

     async aprobarPedido(idPedido) {

      const pedido = await this.getPedido(idPedido);
   
      pedido.estado = 1;

    
      this.editPedido(pedido);
    },

    async cancelarPedido(idPedido) {
     
      const pedido = await this.getPedido(idPedido);

     
      pedido.estado = 4;

    
      this.editPedido(pedido);
    },
  async retornarPedidoPendiente(idPedido) {
     
      const pedido = await this.getPedido(idPedido);

     
      pedido.estado = 0;

    
      this.editPedido(pedido);
    },
    // aprobarPedido() {
    //   //aprobar el pedido y volver a la lista de pedidos
    //   this.$router.push({ name: "CajeroListaDePedidos" });
    // },
    // anularPedido() {
    //   //anular el pedido y volver a la lista de pedidos
    //   this.$router.push({ name: "CajeroListaDePedidos" });
    // },
  },

  async created() {
   await this.getPedido(this.$route.params.idPedido);

  },


};
</script>

<style>
</style>