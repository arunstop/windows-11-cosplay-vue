<template>
  <v-dialog
    v-model="show"
    hide-overlay
    content-class="start-menu elevation-6"
    scrollable
    width="600px"
    transition="slide-y-reverse-transition"
  >
    <v-card class="transparent rounded-lg" width="600px">
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
      <v-card
        class="transparent rounded-lg px-3"
        color="transparent"
        width="100%"
        height="100%"
      >
        <v-fade-transition>
          <v-card-text v-if="showAllApps" class="py-8">
            <StartSectionLabel
              :title="'All apps'"
              :icon="{ position: 'l', icon: 'mdi-chevron-left' }"
              :action="{
                label: 'Back',
                action: () => {
                  showAllApps = false
                },
              }"
            />
            <SearchResultList style="margin-top: 22px" :height="'400px'" />
          </v-card-text>

          <v-card-text v-if="!showAllApps" class="py-8">
            <StartSectionLabel
              :title="'Pinned'"
              :icon="{ position: 'r', icon: 'mdi-chevron-right' }"
              :action="{
                label: 'All apps',
                action: () => {
                  showAllApps = true
                },
              }"
            />
            <!-- Apps -->
            <v-row class="mt-2 grid-container" no-gutters>
              <StartApp
                v-for="(sma, index) in startMenuApps"
                :key="index"
                :app="sma"
              />
            </v-row>

            <StartSectionLabel
              class="mt-4"
              :title="'Recomended'"
              :icon="{ position: 'r', icon: 'mdi-chevron-right' }"
              :action="{
                label: 'More',
                action: () => {},
              }"
            />
            <!-- Recent Items -->
            <v-row class="mt-2 grid-container2" no-gutters>
              <StartRecentItem
                v-for="(ri, index) in $store.state.app.recentItemList"
                :key="index"
                :item="ri"
              />
            </v-row>
          </v-card-text>
        </v-fade-transition>

        <v-divider />
        <!-- Footer -->
        <v-card-actions class="py-1">
          <v-row no-gutters class="d-flex justify-space-between" align="center">
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
                  v-for="(pi, index) in $store.state.power.powerItemList"
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
    app: {
      type: Object,
      default: () => {
        return {}
      },
    },
    // fullscreen: Boolean,
  },
  data: () => ({
    showAllApps: false,
  }),
  computed: {
    ...mapGetters('app', ['startMenuApps', 'cutString20']),
    show: {
      get() {
        return this.$store.getters['app/windowState'](this.app.id)
      },
      set(value) {
        // return this.$store.commit('app/toggleState', { id: this.app.id, value })
        this.$store.dispatch('app/toggleWindow', { id: this.app.id, value })
        this.showAllApps=false
      },
    },
  },
  created() {
    // console.log(this.app)
  },
  method: {},
}
</script>

<style>
/* @import './assets/styles/yourstyles.css'; */
.start-menu {
  align-items: center;
  display: flex;
  justify-content: center;
  /* margin-left: auto; */
  position: absolute;
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

