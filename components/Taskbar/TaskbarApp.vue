<template>
  <div>
    <v-menu top offset-y nudge-left="50%">
    <template #activator="{ on: menu, menuAttrs }">
      <v-tooltip
        top
        transition="fade-transition"
        content-class="transparent pa-0"
        open-delay="300"
      >
        <template #activator="{ on: tooltip, tooltipAttrs }">
          <div
            style="width: 100%; position: relative"
            v-bind="tooltipAttrs"
            v-on="tooltip"
          >
            <v-btn
              class="mx-0 d-flex"
              icon
              tile
              min-height="40px"
              v-bind="menuAttrs"
              @click.stop="openApp(app)"
              @contextmenu.prevent="showContextMenu(menu,tooltip,$event)"
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
        <!-- tooltip -->
        <v-chip
          label
          class="
            rounded
            font-weight-medium
            black--text
            windows-grey
            elevation-6
          "
        >
          {{ app.title }}
        </v-chip>
      </v-tooltip>
    </template>
    <!-- menu -->
    <TaskbarAppContextMenu :app="app" />
  </v-menu>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  props: {
    app: { type: Object, default: () => {} },
  },
  computed: {
    // ...mapGetters('app/', ['getTaskbarappOptionList']),
  },
  methods: {
    showContextMenu(menu,tooltip,event){
      tooltip.mouseleave()
      menu.click(event)
    },
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

/* .openmap */
</style>