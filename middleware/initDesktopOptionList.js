export default ({ store }) => {
    const desktopOptionList = [
        {
            icon: "mdi-view-grid-outline", label: "View", subItemList: [
                "1", "2"
            ], underLined: false
        },
        {
            icon: "mdi-swap-vertical", label: "Sort By", subItemList: [
                "1", "2"
            ], underLined: true
        },
        { icon: "mdi-refresh", label: "Refresh", subItemList: [], underLined: false },
        { icon: "", label: "Next desktop background", subItemList: [], underLined: false },
        { icon: "", label: "Paste shortcut", subItemList: [], underLined: false },
        { icon: "mdi-undo-variant mdi-rotate-315", label: "Undo Move", subItemList: [], underLined: false },
        {
            icon: "mdi-plus-circle-outline", label: "New Item", subItemList: [
                "1", "2"
            ], underLined: true
        },
        { icon: "mdi-application-cog mdi-rotate-180", label: "Display settings", subItemList: [], underLined: false },
        { icon: "mdi-pencil-outline", label: "Personalize", subItemList: [], underLined: true },
        { icon: "mdi-console", label: "Open in Windows Terminal", subItemList: [], underLined: true },
        { icon: "mdi-card-plus-outline", label: "Show more options", subItemList: [], underLined: true },
    ]

    store.dispatch('desktop/initDesktopOptionList', desktopOptionList)
}