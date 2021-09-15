<template>
  <v-navigation-drawer
    v-model="show"
    app
    temporary
    hide-overlay
    right
    width="380px"
    color="transparent"
    class="action-center-container elevation-0 action-center nav-drawer-container"
    floating
  >
    <v-card
      class="d-flex flex-column-reverse align-end justify-start py-2 px-2"
      min-height="100%"
      color="transparent"
    >
      <!-- Action Center Panel -->
      <ActionCenterPanel />
      <!-- Media player -->
      <v-card
        class="my-2 windows-grey rounded-lg"
        elevation="6"
        width="342px"
        outlined
      >
        <v-card-title class="d-flex py-2">
          <v-icon size="18">mdi-microsoft-edge</v-icon>
          <h6 class="ms-1">Microsoft Edge</h6>
        </v-card-title>
        <v-card-text class="d-flex flex-column">
          <v-list-item class="flex pa-0">
            <v-list-item-content class="py-0">
              <v-list-item-title >Title</v-list-item-title>
              <v-list-item-subtitle >Creator</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon class="my-0">
              <v-img class="rounded-lg elevation-6" height="60px" width="60px" src="https://picsum.photos/id/11/300/300" />
            </v-list-item-icon>
          </v-list-item>
          <div class="flex d-flex justify-center justify-md-space-around px-12 pt-4">
            <v-btn icon>
              <v-icon size="30">mdi-skip-previous</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon size="30">mdi-play</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon size="30">mdi-skip-next</v-icon>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  // middleware: ['initActionList'],
  props: {
    app: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({}),
  computed: {
    show: {
      get() {
        return this.$store.getters['windows/window/windowState'](this.app.id)
      },
      set(value) {
        return this.$store.dispatch('windows/window/toggleWindow', {
          id: this.app.id,
          value,
        })
        // alert('yeppa')
      },
    },
  },
  methods: {},
}
</script>

<style >
/* .nav-drawer-container {
  overflow-y: hidden !important;
} */

.nav-drawer-container .v-navigation-drawer__content {
  overflow-y: scroll !important;
}
.action-center {
  top: 0 !important;
  right: 0 !important;
  height: 94vh !important;
}
</style>