export default ({ store }) => {
    const actionList = require('@/assets/json/actionList.json')
    // actionList.forEach((action, index) => {
    //     Object.assign(action, { order: index + 1 })
    // });
    store.dispatch('windows/actionCenter/initActionList', actionList)
}