<template>
  <div>
    <!-- <v-navigation-drawer v-model="drawerState" app temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-navigation-drawer
      v-model="show"
      class="elevation-0"
      app
      temporary
      hide-overlay
      width="540px"
      color="transparent"
    >
      <v-card
        color="windows-grey"
        style="opacity: 0.6; position: absolute"
        height="100%"
        width="100%"
      >
      </v-card>
      <v-card color="transparent" elevation="0">
        <v-row
          no-gutters
          class="d-flex flex-column"
          align="center"
          justify="center"
        >
          <v-btn class="me-4 ms-auto" fab x-small depressed color="transparent">
            <v-icon> mdi-dots-horizontal </v-icon>
          </v-btn>
          <h1 class="font-weight-medium mb-6">
            {{ $store.getters.dateNow.hours }}
          </h1>

          <v-row no-gutters class="grid-container-highlight ">
            <v-card class="rounded-lg grid-item-lg pa-3">
              <v-row class="justify-space-between mb-1" no-gutters align="center">
                <h6 class="caption font-weight-bold">TITLE</h6>
                <v-btn class="" x-small icon>
                  <v-icon> mdi-dots-horizontal </v-icon>
                </v-btn>
              </v-row>
              <h6 class="mb-1 caption text-center font-weight-medium">
                <v-icon small color="black">mdi-crosshairs-gps</v-icon> Sydney, Australia
              </h6>
              <v-row class="justify-space-between mb-1" no-gutters>
                <v-row no-gutters class="" align="center">
                  <v-icon size="30" color="amber lighten-1">
                    mdi-circle
                  </v-icon>
                  <h1 class="font-weight-medium">20 C</h1>
                </v-row>
                <h6 class="text-right"><v-icon x-small color="warning">mdi-alert</v-icon> THUNDER<br>ALERT</h6>
              </v-row>
              <v-card class="rounded-sm mb-2" elevation="0" height="90px" width="100%" color="green"> </v-card>
              <a class="black--text"><h6 class="text-center font-weight-medium">See full forecast</h6></a>
            </v-card>
            <v-card class="rounded-lg" height="102px"> KEK </v-card>
            <v-card class="rounded-lg" height="102px"> KEK </v-card>
          </v-row>
        </v-row>
      </v-card>
    </v-navigation-drawer>
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
            //   id:0,
            show: false,
            fullscreen: false,
          },
        }
      },
    },
    // fullscreen: Boolean,
  },
  data: () => ({
    // drawer: true,
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard' },
      { title: 'About', icon: 'mdi-forum' },
    ],
  }),
  computed: {
    show: {
      get() {
        return this.$store.getters['app/windowState'](this.app.id)
      },
      set(value) {
        return this.$store.commit('app/toggleState', { id: this.app.id, value })
        // alert('yeppa')
      },
    },
    drawerState: {
      get() {
        return this.$store.getters.drawerState
      },
      set(v) {
        return this.$store.commit('toggleDrawerState', v)
      },
    },
  },
  created() {
    // console.log(this.$store.getters)
  },
  methods: {},
}
</script>

<style>
.grid-container-highlight {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(220px, auto));
  grid-template-rows: auto;
  row-gap: 12px;
  column-gap: 12px;
  grid-auto-flow: dense;
}

.grid-item-lg {
  grid-row: span 2;
}
</style>

