<template>
  <v-navigation-drawer
    v-model="settingsMenuDrawer"
    v-bind="getAttributes()"
    class="windows-grey"
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
        <SettingsMenuItem
          v-for="menu in getSettingsMenuList()"
          :key="`smi-${menu.label}`"
          :menu="menu"
        />
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    parentWidth: { type: Number, default: () => 0 },
  },
  data: () => ({
    drawer: true,
  }),
  computed: {
    ...mapGetters('user', ['activatedUser']),
    ...mapGetters('apps/settings', [
      'getSettingsMenuList',
      'getActiveSettingsMenu',
    ]),
    settingsMenuDrawer: {
      get() {
        return this.$store.state.apps.settings.settingsMenuDrawer
      },
      set(v) {
        this.$store.dispatch('apps/settings/toggleSettingsMenu', v)
      },
    },
    searchSettingsMenu: {
      get() {
        return this.$store.state.apps.settings.settingsMenuSearchKeyword
      },
      set(val) {
        if (val === null) val = ''
        return this.$store.dispatch('apps/settings/searchSettings', val)
      },
    },
  },
  methods: {
    getAttributes() {
      if (this.parentWidth > 720) {
        return {  permanent: true }
      } else {
        return { temporary: true, absolute: true, hideOverLay: true  }
      }
    },
  },
}
</script>

<style>
</style>