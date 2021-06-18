const state = {
    rubrosArticulos: [], //catalogo de todos los articulos, accesibles desde toda la aplicacion mediante el getter todoslosplatos
};

const getters = { //devuelven los estados
    todosLosRubrosArticulos: (state) => state.rubrosArticulos
};

//Las acciones llaman a las mutaciones(mutations) a traves de commits
const actions = {

    async fetchTodosLosRubrosArticulos({ commit }) {
        const response = await fetch("/api/RubrosArticulos");
        const responseJson = await response.json();
        commit('setTodosLosRubrosArticulos', responseJson); //sintaxis commit("mutacion",variable)
    },

    async addRubroArticulo({ commit }, rubroArticulo) {
        const response = await fetch(`/api/RubrosArticulos`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(rubroArticulo),
        });
        const responseJson = await response.json();
        commit('nuevoRubroArticulo', responseJson) //llama a la mutacion para que lo agregue al state 
    },

    async deleteRubroArticulo({ commit }, id) {
        const rubroArticuloAborrar = await fetch(`/api/RubrosArticulos/${id}`);
        const rubroArticuloAborrarJson = await rubroArticuloAborrar.json();
        rubroArticuloAborrarJson.disabled = true;
        await fetch(`/api/RubrosArticulos/${id}`, { //disable el articulo del backEnd
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(rubroArticuloAborrarJson),
        });
        commit('removerArticulo', id) //remueve el articulo del frontEnd
    },

    async editRubroArticulo({ commit }, rubroArticuloEditado) {
        await fetch(`/api/Articulos/${rubroArticuloEditado.id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(rubroArticuloEditado),
        });
        commit('editarRubroArticulo', rubroArticuloEditado) //remueve el articulo del frontEnd
    }
};

//Las mutaciones(mutations) cambian los estados (states)
const mutations = {
    setTodosLosRubrosArticulos: (state, rubrosArticulos) => state.rubrosArticulos = rubrosArticulos, 
    nuevoRubroArticulo: (state, rubroArticulo) => state.rubrosArticulos.unshift(rubroArticulo), 
    removerRubroArticulo: (state, id) => state.rubrosArticulos = state.rubrosArticulos.filter(rubroArticulo => rubroArticulo.id !== id),
    editarRubroArticulo: (state, rubroArticuloEditado) => {
        const index = state.rubrosArticulos.find(rubroArticulo => rubroArticulo.id == rubroArticuloEditado.id)
        if (index != -1) {
            state.rubrosArticulos.splice(index, 1, rubroArticuloEditado)
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}