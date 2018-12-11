

const serviceModule = {
    // 工程维护
    maintainList:`/business/engineering/maintain`,
    // 工程维护操作
    addmaintain:`/business/engineering/maintain`,
    // 工程日志
    logList:`/business/engineering/log`,
    // 添加工程日志
    addLog:`/business/engineering/log`,
    // 获取工程名称
    engName:`/business/engineering/maintain/engname`,


}
const ApiSetting = { ...serviceModule }
export default ApiSetting