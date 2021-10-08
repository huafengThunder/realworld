const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => ({
  user: null
})

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) { //服务端渲染期间自动调用
    let user = null
    if (req.headers.cookie) {
      // 将请求头中的 Cookie 字符串解析为一个对象     
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        // 将 user 还原为 JavaScript 对象        
        user = JSON.parse(parsed.user)
      }
      catch (err) {
        console.log(err)
        // No valid cookie found      
      }
    }
    commit('setUser', user)
  }
}
