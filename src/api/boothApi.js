import {URL} from './apiSetting'

const base=URL.base;
const access=URL.access;
/*包含摊位模块接口*/
const serviceModule = {

  // 摊位图
  boothMap:`/business/booth_map`,
  // 查询有商场的区域列表
  areasMarket:`/business/basic/areas/market`,
  // 摊位图详情
  boothMapParticulars:`${base}/business/booth_map/booth_code`,
  // 摊位分组
  boothGroups:`/business/booth_groups`,
  // 摊位分组详情
  boothParticulars:`/business/booth_groups/boothGroupsCode`,
  // 查询所有商场
  marketsName:`/business/booth_maintains/marketName`,
  // 获取楼层经理
  floorManagers:`${access}/user/employees/market/floor_managers`,
  // 获取商场楼层，区域
  marketFloor:`/business/booth_maintains/marketCode`,
  // 获取摊位
  boothList:`/business/booth_groups/marketCode`,
  // 摊位维护
  boothMaintains:`/business/booth_maintains`,
  // 摊位维护详情
  maintainsDetails:`/business/booth_maintains/boothCode`,
  // 类型名称
  boothName:`/business/booth_type/marketCode`,
  // 摊位类型设置
  boothType:`/business/booth_type`,
  // 摊位类型设置修改
  typeEdit:`/business/booth_type/boothCode`,
  // 摊位类型设置查看
  typeCheck:`/business/booth_type/boothTypeCode`,


}
const ApiSetting = { ...serviceModule }
export default ApiSetting
