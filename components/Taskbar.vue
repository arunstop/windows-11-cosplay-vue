<template>
  <v-footer class="transparent" padless>
    <v-card flat class="blur-background" height="100%" elevation="0" />
    <v-card flat tile width="100%" class="ma-0 pa-0 text-center transparent">
      <v-row
        class="pa-0"
        no-gutters
        align="center"
        justify="center"
        style="height: 40px !important"
      >
        <v-slide-y-reverse-transition
          class="d-flex mx-auto"
          style="position: absolute"
          group
        >
          <div
            v-for="(ta, index) in taskbarApps"
            :key="index"
            style="width: 100%; position: relative"
          >
            <v-btn class="mx-0 d-flex" icon tile min-height="40px" @click.stop="openApp(ta)">
              <v-icon size="24px" :color="ta.iconColor">
                {{ ta.icon }}
              </v-icon>
            </v-btn>
            <!-- opened app indicator -->
            <v-expand-x-transition>
              <div
               v-if="isVisible(ta.id)"
              class="taskbar-app-indicator-visible blue darken-2"
            />
            </v-expand-x-transition>
            <div
              v-if="isOpen(ta.id) && ta.type === 'window'"
              class="taskbar-app-indicator-hidden blue darken-2"
            />
          </div>
        </v-slide-y-reverse-transition>

        <div class="ms-auto d-flex align-stretch">
          <v-btn
            v-for="(tray, index) in $store.state.trays"
            :key="index"
            class="mx-0"
            icon
            tile
          >
            <v-icon size="24px">
              {{ tray.icon }}
            </v-icon>
          </v-btn>
          <v-menu top offset-y :close-on-content-click="false">
            <template #activator="{ on, attrs }">
              <v-btn
                class="transparent"
                depressed
                tile
                v-bind="attrs"
                min-height="40px"
                v-on="on"
              >
                <span class="d-flex flex-column">
                  <h5 class="font-weight-medium">
                    <span>{{ $store.getters.dateNow.hours }}</span>
                  </h5>
                  <h5 class="font-weight-medium">
                    <span>{{ $store.getters.dateNow.fullDate }}</span>
                  </h5>
                </span>
              </v-btn>
            </template>
            <v-date-picker v-model="datePicker" readonly></v-date-picker>
          </v-menu>
          <v-card
            class="d-inline-flex"
            height="40px"
            width="12px"
            flat
            link
            tile
            color="grey"
            @click="$store.dispatch('app/window/hideAllWindows')"
          >
          </v-card>
        </div>
      </v-row>
    </v-card>
    <WindowList />
  </v-footer>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    padless: false,
    variant: 'default',
    showCalendar: false,
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
    datePicker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
  computed: {
    ...mapGetters('app', ['taskbarApps']),

    drawerState: {
      get() {
        return this.$store.getters.drawerState
      },
      set(v) {
        return this.$store.commit('toggleDrawerState', v)
      },
    },
    // title() {
    //   return this.$store.state.title
    // },
    localAttrs() {
      const attrs = {}

      if (this.variant === 'default') {
        attrs.absolute = false
        attrs.fixed = false
      } else {
        attrs[this.variant] = true
      }
      return attrs
    },
  },
  created() {
    this.$store.dispatch('app/window/openDefaultApps')
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