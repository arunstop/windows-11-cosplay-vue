<template>
  <v-dialog
    v-model="show"
    hide-overlay
    content-class="start-menu elevation-6"
    scrollable
    width="600px"
    transition="slide-y-reverse-transition"
  >
    <v-card class="blur-bg rounded-lg" width="600px">
      <v-card
        class="transparent rounded-lg px-3"
        color="transparent"
        width="100%"
        height="100%"
      >
       
        <v-slide-x-transition hide-on-leave leave-absolute group>
           <SearchBar :key="'search-bar'" class="pt-4" :app="app" />
          <v-card-text
            v-if="showAllApps"
            :key="'StartMenuAllApps'"
            class="pb-6 pt-0"
          >
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
            <SearchResultList
              :window-id="app.id"
              style="margin-top: 22px"
              :height="'400px'"
            />
          </v-card-text>

          <v-card-text
            v-if="!showAllApps"
            :key="'StartMenuPinnedApps'"
            class="pb-6 pt-0"
          >
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
            <v-row class="mt-2 grid-container scroll-y" no-gutters style="height:210px !important;">
              <StartApp
                v-for="(sma, index) in getPinnedAppList()"
                :key="index"
                :app="sma"
                :window-id="app.id"
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
        </v-slide-x-transition>

        <v-divider />
        <!-- Footer -->
        <v-card-actions class="py-1">
          <v-row no-gutters class="d-flex justify-space-between" align="center">
            <v-btn
              class="rounded-lg transparent px-2 py-6 text-capitalize"
              depressed
            >
              <v-list-item-avatar size="30">
                <v-img :src="loggedOnUser.image"> </v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <h5>{{ loggedOnUser.name }}</h5>
                </v-list-item-title>
              </v-list-item-content>
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
import { mapGetters, mapState } from 'vuex'

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
    ...mapGetters('app', ['getPinnedAppList']),
    ...mapState('user', ['loggedOnUser']),
    show: {
      get() {
        return this.$store.getters['app/window/windowState'](this.app.id)
      },
      set(value) {
        // return this.$store.commit('app/toggleState', { id: this.app.id, value })
        this.$store.dispatch('app/window/toggleWindow', {
          id: this.app.id,
          value,
        })
        this.showAllApps = false
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

