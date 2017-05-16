// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import YDUI from 'vue-ydui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import config from 'config'

window._use_proxy = config.userProxy;
Vue.config.productionTip = false
Vue.prototype.$http = axios;
axios.defaults.baseURL = getApiBsePath();
Vue.use(YDUI);
//Vue.use(VueAxios, axios)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

function getApiBsePath() {
    if (window._use_proxy) {
        return "/api/";
    } else {
        return '/';
    }
}
