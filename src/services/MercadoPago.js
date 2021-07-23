export async function GenerarTicketMercadoPagoPreference(precioTotal) {
    const response = await fetch(`/api/pedidos/${precioTotal}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const responseJson = await response.json();
    return responseJson
}

export default {
    GenerarTicketMercadoPagoPreference,
}