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

}

export const mutations = {
    ADD_SNAP(state, item) {
        // if (state.snapLayout.fullscreen === true) {
        //     state.snapLayout.fullscreen = false
        // }
        // const duplicateIndex = state.snapLayout. appList.find((app) => app.index === item.index)
        const templateTarget = state.snapLayoutTemplate.find((template) => template.snapType === item.type)
        let snapItems = []
        const duplicate = state.snapLayout.appList.find((app) => app.id === item.app.id)
        if (state.snapLayout.type !== item.type) {
            state.snapLayout.appList = []
            state.snapLayout.type = item.type
            for (let i = 0; i < templateTarget.max; i++) {
                if (i === item.index) {
                    snapItems.push({ index: i, initializer: false, ...item.app })
                } else {
                    snapItems.push({ index: i, initializer: true })
                }
            }
            if (duplicate) return
            state.snapLayout.appList = snapItems


        } else if (state.snapLayout.type === item.type) {

            // alert('same')
            // const notinitializer = state.snapLayout.appList.find(element=>element.initializer===false)
            //     snapItems.push(notinitializer)
            // for (let i = 0; i < templateTarget.max; i++) {
            //     if (i === item.index) {
            //         snapItems.push({ index: i, initializer: false, ...item.app })
            //     }
            // }
            snapItems = state.snapLayout.appList;
            snapItems[item.index] = { index: item.index, initializer: false, ...item.app }
            // snapItems.forEach(element => {
            //     console.log(element.index)
            // });
            if (duplicate) return
            // Should initializer the REACTIVE props first to change it
            state.snapLayout.appList = []
            state.snapLayout.appList = snapItems
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

            state.snapLayout.appList = []
            state.snapLayout.appList = snapItems
        }
        if (state.snapLayout.appList.length === 0) state.snapLayout.type = ''
    },
    CLEAR_SNAP_APP(state){
        state.snapLayout.appList = []
    }
    // TOGGLE_SNAP_FULLSCREEN(state, value) {
    //     state.snapLayout.fullscreen = value
    // }
}

export const actions = {
    addSnap({ commit, state,dispatch }, item) {
        if(state.snapLayout.type !== item.type){
            // alert('different type, reconstructing')
            state.snapLayout.appList.forEach(element => {
                if(element.id){
                    dispatch('removeSnap', element.id)
                    dispatch('app/window/toggleWindow', {id :element.id}, { root: true })

                }
                else{
                    commit('CLEAR_SNAP_APP')
                }
            });
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
}