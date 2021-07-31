<template>
  <v-list color="transparent" :height="height" class="mx-3" style="overflow-y: auto">
    <v-list-item
      v-for="(sar, index) in searchAppResult()"
      :key="index"
      class="px-0"
      :link="!sar.letter && !sar.notFound"
    >
      <!-- no result -->
      <v-list-item v-if="sar.notFound" class="justify-center font-weight-bold">
        {{ sar.title }}
      </v-list-item>
      <!-- Letter item -->
      <v-list-item v-else-if="sar.letter" class="px-0">
        <v-list-item-title class="ms-3 font-weight-bold">
          <h3>{{ sar.title }}</h3>
        </v-list-item-title>
      </v-list-item>
      <!-- App item -->
      <v-list-item v-else-if="!sar.letter" class="px-0" link @click="openApp(sar)">
        <v-list-item-avatar v-if="!sar.letter" class="ma-0">
          <v-icon size="30" :color="sar.iconColor">{{ sar.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="ps-2 font-weight-bold">
            <h5>{{ sar.title }}</h5>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item>
  </v-list>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    height: { type: String, default: '390px' },
    windowId: { type: Number, default: 0 },
  },
  data: () => ({}),
  computed: {
    ...mapGetters('app', ['searchAppResult']),
  },
  methods: {
    openApp(app) {
      this.$store.dispatch('app/window/toggleWindow', { id: this.windowId, value:false })
      this.$store.dispatch('app/window/openApp', app)
    },
  },
}
</script>