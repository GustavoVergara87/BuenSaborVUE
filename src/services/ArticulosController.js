export async function stockTotalParaArticulosManufacturados(id){
    const response = await fetch("/api/articulos/stockTotalParaArticulosManufacturados/" + id);
    const responseJson = await response.json();
    return responseJson
}

export async function fetchTodosLosArticulos() {
    const response = await fetch("/api/Articulos");
    const responseJson = await response.json();
    return responseJson
}

export async function getArticulo(id) {
    const response = await fetch("/api/Articulos/" + id);
    const responseJson = await response.json();
    return responseJson
}

export async function addArticulo({ json, imagen }) {
    const articulo = json;
    const response = await fetch("/api/Articulos", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(articulo),
    });
    const responseJson = await response.json();

    //-----imagen-----
    if (imagen) {
        const formData = new FormData();
        formData.append("image", imagen);
        const response = await fetch(
            "/api/Articulos/UploadImage/" + responseJson.id,
            {
                method: "POST",
                body: formData,
            }
        );
        if (!response.ok) console.log("Error al enviar la imagen");
    }
    //-----imagen-----

    return responseJson
}

export async function deleteArticulo(id) {
    const articuloAborrar = await fetch("/api/Articulos/" + id);
    const articuloAborrarJson = await articuloAborrar.json();
    articuloAborrarJson.disabled = true;
    await fetch(`/api/Articulos/${id}`, { //disable el articulo del backEnd
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(articuloAborrarJson),
    });
}

export async function editArticulo({ json, imagen }) {
    const articuloEditado = json
    await fetch("/api/Articulos/" + articuloEditado.id, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(articuloEditado),
    });
    //-----imagen-----
    if (imagen) {
        const formData = new FormData();
        formData.append("image", imagen);
        const response = await fetch(
            "/api/Articulos/UploadImage/" + articuloEditado.id,
            {
                method: "POST",
                body: formData,
            }
        );
        if (!response.ok) console.log("Error al enviar la imagen");
    }
    //-----imagen-----
}

export default {
    fetchTodosLosArticulos,
    getArticulo,
    addArticulo,
    deleteArticulo,
    editArticulo,
}