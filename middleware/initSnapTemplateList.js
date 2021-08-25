export default({store})=>{
    const snapTemplateList = require('@/assets/json/snapTemplateList.json')
    console.log(snapTemplateList)
    store.dispatch('app/snap/initSnapTemplateList', snapTemplateList)
}