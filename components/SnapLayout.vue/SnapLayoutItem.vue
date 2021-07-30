<template>
  <Window v-if="!initializer" :app="app" snapped />
  <SnapLayoutInitializer v-else :snap="snap" />
</template>
<script>
export default {
  props: {
    app: { type: Object, default: () => ({}) },
     snap: { type: Object, default: () => ({}) },
    initializer: Boolean,
  },
}
</script>