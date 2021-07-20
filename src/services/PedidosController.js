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

export async function editPedido(json) {
    const pedidoEditado = json
    await fetch("/api/Pedidos/" + pedidoEditado.id, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(pedidoEditado),
    });
}

export default {
    fetchTodosLosPedidos,
    getPedido,
    addPedido,
    deletePedido,
    editPedido,
}