export default({store})=>{
    const powerList = require('@/assets/json/powerList.json')
    store.dispatch('power/initPowerList', powerList)
}