import servicio from "../../services/PedidosController";
import Vue from "vue";

const state = {
    pedidos: [],
    pedido: {},
    cargando: {},
};

const getters = {
    todosLosPedidos: (state) => state.pedidos,
    cargando: (state) => state.cargando,
    elPedido: (state) => state.pedido,
};

const actions = {
    resetPedidos({ commit }) {
        commit('resetPedidos')
    },
    async fetchTodosLosPedidos({ commit }) {

        const responseJson = await servicio.fetchTodosLosPedidos()
        commit('setTodosLosPedidos', responseJson);
    },

    async getPedido({ commit }, id) {
        const responseJson = await servicio.getPedido(id);
        commit('setPedido', responseJson);
        return responseJson
    },

    async addPedido({ commit }, { json }) {
        const responseJson = await servicio.addPedido({ json });
        commit('nuevoPedido', responseJson)
    },

    async deletePedido({ commit }, id) {
        await servicio.deletePedido(id)
        commit('removerPedido', id)
    },

    async editPedido({ commit }, pedidoEditado) {
        const id = pedidoEditado.id
        commit('setCargando', { id: id, estado: true });
        // commit('setCargando', true);

        await servicio.editPedido(pedidoEditado)
        commit('editarPedido', pedidoEditado)

        commit('setCargando', { id: id, estado: false });
        // commit('setCargando', false);
    }
};

//Las mutaciones(mutations) cambian los estados (states)
const mutations = {
    resetPedidos: (state) => {
        state.pedidos.splice(0);
        state.pedido = {};
        state.cargando = {};
    },
    setPedido: (state, pedido) => state.pedido = pedido,
    setCargando: (state, idEstado) => {
        Vue.set(state.cargando, idEstado.id, idEstado.estado)
        // state.cargando[idEstado.id] = idEstado.estado no funciona porque estamos agregando dinamicamente propiedades a un objeto. Para poder hacer eso y que sea reactivo, necesitamos usar la sentencia Vue.set()
    },
    // setCargando: (state, estado) => state.cargando = estado,
    setTodosLosPedidos: (state, pedidos) => state.pedidos = pedidos,
    nuevoPedido: (state, pedido) => state.pedidos.unshift(pedido),
    removerPedido: (state, id) => state.pedidos = state.pedidos.filter(pedido => pedido.id !== id),
    editarPedido: (state, pedidoEditado) => {
        const index = state.pedidos.findIndex(pedido => pedido.id == pedidoEditado.id)
        if (index != -1) {
            state.pedidos.splice(index, 1, pedidoEditado)
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}