export default ({ store }) => {
    const notifList =require('@/assets/json/notificationList.json')
    // notifList.forEach((action, index) => {
    //     Object.assign(action, { order: index + 1 })
    // });
    store.dispatch('user/notification/initNotifList', notifList)
}