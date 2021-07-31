<template>
  <v-dialog
    v-model="show"
    hide-overlay
    content-class="search-panel elevation-6"
    scrollable
    width="660px"
    transition="slide-y-reverse-transition"
  >
    <v-card class="transparent rounded-lg" width="660px" height="540px">
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
            autofocus
          >
          </v-text-field>
        </v-card-title>
        <!-- Search result section -->
        <SearchResultList :window-id="app.id" :height="'470px'"/>
      </v-card>
    </v-card>
  </v-dialog>
</template>
<script>

export default {
  props: {
    app: {
      type: Object,
      default: () => {
        return {
        }
      },
    },
  },
  computed: {
    show: {
      get() {
        return this.$store.getters['app/window/windowState'](this.app.id)
      },
      set(value) {
        // return this.$store.commit('app/toggleState', { id: this.app.id, value })
        this.$store.dispatch('app/window/toggleWindow', { id: this.app.id, value })
        this.$store.dispatch('app/searchApp', { value :''})
      },
    },
    searchKeyword: {
      get() {
        return this.$store.state.app.keywordStartApp
      },
      set(value) {
        if (value === null) value = ''
        return this.$store.dispatch('app/searchApp', { value })
      },
    },
  },
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