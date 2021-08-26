<template>
  <v-list class="pa-0 blur-bg rounded-lg" dense>
    <div v-for="option in getDesktopOptionList()" :key="option.label">
      <v-list-item
        v-if="option.subItemList.length === 0"
        link
        class="rounded-lg"
      >
        <v-list-item-icon class="me-2">
          <v-icon color="black">
            {{ option.icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle class="black--text">
          {{ option.label }}
        </v-list-item-subtitle>
      </v-list-item>
      <v-menu v-else open-on-hover offset-x offset-overflow>
        <template #activator="{ on, attrs }">
          <v-list-item link class="rounded-lg" v-bind="attrs" v-on="on">
            <v-list-item-icon class="me-2">
              <v-icon color="black">
                {{ option.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle class="black--text">
              {{ option.label }}
            </v-list-item-subtitle>
            <v-list-item-icon class="me-2">
              <v-icon color="black">
                mdi-chevron-right
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
        <v-list  class="pa-0 blur-bg rounded-lg" dense>
          <v-list-item
            v-for="(subItem, index) in option.subItemList"
            :key="index"
            link
            class="rounded-lg"
          >
            <v-list-item-subtitle>{{ subItem }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-divider v-if="option.underLined" />
    </div>
  </v-list>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    app: { type: Object, default: () => {} },
  },
  computed: {
    ...mapGetters('desktop/', ['getDesktopOptionList']),
  },
  methods: {},
}
</script>
<style>
/* .list-group-parent .v-list-item{
    padding: 0 !important;
} */
</style>