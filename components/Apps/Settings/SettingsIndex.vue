<template>
  <div class="app-window-container">
    <v-navigation-drawer
      v-model="drawer"
      permanent
      class="settings-menu-drawer"
      color="transparent"
      floating
      width="320"
    >
      <div class="pa-2">
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="activatedUser.image" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="caption font-weight-bold">
              {{ activatedUser.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="caption font-weight-bold">
              {{ activatedUser.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-text-field
          v-model="searchSettingsMenu"
          class="ms-2 me-1 mt-4 elevation-2"
          solo
          label="Find a setting"
          placeholder="Find a setting"
          append-icon="mdi-magnify mdi-rotate-90"
          flat
          dense
          clearable
          hide-details=""
        />
        <v-list class="mt-4" nav dense>
          <template v-for="menu in getSettingsMenuList()">
            <v-list-item
              v-if="menu.notFound"
              :key="`si-notfound-${menu.label}`"
              class="justify-center font-weight-bold"
            >
              {{ menu.label }}
            </v-list-item>
            <v-list-item
              v-else
              :key="`s-item-${menu.label}`"
              class="px-0"
              :class="!menu.active || 'v-list-item--active primary--text text--darken-2 elevation-2'"
              link
              @click="setActiveSettingsMenu(menu.label)"
            >
              <v-card
                class="me-2"
                min-width="4"
                min-height="18"
                height="100%"
                elevation="0"
                :color="menu.active ? 'primary' : 'transparent'"
              />
              <v-list-item-icon class="me-4">
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ menu.label }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </div>
    </v-navigation-drawer>

    <div>
      {{ getActiveSettingsMenu.label }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    app: { type: Object, default: () => {} },
  },
  data: () => ({
    drawer: false,
    activeSettingsMenu: 0,
  }),
  computed: {
    ...mapGetters('user', ['activatedUser']),
    ...mapGetters('apps/settings', [
      'getSettingsMenuList',
      'getActiveSettingsMenu',
    ]),
    searchSettingsMenu: {
      get() {
        return this.$store.state.apps.settings.settingsMenuSearchKeyword
      },
      set(val) {
        if (val === null) val = ''
        return this.$store.dispatch('apps/settings/searchSettings', val)
      },
    },
    // activeSettingsMenu: {
    //   get() {
    //     return this.getActiveSettingsMenu
    //   },
    //   set(val) {
    //     const index = val||this.getActiveSettingsMenu
    //      return this.$store.dispatch(
    //       'apps/settings/setActiveMenu',
    //       index
    //     )
    //   },
    // },
  },
  created() {
    if (this.getSettingsMenuList.length === 0) {
      const sml = require('@/assets/json/apps/appSettingsMenuList.json')
      this.$store.dispatch('apps/settings/initSettingsMenuList', sml)
    }
  },
  methods: {
    setActiveSettingsMenu(label) {
      // alert(label)
      if (this.getActiveSettingsMenu.label === label) return
      this.$store.dispatch('apps/settings/setActiveSettingsMenu', label)
    },
  },
}
</script>

<style>
.settings-menu-drawer .v-navigation-drawer__content {
  overflow-y: scroll;
}
/* .settings-menu-active-indicator {
} */
</style>