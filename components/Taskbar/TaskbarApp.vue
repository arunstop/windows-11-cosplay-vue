<template>
  <div style="width: 100%; position: relative">
    <v-btn
      class="mx-0 d-flex"
      icon
      tile
      min-height="40px"
      @click.stop="openApp(app)"
    >
      <v-icon size="24px" :color="app.iconColor">
        {{ app.icon }}
      </v-icon>
    </v-btn>
    <!-- opened app indicator -->
    <v-expand-x-transition>
      <div
        v-if="isVisible(app.id)"
        class="taskbar-app-indicator-visible blue darken-2"
      />
    </v-expand-x-transition>
    <div
      v-if="isOpen(app.id) && app.type === 'window'"
      class="taskbar-app-indicator-hidden blue darken-2"
    />
  </div>
</template>

<script>
export default {
  props: {
    app: { type: Object, default: () => {} },
  },
  methods: {
    isOpen(id) {
      const result = this.$store.state.app.window.windowList.find((app) => {
        return app.id === id
      })
      return result
    },
    isVisible(id) {
      const result = this.$store.state.app.window.windowList.find((app) => {
        return app.id === id
      })
      if (!result) return false
      return result.window.show
    },
    openApp(app) {
      this.$store.dispatch('app/window/openApp', app)
    },
  },
}
</script>

<style scoped>
.taskbar-app-indicator-visible {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 4px;
  height: 3px;
  width: 60%;
  border-radius: 8px;
}

.taskbar-app-indicator-hidden {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 4px;
  height: 3px;
  width: 24%;
  border-radius: 8px;
}
</style>