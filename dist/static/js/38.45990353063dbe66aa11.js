webpackJsonp([38],{PuRe:function(t,e){},bNNQ:function(t,e){},eFDW:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("YH6z"),s=a("vsZy"),r=a("FTcF"),n=a("Dd8w"),i=a.n(n),o={mixins:[s.a],props:{someObj:{type:Array,default:function(){return[]}},handleSta:{type:Number,required:!0},dataList:""},data:function(){return{handleDialog:!1,dialogData:{conclusion:4,comment:"",contractBatchNum:"-",refundId:this.dataList.refundId},option:[{label:"微信",value:1},{label:"支付宝",value:2},{label:"POS机刷卡",value:3}],rules:{comment:[{required:!0,message:"请输入备注内容",trigger:"blur"}]}}},methods:{openDialog:function(){this.handleDialog=!0},submitDialog:function(){var t=this;1===this.handleSta?this.ajaxPut({url:""+l.a.refundsList,data:i()({},this.dialogData,{refundId:this.dataList.refundId}),validateModel:"dialogData",resetForm:"dialogData",callBack:function(){t.$message.success("成功"),t.handleDialog=!1,t.$emit("submitCheckProp")}}):this.ajaxPost({url:l.a.refundsPay,data:{expenseId:this.dataList.expenseId,refundAmount:this.dataList.refundAmount,refundId:this.dataList.refundId},callBack:function(){t.$message.success("成功"),t.handleDialog=!1,t.$emit("submitCheckProp")}})}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"l-dialog refund-dialog",attrs:{title:1===t.handleSta?"日常退款-审核":"日常退款",visible:t.handleDialog},on:{"update:visible":function(e){t.handleDialog=e}}},[a("el-form",{ref:"dialogData",attrs:{model:t.dialogData,rules:t.rules,"label-width":"106px",inline:!0,"label-position":"right"}},[a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"商户名称"}},[a("span",{staticClass:"u-value"},[t._v(t._s(t.dataList.merchantName))])])],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"商场名称"}},[a("span",{staticClass:"u-value"},[t._v(t._s(t.dataList.marketName))])])],1)],1),t._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"摊位号"}},[a("span",{staticClass:"u-value"},[t._v(t._s(t.dataList.boothId))])])],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"费用类型"}},[a("span",{staticClass:"u-value"},[t._v(t._s(t.dataList.expenseProperty))])])],1)],1),t._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"付款类型"}},[a("span",{staticClass:"u-value"},[t._v(t._s(t.dataList.payMode?t.dataList.payMode.desc:""))])])],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"商户订单号"}},[a("span",{staticClass:"u-value"},[t._v(t._s(t.dataList.orderNo))])])],1)],1),t._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"交款金额"}},[a("span",{staticClass:"u-value"},[t._v(t._s(t.dataList.amount)+"元")])])],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"交款时间"}},[a("span",{staticClass:"u-value"},[t._v(t._s(t.dataList.payedTransactionTime))])])],1)],1),t._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"退款金额"}},[a("span",{staticClass:"u-value"},[t._v(t._s(t.dataList.refundAmount)+"元")])])],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"状态"}},[a("span",{staticClass:"u-value"},[t._v(t._s(t.dataList.paymentStatus?t.dataList.paymentStatus.desc:""))])])],1)],1),t._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"申请人"}},[a("span",{staticClass:"u-value"},[t._v(t._s(t.dataList.refundApplicant))])])],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"退款申请时间"}},[a("span",{staticClass:"u-value"},[t._v(t._s(t.dataList.createTime))])])],1)],1),t._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"退款原因"}},[a("span",{staticClass:"u-value"},[t._v(t._s(t.dataList.refundResean))])])],1)],1),t._v(" "),1===t.handleSta?[a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"审核结果"}},[a("el-radio-group",{model:{value:t.dialogData.conclusion,callback:function(e){t.$set(t.dialogData,"conclusion","string"==typeof e?e.trim():e)},expression:"dialogData.conclusion"}},[a("el-radio",{attrs:{label:4}},[t._v("通过")]),t._v(" "),a("el-radio",{attrs:{label:3}},[t._v("不通过")])],1)],1)],1)],1),t._v(" "),3===t.dialogData.conclusion?a("el-row",{staticClass:"u-area-input"},[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"备注",prop:"comment"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.dialogData.comment,callback:function(e){t.$set(t.dialogData,"comment","string"==typeof e?e.trim():e)},expression:"dialogData.comment"}})],1)],1)],1):t._e()]:t._e()],2),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"btn-save",attrs:{type:"primary"},on:{click:t.submitDialog}},[t._v(t._s(1===t.handleSta?"保存":"退款"))]),t._v(" "),a("el-button",{staticClass:"btn-reset",attrs:{type:"primary"},on:{click:function(e){t.handleDialog=!1}}},[t._v("取消")])],1)],1)},staticRenderFns:[]};var c=a("VU/8")(o,u,!1,function(t){a("bNNQ")},null,null).exports,d={name:"dailyRefunds",mixins:[s.d,s.a],data:function(){return{handleSta:1,scheduleDialog:!1,reqData:{merchantName:"",leaderName:"",leaderTel:"",payMode:"",marketCode:"",refundAuditStatus:"",refundCostStatus:"",currentPage:1},refundTime:[],payWay:[{label:"POS机刷卡",value:3},{label:"银行转账",value:4},{label:"现金",value:5}],statusList:[{label:"退款待审核",value:1},{label:"审核中",value:2},{label:"审核不通过",value:3},{label:"审核通过",value:4}],statusCostList:[{label:"待退款",value:5},{label:"退款中",value:6},{label:"已退款",value:7},{label:"退款失败",value:8}],refundDetail:{},reviewProgress:[]}},computed:{curProgressActive:function(){for(var t=this.reviewProgress.length;t>0;t--)if(this.reviewProgress[t-1].conclusion&&4===this.reviewProgress[t-1].conclusion.code)return t;return 0}},mounted:function(){this.getList(l.a.refundsList)},methods:{btnCheck:function(t,e){var a=e.refundAuditStatus.code,l=e.refundCostStatus.code;return"review"===t?!!this.checkKey("dailyRefunds_2")&&(1===a||2===a):"refund"===t?!!this.checkKey("dailyRefunds_3")&&(4===a&&7!==l):"schedule"===t?!!this.checkKey("dailyRefunds_4")&&!!a:void 0},search:function(){this.reqData.currentPage=1,this.getList(l.a.refundsList)},handlingDialog:function(t,e){this.handleSta=t,this.refundDetail=e,this.$refs.handleDia.openDialog()},viewSchedule:function(t){var e=this;this.ajaxGet({url:l.a.refundsList+"/"+t,callBack:function(t){e.reviewProgress=t.data,e.scheduleDialog=!0}})},submitCheckProp:function(){this.getList(l.a.refundsList)}},components:{handleDialog:c,selectMarket:r.a}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contract-refunds"},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{model:t.reqData,"label-width":"102px",inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"商场名称"}},[a("selectMarket",{attrs:{reqData:t.reqData}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"商户名称"}},[a("el-input",{attrs:{clearable:""},model:{value:t.reqData.merchantName,callback:function(e){t.$set(t.reqData,"merchantName","string"==typeof e?e.trim():e)},expression:"reqData.merchantName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"退款审核状态"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.reqData.refundAuditStatus,callback:function(e){t.$set(t.reqData,"refundAuditStatus","string"==typeof e?e.trim():e)},expression:"reqData.refundAuditStatus"}},t._l(t.statusList,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"负责人"}},[a("el-input",{attrs:{clearable:""},model:{value:t.reqData.leaderName,callback:function(e){t.$set(t.reqData,"leaderName","string"==typeof e?e.trim():e)},expression:"reqData.leaderName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"联系电话"}},[a("el-input",{attrs:{clearable:""},model:{value:t.reqData.leaderTel,callback:function(e){t.$set(t.reqData,"leaderTel","string"==typeof e?e.trim():e)},expression:"reqData.leaderTel"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"付款方式"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.reqData.payMode,callback:function(e){t.$set(t.reqData,"payMode","string"==typeof e?e.trim():e)},expression:"reqData.payMode"}},t._l(t.payWay,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"退款费用状态"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.reqData.refundCostStatus,callback:function(e){t.$set(t.reqData,"refundCostStatus","string"==typeof e?e.trim():e)},expression:"reqData.refundCostStatus"}},t._l(t.statusCostList,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"退款起止时间"}},[a("el-date-picker",{staticClass:"picker-time-interval",attrs:{type:"datetimerange","picker-options":t.pickerOptions,"range-separator":"至","value-format":"yyyy-MM-dd HH:mm:ss","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:t.refundTime,callback:function(e){t.refundTime="string"==typeof e?e.trim():e},expression:"refundTime"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("查询")])],1)])],1)],1),t._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.itemList,height:"500",align:"center",stripe:""}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50",index:t.indexMethod}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"expenseName",label:"费用名称","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"merchantName",label:"商户名称","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"leaderName",label:"负责人"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"leaderTel",label:"负责人联系电话","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"marketName",label:"商场名称","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"amount",label:"账单金额"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"cumulativePaidAmount",label:"已缴金额"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"payedTransactionTime",label:"交款时间","min-width":"165"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"付款方式","min-width":"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.payMode?e.row.payMode.desc:""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"orderNo",label:"第三方交易流水号","min-width":"160"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime",label:"退款申请时间","min-width":"165"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"refundAmount",label:"申请退款金额","min-width":"110"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"totalRefundAmount",label:"已退款金额","min-width":"110"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"退款审核状态","min-width":"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.refundAuditStatus?e.row.refundAuditStatus.desc:""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"退款费用状态","min-width":"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.refundCostStatus?e.row.refundCostStatus.desc:""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"refundResean",label:"退款原因","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"refundOperateUser",label:"退款操作人","min-width":"90"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"refundTime",label:"退款成功时间","min-width":"165"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"comment",label:"备注","min-width":"160"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",width:"300",fixed:"right",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"btn-handle",attrs:{type:"primary",disabled:!(t.btnCheck("review",e.row)&&e.row.canAudit)},on:{click:function(a){t.handlingDialog(1,e.row)}}},[t._v("审核")]),t._v(" "),a("el-button",{staticClass:"btn-handle",attrs:{type:"primary",disabled:!t.btnCheck("refund",e.row)},on:{click:function(a){t.handlingDialog(2,e.row)}}},[t._v("退款")]),t._v(" "),a("el-button",{staticClass:"btn-handle",attrs:{type:"primary",disabled:!t.btnCheck("schedule",e.row)},on:{click:function(a){t.viewSchedule(e.row.refundId)}}},[t._v("查看进度")])]}}])})],1)],1),t._v(" "),a("pagenation",{attrs:{pageparams:t.pageInfo,itemList:t.itemList},on:{handlePage:t.handlePage}}),t._v(" "),a("handleDialog",{ref:"handleDia",attrs:{handleSta:t.handleSta,dataList:t.refundDetail},on:{submitCheckProp:t.submitCheckProp}}),t._v(" "),a("el-dialog",{staticClass:"m-dialog el-steps-dialog",attrs:{title:"退款审核进度",visible:t.scheduleDialog,width:"30%"},on:{"update:visible":function(e){t.scheduleDialog=e}}},[a("el-steps",{attrs:{space:200,active:t.curProgressActive,"align-center":""}},t._l(t.reviewProgress,function(t,e){return a("el-step",{key:e,attrs:{title:t.auditRoles,description:t.auditorName}})})),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"btn-save",attrs:{type:"primary"},on:{click:function(e){t.scheduleDialog=!1}}},[t._v("关闭")])],1)],1)],1)},staticRenderFns:[]};var p=a("VU/8")(d,m,!1,function(t){a("PuRe")},"data-v-de09249c",null);e.default=p.exports}});
//# sourceMappingURL=38.45990353063dbe66aa11.js.map