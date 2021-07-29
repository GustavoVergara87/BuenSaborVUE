<template>
  <div class="fixed">
    <!-- toggleable="sm" puede ser tambien lg md, varia en cuando se toggle -->
    <b-navbar toggleable="sm" type="dark" variant="primary" class="test">
      <!-- ------------------------------------------------------Titulo y Rol -->
      <router-link :to="{ name: 'Home' }">
        <b-navbar-brand>
          <img src="../../public/images/logo.svg" class="logoPrincipal" />
          <br />
          <template v-if="traerRol">
            <span class="rol d-flex justify-content-center">
              <!-- ({{ traerRol }}) -->
            </span>
          </template>
        </b-navbar-brand>
      </router-link>
      <!-- ------------------------------------------------------FinTitulo y Rol -->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav class="outlined">
        <b-navbar-nav>
          <!-- --------------------------------------------------------Login -->
          <b-nav-item class="nav-item-mod"> </b-nav-item>

          <b-nav-item-dropdown
            text=""
            block
            class="m-2 nav-link-mod noarrow nav-link-semiopaco"
            menu-class=""
          >
            <template slot="button-content">
              <i class="fas fa-user-circle avatar"></i>
            </template>

            <b-dropdown-item @click="loginShow = true"> Login </b-dropdown-item>

            <b-dropdown-item @click="registroShow = true"
              >Registrarse</b-dropdown-item
            >

            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="logout()"> Salir </b-dropdown-item>
          </b-nav-item-dropdown>
          <!-- --------------------------------------------------------FinLogin -->

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
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto outlined">
          <!-- -------------------------------------------------------Carrito -->
          <b-nav-item class="outlined">
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
              <button class="responsiveHide boton-lupa" type="submit">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </b-nav-form>
          <!-- -------------------------------------------------------Fin Buscar -->
          <b-nav-item class="nav-link-semiopaco outlined">
            <i class="fas fa-bell campana"></i>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- -------------------------------------------------------Login -->
    <b-modal
      v-model="loginShow"
      ok-only
      ok-variant="secondary"
      ok-title="Cancelar"
      :hide-header="true"
    >
      <Login
        @logeado="loginShow = false"
        @registrarse="(loginShow = false), (registroShow = true)"
      ></Login>
    </b-modal>
    <!-- -------------------------------------------------------Fin Login -->

    <!-- -------------------------------------------------------Registro -->
    <b-modal
      v-model="registroShow"
      ok-only
      ok-variant="secondary"
      ok-title="Cancelar"
      :hide-header="true"
    >
      <Registro @registrado="registroShow = false"></Registro>
    </b-modal>
    <!-- -------------------------------------------------------Fin Registro -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { logout } from "../services/Login";
import Login from "../components/Login.vue";
import Registro from "../components/Registro.vue";

export default {
  components: {
    Login,
    Registro,
  },
  computed: {
    ...mapGetters([
      "todosLosRubrosArticulos",
      "traerRol",
      "getCarritoCantidad",
    ]), // pasamos un array de los }, getters que queremos usar. Esto nos permite usarlo
    cantidadCarrito() {
      return this.getCarritoCantidad;
    },
  },
  methods: {
    logout,
    ...mapActions(["fetchTodosLosRubrosArticulos"]),
    handleBusqueda(event) {
      event.preventDefault();
      this.$router
        .push({ query: { porPalabraClave: event.target[0].value } })
        .catch(() => {}); //el catch evita que salte un error
    },
    handleBusquedaPorRubro(rubro) {
      this.$router.push({ query: { porRubro: rubro } }).catch(() => {}); //el catch evita que salte un error
    },
    handleNotificacion(mensaje, pedido) {
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
    this.fetchTodosLosRubrosArticulos();
    // Listen to score changes coming from SignalR events
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
.avatar {
  font-size: 1.5em;
}

.campana {
  transform: translateY(0.25em);
  font-size: 1.2em;
}

.noarrow > ::after {
  display: none;
}

.nav-link-semiopaco > a > * {
  color: rgba(255, 255, 255, 0.9);
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
  position: relative;
  border-radius: 0px;
  border: none;
  height: 2em;
}

.boton-lupa {
  background-color: white;
  color: gray;
  border: none;
  font-size: 0.875em;
  position: relative;
  height: 2em;
  top:2px;

}

.form-busqueda {
  overflow: hidden;
  position: relative;
  /* outline: 1px solid red; */
  height: 2em;
  border-radius: 5px;
}
</style>



