<template>
  <v-card flat rounded="0" color="transparent">
    <v-card-text class="d-flex flex-column no-gutters">
      <v-hover v-slot="{ hover }" >
        <v-list-item class="pa-3 pb-1" style="min-height: 20px !important">
          <v-list-item-content class="pa-0">
            <v-list-item-title class="d-flex align-center">
              <v-icon class="me-1" size="18px" color="red">
                {{ notif.app.icon }}
              </v-icon>
              <h5 class="black--text font-weight-medium">
                {{ notif.app.name }}
              </h5>
              <v-fade-transition>
                <div class="ms-auto" :class="(hover ? 'd-flex' : 'd-none')">
                  <v-menu>
                    <template #activator="{ on, attrs }">
                      <v-btn class="ms-1" icon x-small v-bind="attrs" v-on="on">
                        <v-icon v-text="'mdi-cog'" />
                      </v-btn>
                    </template>
                    <v-list class="pa-0">
                      <v-list-item
                        v-for="(option, index) in getNotifOptionList(notif.app)"
                        :key="index"
                        dense
                        link
                      >
                        <v-list-item-icon class="mr-2">
                          <v-icon v-text="option.icon" />
                        </v-list-item-icon>
                        <v-list-item-subtitle v-text="option.label" />
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <v-btn
                    class="ms-1"
                    icon
                    x-small
                    @click="removeNotifByApp(notif.app)"
                  >
                    <v-icon v-text="'mdi-close-thick'" />
                  </v-btn>
                </div>
              </v-fade-transition>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-hover>

      <div class="d-flex flex-column">
        <v-slide-x-reverse-transition group>
          <NotificationSubItem
            v-for="(n, index) in notif.notifList"
            :key="n.header"
            :notif="n"
            :last="index + 1 === notif.notifList.length || showCount === 1"
            :count="notif.notifList.length"
            :show="index < showCount"
          />
          <div :key="notif.app.name">
            <v-btn
              v-if="showCount === 1"
              label
              small
              class="ms-4 mb-3 text-none"
              style="height: 20px !important"
              color="windows-grey"
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
import {mapGetters} from 'vuex'

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
  computed:{
...mapGetters('user/notification', ['getNotifOptionList'])
  },
  methods: {
    getMoreNotifLabel(notifCount) {
      const s = notifCount - 1 === 1 ? '' : 's'
      return `+${notifCount - 1} notification${s}`
    },
    showAllNotif(notifCount) {
      this.showCount = notifCount
    },
    removeNotifByApp(app) {
      this.$store.dispatch('user/notification/removeNotifByApp', app)
    },
  },
}
</script>

<style scoped>
</style>