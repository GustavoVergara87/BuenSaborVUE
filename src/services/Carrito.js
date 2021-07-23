import store from "../store/index"
// import {addDomicilio} from "./DomiciliosController"
import { addPedido, finalizarPedido } from "./PedidosController"
import { addDetallePedido } from "./DetallesPedidosController"

export async function enviarCarrito(domicilioID, tipoEnvio) {

    const carrito = store.getters.getCarrito
    const cliente = store.getters.traerCliente

    //Creo un pedido
    const pedido = {
        "tipoEnvio": tipoEnvio,
        "ClienteID": cliente.id,
        "domicilioID": domicilioID,
    }

    //envio pedido y lo recibo completo con el id nuevo
    const nuevoPedido = await addPedido(pedido);

    console.log(nuevoPedido)

    //Recorro el carrito y creo pedidos
    for (let index = 0; index < carrito.length; index++) {
        const c = carrito[index];

        //creo detalles de pedido y los vinculo al pedido recien creado
        const detallePedido = {
            "cantidad": c.cantidad,
            "pedidoID": nuevoPedido.id,
            "articuloID": c.id,
        }
        //Envio DetallePedido
        const nuevoDetallePedido = await addDetallePedido(detallePedido);
        console.log(nuevoDetallePedido)
    }

    //Finalizo el pedido (no se van a agregar mas detallePedido)
    const pedidoTerminado = await finalizarPedido(nuevoPedido.id);
    console.log(pedidoTerminado)
}