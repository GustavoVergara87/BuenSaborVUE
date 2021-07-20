import store from "../store/index"

export async function enviarCarrito(domicilio, domicilioID, tipoEnvio) {

    const carrito = store.getters.getCarrito
    const cliente = store.getters.traerCliente

    if (domicilio) {
        //Creo un domicilio si es necesario
        //Envio domicilio
        domicilio.ClienteID = cliente.id;
        console.log(carrito)
        console.log(cliente)
        console.log(domicilio)

        const response = await fetch("/api/Domicilios", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(domicilio),
        })
        //recibo domicilioNuevo
        const domicilioNuevo = await response.json();
        domicilioID = domicilioNuevo.id
        console.log(domicilioNuevo)
    }

    //Creo un pedido
    const pedido = {
        "tipoEnvio": tipoEnvio,
        "ClienteID": cliente.id,
        "domicilioID": domicilioID,
    }
    //Envio pedido
    const response = await fetch("/api/Pedidos", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(pedido),
    });
    //recibo pedido completo
    const nuevoPedido = await response.json();
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
        const response = await fetch("/api/DetallesPedidos", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(detallePedido),
        });
        const nuevoDetallePedido = await response.json();
        console.log(nuevoDetallePedido)
    }
}