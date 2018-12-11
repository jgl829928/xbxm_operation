import axios from 'axios'
import routes from '@/routes'
import store from '@/vuex/store'
import { Message } from 'element-ui'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/auth'
import { URL } from '../api/apiSetting'
export const http = axios.create({
  baseURL:URL.base,
  timeout: 1000 * 10,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  },
  showLoading:true,
  delayLoading:true
});

// 请求拦截器
http.interceptors.request.use(function (config) {
  config.headers["gTicket"] = store.state.gTicket;
  if(config.showLoading) {
    if(config.delayLoading){
      showFullScreenLoading();
    }else {
      showFullScreenLoading(0);
    }
  }
  if(config.headers['gTicket'] == null ){
      routes.replace({
        path: '/login' // 到登录页重新获取token
      })
  }
  return config
}, function (error) {
  Message.error('请求失败,请重试');
  tryHideFullScreenLoading();
  return Promise.reject(error)
});

//响应拦截器异常处理
http.interceptors.response.use(response => {
  let code = response.data.code
  //下载文件
  if(response && response.headers['content-type']==='application/x-msdownload'){
    return response;
  }
  if(response && response.headers['content-type']==='application/octet-stream'){
    return response;
  }
  tryHideFullScreenLoading()
  if (response && response.data.code !== 0) {
    if(routes.history.current.name !== 'login'){
      Message.error(`${response.data.msg}`)
    }
    if (Object.is(code, -2) || Object.is(code, -11)) {
      store.dispatch('setgTicket', null)
      routes.push('/login')
    } else if (!Object.is(routes.history.current.path, '/login')) {
      return false
    }
  } else if (!response) {
    Message.error(`连接错误`)
  }
  return response.data;
}, err => {
  tryHideFullScreenLoading();
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        Message.error('错误请求');
        break;
      case 404:
        Message.error('当前资源不存在');
        break;
      case 500:
        Message.error('服务器忙，请重试');
        break;
      case 401:
        Message.error('未授权，请重新登录');
        break;
      case 403:
        Message.error('拒绝访问');
        break;
      case 408:
        Message.error('请求超时');
        break;
      case 502:
        Message.error('网络错误');
        break;
      case 503:
        Message.error('服务不可用');
        break;
      default:
        Message.error(`连接错误`);
    }
  } else {
    Message.error(`当前网络不可用 请稍后重试`)
  }
  return false
});

http.all = axios.all;

//定义插件的配置来扩展 Vue 本身
const httpPlugin = {};
httpPlugin.install = function (Vue, options) {
  Vue.prototype.$http = http
};

export default httpPlugin
