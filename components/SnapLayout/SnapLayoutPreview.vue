<template>
  <div
      class="snap-layout-container animate__animated animate__fadeIn animate__flash no-pointer-events"
      :class="'grid-container-snap-layout-' + snapPreview.type"
    >
      <v-card
        v-for="(snap, index) in snapPreview.snapList"
        :key="index"
        rounded="lg"
        class="d-flex"
        :class="snap.show ? 'blur-bg elevation-6' : 'transparent elevation-0'"
      >
        <v-icon
          v-if="snap.show"
          class="ma-auto"
          :size="120"
          :color="snap.app.iconColor"
        >
          {{ snap.app.icon }}
        </v-icon>
      </v-card>
    </div>
</template>

<script>
export default {
    props:{
        snapPreview: {type:Object, default:()=>{}}
    }

}
</script>

<style>

</style>