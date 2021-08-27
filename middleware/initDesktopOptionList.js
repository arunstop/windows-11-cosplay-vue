export default ({ store }) => {
    const desktopOptionList = require('@/assets/json/desktopOptionList.json')

    store.dispatch('desktop/initDesktopOptionList', desktopOptionList)
}