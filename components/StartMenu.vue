<template>
  <div class="start-menu">
    <v-card class="transparent rounded-lg" width="600px">
      <v-card
        flat
        tile
        width="100%"
        height="100%"
        class="ma-0 pa-0 text-center windows-grey rounded-lg"
        style="position: absolute; opacity: 0.99"
        elevation="9"
      >
      </v-card>
      <v-card class="transparent rounded-lg">
        <v-card-text class="px-6">
          <!-- Search bar -->
          <v-text-field
            solo
            label="Type here to search"
            placeholder="Type here to search"
            prepend-inner-icon="mdi-magnify"
            flat
            dense
          ></v-text-field>
          <!-- Apps -->
          <v-row
            no-gutters
            class="d-flex justify-space-between black--text"
            align="center"
          >
            <h4>Pinned</h4>
            <v-chip link color="white" small label>
              <h4>
                All apps
                <v-icon class="ms-1" size="24px" color="black">
                  mdi-chevron-right
                </v-icon>
              </h4>
            </v-chip>
          </v-row>
          <v-row class="mt-2 grid-container" no-gutters>
            <v-btn
              v-for="(ai, index) in appItems"
              :key="index"
              class="mx-1 transparent text-capitalize pa-2"
              height="100%"
              depressed
            >
              <div class="d-flex flex-column justify-center align-center">
                <v-icon size="30">{{ ai.icon }}</v-icon>
                <h6 class="mt-2 font-weight-bold">{{ ai.label }}</h6>
              </div>
            </v-btn>
          </v-row>

          <v-row
            no-gutters
            class="mt-4 d-flex justify-space-between black--text"
            align="center"
          >
            <h4>Recomended</h4>
          </v-row>
          <v-row class="mt-2 grid-container2" no-gutters>
            <v-btn
              v-for="(ai, index) in recentItems"
              :key="index"
              class="mmx-1 transparent text-capitalize pa-2"
              height="100%"
              depressed
            >
              <div class="d-flex flex-column justify-center align-center">
                <v-icon size="30">{{ ai.icon }}</v-icon>
                <h6 class="mt-2">{{ ai.label }}</h6>
              </div>
            </v-btn>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions class="px-6">
          <v-row no-gutters class="d-flex justify-space-between" align="center">
            <v-btn class="rounded-lg transparent px-2 py-6" depressed>
              <v-list-item-avatar>
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
              <v-list>
                <v-list-item
                  v-for="(pi, index) in powerItems"
                  :key="index"
                  link
                >
                  <v-icon class="me-2">{{ pi.icon }}</v-icon>
                  <span>{{ pi.label }}</span>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-card>
  </div>
</template>

<script>
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
  data: () => ({
    powerItems: [
      { icon: 'mdi-lock', label: 'Lock' },
      { icon: 'mdi-logout-variant', label: 'Log Off' },
      { icon: 'mdi-swap-horizontal', label: 'Switch User' },
      { icon: 'mdi-restart', label: 'Restart' },
      { icon: 'mdi-sleep', label: 'Hibernate' },
      { icon: 'mdi-power', label: 'Shutdown' },
    ],
    appItems: [
      { icon: 'mdi-microsoft-edge', label: 'Edge' },
      { icon: 'mdi-microsoft-word', label: 'Word' },
      { icon: 'mdi-microsoft-powerpoint', label: 'PowerPoint' },
      { icon: 'mdi-email-outline', label: 'Mail' },
      { icon: 'mdi-check-outline', label: 'To Do' },
      { icon: 'mdi-cart', label: 'Microsoft Store' },
      { icon: 'mdi-image', label: 'Photos' },
      { icon: 'mdi-cellphone', label: 'Your Phone' },
      { icon: 'mdi-scissors-cutting', label: 'Snipping Tool' },
      { icon: 'mdi-twitter', label: 'Twitter' },
      { icon: 'mdi-skype', label: 'Skype' },
      { icon: 'mdi-microsoft-xbox', label: 'Xbox' },
      { icon: 'mdi-whatsapp', label: 'WhatsApp' },
      { icon: 'mdi-microsoft-excel', label: 'Excel' },
      { icon: 'mdi-spotify', label: 'Spotify' },
      { icon: 'mdi-microsoft-visual-studio-code', label: 'VS Code' },
      { icon: 'mdi-github', label: 'Github' },
      { icon: 'mdi-discord', label: 'Discord' },
    ],
    recentItems: [
      { icon: 'mdi-microsoft-edge', label: 'Edge' },
      { icon: 'mdi-microsoft-word', label: 'Word' },
      { icon: 'mdi-microsoft-powerpoint', label: 'PowerPoint' },
      { icon: 'mdi-email-outline', label: 'Mail' },
      { icon: 'mdi-check-outline', label: 'To Do' },
      { icon: 'mdi-cart', label: 'Microsoft Store' },
    ],
  }),
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$store.dispatch('toggleWindow', { id: this.app.id })
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
}
</script>

<style>
/* @import './assets/styles/yourstyles.css'; */
.start-menu {
  align-items: center;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  bottom: 0;
  transition: 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;
  width: 100%;
  z-index: 6;
  outline: none;
  margin-bottom: 42px;
}

.grid-container {
  display: grid !important;
  grid-template-columns: auto auto auto auto auto auto;
}

.grid-container2 {
  display: grid !important;
  grid-template-columns: auto auto;
  
}
</style>

