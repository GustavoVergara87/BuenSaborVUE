import store from "../store/index"

export async function stockTotalParaArticulosManufacturados(id) {
    const response = await fetch("/api/articulos/stockTotalParaArticulosManufacturados/" + id, {
        headers: {
            'Authorization': 'Bearer ' + store.getters.traerToken
        }
    });
    const responseJson = await response.json();
    return responseJson
}

export async function stockTotalParaArticulosNoManufacturados(id) {
    const response = await fetch("/api/articulos/stockTotalParaArticulosNoManufacturados/" + id, {
        headers: {
            'Authorization': 'Bearer ' + store.getters.traerToken
        }
    });
    const responseJson = await response.json();
    return responseJson
}

export async function fetchTodosLosArticulos() {
    const response = await fetch("/api/Articulos", {
        headers: {
            'Authorization': 'Bearer ' + store.getters.traerToken
        }
    });
    const responseJson = await response.json();
    return responseJson
}

export async function fetchTodosLosPlatos() {
    const response = await fetch("/api/Articulos/ParaFront", {
        headers: {
            'Authorization': 'Bearer ' + store.getters.traerToken
        }
    }
    );
    const responseJson = await response.json();
    return responseJson
}

export async function getPlato(id) {
    const response = await fetch("/api/Articulos/ParaFront/" + id, {
        headers: {
            'Authorization': 'Bearer ' + store.getters.traerToken
        }
    }
    );
    const responseJson = await response.json();
    return responseJson
}



export async function getArticulo(id) {
    const response = await fetch("/api/Articulos/" + id, {
        headers: {
            'Authorization': 'Bearer ' + store.getters.traerToken
        }
    });
    const responseJson = await response.json();
    return responseJson
}

export default {
    stockTotalParaArticulosManufacturados,
    stockTotalParaArticulosNoManufacturados,
    fetchTodosLosArticulos,
    fetchTodosLosPlatos,
    getArticulo,
    getPlato
}