
<template>
  <div>
    <div class="centrarContenido" v-show="!isGoogleLoginChecked">
      <b-spinner
        class="spinnerMediano"
        variant="primary"
        label="Spinning"
      ></b-spinner>
    </div>
    <div v-show="isGoogleLoginChecked">
      <button
        class="google-button"
        @click="handleClickSignIn"
        v-if="!isSignIn"
        :disabled="!isInit"
      >
        <img src="../../public/images/GoogleLogo.svg" />
        Iniciar sesión con Google
      </button>

      <button
        class="google-button"
        @click="handleClickSignOut"
        v-if="isSignIn"
        :disabled="!isInit"
      >
        <img src="../../public/images/GoogleLogo.svg" />
        Cerrar sesión con Google
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "test",
  data() {
    return {
      isGoogleLoginChecked: false,
      isInit: false,
      isSignIn: false,
    };
  },
  computed: {
    ...mapGetters(["traerCliente"]),
  },

  methods: {
    ...mapActions(["obtenerJwTokenConGoogle", "setGoogleLogin"]),
    async handleClickSignIn() {
      this.isGoogleLoginChecked = false;
      await this.$gAuth
        .signIn()
        .then(async (GoogleUser) => {
          // on success do something
          //   console.log("GoogleUser", GoogleUser);
          //   console.log("getId", GoogleUser.getId());
          //   console.log("getBasicProfile", GoogleUser.getBasicProfile());
          //   console.log("getAuthResponse", GoogleUser.getAuthResponse());
          this.isSignIn = this.$gAuth.isAuthorized;
          const Auth = GoogleUser.getAuthResponse();
          this.obtenerJwTokenConGoogle(Auth.id_token).then(() => {
            this.isGoogleLoginChecked = true;
            this.setGoogleLogin(true);
            this.$emit("logeado");
          });
        })
        .catch((error) => {
          if (error.error == "popup_closed_by_user")
            this.isGoogleLoginChecked = true;
          // console.log("error", error);
        });
    },

    async handleClickSignOut() {
      await this.GoogleSignOut();
      this.$emit("logout");
    },
    async GoogleSignOut() {
      try {
        await this.$gAuth.signOut();
        this.isSignIn = this.$gAuth.isAuthorized;
        this.setGoogleLogin(false);
      } catch (error) {
        console.log("No se pudo desloguear de Google");
      }
    },
  },
  mounted() {
    let that = this;
    let checkGauthLoad = setInterval(async function () {
      that.isInit = that.$gAuth.isInit;
      that.isSignIn = that.$gAuth.isAuthorized;
      that.isGoogleLoginChecked = true;
      //Si por alguna razón figura como logueado en google pero no hay cliente en vuex, desloguearlo de goole
      if (that.traerCliente.id == 0 && that.isInit) {
        await that.GoogleSignOut();
      }
      if (that.isInit) clearInterval(checkGauthLoad);
    }, 500);
  },
};
</script>

<style>
.centrarContenido {
  display: flex;
  justify-content: center;
  align-content: center;
  height: 86px;
}

.google-button {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  background-color: white;
  filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.5));
  padding: 14px 20px;

  margin-top: 1.5em;
  margin-bottom: 0.5em;

  border: none;
  cursor: pointer;
  width: 100%;
}

.google-button:active {
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.5));
  transform: translateX(2px) translateY(2px);
}
</style>