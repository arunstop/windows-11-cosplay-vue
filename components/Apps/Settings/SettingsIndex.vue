<template>
  <v-row ref="windowSettings" class="app-window-container" no-gutters>
    <SettingsMenu :parent-width="MyWidth " />
    <div class="flex-grow-1">
      <v-row no-gutters align="center">
        <v-btn icon @click="toggleSettingsMenu()">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        {{ MyWidth }}
      </v-row>
    </div>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    app: { type: Object, default: () => {} },
  },
  data: () => ({
    
    activeSettingsMenu: 0,
    MyWidth:0,
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
  watch: {},
  created() {
    if (this.getSettingsMenuList.length === 0) {
      const sml = require('@/assets/json/apps/appSettingsMenuList.json')
      this.$store.dispatch('apps/settings/initSettingsMenuList', sml)
    }
  },
  // mounted(){
  //   if(this.$refs.windowSettings.clientWidth){
  //     this.w=this.$refs.windowSettings.clientWidth
  //   }
  // },
  async mounted(){
    await this.$nextTick();
    window.addEventListener('resize', this.setMyWidth);
    this.setMyWidth();
  },
  async beforeDestroy(){
    await this.$nextTick();
    window.removeEventListener('resize', this.setMyWidth)
  },
  methods: {
    setMyWidth(){
      console.log(this.$el.clientWidth)
      this.MyWidth = this.$el.clientWidth;
    },
    toggleSettingsMenu(){
      this.$store.dispatch('apps/settings/toggleSettingsMenu', !this.$store.state.apps.settings.settingsMenuDrawer)
    }
  }
}
</script>

<style>
.settings-menu-drawer .v-navigation-drawer__content {
  overflow-y: scroll;
}
/* .settings-menu-active-indicator {
} */
</style>