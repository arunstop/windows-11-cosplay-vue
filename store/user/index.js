export const state = () => ({
    userList: [
        {
            name: 'Daniel Force Forthmay', email: 'user1@outlook.com',
            pin: '123123', image: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', status: 'LOGGED_OFF'
        },
        {
            name: 'Javier de la Pepega', email: 'user2@outlook.com',
            pin: '123123', image: 'https://cdn.vuetifyjs.com/images/lists/2.jpg', status: 'LOGGED_OFF'
        },
        {
            name: 'Camille Mariam Hotpokket', email: 'user3@outlook.com',
            pin: '123123', image: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', status: 'LOGGED_OFF'
        },
        {
            name: 'Karen K Karen', email: 'user4@outlook.com',
            pin: '123123', image: 'https://cdn.vuetifyjs.com/images/lists/4.jpg', status: 'LOGGED_OFF'
        },
    ]
})

export const mutations = {

    toggleDrawerState(state, data) {
        state.drawerState = data
    },
}

export const getters = {
    drawerState: (state) => state.drawerState,
    dateNow: () => {
        const now = new Date()
        const addZero = (x) => {
            if (x < 10) {
                x = '0' + x
            }
            return x
        }
        return {
            hours:
                addZero(now.getHours()) + ':' + addZero(now.getMinutes()),
            fullDate:
                addZero(now.getDate()) +
                '/' +
                addZero(now.getMonth() + 1) +
                '/' +
                now.getFullYear(),
        }
    }
}

export const setters = {

}


export const actions = {
}