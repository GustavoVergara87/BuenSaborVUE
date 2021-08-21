<template>
  <div>
    <!-- lista de domicilios registrados -->
    <div class="domiciliosLista">
      <b-form-select
        :value="lecturaId"
        v-on:input="handleDomicilioSeleccionado($event)"
        required
        :disabled="noHayLoggin"
      >
        <option
          v-for="domicilio in domicilios"
          :value="domicilio.value"
          :key="domicilio.value"
        >
          {{ domicilio.text }}
        </option>

        <option v-bind:value="'nuevo'">...</option>
      </b-form-select>
    </div>

    <!-- editar/agregar domicilios -->
   
    <div v-show="modo == 'nuevo' || modoEditar == true">
      <b-form-input
        v-model="domicilioNuevo.calle"
        placeholder="calle"
        :disabled="noHayLoggin"
      ></b-form-input>

      <b-form-input
        v-model="domicilioNuevo.numero"
        type="number"
        placeholder="numero"
        :disabled="noHayLoggin"
      ></b-form-input>

      <b-form-input
        v-model="domicilioNuevo.localidad"
        placeholder="localidad"
        :disabled="noHayLoggin"
      ></b-form-input>

      <b-button
        v-show="modoEditar == true"
        @click="handleGuardar"
        variant="success"
        class="btnGuardar"
        :disabled="guardando"
      >
        <b-spinner
          class="spinnerChico"
          v-show="guardando"
          variant="primary"
          label="Spinning"
        ></b-spinner>

        <span v-show="!guardando">{{domicilioSeleccionadoId == "nuevo"? 'Crear':'Guardar'}}</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { addDomicilio, editDomicilio } from "../services/DomiciliosController";
export default {
  props: ["lecturaId", "modoEditar", "noHayLoggin"],
  computed: {
    ...mapGetters(["getCarrito", "traerUsuario", "traerCliente"]),
    domicilios() {
      return this.traerCliente.domicilios.map((d) => {
        return {
          text: d.calle + " " + d.numero + ", " + d.localidad,
          value: d.id,
        };
      });
    },
  },
  data() {
    return {
      guardando: false,
      modo: "",
      domicilioSeleccionadoId: "",
      domicilioNuevo: {
        id: "",
        calle: "",
        numero: "",
        localidad: "",
        clienteID: "",
      },
    };
  },

  methods: {
    ...mapActions(["addDomicilio", "editDomicilio"]),

    async handleGuardar() {
      if (this.domicilioSeleccionadoId == "nuevo") {
        this.guardando = true;
        //Creo un domicilio sin id, el back le asigna el id
        const domicilioNuevoSinId = JSON.parse(
          JSON.stringify(this.domicilioNuevo)
        );
        delete domicilioNuevoSinId.id;
        const domicilioNuevo = await addDomicilio(domicilioNuevoSinId); //hace el cambio en la base de datos
        await this.addDomicilio(domicilioNuevo); //cambia el valor en vuex
        this.domicilioNuevo.numero = "";
        this.domicilioNuevo.calle = "";
        this.domicilioNuevo.localidad = "";
        this.domicilioNuevo.clienteID = this.traerCliente.id;
        this.guardando = false;
        return domicilioNuevo.id;
      }

      if (this.domicilioSeleccionadoId != "nuevo" && this.modoEditar) {
        this.guardando = true;
        await editDomicilio(this.domicilioNuevo); //hace el cambio en la base de datos a traves del controlador
        await this.editDomicilio(this.domicilioNuevo); //mutacion, cambia el valor en vuex
        this.guardando = false;
        this.modo = "";
        return;
      }
    },

    handleDomicilioSeleccionado(evento) {
      //Guarda el domicilio seleccionado en domicilioSeleccionadoId para usarlo dentro del componente
      this.domicilioSeleccionadoId = evento;

      if (this.domicilioSeleccionadoId == "nuevo") {
        this.domicilioNuevo.numero = "";
        this.domicilioNuevo.calle = "";
        this.domicilioNuevo.localidad = "";
        this.domicilioNuevo.clienteID = this.traerCliente.id;
        this.modo = "nuevo";
      }

      if (this.domicilioSeleccionadoId != "nuevo") {
        const domicilioSeleccionado = this.traerCliente.domicilios.filter(
          (d) => d.id == this.domicilioSeleccionadoId
        )[0];
        this.domicilioNuevo.id = domicilioSeleccionado.id;
        this.domicilioNuevo.numero = domicilioSeleccionado.numero;
        this.domicilioNuevo.calle = domicilioSeleccionado.calle;
        this.domicilioNuevo.localidad = domicilioSeleccionado.localidad;
        this.domicilioNuevo.clienteID = domicilioSeleccionado.clienteID;
        this.modo = "lectura";
      }

      //emite el valor de domicilio seleccionado para que pueda tomarse con v-model desde un objeto padre
      //Revisar...por alguna razon sigue funcionando sin esto...
      this.$emit("input", evento);
    },

    async getId() {
      if (this.domicilioSeleccionadoId == "nuevo") {
        const domicilioNuevoId = await this.handleGuardar();
        return domicilioNuevoId;
      } else {
        return this.domicilioSeleccionadoId;
      }
    },
  },
};
</script>

<style scoped>
.btnGuardar {
  float: right;
  margin-top: 0.5em;
  width: 6em;
}

.domiciliosLista{
  margin-bottom: 0.5em;
}

</style>
