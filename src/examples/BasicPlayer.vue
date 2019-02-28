<template>
  <div>
    <vue-vjs-player
      ref="video_play"
      class="video-js"
      :options="playerOptions"
      :playsinline="true"
    ></vue-vjs-player>
  </div>
</template>

<script>
import 'video.js/dist/video-js.min.css'

export default {
  name: "Basic-Player",
  data() {
    return {
      playerOptions: {
        width: '640px',
        height: '360px',
        autoplay: true,
        muted: false,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          // type: 'video/mp4'
          type: 'application/x-mpegURL',
          src: 'https://72757-playvod.jdcloud.com/vod/product/2019/0226/179604/210/output.m3u8'
        }],
        poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
      }
    }
  },
  mounted() {
    // console.log('this is current player instance object', this.player)
    // change src
    // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';
    // change item
    // this.$set(this.playerOptions.sources, 0, {
    //   type: "video/mp4",
    //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
    // })
    // change array
    // this.playerOptions.sources = [{
    //   type: "video/mp4",
    //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
    // }]
  }
}
</script>

<style scoped>

</style>
