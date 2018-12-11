
const serviceModule = {
  // 查询所有商场
  marketsList: 'business/basic/markets/list',
	// 合同收费列表&详情
	contractCosts:'/business/finance/contract/costs',
	// 合同退款合同详情
	contractDetail:'/business/finance/contract',
  // 费用收款
  costsReceipt:'/business/finance/contract/costs/receipt',
  //日常费用付款
  costsPayment:'/business/finance/expenses/payment',
  //费用收款的商户列表
  merchantsList: '/business/contracts/merchants',
  // 根据商户编号查询商户下所有的合同批次号
  batchNumber: '/business/finance/contract/costs/list',
  // 费用类型
  expences: '/business/basic/expences/market',
  // 合同退款列表查询&退款申请（操作）
  contractRefund: '/business/finance/refund/contract',
  // 退款审核，审核，退款出现的费用数据页面
  contractRefunds: '/business/finance/refund/contracts',
  // 合同退款费用详细点击审核和退款（操作）
  contractRefundDetail: '/business/finance/refund/contract/detile',
  // 退款审核
  contractAudit: '/business/finance/refund/audit',
  // 退款
  contractCostsRefund: '/business/finance/refund/costs',
  // 退款审核进度查询
  refundPlan: '/business/finance/refund/plan',
  // 条件搜索日常费用列表/新增收款项
  contractExpenses: '/business/finance/expenses',
  // 退款列表 /审核
  refundsList: '/business/finance/expenses/refunds',
  // 退款
  refundsPay: '/business/finance/expenses/refunds/pay',
  // 商户输入支付密码后拉取支付信息
  costsConfirmed: '/business/finance/contract/costs/confirmed',
};
const ApiSetting = { ...serviceModule };
export default ApiSetting
