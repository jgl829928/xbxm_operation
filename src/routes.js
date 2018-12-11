import Vue from 'vue'
import Router from 'vue-router'

const NotFound = () => import('./views/errorPage/404.vue');
const index = () => import('./views/index/index.vue');
const Login = () => import('./views/login/index.vue');

// -------------------------基础信息-----------------------------
const basic_url = "./views/basic_info/"
const basic_info = {
    costSetting: () => import(`${basic_url}cost_setting`),
    auditProcess: () => import(`${basic_url}audit_process`),
    districtMag: () => import(`${basic_url}district_manage`),
    mallsMain: () => import(`${basic_url}malls_maintenance`),
    basicParams: () => import(`${basic_url}param_setting/basic_params`),
    contractType: () => import(`${basic_url}param_setting/contract_type`),
    messageModules: () => import(`${basic_url}param_setting/message_template`),
}

// -------------------------摊位管理-----------------------------
const booth_url = "./views/booth_manage/"
const booth = {
    boothGroupe: () => import(`${booth_url}booth_grouping`),
    boothMap: () => import(`${booth_url}booth_map`),
    // boothMerger:() => import(`${booth_url}booth_merger`),
    // boothSplit: () => import(`${booth_url}booth_split`),
    boothType: () => import(`${booth_url}booth_type`),
    boothMain: () => import(`${booth_url}booth_maintenance`),
}

// --------------------------合同管理--------------------------------
const contact_url = './views/contract_manage/'
const contact = {
    contactSign: () => import(`${contact_url}contact_signing`),
    newSignHandle: () => import(`${contact_url}contact_signing/newSignHandle`),
    renewSignHandle: () => import(`${contact_url}contact_signing/renewSignHandle`),

    contractAudit: () => import(`${contact_url}contract_audit`),
    contractReview: () => import(`${contact_url}contract_audit/contractReview`),
    viewContract: () => import(`${contact_url}contract_audit/viewContract`),

    contractChange: () => import(`${contact_url}contract_change`),
    conChangeHandle: () => import(`${contact_url}contract_change/contractChange`),

    contractSearch: () => import(`${contact_url}contract_search`),
    templateMain: () => import(`${contact_url}template_maintenance`),
}

// -------------------------运营管理---------------------------------
const operation_url = './views/operation_manage/'
const operation = {
    managerTask: () => import(`${operation_url}manager_task`),
    marketTask: () => import(`${operation_url}market_task`),
    messageAlert: () => import(`${operation_url}message_alert`),
    monthlyTask: () => import(`${operation_url}monthly_task`),
    taskCheck: () => import(`${operation_url}task_check`),
    customer: () => import(`${operation_url}customer_manage`),
    warn: () => import(`${operation_url}warn_manage`),
    mnangement: () => import(`${operation_url}mnangement`),
    // 广告位
    adsense: () => import(`${operation_url}adsense_manage/adsense_manage`),
    editAdsense: () => import(`${operation_url}adsense_manage/edit_adsense`),
    advertising: () => import(`${operation_url}adsense_manage/advertising_manage`),
    addAdsense: () => import(`${operation_url}adsense_manage/add_adsense`),
    rental: () => import(`${operation_url}adsense_manage/rental_manage`),
    addRental: () => import(`${operation_url}adsense_manage/add_rental`),
    editRental: () => import(`${operation_url}adsense_manage/edit_rental`),
    // 内容管理
    content: () => import(`${operation_url}content_manage/content_manage`),
    addContent: () => import(`${operation_url}content_manage/add_content`),
    editContent: () => import(`${operation_url}content_manage/edit_content`),
}


// ------------------------商户管理--------------------------------
const merchant_url = "./views/merchant_manage/"
const merchant = {
    brandMain: () => import(`${merchant_url}brand_maintenance`),
    merchantManage: () => import(`${merchant_url}merchant_manage`),
    addMerchant: () => import(`${merchant_url}add_merchant`),
    editMerchant: () => import(`${merchant_url}edit_merchant`),
    merchantInfo: () => import(`${merchant_url}merchant_info`),
    assistant: () => import(`${merchant_url}assistant_manage`),
    attendance: () => import(`${merchant_url}attendance_management/management`),
    arrangeClasses: () => import(`${merchant_url}attendance_management/arrange_classes`),
    attendanceRecord: () => import(`${merchant_url}attendance_management/record`),
    attendanceSetting: () => import(`${merchant_url}attendance_management/setting`),
}


