<template>
  <div>
    <v-list-item class="px-0" link>
      <WidgetItemNewsHeader :news="news"/>
    </v-list-item>
  </div>
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
  },
}
</script>