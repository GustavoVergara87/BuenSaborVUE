const state = {
    articulos: [], //catalogo de todos los articulos, accesibles desde toda la aplicacion mediante el getter todoslosplatos
    articulo: {},
};

const getters = { //devuelven los estados
    todosLosArticulos: (state) => state.articulos,
    elArticulo: (state) => state.articulo,
};

//Las acciones llaman a las mutaciones(mutations) a traves de commits
const actions = {

    async fetchTodosLosArticulos({ commit }) {
        const response = await fetch("/api/Articulos");
        const responseJson = await response.json();
        commit('setTodosLosArticulos', responseJson); //sintaxis commit("mutacion",variable)
    },

    async getArticulo({ commit }, id) {
        const response = await fetch("/api/Articulos/" + id);
        const responseJson = await response.json();
        commit('setArticulo', responseJson); //sintaxis commit("mutacion",variable)
        return responseJson
    },

    async addArticulo({ commit }, { json, imagen }) {

        const articulo = json;
        const response = await fetch("/api/Articulos", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(articulo),
        });
        const responseJson = await response.json();
        commit('nuevoArticulo', responseJson) //llama a la mutacion para que lo agregue al state 

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
    },

    async deleteArticulo({ commit }, id) {
        const articuloAborrar = await fetch("/api/Articulos/" + id);
        const articuloAborrarJson = await articuloAborrar.json();
        articuloAborrarJson.disabled = true;
        await fetch(`/api/Articulos/${id}`, { //disable el articulo del backEnd
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(articuloAborrarJson),
        });
        commit('removerArticulo', id) //remueve el articulo del frontEnd
    },

    async editArticulo({ commit }, { json, imagen }) {

        const articuloEditado = json
        console.log(json)
        await fetch("/api/Articulos/" + articuloEditado.id, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(articuloEditado),
        });
        commit('editarArticulo', articuloEditado) //remueve el articulo del frontEnd

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
};

//Las mutaciones(mutations) cambian los estados (states)
const mutations = {
    setArticulo: (state, articulo) => state.articulo = articulo,
    setTodosLosArticulos: (state, articulos) => state.articulos = articulos,
    nuevoArticulo: (state, articulo) => state.articulos.unshift(articulo),
    removerArticulo: (state, id) => state.articulos = state.articulos.filter(articulo => articulo.id !== id),
    editarArticulo: (state, articuloEditado) => {
        const index = state.articulos.find(articulo => articulo.id == articuloEditado.id)
        if (index != -1) {
            state.articulos.splice(index, 1, articuloEditado)
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}