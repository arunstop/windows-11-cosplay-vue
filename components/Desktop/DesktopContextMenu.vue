<template>
  <v-list class="pa-0 blur-bg rounded-lg" dense>
    <div v-for="option in getOptionList()" :key="option.label">
        <DesktopContextMenuItem
          v-if="icon && !option.subItemList"
          :option="option"
          :app="app"
        />
        <v-menu
          v-else-if="!icon && option.subItemList"
          open-on-hover
          offset-x
          offset-overflow
          open-delay="200"
          close-delay="200"
        >
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
    icon: Boolean,
  },
  computed: {
    ...mapGetters('ui/desktop/', [
      'getDesktopOptionList',
      'getDesktopIconOptionList',
    ]),
  },
  methods: {
    getOptionList() {
      let optionList = this.icon
        ? this.getDesktopIconOptionList()
        : this.getDesktopOptionList()
      const editingList = []
      if (this.icon) {
        optionList = this.$globals.cloneState(this.getDesktopIconOptionList())
        optionList.forEach((option) => {
          if (option.id === 'open') {
            option.label = 'Open ' + this.app.title
            option.icon = this.app.icon
            Object.assign(option, {
              action: () => {
                this.$store.dispatch(
                  'app/window/openAppById',
                  this.app.titleKebab
                )
              },
            })
          }
          if (option.editing) {
            editingList.push(option)
          }
        })
      }

      const nonEditingOptionList = optionList.filter((el) => !el.editing)
      return [{ editingList: [...editingList] }, ...nonEditingOptionList]
    },
  },
}
</script>
<style>
/* .list-group-parent .v-list-item{
    padding: 0 !important;
} */
</style>