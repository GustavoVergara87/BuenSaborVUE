export async function fetchTodosLosPedidos() {
    const response = await fetch("/api/Pedidos");
    const responseJson = await response.json();
    return responseJson
}

export async function getPedido(id) {
    const response = await fetch("/api/Pedidos/" + id);
    const responseJson = await response.json();
    return responseJson
}

export async function addPedido(json) {
    const pedido = json;
    const response = await fetch("/api/Pedidos", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(pedido),
    });
    const responseJson = await response.json();
    return responseJson
}

export async function deletePedido(id) {
    const pedidoAborrar = await fetch("/api/Pedidos/" + id);
    const pedidoAborrarJson = await pedidoAborrar.json();
    pedidoAborrarJson.disabled = true;
    await fetch(`/api/Pedidos/${id}`, { //disable el pedido del backEnd
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(pedidoAborrarJson),
    });
}

export async function editPedido(pedidoEditado) {
    const responseJson = await fetch("/api/Pedidos/" + pedidoEditado.id, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(pedidoEditado),
    });

    if (responseJson.status == 409) {
        const error = await responseJson.text();
        throw error;
    }
}

export async function finalizarPedido(id) {
    const response = await fetch("/api/Pedidos/Finalizar/" + id, {
        method: "POST",
        // headers: { "Content-type": "application/json" },
    });
    const responseJson = await response.json();
    return responseJson
}

export default {
    fetchTodosLosPedidos,
    getPedido,
    addPedido,
    deletePedido,
    editPedido,
    finalizarPedido,
}