
import { URL } from './apiSetting'
const serviceModule = {
	// 合同签订列表
	contractSign: '/business/merchants',
  // 查询所有品牌
  brandsLists: '/business/brands/lists',
  // 查询所有商场
  marketsList: 'business/basic/markets/list',
  // 合同类型列表
  basicContracts: '/business/basic/contracts',
  // 进入新签合同界面
  contractsBaseInfo: '/business/contracts/baseinfo',
  // 合同审核查询
  checksLists: '/business/contracts/checks/lists',
  // 合同审核编辑合同编号
  editCodeNum: '/business/contracts/code_nums',
  // 合同变更合同查询
  alterLists: '/business/contracts/alter_lists',
  // 合同查询
  contractsLists: '/business/contracts/lists',
  // 分页列表查询合同模板&新增&修改
  contractTpls: '/business/contract_tpls',
  // 合同模版上传
  uploadContract: '/business/contract_tpls/files',
  // 未出租的摊位列表
  boothStatus: '/business/booth_maintains/boothStatus',
  // 进入预览合同页面（获取合同名称与对应code）
  preContract: '/business/contracts/precontract',
  // 提交审核之前预览合同的详细内容
  previewContract: '/business/contracts/contract',
  // 发送验证码
  sendMessage: '/business/contracts/message',
  // 提交合同进行审核
  postContracts: '/business/contracts',
  // 根据商场code查询楼层经理
  getFloorManagers: `${URL.access}/user/employees/market/floor_managers`,
  // 管理人员点击审核按钮显示的内容
  checkButtonUrl: '/business/contracts/check_button',
  // 合同审核
  contractsChecks: '/business/contracts/checks',
  // 审核过程中查看合同的详细内容
  queryCheckContract: '/business/contracts/query_check_contract',
  // 查看合同审核进度
  checkProgress: '/business/contracts/contract_check',
  // 盖章
  contractsSeal: '/business/contracts/seal',
};
const ApiSetting = { ...serviceModule };
export default ApiSetting
