/*
* Vue-vjs-Player
* Author: fedevors@gmail.com
* Github: https://github.com/hefeng2018/vue-vjs-player
* Adapted from Videojs (https://github.com/videojs/video.js)
*/

import videojs from 'video.js'
import vjsPlayer from '../components/player.js'

const install = function (Vue) {
  Vue.component(vjsPlayer.name, vjsPlayer)
}

const vvjsPlayer = { videojs, vjsPlayer, install }

export default vvjsPlayer
export { videojs, vjsPlayer, install }
