import store from "../store/index"

export async function addDetallePedido(detallePedido) {
    const response = await fetch("/api/DetallesPedidos", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + store.getters.traerToken
        },
        body: JSON.stringify(detallePedido),
    });
    const responseJson = await response.json();
    return responseJson
}

export async function editDetallePedido(detallePedidoEditado) {
    const responseJson = await fetch("/api/DetallesPedidos/" + detallePedidoEditado.id, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + store.getters.traerToken
        },
        body: JSON.stringify(detallePedidoEditado),
    });

    if (responseJson.status == 409) {
        const error = await responseJson.text();
        throw error;
    }
}


export default {
    addDetallePedido,
    editDetallePedido,
}