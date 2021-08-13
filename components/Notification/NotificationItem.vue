<template>
  <v-hover v-slot="{hover}">
    <v-card flat rounded="0" link color="transparent">
    <v-card-text class="d-flex flex-column no-gutters">
      <v-list-item>
        <v-list-item-content class="pb-0">
          <v-list-item-title class="d-flex align-center pb-3">
            <v-icon class="me-1" size="18px" color="red">
              {{ notif.app.icon }}
            </v-icon>
            <h5 class="black--text font-weight-medium">{{ notif.app.name }}</h5>
          </v-list-item-title>
          <h5 class="pb-3 font-weight-medium d-flex align-center">
            {{ notif.dateTime }}
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
      <v-list-item class="pb-3">
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
        <div v-if="hover" class="d-flex mt-2" style="position: absolute; right:0;">
        <v-btn
          class="ms-1"
          icon
          x-small
        >
          <v-icon v-text="'mdi-cog'" />
        </v-btn>
        <v-btn
          class="ms-1"
          icon
          x-small
          @click="removeNotif(notif)"
        >
          <v-icon v-text="'mdi-close-thick'" />
        </v-btn>
      </div>
     </v-fade-transition>
      <v-divider />
    </v-card-text>
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
  },
  data: () => ({
    expanded: false,
    headerLimit: 40,
    detailsLimit: 80,
  }),
  methods: {
    getNotifHeader(str) {
      const limit = this.expanded ? this.headerLimit * 2 : this.headerLimit
      return this.$globals.cutStr(str, limit)
    },
    getNotifDetails(str) {
      const limit = this.expanded ? this.detailsLimit * 2 : this.detailsLimit
      return this.$globals.cutStr(str, limit)
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
    removeNotif(notif){
this.$store.dispatch('user/notification/removeNotif', notif)
    }
  },
}
</script>

<style>
</style>