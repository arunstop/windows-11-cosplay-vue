export default ({ app, $axios }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  const api = $axios.create({
    baseURL: "https://bing-news-search1.p.rapidapi.com",
    headers: {
      'x-bingapis-sdk': 'true',
      'x-rapidapi-key': '06c63c9618msh6cc1c9280fe136bp161b05jsn00c0ba4cb4e2',
      'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com'
    }
  })

  const endPoints = {
    // msg: (msg) => console.log(`Hello ${msg}!`),
    showTrending: () => {
      return api.get('news', {
        params: {
          textFormat: 'Raw',
          safeSearch: 'Off',
          mkt: 'en-ID',
          headlineCount: '32',
        }
      })
    },
  }
  inject('news', endPoints)
}