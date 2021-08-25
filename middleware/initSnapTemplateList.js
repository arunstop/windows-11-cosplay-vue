export default({store})=>{
    const snapTemplateList = require('@/assets/json/snapTemplateList.json')
    store.dispatch('app/snap/initSnapTemplateList', snapTemplateList)
}