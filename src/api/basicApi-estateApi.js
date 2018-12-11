

const serviceModule = {
   //首页------------------------------------------
   //摊位统计查询
   statisticsBooths:`/business/statistics/booths`,

   //摊位统计查询
   contractMerchants:`/business/statistics/contract_merchants`,

   //财务统计查询
  tatisticsFinancial:`/business/statistics/financial`,

  //维保统计查询
  statisticsProperties:`/business/statistics/properties`,

   	//基础信息-------------------------------------
	//合同类型设置
	constractsList:`/business/basic/contracts`,

	//基础参数设置
	basicParams:`/business/basic/preferences`,

	//消息模版
	basicTemplate:`/business/basic/templates`,

	//费用类型 增改查
	expences: `/business/basic/expences`,
	//获取全部费用类型
	expencesContract:`/business/basic/expences/contract`,

	//审核流程 增改查
	audits: `/business/basic/audits`,
	//获取审核人角色
	auditsRoles:`/business/basic/audits/roles`,

	//区域管理
	partition: `/business/basic/partition`,

	//商场维护
	markets:`/business/basic/markets`,


// -------------------物业--------------
	//设备表示图片上传接口
	imageUpload:`/business/property/resource`,
	//查询设备编码
	allCode:`/business/property/allCode`,
	//根据编码查询名称
	equipmentCode:`/business/property/equipmentCode`,
	// 服务范围增查
	serveRange:`/business/property/serve`,
	//查询所有物业公司
	companyList:`/business/property/select/company`,

	//物业设备列表查询-添加物业设备
	estateDevice:`/business/property/equipment`,
	
	//物业维保 增删改查
	 maintenance: `/business/property/maintenance`,

	 //物业公司 增删改查
	company:`/business/property/company`,

	//物业财务 增删改查
	finance:`/business/property/finance`,
		//查询考核记录记录
	financeCheck:`/business/property/finance/check`,
	//应付合同费用查询
	financeContract:`/business/property/finance/contract`,

	//员工管理
	staff:`/business/property/staff`,

}
const ApiSetting = { ...serviceModule }
export default ApiSetting
