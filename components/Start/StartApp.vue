<template>
    <v-btn class="mx-1 transparent text-capitalize pa-2 btn-app" height="100%" depressed @click="openApp(app)">
    <div class="d-flex flex-column justify-center align-center">
      <v-icon size="30" :color="app.iconColor">{{ app.icon }}</v-icon>
      <h5 class="mt-2">{{ $globals.cutStr(app.title, 10) }}</h5>
    </div>
  </v-btn>
</template>
<script>
export default {
    props: {
    app: {
      type: Object,
      default: () => {},
    },
     windowId: { type: Number, default: 0 },
  },
  computed:{
    
  },methods:{
    openApp(app) {
      // console.log(this.windowId)
      this.$store.dispatch('app/window/toggleWindow', { id: this.windowId, value:false })
      this.$store.dispatch('app/window/openApp', app)
    },
  }
}
</script>

<style>

</style>