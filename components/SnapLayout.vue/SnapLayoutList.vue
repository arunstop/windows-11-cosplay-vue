<template>
  <div
    v-if="snapLayout.type"
    class="snap-layout"
    :class="'grid-container-snap-layout-' + snapLayout.type"
  >
    <SnapLayoutItem
      v-for="(app, index) in snapLayout.appList"
      :key="index"
      :app="app"
      :initializer="app.initializer"
      :snap="{index:app.index, type:snapLayout.type}"
    />
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    snap: { type: Object, default: () => ({}) },
  },
  computed: {
    ...mapState('app/snap', ['snapLayout', 'snapLayoutTemplate']),
    ...mapGetters('app/window', ['snappedWindowList']),
  },

  created() {
    // console.log(this.$store.getters)
  },
}
</script>
<style>
.snap-layout {
  right: 0;
  top: 0;
  position: fixed !important;
  height: 94vh !important;
  width: 100% !important ;
  z-index: 0;
}

.grid-container-snap-layout-cols-50-50 {
  display: grid !important;
  grid-template-columns: repeat(2, 50vw);
  column-gap: 2px;
}
.grid-container-snap-layout-cols-66-34 {
  display: grid !important;
  grid-template-columns: calc(100vw * (66 / 100)) calc(100vw * (34 / 100));
  column-gap: 2px;
}
.grid-container-snap-layout-cols-33-34-33 {
  display: grid !important;
  grid-template-columns: calc(100vw * (33 / 100)) calc(100vw * (34 / 100)) calc(
      100vw * (33 / 100)
    );
  column-gap: 2px;
}
.grid-container-snap-layout-col-50-col-50-rows-50-50 {
  display: grid !important;
  grid-template-columns: repeat(2, 49.95vw);
  /* grid-template-rows: 10px 10px; */
  grid-template-rows: repeat(2, 46.85vh);

  column-gap: 2px;
  row-gap: 2px;
}
.grid-container-snap-layout-col-50-col-50-rows-50-50 > div:first-child {
  grid-row: span 2;
  height: auto !important;
}

.grid-container-snap-layout-cols-50-rows-50 {
  display: grid !important;
  grid-template-columns: repeat(2, 49.95vw);
  grid-template-rows: repeat(2, 46.85vh);
  column-gap: 2px;
  row-gap: 2px;
}

.grid-container-snap-layout-cols-20-30-20 {
  display: grid !important;
  grid-template-columns: calc(99.8vw * (25 / 100)) calc(99.8vw * (50 / 100)) calc(
      99.8vw * (25 / 100)
    );
  /* grid-template-rows: 10px 10px; */
  column-gap: 2px;
  row-gap: 2px;
}
.snap-layout-fullscreen {
  height: 94.8vh;
}
</style>