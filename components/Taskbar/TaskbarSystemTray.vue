<template>
  <v-menu v-if="getTrayWindowList()" top offset-y nudge-left="55%" nudge-top="20" transition="slide-y-reverse-transition">
    <template #activator="{ on, attrs }">
      <v-btn
        class="mx-0 my-auto pa-0"
        elevation="0"
        icon
        tile
        v-bind="attrs"
        v-on="on"
      >
        <v-icon size="30px"> mdi-chevron-up </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text class="system-tray-container pa-0">
        <v-card v-for="app in getTrayWindowList()" :key="app.id" elevation="0" color="transparent" link class="pa-3">
          <v-icon :color="app.iconColor">{{app.icon}}</v-icon>
        </v-card>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed:{
        ...mapGetters('app/window/', ['getTrayWindowList'])
    }
}
</script>

<style>
.system-tray-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>