<template>
  <div class="fixed">
    <!-- toggleable="sm" puede ser tambien lg md, varia en cuando se toggle -->
    <b-navbar toggleable="sm" type="dark" variant="primary">
      <!-- ------------------------------------------------------Titulo y Rol -->
      <router-link :to="'/cocinero/ListaDePedidos'">
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
            rol="cocinero"
          ></LoginDropdown>
          <!-- --------------------------------------------------------FinLogin -->

          <!-- -------------------------------------------------------ListaPedidos -->
          <b-nav-item>
            <router-link
              :to="{ name: 'CocineroListaDePedidos' }"
              class="nav-link"
            >
              Lista de Pedidos <i class="fas fa-clipboard-list"></i>
            </router-link>
          </b-nav-item>
          <!-- -------------------------------------------------------FinListaPedidos -->

          <!-- -------------------------------------------------------Platos -->
          <b-nav-item>
            <router-link :to="{ name: 'Recetario' }" class="nav-link">
              Recetario <i class="fas fa-utensils"></i>
            </router-link>
          </b-nav-item>
          <!-- -------------------------------------------------------FinPlatos -->
        </b-navbar-nav>
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
    ...mapGetters(["getCarrito", "traerUsuario", "traerCliente"]), // pasamos un array de los }, getters que queremos usar. Esto nos permite usarlo
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
    // console.log(this.traerUsuario);
    // console.log(this.traerCliente);
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
     this.$title="Cocinero"
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
}
</style>


