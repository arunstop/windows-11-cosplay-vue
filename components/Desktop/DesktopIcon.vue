<template>
  <v-menu absolute>
    <template #activator="{ on, attrs }">
      <v-card
        class="mx-1 text-capitalize pa-2 text-break v-btn text-center"
        height="auto"
        max-width="90px"
        link
        elevation="0"
        color="transparent"
        v-bind="attrs"
        @dblclick="openApp()"
        @contextmenu.prevent.stop="on.click"
      >
        <div class="d-flex flex-column justify-center align-center">
          <v-icon size="36" :color="app.iconColor">{{ app.icon }}</v-icon>
          <span class="mt-2 font-weight-bold body-2">{{ app.title }}</span>
        </div>
      </v-card>
    </template>
      <DesktopContextMenu icon :app="app"/>
  </v-menu>
</template>
<script>


export default {
  props: {
    app: { type: Object, default: () => {} },
  },
  data: () => ({}),
  methods: {
    openApp() {
      this.$store.dispatch('app/window/openApp', this.app)
    },
  },
}
</script>
<style scoped>
</style>
