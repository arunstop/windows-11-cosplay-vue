export const state = () => ({
    notificationList: require('@/assets/json/notificationList.json'),
    optionList: [
        { id: 1, icon: 'mdi-volume-mute', label: 'Mute app' },
        { id: 2, icon: 'mdi-cancel', label: 'Block all notifications' },
        { id: 3, icon: 'mdi-close', label: 'Cancel' },
        // { icon: 'mdi-volume-mute', label: 'Mute' },
      ],
})

export const mutations = {
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
    getNotifOptionList:(state)=>(app)=>{
        const optionList = JSON.parse(JSON.stringify(state.optionList))
        optionList.forEach(o=>{
            if(o.id===1){
                o.label =o.label.replace('app', app.name)
            }
        })
        return optionList
    }
}

export const actions = {
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