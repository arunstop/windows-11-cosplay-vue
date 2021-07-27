<template>
  <v-list-item-content>
    <v-list-item-subtitle class="mb-2 font-size-half">
      <h5 class="d-flex align-center black--text">
        <v-icon v-if="news.logo == ''" class="me-1" size="12px"
          >mdi-newspaper</v-icon
        >
        <v-img
          v-else
          class="me-1"
          max-height="12px"
          max-width="12px"
          :src="getProviderLogo(news.logo)"
        />

        {{ news.provider }} - {{ getPublishedDate() }}
      </h5>
    </v-list-item-subtitle>
    <v-list-item-title
      style="white-space: normal !important"
      class="font-size-half"
    >
      <h3 style="line-height: 150%">
        {{ news.title.substring(0, 120) + '...' }}
      </h3>
    </v-list-item-title>
  </v-list-item-content>
</template>
<script>
export default {
  props: {
    news: { type: Object, default: () => {} },
  },
  methods: {
    getProviderLogo(link) {
      return link.replace('&pid=news', '')
    },
    getPublishedDate() {
      return this.$moment(this.news.date).fromNow()
    },
  },
}
</script>