// -------------------------财务管理-------------------------------
const financial_url = "./views/financial_manage/"
const financial = {
    contractReceipts: () => import(`${financial_url}contract_receipts`),
    contractCashIn: () => import(`${financial_url}contract_receipts/cashIn`),
    contractRefunds: () => import(`${financial_url}contract_refunds`),
    contractRefAction: () => import(`${financial_url}contract_refunds/actionHandle`),
    dailyCosthandling: () => import(`${financial_url}daily_costhandling`),
    dailyCostCashIn: () => import(`${financial_url}daily_costhandling/cashIn`),
    dailyRefunds: () => import(`${financial_url}daily_refunds`),
}

//------------------------------ 工程管理---------------------------
const engineering_url = "./views/engineering_manage/"
const engineering = {
    engineeringLogs: () => import(`${engineering_url}engineering_logs`),
    engineeringMain: () => import(`${engineering_url}engineering_maintenance`),
}

//----------------------------- 统计查询----------------------------
const statistical_url = "./views/statistical_query/"
const statistical = {
    boothInfoSearch: () => import(`${statistical_url}boothInfo_search`),
    colInfoSearch: () => import(`${statistical_url}collectionInfo_search`),
    merInfoSearch: () => import(`${statistical_url}merchantInfo_search`),
}


// -----------------------------权限管理-----------------------------
const access_url = "./views/access_manage/"
const access = {
    menuMain: () => import(`${access_url}menu_maintenance`),
    personnelMain: () => import(`${access_url}personnel_maintenance`),
    roleMain: () => import(`${access_url}role_maintenance`),
}

// ---------------------------物业管理-----------------------------
const estate_url = "./views/estate_manage/"
const estate = {
    statistics: () => import(`${estate_url}statistics`),
    // 物业公司管理
    addCompany: () => import(`${estate_url}company_manage/add_company`),
    editCompany: () => import(`${estate_url}company_manage/edit_company`),
    addRecord: () => import(`${estate_url}company_manage/add_record`),
    editRecord: () => import(`${estate_url}company_manage/edit_record`),
    addStaff: () => import(`${estate_url}company_manage/add_staff`),
    editStaff: () => import(`${estate_url}company_manage/edit_staff`),
    company: () => import(`${estate_url}company_manage/company_manage`),
    expenditure: () => import(`${estate_url}company_manage/expenditure_manage`),
    staff: () => import(`${estate_url}company_manage/staff_manage`),
    // 物业设备管理
    addDevice: () => import(`${estate_url}device_manage/add_device`),
    editDevice: () => import(`${estate_url}device_manage/edit_device`),
    device: () => import(`${estate_url}device_manage/device_manage`),
    // 物业巡检考核管理
    examination: () => import(`${estate_url}examination_manage/examination_manage`),
    inspectioCheck: () => import(`${estate_url}examination_manage/inspection_check`),
    inspectionPoint: () => import(`${estate_url}examination_manage/inspection_point`),
    inspectioReport: () => import(`${estate_url}examination_manage/inspection_report`),
    taskManage: () => import(`${estate_url}examination_manage/task_manage`),
    // 维修记录
    addServiceRecord: () => import(`${estate_url}service_record/add_serviceRecord`),
    editServiceRecord: () => import(`${estate_url}service_record/edit_serviceRecord`),
    seviceRecord: () => import(`${estate_url}service_record/sevice_record`),
    // 物业维保记录
    addMainRecord: () => import(`${estate_url}maintenance_management/add_record`),
    editMainRecord: () => import(`${estate_url}maintenance_management/edit_record`),
    maintenance: () => import(`${estate_url}maintenance_management/maintenance_management`),
}

