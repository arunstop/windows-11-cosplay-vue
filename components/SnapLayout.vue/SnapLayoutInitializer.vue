<template>
  <v-card
    class="d-flex justify-center align-center"
    color="transparent"
    elevation="0"
  >
    <v-card
      flat
      class="blur-background rounded-lg"
      height="100%"
      elevation="0"
    />

    <v-card
      class="snap-layout-initializer-menu pa-2"
      max-height="200px"
      color="transparent"
      elevation="0"
    >
      <SnapLayoutInitializerApp
        v-for="(sma, index) in nonSnappedWindowList()"
        :key="index"
        :app="sma"
        :snap="snap"
      />

      <div v-if="nonSnappedWindowList().length === 0">
        <v-btn class="text-none" outlined color="primary">
          <v-icon class="me-2">mdi-microsoft-windows</v-icon>
          Open App
        </v-btn>
      </div>
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