import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/css/styles.css"
import LoadScript from 'vue-plugin-load-script';
import Notificaciones from '../src/services/Notificaciones'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '225689514544-qccdbtr164tekpjkgq0fn1f7630g2266.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)
Vue.config.productionTip = false;
Vue.use(LoadScript);
Vue.use(Notificaciones) //Para poder usar SignalR

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
