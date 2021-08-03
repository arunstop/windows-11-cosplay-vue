<template>
    <v-hover v-slot="{ hover }">
      <v-card class="rounded-lg" link>
        <v-img
          v-if="noThumbnail()"
          height="222px"
          width="100%"
          :src="getResizedImage(news.thumbnail)"
          class="d-flex align-end rounded-lg"
        >
          <div v-if="news.spanned">
            <v-list-item class="px-0">
              <v-card
                class="widget-item-header-bg-h elevation-0"
                elevation="0"
                disabled
                flat
                height="100%"
                color="transparent"
              />
              <v-card
                class="px-3"
                height="222px"
                width="50%"
                color="transparent"
                elevation="0"
              >
                <WidgetItemNewsHeader
                  :class="hover ? 'text-decoration-underline' : ''"
                  :news="news"
                />
                <v-card-text class="pa-0 mb-2 font-size-half">
                  {{ news.desc.substring(0, 150) + '...' }}
                </v-card-text>
              </v-card>
            </v-list-item>
          </div>
          <div v-else>
            <v-list-item class="px-0">
              <v-card
                class="widget-item-header-bg-v elevation-0"
                elevation="0"
                disabled
                flat
                height="150%"
                color="transparent"
              />
              <v-card class="px-3" color="transparent" elevation="0">
                <WidgetItemNewsHeader
                  :class="hover ? 'text-decoration-underline' : ''"
                  :news="news"
                />
              </v-card>
            </v-list-item>
          </div>
        </v-img>
        <v-card
          v-else
          height="222px"
          width="100%"
          color="windows-grey"
          class="d-flex"
          elevation="0"
        >
          <div>
            <v-list-item class="px-0">
              <v-card
                class="px-3"
                height="222px"
                color="transparent"
                elevation="0"
              >
                <WidgetItemNewsHeader
                  :class="hover ? 'text-decoration-underline' : ''"
                  :news="news"
                />
                <v-card-text class="pa-0 mb-2 font-size-half">
                  {{ news.desc.substring(0, 150) + '...' }}
                </v-card-text>
              </v-card>
            </v-list-item>
          </div>
        </v-card>

        <v-fade-transition>
          <v-btn
            v-if="hover"
            class="ma-2"
            color="grey darken-4"
            fab
            dark
            x-small
            style="position: absolute; top: 0; right: 0"
            @click="removeNewsItem()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-fade-transition>
      </v-card>
    </v-hover>
</template>
<script>
export default {
  props: {
    news: { type: Object, default: () => {} },
  },
  methods: {
    getResizedImage(link) {
      return link.replace('&pid=News', '&h=240')
    },
    noThumbnail() {
      return this.news.thumbnail !== ''
    },
    removeNewsItem() {
      this.$store.dispatch('news/removeNews', this.news.url)
    },
  },
}
</script>
<style>
.widget-item-header-bg-v {
  position: absolute;
  width: 100%;
  background: linear-gradient(transparent, #d4d6d8, #d4d6d8);
}
.widget-item-header-bg-h {
  position: absolute;
  width: 72%;
  background: linear-gradient(to left, transparent, #d4d6d8, #d4d6d8);
}
</style>