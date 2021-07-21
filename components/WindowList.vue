<template>
  <v-row no-gutters>
    <div v-for="app in $store.state.windowList" :key="app.type">
      <Window
        v-if="app.type == 'window'"
        v-model="app.window.show"
        :app="app"
      />
      <StartMenu
        v-else-if="app.type == 'startmenu'"
        v-show="app.window.show"
        :app="app"
      />
    </div>
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