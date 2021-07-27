<template>
  <v-row justify="start" align="center" class="ma-0 pa-0">
    <DesktopIcon v-for="(app,index) in desktopApps" :key="index" :label="app.label" :icon="app.icon" />
  </v-row>
</template>
<script>
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
}
</script>
