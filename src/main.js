import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/css/styles.css"
import LoadScript from 'vue-plugin-load-script';

Vue.config.productionTip = false;
Vue.use(LoadScript);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
