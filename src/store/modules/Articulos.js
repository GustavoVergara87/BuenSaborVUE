import servicio from "../../services/ArticulosController";

const state = {
    articulos: [],
    articulo: {},
};

const getters = {
    todosLosArticulos: (state) => state.articulos,
    elArticulo: (state) => state.articulo,
};

const actions = {
    resetArticulos({ commit }) {
        commit('resetArticulos')
    },
    async fetchTodosLosArticulos({ commit }) {
        const responseJson = await servicio.fetchTodosLosArticulos()
        commit('setTodosLosArticulos', responseJson);
    },

    async getArticulo({ commit }, id) {
        const responseJson = await servicio.getArticulo(id);
        commit('setArticulo', responseJson);
        return responseJson
    },

    async addArticulo({ commit }, { json, imagen }) {
        const responseJson = await servicio.addArticulo({ json, imagen });
        commit('nuevoArticulo', responseJson)
    },

    async deleteArticulo({ commit }, id) {
        await servicio.deleteArticulo(id)
        commit('removerArticulo', id)
    },

    async editArticulo({ commit }, { json, imagen }) {
        await servicio.editArticulo({ json, imagen })
        commit('editarArticulo', json)
    }
};

//Las mutaciones(mutations) cambian los estados (states)
const mutations = {
    resetArticulos: (state) =>{
        state.articulos.splice(0);
        state.articulo = {};
    },
    setArticulo: (state, articulo) => state.articulo = articulo,
    setTodosLosArticulos: (state, articulos) => state.articulos = articulos,
    nuevoArticulo: (state, articulo) => state.articulos.unshift(articulo),
    removerArticulo: (state, id) => state.articulos = state.articulos.filter(articulo => articulo.id !== id),
    editarArticulo: (state, articuloEditado) => {
        const index = state.articulos.findIndex(articulo => articulo.id == articuloEditado.id)
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