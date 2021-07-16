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
      const rolesAutorizados = ["Cliente", "Administrador", "Cajero", "Cocinero", ""]
      const rol = Store.getters['traerRol']
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
        path: "/cliente/DetallePlato/:id",
        name: "DetallePlato",
        component: () => import("../views/PlatoDetalle.vue"),
      },
      {
        path: "/cliente/MercadoPago/:idPedido",
        name: "clienteMercadoPago",
        component: () => import("../views/MercadoPago.vue"),
        beforeEnter: (to, from, next) => {
          const rolesAutorizados = ["Cliente", "Administrador", "Cajero"]
          const rol = Store.getters['traerRol']
          //evaluar si hay alguna comprobación extra antes de permitirle entrar a Pagar con Mercado pago
          if (rolesAutorizados.includes(rol)) next()
          else next(false)
        }
      },
    ]
  },

  //----------------------------------------------------------------------ADMINISTRADOR
  {
    path: "/administrador",
    name: "administrador",
    beforeEnter: (to, from, next) => {
      const rolesAutorizados = ["Administrador"]
      const rol = Store.getters['traerRol']
      if (rolesAutorizados.includes(rol)) next()
      else next(false)
    },
    component: () => import("../views/AdministradorNav.vue"),

    children: [
      {
        path: "/administrador/Platos",
        name: "AdministradorPlatos",
        component: () => import("../views/Platos.vue"),
      },
      {
        path: "/administrador/Agregar_Articulo",
        name: "AdminAgregarArticulo",
        component: () => import("../views/AgregarEditar/AE_Articulo.vue"),
        props: { comportamiento: 'Agregar', }
      },
      {
        path: "/administrador/Editar_Articulo/:id",
        name: "AdminEditarArticulo",
        component: () => import("../views/AgregarEditar/AE_Articulo.vue"),
        props: { comportamiento: 'Editar', }
      },
    ]

  },
  //-----------------------------------------------------------------------------------

  //---------------------------------------------------------------------------CAJERO
  {
    path: "/cajero",
    name: "cajero",
    beforeEnter: (to, from, next) => {
      const rolesAutorizados = ["Administrador", "Cajero"]
      const rol = Store.getters['traerRol']
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
        component: () => import("../views/PedidoDetalle.vue"),
      },
    ]
  },
  //--------------------------------------------------------------------------------------


  //---------------------------------------------------------------------------COCINERO
  {
    path: "/cocinero",
    name: "cocinero",
    beforeEnter: (to, from, next) => {
      const rolesAutorizados = ["Administrador", "Cocinero"]
      const rol = Store.getters['traerRol']
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
        path: "/cocinero/Platos",
        name: "CocineroPlatos",
        component: () => import("../views/Platos.vue"),
      },
      {
        path: "/cocinero/Editar_Articulo/:id",
        name: "CocineroEditarArticulo",
        component: () => import("../views/AgregarEditar/AE_Articulo.vue"),
        props: { comportamiento: 'Editar', }
      },
    ]
  },
  //--------------------------------------------------------------------------------------

  //---------------------------------------------------------------------------Delivery
  {
    path: "/delivery",
    name: "delivery",
    beforeEnter: (to, from, next) => {
      const rolesAutorizados = ["Administrador", "Delivery"]
      const rol = Store.getters['traerRol']
      if (rolesAutorizados.includes(rol)) next()
      else next(false)
    },
    component: () => import("../views/DeliveryNav.vue"),

    children: [
      {
        path: "/delivery/ListaDePedidos",
        name: "DeliveryListaDePedidos",
        component: () => import("../views/DeliveryListaDePedidos.vue"),
      },
      {
        path: "/delivery/PedidosDetalle/:idPedido",
        name: "DeliveryPedidoDetalle",
        component: () => import("../views/DeliveryPedidoDetalle.vue"),
      },
    ]
  },
  //--------------------------------------------------------------------------------------


  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },

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
