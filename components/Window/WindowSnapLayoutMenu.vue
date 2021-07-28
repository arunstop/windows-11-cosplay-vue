<template>
  <div class="snap-layout-menu">
    <v-card class="grid-container-snap-layout-menu pa-3 rounded-lg">
      <v-card
        v-for="(sl, index) in snapLayoutList"
        :key="index"
        class="d-flex justify-center align-center"
        min-width="120px"
        height="80px"
        elevation="0"
        rounded="0"
      >
        <div :class="sl.type" color="transparent">
          <v-card
            v-for="(item, index1) in sl.itemList"
            :key="index1"
            class="snap-layout-item"
            :rounded="item.rounded"
            :height="item.height"
            link
          />
        </div>
      </v-card>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    snapLayoutList: [
      {
        type: 'grid-container-snap-layout-cols-50-50',
        itemList: [
          { rounded: 'sm l-lg', height: '80px' },
          { rounded: 'sm r-lg', height: '80px' },
        ],
      },
      {
        type: 'grid-container-snap-layout-cols-66-34',
        itemList: [
          { rounded: 'sm l-lg', height: '80px' },
          { rounded: 'sm r-lg', height: '80px' },
        ],
      },
      {
        type: 'grid-container-snap-layout-cols-33-34-33',
        itemList: [
          { rounded: 'sm l-lg', height: '80px' },
          { rounded: 'sm', height: '80px' },
          { rounded: 'sm r-lg', height: '80px' },
        ],
      },
      {
        type: 'grid-container-snap-layout-col-50-col-50-rows-50-50',
        itemList: [
          { rounded: 'sm l-lg', height: '40px' },
          { rounded: 'sm tr-lg', height: '40px' },
          { rounded: 'sm br-lg', height: '40px' },
        ],
      },
      {
        type: 'grid-container-snap-layout-cols-50-rows-50',
        itemList: [
          { rounded: 'sm tl-lg', height: '40px' },
          { rounded: 'sm tr-lg', height: '40px' },
          { rounded: 'sm bl-lg', height: '40px' },
          { rounded: 'sm br-lg', height: '40px' },
        ],
      },
      {
        type: 'grid-container-snap-layout-cols-20-30-20',
        itemList: [
          { rounded: 'sm l-lg', height: '80px' },
          { rounded: 'sm', height: '80px' },
          { rounded: 'sm r-lg', height: '80px' },
        ],
      },
    ],
  }),
}
</script>
<style>
.snap-layout-menu{
    /* position: absolute;
    left:10%; */
}

.grid-container-snap-layout-menu {
  display: grid !important;
  grid-template-columns: repeat(3, auto);
  gap: 12px 12px;
}
.grid-container-snap-layout-cols-50-50 {
  display: grid !important;
  grid-template-columns: repeat(2, 60px);
  column-gap: 4px;
}
.grid-container-snap-layout-cols-66-34 {
  display: grid !important;
  grid-template-columns: calc(120px * (66 / 100)) calc(120px * (34 / 100));
  column-gap: 4px;
}
.grid-container-snap-layout-cols-33-34-33 {
  display: grid !important;
  grid-template-columns: calc(120px * (33 / 100)) calc(120px * (34 / 100)) calc(
      120px * (33 / 100)
    );
  column-gap: 4px;
}
.grid-container-snap-layout-col-50-col-50-rows-50-50 {
  display: grid !important;
  grid-template-columns: repeat(2, 60px);
  /* grid-template-rows: 10px 10px; */
  column-gap: 4px;
  row-gap: 4px;
}
.grid-container-snap-layout-col-50-col-50-rows-50-50 > div:first-child {
  grid-row: span 2;
  height: auto !important;
}

.grid-container-snap-layout-cols-50-rows-50 {
  display: grid !important;
  grid-template-columns: repeat(2, 60px);
  /* grid-template-rows: 10px 10px; */
  column-gap: 4px;
  row-gap: 4px;
}

.grid-container-snap-layout-cols-20-30-20 {
  display: grid !important;
  grid-template-columns: calc(120px * (25 / 100)) calc(120px * (50 / 100)) calc(
      120px * (25 / 100)
    );
  /* grid-template-rows: 10px 10px; */
  column-gap: 4px;
  row-gap: 4px;
}

.snap-layout-item {
  background-color: #e0e0e0 !important;
  border: 2px solid #898989 !important;
  box-shadow: none !important;
}
.snap-layout-item:hover {
  background-color: #0068c0 !important;
  border: 2px solid #0068c0 !important;
}
</style>