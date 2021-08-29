<template>
  <div
    v-if="snapLayout.type"
    :key="'snap-layout-list'"
    class="snap-layout transparent animate__animated animate__backInUp animate__fastest"
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
    ...mapState('app/snap', ['snapLayout', 'snapTemplateList']),
    ...mapGetters('app/window', ['snappedWindowList']),
  },

  created() {
    // console.log(this.$store.getters)
  },
}
</script>
<style>


</style>