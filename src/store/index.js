import Vue from "vue";
import Vuex from "vuex";
import Globales from "./modules/Globales"
import Platos from "./modules/Platos"
import ArticulosController from "./modules/ArticulosController"
import RubrosArticulosController from "./modules/RubrosArticulosController"
import Carrito from "./modules/Carrito"
Vue.use(Vuex);

//Crea un store
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {Globales,Platos,ArticulosController,RubrosArticulosController,Carrito}
});
