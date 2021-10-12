import axios from "axios";
const request = axios.create({
  baseURL:"https://conduit.productionready.io",
  headers: { 'content-type': 'application/json' }
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  config.headers.Authorization=``
  return config;
}, function (error) {
  return Promise.reject(error);
});
export default request