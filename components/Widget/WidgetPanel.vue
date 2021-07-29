<template>
  <div>
    <v-navigation-drawer
      v-model="show"
      app
      temporary
      hide-overlay
      width="540px"
      color="transparent"
    >
      <v-card
        color="windows-grey"
        style="opacity: 0.9; position: absolute"
        height="100%"
        width="100%"
      >
      </v-card>
      <v-card class="mb-10" color="transparent" elevation="0">
        <v-row
          no-gutters
          class="d-flex flex-column"
          align="center"
          justify="center"
        >
          <v-btn class="me-4 ms-auto" fab x-small depressed color="transparent">
            <v-icon> mdi-dots-horizontal </v-icon>
          </v-btn>
          <h1 class="font-weight-medium mb-6">
            {{ $store.getters.dateNow.hours }}
          </h1>
          <!-- Widget Items -->
          <v-row no-gutters class="grid-container-highlight px-10">
            <WidgetItem class="grid-item-row-span-2" :title="'WEATHER'">
              <template #content>
                <h6 class="mb-2 caption text-center font-weight-medium">
                  <v-icon small color="black">mdi-crosshairs-gps</v-icon>
                  Sydney, Australia
                </h6>
                <v-row class="justify-space-between mb-2" no-gutters>
                  <v-row no-gutters class="" align="center">
                    <v-icon size="30" color="amber lighten-1">
                      mdi-circle
                    </v-icon>
                    <h1 class="font-weight-medium">20 C</h1>
                  </v-row>
                  <h6 class="text-right">
                    <v-icon x-small color="warning">mdi-alert</v-icon>
                    THUNDER<br />ALERT
                  </h6>
                </v-row>
                <v-card
                  class="rounded-sm mb-2"
                  elevation="0"
                  height="90px"
                  width="100%"
                  color="green"
                >
                </v-card>
                <v-chip
                  class="black--text text-none rounded-pill ma-auto"
                  color="transparent"
                  small
                  link
                >
                  <h5 class="text-center font-weight-medium">
                    See full forecast
                  </h5>
                </v-chip>
              </template>
            </WidgetItem>
            <WidgetItem :title="'MONEY | MARKET'">
              <template #content>
                <v-list class="no-gutters">
                  <v-list-item class="no-gutters mih-auto mt-2">
                    <v-list-item-content class="no-gutters">
                      <v-list-item-title
                        class="no-gutters font-size-half font-weight-bold"
                      >
                        UKX
                      </v-list-item-title>
                      <v-list-item-subtitle class="no-gutters font-size-half">
                        FTSE 100
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content class="no-gutters">
                      <v-row
                        class="d-flex no-gutters font-size-half"
                        align="center"
                        justify="center"
                      >
                        <span class="font-weight-bold">7,172.48</span>
                        <v-chip
                          class="ms-1 ps-2 pe-1"
                          x-small
                          color="success"
                          label
                          >+0.36%</v-chip
                        >
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item class="no-gutters mih-auto mt-2">
                    <v-list-item-content class="no-gutters">
                      <v-list-item-title
                        class="no-gutters font-size-half font-weight-bold"
                      >
                        MCK
                      </v-list-item-title>
                      <v-list-item-subtitle class="no-gutters font-size-half">
                        FTSE 250
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content class="no-gutters">
                      <v-row
                        class="d-flex no-gutters font-size-half"
                        align="center"
                        justify="center"
                      >
                        <span class="font-weight-bold">22,631.72</span>
                        <v-chip
                          class="ms-1 ps-2 pe-1"
                          x-small
                          color="error"
                          label
                          >-0.50%</v-chip
                        >
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </template>
            </WidgetItem>
            <WidgetItem :title="'EURO CUP'" no-option>
              <template #content>
                <v-row class="d-flex no-gutters mt-1 mb-2">
                  <div class="flex-grow-1">
                    <v-list-item class="no-gutters mih-auto mt-1">
                      <v-list-item-content class="no-gutters">
                        <v-list-item-title
                          class="
                            d-flex
                            justify-center justify-space-between
                            no-gutters
                            font-size-half
                          "
                        >
                          <div class="d-flex align-center">
                            <v-img
                              class="me-1"
                              src="https://flagpedia.net/data/flags/w20/gb-eng.png"
                              sizes="20px"
                            />
                            <span class="">England</span>
                          </div>
                          <b class="d-flex align-center"
                            >1 (2)
                            <v-icon small color="transparent"
                              >mdi-menu-left</v-icon
                            >
                          </b>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="no-gutters mih-auto mt-1">
                      <v-list-item-content class="no-gutters">
                        <v-list-item-title
                          class="
                            d-flex
                            justify-center justify-space-between
                            no-gutters
                            font-size-half
                          "
                        >
                          <div class="d-flex align-center">
                            <v-img
                              class="me-1"
                              src="https://flagpedia.net/data/flags/w20/it.png"
                              sizes="20px"
                            />
                            <span class="font-weight-bold">Italy</span>
                          </div>
                          <span class="d-flex align-center font-weight-bold"
                            >1 (3)
                            <v-icon small color="black"
                              >mdi-menu-left</v-icon
                            ></span
                          >
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                  <span
                    class="
                      d-flex
                      font-size-half
                      text-center
                      align-center align-self-center
                    "
                  >
                    Final
                    <br />
                    12 Jul
                  </span>
                </v-row>
                <v-chip
                  class="black--text text-none rounded-pill ma-auto"
                  color="transparent"
                  small
                  link
                >
                  <h5 class="text-center font-weight-medium">
                    See more Euro Cup
                  </h5>
                </v-chip>
              </template>
            </WidgetItem>
          </v-row>
          <v-row no-gutters class="grid-container-highlight px-10 mt-8 mb-3">
            <WidgetItem
              class="grid-item-col-span-2"
              title="TOP STORIES"
              no-option
            >
              <template #content>
                <div class="grid-container-top-stories">
                  <WidgetItemTopStory
                    v-for="(news, index) in newsList.topStories"
                    :key="index"
                    :news="{
                      title: news.name,
                      provider: news.provider[0].name,
                      logo: news.provider[0].image.thumbnail.contentUrl,
                      date: news.datePublished,
                    }"
                  >
                  </WidgetItemTopStory>
                </div>
              </template>
            </WidgetItem>
          </v-row>
          <v-row no-gutters class="grid-container-highlight px-10">
            <WidgetItemNews
              v-for="(news, index) in newsList.news"
              :key="index"
              :news="{
                title: news.name,
                thumbnail: news.image.thumbnail.contentUrl,
                provider: news.provider[0].name,
                logo: news.provider[0].image.thumbnail.contentUrl,
                date: news.datePublished,
                desc: news.description,
                spanned: news.spanned,
              }"
              :class="news.spanned ? 'grid-item-col-span-2' : ''"
            >
            </WidgetItemNews>
          </v-row>
        </v-row>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
