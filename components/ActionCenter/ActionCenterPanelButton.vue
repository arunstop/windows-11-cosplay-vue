<template>
  <v-item v-slot="{ active, toggle }">
    <div class="action-center-button ">
      <v-btn
        :color="active && !editActionList ? 'primary' : ''"
        width="100%"
        height="50"
        class="mb-2 rounded-lg"
        :disabled="editActionList"
        @click="action.toggleable ? toggle() : null"
      >
        <v-icon size="18">{{ action.icon }}</v-icon>
      </v-btn>
      <v-fade-transition>
          <v-btn v-if="editActionList" class="action-center-button-unpin-btn" x-small fab height="24px" width="24px" dark elevation="0" @click="unpinAction(action)">
            <v-icon size="18">mdi-pin-off-outline</v-icon>
        </v-btn>
      </v-fade-transition>
      <span class="text-caption font-weight-bold">{{ action.label }}</span>
    </div>
  </v-item>
</template>

<script>
export default {
  props: {
    action: { type: Object, default: () => ({}) },
    editActionList: Boolean
  },
  data: () => ({}),
  methods:{
    unpinAction(action) {
      this.$store.dispatch('app/actionCenter/unpinAction', action)
    },

  }
}
</script>

<style>
.action-center-button-unpin-btn{
position:absolute;
top: -6px;
right: -6px;
}

.action-center-button{
position:relative;
}
</style>