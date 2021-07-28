import Vue2Storage from 'vue2-storage'
export default ({ app, }, inject) => {
    // Inject $hello(msg) in Vue, context and store.
const storage = new Vue2Storage({
    prefix: 'app_',
    driver: 'local',
    ttl: 60 * 60 * 24 * 1000, // 24 hours
})

    inject('localStorage', storage)
}