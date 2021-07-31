<template>
  <div class="fixed">
    <!-- toggleable="sm" puede ser tambien lg md, varia en cuando se toggle -->
    <b-navbar toggleable="sm" type="dark" variant="primary">
      <!-- ------------------------------------------------------Titulo y Rol -->
      <router-link :to="{ name: 'Home' }">
        <b-navbar-brand>
          El Buen Sabor
          <br />
          <template v-if="traerUsuario.rol">
            <span class="rol d-flex justify-content-center">
              ({{ traerUsuario.rol }})
            </span>
          </template>
        </b-navbar-brand>
      </router-link>
      <!-- ------------------------------------------------------FinTitulo y Rol -->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- --------------------------------------------------------Login -->
          <LoginIcon :nombre="traerUsuario.nombreUsuario"></LoginIcon>
          <!-- --------------------------------------------------------FinLogin -->

          <!-- -------------------------------------------------------ListaPedidos -->
          <b-nav-item>
            <router-link
              :to="{ name: 'CajeroListaDePedidos' }"
              class="nav-link"
            >
              Lista de Pedidos <i class="fas fa-clipboard-list"></i>
            </router-link>
          </b-nav-item>
          <!-- -------------------------------------------------------FinListaPedidos -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- -------------------------------------------------------Buscar -->
          <b-nav-form @submit="handleBusqueda">
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Buscar"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">
              <i class="fas fa-search"></i>
            </b-button>
          </b-nav-form>
          <!-- -------------------------------------------------------FinBuscar -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LoginIcon from "./LoginIcon.vue";

export default {
  components: {
    LoginIcon,
  },
  computed: {
    ...mapGetters(["todosLosRubrosArticulos", "traerUsuario", "getCarrito"]), // pasamos un array de los }, getters que queremos usar. Esto nos permite usarlo
    cantidadCarrito() {
      return this.getCarrito.length;
    },
  },
  methods: {
    ...mapActions(["fetchTodosLosPedidos"]),
    handleBusqueda(event) {
      event.preventDefault();
      this.$router
        .push({ query: { porPalabraClave: event.target[0].value } })
        .catch(() => {}); //el catch evita que salte un error
    },
    handleBusquedaPorRubro(rubro) {
      this.$router.push({ query: { porRubro: rubro } }).catch(() => {}); //el catch evita que salte un error
    },
    async handleNotificacion(mensaje, pedido) {
      //si entra un pedido, actualizar el vuex
      await this.fetchTodosLosPedidos();
      console.log(mensaje, pedido);
    },
  },
  created() {
    const childrenRoutes = this.$router.options.routes.find(
      (r) => r.name == "cliente"
    ).children;
    childrenRoutes.forEach((element) => {
      this.rutas.push({
        name: element.name,
        path: element.path,
      });
    });

    this.$notificacionesHub.$on("Notificacion", this.handleNotificacion);
  },
  beforeDestroy() {
    this.$notificacionesHub.$off("Notificacion", this.handleNotificacion);
  },
  data() {
    return {
      rutas: [],
      loginShow: false,
      registroShow: false,
    };
  },
};
</script>

<style scoped>
.carrito {
  font-size: 200%;
  cursor: pointer;
  opacity: 50;
}
.rol {
  font-size: 80%;
}
.fixed {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.sub-menu1-container {
  /* margin: 0 5%; */
  /* background: rgb(255, 0, 0); */
  height: 30px;
  right: 80px;
  position: relative;
  /* z-index: -1; */
}

.sub-menu1-img {
  /* padding: 1% 10%; */
  position: absolute;
}

.numCarrito {
  color: white;
  position: absolute;
  right: -50px;
  margin-top: 4px;
  margin-right: -4px;
  text-align: center;
  align-content: center;
  align-items: center;
}
</style>


