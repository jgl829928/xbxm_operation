

const serviceModule = {
	//巡检考核列表
    chacktaskList:`/business/property/assess`,
    // 物业公司查询
    estateCompany:`/business/property/select/company`,
    // 商场查询
    marketList:`/business/basic/markets/list`,
    // 巡检签到记录
    signRecord:`/business/property/sign`,
    // 巡检报告记录
    reportRecord:`/business/property/report`,
    // 巡检任务管理
    taskList:`/business/property/task`,


    // 巡检点管理列表
    pointList:`/business/property/point`,
    // 添加巡检点
    addPoint:`/business/property/point`,
    // 查询巡检点配置
    pointSet:`/business/property/point`,
    // 巡检点配置操作
    addPointSet:`/business/property/config`,
    // 根据商场获取物业公司
    company:`/business/property/config/company`,
    // 获取物业公司下物业人员
    staff:`/business/property/config/staff`,

    // 查询维修记录
    repairList:`/business/property/repair`,
    // 获取所有维护类型
    repairType:`/business/property/repair/type`,
    // 操作维修记录
    operate_repair:`/business/property/repair`,
    
}
const ApiSetting = { ...serviceModule }
export default ApiSetting