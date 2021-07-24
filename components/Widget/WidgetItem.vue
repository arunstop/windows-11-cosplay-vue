<template>
  <v-card class="rounded-lg pa-3 pb-1">
    <v-row class="justify-space-between" no-gutters align="center">
      <h6 class="caption font-weight-bold">{{ title }}</h6>
      <v-btn v-if="!noSetting" class="" x-small icon>
        <v-icon> mdi-dots-horizontal </v-icon>
      </v-btn>
    </v-row>
    <v-row class="d-flex flex-column" no-gutters>
      <slot name="content"></slot>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: {
    title: { type: String, default: '' },
    noSetting: { type: Boolean, default: false },
  },
}
</script>