import store from "../store/index"

export async function addDetalleReceta(detalleReceta) {
    const response = await fetch("/api/DetallesRecetas", {
        method: "POST",
        headers: { "Content-type": "application/json",
        'Authorization': 'Bearer ' + store.getters.traerToken },
        body: JSON.stringify(detalleReceta),
    });
    const responseJson = await response.json();
    return responseJson
}

export async function deleteDetalleReceta(id) {

    const detalleABorrar = await fetch("/api/DetallesRecetas/" + id);
    const detalleABorrarJson = await detalleABorrar.json();

    detalleABorrarJson.disabled = true;
    
    await fetch(`/api/DetallesRecetas/${id}`, { //disable el articulo del backEnd
        method: "PUT",
        headers: { "Content-type": "application/json",
        'Authorization': 'Bearer ' + store.getters.traerToken },
        body: JSON.stringify(detalleABorrarJson),
    });

    // await fetch(`/api/DetallesRecetas/${id}`, { //disable el articulo del backEnd
    //     method: "DELETE",
    //     headers: { "Content-type": "application/json" },

    // });
}


export default {
    addDetalleReceta,
    deleteDetalleReceta,
}