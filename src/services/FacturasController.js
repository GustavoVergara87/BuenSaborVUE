export async function getFacturas() {
    const response = await fetch("/api/facturas", {
        method: "GET",
        headers: { "Content-type": "application/json" },
    });
    const responseJson = await response.json();
    return responseJson
}

export async function getFactura(id) {
    const response = await fetch("/api/facturas/" + id);
    const responseJson = await response.json();

    responseJson.disabled = true;
    return responseJson
}


export default {
    getFactura,
    getFacturas,
}