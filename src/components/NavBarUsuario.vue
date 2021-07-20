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
          <b-nav-item class="nav-item-mod">
            <router-link :to="'/login'" class="nav-link nav-link-mod">
              Login
            </router-link>
          </b-nav-item>
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
              <b-dropdown-item v-if="item.denominacion!='Ingredientes'"
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
        </b-navbar-nav>
        <!-- -------------------------------------------------------FinRubros -->

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
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Buscar"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0 responsiveHide btn-outline-light " type="submit">
              <i class="fas fa-search"></i>
            </b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["todosLosRubrosArticulos", "traerRol", "getCarritoCantidad"]), // pasamos un array de los }, getters que queremos usar. Esto nos permite usarlo
    cantidadCarrito() {
      return this.getCarritoCantidad;
    },
  },
  methods: {
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
  },

  data() {
    return {
      rutas: [],
    };
  },
};
</script>

<style scoped>
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
</style>



