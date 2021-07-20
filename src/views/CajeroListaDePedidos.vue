<template>
  <div>
    <ul>
      <li :key="pedido.id" v-for="pedido in pedidos">
        <b-button @click="verDetallePedido(pedido.id)">Ver</b-button>
        Estado: {{ pedido.estado }}
        <b-button variant="success" @click="aprobarPedido(pedido.id)"
          >Aprobar</b-button
        >
        <b-button variant="danger" @click="cancelarPedido(pedido.id)"
          >Cancelar</b-button
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {pedidos: [],
  }},
  methods: {
    verDetallePedido(idPedido) {
      this.$router.push({
        name: "CajeroPedidoDetalle",
        params: { idPedido: idPedido },
      });
    },

   async aprobarPedido(idPedido){
 let res = await fetch(`https://localhost:44350/api/pedidos/${idPedido}`)
   let pedido =await res.json();
console.log(pedido)
pedido.estado++;
       await fetch(`https://localhost:44350/api/pedidos/${idPedido}`, {
       method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
   body: JSON.stringify(pedido),
        
    });
   },

   async cancelarPedido(idPedido){
 let res = await fetch(`https://localhost:44350/api/pedidos/${idPedido}`)
   let pedido =await res.json();
console.log(pedido)
pedido.estado = 4;
       await fetch(`https://localhost:44350/api/pedidos/${idPedido}`, {
       method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
   body: JSON.stringify(pedido),
        
    });


    }



    
  },
 async created(){
     let res = await fetch("/api/pedidos/");
         let todosPedidos =await res.json();
console.log(todosPedidos)
this.pedidos  = todosPedidos.filter(pedido => pedido.estado == 0)
  }
};
</script>

<style scoped>
</style>