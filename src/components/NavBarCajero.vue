<template>
  <div class="fixed">
    <!-- toggleable="sm" puede ser tambien lg md, varia en cuando se toggle -->
    <b-navbar toggleable="sm" type="dark" variant="primary">
      <!-- ------------------------------------------------------Titulo y Rol -->
      <router-link :to="'/cajero/ListaDePedidos'">
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
          <LoginDropdown
            :nombre="traerUsuario.nombreUsuario"
            rol="cajero"
          ></LoginDropdown>
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

        <!-- Right aligned nav items -->
      </b-collapse>

      <!-- -------------------------------------------------------Notificaciones -->
      <!-- <div @mouseover="onOver" @mouseleave="onLeave"> -->
      <div>
        <button
          id="campana-notificacion"
          @click="handleToogleNotificaciones"
          class="btn m-2 nav-link-mod nav-link-semiopaco"
        >
          <i class="fas fa-bell campana"></i>
        </button>
      </div>
      <Notificaciones ref="notificacion"></Notificaciones>
      <!-- -------------------------------------------------------Fin Notificaciones-->
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LoginDropdown from "./LoginDropdown.vue";
import Notificaciones from "./Notificaciones.vue";

export default {
  components: {
    LoginDropdown,
    Notificaciones,
  },
  computed: {
    ...mapGetters(["todosLosRubrosArticulos", "traerUsuario", "getCarrito"]), // pasamos un array de los }, getters que queremos usar. Esto nos permite usarlo
    cantidadCarrito() {
      return this.getCarrito.length;
    },
  },
  methods: {
    ...mapActions(["fetchTodosLosPedidos"]),
    handleToogleNotificaciones() {
      this.$refs.notificacion.toggleVisibility();
    },
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
  mounted() {
    this.$title = "Cajero";
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


