export async function addDetallePedido(detallePedido) {
    const response = await fetch("/api/DetallesPedidos", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(detallePedido),
    });
    const responseJson = await response.json();
    return responseJson
}


export default {
    addDetallePedido,
}