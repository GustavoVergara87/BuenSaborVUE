import servicio from "../../services/RubrosArticulosController";

const state = {
    rubrosArticulos: [], //catalogo de todos los articulos, accesibles desde toda la aplicacion mediante el getter todoslosplatos
};

const getters = { //devuelven los estados
    todosLosRubrosArticulos: (state) => state.rubrosArticulos
};

//Las acciones llaman a las mutaciones(mutations) a traves de commits
const actions = {
    async fetchTodosLosRubrosArticulos({ commit }) {
        const responseJson = await servicio.fetchTodosLosRubrosArticulos()
        commit('setTodosLosRubrosArticulos', responseJson); //sintaxis commit("mutacion",variable)
    },

    async addRubroArticulo({ commit }, rubroArticulo) {
        const responseJson = await servicio.addRubroArticulo(rubroArticulo)
        commit('nuevoRubroArticulo', responseJson) //llama a la mutacion para que lo agregue al state 
    },

    async deleteRubroArticulo({ commit }, id) {
        await servicio.deleteRubroArticulo(id)
        commit('removerArticulo', id) //remueve el articulo del frontEnd
    },

    async editRubroArticulo({ commit }, rubroArticuloEditado) {
        await servicio.editRubroArticulo()
        commit('editarRubroArticulo', rubroArticuloEditado) //remueve el articulo del frontEnd
    }
};

//Las mutaciones(mutations) cambian los estados (states)
const mutations = {
    setTodosLosRubrosArticulos: (state, rubrosArticulos) => state.rubrosArticulos = rubrosArticulos,
    nuevoRubroArticulo: (state, rubroArticulo) => state.rubrosArticulos.unshift(rubroArticulo),
    removerRubroArticulo: (state, id) => state.rubrosArticulos = state.rubrosArticulos.filter(rubroArticulo => rubroArticulo.id !== id),
    editarRubroArticulo: (state, rubroArticuloEditado) => {
        const index = state.rubrosArticulos.findIndex(rubroArticulo => rubroArticulo.id == rubroArticuloEditado.id)
        if (index != -1) {
            state.rubrosArticulos.splice(index, 1, rubroArticuloEditado)
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}