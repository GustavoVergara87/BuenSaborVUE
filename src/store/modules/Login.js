import servicio from "../../services/AutenticacionController";

const state = {
    usuario: {
        nombreUsuario: "",
        rol: "",
        rolID: 0,
    },
    cliente: {
        id: 0,
        nombre: "",
        apellido: "",
        telefono: "",
        domicilios: []
    },
    token: "",
    googleLogin:false,
};

const getters = {
    traerUsuario: (state) => state.usuario,
    traerToken: (state) => state.token,
    traerCliente: (state) => state.cliente,
    traerGoogleLogin: (state) => state.googleLogin,
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
    setGoogleLogin({ commit }, GoogleLogin) {
        commit('setGoogleLogin', GoogleLogin)
    },
    setCliente({ commit }, cliente) {
        commit('setCliente', cliente)
    },
    setClienteManteniendoDomicilio({ commit }, cliente) {
        commit('setClienteManteniendoDomicilio', cliente)
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
        return responseJson
    },

    async addDomicilio({ commit }, domicilio) {
        commit('addDomicilio', domicilio);
    },

    async editDomicilio({ commit }, domicilioEditado) {
        //Si NO hago una copia del domicilioEditado, queda vinculado el domicilio en Vuex...cuando modifico 
        //el domicilio en el formulario, automaticamente se modifica en vuex, y causa key duplicados, etc
        const domicilioEditadoCopy = JSON.parse(JSON.stringify(domicilioEditado))
        commit('editDomicilio', domicilioEditadoCopy);
    }

};


const mutations = {
    resetUsuario: (state) => {
        state.usuario.nombreUsuario = "";
        state.usuario.rol = "";
        state.usuario.rolID = 0;
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
    setGoogleLogin: (state, googleLogin) => state.googleLogin = googleLogin,
    setClienteManteniendoDomicilio: (state, cliente) => {
        state.cliente.id = cliente.id
        state.cliente.nombre = cliente.nombre
        state.cliente.apellido = cliente.apellido
        state.cliente.telefono = cliente.telefono
    },
    setToken: (state, token) => state.token = token,
    addDomicilio: (state, domicilio) => state.cliente.domicilios.unshift(domicilio),
    editDomicilio: (state, domicilioEditado) => {
        // console.log("domicilios pre mutacion",state.cliente.domicilios)
        const index = state.cliente.domicilios.findIndex(domicilio => domicilio.id == domicilioEditado.id)
        if (index != -1) {
            state.cliente.domicilios.splice(index, 1, domicilioEditado)
        }
        // console.log("domicilios pos mutacion",state.cliente.domicilios)
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}