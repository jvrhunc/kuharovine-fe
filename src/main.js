import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import NProgress from 'nprogress';
import '../node_modules/nprogress/nprogress.css';

import moment from 'moment'

Vue.config.productionTip = false;

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
});

router.beforeResolve((to, from, next) =>{
  if(to.name) {
    NProgress.start()
  }
  next()
});

router.afterEach(() => {
  NProgress.done()
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
