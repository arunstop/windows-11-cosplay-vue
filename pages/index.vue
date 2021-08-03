<template>
  <v-row justify="start" align="start" class="ma-0 pa-4">
    <DesktopIcon v-for="(app,index) in getDesktopAppList" :key="index" :app="app"/>
  </v-row>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data: () => ({
    desktopApps:[
      {label:'My Computer',icon:'mdi-monitor'},
      {label:'Recycle Bin',icon:'mdi-trash-can-outline'},
      {label:'Edge',icon:'mdi-microsoft-edge'},
      // {label:'Video Player',icon:'mdi-microsoft-edge'},
      // {label:'Music Player',icon:'mdi-microsoft-edge'},
      // {label:'Edge',icon:'mdi-microsoft-edge'},
      // {label:'Edge',icon:'mdi-microsoft-edge'},
      // {label:'Edge',icon:'mdi-microsoft-edge'},
      // {label:'Edge',icon:'mdi-microsoft-edge'},
    ]
  }),
  computed:{
    ...mapGetters('app', ['getDesktopAppList'])
  }
}
</script>
