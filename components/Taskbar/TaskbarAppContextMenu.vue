<template>
  <v-list class="pa-0 blur-bg rounded-lg">
    <v-list-item
      v-for="option in getOptionList(app)"
      :key="option.label"
      link
      dense
      class="px-2 rounded-lg"
      @click="option.action(app)"
    >
      <v-list-item-icon class="me-2">
        <v-icon v-if="option.id !== 'app'" color="black">
          {{ option.icon }}
        </v-icon>
        <v-icon v-else :color="app.iconColor">{{ app.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle class="black--text font-weight-regular">
        {{ option.label }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    app: { type: Object, default: () => {} },
  },
  computed: {
    ...mapGetters('windows/', ['getTaskbarappOptionList']),
  },
  methods: {
    getOptionList(app) {
      if (app.type !== 'window') return
      const optionList = this.$globals.cloneState(
        this.getTaskbarappOptionList()
      )
      // console.log(app)

      optionList.forEach((option) => {
        // change title
        if (option.id === 'app') {
          option.label = app.title
        }
        // hide "pin to taskbar option"
        if (app.taskbar === true && option.id === 'pin') {
          option.show = false
        }
        // hide "unpin to taskbar option"
        else if (app.taskbar === false && option.id === 'unpin') {
          option.show = false
        }
        if (app.taskbar === true && app.window.show === false && option.id === 'close') {
          option.show = false
        }
      })
      const activeOptionList = optionList.filter(
        (option) => option.show === true
      )
      activeOptionList.forEach((option) => {
        if (option.id === 'app') {
          Object.assign(option, {
            action: (app2) => {
              this.$store.dispatch('windows/window/openApp', app2)
            },
          })
        } else if (option.id === 'unpin') {
          Object.assign(option, {
            action: (app2) => {
              this.$store.dispatch('windows/unpinTaskbar', app2)
            },
          })
        } else if (option.id === 'pin') {
          Object.assign(option, {
            action: (app2) => {
              this.$store.dispatch('windows/pinTaskbar', app2)
            },
          })
        } else if (option.id === 'close') {
          Object.assign(option, {
            action: (app2) => {
              this.$store.dispatch('windows/window/closeApp', app2)
            },
          })
        }
      })
      return activeOptionList
    },
  },
}
</script>