<template>
  <v-navigation-drawer
    v-model="show"
    app
    temporary
    hide-overlay
    right
    width="380px"
    color="transparent"
    class="elevation-0 action-center"
    floating
  >
    <v-card
      class="d-flex flex-column-reverse align-end justify-start pt-4 pe-4"
      height="94vh"
      color="transparent"
    >
      <!-- Action Center Panel -->
     <ActionCenterPanel />
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
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
        return this.$store.getters['app/window/windowState'](this.app.id)
      },
      set(value) {
        return this.$store.dispatch('app/window/toggleWindow', {
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

<style>
/* .v-navigation-drawer__content {
  overflow-y: scroll !important;
} */
.action-center {
  top: 0 !important;
  right: 0 !important;
  height: 94vh !important;
}
</style>