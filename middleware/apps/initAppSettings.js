export default ({ store }) => {
    const actionList = require('@/assets/json/apps/appSettingsMenuList.json')
    // actionList.forEach((action, index) => {
    //     Object.assign(action, { order: index + 1 })
    // });
    store.dispatch('apps/settings/initSettingsMenuList', actionList)
}