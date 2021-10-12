<template>
  <div>
    <transition name="aparecer-desaparecer">
      <div v-show="show" class="marco">
        <transition name="slide-fade">
          <div v-show="show" class="contenedor-scrolleable">
            <div class="scrolleable">
              <template v-if="traerTodasLasNotificaciones.length == 0">
                <b-alert
                  :show="dismissCountDown"
                  dismissible
                  variant="warning"
                  @dismissed="dismissCountDown = 0"
                  @dismiss-count-down="countDownChanged"
                >
                  <div class="texto-centrado">No hay notificaciones</div>
                  <b-progress
                    variant="warning"
                    :max="dismissSecs"
                    :value="dismissCountDown"
                    height="4px"
                  ></b-progress>
                </b-alert>
              </template>
              <template v-for="notificacion in traerTodasLasNotificaciones">
                <div :key="notificacion.id">
                  <Notificacion
                    :id="notificacion.id"
                    :mensaje="notificacion.mensaje"
                    :pedido="notificacion.pedido"
                  ></Notificacion>
                </div>
              </template>
              <!-- <hr /> -->
              <!-- <button id="boton-limpiar-notificaciones">
                Limpiar notificaciones
              </button> -->
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

      dismissSecs: 3,
      dismissCountDown: 0,
    };
  },

  methods: {
    ...mapActions(["addNotificacion", "deleteFromNotificaciones"]),
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
      if (this.dismissCountDown == 1) {
        this.toggleVisibility();
      }
    },
    deleteNotificacion(id) {
      this.deleteFromNotificaciones(id);
    },
    handleNotificacion(notificacion) {
      console.log("notificacion", notificacion);
      console.log("pedido", notificacion.pedido);
      //guarda como viene la notificacion en vuex
      this.addNotificacion(notificacion);
      //mostrar las notificaciones
      //this.showNotificacion();
      this.show = true;
    },
    toggleVisibility() {
      this.show = !this.show;
      if (this.show) {
        this.dismissCountDown = 3;
      }
    },
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

.alert-dismissible .close{
display: none;
}
.alert-dismissible{
padding: 0px;
}
</style>

<style scoped>


.texto-centrado {
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  height: 3em;
  opacity: 100%;
}

@keyframes anim {
  0% {
    opacity: 0%;
  }
  10% {
    opacity: 100%;
  }
  90% {
    opacity: 100%;
  }
  100% {
    opacity: 0%;
  }
}

.marco {
  position: absolute;
  top: 5em;
  overflow: hidden;
  width: 22em;
  right: 0.2em;
}
.contenedor-scrolleable {
  /* display: flex; */
  /* overflow: auto; */
  /* position: absolute; */
  /* height: 100vh; */
  /* background-color: rgb(90, 61, 37); */
  padding: 0.5em;
  padding-top: 1em;
  margin-top: 0px;
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
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-150px);
  opacity: 0;
}
/*Fin Animacion*/

/*Animacion de entrada y salida*/
.aparecer-desaparecer-leave-active {
  transition: all 0.3s;
  /*espera que el contenido termine su animacion y luego desaparece*/
}

/*Fin Animacion*/
</style>