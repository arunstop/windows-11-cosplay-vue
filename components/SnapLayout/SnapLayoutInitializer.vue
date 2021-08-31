<template>
  <v-card
    class="blur-bg d-flex justify-center align-center"
    elevation="0"
  >
    <v-card class="pa-2 scroll-y" max-height="240px" color="transparent" elevation="0">
      <v-slide-x-reverse-transition class="snap-layout-initializer-menu no-scroll" group hide-on-leave>
      <SnapLayoutInitializerApp
        v-for="sma in nonSnappedWindowList()"
        :key="sma.id"
        :app="sma"
        :snap="snap"
      />
    </v-slide-x-reverse-transition>
    <v-slide-x-reverse-transition hide-on-leave>
        <v-btn  v-if="nonSnappedWindowList().length === 0" class="text-none" outlined color="primary" @click="openSearchPanel(snap.index)">
          <v-icon class="me-2">mdi-microsoft-windows</v-icon>
          Open App
        </v-btn>
    </v-slide-x-reverse-transition>
    </v-card>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    snap: { type: Object, default: () => ({}) },
  },
  computed: {
    ...mapGetters('app/window', ['nonSnappedWindowList']),
  },
  created() {},
  methods:{
    openSearchPanel(index){
      this.$store.dispatch('app/window/openAppById', 'search')
        this.$store.dispatch('app/snap/setSnapInitIndex', index)
      
    }
  }
}
</script>

<style>
.snap-layout-initializer-menu {
  display: grid !important;
  grid-template-columns: repeat(3, auto);
  overflow-y: auto;
  gap: 4px 4px;
}
</style>