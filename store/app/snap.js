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
    snapLayout: { type: '',fullscreen:false, appList: [] }
})

export const getters = {

}

export const mutations = {
    ADD_SNAP(state, item) {
        // if (state.snapLayout.fullscreen === true) {
        //     state.snapLayout.fullscreen = false
        // }
        if (state.snapLayout.type !== item.type) {
            state.snapLayout.appList = []
            state.snapLayout.type = item.type
        }
        const duplicate = state.snapLayout.appList.find((app) => app.id === item.app.id)
        if (duplicate) return
        state.snapLayout.appList.push(item.app)
    },
    CLOSE_SNAP_APP(state, id) {
        // const fullScreenedItems = state.snapLayout.appList.find(app=>app.id!==id && app.window.fullscreen===true)
        // if(!fullScreenedItems) state.snapLayout.fullscreen = false
        state.snapLayout.appList = state.snapLayout.appList.filter(item => item.id !== id)
        if (state.snapLayout.appList.length === 0) state.snapLayout.type = ''
    },
    // TOGGLE_SNAP_FULLSCREEN(state, value) {
    //     state.snapLayout.fullscreen = value
    // }
}

export const actions = {
    addSnap({ commit, dispatch }, item) {
        commit('app/window/SNAP_WINDOW', item.app.id, { root: true })
        commit('ADD_SNAP', item)
    },
    removeSnap({ commit, dispatch }, id) {
        commit('app/window/UNSNAP_WINDOW', id,{root:true})
        commit('CLOSE_SNAP_APP', id)
    },
    // toggleSnapFullscreen({ commit }, value) {
    //     commit('TOGGLE_SNAP_FULLSCREEN', value)
    // },
    closeSnapApp({ commit,state}, id) {
        commit('CLOSE_SNAP_APP', id)
    },
}