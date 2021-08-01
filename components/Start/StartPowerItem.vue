<template>
  <v-list-item
    link
    @click="powerAction(item.status)"
  >
    <v-icon class="me-2" >{{ item.icon }}</v-icon>
    <span>{{ item.label }}</span>
  </v-list-item>
</template>
<script>
export default {
  props: {
    item: { type: Object, default: () => {} },
  },
  methods:{
    powerAction(status){
      this.$store.dispatch('user/logOff', status)
    }
  }
}
</script>