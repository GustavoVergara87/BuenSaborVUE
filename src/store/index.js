import Vue from "vue";
import Vuex from "vuex";
import Usuario from "./modules/Usuario"
import Platos from "./modules/Platos"
import Articulos from "./modules/Articulos"
import Pedidos from "./modules/Pedidos"
import RubrosArticulos from "./modules/RubrosArticulos"
import Carrito from "./modules/Carrito"
Vue.use(Vuex);

//Crea un store
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {Usuario,Platos,Articulos,Pedidos,RubrosArticulos,Carrito}
});
