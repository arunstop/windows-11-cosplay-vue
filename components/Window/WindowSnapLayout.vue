<template>
  <v-card
    class="snap-layout grid-container-snap-layout-cols-33-34-33"
  >
    <v-card color="grey"></v-card>
    <v-card color="grey"></v-card>
    <v-card color="grey"></v-card>
  </v-card>
</template>
<script>
export default {}
</script>
<style>
.snap-layout {
  right: 0;
  bottom: 0;
  position: fixed !important;
  height: 100vh !important;
  width: 100% !important ;
  margin-bottom: 36px;
  z-index: 0;
}

.grid-container-snap-layout-cols-50-50 {
  display: grid !important;
  grid-template-columns: repeat(2, 50vw);
  /* column-gap: 4px; */
}
.grid-container-snap-layout-cols-66-34 {
  display: grid !important;
  grid-template-columns: calc(100vw * (66 / 100)) calc(100vw * (34 / 100));
  column-gap: 4px;
}
.grid-container-snap-layout-cols-33-34-33 {
  display: grid !important;
  grid-template-columns: calc(100vw * (33 / 100)) calc(100vw * (34 / 100)) calc(
      100vw * (33 / 100)
    );
  column-gap: 4px;
}
.grid-container-snap-layout-col-50-col-50-rows-50-50 {
  display: grid !important;
  grid-template-columns: repeat(2, 100vw);
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
</style>