<template>
  <div>
    <transition name="collapsable">
      <div v-show="show" class="marco">
        <transition name="slide-fade">
          <div v-show="show" class="contenedor-scrolleable">
            <div class="scrolleable">
              <template v-for="notificacion in traerTodasLasNotificaciones">
                <div :key="notificacion.id">
                  <div class="cerrar">
                    <i
                      @click="deleteNotificacion(notificacion.id)"
                      class="fas fa-times boton-cerrar-notificacion"
                    ></i>
                  </div>
                  <Notificacion
                    :id="notificacion.id"
                    :mensaje="notificacion.mensaje"
                    :pedido="notificacion.pedido"
                  ></Notificacion>
                </div>
              </template>
              <hr />
              <button id="boton-limpiar-notificaciones">
                Limpiar notificaciones
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import Notificacion from "./Notificacion.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Notificacion,
  },
  computed: {
    ...mapGetters(["traerTodasLasNotificaciones"]), // pasamos un array de los }, getters que queremos usar. Esto nos permite usarlo
  },

  data() {
    return {
      show: false,
    };
  },

  methods: {
    ...mapActions(["addNotificacion", "deleteFromNotificaciones"]),
    deleteNotificacion(id) {
      this.deleteFromNotificaciones(id);
    },
    handleNotificacion(notificacion) {
      //guarda como viene la notificacion en vuex
      this.addNotificacion(notificacion);
      //mostrar las notificaciones
      //this.showNotificacion();
      this.show = true;
    },
    toggleVisibility(){
      this.show = !this.show;
    }
  },


  created() {
    // Listen to score changes coming from SignalR events
    this.$notificacionesHub.$on("Notificacion", this.handleNotificacion);
  },
  beforeDestroy() {
    this.$notificacionesHub.$off("Notificacion", this.handleNotificacion);
  },
};
</script>

<style>
.notificacion {
  background-color: brown;
  width: 100%;
  padding: 0px;
  margin: 0px;
  color: white;
  /* padding: 1em; */
}
</style>

<style scoped>
.marco {
  position: absolute;
  top: 5em;
  height: calc(100vh - 7em);
  background-color: rgb(149, 101, 61);
  padding: 1em;
  overflow: hidden;
  width: 22em;
  right: 0px;
}
.contenedor-scrolleable {
  /* display: flex; */
  overflow: auto;
  position: absolute;
  height: 100vh;
  background-color: rgb(149, 101, 61);
  padding: 0.5em;
  /* border-radius: 10px; */
  /* border: 1px solid white; */
}

#boton-limpiar-notificaciones {
  border: none;
  border-radius: 5px;
  /* background-color: white; */
  background: none;
  color: rgb(0, 0, 0);
  position: absolute;
  bottom: 0.5em;
  margin-left: calc(20%);
}

/* Tamaño del scroll */
.contenedor-scrolleable::-webkit-scrollbar {
  width: 0px;
  position: relative;
  /* left: 10em; */
  /* transform: translateX(10em); */
}

/* Estilos barra (thumb) de scroll */
.contenedor-scrolleable::-webkit-scrollbar-thumb {
  background: rgb(221, 201, 201);
  border-radius: 4px;
}

.contenedor-scrolleable::-webkit-scrollbar-thumb:active {
  background-color: #a02020;
}

.contenedor-scrolleable::-webkit-scrollbar-thumb:hover {
  background: #a02020;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}

/* Estilos track de scroll */
.contenedor-scrolleable::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 4px;
}

.contenedor-scrolleable::-webkit-scrollbar-track:hover,
.contenedor-scrolleable::-webkit-scrollbar-track:active {
  background: #ffffff;
}

/*Animacion de entrada y salida*/
/* Las animaciones de entrada y salida pueden usar */
/* funciones de espera y duración diferentes.      */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-150px);
  opacity: 0;
}
/*Fin Animacion*/

/*Animacion de entrada y salida*/
/* Las animaciones de entrada y salida pueden usar */
/* funciones de espera y duración diferentes.      */
.collapsable-enter-active {
  transition: all 0.3s ease;
}
.collapsable-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.collapsable-enter,
.collapse-leave-to {
  /* transform: translateY(-150px); */
  opacity: 0;
}
/*Fin Animacion*/
</style>