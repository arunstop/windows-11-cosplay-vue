<template>
  <v-list color="transparent" :height="height" style="overflow-y: auto">
    <v-list-item
      v-for="(sar, index) in searchAppResult()"
      :key="index"
      :link="!sar.letter && !sar.notFound"
    >
      <!-- no result -->
      <v-list-item v-if="sar.notFound" class="justify-center font-weight-bold">
        {{ sar.title }}
      </v-list-item>
      <!-- item -->
      <v-list-item v-else class="px-0">
        <v-list-item-avatar v-if="!sar.letter" class="ma-0">
          <v-icon size="30" :color="sar.iconColor">{{ sar.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-if="!sar.letter" class="ps-2 font-weight-bold">
            <h5>{{ sar.title }}</h5>
          </v-list-item-title>
          <!-- letter -->
          <v-list-item-title v-else class="ms-3 font-weight-bold">
            <h3>{{ sar.title }}</h3>
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
  },
  data:()=>({

  }),
  computed: {
    ...mapGetters('app', ['searchAppResult']),
  },
  methods:{
      
  }
}
</script>