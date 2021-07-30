<template>
  <v-btn
    class="transparent text-capitalize pa-2"
    height="100%"
    depressed
    @click="openSnapApp()"
  >
    <div class="d-flex flex-column justify-center align-center">
      <v-icon size="30" :color="app.iconColor">{{ app.icon }}</v-icon>
      <h5 class="mt-2">{{ cutString20(app.title) }}</h5>
    </div>
  </v-btn>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    snap: { type: Object, default: () => ({}) },
    app: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters('app', ['cutString20']),
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