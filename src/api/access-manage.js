import { URL } from './apiSetting'

const url = URL.access
// 朱富平
// const url="http://172.16.102.138:9200";
// 魏聪
// const url="http://172.16.102.165:9200";

const serviceModule = {
  // 登录
  login: `${url}/user/accounts/login`,

  // 查询所有角色名称
  roleNameList: `${url}/user/roles/allrole`,
  // 查询商场
  marketList: `/business/basic/markets/list`,
  // 查询该商场下的商户
  merchantList: `/business/merchants/simpleinfo`,
  // 人员列表
  employees: `${url}/user/employees`,

  // 角色列表
  roleList: `${url}/user/roles/search`,
  // 添加修改角色获取角色详情
  operate_role: `${url}/user/roles`,

  // 创建菜单
  createMenu: `${url}/user/menus`,
  // 为角色分配权限
  distribute_access: `${url}/user/roles/grant`,

  // 登出
  loginOut: `${url}/user/accounts/actions/logout`,

  // 获取用户详细信息
  userInfo: `${url}/user/employees/emp_info`,
  
  menus:`${url}/user/menus`,
  // 修改登录密码
  change_pwd: `${url}/user/accounts`,

  menus: `${url}/user/menus`,

  roleMenus:`${url}/user/menus/login`,

  upload_employeesInfo:`${url}/user/employees/actions/upload_excel`

  
}
const ApiSetting = {...serviceModule}
export default ApiSetting
