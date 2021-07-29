<template>
  <WindowFrame :app="app">
    <template #content>
      content
    </template>
  </WindowFrame>
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
    //   window: this.$store.state.dialog
  }),
  computed: {
    show: {
      get() {
        return this.$store.getters['app/window/windowState'](this.app.id)
      },
      set(value) {
        this.$store.dispatch('app/window/toggleWindow', { id: this.app.id })
      },
    },
    windowActions() {
      return [
        {
          icon: 'mdi-window-minimize',
          label: 'Minimize',
          action: () => {
            this.$store.dispatch('app/window/toggleWindow', { id: this.app.id })
          },
        },
        {
          icon: this.app.window.fullscreen
            ? 'mdi-window-restore'
            : 'mdi-window-maximize',
          label: this.app.window.fullscreen ? 'Restore' : 'Maximize',
          action: () => {
            this.$store.dispatch('app/window/toggleFullscreen', { id: this.app.id })
          },
        },
        {
          icon: 'mdi-close-thick',
          label: 'Close',
          type: 'close',
          action: () => {
            this.$store.dispatch('app/window/closeApp', { id: this.app.id })
          },
        },
      ]
    },
  },
  created() {
    // console.log(this.app)
  },
}
</script>

