export default ({ store, $globals }) => {

    const assignId = (element) => {
        Object.assign(element, { id: $globals.kebabStr(element.label) })
    }

    const addIdToList = (list) => {
        list.forEach(el => {
            assignId(el)
            el.subItem?.forEach(subEl => {
                assignId(subEl)
            });
        });
    }


    const desktopOptionList = require('@/assets/json/desktopOptionList.json')
    addIdToList(desktopOptionList)
    store.dispatch('desktop/initDesktopOptionList', desktopOptionList)

    const desktopIconOptionList = require('@/assets/json/desktopIconOptionList.json')
    addIdToList(desktopIconOptionList)
    store.dispatch('desktop/initDesktopIconOptionList', desktopIconOptionList)
}