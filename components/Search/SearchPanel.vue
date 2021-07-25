<template>
  <v-dialog
    v-model="show"
    hide-overlay
    content-class="search-panel elevation-0"
    scrollable
    width="600px"
  >
    <v-card class="transparent rounded-lg" width="600px" height="600px">
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
      <v-card class="rounded-lg" color="transparent" width="100%" height="100%">
        <v-card-title class="mb-0 pb-0">
          <v-text-field
            v-model="searchKeyword"
            class="mb-4"
            solo
            label="Type here to search"
            placeholder="Type here to search"
            prepend-inner-icon="mdi-magnify"
            flat
            dense
            clearable
            hide-details=""
          >
          </v-text-field>
        </v-card-title>
        <!-- Search result section -->
        <v-list color="transparent" height="500px" style="overflow-y: auto">
          <v-list-item
            v-for="(sar, index) in searchAppResult()"
            :key="index"
            :link="!sar.letter"
          >
            <v-list-item-avatar v-if="!sar.letter" class="ma-0">
              <v-icon size="30">{{ sar.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content class="black--text">
              <v-list-item-title v-if="!sar.letter" class="ps-2">
                {{ sar.title }}
              </v-list-item-title>
              <v-list-item-title v-else class="ms-3 font-weight-bold">
                <h2>{{ sar.title }}</h2>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
            //   id:0,
            show: false,
            fullscreen: false,
          },
        }
      },
    },
  },
  computed: {
    ...mapGetters('app', ['searchAppResult']),
    show: {
      get() {
        return this.$store.getters['app/windowState'](this.app.id)
      },
      set(value) {
        return this.$store.commit('app/toggleState', { id: this.app.id, value })
        // alert('yeppa')
      },
    },
    // searchAppResultLetter() {
    //   const letter = []

    //   let sar = this.searchAppResult()
    //   sar.forEach((appResult, index) => {
    //     if (index < sar.length-1) {
    //       const current = appResult.title.trim().toUpperCase().substring(0, 1)
    //       const next = sar[index+1].title.trim().toUpperCase().substring(0, 1)
    //       if (current !== next) {
    //         letter.push({
    //           title: current,
    //         })
    //       }
    //     }
    //   })
    //   sar = sar.concat(letter)

    //   return sar
    // },
    searchKeyword: {
      get() {
        return this.$store.state.app.keywordStartApp
      },
      set(value) {
        this.$store.dispatch('app/searchApp', { value })
      },
    },
  },
  //   created() {
  //     console.log(this.searchAppResultLetter)
  //   },
}
</script>
<style>
.search-panel {
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
</style>