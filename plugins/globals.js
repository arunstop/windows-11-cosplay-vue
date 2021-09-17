export default ({ app }, inject) => {
    // Generate key for animation/transition
    const usedKey = []
    const generateKey = () => {
        const newKey = (Math.random() + 1).toString(36).substring(4)
        const duplicatedKey = usedKey.find((item) => item === newKey)
        if (!duplicatedKey) {
            usedKey.push(newKey)
            return newKey
        }
        else return generateKey()
    }

    // Cut string
    const cutStr = (str, limit) => {
        if (str.length <= limit) return str
        else return str.substring(0, limit + 1) + '...'
    }

    // Clone Vuex state
    const cloneState = (stateVar) => {
        return JSON.parse(JSON.stringify(stateVar))
    }

    const kebabStr = (str) => {
        return str.replaceAll(" ", "-").toLowerCase()
    }

    const pascalStr = (str) => {
        let result = ''
        const split = str.split('-')
        split.forEach(s => {
            result = result.concat(s.charAt(0).toUpperCase() + s.slice(1))
        });
        return result
    }
    inject('globals', { generateKey, cutStr, cloneState, kebabStr, pascalStr })
}