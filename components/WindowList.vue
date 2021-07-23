<template>
  <v-row no-gutters>
    <div v-for="app in $store.state.app.windowList" :key="app.id">
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
      <WidgetPanel v-else-if="app.type == 'widgetpanel'" v-model="app.window.show" :app="app"/>

      <!-- <div v-if="app.type == 'widgetpanel'" :app="app">
        <v-navigation-drawer v-model="app.window.show" app temporary>
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                src="https://randomuser.me/api/portraits/men/78.jpg"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>John Leider</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item v-for="item in items" :key="item.title" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div> -->
    </div>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    //   window: this.$store.state.dialog
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard' },
      { title: 'About', icon: 'mdi-forum' },
    ],
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