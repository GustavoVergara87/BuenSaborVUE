export async function fetchTodosLosRubrosArticulos() {
    const response = await fetch("/api/RubrosArticulos");
    const responseJson = await response.json();
    return responseJson
}

export async function addRubroArticulo(rubroArticulo){
    const response =  await fetch(`/api/RubrosArticulos`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(rubroArticulo),
    });
    const responseJson = await response.json();
    return responseJson
}

export async function deleteRubroArticulo(id){
    const rubroArticuloAborrar = await fetch(`/api/RubrosArticulos/${id}`);
    const rubroArticuloAborrarJson = await rubroArticuloAborrar.json();
    rubroArticuloAborrarJson.disabled = true;
    await fetch(`/api/RubrosArticulos/${id}`, { //disable el articulo del backEnd
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(rubroArticuloAborrarJson),
    });
}

export async function editRubroArticulo(rubroArticuloEditado) {
    await fetch(`/api/Articulos/${rubroArticuloEditado.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(rubroArticuloEditado),
    });
}

export default {
    fetchTodosLosRubrosArticulos,
    addRubroArticulo,
    deleteRubroArticulo,
    editRubroArticulo,
}