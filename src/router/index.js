import Vue from "vue";
import VueRouter from "vue-router";
import Store from '../store/index'

Vue.use(VueRouter);


const routes = [

  //----------------------------------------------------------------------USUARIO
  {
    path: "/cliente",
    name: "cliente",
    beforeEnter: (to, from, next) => {
      const rolesAutorizados = ["Cliente", "Cajero", "Cocinero", ""]
      const usuario = Store.getters['traerUsuario']
      const rol = usuario.rol
      if (rolesAutorizados.includes(rol)) next()
      else next(false)
    },
    component: () => import("../views/UsuarioNav.vue"),

    children: [
      {
        path: "/cliente/Platos",
        name: "ClientePlatos",
        component: () => import("../views/Platos.vue"),
      },

      {
        path: "/cliente/Carrito",
        name: "Carrito",
        component: () => import("../views/Carrito.vue"),
      },
      {
        path: "/cliente/Carrito/aprobado",
        name: "pagoAprobado",
        component: () => import("../views/MercadoPagoResultado.vue"),
      },
      {
        path: "/cliente/DetallePlato/:id",
        name: "DetallePlato",
        component: () => import("../views/PlatoDetalle.vue"),
      },
      {
        path: "/cliente/Cuenta",
        name: "ClienteCuenta",
        component: () => import("../views/ClienteCuenta.vue"),
      },
      {
        path: "/cliente/Factura/:id",
        name: "ClienteFactura",
        component: () => import("../views/ClienteFactura.vue"),
      },

    ]
  },

  //---------------------------------------------------------------------------CAJERO
  {
    path: "/cajero",
    name: "cajero",
    beforeEnter: (to, from, next) => {
      const rolesAutorizados = ["Administrador", "Cajero"]
      const usuario = Store.getters['traerUsuario']
      const rol = usuario.rol
      if (rolesAutorizados.includes(rol)) next()
      else next(false)
    },
    component: () => import("../views/CajeroNav.vue"),

    children: [
      {
        path: "/cajero/ListaDePedidos",
        name: "CajeroListaDePedidos",
        component: () => import("../views/CajeroListaDePedidos.vue"),
      },
      {
        path: "/cajero/PedidosDetalle/:idPedido",
        name: "CajeroPedidoDetalle",
        component: () => import("../views/CajeroPedidoDetalle.vue"),
      },
    ]
  },
  //--------------------------------------------------------------------------------------


  //---------------------------------------------------------------------------COCINERO
  {
    path: "/cocinero",
    name: "cocinero",
    beforeEnter: (to, from, next) => {
      const rolesAutorizados = ["Cocinero"]
      const usuario = Store.getters['traerUsuario']
      const rol = usuario.rol
      if (rolesAutorizados.includes(rol)) next()
      else next(false)
    },
    component: () => import("../views/CocineroNav.vue"),

    children: [
      {
        path: "/cocinero/ListaDePedidos",
        name: "CocineroListaDePedidos",
        component: () => import("../views/CocineroListaDePedidos.vue"),
      },
      {
        path: "/cocinero/PedidosDetalle/:idPedido",
        name: "CocineroPedidoDetalle",
        component: () => import("../views/CocineroPedidoDetalle.vue"),
      },
      {
        path: "/cocinero/recetario",
        name: "Recetario",
        component: () => import("../views/Recetario.vue"),
      },
      {
        path: "/cocinero/EditarReceta/:idReceta",
        name: "CocineroEditarReceta",
        component: () => import("../views/CocineroEditarReceta.vue"),
      },
    ]
  },
  //--------------------------------------------------------------------------------------

  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
