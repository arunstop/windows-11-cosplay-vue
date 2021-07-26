<template>
  <v-row
    no-gutters
    class="px-6 d-flex justify-space-between black--text"
    align="center"
  >
    <h4>{{ title }}</h4>
    <v-chip
      class="font-weight-bold"
      link
      color="white"
      small
      label
      @click="action.action"
    >
      <v-icon v-if="icon.position==='l'" class="me-1" size="24px" color="black">
        {{ icon.icon }}
        </v-icon
      >
      {{ action.label }}
      <v-icon v-if="icon.position==='r'" class="ms-1" size="24px" color="black">
        {{ icon.icon }}
        </v-icon
      >
    </v-chip>
  </v-row>
</template>
<script>
export default {
  props: {
    title: { type: String, default: 'Title' },
    icon: {
      type: Object,
      default: () => ({ position: 'l', icon: 'mdi-chevron-right' }),
    },
    action: {
      type: Object,
      default: () => ({
        label: 'Action',
        action: () => {},
      }),
    },
  },
}
</script>