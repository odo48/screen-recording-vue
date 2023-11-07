import Vue from "vue";
import App from "../view/devtools.vue";
chrome.devtools.panels.create("screen-recorder", "", "devtools.html");
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
