import Vue from "vue";

const state = {
    notificaciones: [],
};

const getters = {
    traerTodasLasNotificaciones: (state) => state.notificaciones,
};

const actions = {
    resetNotificaciones({ commit }) {
        commit('resetNotificaciones')
    },

    async addNotificacion({ commit },notificacion) {
        
        
        commit('addNotificacion',notificacion)
    },

    async deleteFromNotificaciones({ commit }, id) {
        commit('deleteFromNotificaciones', id)
    },
};

//Las mutaciones(mutations) cambian los estados (states)
const mutations = {
    resetNotificaciones: (state) =>{
        state.notificaciones.splice(0);
    },
    addNotificacion: (state, notificacion) =>{
        Vue.set(notificacion, 'id', Date.now())
        
        state.notificaciones.push(notificacion)
        //console.log(state.notificaciones)
    },
    deleteFromNotificaciones: (state, id) => state.notificaciones.splice(state.notificaciones.findIndex(a => a.id == id), 1),
};

export default {
    state,
    getters,
    actions,
    mutations,
}