// import news from '@/static/news.json'
export default {
  props: {
    value: Boolean,
    app: {
      type: Object,
      default: () => {
        return {
          window: {
            //   id:0,
            show: false,
            fullscreen: false,
          },
        }
      },
    },
    // fullscreen: Boolean,
  },
  data: () => ({
    // drawer: true,
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard' },
      { title: 'About', icon: 'mdi-forum' },
    ],
    newsList: { topStories: [], news: [] },
  }),
  computed: {
    show: {
      get() {
        return this.$store.getters['app/window/windowState'](this.app.id)
      },
      set(value) {
        return this.$store.dispatch('app/window/toggleWindow', {
          id: this.app.id,
          value,
        })
        // alert('yeppa')
      },
    },
  },
  created() {

    // this.$apiNews.showTrending().then((response) => {
    //   response.data.value.forEach((element,index) => {
    //     // filling up no-image articles
    //   element.image = element.image || {
    //     thumbnail: {
    //       contentUrl: '',
    //     },
    //   }
    //   // filling up no-image providers
    //   element.provider[0].image = element.provider[0].image || {
    //     thumbnail: {
    //       contentUrl: '',
    //     },
    //   }
    //   if (index > 1 && index % 5 === 0 && element.image.thumbnail.contentUrl) {
    //     Object.assign(element, { spanned: true })
    //   }

    //   // console.log(element.image)
    //   if (index < 4) {
    //     this.newsList.topStories.push(element)
    //   } else {
    //     this.newsList.news.push(element)
    //   }
    //   });
    // })
 
 },
  methods: {},
}
</script>

<style>
.grid-container-highlight {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(220px, auto));
  grid-template-rows: auto;
  row-gap: 12px;
  column-gap: 12px;
  grid-auto-flow: dense;
}

.grid-container-top-stories {
  display: grid !important;
  grid-template-columns: repeat(2, 48%);
  grid-template-rows: auto;
  row-gap: 12px;
  column-gap: 12px;
}

.grid-item-row-span-2 {
  grid-row: span 2;
}

.grid-item-col-span-2 {
  grid-column: span 2;
}

.font-size-half {
  font-size: 67% !important;
}

.no-gutters {
  margin: 0px !important;
  padding: 0px !important;
}
.mih-auto {
  min-height: auto !important;
}
</style>

