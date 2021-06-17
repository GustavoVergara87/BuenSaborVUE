import Vue from "vue";
import VueRouter from "vue-router";
import Store from '../store/index'

Vue.use(VueRouter);


const routes = [
  {
    path: "/usuario",
    name: "usuario",
    beforeEnter: (to, from, next) => {
      const rolesAutorizados = ["Usuario", "Administrador", "Cajero", "Cocinero", ""]
      const rol = Store.getters['traerRol']
      if (rolesAutorizados.includes(rol)) next()
      else next(false)
    },
    component: () => import("../views/NavUsuario.vue"),

    children: [
      {
        path: "/usuario/Platos",
        name: "UsuarioPlatos",
        component: () => import("../views/Platos.vue"),
      },

      {
        path: "/usuario/Carrito",
        name: "Carrito",
        component: () => import("../views/Platos.vue"),
      },
    ]
  },

  {
    path: "/administrador",
    name: "administrador",
    beforeEnter: (to, from, next) => {
      const rolesAutorizados = ["Administrador"]
      const rol = Store.getters['traerRol']
      if (rolesAutorizados.includes(rol)) next()
      else next(false)
    },
    component: () => import("../views/NavUsuario.vue"),

    children: [
      {
        path: "/administrador/Platos",
        name: "PlatosAdmin",
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
