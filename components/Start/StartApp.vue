<template>
    <v-btn class="mx-1 transparent text-capitalize pa-2" height="100%" depressed>
    <div class="d-flex flex-column justify-center align-center">
      <v-icon size="30" :color="app.iconColor">{{ app.icon }}</v-icon>
      <h5 class="mt-2">{{ cutString20(app.title) }}</h5>
    </div>
  </v-btn>
</template>
<script>
import{ mapGetters} from 'vuex'
export default {
    props: {
    app: {
      type: Object,
      default: () => {},
    },
  },
  computed:{
      ...mapGetters('app', ['cutString20'])
  }
}
</script>