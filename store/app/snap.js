export const state = () => ({
    snapLayoutTemplate: [
        {
            type: 'grid-container-snap-layout-menu-cols-50-50',
            snapType: 'cols-50-50',
            max: 2,
            itemList: [
                { rounded: 'sm l-lg', height: '80px' },
                { rounded: 'sm r-lg', height: '80px' },
            ],
        },
        {
            type: 'grid-container-snap-layout-menu-cols-66-34',
            snapType: 'cols-66-34',
            max: 2,
            itemList: [
                { rounded: 'sm l-lg', height: '80px' },
                { rounded: 'sm r-lg', height: '80px' },
            ],
        },
        {
            type: 'grid-container-snap-layout-menu-cols-33-34-33',
            snapType: 'cols-33-34-33',
            max: 3,
            itemList: [
                { rounded: 'sm l-lg', height: '80px' },
                { rounded: 'sm', height: '80px' },
                { rounded: 'sm r-lg', height: '80px' },
            ],
        },
        {
            type: 'grid-container-snap-layout-menu-col-50-col-50-rows-50-50',
            snapType: 'col-50-col-50-rows-50-50',
            max: 3,
            itemList: [
                { rounded: 'sm l-lg', height: '40px' },
                { rounded: 'sm tr-lg', height: '40px' },
                { rounded: 'sm br-lg', height: '40px' },
            ],
        },
        {
            type: 'grid-container-snap-layout-menu-cols-50-rows-50',
            snapType: 'cols-50-rows-50',
            max: 4,
            itemList: [
                { rounded: 'sm tl-lg', height: '40px' },
                { rounded: 'sm tr-lg', height: '40px' },
                { rounded: 'sm bl-lg', height: '40px' },
                { rounded: 'sm br-lg', height: '40px' },
            ],
        },
        {
            type: 'grid-container-snap-layout-menu-cols-20-30-20',
            snapType: 'cols-20-30-20',
            max: 3,
            itemList: [
                { rounded: 'sm l-lg', height: '80px' },
                { rounded: 'sm', height: '80px' },
                { rounded: 'sm r-lg', height: '80px' },
            ],
        },
    ],
    snapLayout: { type: '', fullscreen: false, appList: [] }
})

export const getters = {
    getEmptySnapSlots(state) {
        return state.snapLayout.appList.find(app => app.initializer === true)
    },
    isSnapActivated(state) {
        return state.snapLayout.type !== ''
    },
    getSnapType(state) {
        return state.snapLayout.type
    },
    isItemActive: (state) => (id, type, index) => {

        return state.snapLayout.appList.find(app => app.id === id && app.index === index)
        // return state.snapLayout.appList.find(app => app.id === id && app.index === index && state.snapLayout === type)
    }
}

export const mutations = {
    ADD_SNAP(state, item) {
        const initializerItem = (index) => ({ index, initializer: true })
        // if (state.snapLayout.fullscreen === true) {
        //     state.snapLayout.fullscreen = false
        // }
        // const duplicateIndex = state.snapLayout. appList.find((app) => app.index === item.index)
        const templateTarget = state.snapLayoutTemplate.find((template) => template.snapType === item.type)
        const snapItems = []
        const duplicate = state.snapLayout.appList.find((app) => app.id === item.app.id)
        if (state.snapLayout.type !== item.type) {
            state.snapLayout.appList = []
            state.snapLayout.type = item.type
            for (let i = 0; i < templateTarget.max; i++) {
                if (i === item.index) {
                    snapItems.push({ ...item.app, index: i, initializer: false, })
                } else {
                    snapItems.push(initializerItem(i))
                }
            }
            if (duplicate) return
            state.snapLayout.appList = snapItems


        } else if (state.snapLayout.type === item.type) {
            state.snapLayout.appList.forEach(e=>{
                snapItems.push(e)
            })
            // check if app is already in the snap layout
            const deprecatedSlot = snapItems.find((app) => app.id === item.app.id)
            if (deprecatedSlot) {
                // if same app same slot
                if (deprecatedSlot.index === item.index) {
                    return
                }
                const targetSlot = snapItems.find(app => app.index === item.index)
                // if target slot is an initializer swap the apps
                if (targetSlot.initializer === false) {
                    // return
                    snapItems[deprecatedSlot.index] = { ...targetSlot, index: deprecatedSlot.index, initializer: false, }
                } else {
                    snapItems[deprecatedSlot.index] = initializerItem(deprecatedSlot.index)
                }
            }
            // Applies the app to the targeted slot
            snapItems[item.index] = { ...item.app, index: item.index, initializer: false, }
            // Should initialize the REACTIVE props first to change it
            state.snapLayout.appList = [...snapItems]
        }
    },
    CLOSE_SNAP_APP(state, id) {
        // const fullScreenedItems = state.snapLayout.appList.find(app=>app.id!==id && app.window.fullscreen===true)
        // if(!fullScreenedItems) state.snapLayout.fullscreen = false
        const lastAppStanding = state.snapLayout.appList.filter((app) => app.initializer === false)
        if (lastAppStanding.length === 1) {
            // alert('last app standing')
            state.snapLayout.appList = state.snapLayout.appList.filter(app => app.id !== id && app.initializer === false)
        }
        else {
            const snapItems = [];
            state.snapLayout.appList.forEach(element => {
                let newEl = element
                if (element.id === id) {
                    newEl = { index: element.index, initializer: true }
                }
                snapItems.push(newEl)
            });
            // state.snapLayout.appList = state.snapLayout.appList.filter(app => app.id !== id)

            state.snapLayout.appList = [...snapItems]
        }
        if (state.snapLayout.appList.length === 0) state.snapLayout.type = ''
    },
    CLEAR_SNAP_APP(state) {
        state.snapLayout.appList = []
    },
    REMOVE_SNAP_LAYOUT(state) {
        state.snapLayout = { type: '', fullscreen: false, appList: [] }
    }
}

export const actions = {
    addSnap({ commit, state, dispatch }, item) {
        if (state.snapLayout.type !== item.type) {
            // alert('different type, reconstructing')
            state.snapLayout.appList.forEach(element => {
                if (element.id) {
                    dispatch('removeSnap', element.id)
                    dispatch('app/window/toggleWindow', { id: element.id }, { root: true })
                }
                else {
                    commit('CLEAR_SNAP_APP')
                }
            });
        } else if (item.app.window.snap === false) {
            const targetSlot = state.snapLayout.appList.find(app => app.index === item.index)
            if (targetSlot.initializer === false) {
                dispatch('removeSnap', targetSlot.id)
            }
        } else if(state.snapLayout.appList.find(app=>app.id === item.app.id && app.index === item.index)){
            dispatch('removeSnap', item.app.id)
            return
        }
        commit('app/window/SNAP_WINDOW', item.app.id, { root: true })
        commit('ADD_SNAP', item)
    },
    removeSnap({ commit, dispatch }, id) {
        commit('app/window/UNSNAP_WINDOW', id, { root: true })
        commit('CLOSE_SNAP_APP', id)
    },
    // toggleSnapFullscreen({ commit }, value) {
    //     commit('TOGGLE_SNAP_FULLSCREEN', value)
    // },
    closeSnapApp({ commit, state }, id) {
        commit('CLOSE_SNAP_APP', id)
    },
    removeSnapLayout({ commit }) {
        commit('REMOVE_SNAP_LAYOUT')
    }
}