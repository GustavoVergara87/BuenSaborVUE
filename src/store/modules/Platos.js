const state = {
    platos: [], //catalogo de todos los platos, accesibles desde toda la aplicacion mediante el getter todoslosplatos
    plato: null
};

const getters = {
    todosLosPlatos: (state) => state.platos,
    plato: (state) => state.plato
};

//Las acciones llaman a las mutaciones(mutations) a traves de commits
const actions = {
    resetPlatos({ commit }) {
        commit('resetPlatos')
    },
    async fetchTodosLosPlatos({ commit }) {
        const response = await fetch("/api/Articulos/ParaFront");
        const responseJson = await response.json();
        commit('setTodosLosPlatos', responseJson); //sintaxis commit("mutacion",variable)
    },

    async getPlato({ commit }, id) {
        const response = await fetch("/api/Articulos/ParaFront/" + id);
        const responseJson = await response.json();
        commit('setPlato', responseJson); //sintaxis commit("mutacion",variable)
    },

    deletePlatoTemporal({ commit }) {
        commit('setPlato', null); //sintaxis commit("mutacion",variable)
    },
};

//Las mutaciones(mutations) cambian los estados (states)
const mutations = {
    resetPlatos: (state) =>{
        state.platos.splice(0);
        state.plato = null;
    },
    setTodosLosPlatos: (state, platos) => state.platos = platos, //sintaxis mutacion(estado, variable)
    setPlato: (state, plato) => state.plato = plato, //sintaxis mutacion(estado, variable)
};

export default {
    state,
    getters,
    actions,
    mutations,
}