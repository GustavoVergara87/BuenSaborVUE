import store from "../store/index"

export async function GenerarTicketMercadoPagoPreference(preferencia) {
    const response = await fetch(`/api/Pedidos/MercadoPagoPreference`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + store.getters.traerToken
        },
        body: JSON.stringify(preferencia)
    });
    const responseJson = await response.json();
    return responseJson
}

export default {
    GenerarTicketMercadoPagoPreference,
}