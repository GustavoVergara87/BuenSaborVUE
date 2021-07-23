export async function addDomicilio(domicilio) {
    const response = await fetch("/api/Domicilios", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(domicilio),
    })
    //recibo domicilioNuevo
    const responseJson = await response.json();
    return responseJson
}

export default {
    addDomicilio,
}