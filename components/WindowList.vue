<template>
  <v-row no-gutters>
    <Window
      v-for="app in $store.state.windowList"
      :key="app.id"
      v-model="app.window.show"
      :app="app"
    />
  </v-row>
</template>

<script>
export default {
  data: () => ({
    //   window: this.$store.state.dialog
  }),
  computed: {
    show: {
      get() {
        return this.$store.state.dialog.show
      },
      set() {
        this.$store.commit('toggleDialog')
      },
    },
    windowActions() {
      return [
        {
          icon: 'mdi-window-minimize',
          label: 'Minimize',
          action: () => {
            this.$store.commit('toggleDialog')
          },
        },
        {
          icon: this.$store.state.dialog.fullscreen
            ? 'mdi-window-restore'
            : 'mdi-window-maximize',
          label: this.$store.state.dialog.fullscreen ? 'Restore' : 'Maximize',
          action: () => {
            this.$store.commit('toggleFullScreen')
          },
        },
        {
          icon: 'mdi-close-thick',
          label: 'Close',
          action: () => {
            this.$store.commit('toggleDialog')
          },
        },
      ]
    },
  },
}
</script>