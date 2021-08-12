<template>
    <v-navigation-drawer
      v-model="show"
      app
      temporary
      hide-overlay
      right
      width="400px"
      color="transparent"
      class="elevation-0 notification-panel"
      floating
    >
      <v-card
        class="d-flex flex-column align-end justify-end pt-4"
        min-height="94vh"
        color="transparent"
        style="overflow-y: scroll !important"
      >
        <!-- Notifications -->
        <v-card elevation="6" width="342px" min-height="280px" max-height="400px" style="flex:1;">
          <v-row
            no-gutters
            class="d-flex"
            align="center"
            justify="center"
          >
            <v-card min-width="100%">
              <v-card-title class="justify-space-between py-2 px-4">
                <h6>Notifications</h6>
                
                <v-chip
                  class="rounded-lg font-weight-bold"
                  outlined
                  small
                  link
                  pill
                >
                  Clear all
                </v-chip>
              </v-card-title>
              <v-expand-transition>
                <v-card-text class="pa-0">
                  <v-divider />

                </v-card-text>
              </v-expand-transition>
            </v-card>
          </v-row>
        </v-card>
         <!-- Calendar -->
        <v-card class="mt-4" elevation="6" width="342px">
          <v-row
            no-gutters
            class="d-flex"
            align="center"
            justify="center"
          >
            <v-card min-width="100%">
              <v-card-title class="justify-space-between py-2 px-4">
                <h6>{{ today }}</h6>
                <v-card
                  class="d-flex rounded"
                  link
                  outlined
                  @click="showCalendar = !showCalendar"
                >
                  <v-icon>{{ calendarIcon() }}</v-icon>
                </v-card>
              </v-card-title>
              <v-expand-transition>
                <v-card-text v-show="showCalendar" class="pa-0">
                  <v-divider />

                  <v-date-picker
                    v-model="datePicker"
                    readonly
                    full-width
                    flat
                    no-title
                    color="primary darken-2"
                  />
                </v-card-text>
              </v-expand-transition>
            </v-card>
          </v-row>
        </v-card>
      </v-card>
    </v-navigation-drawer>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  props: {
    app: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    showCalendar: true,
    datePicker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
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
    today() {
      return this.$date.format('dddd, MMMM DD')
    },
  },
  methods: {
    calendarIcon() {
      if (this.showCalendar === true) {
        return 'mdi-chevron-down'
      } else {
        return 'mdi-chevron-up'
      }
    },
  },
}
</script>

<style>
.v-navigation-drawer__content{
    overflow-y: hidden !important;
}
.notification-panel{
    top:0 !important;
    right:0 !important;
height: 94vh !important;
}
</style>