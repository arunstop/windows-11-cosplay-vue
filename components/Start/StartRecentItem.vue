<template>
     <v-btn
              class="d-block mx-1 transparent text-none text-left pa-0"
              height="100%"
              depressed
            >
              <v-list-item class="">
                <v-list-item-avatar class="ma-0">
                  <v-icon size="30" :color="item.iconColor">{{ item.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    <h5>
                      {{ $globals.cutStr(item.title,20) }}
                    </h5>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <h5 class="font-weight-medium">
                      {{ item.lastOpened }}
                    </h5>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-btn>
</template>
<script>
export default {
    props:{
        item:{type:Object, default:()=>{}}
    },
    computed:{
    }
}
</script>