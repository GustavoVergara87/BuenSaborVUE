import store from "../store/index"

export async function getFacturas() {
    const response = await fetch("/api/facturas", {
        method: "GET",
        headers: { "Content-type": "application/json",
        'Authorization': 'Bearer ' + store.getters.traerToken },
    });
    const responseJson = await response.json();
    return responseJson
}

export async function getFactura(id) {
    const response = await fetch("/api/facturas/" + id, {
        headers: {
            'Authorization': 'Bearer ' + store.getters.traerToken
        }
    });
    const responseJson = await response.json();

    responseJson.disabled = true;
    return responseJson
}


export default {
    getFactura,
    getFacturas,
}