const state = {
    rol: "",
};

const getters = {
    traerRol: (state) => state.rol,
};


const actions = {
    setRol({ commit }, rol) {
        commit('setRol', rol)
    },
};


const mutations = {
    setRol: (state, rol) => state.rol = rol,
};

export default {
    state,
    getters,
    actions,
    mutations,
}