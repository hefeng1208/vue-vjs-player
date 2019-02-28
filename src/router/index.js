import Vue from 'vue'
import Router from 'vue-router'
import player from '../examples/BasicPlayer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'player',
      component: player
    }
  ]
})
