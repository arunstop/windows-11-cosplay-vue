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
              :width="hover ? '144%' : '72%'"
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
                {{ $globals.cutStr(news.desc, 150) }}
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
              :height="hover ? '600%' : '150%'"
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
        <template #placeholder>
          <v-row v-if="!news.spanned" class="ma-0" align="center" justify="center" style="height:60%;">
             <v-progress-circular
                indeterminate
                color="red"
              />
          </v-row>
          <v-row v-else class="ma-0" align="center" justify="center" style="position:absolute; right:0; height:100%; width:50%;">
             <v-progress-circular
                indeterminate
                color="red"
              />
          </v-row>
          <!-- <div class="d-flex" style="width: 100%; height: 100%;position:relative;">
            <div v-if="news.spanned" class="my-auto ms-auto" >
              <v-progress-circular indeterminate color="red" />
            </div>

            <div v-else class="mx-auto mt-12" >
              <v-progress-circular
                indeterminate
                color="red"
              />
            </div>
          </div> -->
        </template>
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
                {{ $globals.cutStr(news.desc, 150) }}
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
      this.$store.dispatch('user/hideNews', this.news.url)
    },
  },
}
</script>
<style>
.widget-item-header-bg-v {
  position: absolute;
  width: 100%;
  transition: height 600ms ease;
  /* background: linear-gradient(transparent, #d4d6d8, #d4d6d8); */
  background: linear-gradient(transparent, #fdfdfd, #fdfdfd);
}
.widget-item-header-bg-h {
  position: absolute;
  height: 100%;
  transition: width 600ms ease;
  background: linear-gradient(to left, transparent, #fdfdfd, #fdfdfd);
}
.widget-item-header-bg-v:hover {
  height: 600%;
}
.widget-item-header-bg-h:hover {
  width: 146%;
}
</style>