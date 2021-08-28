export const state = () => ({
    notificationList: [],
    optionList: [
        { id: 1, icon: 'mdi-cancel', label: 'Turn off all notification for app' },
        { id: 2, icon: 'mdi-cog-outline', label: 'Go to notification settings' },
        { id: 3, icon: 'mdi-exclamation-thick', label: 'Make app high priority' },
        // { icon: 'mdi-volume-mute', label: 'Mute' },
      ],
})

export const mutations = {
    INIT_NOTIF_LIST(state, list) {
        state.notificationList = list
    },
    REMOVE_NOTIF(state, notif) {
        // console.log(notif)
        state.notificationList = state.notificationList.filter(notifItem => notifItem !== notif)
    },
    CLEAR_NOTIF(state) {
        state.notificationList = []
    },
    REMOVE_NOTIF_BY_APP(state, app) {
        // console.log(notif)
        state.notificationList = state.notificationList.filter(notifItem => notifItem.app.name !== app.name)
    },
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
    },
}

export const actions = {
    initNotifList({ commit }, list) {
        commit('INIT_NOTIF_LIST', list)
    },
    removeNotif({ commit }, notif) {
        commit('REMOVE_NOTIF', notif)
    },
    clearNotif({commit}){
        commit('CLEAR_NOTIF')
    },
    removeNotifByApp({commit},app){
        commit('REMOVE_NOTIF_BY_APP', app)
    }
}