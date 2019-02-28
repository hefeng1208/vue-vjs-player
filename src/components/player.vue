<template>
  <div class="vvjs-player" v-if="reseted">
    <video
      ref="vvjsPlay"
      class="video-js"
      style="object-fit:fill"
    />
  </div>
</template>

<script>
  import videojs from 'video.js'

  // pollfill
  if (typeof Object.assign != 'function') {
    Object.defineProperty(Object, 'assign', {
      value(target, varArgs) {
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object')
        }
        const to = Object(target)
        for (let index = 1; index < arguments.length; index++) {
          const nextSource = arguments[index]
          if (nextSource != null) {
            for (const nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey]
              }
            }
          }
        }
        return to
      },
      writable: true,
      configurable: true
    })
  }

  // as of videojs 7
  const DEFAULT_EVENTS = [
    'loadeddata',
    'canplay',
    'canplaythrough',
    'play',
    'pause',
    'waiting',
    'playing',
    'ended',
    'error'
  ]

  export default {
    name: 'vue-vjs-player',
    props: {
      start: {
        type: Number,
        default: 0
      },
      crossOrigin: {
        type: String,
        default: ''
      },
      playsinline: {
        type: Boolean,
        default: false
      },
      customEventName: {
        type: String,
        default: 'statechanged'
      },
      options: {
        type: Object,
        required: true
      },
      events: {
        type: Array,
        default: () => []
      },
      html5: {
        type: Object,
        default: () => ({
          hls: {
            overrideNative: true
          }
        })
      },
      globalOptions: {
        type: Object,
        default: () => ({
          autoplay: true,
          controls: true,
          controlBar: {
            remainingTimeDisplay: false,
            playToggle: {},
            progressControl: {},
            fullscreenToggle: {},
            volumeMenuButton: {
              inline: false,
              vertical: true
            }
          },
          plugins: {}
        })
      },
      globalEvents: {
        type: Array,
        default: () => []
      },
      trackList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        player: null,
        reseted: true
      }
    },
    mounted() {
      if (!this.player) {
        this.initialize()
      }
    },
    beforeDestroy() {
      if (this.player) {
        this.dispose()
      }
    },
    methods: {
      initialize() {
        // videojs options
        const videoOptions = Object.assign({}, this.globalOptions, this.options)

        // ios fullscreen
        if (this.playsinline) {
          this.$refs.vvjsPlay.setAttribute('playsinline', this.playsinline)
          this.$refs.vvjsPlay.setAttribute('webkit-playsinline', this.playsinline)
          this.$refs.vvjsPlay.setAttribute('x5-playsinline', this.playsinline)
          this.$refs.vvjsPlay.setAttribute('x5-video-player-type', 'h5')
          this.$refs.vvjsPlay.setAttribute('x5-video-player-fullscreen', false)
        }
        // cross origin
        if (this.crossOrigin !== '') {
          this.$refs.vvjsPlay.crossOrigin = this.crossOrigin
          this.$refs.vvjsPlay.setAttribute('crossOrigin', this.crossOrigin)
        }
        // emit event
        const emitPlayerState = (event, value) => {
          if (event) {
            this.$emit(event, this.player)
          }
          if (value) {
            this.$emit(this.customEventName, { [event]: value })
          }
        }
        // avoid error "VIDEOJS: ERROR: Unable to find plugin: __ob__"
        if (videoOptions.plugins) {
          delete videoOptions.plugins.__ob__
        }

        // player
        const self = this
        this.player = videojs(this.$refs.vvjsPlay, videoOptions, function() {
          // events
          const events = DEFAULT_EVENTS.concat(self.events).concat(self.globalEvents)
          // watch events
          const onEdEvents = {}
          for (let i = 0; i < events.length; i++) {
            if (typeof events[i] === 'string' && onEdEvents[events[i]] === undefined) {
              (event => {
                onEdEvents[event] = null
                this.on(event, () => {
                  emitPlayerState(event, true)
                })
              })(events[i])
            }
          }
          // watch timeupdate
          this.on('timeupdate', function() {
            emitPlayerState('timeupdate', this.currentTime())
          })
          // player readied
          self.$emit('ready', this)
        })
      },
      dispose(callback) {
        if (this.player && this.player.dispose) {
          if (this.player.techName_ !== 'Flash') {
            this.player.pause && this.player.pause()
          }
          this.player.dispose()
          this.player = null
          this.$nextTick(() => {
            this.reseted = false
            this.$nextTick(() => {
              this.reseted = true
              this.$nextTick(() => {
                callback && callback()
              })
            })
          })
        }
      }
    },
    watch: {
      options: {
        deep: true,
        handler(options, oldOptions) {
          this.dispose(() => {
            if (options && options.sources && options.sources.length) {
              this.initialize()
            }
          })
        }
      }
    }
  }
</script>
