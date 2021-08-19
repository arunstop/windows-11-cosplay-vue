<template>
  <v-hover v-show="show" v-slot="{ hover }">
    <v-card flat color="transparent" link tile>
      <v-list-item class="pt-2 pb-3" style="min-height: auto !important">
        <v-list-item-content class="pa-0">
          <h5 class="font-weight-medium d-flex align-center">
            <span class="notif-datetime">
              {{ getNotifDateTime(notif.dateTime) }}
            </span>
            <v-btn
              v-if="isExpandable(notif.header, notif.details)"
              class="ms-1"
              icon
              x-small
              @click="expanded = !expanded"
            >
              <v-icon v-text="getExpandIcon()" />
            </v-btn>
          </h5>
        </v-list-item-content>
      </v-list-item>

      <v-list-item class="pb-2">
        <v-list-item-avatar
          v-if="notif.image"
          class="me-3 mt-0 mb-0 align-self-start"
          rounded="lg"
        >
          <v-img sizes="48" :src="notif.image" />
        </v-list-item-avatar>
        <v-list-item-content class="py-0 align-self-start">
          <v-list-item-title class="font-weight-bold subtitle-2 text-wrap">
            {{ getNotifHeader(notif.header) }}
          </v-list-item-title>
          <v-list-item-subtitle class="subtitle-2 text-wrap">
            {{ getNotifDetails(notif.details) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-fade-transition>
        <div
          v-if="hover"
          class="d-flex mt-1 pe-2"
          style="position: absolute; top: 0; right: 0"
        >
          <v-btn icon small @click="removeNotif(notif)">
            <v-icon v-text="'mdi-close-circle'" />
          </v-btn>
        </div>
      </v-fade-transition>
      <!-- <div v-if="last" :key="notif.app.name">
        <v-btn
          label
          small
          class="ms-4 mb-3 text-none"
          style="height: 20px !important"
        >
          {{ getMoreNotifLabel(count) }}
        </v-btn>
      </div> -->
      <!-- <v-divider v-if="last" /> -->
      <v-divider v-if="!last" class="mx-auto" style="width: 20% !important" />
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    notif: {
      type: Object,
      default: () => ({}),
    },
    last: Boolean,
    count: { type: Number, default: 0 },
    show:Boolean
  },
  data: () => ({
    expanded: false,
    headerLimit: 40,
    detailsLimit: 80,
  }),
  methods: {
    getNotifHeader(h) {
      const limit = this.expanded ? this.headerLimit * 2 : this.headerLimit
      return this.$globals.cutStr(h, limit)
    },
    getNotifDetails(d) {
      const limit = this.expanded ? this.detailsLimit * 4 : this.detailsLimit
      return this.$globals.cutStr(d, limit)
    },
    isExpandable(headerStr, detailsStr) {
      return (
        headerStr.length > this.headerLimit ||
        detailsStr.length > this.detailsLimit
      )
    },
    getExpandIcon() {
      return this.expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'
    },
    removeNotif(notif) {
      this.$store.dispatch('user/notification/removeNotif', notif)
    },
    getNotifDateTime(dt) {
      return this.expanded
        ? `${this.$date.fromNow(dt).full} at ${this.$date.format(dt, 'HH:mm')}`
        : this.$date.fromNow(dt).short
    },
    getMoreNotifLabel(notifCount) {
      const s = notifCount - 1 === 1 ? '' : 's'
      return `+${notifCount - 1} notification${s}`
    },
  },
}
</script>

<style scoped>
.notif-datetime::first-letter {
  text-transform: capitalize !important;
}
</style>