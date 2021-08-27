<template>
  <v-list-item link class="rounded-lg" :disabled="option.disabled">
    <v-list-item-icon v-if="subItem" class="me-2">
      <v-icon v-if="option.active" color="black"> mdi-circle-medium </v-icon>
    </v-list-item-icon>
    <v-list-item-icon class="me-2">
      <v-icon :color="option.disabled ? 'blue-grey-darken-1' : 'black'">
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
      <h5 class="font-weight-regular">{{ option.keyboard }}</h5>
    </v-list-item-subtitle>
    <v-list-item-icon v-if="!subItem && option.subItemList.length !== 0" class="mx-0">
      <v-icon color="black"> mdi-chevron-right </v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {
  props: {
    option: { type: Object, default: () => {} },
    subItem: Boolean,
    // attrs: { type: Object, default: () => {} },
    // on: { type: Object, default: () => {} },
  },
  created() {},
}
</script>

<style>
</style>