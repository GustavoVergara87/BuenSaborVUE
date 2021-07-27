import Vue from "vue";

const state = {
    carrito: [], //conjunto de "detallePedido", articulos agrupados junto con la prop cantidad
};

const getters = {
    getCarrito: (state) => state.carrito,
    getCarritoCantidad: (state) => state.carrito.reduce((acumulador, currentObject) => {
        return acumulador + currentObject.cantidad
    }, 0)
};

const actions = {
    resetCarrito({ commit }) {
        commit('resetCarrito')
    },

    setCarrito({ commit }, carrito) {
        commit('setCarrito', carrito)
    },

    addCarrito({ commit }, articulo) {
        var platoRepetido = state.carrito.filter(a => a.id == articulo.id)
        if (state.carrito.length==0 || platoRepetido.length==0) { //si el carrito esta vacio o no hay plato repetido, agregar el item
            // articulo.cantidad  la propiedad dinamicamente agregada .cantidad NO es reactiva
            Vue.set(articulo, 'cantidad', 1) //Si se agrega dinamicamente una propiedad a un objeto, debe hacerse de esta forma para ser reactivo
            commit('addCarrito', articulo)
        } else if (platoRepetido.length>0) { //si el plato esta repetido, aumentar el contador
            commit('cantidadAumentar', articulo)
        }
    },

    cantidadAumentar({ commit }, articulo) {
        commit('cantidadAumentar', articulo)
    },

    cantidadDisminuir({ commit }, articulo) {
        if (articulo.cantidad > 1) {
            commit('cantidadDisminuir', articulo)
        }
    },

    deleteFromCarrito({ commit }, articulo) {
        commit('deleteFromCarrito', articulo)
    },
};


const mutations = {
    resetCarrito: (state) => state.carrito.splice(0), //Vue.set(state.carrito, 'length', 0), // state.carrito.length = 0, //tienen problemas de reactividad
    addCarrito: (state, articulo) => state.carrito.push(articulo),
    cantidadAumentar: (state, articulo) => state.carrito.find(a => a.id == articulo.id).cantidad++,
    cantidadDisminuir: (state, articulo) => state.carrito.find(a => a.id == articulo.id).cantidad--,
    deleteFromCarrito: (state, articulo) => state.carrito.splice(state.carrito.findIndex(a => a.id == articulo.id), 1),
};

export default {
    state,
    getters,
    actions,
    mutations,
}

