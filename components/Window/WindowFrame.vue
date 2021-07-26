<template>
  <v-dialog
    v-model="show"
    width="720px"
    hide-overlay
    scrollable
    class="rounded-lg"
    :fullscreen="app.window.fullscreen"
    transition="slide-y-reverse-transition"
    content-class="elevation-6"
  >
    <v-card
      :class="app.window.fullscreen ? 'rounded-0' : 'rounded-lg'"
      :min-height="minHeight"
    >
      <v-card-title class="ma-0 pa-0">
        <v-row no-gutters align="center" class="ps-2">
          <div class="d-flex">
            <v-icon class="me-1" size="18px" :color="app.iconColor">
              {{ app.icon }}
            </v-icon>
            <h6 class="black--text font-weight-medium">{{ app.title }}</h6>
          </div>
          <div class="ms-auto">
            <v-hover
              v-for="(wa, waId) in windowActions"
              :key="waId"
              v-slot="{ hover }"
            >
              <v-btn
                :class="
                  (wa.type && hover ? 'red' : '') +
                  ' ' +
                  (!app.window.fullscreen && wa.type ? 'rounded-tr-lg' : '')
                "
                icon
                tile
                @click="wa.action"
              >
                <v-icon size="18px">
                  {{ wa.icon }}
                </v-icon>
              </v-btn>
            </v-hover>
          </div>
        </v-row>
      </v-card-title>
      <v-card-text class="d-flex">
        <div class="loading-icon">
          <v-fab-transition>
            <v-icon
              v-if="isLoading"
              class="ma-auto"
              :size="minHeight / 3"
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
  </v-dialog>
</template>

<script>
export default {
  props: {
    app: {
      type: Object,
      default: () => {
        return {
          window: {
            show: true,
            fullscreen: false,
          },
        }
      },
    },
    // fullscreen: Boolean,
  },
  data: () => ({
    minHeight: 540,
    isLoading: false,
  }),
  computed: {
    show: {
      get() {
        return this.$store.getters['app/windowState'](this.app.id)
      },
      set(value) {
        this.$store.dispatch('app/toggleWindow', { id: this.app.id, value })
      },
    },
    windowActions() {
      return [
        {
          icon: 'mdi-window-minimize',
          label: 'Minimize',
          action: () => {
            this.$store.dispatch('app/toggleWindow', { id: this.app.id })
          },
        },
        {
          icon: this.app.window.fullscreen
            ? 'mdi-window-restore'
            : 'mdi-window-maximize',
          label: this.app.window.fullscreen ? 'Restore' : 'Maximize',
          action: () => {
            this.$store.dispatch('app/toggleFullscreen', { id: this.app.id })
          },
        },
        {
          icon: 'mdi-close-thick',
          label: 'Close',
          type: 'close',
          action: () => {
            this.$store.dispatch('app/closeApp', { id: this.app.id })
          },
        },
      ]
    },
  },
  created() {
    const showTime = 120
    setTimeout(() => {
      this.isLoading = true
    }, 120)
    setTimeout(() => {
      this.isLoading = false
    }, 1480 - showTime)
  },
}
</script>
<style>
.loading-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