Vue.use(Router)
import Home from './views/Home/index.vue'
import viewRoot from './views/root'
let routes = [
    {
        path: '/login',
        component: Login,
        name: 'login',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '404',
        hidden: true
    },
    {
        path: '',
        component: Home,
        hidden: true,
        meta: { name: "首页" },
        redirect: 'index',
        children: [
            { path: 'index', component: index, name: 'index', hidden: true, meta: { name: "首页" } },
        ]
    },
    {
        path: '/basicInfo',
        component: Home,
        name: 'basicInfo',
        meta: { name: '基础信息', },
        children: [
            { path: 'costSetting', component: basic_info.costSetting, name: 'costSetting', meta: { name: '费用设置'} },
            { path: 'auditProcess', component: basic_info.auditProcess, name: 'auditProcess', meta: { name: '审批管理'} },
            { path: 'districtMag', component: basic_info.districtMag, name: 'districtMag', meta: { name: '分区管理'} },
            { path: 'mallsMain', component: basic_info.mallsMain, name: 'mallsMain', meta: { name: '商场信息管理' } },
            { path: 'basicParams', component: basic_info.basicParams, name: 'basicParams', meta: { name: '提醒设置'} },
            { path: 'contractType', component: basic_info.contractType, name: 'contractType', meta: { name: '合同类型设置' } },
            { path: 'messageModules', component: basic_info.messageModules, name: 'messageModules', meta: { name: '消息模板设置'} },
        ]
    }, 
    {
        path: '/booth',
        component: Home,
        name: 'booth',
        meta: { name: '摊位管理' },
        children: [
            { path: 'groupe', component: booth.boothGroupe, name: 'boothGroupe', meta: { name: '摊位分组管理'} },
            { path: 'map', component: booth.boothMap, name: 'boothMap', meta: { name: '摊位中心' } },
            // { path: 'merger', component: booth.boothMerger, name: 'boothMerger', meta:{name: '摊位合并'} },
            // { path: 'split', component: booth.boothSplit, name: 'boothSplit', meta:{name: '摊位拆分'} },
            { path: 'type', component: booth.boothType, name: 'boothType', meta: { name: '摊位类型管理' } },
            // { path: 'maintenance/:marketName', component: booth.boothMain, name: 'boothMain', meta: { name: '摊位维护' } }
            {
                path: 'maintenance',
                component: viewRoot,
                meta: { name: "摊位管理" },
                redirect: '/',
                children: [
                    { path: '/', component: booth.boothMain, name: 'boothMain', meta: { name: "摊位管理" } },
                    { path: 'maintenance/:marketName', component: booth.boothMain, name: 'boothMain2', meta: { name: "摊位管理" } }

                ]
            },
        ]
    },
    {
        path: '/contact',
        component: Home,
        name: 'contact',
        meta: { name: "合同管理" },
        children: [
            {
                path: 'sign',
                component: viewRoot,
                meta: { name: "新签/续签" },
                name: "sign",
                redirect: '/',
                children: [
                    { path: '/', component: contact.contactSign, name: 'contactSign', meta: { name: "新签/续签" } },
                    {
                        path: 'new/:merchantCode',
                        component: contact.newSignHandle,
                        name: 'newHandle',
                        meta: {
                            name: '商户新签合同',
                            type: 'new',
                            keepAlive:true
                        }
                    },
                    {
                        path: 'renew/:merchantCode',
                        component: contact.renewSignHandle,
                        name: 'renewHandle',
                        meta: {
                            name: '商户续签合同',
                            type: 'renew',
                            keepAlive:true
                        }
                    },
                ]
            },
            {
                path: 'audit',
                component: viewRoot,
                meta: { name: "合同审核" },
                name: "audit",
                redirect: '/',
                children: [
                    { path: '/', component: contact.contractAudit, name: 'contractAudit', meta: { name: "合同审核" } },
                    {
                        path: 'review/:contractBatchNum',
                        component: contact.contractReview,
                        name: 'contractReview',
                        meta: {
                            name: '合同-审核'
                        }
                    },
                    {
                        path: 'view/:contractBatchNum',
                        component: contact.viewContract,
                        name: 'viewContract',
                        meta: {
                            name: '查看合同'
                        }
                    }
                ]
            },
            /*{ path: 'change',  // 本迭代不做
              component: viewRoot,
              meta:{name:"合同变更"},
              redirect:'/',
              children:[
                { path: '/', component: contact.contractChange, name: 'contractChange', meta:{name:"合同审核"}},
                { path: 'handle/:id',
                  component: contact.conChangeHandle,
                  name: 'conChangeHandle',
                  meta:{
                    name:'合同-变更'
                  }
                }
              ]
            },*/
            { path: 'search', component: contact.contractSearch, name: 'contractSearch', meta: { name: "合同查询" } },
            { path: 'main', component: contact.templateMain, name: 'templateMain', meta: { name: "合同模板维护" } }
        ]
    },
    {
        path: '/operation',
        component: Home,
        name: 'operation',
        meta: { name: "运营管理" },
        children: [
            { path: 'managerTask', component: operation.managerTask, name: 'managerTask', meta: { name: "经理月度任务指标" } },
            { path: 'marketTask', component: operation.marketTask, name: 'marketTask', meta: { name: "商场月度任务指标" } },
            { path: 'messageAlert', component: operation.messageAlert, name: 'messageAlert', meta: { name: "消息提醒记录" } },
            { path: 'monthlyTask', component: operation.monthlyTask, name: 'monthlyTask', meta: { name: "月度任务指标" } },
            { path: 'taskCheck', component: operation.taskCheck, name: 'taskCheck', meta: { name: "月度指标考核"} },
            {
                path: 'adsense', name: 'adsenseManage', meta: { name: "广告位管理", },component: viewRoot,redirect:"/",
                children: [
                    { path: '/', component:operation.adsense, name: 'adsense', meta: { name: "广告位管理" } ,},
                    { path: 'addAdsense', component:  operation.addAdsense,  name: 'addAdsense', hidden: true, meta: { name: "添加广告位", keepAlive:true } },
                    { path: 'editAdsense/:id', component: operation.editAdsense, name: 'editAdsense', hidden: true, meta: { name: "编辑广告位" } },
                ]
            },
            {
                path: 'rental', name: 'rentalManage', meta: { name: "出租管理", },component: viewRoot,redirect:"/",
                children: [
                    { path: '/', component: operation.rental,  name: 'rental', meta: { name: "出租管理" }},
                    { path: 'addRental', component:  operation.addRental,  name: 'addRental', hidden: true, meta: { name: "出租登记", keepAlive:true } },
                    { path: 'editRental/:id', component: operation.editRental, name: 'editRental', hidden: true, meta: { name: "修改信息" } },
                ]
            },
            {
                path: 'content', name: 'contentManage', meta: { name: "内容管理", },component: viewRoot,redirect:"/",
                children: [
                    { path: '/', component:  operation.content,  name: 'contentManagement', meta: { name: "内容管理"} ,},
                    { path: 'addContent', component: operation.addContent,   name: 'addContent', hidden: true, meta: { name: "添加内容", keepAlive:true } },
                    { path: 'editContent/:id', component: operation.editContent,  name: 'editContent', hidden: true, meta: { name: "修改内容" } },
                ]
            },
            { path: 'advertising', component: operation.advertising, name: 'advertising', meta: { name: "广告位招商" } },
            { path: 'mnangement', component: operation.mnangement, name: 'mnangement', meta: { name: "商场招商管理" } },
            // { path: 'customer', component: operation.customer, name: 'customer',meta:{name:"客户管理"} },
            { path: 'warn', component: operation.warn, name: 'warn', meta: { name: "提醒管理" } },
        ]
    },
    {
        path: '/estate',
        component: Home,
        name: 'estate',
        meta: { name: "物业管理" },
        children: [
            // { path: 'statistics', component: estate.statistics, name: 'estateStatistics'  ,meta:{name:"物业管理统计"}},
            {
                path: 'device', name: 'deviceManage', meta: { name: "物业设备管理", },component: viewRoot,redirect:"/",
                children: [
                    { path: '/', component: estate.device, name: 'device', meta: { name: "物业设备管理"} ,},
                    { path: 'addDevice', component:  estate.addDevice, name: 'addDevice', hidden: true, meta: { name: "添加物业设备" , keepAlive:true} },
                    { path: 'editDevice/:equipmentCode', component: estate.editDevice, name: 'editDevice', hidden: true, meta: { name: "修改物业设备" } },
                ]
            },
            {
                path: 'maintenance', name: 'mainManage', meta: { name: "物业维保管理", },component: viewRoot,redirect:"/",
                children: [
                    { path: '/', component: estate.maintenance, name: 'maintenance', meta: { name: "物业维保管理" } ,},
                    { path: 'addMainRecord', component:  estate.addMainRecord, name: 'addMainRecord', hidden: true, meta: { name: "添加维保记录" , keepAlive:true} },
                    { path: 'editMainRecord/:maintenanceId', component: estate.editMainRecord, name: 'editMainRecord', hidden: true, meta: { name: "修改维保记录" } },
                ]
            },
            {
                path: 'company', name: 'companyManage', meta: { name: "物业公司管理", },component: viewRoot,redirect:"/",
                children: [
                    { path: '/', component: estate.company, name: 'company', meta: { name: "物业公司管理"} ,},
                    { path: 'addCompany', component:  estate.addCompany, name: 'addCompany', hidden: true, meta: { name: "添加物业公司", keepAlive:true } },
                    { path:  'editCompany/:companyId', component: estate.editCompany, name: 'editCompany', hidden: true, meta: { name: "修改物业公司" } },
                ]
            },
            {
                path: 'expenditure', name: 'expenditureManage', meta: { name: "物业支出管理", },component: viewRoot,redirect:"/",
                children: [
                    { path: '/', component: estate.expenditure, name: 'expenditure', meta: { name: "物业支出管理" } ,},
                    { path: 'addRecord', component:  estate.addRecord, name: 'addRecord', hidden: true, meta: { name: "添加财务记录" , keepAlive:true} },
                    { path: 'edidRecord/:financeId', component: estate.editRecord, name: 'editRecord', hidden: true, meta: { name: "修改财务记录"} },
                ]
            },
            {
                path: 'staff', name: 'staffManage', meta: { name: "员工管理", },component: viewRoot,redirect:"/",
                children: [
                    { path: '/', component: estate.staff, name: 'staff', meta: { name: "员工管理" } },
                    { path: 'addStaff', component:  estate.addStaff, name: 'addStaff', hidden: true, meta: { name: "添加员工", keepAlive:true} },
                    { path: 'editStaff/:staffId', component: estate.editStaff, name: 'editStaff', hidden: true, meta: { name: "修改员工" } },
                ]
            },
            { path: 'examination', component: estate.examination, name: 'examination', meta: { name: "巡检考核管理" } },
            { path: 'inspectioCheck', component: estate.inspectioCheck, name: 'inspectioCheck', meta: { name: "巡检签到记录" } },
            { path: 'inspectionPoint', component: estate.inspectionPoint, name: 'inspectionPoint', meta: { name: "巡检点管理" } },
            { path: 'inspectioReport', component: estate.inspectioReport, name: 'inspectioReport', meta: { name: "巡检报告记录" } },
            { path: 'taskManage', component: estate.taskManage, name: 'taskManage', meta: { name: "巡检任务管理" } },
            {
                path: 'seviceRecord', name: 'sevicerecord', meta: { name: "维修记录" },component: viewRoot,redirect:"/",
                children: [
                    { path: '/', component: estate.seviceRecord, name: 'seviceRecord', meta: { name: "维修记录" } ,},
                    { path: 'addServiceRecord', component: estate.addServiceRecord, name: 'addServiceRecord', hidden: true, meta: { name: "维修登记", keepAlive:true} },
                    { path: 'editServiceRecord/:repairId', component: estate.editServiceRecord, name: 'editServiceRecord', hidden: true, meta: { name: "修改维修记录"} },
                ]
            },
        ]
    },
    {
        path: '/merchant',
        component: Home,
        name: 'merchant',
        meta: { name: "商户管理" },
        children: [
            { path: 'brandMain', component: merchant.brandMain, name: 'brandMain', meta: { name: "品牌管理" } },
            {
                path: 'merchantManage', name: 'merchantMan', meta: { name: "商户管理", },component: viewRoot,redirect:"/",
                children: [
                    { path: '/', component:  merchant.merchantManage, name: 'merchantManage', meta: { name: "商户管理" } ,},
                    { path:  'addMerchant',  component: merchant.addMerchant, name: 'addMerchant', hidden: true, meta: { name: "添加商户" , keepAlive:true} },
                    { path: 'editMerchant/:id',component:  merchant.editMerchant,name: 'editMerchant', hidden: true, meta: { name: "编辑商户"  } },
                    { path:  'merchantInfo/:id', component: merchant.merchantInfo,name: 'merchantInfo', hidden: true, meta: { name: "商户详情"  } },
                ]
            },
            { path: 'assistant', component: merchant.assistant, name: 'assistant', meta: { name: "营业员管理", } },
            { path: 'attendanceManage', name: 'attendance', meta: { name: "考勤管理", },component: viewRoot,redirect:"/",
              children: [
                { path: '/', component:  merchant.attendance, name: 'attendanceManage', meta: { name: "考勤管理" } },
                { path: 'arrangeClasses', component:  merchant.arrangeClasses, name: 'arrangeClasses', meta: { name: "排班情况" } },
                { path: 'record', component:  merchant.attendanceRecord, name: 'attendanceRecord', meta: { name: "考勤记录" } },
                { path: 'setting', component:  merchant.attendanceSetting, name: 'attendanceSetting', meta: { name: "考勤设置" } },
              ]
             },
        ]
    },
    {
        path: '/finance',
        component: Home,
        name: '财务管理',
        meta: { name: "财务管理" },
        children: [
            {
                path: 'contractReceipts',
                component: viewRoot,
                meta: { name: "合同收款" },
                redirect: '/',
                children: [
                    { path: '/', component: financial.contractReceipts, name: 'contractReceipts', meta: { name: "合同收款" } },
                    { path: 'market/:marketCode', component: financial.contractReceipts, name: 'contractReceiptsMarket', meta: { name: "合同收款" } },
                    { path: 'cashIn/:contractBatchNum', component: financial.contractCashIn, name: 'contractRecCashIn', meta: { name: "合同-收款" } },
                ]
            },
            {
                path: 'contractRefunds',
                component: viewRoot,
                meta: { name: "合同退款" },
                redirect: '/',
                children: [
                    { path: '/', component: financial.contractRefunds, name: 'contractRefunds ', meta: { name: "合同退款" } },
                    {
                        path: 'applyRefunds/:contractBatchNum',
                        component: financial.contractRefAction,
                        name: 'contractApplyRef',
                        meta: {
                            name: '合同-申请退款',
                            type: 'apply'
                        }
                    },
                    {
                        path: 'review/:contractBatchNum',
                        component: financial.contractRefAction,
                        name: 'contractRefReview',
                        meta: {
                            name: '合同-退款审核',
                            type: 'review'
                        }
                    },
                    {
                        path: 'refunds/:contractBatchNum',
                        component: financial.contractRefAction,
                        name: 'contractRef',
                        meta: {
                            name: '合同-退款',
                            type: 'refunds'
                        }
                    },
                ]
            },
            {
                path: 'dailyCosthandling',
                component: viewRoot,
                meta: { name: "日常费用处理" },
                redirect: '/',
                children: [
                    { path: '/', component: financial.dailyCosthandling, name: 'dailyCosthandling', meta: { name: "日常费用处理" } },
                    { path: 'market/:marketCode', component: financial.dailyCosthandling, name: 'dailyCostHandlingMarket', meta: { name: "日常费用处理" } },
                    { path: 'cashIn/:merchantCode', component: financial.dailyCostCashIn, name: 'dailyCostCashIn', meta: { name: "日常费用-收款"  } },
                ]
            },
            { path: 'dailyRefunds', component: financial.dailyRefunds, name: 'dailyRefunds', meta: { name: "日常退款" } }
        ]
    },
    {
        path: '/engineering',
        component: Home,
        name: 'engineering',
        meta: { name: "工程管理" },
        children: [
            { path: 'logs', component: engineering.engineeringLogs, name: 'engineeringLogs', meta: { name: "工程日志" } },
            { path: 'maintenance', component: engineering.engineeringMain, name: 'engineeringMain', meta: { name: "工程维护" } }
        ]
    },
    {
        path: '/statistics',
        component: Home,
        name: 'statistics',
        meta: { name: "统计查询" },
        children: [
            { path: 'boothInfoSearch', component: statistical.boothInfoSearch, name: 'boothInfoSearch', meta: { name: "收款信息查询" } },
            { path: 'colInfoSearch', component: statistical.colInfoSearch, name: 'colInfoSearch', meta: { name: "摊位信息查询" } },
            { path: 'merInfoSearch', component: statistical.merInfoSearch, name: 'merInfoSearch', meta: { name: "商户信息查询" } }
        ]
    },
    {
        path: '/authority',
        component: Home,
        name: 'authority',
        meta: { name: "权限管理" },
        children: [
            { path: 'menuMain', component: access.menuMain, name: 'menuMain', meta: { name: "菜单维护" } },
            { path: 'personnelMain', component: access.personnelMain, name: 'personnelMain', meta: { name: "人员维护" } },
            { path: 'roleMain', component: access.roleMain, name: 'roleMain', meta: { name: "角色维护" } }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' },
        name: "true"
    }
];
const route = new Router({routes: routes})
export default route
