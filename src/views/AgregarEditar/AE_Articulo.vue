<template>
  <div class="m-4">
    <template v-if="comportamiento == 'Agregar'">
      <h5>Agregar Articulo</h5>
      <Formulario
        :formTemplate="form"
        @form-submited="addArticulo"
      ></Formulario>
    </template>

    <template v-if="comportamiento == 'Editar'">
      <h5>Editar Articulo</h5>
      <Formulario
        :formTemplate="form"
        :formACargar="elArticulo"
        @form-submited="editArticulo"
      ></Formulario>
    </template>
  </div>
</template>

<script>
import Formulario from "../../components/Formulario.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["comportamiento"],

  data() {
    return {
      //Objeto a partir del cual se crea el formulario dinámico
      form: {
        Denominacion: "text",
        Imagen: "image",
        UnidadMedida: "text",
        StockMinimo: "number",
        ALaVenta: "boolean",
        Disabled: "boolean",
        RubroArticuloID: "number",
      },
    };
  },

  components: {
    Formulario,
  },

  methods: {
    ...mapActions(["addArticulo", "editArticulo", "getArticulo"]),
  },

  computed: {
    ...mapGetters(["elArticulo"]),
  },

  created() {
    this.getArticulo(this.$route.params.id);
  },
};
</script>

<style>
</style>