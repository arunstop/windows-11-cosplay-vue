export default({store})=>{
    const snapTemplateList = require('@/assets/json/snapTemplateList.json')
    store.dispatch('windows/snap/initSnapTemplateList', snapTemplateList)
}