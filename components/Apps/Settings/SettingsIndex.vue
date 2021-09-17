<template>
  <div class="app-window-container">
    <v-navigation-drawer
      v-model="drawer"
      permanent
      color="transparent"
      floating
    >
      <div class="pa-2">
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="activatedUser.image" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="caption font-weight-bold">{{
              activatedUser.name
            }}</v-list-item-title>
            <v-list-item-subtitle class="caption font-weight-bold">{{
              activatedUser.email
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-text-field
          class="ms-3 me-1 mt-4 elevation-2"
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
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item v-for="menu in getSettingsMenuList()" :key="menu.icon">
              <v-list-item-icon class="me-4">
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ menu.label }}</v-list-item-title>
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
    ...mapGetters('apps/settings', ['getSettingsMenuList']),
  },
  created() {
    // console.log(this.list)
  },
}
</script>

<style>
</style>