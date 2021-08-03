<template>
  <v-card
    v-if="$store.getters['app/window/windowState'](app.id)"
    class="animate__animated animate__zoomIn animate__fastest"
    :class="
      (app.window.fullscreen ? 'rounded-0' : 'rounded-lg') +
      ' ' +
      (snapped || 'window-frame')
    "
    :height="getWindowSize().height"
    :width="getWindowSize().width"
    :elevation="snapped ? 0 : 6"
  >
    <v-card-title class="ma-0 pa-0">
      <v-row no-gutters align="center" class="ps-2">
        <div class="d-flex">
          <v-icon class="me-1" size="18px" :color="app.iconColor">
            {{ app.icon }}
          </v-icon>
          <h6 class="black--text font-weight-medium">{{ app.title }}</h6>
        </div>
        <div class="ms-auto d-flex">
          <div v-for="(wa, waIndex) in windowActions" :key="waIndex">
            <!-- Minimize button -->
            <v-btn v-if="wa.type === 'minimize'" icon tile @click="wa.action">
              <v-icon size="18px">
                {{ wa.icon }}
              </v-icon>
            </v-btn>
            <!-- Resize button -->
            <v-menu
              v-if="wa.type === 'size'"
              open-on-hover
              bottom
              offset-y
              nudge-left="180%"
              open-delay="420"
              close-delay="420"
              close-on-click
              transition="slide-y-transition"
            >
              <template #activator="{ on, attrs }">
                <v-btn icon tile v-bind="attrs" @click="wa.action" v-on="on">
                  <v-icon size="18px">
                    {{ wa.icon }}
                  </v-icon>
                </v-btn>
              </template>

              <SnapLayoutMenu :app="app" />
            </v-menu>
            <!-- Close button -->
            <v-hover
              v-if="wa.type === 'close'"
              v-slot="{ hover }"
              :open-delay="wa.type === 'size' ? 420 : ''"
              :close-delay="wa.type === 'size' ? 420 : ''"
            >
              <v-btn
                :class="
                  (hover ? 'red' : '') +
                  ' ' +
                  (!app.window.fullscreen ? 'rounded-tr-lg' : '')
                "
                icon
                tile
                @click="wa.action"
              >
                <v-icon size="18px">
                  {{ wa.icon }}
                </v-icon>
              </v-btn>
              <!-- <v-slide-y-transition>
                    <WindowSnapLayoutMenu v-if="hover && wa.type === 'size'" />
                  </v-slide-y-transition> -->
            </v-hover>
          </div>
        </div>
      </v-row>
    </v-card-title>
    <v-card-text class="d-flex">
      <div class="loading-icon">
        <v-fab-transition>
          <v-icon
            v-if="isLoading"
            class="ma-auto"
            :size="120"
            :color="app.iconColor"
          >
            {{ app.icon }}
          </v-icon>
        </v-fab-transition>
      </div>
      <div>
        <slot v-if="!isLoading" name="content"></slot>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    app: {
      type: Object,
      default: () => {},
    },
    snapped: Boolean,
    // fullscreen: Boolean,
  },
  data: () => ({
    height: 540,
    width: 720,
    isLoading: false,
  }),
  computed: {
    show: {
      get() {
        return this.$store.getters['app/window/windowState'](this.app.id)
      },
      set(value) {
        this.$store.dispatch('app/window/toggleWindow', {
          id: this.app.id,
          value,
        })
      },
    },
    windowActions() {
      return [
        {
          icon: 'mdi-window-minimize',
          label: 'Minimize',
          type: 'minimize',
          action: () => {
            this.$store.dispatch('app/window/toggleWindow', { id: this.app.id })
          },
        },
        {
          icon: this.app.window.fullscreen
            ? 'mdi-window-restore'
            : 'mdi-window-maximize',
          type: 'size',
          label: this.app.window.fullscreen ? 'Restore' : 'Maximize',
          action: () => {
            this.$store.dispatch('app/window/toggleFullscreen', this.app)
          },
        },
        {
          icon: 'mdi-close-thick',
          label: 'Close',
          type: 'close',
          action: () => {
            this.$store.dispatch('app/window/closeApp', this.app )
          },
        },
      ]
    },
  },
  created() {
    // console.log(this.snapped)
    const showTime = 120
    setTimeout(() => {
      this.isLoading = true
    }, 120)
    setTimeout(() => {
      this.isLoading = false
    }, 1480 - showTime)
  },
  methods: {
    getWindowSize() {
      if (this.snapped) return { height: '', width: '' }
      else if (this.app.window.fullscreen)
        return { height: '100vh', width: '100vw' }
      else return { height: this.height, width: this.width }
    },
  },
}
</script>
<style>
.window-frame {
  position: fixed !important;
  /* height: 100% !important;
  width: 100% !important; */

  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%) !important;
  /* margin-bottom: 42px !important; */
  z-index: 6 !important;
  outline: none !important;

  /* pointer-events: none; */
  /* transition: 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms; */
}
.window-frame-snapped {
  display: flex;
  /* position: fixed; */
  /* height: 100%;
  width: 100%; */
  align-items: center;
  justify-content: center;
  /* left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  /* margin-bottom: 42px; */
  z-index: 6;
  outline: none;

  /* pointer-events: none; */
  /* transition: 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms; */
}

.loading-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

