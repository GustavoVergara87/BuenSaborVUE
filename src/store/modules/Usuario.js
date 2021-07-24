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

    async obtenerToken({ commit }, AuthRequest) {
        const response = await fetch("/api/Usuarios/Login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(AuthRequest),
        });
        const responseJson = await response.json();
        commit('setRol', responseJson.rol);
        commit('setRolId', responseJson.rolId);
        commit('setUsuario', responseJson.nombreUsuario);
        commit('setToken', responseJson.token);
        commit('setCliente', responseJson.cliente);
        return responseJson
    },
};


const mutations = {
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