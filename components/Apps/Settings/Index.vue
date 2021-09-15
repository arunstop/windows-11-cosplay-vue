<template>
  <div>{{app.titleKebab}}</div>
</template>

<script>
export default {
  props: {
    app: { type: Object, default: () => {} },
  },
}
</script>

<style>
</style>