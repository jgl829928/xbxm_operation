/*包含运营、商户、统计查询接口*/
import { URL } from '../api/apiSetting'
const serviceModule = {
  /*商户管理*/

  // 查询商户列表
  merchants: `/business/merchants`,
  // 商户列表下拉框数据
  merchantsOptionInfo: `/business/merchants/baseinfo`,
  // 新增商户上传图片
  uploadPicture: `/business/merchants/pictures/uploads`,

  // 品牌：品牌类型下拉列表
  brandTypeOption: `/business/brands/types`,
  marketOption: `/business/basic/markets/list`,
  // 品牌：获取品牌列表
  brandList: `/business/brands`,
  // 所有品牌
  allBrand: `/business/brands/lists`,
  // 所有商场
  allStore: `/business/basic/markets/list`,
  // 所有商场
  allManageType: `/business/basic/manage_type`,

  // 统计查询

  // 摊位类型下拉框
  allBoothType: `/business/booth_type`,
  // 摊位状态下拉框
  allBoothStatus: `/business/booth_maintains`,
  // 摊位列表
  boothList: `/business/booth_maintains`,
  // 收款信息列表
  inComeList: `business/transaction_records`,
  // 导出收款信息
  exportIncomeList: `/business/transaction_records/exporting`,

  // 运营管理：
  // 商场月度任务指标
  marketMonthList: `/business/month/tasks/market`,
  // 经理月度任务指标
  managerMonthList: `/business/month/tasks/manager`,
  // 月度任务指标审核
  judgeMonthTask: `/business/month/tasks/audit`,
  // 获取省下拉列表
  provinceOption: `/business/basic/areas`,
  // 月度任务指标
  monthTaskTarget: `/business/month/tasks/month`,
  // 月度任务指标保存和提交
  monthTaskSubmit: `/business/month/tasks/edit`,
  //月度任务指标考核列表
  monthCheckList: `/business/month/examinations/list`,
  //获取楼层经理下拉列表
  floorManagerOption: `${URL.access}/user/employees/market/floor_managers`,
  //消息提醒记录
  messageList: `/business/operation/messages`,
  //提醒管理列表
  remindersList: `/business/operation/reminders/list`,
  //提醒管理列表的提醒类型下拉框
  remindOption: `/business/operation/reminders/topics`,
  //删除提醒
  deleteRemind: `/business/operation/reminders`,

  //商场招商列表
  attractList: `/business/operation/merchants`,
  //商铺招商列表跟进记录
  attractFollowRecord: `/business/merchants/records`,
  //广告位列表
  advertiseList: `/business/operation/billboards`,
  //获取单个广告位信息
  oneAdvertise: `/business/operation/billboards/detail`,
  //停用启用广告位
  isStartUseBillboards: `/business/operation/billboards/valid`,
  //广告位出租列表
  advertiseRentalList: `/business/operation/billboards/rent`,
  //根据商场获取广告位下拉列表
  selectAdvertiseOption: `/business/operation/billboards/simple`,
  //修改广告位出租 获取单条出租信息
  singleRental: `/business/operation/billboards/rent/info`,

  //广告位招商管理列表
  advertising: `/business/operation/billboards/apply`,
  advertisingFollowList: `/business/app/billboard/followed/records`,

  //内容管理列表
  contentList: `/business/operation/contents/list`,
  //新增内容
  addContent: `/business/operation/contents`,
  //发布内容
  publishContent: `/business/operation/contents/release`,
  //获取单条内容信息
  singleContent: `/business/operation/contents/info`,

}
const ApiSetting = {...serviceModule}
export default ApiSetting
