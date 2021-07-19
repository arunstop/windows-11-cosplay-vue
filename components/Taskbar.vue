<template>
  <v-card>
    <v-footer v-bind="localAttrs" padless>
      <v-card flat tile width="100%" class="ma-0 pa-0 text-center red">
        <v-row no-gutters align="center" justify="center">
          <div class="mx-auto" style="position: absolute">
            <v-btn
              v-for="(app, index) in $store.state.apps"
              :key="index"
              class="mx-0"
              icon
              tile
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

            <v-btn
              color="primary"
              dark
              @click.stop="$store.commit('toggleDialog')"
            >
              Open Dialog
            </v-btn>
            <Window/>

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
    </v-footer>
  </v-card>
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