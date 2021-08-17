<template>
  <v-app v-if="$store.state.power.status === 'LOGGED_ON'" :style="bgStyle">
    <v-main>
        <Nuxt />
    </v-main>
    <Taskbar />
  </v-app>
  <v-app
    v-else-if="$store.state.power.status === 'RESTARTING'"
    class="logged-off"
  >
    <div class="d-flex flex-column justify-center align-center ma-auto">
      <RollerLoader :color="'#000000'" :size="64" />
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
    <v-card v-show="authScreen" class="lock-screen blur-bg" color="transparent">

      <v-card
        class="d-flex justify-space-between pa-4"
        color="transparent"
        height="100%"
        width="100%"
      >
        <!-- Left -->
        <div class="d-flex flex-column flex-column-reverse">
          <v-list color="transparent" dense>
            <v-list-item
              v-for="(user, index) in $store.state.user.userList"
              :key="index"
              class="mt-2 px-2 rounded-lg"
              :class="user.active ? 'primary' : ''"
              link
              @click="activateUser(user.email)"
            >
              <v-list-item-avatar class="my-1" size="36">
                <v-img :src="user.image" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="black--text text--darken-2" :class="user.active ? 'white--text' : ''">
                  <h5>{{ user.name }}</h5>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <!-- Middle -->
        <div class="d-flex flex-column justify-center align-center">
          <v-avatar size="140">
            <v-img :src="activatedUser.image"> </v-img>
          </v-avatar>
          <h3 class="mt-3 white--text">{{ activatedUser.name }}</h3>

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
              @keydown.enter="logOn()"
            >
              <template v-if="pin" #append>
                <v-btn icon small>
                  <v-icon size="18"> mdi-fingerprint </v-icon>
                </v-btn>
                <v-btn icon small>
                  <v-icon size="18" @click="logOn()"> mdi-arrow-right </v-icon>
                </v-btn>
              </template>
            </v-text-field>
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
        <!-- Right -->
        <div class="d-flex flex-column flex-column-reverse">
          <div>
            <v-row no-gutters justify="end" align="center">
              <v-btn
                class="ms-1 rounded-lg black--text h1 py-4"
                color="transparent"
                elevation="0"
                x-small
              >
                <h3>ENG</h3>
              </v-btn>
              <v-btn
                v-for="(option, index) in authScreenOptionList"
                :key="index"
                class="ms-1 rounded-lg"
                color="black darken-2"
                elevation="0"
                icon
                small
              >
                <v-icon size="18px">{{ option.icon }}</v-icon>
              </v-btn>
            </v-row>
          </div>
        </div>
      </v-card>
    </v-card>
  </v-app>
</template>

<script>
import { RollerLoader } from 'vue-spinners-css'
import { mapGetters } from 'vuex'

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
    pin: '',
    authScreenOptionList: [
      { icon: 'mdi-lock-alert' },
      { icon: 'mdi-wifi' },
      { icon: 'mdi-human' },
      { icon: 'mdi-power-standby' },
    ],
  }),
  computed: {
    ...mapGetters('user', ['activatedUser']),
  },
  created() {
    // this.$localStorage.set('test', {key:'value'})
    if (this.$localStorage.has('user')) {
      this.$store.dispatch('user/logOn', this.$localStorage.get('user'))
    }
  },
  methods: {
    showAuthScreen() {
      this.authScreen = true
      setTimeout(() => {
        this.authScreen = false
        // alert(this.authScreen  )
      }, 120000)
    },
    logOn() {
      this.loggingOn = true
      setTimeout(() => {
        this.$store.dispatch('user/logOn', this.activatedUser)
        this.authScreen = false
        this.loggingOn = false
      }, 3000)
    },
    activateUser(email) {
      this.$store.dispatch('user/activateUser', email)
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
