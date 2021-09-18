<template>
  <div class="app-window-container">
    <v-navigation-drawer
      v-model="drawer"
      permanent
      class="settings-menu-drawer"
      color="transparent"
      floating
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
          <v-list-item-group
            v-model="activeSettingsMenu"
            active-class="grey lighten-3"
            mandatory
          >
            <v-list-item
              v-for="menu in getSettingsMenuList()"
              :key="menu.icon"
              class="px-0"
            >
              <!-- Not found -->
              <v-list-item
                v-if="menu.notFound"
                class="justify-center font-weight-bold"
              >
                {{ menu.label }}
              </v-list-item>

              <div v-else class="d-flex align-center">
                <v-card
                  class="me-2"
                  width="6"
                  min-height="18"
                  height="100%"
                  elevation="0"
                  :color="menu.active ? 'primary' : 'transparent'"
                />
                <v-list-item-icon class="me-4">
                  <v-icon>{{ menu.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ menu.label }}</v-list-item-title>
              </div>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>

    <div>
      The navigation drawer will appear from the bottom on smaller size screens.
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
    activeSettingsMenu: {
      get() {
        return this.getActiveSettingsMenu
      },
      set(val) {
        return this.$store.dispatch(
          'apps/settings/setActiveMenu',
          val
        )
      },
    },
  },
  created() {
    // console.log(this.getActiveSettingsMenu)
  },
}
</script>

<style>
.settings-menu-drawer .v-navigation-drawer__content {
  overflow-y: scroll;
}
.settings-menu-active-indicator {
}
</style>