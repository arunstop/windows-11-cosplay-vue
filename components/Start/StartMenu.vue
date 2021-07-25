<template>
  <v-dialog v-model="show" hide-overlay content-class="start-menu elevation-0" scrollable width="600px">
    <v-card class="transparent rounded-lg" width="600px" >
      <v-card
        flat
        tile
        width="100%"
        height="100%"
        class="ma-0 pa-0 text-center windows-grey rounded-lg"
        style="position: absolute; opacity: 0.9"
        elevation="0"
      >
      </v-card>
      <v-card class="transparent rounded-lg px-3" color="transparent" width="100%" height="100%">
        
          <v-card-text class="py-8">
            <!-- Search bar -->
            <v-row
              no-gutters
              class="px-6 d-flex justify-space-between black--text"
              align="center"
            >
              <h4>Pinned</h4>
              <v-chip class="font-weight-bold" link color="white" small label>
                All apps
                <v-icon class="ms-1" size="24px" color="black">
                  mdi-chevron-right
                </v-icon>
              </v-chip>
            </v-row>
            <!-- Apps -->
            <v-row class="mt-2 grid-container" no-gutters>
              <StartApp
                v-for="(sma, index) in startMenuApps"
                :key="index"
                :app="sma"
              />
            </v-row>

            <v-row
              no-gutters
              class="mt-4 px-6 d-flex justify-space-between black--text"
              align="center"
            >
              <h4>Recomended</h4>
              <v-chip class="font-weight-bold" link color="white" small label>
                More
                <v-icon class="ms-1" size="24px" color="black">
                  mdi-chevron-right
                </v-icon>
              </v-chip>
            </v-row>
            <!-- Recent Items -->
            <v-row class="mt-2 grid-container2" no-gutters>
              <StartRecentItem
                v-for="(ri, index) in $store.state.app.recentItemList"
                :key="index"
                :item="ri"
              />
            </v-row>
          </v-card-text>

          <v-divider />
          <!-- Footer -->
          <v-card-actions class="py-1">
            <v-row
              no-gutters
              class="d-flex justify-space-between"
              align="center"
            >
              <v-btn
                class="rounded-lg transparent px-2 py-6 text-capitalize"
                depressed
              >
                <v-list-item-avatar size="30">
                  <v-img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'">
                  </v-img>
                </v-list-item-avatar>
                <v-list-item-content> Noob Programmer </v-list-item-content>
              </v-btn>

              <v-menu top offset-y :close-on-content-click="true">
                <template #activator="{ on, attr }">
                  <v-btn depressed icon fab v-bind="attr" v-on="on">
                    <v-icon>mdi-power</v-icon>
                  </v-btn>
                </template>
                <v-list class="py-0">
                  <StartPowerItem
                    v-for="(pi, index) in $store.state.power.itemList"
                    :key="index"
                    :item="pi"
                  />
                </v-list>
              </v-menu>
            </v-row>
          </v-card-actions>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    value: Boolean,
    app: {
      type: Object,
      default: () => {
        return {
          window: {
            show: true,
            fullscreen: false,
          },
        }
      },
    },
    // fullscreen: Boolean,
  },
  data: () => ({}),
  computed: {
    ...mapGetters('app', ['startMenuApps', 'cutString20']),
    show: {
      get() {
        return this.$store.getters['app/windowState'](this.app.id)
      },
      set(value) {
        return this.$store.commit('app/toggleState', { id: this.app.id, value })
        // alert('yeppa')
      },
    },
    windowActions() {
      return [
        {
          icon: 'mdi-window-minimize',
          label: 'Minimize',
          action: () => {
            this.$store.dispatch('toggleWindow', { id: this.app.id })
          },
        },
        {
          icon: this.app.window.fullscreen
            ? 'mdi-window-restore'
            : 'mdi-window-maximize',
          label: this.app.window.fullscreen ? 'Restore' : 'Maximize',
          action: () => {
            this.$store.dispatch('toggleFullscreen', { id: this.app.id })
          },
        },
        {
          icon: 'mdi-close-thick',
          label: 'Close',
          type: 'close',
          action: () => {
            this.$store.dispatch('closeApp', { id: this.app.id })
          },
        },
      ]
    },
  },
  created() {
    // console.log(this.app)
  },
  method: {
    showSearchSection(v) {
      alert(v)
    },
  },
}
</script>

<style>
/* @import './assets/styles/yourstyles.css'; */
.start-menu {
  align-items: center;
  display: flex;
  justify-content: center;
  /* margin-left: auto; */
  position: fixed;
  bottom: 0;
  transition: 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;
  width: 100%;
  z-index: 6;
  outline: none;
  overflow-y: hidden;
  margin-bottom: 42px;
}

.grid-container {
  display: grid !important;
  grid-template-columns: repeat(6, auto);
}

.grid-container2 {
  display: grid !important;
  grid-template-columns: repeat(2, 42%);
  column-gap: 16%;
  justify-content: center;
}
</style>

