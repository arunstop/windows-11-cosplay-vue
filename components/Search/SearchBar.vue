<template>
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
    @input="openSearchPanel()"
  >
  </v-text-field>
</template>

<script>
export default {
  props: {
    app: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    searchKeyword: {
      get() {
        return this.$store.state.windows.searchAppKeyword
      },
      set(value) {
        if (value === null) value = ''
        return this.$store.dispatch('windows/searchApp',  value )
      },
    },
  },
  methods: {
    openSearchPanel() {
      if (!this.app?.id) return
      this.$store.dispatch('windows/window/toggleWindow', {
        id: this.app.id,
        value: false,
      })
      this.$store.dispatch('windows/window/openAppById', 'search')
      // this.$store.dispatch('windows/window/openAppById', 'search')
    },
  },
}
</script>

<style>
</style>