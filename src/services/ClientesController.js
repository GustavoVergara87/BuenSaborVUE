import store from "../store/index"

export async function todosLosClientes() {
    const response = await fetch("/api/Clientes", {
        headers: {
            'Authorization': 'Bearer ' + store.getters.traerToken
        }
    });
    const responseJson = await response.json();
    return responseJson
}

export async function getCliente(id) {
    const response = await fetch("/api/Clientes/" + id, {
        headers: {
            'Authorization': 'Bearer ' + store.getters.traerToken
        }
    });
    const responseJson = await response.json();
    return responseJson
}
export async function editCliente(cliente) {
    const response = await fetch("/api/Clientes/" + cliente.Id, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + store.getters.traerToken
        },
        body: JSON.stringify(cliente),
    });

    if (response.status == 400) {
        alert("Error cliente no encontrado")
        // console.log(await response.text())
        return await response.text()
    }

    return null
}

export async function addCliente(cliente) {
    const response = await fetch("/api/Clientes", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + store.getters.traerToken
        },
        body: JSON.stringify(cliente),
    });
    const responseJson = await response.json();
    return responseJson
}

export default {
    todosLosClientes,
    getCliente,
    addCliente,
}