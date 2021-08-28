<template>
  <div v-if="option.editingList" class="rounded-lg">
    <v-list-item class="rounded-lg">
      <v-tooltip v-for="editing in option.editingList" :key="editing.id" transition="fade-transition"
        content-class="transparent pa-0" offset-overflow top open-delay="200" close-delay="200">
        <template #activator="{ on, attrs }">
          <v-card
            class="me-2 v-btn"
            color="transparent"
            elevation="0"
            link
            v-bind="attrs"
            v-on="on"
          >
            <v-icon color="primary darken-3">
              {{ editing.icon }}
            </v-icon>
          </v-card>
        </template>
        <v-chip
          label
          class="
          d-flex
          alin-center
            rounded
            font-weight-medium
            black--text
            windows-grey
            elevation-6
          "
        >
          {{ editing.label }}
          <h5 class="font-weight-regular ms-4">{{ editing.keyboard }}</h5>
        </v-chip>
      </v-tooltip>
    </v-list-item>
    <v-divider />
  </div>
  <v-list-item
    v-else
    link
    class="rounded-lg"
    :disabled="option.disabled"
    @click="getOptionAction()"
  >
    <v-list-item-icon v-if="subItem && !option.noStatus" class="me-2">
      <v-icon v-if="option.active" color="black"> mdi-circle-medium </v-icon>
    </v-list-item-icon>
    <v-list-item-icon class="me-2">
      <v-icon
        :color="option.disabled ? 'blue-grey-darken-1' : getAppIconColor()"
      >
        {{ option.icon }}
      </v-icon>
    </v-list-item-icon>
    <v-list-item-subtitle class="d-flex font-weight-regular align-center">
      <span
        :class="
          option.disabled ? 'blue-grey--text text--darken-1' : 'black--text'
        "
      >
        {{ option.label }}
      </span>
      <v-spacer />
      <h5 class="font-weight-regular ms-4">{{ option.keyboard }}</h5>
    </v-list-item-subtitle>
    <v-list-item-icon v-if="isParent()" class="mx-0">
      <v-icon color="black"> mdi-chevron-right </v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {
  props: {
    option: { type: Object, default: () => {} },
    app: { type: Object, default: () => {} },
    subItem: Boolean,
    // attrs: { type: Object, default: () => {} },
    // on: { type: Object, default: () => {} },
  },
  created() {
    // console.log(this.option.subItemList?.length)
  },
  methods: {
    isParent() {
      return !this.subItem && this.option.subItemList?.length
    },
    getAppIconColor() {
      return this.option.id === 'open'
        ? this.app?.iconColor
        : 'primary darken-3'
    },
    getOptionAction() {
      this.option.action?.()
    },
  },
}
</script>

<style>
</style>