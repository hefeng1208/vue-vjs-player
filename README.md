<div algin="center"><h1>vue-vjs-player</h1></div>

### 说明
* 为了在vue项目中使用video.js 的v7版本
* video.js v7内置了对hls的支持

### 安装

``` bash
# install dependencies
npm i video.js@latest -S
npm install vue-vjs-player -S
```

### 使用

* 在 main.js 中
```javascript
import Vue from 'vue'
import VueVjsPlayer from 'vue-vjs-player'

Vue.use(VueVjsPlayer)
```
* 在Component中
```bash
<template>
  <video-player
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
    style="height: 360px;"
    class="video-js vjs-big-play-centered vjs-big-play-button"
  />
</template>
<script>
import 'video.js/dist/video-js.min.css'
export default {
  data() {
    return {
      playerOptions: {
        // videojs options
        muted: false,
        language: 'en',
        width: '640px',
        height: '360px',
        techOrder: ['html5', 'flash'],
        autoplay: true,
        controls: true,
        sources: [], // plyer's source
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        poster: '' // cover
    }
  }
}
</script>
```
### 其他
* 如果需要使用flash等插件需要单独装

### license
[MIT](https://opensource.org/licenses/MIT)
