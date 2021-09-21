<template>
  <v-list-item
    v-if="menu.notFound"
    :key="`si-notfound-${menu.label}`"
    class="justify-center font-weight-bold"
  >
    {{ menu.label }}
  </v-list-item>
  <v-list-item
    v-else
    :key="`s-item-${menu.label}`"
    class="px-0"
    :class="
      !menu.active ||
      'v-list-item--active primary--text text--darken-2 elevation-2'
    "
    link
    @click="setActiveSettingsMenu(menu.label)"
  >
    <v-card
      class="me-2"
      min-width="4"
      min-height="18"
      height="100%"
      elevation="0"
      :color="menu.active ? 'primary' : 'transparent'"
    />
    <v-list-item-icon class="me-4">
      <v-icon>{{ menu.icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-title>{{ menu.label }}</v-list-item-title>
  </v-list-item>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    props:{
        menu:{type:Object,default:()=>{}}
    },
    computed:{
         ...mapGetters('apps/settings', [
      'getActiveSettingsMenu',
    ]),
    },methods:{
        setActiveSettingsMenu(label) {
      // alert(label)
      if (this.getActiveSettingsMenu.label === label) return
      this.$store.dispatch('apps/settings/setActiveSettingsMenu', label)
    },  
    }
}
</script>

<style>
</style>