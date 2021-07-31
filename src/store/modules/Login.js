import servicio from "../../services/AutenticacionController";

const state = {
    usuario: {
        nombreUsuario: "",
        rol: "",
        rolId: 0,
    },
    cliente: {
        id: "",
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
    resetUsuarios({ commit }) {
        commit('resetUsuarios')
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
    resetUsuarios: (state) => {

        state.usuario.nombreUsuario = "";
        state.usuario.rol = "";
        state.usuario.rolId = 0;
        // state.cliente={}; //check reactivity
        state.cliente.id = "";
        state.cliente.nombre = "";
        state.cliente.apellido = "";
        // state.cliente.domicilios=[]; //check reactivity
        state.cliente.domicilios.splice(0);
    },
    setRol: (state, rol) => state.rol = rol,
    setRolId: (state, rolId) => state.rolId = rolId,
    setUsuario: (state, usuario) => state.usuario = usuario,
    setToken: (state, token) => state.token = token,
    setCliente: (state, cliente) => state.cliente = cliente,
};

export default {
    state,
    getters,
    actions,
    mutations,
}