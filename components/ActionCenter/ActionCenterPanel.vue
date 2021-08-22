<template>
  <v-card
    class="my-4 d-flex flex-column windows-grey rounded-lg"
    elevation="6"
    width="342px"
    outlined
  >
    <!-- content -->
    <v-card-text class="pa-6">
      <v-item-group multiple>
        <v-scale-transition
          group
          class="action-center-action-list text-center"
          origin="center center"
        >
          <ActionCenterPanelButton
            v-for="action in getPinnedActionList()"
            :key="action.label"
            :action="action"
            :edit-action-list="editActionList"
          />
        </v-scale-transition>
      </v-item-group>
      <v-slider
        v-model="brightness"
        class="mt-6"
        hide-details
        :prepend-icon="getBrightnessIcon(brightness)"
      />
      <v-slider
        v-model="volume"
        class="mt-6"
        hide-details
        :prepend-icon="getVolumeIcon(volume)"
      />
    </v-card-text>
    <!-- divider -->
    <v-divider />
    <!-- footer -->
    <v-card-actions
      class="d-flex py-2 px-3 no-scroll"
      style="height: 48px !important"
    >
      <v-slide-x-transition
        hide-on-leave
        leave-absolute
        group
        class="d-flex flex"
      >
        <div
          v-if="!editActionList"
          :key="'acpEditOff'"
          class="d-flex flex ms-auto"
        >
          <h5 class="me-auto font-weight-medium" label large>
            <v-icon size="24">mdi-battery-high mdi-rotate-90</v-icon>
            100%
          </h5>
          <v-btn icon small @click="toggleEditActionList()">
            <v-icon size="18">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small>
            <v-icon size="18">mdi-cog</v-icon>
          </v-btn>
        </div>

        <div v-if="editActionList" :key="'acpEditOn'" class="mx-auto d-flex">
          <v-chip
            class="font-weight-bold"
            label
            color="transparent"
            link
            @click="toggleEditActionList()"
          >
            <v-icon size="18" class="me-2">mdi-check</v-icon>
            Done
          </v-chip>
          <v-menu offset-y top nudge-left="50%" nudge-top="10%">
            <template #activator="{ on, attrs }">
              <v-chip
                class="font-weight-bold"
                label
                color="transparent"
                link
                v-bind="attrs"
                v-on="on"
              >
                <v-icon size="18" class="me-2">mdi-plus</v-icon>
                Add
              </v-chip>
            </template>
            <v-list class="pa-0">
              <v-list-item
                v-for="(action, index) in getUnpinnedActionList()"
                :key="index"
                style="min-width: 160px !important"
                dense
                link
                @click="pinAction(action)"
              >
                <v-list-item-icon class="mr-2">
                  <v-icon v-text="action.icon" />
                </v-list-item-icon>
                <v-list-item-subtitle v-text="action.label" />
              </v-list-item>
              <v-list-item
                v-if="getUnpinnedActionList().length === 0"
                style="min-width: 160px !important"
              >
                <v-list-item-subtitle>No items</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-slide-x-transition>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {},
  data: () => ({
    brightness: 90,
    volume: 30,
    editActionList: false,
  }),
  computed: {
    ...mapGetters('app/actionCenter', [
      'getPinnedActionList',
      'getUnpinnedActionList',
    ]),
  },
  methods: {
    getBrightnessIcon(brightness) {
      if (brightness <= 0) {
        return 'mdi-volume-mute'
      } else if (brightness <= 30) {
        return 'mdi-volume-low'
      } else if (brightness <= 70) {
        return 'mdi-volume-medium'
      } else {
        return 'mdi-volume-high'
      }
    },
    getVolumeIcon(volume) {
      if (volume <= 0) {
        return 'mdi-brightness-5'
      } else if (volume <= 30) {
        return 'mdi-brightness-4'
      } else if (volume <= 70) {
        return 'mdi-brightness-6'
      } else {
        return 'mdi-brightness-7'
      }
    },
    toggleEditActionList() {
      this.editActionList = !this.editActionList
    },
    pinAction(action) {
      this.$store.dispatch('app/actionCenter/pinAction', action)
    },
  },
}
</script>

<style>
.action-center-action-list {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 12px;
  row-gap: 12px;
}
</style>