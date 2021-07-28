<template>
  <v-app v-if="$store.state.power.status === 'LOGGED_ON'" :style="bgStyle">
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Taskbar />
  </v-app>
  <v-app
    v-else-if="$store.state.power.status === 'RESTARTING'"
    class="logged-off"
  >
    <div class="d-flex flex-column justify-center align-center ma-auto">
      <RollerLoader :color="'#000000'" size="64" />
      <h3>Restarting</h3>
    </div>
  </v-app>
  <v-app
    v-else-if="$store.state.power.status === 'TURNING_OFF'"
    class="logged-off"
  >
    <div class="d-flex flex-column justify-center align-center ma-auto">
      <RollerLoader :color="'#000000'" :size="64" />
      <h3>Shutting down</h3>
    </div>
  </v-app>
  <v-app
    v-else-if="$store.state.power.status === 'LOGGING_OFF'"
    class="logged-off"
  >
    <div class="d-flex flex-column justify-center align-center ma-auto">
      <RollerLoader :color="'#000000'" :size="64" />
      <h3>Logging Off</h3>
    </div>
  </v-app>
  <v-app
    v-else-if="$store.state.power.status === 'LOGGED_OFF'"
    :style="bgStyle"
  >
    <v-card
      v-show="!authScreen"
      class="lock-screen"
      @click.self="showAuthScreen()"
    >
      <div
        class="d-flex flex-column justify align-center mx-auto white--text"
        style="margin-top: 60px !important"
      >
        <b style="font-size: 420% !important">{{ getHours() }}</b>
        <h3>{{ getDayMonthDate() }}</h3>
      </div>
      <v-row
        no-gutters
        class="lock-screen-btn-img1 flex-column"
        justify="center"
        align="center"
      >
        <v-card class="d-flex" link color="transparent" height="30" width="30">
          <v-card
            style="position: absolute; opacity: 0.6"
            color="black"
            height="30"
            width="30"
          ></v-card>
          <v-icon class="ma-auto" color="white">mdi-magnify</v-icon>
        </v-card>
        <span class="mt-2 white--text font-weight-regular caption"
          >Like the image that you see?</span
        >
      </v-row>
      <v-row
        no-gutters
        class="lock-screen-btn-img2 flex-column"
        justify="center"
        align="center"
      >
        <v-card class="d-flex" link color="transparent" height="30" width="30">
          <v-card
            style="position: absolute; opacity: 0.6"
            color="black"
            height="30"
            width="30"
          ></v-card>
          <v-icon class="ma-auto" color="white">mdi-camera</v-icon>
        </v-card>
        <span class="mt-2 white--text font-weight-regular caption"
          >Like the image that you see?</span
        >
      </v-row>
      <v-row
        no-gutters
        class="lock-screen-btn-img3 flex-column"
        justify="center"
        align="center"
      >
        <v-card class="d-flex" link color="transparent" height="30" width="30">
          <v-card
            style="position: absolute; opacity: 0.6"
            color="black"
            height="30"
            width="30"
          ></v-card>
          <v-icon class="ma-auto" color="white">mdi-magnify</v-icon>
        </v-card>
        <span class="mt-2 white--text font-weight-regular caption"
          >Like the image that you see?</span
        >
      </v-row>
    </v-card>
    <v-card v-show="authScreen" class="lock-screen" color="transparent">
      <v-card
        class="d-flex justify-space-between"
        color="windows-grey"
        height="100%"
        width="100%"
        style="position: absolute; opacity: 0.6"
      >
      </v-card>
      <v-card
        class="d-flex justify-space-between"
        color="transparent"
        height="100%"
        width="100%"
      >
        <div><h1>Noob Programmer</h1></div>
        <div class="d-flex flex-column justify-center align-center">
          <v-avatar size="140">
            <v-img :src="'https://i.pravatar.cc/180'"> </v-img>
          </v-avatar>
          <h3 class="mt-3 white--text">Noob Programmer</h3>

          <div v-if="!loggingOn" class="text-center">
            <v-text-field
            v-model="pin"
              class="mt-3"
              label="PIN"
              type="password"
              solo
              dark
              dense
              hide-details
              @keydown.enter="powerAction()"
            />
            <v-btn class="mt-3 text-none rounded-lg white--text" text>
              I forgot my PIN
            </v-btn>
          </div>

          <div
            v-else
            class="mt-3 d-flex text-center align-center"
            style="margin-bottom: 56px"
          >
            <RollerLoader :color="'#ffffff'" :size="30" />
            <h3 class="ms-3 white--text">Welcome</h3>
          </div>
        </div>
        <div><h1>Noob Programmer</h1></div>
      </v-card>
    </v-card>
  </v-app>
</template>

<script>
import { RollerLoader } from 'vue-spinners-css'

export default {
  components: {
    RollerLoader,
  },
  data: () => ({
    bgStyle: {
      background: `url(${require('@/assets/img/bg.jpg')}) no-repeat !important`,
      backgroundSize: `cover`,
    },
    authScreen: false,
    loggingOn: false,
    pin: ''
  }),
  computed: {},
  created() {
    // this.$localStorage.set('test', {key:'value'})
    if(this.$localStorage.has('user')){
      this.$store.dispatch('power/logOn', this.$localStorage.get('user'))
    }
  },
  methods: {
    showAuthScreen() {
      this.authScreen = true
      setTimeout(() => {
        this.authScreen = false
        // alert(this.authScreen  )
      }, 15000)
    },
    powerAction() {
      this.loggingOn = true
      setTimeout(() => {
        this.$store.dispatch('power/logOn', {username:'Anonymous', pin:this.pin, status :'LOGGED_ON'})
        this.authScreen = false
        this.loggingOn = false
      }, 3000)
    },
    getHours() {
      return this.$moment().format('HH:mm')
    },
    getDayMonthDate() {
      return this.$moment().format('dddd, MMMM DD')
    },
  },
}
</script>
<style>
html {
  overflow: hidden !important;
}

.lock-screen {
  flex: 1 1 auto;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100%;
  position: relative;
  background-color: transparent !important;
}

.logged-off {
  background: #e0ebfd;
}

.lock-screen-btn-img1 {
  position: absolute;
  left: 0;
  margin-left: 60px !important;
  margin-top: 30px !important;
}

.lock-screen-btn-img2 {
  position: absolute;
  right: 0;
  margin-right: 60px !important;
  margin-top: 30px !important;
}

.lock-screen-btn-img3 {
  position: absolute;
  left: 50%;
  top: 54%;
  transform: translate(-50%, 0);
}
</style>
