import store from "../store/index"

export async function addDomicilio(domicilio) {
    const response = await fetch("/api/Domicilios", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + store.getters.traerToken
        },
        body: JSON.stringify(domicilio),
    })
    //recibo domicilioNuevo
    const responseJson = await response.json();
    return responseJson
}

export async function editDomicilio(domicilio) {
    await fetch("/api/Domicilios/" + domicilio.id, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + store.getters.traerToken
        },
        body: JSON.stringify(domicilio),
    })
}

export default {
    addDomicilio,
}