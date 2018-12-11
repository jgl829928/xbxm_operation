import { Loading } from 'element-ui'

//获取列表数据
export function getDataAll(page, data, url, _this) {
  var page = page
  _this.$http({
    url: url,
    methed: 'get',
    params: data
  }).then(res => {
    if (res) {
      if (res.code == 0 && res.data && res.page) {
        _this.itemList = res.data
        _this.pageparams = res.page
      } else if (res.code == 0 && res.data) {
        _this.itemList = res.data
      } else if (typeof res.page == "undefined") {
        _this.pageparams = {}
      } else if (typeof res.data == "undefined") {
        _this.itemList = []
      }
      if (res.code != 0) {
        _this.itemList = []
      }
    }
  })
}

/**
 * @param {Boolean} true => 剔除   false => 保留(暂时不支持)
 * @param {Array}  需要剔除的属性名字集合
 * @returns {Object} 过滤掉属性之后的对象
 */
export function keysFilter(targetObj, isDelete, arr) {
  let tempArr = [],
    unwantedArr = []
  if (!isDelete) {
    let keysArr = Object.keys(targetObj)
    for (let i = arr.length - 1; i >= 0; i--) {
      if (keysArr.includes(arr[i])) {
        keysArr.splice(keysArr.indexOf(arr[i]), 1)
      }
    }
    unwantedArr = keysArr
    console.log(unwantedArr)
  } else {
    unwantedArr = arr
  }
  let copyObj = function (originObj, newObj, arg) {
    /**
     *
     * @param {Object} 原对象
     * @param {Object} 目标对象
     * @param {Array} 要剔除或保留属性的数组集合
     * @returns {Object}
     */
    var newObj = newObj || {}
    for (let key in originObj) {
      if (!arg.includes(key)) {
        if (typeof originObj[key] === 'object') {
          newObj[key] = (originObj[key] instanceof Array) ? [] : {}
          copyObj(originObj[key], newObj[key], arg)
        } else {
          newObj[key] = originObj[key]
        }
      }
    }
    return newObj;
  }
  return copyObj(targetObj, null, unwantedArr)
}


export function objToStr(val) {
  if (val) {
    let params = '';
    for (let x in val) {
      if (val[x]) {
        params += `${x}=${val[x]}&`
      }
    }
    params = params.substr(0, params.length - 1);
    return params
  }
}


export function getUser(name) {
  return window.sessionStorage.getItem(name)
}

export function delUser(name) {
  return window.sessionStorage.setItem(name, null)
}

let loading , timer , needLoadingRequestCount = 0;

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中…',
    spinner: 'el-icon-loading',
    background: 'rgba(255,255,255,.5)'
  })
}

//打开loading
export function showFullScreenLoading(time = 300) {
  if (needLoadingRequestCount === 0) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(()=>{ startLoading() }, time);
  }
  needLoadingRequestCount++
}

//关闭loading
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    if(timer) clearTimeout(timer);
    setTimeout(()=>{
      if(loading) loading.close()
    }, 300)
  }
}


// 表单提交
export function clean_data(that) {
  this.$store.commit("delete_tabs", this.$route.meta.name);
}
