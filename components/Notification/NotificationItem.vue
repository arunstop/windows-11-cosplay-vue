<template>
  <v-card flat rounded="0" color="transparent">
    <v-card-text class="d-flex flex-column no-gutters">
      <v-list-item class="pa-3" style="min-height: auto !important">
        <v-list-item-content class="pa-0">
          <v-list-item-title class="d-flex align-center">
            <v-icon class="me-1" size="18px" color="red">
              {{ notif.app.icon }}
            </v-icon>
            <h5 class="black--text font-weight-medium">
              {{ notif.app.name }}
            </h5>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <div class="d-flex flex-column">
        <v-slide-x-reverse-transition group>
          <NotificationSubItem
            v-for="(n, index) in notif.notifList"
            :key="n.header"
            :notif="n"
            :last="index + 1 === notif.notifList.length || showCount===1"
            :count="notif.notifList.length"
            :show="index < showCount"
          />
          <div :key="notif.app.name">
            <v-btn
            v-if="showCount===1"
              label
              small
              class="ms-4 mb-3 text-none"
              style="height: 20px !important"
              @click="showAllNotif(notif.notifList.length)"
            >
              {{ getMoreNotifLabel(notif.notifList.length) }}
            </v-btn>
          </div>
        </v-slide-x-reverse-transition>
      <v-divider />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    notif: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    showCount: 1,
  }),
  methods: {
    getMoreNotifLabel(notifCount) {
      const s = notifCount - 1 === 1 ? '' : 's'
      return `+${notifCount - 1} notification${s}`
    },
    showAllNotif(notifCount) {
      this.showCount = notifCount 
    },
  },
}
</script>

<style scoped>
</style>