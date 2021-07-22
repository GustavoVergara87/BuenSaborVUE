export async function todosLosClientes() {
    const response = await fetch("/api/Clientes");
    const responseJson = await response.json();
    return responseJson
}

export async function getCliente(id) {
    const response = await fetch("/api/Clientes/" + id);
    const responseJson = await response.json();
    return responseJson
}

export default {
    todosLosClientes,
    getCliente,
  
}