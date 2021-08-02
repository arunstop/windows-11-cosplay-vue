<template>
  <v-btn
    class="text-capitalize pa-2"
    height="100%"
    outlined
    color="primary"
    depressed
    @click="openSnapApp()"
  >
    <div class="d-flex flex-column justify-center align-center">
      <v-icon size="30" :color="app.iconColor">{{ app.icon }}</v-icon>
      <h5 class="mt-2">{{ $globals.cutStr(app.title,20) }}</h5>
    </div>
  </v-btn>
</template>
<script>

export default {
  props: {
    snap: { type: Object, default: () => ({}) },
    app: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    
  },
  methods: {
    openSnapApp() {
    //     console.log({
    //     type: this.snap.type,
    //     index: this.snap.index,
    //     app: this.app,
    //   })
      this.$store.dispatch('app/snap/addSnap', {
        type: this.snap.type,
        index: this.snap.index,
        app: this.app,
      })
    },
  },
}
</script>