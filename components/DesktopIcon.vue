<template>
  <v-btn class="mx-1 transparent text-capitalize pa-2" height="100%" depressed>
    <div class="d-flex flex-column justify-center align-center">
      <v-icon size="36">{{ icon }}</v-icon>
      <span class="mt-2 font-weight-bold">{{ label }}</span>
    </div>
  </v-btn>
</template>
<script>
export default {
  props: {
    label: { type: String, default: 'Programs' },
    icon: { type: String, default: 'mdi-microsoft-windows' },
  },
  data: () => ({}),
}
</script>
