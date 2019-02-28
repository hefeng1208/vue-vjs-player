import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vvjsPlayer from './lib/index'

Vue.use(vvjsPlayer)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
