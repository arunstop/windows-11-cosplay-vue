export const state = () => ({
    notificationList: require('@/assets/json/notificationList.json')
})

export const mutations = {
    REMOVE_NOTIF(state, notif) {
        // console.log(notif)
        state.notificationList = state.notificationList.filter(notifItem => notifItem !== notif)
    },
    CLEAR_NOTIF(state) {
        state.notificationList = []
    }
}

export const getters = {
    getNotificationList: (state) => () => {
        // console.log(state.notificationList)
        return state.notificationList
    },
    getGroupedNotifList: (state) => () => {
        const nList = state.notificationList
        const groupedNList = []
        nList.map((currentVal) => {
            const duplicatedItem = groupedNList.find((gnli) => gnli.app.name === currentVal.app.name)
            if (!duplicatedItem) {
                groupedNList.push({ app: currentVal.app, notifList: [currentVal] })
            } else {
                groupedNList.find(gnli => {
                    if (gnli.app.name === duplicatedItem.app.name) {
                        // delete currentVal.app
                        gnli.notifList.push(currentVal)
                    }
                    return ''
                })
            }
            return ''
        })
        // console.log(groupedNList)
        return groupedNList
    }
}

export const actions = {
    removeNotif({ commit }, notif) {
        commit('REMOVE_NOTIF', notif)
    },
    clearNotif({commit}){
        commit('CLEAR_NOTIF')
    }
}