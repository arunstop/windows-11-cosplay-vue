<template>
  <Window v-if="!initializer" :app="app" snapped />
  <SnapLayoutInitializer v-else/>
</template>
<script>
export default {
  props: {
    app: { type: Object, default: () => ({}) },
    initializer: Boolean,
  },
}
</script>