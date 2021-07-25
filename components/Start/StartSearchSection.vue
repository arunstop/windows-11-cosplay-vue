<template>
  <v-card color="blue ligthen-4" width="100%" height="100%" elevation="0">

  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('app', ['searchAppResult']),
  },
}
</script>