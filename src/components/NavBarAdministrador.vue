<template>
  <div>
    <!-- toggleable="sm" puede ser tambien lg md, varia en cuando se toggle -->
    <b-navbar toggleable="sm" type="dark" variant="primary">
      <!-- ------------------------------------------------------Titulo y Rol -->
      <b-navbar-brand
        >El Buen Sabor<br />
        <span class="rol d-flex justify-content-center"
          >({{ traerRol }})</span
        ></b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- --------------------------------------------------------Login -->
          <b-nav-item>
            <router-link :to="'/login'" class="nav-link btn btn-success">
              Login
            </router-link>
          </b-nav-item>

          <!-- -------------------------------------------------------Platos -->
          <b-nav-item>
            <router-link :to="{ name: 'UsuarioPlatos' }" class="nav-link">
              Platos <i class="fas fa-utensils"></i>
            </router-link>
          </b-nav-item>

          <!-- -------------------------------------------------------Rubros -->
          <b-nav-item-dropdown
            text="Categorias"
            block
            variant="primary"
            class="m-2"
            menu-class="w-100"
          >
            <template v-for="(item, index) in this.todosLosRubrosArticulos">
              <b-dropdown-item :key="index">{{
                item.denominacion
              }}</b-dropdown-item>
            </template>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- -------------------------------------------------------Carrito -->
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link :to="{ name: 'Carrito' }" class="nav-link">
              <i class="fas fa-shopping-cart mx-4 mt-1 carrito"></i>
            </router-link>
          </b-nav-item>
          <!-- -------------------------------------------------------Buscar -->
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Buscar"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">
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
  computed: mapGetters(["todosLosRubrosArticulos", "traerRol"]), // pasamos un array de los getters que queremos usar. Esto nos permite usarlo

  methods: {
    ...mapActions(["fetchTodosLosRubrosArticulos"]),
  },

  created() {
    const childrenRoutes = this.$router.options.routes.find(
      (r) => r.name == "usuario"
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
.carrito {
  font-size: 150%;
  cursor: pointer;
}
.rol {
  font-size: 80%;
}
</style>

