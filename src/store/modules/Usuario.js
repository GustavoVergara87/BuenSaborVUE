import servicio from "../../services/AutenticacionController";

const state = {
    rol: "",
    rolId:0,
    usuario: "",
    token: "",
    cliente: {
        id:"",
        nombre: "",
        apellido: "",
        telefono: "" ,
        // email: "",
        domicilios: []
    }
};

const getters = {
    traerRol: (state) => state.rol,
    traerRolId: (state) => state.rolId,
    traerUsuario: (state) => state.usuario,
    traerToken: (state) => state.token,
    traerCliente: (state) => state.cliente,
};


const actions = {
    resetUsuarios({ commit }) {
        commit('resetUsuarios')
    },
    setRol({ commit }, rol) {
        commit('setRol', rol)
    },
    setRolId({ commit }, rolId) {
        commit('setRolId', rolId)
    },
    setUsuario({ commit }, usuario) {
        commit('setUsuario', usuario)
    },
    setToken({ commit }, token) {
        commit('setToken', token)
    },

    async obtenerJwToken({ commit }, AuthRequest) {
        const responseJson = await servicio.obtenerJwToken(AuthRequest)
        commit('setRol', responseJson.rol);
        commit('setRolId', responseJson.rolId);
        commit('setUsuario', responseJson.nombreUsuario);
        commit('setToken', responseJson.token);
        commit('setCliente', responseJson.cliente);
        console.log(responseJson)
        return responseJson
    },

    async obtenerJwTokenConGoogle({ commit }, id_token) {
        const responseJson =await servicio.obtenerGoogleIdToken(id_token)
        commit('setRol', responseJson.rol);
        commit('setRolId', responseJson.rolId);
        commit('setUsuario', responseJson.nombreUsuario);
        commit('setToken', responseJson.token);
        commit('setCliente', responseJson.cliente);
        console.log(responseJson)
        return responseJson
    },


};


const mutations = {
    resetUsuarios: (state) =>{
        state.rol = "";
        state.rolId = 0;
        state.usuario = "";
        state.cliente.id = "";
        state.cliente.nombre = "";
        state.cliente.apellido = "";
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