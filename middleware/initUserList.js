export default({store})=>{
    const userList = require('@/assets/json/userList.json')
    store.dispatch('user/initUserList', userList)
}