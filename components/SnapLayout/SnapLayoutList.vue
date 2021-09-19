<template>
  <div v-if="snapLayout.type" v-show="!showDesktop" class="snap-layout-container">
    <div
    :key="'snap-layout-container'"
    class="fill-height overflow-hidden pointer-events transparent animate__animated animate__backInUp animate__fastest"
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
  <UtilityTaskbarSpacer/>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    snap: { type: Object, default: () => ({}) },
  },
  computed: {
    ...mapState('windows/snap', ['snapLayout', 'snapTemplateList']),
    ...mapState('windows/window', ['showDesktop']),
    ...mapGetters('windows/window', ['getSnappedWindowList']),
  },

  created() {
    // console.log(this.$store.getters)
  },
}
</script>
<style>


</style>