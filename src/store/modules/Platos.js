import servicio from "../../services/ArticulosController";

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
    async resetPlatos({ commit }) {
        commit('resetPlatos')
    },

    async fetchTodosLosPlatos({ commit }) {
        const responseJson = await servicio.fetchTodosLosPlatos()
        commit('setTodosLosPlatos', responseJson); //sintaxis commit("mutacion",variable)
    },

    async getPlato({ commit }, id) {
        const responseJson = await servicio.getPlato(id)
        commit('setPlato', responseJson); //sintaxis commit("mutacion",variable)
    },

    // deletePlatoTemporal({ commit }) {
    //     commit('setPlato', null); //sintaxis commit("mutacion",variable)
    // },

    async setPlato({ commit }, plato) {
        commit('setPlato', plato); //sintaxis commit("mutacion",variable)
    }
};

//Las mutaciones(mutations) cambian los estados (states)
const mutations = {
    resetPlatos: (state) => {
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