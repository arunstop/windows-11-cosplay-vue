export default ({ store, $globals }) => {
    const appList = require('@/assets/json/appList.json')

    const addedId = [];
    const randomId = () => {
        const newId = Math.floor(Math.random() * 1001)
        const duplicatedId = addedId.find((item) => item === newId)
        if (!duplicatedId) {
            addedId.push(newId)
            return newId
        }
        else return randomId()
    }
    // const randomColorHex=()=>{
    // return '#'+Math.floor(Math.random()*16777215).toString(16)
    //   return '#000';
    // }
    const randomColorRgb = () => {
        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return `rgba(${getRandomInt(0, 255)},${getRandomInt(0, 255)},${getRandomInt(0, 255)},1)`
    }
    const windowSetting = (type = 'window', preOpen = false, taskbar = true, desktop = false) => {
        return {
            type, preOpen, taskbar, desktop, window: {
                show: false,
                fullscreen: false,
                snap: false,
            },
        }
    }

    // init app list
    let taskbarAppList = require('@/assets/json/taskbarAppList')
    appList.forEach(app => {
        const titleKebab = $globals.kebabStr(app.title)
        Object.assign(app, { id: randomId() })
        Object.assign(app, { iconColor: randomColorRgb() })
        if (app.type === "window") {
            const taskbared = taskbarAppList.includes(titleKebab)
            Object.assign(app, { ...windowSetting(app.type, false, taskbared, true) })
        } else if (app.type === 'notificationpanel' || app.type === 'actioncenter') {
            Object.assign(app, { ...windowSetting(app.type, true, false, false) })
        } else {
            Object.assign(app, { ...windowSetting(app.type, true, true, false) })
        }
        Object.assign(app, { titleKebab })
    })
    store.dispatch('app/initAppList', appList)

    // init taskbar app list
    taskbarAppList = [];
    appList.filter(app => app.taskbar).forEach(app => {
        taskbarAppList.push(app)
    });
    store.dispatch('app/initTaskbarAppList', taskbarAppList)

    const startAppList = [];
    appList.filter(app => app.start).forEach(app => {
        startAppList.push(app)
    });
    store.dispatch('app/initStartAppList', startAppList)

    // init recent item list
    const recentItemList = require('@/assets/json/recentItemList.json')
    recentItemList.forEach(recentItem => {
        Object.assign(recentItem, { iconColor: randomColorRgb() })
    })
    store.dispatch('app/initRecentItemList', recentItemList)

    // init taskbar app option list
    const taskbarAppOptionList = require('@/assets/json/taskbarAppOptionList')
    store.dispatch('app/initTaskbarAppOptionList', taskbarAppOptionList)
}