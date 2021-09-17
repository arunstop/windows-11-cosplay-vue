<template>
  <WindowFrame :app="app" :snapped="snapped">
    <template #content>
      <component :is="getAppComponent" :app="app"/>
    </template>
  </WindowFrame>
</template>

<script>
export default {
  components: {},
  props: {
    app: {
      type: Object,
      default: () => {},
    },
    snapped: Boolean,
    // fullscreen: Boolean,
  },
  data: () => ({
    //   window: this.$store.state.dialog
  }),
  computed: {
    show: {
      get() {
        return this.$store.getters['windows/window/windowState'](this.app.id)
      },
      set(value) {
        this.$store.dispatch('windows/window/toggleWindow', { id: this.app.id })
      },
    },
    getAppComponent() {
      const pascalizedStr = this.$globals.pascalStr(this.app.titleKebab)
      return () => import(`@/components/Apps/${pascalizedStr}/${pascalizedStr}Index.vue`)
    },
  },
  created() {
    // console.log(this.app)
  },
}
</script>

