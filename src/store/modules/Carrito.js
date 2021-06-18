const state = {
    carrito: [],
    detallesPedido: [] //articulos agrupados junto con la prop cantidad
};

const getters = {
    getCarrito: (state) => state.carrito,
    getDetallesPedido: (state) => state.detallesPedido,
};



const actions = {
    setCarrito({ commit }, carrito) {
        commit('setCarrito', carrito)
    },

    addCarrito({ commit }, articulo) {
        commit('addCarrito', articulo)
        let detallesPedido = []
        state.carrito.forEach(item => { item.cantidad = 1 })
        state.carrito.forEach(item => {
            var platoRepetido = detallesPedido.find(a => a.id == item.id)
            console.log(platoRepetido)
            if (!detallesPedido || !platoRepetido) {
                detallesPedido.push(item)
            } else if (platoRepetido) {
                platoRepetido.cantidad++
            }
        })
        console.log(detallesPedido)
        commit('setDetallesPedido', detallesPedido)
    },


};


const mutations = {
    setCarrito: (state, carrito) => state.carrito = carrito,
    addCarrito: (state, articulo) => state.carrito.push(articulo),
    setDetallesPedido: (state, detallesPedido) => state.detallesPedido = detallesPedido,
};

export default {
    state,
    getters,
    actions,
    mutations,
}


// groupBy = (array, key) => {
//     const result = {}
//     array.forEach(item => {
//         if (!result[item[key]]) {
//             result[item[key]] = []
//         }
//         result[item[key]].push(item)
//     })
//     return result
// }