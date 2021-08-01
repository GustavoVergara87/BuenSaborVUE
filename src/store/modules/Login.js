import servicio from "../../services/AutenticacionController";

const state = {
    usuario: {
        nombreUsuario: "",
        rol: "",
        rolId: 0,
    },
    cliente: {
        id: 0,
        nombre: "",
        apellido: "",
        telefono: "",
        domicilios: []
    },
    token: "",
};

const getters = {
    traerUsuario: (state) => state.usuario,
    traerToken: (state) => state.token,
    traerCliente: (state) => state.cliente,
};


const actions = {
    resetUsuario({ commit }) {
        commit('resetUsuario')
    },
    resetCliente({ commit }) {
        commit('resetCliente')
    },
    resetToken({ commit }) {
        commit('resetToken')
    },
    setCliente({ commit }, cliente) {
        commit('setRol', cliente)
    },
    setUsuario({ commit }, usuario) {
        commit('setUsuario', usuario)
    },
    setToken({ commit }, token) {
        commit('setToken', token)
    },

    async obtenerJwToken({ commit }, AuthRequest) {
        const responseJson = await servicio.obtenerJwToken(AuthRequest)
        if (responseJson == null) return null

        commit('setUsuario', responseJson.usuario);
        commit('setCliente', responseJson.cliente);
        commit('setToken', responseJson.token);

        return responseJson
    },

    async obtenerJwTokenConGoogle({ commit }, id_token) {
        const responseJson = await servicio.obtenerGoogleIdToken(id_token)
        commit('setUsuario', responseJson.usuario);
        commit('setCliente', responseJson.cliente);
        commit('setToken', responseJson.token);
        // console.log(responseJson)
        return responseJson
    },


};


const mutations = {
    resetUsuario: (state) => {
        state.usuario.nombreUsuario = "";
        state.usuario.rol = "";
        state.usuario.rolId = 0;
    },
    resetCliente: (state) => {
        state.cliente.id = 0;
        state.cliente.nombre = "";
        state.cliente.apellido = "";
        if (state.cliente.domicilios != null) {
            state.cliente.domicilios.splice(0);
        }
    },
    resetToken: (state) => {
        state.token = "";
    },
    setUsuario: (state, usuario) => state.usuario = usuario,
    setCliente: (state, cliente) => state.cliente = cliente,
    setToken: (state, token) => state.token = token,
};

export default {
    state,
    getters,
    actions,
    mutations,
}