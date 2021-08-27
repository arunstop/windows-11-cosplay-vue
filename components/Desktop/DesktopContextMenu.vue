<template>
  <v-list class="pa-0 blur-bg rounded-lg" dense>
    <div v-for="option in getDesktopOptionList()" :key="option.label">
      <v-list-item
        v-if="option.subItemList.length === 0"
        link
        class="rounded-lg"
        :disabled="option.disabled"
      >
        <v-list-item-icon class="me-2">
          <v-icon :color="option.disabled ? 'blue-grey-darken-1' : 'black'">
            {{ option.icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle class="d-flex font-weight-regular align-center">
                <span :class="option.disabled ? 'blue-grey--text text--darken-1' : 'black--text'">{{ option.label }}</span>
                <v-spacer/>
                <h5 class="font-weight-regular">{{ option.keyboard }}</h5>
              </v-list-item-subtitle>
      </v-list-item>
      <v-menu v-else open-on-hover offset-x offset-overflow>
        <template #activator="{ on, attrs }">
          <v-list-item link class="rounded-lg" v-bind="attrs" v-on="on">
            <v-list-item-icon class="me-2">
              <v-icon :color="option.disabled ? 'blue-grey-darken-1' : 'black'">
                {{ option.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle class="black--text font-weight-regular">
              {{ option.label }}
            </v-list-item-subtitle>
            <v-list-item-icon class="me-2">
              <v-icon color="black"> mdi-chevron-right </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </template>
        <!-- sub menu -->
        <v-list class="pa-0 blur-bg rounded-lg" dense>
          <div v-for="(subOption, index) in option.subItemList" :key="index">
            <v-list-item link class="rounded-lg" :disabled="subOption.disabled">
              <v-list-item-icon class="me-2">
                <v-icon v-if="subOption.active" color="black">
                  mdi-circle-medium
                </v-icon>
              </v-list-item-icon>
              <v-list-item-icon class="me-2">
                <v-icon :color="subOption.disabled ? 'blue-grey-darken-1' : 'black'">
                  {{ subOption.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-subtitle class="d-flex font-weight-regular align-center">
                <span :class="subOption.disabled ? 'blue-grey--text text--darken-1' : 'black--text'">{{ subOption.label }}</span>
                <v-spacer/>
                <h5 class="font-weight-regular">{{ subOption.keyboard }}</h5>
              </v-list-item-subtitle>
            </v-list-item>
            <v-divider v-if="subOption.underLined" />
          </div>
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