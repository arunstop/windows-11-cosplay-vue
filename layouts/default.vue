<template>
  <v-app :style="bgStyle">
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Taskbar/>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    bgStyle:{
      background: `url(${require('@/assets/img/bg.jpg')}) no-repeat !important`,
      backgroundSize: `cover`,
    }
  }),
  computed: {
  },
}
</script>
<style>
html{
  overflow:hidden !important;
}
</style>
