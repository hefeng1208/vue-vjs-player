/*
* Vue-vjs-Player
* Author: fedevors@gmail.com
* Github: https://github.com/hefeng2018/vue-vjs-player
* Adapted from Videojs (https://github.com/videojs/video.js)
*/

import videojs from 'video.js'
import videoPlayer from '../components/player.vue'

const install = function (Vue) {
  Vue.component(videoPlayer.name, videoPlayer)
}

const vvjsPlayer = { videojs, videoPlayer, install }

export default vvjsPlayer
export { videojs, videoPlayer, install }
