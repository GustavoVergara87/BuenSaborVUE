const state = {
    platos: [], //catalogo de todos los platos, accesibles desde toda la aplicacion mediante el getter todoslosplatos
};

const getters = {
    todosLosPlatos: (state) => state.platos
};

//Las acciones llaman a las mutaciones(mutations) a traves de commits
const actions = {
    async fetchTodosLosPlatos({ commit }) {
        const response = await fetch("/Articulos/ParaFront");
        const responseJson = await response.json();
        commit('setTodosLosPlatos', responseJson); //sintaxis commit("mutacion",variable)
    },
};

//Las mutaciones(mutations) cambian los estados (states)
const mutations = {
    setTodosLosPlatos: (state, platos) => state.platos = platos, //sintaxis mutacion(estado, variable)
};

export default {
    state,
    getters,
    actions,
    mutations,
}