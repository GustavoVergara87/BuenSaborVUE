<template>
  <div class="fixed">
    <!-- toggleable="sm" puede ser tambien lg md, varia en cuando se toggle -->
    <b-navbar toggleable="md" type="dark" variant="primary" class="test">
      <!-- ------------------------------------------------------Titulo y Rol -->
      <router-link :to="{ name: 'Home' }">
        <b-navbar-brand>
          <img src="../../public/images/logo.svg" class="logoPrincipal" />
          <img
            src="../../public/images/logo_chico.svg"
            class="logoPrincipalChico"
          />
        </b-navbar-brand>
      </router-link>
      <!-- ------------------------------------------------------FinTitulo y Rol -->

      <!-- -------------------------------------------------------Notificaciones-collapse -->
      <div id="campana-notificacion-collapse">
        <button
          @click="handleToogleNotificaciones"
          class="btn m-2 nav-link-mod nav-link-semiopaco"
        >
          <i class="fas fa-bell campana"></i>
        </button>
      </div>
      <!-- -------------------------------------------------------Fin Notificaciones-collapse-->

      <!-- -------------------------------------------------------carrito-icon-collapse-->
      <b-nav-item class="outlined carrito-icon-collapse">
        <router-link
          :to="{ name: 'Carrito' }"
          class="nav-link carritoBox outlined"
        >
          <span class="carritoRedCircle">&#11044;</span>
          <span class="carritoNum outlined">{{ cantidadCarrito }}</span>
          <i class="fas fa-shopping-cart carritoIco outlined"></i>
        </router-link>
      </b-nav-item>
      <!-- -------------------------------------------------------Fincarrito-icon-collapse-->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav class="m-1">
        <b-navbar-nav>
          <!-- --------------------------------------------------------Login -->
          <LoginDropdown
            :nombre="traerCliente.nombre"
            rol="cliente"
          ></LoginDropdown>
          <!-- --------------------------------------------------------FinLogin -->

      

          <!-- -------------------------------------------------------Rubros -->
          <b-nav-item-dropdown
            text="Categorias"
            block
            class="m-2 nav-link-mod"
            menu-class=""
          >
            <template v-for="(item, index) in this.todosLosRubrosArticulos">
              <b-dropdown-item
                v-if="item.denominacion != 'Ingredientes'"
                @click="handleBusquedaPorRubro(item.denominacion)"
                :key="index"
                >{{ item.denominacion }}</b-dropdown-item
              >
            </template>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="handleBusquedaPorRubro('')">
              Todos
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <!-- -------------------------------------------------------FinRubros -->

    <!-- -------------------------------------------------------Platos -->
          <b-nav-item>
            <router-link
              :to="{ name: 'ClientePlatos' }"
              class="nav-link nav-link-mod"
            >
              Platos <i class="fas fa-utensils responsiveHide"></i>
            </router-link>
          </b-nav-item>
          <!-- -------------------------------------------------------FinPlatos -->


        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto outlined">
          <!-- -------------------------------------------------------Carrito -->
          <b-nav-item class="outlined carrito-icon">
            <router-link
              :to="{ name: 'Carrito' }"
              class="nav-link carritoBox outlined"
            >
              <span class="carritoRedCircle">&#11044;</span>
              <span class="carritoNum outlined">{{ cantidadCarrito }}</span>
              <i class="fas fa-shopping-cart carritoIco outlined"></i>
            </router-link>
          </b-nav-item>
          <!-- -------------------------------------------------------FinCarrito -->

          <!-- -------------------------------------------------------Buscar -->
          <b-nav-form @submit="handleBusqueda">
            <div class="form-busqueda">
              <b-form-input
                class="input-busqueda"
                size="sm"
                placeholder="Buscar"
              ></b-form-input>
              <button class="boton-lupa" type="submit">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </b-nav-form>
          <!-- -------------------------------------------------------Fin Buscar -->
        </b-navbar-nav>
      </b-collapse>
      <!-- -------------------------------------------------------Notificaciones -->
      <div id="campana-notificacion">
        <button
          @click="handleToogleNotificaciones"
          class="btn m-2 nav-link-mod nav-link-semiopaco"
        >
          <i class="fas fa-bell campana"></i>
        </button>
      </div>
      <!-- -------------------------------------------------------Fin Notificaciones-->
    </b-navbar>
    <Notificaciones ref="notificacion"></Notificaciones>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Notificaciones from "./Notificaciones.vue";
