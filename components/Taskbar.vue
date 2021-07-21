<template>
  <v-footer class="transparent" padless>
    <v-card
      flat
      tile
      width="100%"
      class="ma-0 pa-0 text-center white"
      height="36px"
      style="position: absolute; opacity: 0.8"
    ></v-card>
    <v-card flat tile width="100%" class="ma-0 pa-0 text-center transparent">
      <v-row
        class="pa-0"
        no-gutters
        align="center"
        justify="center"
        style="height: 36px !important"
      >
        <div class="d-flex mx-auto" style="position: absolute">
          <div
            v-for="(app, index) in $store.state.apps"
            :key="index"
            style="width: 100%; position: relative"
          >
            <v-btn
              class="mx-0 d-flex"
              icon
              tile
              @click.stop="$store.dispatch('openApp', app)"
            >
              <v-icon size="24px" :color="isVisible(app.id) ? 'blue' : ''">
                {{ app.icon }}
              </v-icon>
            </v-btn>
            <div
              v-if="isOpen(app.id)"
              class="blue rounded-t-pill"
              style="
                position: absolute;
                bottom: 0;
                right: 15%;
                height: 4px;
                width: 72%;
              "
            ></div>
          </div>
        </div>
        <div class="ms-auto">
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
                v-on="on"
              >
                <span class="d-flex flex-column">
                  <span>{{ getDateNow().hours }}</span>
                  <span>{{ getDateNow().fullDate }}</span>
                </span>
              </v-btn>
            </template>
            <v-date-picker v-model="datePicker" readonly></v-date-picker>
          </v-menu>
        </div>
      </v-row>
    </v-card>
    <WindowList />
  </v-footer>
</template>
<script>
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
  methods: {
    isOpen(id) {
      const result = this.$store.state.windowList.find((app) => {
        return app.id === id
      })
      return result
    },
    isVisible(id) {
      const result = this.$store.state.windowList.find((app) => {
        return app.id === id
      })
      if (!result) return false
      return result.window.show
    },
    addZero(x) {
      if (x < 10) {
        x = '0' + x
      }
      return x
    },
    getDateNow() {
      const now = new Date()
      return {
        hours:
          this.addZero(now.getHours()) + ':' + this.addZero(now.getMinutes()),
        fullDate:
          this.addZero(now.getDate()) +
          '/' +
          this.addZero(now.getMonth() + 1) +
          '/' +
          now.getFullYear(),
      }
    },
  },
}
</script>