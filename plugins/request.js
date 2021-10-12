import axios from "axios";
export const request = axios.create({
  // baseURL: "https://conduit.productionready.io",
  baseURL: "http://realworld.api.fed.lagounews.com",
  // headers: { 'content-type': 'application/json' }
})

//插件导出函数必须作为default成员
export default ({ store }) => {
  // console.log(store)
  // 添加请求拦截器
  request.interceptors.request.use(function (config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
}