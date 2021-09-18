<template>
  <v-dialog
    v-model="show"
    hide-overlay
    content-class="search-panel elevation-6"
    scrollable
    width="660px"
    transition="slide-y-reverse-transition"
  >
    <v-card class="blur-bg rounded-lg" width="660px" height="540px">
      <v-card class="rounded-lg" color="transparent" width="100%" height="100%">
        <v-card-title class="mb-0 pb-0">
          <SearchBar/>
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
        return this.$store.getters['windows/window/windowState'](this.app.id)
      },
      set(value) {
        // return this.$store.commit('windows/toggleState', { id: this.app.id, value })
        this.$store.dispatch('windows/window/toggleWindow', { id: this.app.id, value })
        this.$store.dispatch('windows/searchApp', '')
        this.$store.dispatch('windows/snap/setSnapInitIndex', null)
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