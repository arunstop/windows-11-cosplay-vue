export const state = () => ({
  counter: 0,
  title: 'Title',
  apps: [
    { icon: 'mdi-microsoft-windows', label: '' },
    { icon: 'mdi-magnify', label: '' },
    { icon: 'mdi-folder', label: '' },
    { icon: 'mdi-cart', label: '' },
  ],
  trays: [
    { icon: 'mdi-chevron-up', label: '' },
    { icon: 'mdi-wifi', label: '' },
    { icon: 'mdi-volume-high', label: '' },
    { icon: 'mdi-battery-high', label: '' },
  ],
  dialog: {
    show: false,
    fullscreen: false,
  }
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  toggleDialog(state) {
    state.dialog.show = !state.dialog.show
  },
  toggleFullScreen(state){
    state.dialog.fullscreen = !state.dialog.fullscreen
  }
}