import LoginDropdown from "./LoginDropdown.vue";
export default {
  components: {
    LoginDropdown,
    Notificaciones,
  },
  data() {
    return {
      now: Date.now,
      showNotificaciones: false,
    };
  },
  computed: {
    ...mapGetters([
      "todosLosRubrosArticulos",
      "traerUsuario",
      "getCarritoCantidad",
      "traerCliente",
    ]), // pasamos un array de los }, getters que queremos usar. Esto nos permite usarlo
    cantidadCarrito() {
      return this.getCarritoCantidad;
    },
  },
  methods: {
    ...mapActions(["fetchTodosLosRubrosArticulos"]),
    handleToogleNotificaciones() {
      this.$refs.notificacion.toggleVisibility();
    },
    handleBusqueda(event) {
      event.preventDefault();
      //volver al menú platos
      if (this.$router.currentRoute.name != "ClientePlatos") {
        this.$router.push({ name: "ClientePlatos" });
      }
      this.$router
        .push({ query: { porPalabraClave: event.target[0].value } })
        .catch(() => {}); //el catch evita que salte un error
    },
    handleBusquedaPorRubro(rubro) {
      //volver al menú platos
      if (this.$router.currentRoute.name != "ClientePlatos") {
        this.$router.push({ name: "ClientePlatos" });
      }

      this.$router.push({ query: { porRubro: rubro } }).catch(() => {}); //el catch evita que salte un error
    },
  },
  created() {
    this.fetchTodosLosRubrosArticulos();
  },
  mounted() {
    this.$title = "Cliente";
  },
};
</script>

<style>
#campana-notificacion > ul {
  transform: translateY(1.1em);
  width: 19em;
  height: 1vh;
}
</style>

<style scoped>
.carrito-icon-collapse {
  list-style: none;
  display: none;
}

@media (max-width: 768px) {
  .carrito-icon {
    display: none;
  }



  div#nav-collapse {
    background-image: url("../../public/images/hamb.jpg");
    padding: 2em;
  }

  #campana-notificacion {
    display: none;
  }

  #campana-notificacion-collapse {
    display: block;
  }

  .carrito-icon-collapse {
    display: initial;
  }
}
@media (min-width: 769px) {
  #campana-notificacion-collapse {
    display: none;
  }
}

.campana {
  transform: translateY(0.25em);
  font-size: 1.2em;
}

.rol {
  font-size: 80%;
}
.fixed {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.carritoBox {
  width: 3em;
  height: 2em;
  position: relative;
}

.carritoNum {
  position: absolute;
  --size: 1em;
  width: 2em;
  height: var(--size);
  /* top: calc(50% - (var(--size) / 2));
  left: calc(85% - (var(--size) / 2)); */
  top: -0.45em;
  right: -0.15em;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  font-size: 90%;
}

.carritoRedCircle {
  position: absolute;
  --size: 1em;
  width: var(--size);
  height: var(--size);
  top: -0.6em;
  right: 0em;
  text-align: center;
  color: rgba(255, 0, 0, 1);
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
  font-size: 150%;
}

.carritoIco {
  position: absolute;
  --size: 1em;
  width: var(--size);
  height: var(--size);
  top: calc(50% - (var(--size) / 2));
  left: calc(40% - (var(--size) / 2));
  color: rgba(255, 255, 255, 1);
  font-size: 100%;
  cursor: pointer;
  opacity: 80;
}

.test {
  block-size: 80px; /*alto de la nav bar*/
  background-color: blueviolet !important;
  background-image: url("../../public/images/hamb.jpg");
  background-size: 200 500;
  filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.5));
}

.input-busqueda {
  /* position: relative; */
  border-radius: 0px;
  border: none;
  height: 2em;
}

.boton-lupa {
  background-color: white;
  color: gray;
  border: none;
  font-size: 0.875em;
}

.form-busqueda {
  display: flex;
  overflow: hidden;
  border-radius: 5px;
  /* outline: 1px solid red; */
}

.cerrar {
  text-align: right;
}

.boton-cerrar-notificacion {
  cursor: pointer;
  padding: 0.5em;
  padding-right: 0em;
}
</style>



