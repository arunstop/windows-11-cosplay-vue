<template>
  <v-list class="pa-0 blur-bg rounded-lg" dense>
    <div v-for="option in getDesktopOptionList()" :key="option.label">
      <DesktopContextMenuItem
        v-if="option.subItemList.length === 0"
        :option="option"
      />
      <v-menu v-else open-on-hover offset-x offset-overflow  open-delay="200" close-delay="200">
        <template #activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <DesktopContextMenuItem :option="option" />
          </div>
        </template>
        <!-- sub menu -->
        <v-list class="pa-0 blur-bg rounded-lg" dense>
          <div v-for="(subOption, index) in option.subItemList" :key="index">
            <DesktopContextMenuItem :option="subOption" sub-item />
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