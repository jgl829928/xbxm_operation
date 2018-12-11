// 接口统一归类

export const URL = {

  // base: 'https://172.16.9.159:9151',
  // // 权限URL
  // access: 'https://172.16.9.159:9151',

  base: 'http://172.16.9.122:9150',
  // 权限URL
  access: 'http://172.16.9.122:9200',

  // base: 'https://oms.uselect.com.cn',
  // // 权限URL
  // access: 'https://oms.uselect.com.cn'

}

const serviceModule = {
  // 查询所有商场
  marketSearch: `/business/basic/markets/list`,
  // 查询商场
  districtSearch: `/business/basic/markets/list/all`,
  // 查询设备分类-添加
  deviceCategory: `/business/property/rank`,
  // 获取省市
  getArea: `/business/basic/areas`,
  // 获取启用商场的省市
  cascaderMarket: `/business/basic/areas/market`,
  //获取所有商场的区域
  areaAll: `/business/basic/areas/all`,
  // 文件上传地址
  fileUpload: `/business/upload`

}
const ApiSetting = { ...serviceModule }

export default ApiSetting
