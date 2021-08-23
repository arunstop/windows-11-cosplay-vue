<template>
  <v-navigation-drawer
    v-model="show"
    app
    temporary
    hide-overlay
    right
    width="380px"
    color="transparent"
    class="elevation-0 notification-panel"
    floating
  >
    <v-card
      class="d-flex flex-column-reverse align-end justify-start py-2 pe-4"
      height="94vh"
      color="transparent"
    >
      <!-- Calendar -->
      <v-card
        class="my-2 d-flex flex-column windows-grey rounded-lg"
        elevation="6"
        width="342px"
        outlined
      >
        <v-card-title class="justify-space-between py-2 px-4">
          <span class="body-2 font-weight-medium">{{ today }}</span>
          <v-chip
            class="font-weight-bold pa-1" link outlined small label 
            @click="showCalendar = !showCalendar"
          >
            <v-icon size="24">{{ calendarIcon() }}</v-icon>
          </v-chip>
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
      <!-- Notifications -->
      <v-slide-x-reverse-transition>
        <v-card
        v-if="getGroupedNotifList().length>0"
        elevation="6"
        width="342px"
        min-height="240px"
        style="flex: 1"
        class="d-flex flex-column blur-bg rounded-lg my-2"
      >
        <v-card-title
          class="justify-space-between py-2 px-4 white windows-grey"
          style="z-index: 1"
        >
          <span class="body-2 font-weight-medium">Notifications</span>

          <v-chip class="font-weight-bold" link outlined small label @click="clearNotif()">
            Clear all
          </v-chip>
        </v-card-title>
        <v-divider/>

        <v-card-text class="pa-0" style="z-index: 2; overflow-y:scroll !important; overflow-x:hidden;">
          <v-slide-x-reverse-transition group >
            <NotificationItem
            v-for="notif in getGroupedNotifList()"
            :key="notif.app.name"
            :notif="notif"
          />
          </v-slide-x-reverse-transition>
        </v-card-text>
      </v-card>
      </v-slide-x-reverse-transition>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

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
    ...mapGetters('user/notification', ['getGroupedNotifList']),
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
      return this.$date.format('','dddd, MMMM DD')
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
    clearNotif(){
      this.$store.dispatch('user/notification/clearNotif')
    }
  },
}
</script>

<style>
/* .v-navigation-drawer__content {
  overflow-y: scroll !important;
} */
.notification-panel {
  top: 0 !important;
  right: 0 !important;
  height: 94vh !important;
}
</style>