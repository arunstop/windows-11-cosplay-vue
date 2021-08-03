<template>
  <v-card
    class="mx-1 text-capitalize pa-2 text-break v-btn text-center"
    height="100%"
    max-width="90px"
    link
    elevation="0"
    color="transparent"
    @click="openApp()"
  >
    <div class="d-flex flex-column justify-center align-center">
      <v-icon size="36" :color="app.iconColor">{{ app.icon }}</v-icon>
      <span class="mt-2 font-weight-bold body-2">{{ app.title }}</span>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    app: { type: Object, default: () => {} },
  },
  data: () => ({}),
  methods:{
    openApp(){
      this.$store.dispatch('app/window/openApp', this.app)
    }
  }
}
</script>
<style scoped>
</style>
