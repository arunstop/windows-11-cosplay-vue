<template>
  <v-menu absolute min-width="320px">
    <template #activator="{ on, attrs }">
      <div class="fill-height" v-bind="attrs" @contextmenu.prevent="on.click">
        <v-row justify="start" align="start" class="ma-0 pa-4">
          <!-- <v-btn v-bind="attrs" v-on="on"> xd </v-btn> -->
          <DesktopIcon
            v-for="(app, index) in getDesktopAppList"
            :key="index"
            :app="app"
          />
        </v-row>
      </div>
    </template>
    <DesktopContextMenu />
  </v-menu>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    desktopApps: [
      { label: 'My Computer', icon: 'mdi-monitor' },
      { label: 'Recycle Bin', icon: 'mdi-trash-can-outline' },
      { label: 'Edge', icon: 'mdi-microsoft-edge' },
      // {label:'Video Player',icon:'mdi-microsoft-edge'},
      // {label:'Music Player',icon:'mdi-microsoft-edge'},
      // {label:'Edge',icon:'mdi-microsoft-edge'},
      // {label:'Edge',icon:'mdi-microsoft-edge'},
      // {label:'Edge',icon:'mdi-microsoft-edge'},
      // {label:'Edge',icon:'mdi-microsoft-edge'},
    ],
  }),
  computed: {
    ...mapGetters('app', ['getDesktopAppList']),
  },
}
</script>
