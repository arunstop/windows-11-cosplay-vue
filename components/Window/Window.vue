<template>
  <WindowFrame :app="app" :snapped="snapped">
    <template #content>
      content
    </template>
  </WindowFrame>
</template>

<script>
export default {
  props: {
    app: {
      type: Object,
      default: () => {},
    },
    snapped:Boolean,
    // fullscreen: Boolean,
  },
  data: () => ({
    //   window: this.$store.state.dialog
  }),
  computed: {
    show: {
      get() {
        return this.$store.getters['app/window/windowState'](this.app.id)
      },
      set(value) {
        this.$store.dispatch('app/window/toggleWindow', { id: this.app.id })
      },
    },
  },
  created() {
    // console.log(this.app)
  },
}
</script>

