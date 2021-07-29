import Vue from "vue";
import Vuex from "vuex";
import Usuario from "./modules/Usuario"
import Platos from "./modules/Platos"
import Articulos from "./modules/Articulos"
import Pedidos from "./modules/Pedidos"
import Clientes from "./modules/Clientes"
import RubrosArticulos from "./modules/RubrosArticulos"
import Carrito from "./modules/Carrito"
import Notificaciones from "./modules/Notificaciones"
import VuexPersistence from "vuex-persist";


Vue.use(Vuex);

//Crea un store
const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { Usuario, Platos, Articulos, Pedidos, RubrosArticulos, Carrito, Clientes, Notificaciones },
  plugins: [
    new VuexPersistence({
      storage: window.sessionStorage //.localStorage guarda los vuex "Para siempre" Sesion storage hasta que se cierre la ventana
    }).plugin
  ]
});



export default store