// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import './theme/index.css'
import ElementUI from 'element-ui'

import App from './App'
import router from './router'

window.Promise = Promise;

Vue.config.productionTip = false;

Vue.use(ElementUI)

Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
