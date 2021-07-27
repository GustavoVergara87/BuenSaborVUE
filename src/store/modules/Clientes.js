import servicio from "../../services/ClientesController";
import Vue from "vue";

const state = {
    clientes: [],
    cliente: {},
    cargandoClientes: {},
};


const getters = {
    todosLosClientes: (state) => state.clientes,
    cargandoClientes: (state) => state.cargandoClientes,
    elCliente: (state) => state.cliente,
};


const actions = {
    
    resetClientes({ commit }) {
        commit('resetClientes')
    },

    async fetchTodosLosClientes({ commit }) {

        const responseJson = await servicio.TodosLosClientes()
        commit('setTodosLosClientes', responseJson);
    },

    async getCliente({ commit }, id) {
        const responseJson = await servicio.getCliente(id);
        commit('setCliente', responseJson);
        return responseJson
    },

    async addCliente({ commit }, { json }) {
        const responseJson = await servicio.addCliente({ json });
        commit('nuevoCliente', responseJson)
    },

    async deleteCliente({ commit }, id) {
        await servicio.deleteCliente(id)
        commit('removerCliente', id)
    },

    async editCliente({ commit }, clienteEditado) {
        const id = clienteEditado.id
        commit('setCargando', { id: id, estado: true });
        // commit('setCargando', true);

        await servicio.editCliente(clienteEditado)
        commit('editarCliente', clienteEditado)

        commit('setCargando', { id: id, estado: false });
        // commit('setCargando', false);
    }
};

//Las mutaciones(mutations) cambian los estados (states)
const mutations = {
    resetClientes: (state) =>{
        state.clientes.splice(0);
        state.cliente = {};
        state.cargandoClientes = {};
    },
    setCliente: (state, cliente) => state.cliente = cliente,
    setCargando: (state, idEstado) =>{
        Vue.set(state.cargandoClientes, idEstado.id,idEstado.estado) 
        // state.cargandoClientes[idEstado.id] = idEstado.estado no funciona porque estamos agregando dinamicamente propiedades a un objeto. Para poder hacer eso y que sea reactivo, necesitamos usar la sentencia Vue.set()
    },
    // setCargando: (state, estado) => state.cargandoClientes = estado,
    setTodosLosClientes: (state, clientes) => state.clientes = clientes,
    nuevoCliente: (state, cliente) => state.clientes.unshift(cliente),
    removerCliente: (state, id) => state.cliente = state.clientes.filter(cliente => cliente.id !== id),
    editarCliente: (state, clienteEditado) => {
        const index = state.clientes.findIndex(cliente => cliente.id == clienteEditado.id)
        if (index != -1) {
            state.clientes.splice(index, 1, clienteEditado)
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}