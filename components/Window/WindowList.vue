<template>
  <v-row no-gutters >
    <div v-for="app in sortedWindowList()" :key="app.id">
      <Window v-if="app.type == 'window' && !app.window.snap" :app="app" />
      <StartMenu v-else-if="app.type == 'startmenu'" :app="app" />
      <SearchPanel v-else-if="app.type == 'searchpanel'" :app="app" />
      <LazyWidgetPanel v-else-if="app.type == 'widgetpanel'" :app="app" />
      <NotificationPanel v-else-if="app.type == 'notificationpanel'" :app="app" />
      <ActionCenterContainer v-else-if="app.type == 'actioncenter'" :app="app" />
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
    <SnapLayoutList />
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    //   window: this.$store.state.dialog
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard' },
      { title: 'About', icon: 'mdi-forum' },
    ],
  }),
  computed: {
    ...mapGetters('app/window', ['getNonSnappedWindowList', 'sortedWindowList']),
    show: {
      get() {
        return this.$store.state.dialog.show
      },
      set() {
        this.$store.commit('toggleDialog')
      },
    },
  },
  methods: {},
}
</script>