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
        <v-scale-transition
          class="d-flex mx-auto"
          style="position: absolute"
          origin="center bottom"
          group
        >
          <TaskbarApp v-for="ta in getTaskbarAppList()" :key="ta.id" :app="ta" />
        </v-scale-transition>

        <div class="ms-auto d-flex align-stretch">
          <!-- Tray icons -->
          <TaskbarSystemTray/>
          <v-btn
            class="mx-0 my-auto pa-0"
            color="transparent"
            elevation="0"
            @click="openActionCenter()"
          >
            <v-icon  v-for="(tray, index) in $store.state.trays"
            :key="index" class="mx-1" size="24px">
              {{ tray.icon }}
            </v-icon>
          </v-btn>
          <!-- Date Button -->
          <v-card
            class="transparent fill-height px-3"
            elevation="0"
            @click="openNotifPanel()"
          >
            <span class="d-flex flex-column">
              <h5 class="font-weight-medium">
                <span>{{ $store.getters.dateNow.hours }}</span>
              </h5>
              <h5 class="font-weight-medium">
                <span>{{ $store.getters.dateNow.fullDate }}</span>
              </h5>
            </span>
          </v-card>
          <!-- Show Desktop Button -->
          <v-card
            class="d-inline-flex"
            height="40px"
            width="12px"
            flat
            link
            tile
            color="grey"
            @click="$store.dispatch('windows/window/toggleShowDesktop')"
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
    datePicker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
  computed: {
    ...mapGetters('windows', ['getTaskbarAppList']),

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
    // localAttrs() {
    //   const attrs = {}

    //   if (this.variant === 'default') {
    //     attrs.absolute = false
    //     attrs.fixed = false
    //   } else {
    //     attrs[this.variant] = true
    //   }
    //   return attrs
    // },
  },
  created() {
    this.$store.dispatch('windows/window/openDefaultApps')
  },
  methods: {
    openNotifPanel() {
      this.$store.dispatch('windows/window/openAppById', 'notifications')
    },
    openActionCenter() {
      this.$store.dispatch('windows/window/openAppById', 'action-center')
    },
  },
}
</script>
