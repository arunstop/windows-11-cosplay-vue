<template>

    <v-footer class="transparent " padless>
      <v-card flat tile width="100%" class="ma-0 pa-0 text-center white" height="36px" style="position:absolute; opacity:0.8;"></v-card>
      <v-card flat tile width="100%" class="ma-0 pa-0 text-center transparent">
        <v-row class="pa-0" no-gutters align="center" justify="center" style="height:36px !important;">
          <div class="mx-auto" style="position: absolute">
            <v-btn
              v-for="(app, index) in $store.state.apps"
              :key="index"
              class="mx-0"
              icon
              tile
              @click.stop="$store.dispatch('openApp', app)"
            >
              <v-icon size="24px">
                {{ app.icon }}
              </v-icon>
            </v-btn>
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

            <v-btn class="transparent" depressed tile>
              <span class="d-flex flex-column">
                <span>{{ date.getHours() + ':' + date.getMinutes() }}</span>
                <span>{{
                  date.getDate() +
                  '/' +
                  (date.getMonth() + 1) +
                  '/' +
                  date.getFullYear()
                }}</span>
              </span>
            </v-btn>
          </div>
        </v-row>
      </v-card>
    <WindowList />

    </v-footer>
</template>
<script>
export default {
  data: () => ({
    items: ['default', 'absolute', 'fixed'],
    padless: false,
    variant: 'default',
    date: new Date(),
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
}
</script>