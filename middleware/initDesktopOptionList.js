export default ({ store }) => {
    const desktopOptionList = [
        {
            icon: "mdi-view-grid-outline", label: "View", keyboard: "", disabled:false, underLined: false, subItemList: [
                { icon: "mdi-checkbox-blank-outline", label: "Large icons", active: false, keyboard: "Ctrl + Shift + 2", disabled:false, underLined: false },
                { icon: "mdi-grid-large", label: "Medium icons", active: true, keyboard: "Ctrl + Shift + 3", disabled:false, underLined: false },
                { icon: "mdi-grid", label: "Small icons", active: false, keyboard: "Ctrl + Shift + 4", disabled:false, underLined: true },
                { icon: "mdi-flash-auto", label: "Auto arrange icons", active: false, keyboard: "", disabled:true, underLined: false },
                { icon: "mdi-file-table-box-outline mdi-flip-v", label: "Align icons to grid", active: false, keyboard: "", disabled:true, underLined: true },
                { icon: "", label: "Show desktop icons", active: false, keyboard: "", disabled:false, underLined: false },
            ]
        },
        {
            icon: "mdi-swap-vertical", label: "Sort By", keyboard: "", disabled:false, underLined: false, subItemList: [
                "1", "2"
            ]
        },
        { icon: "mdi-refresh", label: "Refresh", keyboard: "F5", disabled:false, underLined: true, subItemList: [] },
        { icon: "", label: "Next desktop background", keyboard: "", disabled:false, underLined: false, subItemList: [] },
        { icon: "", label: "Paste shortcut", keyboard: "", disabled:true, underLined: false, subItemList: [] },
        { icon: "mdi-undo-variant mdi-rotate-315", label: "Undo", keyboard: "Ctrl + Z", disabled:false, underLined: false, subItemList: [] },
        { icon: "mdi-redo-variant mdi-rotate-45", label: "Redo", keyboard: "Ctrl + Y", disabled:false, underLined: false, subItemList: [] },
        {
            icon: "mdi-plus-circle-outline", label: "New Item", keyboard: "", disabled:false, underLined: true, subItemList: [
                "1", "2"
            ]
        },
        { icon: "mdi-application-cog mdi-rotate-180", label: "Display settings", keyboard: "", disabled:false, underLined: false, subItemList: [] },
        { icon: "mdi-brush", label: "Personalize", keyboard: "", disabled:false, underLined: true, subItemList: [] },
        { icon: "mdi-console", label: "Open in Windows Terminal", keyboard: "", disabled:false, underLined: true, subItemList: [] },
        { icon: "mdi-card-plus-outline", label: "Show more options", keyboard: "Shift + F5", disabled:false, underLined: true, subItemList: [] },
    ]

    store.dispatch('desktop/initDesktopOptionList', desktopOptionList)
}