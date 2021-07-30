<template>
  <v-card
    class="d-flex justify-center align-center"
    color="transparent"
    elevation="0"
  >
    <v-card
      flat
      width="100%"
      class="ma-0 pa-0 text-center white rounded-lg"
      height="100%"
      style="position: absolute; opacity: 0.8"
      elevation="0"
    >
    </v-card>
    <v-card class="pa-2">
      <v-card
        class="snap-layout-initializer-menu"
        max-height="200px"
        color="transparent"
        elevation="0"
      >
        <SnapLayoutInitializerApp
          v-for="(sma, index) in NonSnappedWindowList()"
          :key="index"
          :app="sma"
          :snap="snap"
        />
      </v-card>
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
    ...mapGetters('app/window', ['NonSnappedWindowList']),
  },
  created() {},
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