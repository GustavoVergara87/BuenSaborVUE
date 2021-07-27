
<template>
  <div>
    <!-- <button @click="handleClickGetAuth" :disabled="!isInit">
      get auth code
    </button> -->

    <button
      class="btn"
      @click="handleClickSignIn"
      v-if="!isSignIn"
      :disabled="!isInit"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 18 18"
        aria-hidden="true"
      >
        <title>Google</title>
        <g fill="none" fill-rule="evenodd">
          <path
            fill="#4285F4"
            d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"
          ></path>
          <path
            fill="#34A853"
            d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"
          ></path>
          <path
            fill="#FBBC05"
            d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"
          ></path>
          <path
            fill="#EA4335"
            d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"
          ></path>
        </g>
      </svg>
      Iniciar sesión con Google
    </button>

    <button @click="handleClickSignOut" v-if="isSignIn" :disabled="!isInit">
      signOout
    </button>
  </div>
</template>

<script>
/**
 * You should first need to place these 2 lines of code in your APP ENTRY file, e.g. src/main.js
 *
 * import GAuth from 'vue-google-oauth2'
 * Vue.use(GAuth, {clientId: '4584XXXXXXXX-2gqknkvdjfkdfkvb8uja2k65sldsms7qo9.apps.googleusercontent.com'})
 *
 */
import { mapActions } from "vuex";

export default {
  name: "test",
  data() {
    return {
      isInit: false,
      isSignIn: false,
    };
  },

  methods: {
    ...mapActions(["obtenerJwTokenConGoogle", "resetCarrito", "resetUsuarios"]),
    async handleClickGetAuth() {
      try {
        const authCode = await this.$gAuth.getAuthCode();
        const response = await this.$http.post(
          "http://your-backend-server.com/auth/google",
          { code: authCode, redirect_uri: "postmessage" }
        );
        console.log(response);
      } catch (error) {
        // On fail do something
      }
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
          const resp = await this.obtenerJwTokenConGoogle(Auth.id_token);
          this.$emit("singIn",resp)
        })
        .catch((error) => {
          console.log("error", error);
        });
    },

    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        this.isSignIn = this.$gAuth.isAuthorized;
        //Reset Vuex
        this.resetCarrito();
        this.resetUsuarios();
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