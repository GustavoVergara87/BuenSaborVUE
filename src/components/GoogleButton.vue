
<template>
  <div>
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
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      isInit: false,
      isSignIn: false,
    };
  },

  methods: {
    async googleLogin(id_token) {
      const resp = await this.obtenerJwTokenConGoogle(id_token);
      this.posLogin(resp);
    },
    async handleClickSignIn() {
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
          this.googleLogin(Auth.id_token).then(this.$emit("logeado"));
        })
        .catch((error) => {
          console.log("error", error);
        });
    },

    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        this.isSignIn = this.$gAuth.isAuthorized;
        this.$emit("logout");
      } catch (error) {
        // On fail do something
      }
    },
  },
  mounted() {
    let that = this;
    let checkGauthLoad = setInterval(function () {
      that.isInit = that.$gAuth.isInit;
      that.isSignIn = that.$gAuth.isAuthorized;
      if (that.isInit) clearInterval(checkGauthLoad);
    }, 1000);
  },
};
</script>

<style>
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