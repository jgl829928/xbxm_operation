webpackJsonp([8],{E4pe:function(t,e){},NqTb:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Xxa5"),r=a.n(s),l=a("exGp"),i=a.n(l),n=a("RhA+"),o={props:["itemList"],data:function(){return{totalMoneyList:[]}},computed:{sumMoney:function(){return this.totalMoneyList=this.itemList.map(function(t){return t.contractCostDetailList.map(function(t){return t.costAmount}).reduce(function(t,e){return parseFloat(e||0)+t},0)}),this.totalMoneyList.reduce(function(t,e){return parseFloat(e)+t},0)}},filters:{timeString:function(t){return t&&t.length?t[0]+" 至 "+t[1]:""}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sign-handle-table"},[a("el-form",{ref:"itemList",staticClass:"c-detail-form",attrs:{"label-position":"right"}},[a("table",{attrs:{border:"1"}},[a("thead",[a("tr",{staticClass:"only-word"},[a("th",[t._v("期数")]),t._v(" "),a("th",[t._v("费用类型")]),t._v(" "),a("th",[t._v("费用周期")]),t._v(" "),a("th",[t._v("金额（元）")]),t._v(" "),a("th",[t._v("缴费开始日期")]),t._v(" "),a("th",[t._v("约定缴费日期/缴费结束日期")])])]),t._v(" "),t._l(t.itemList,function(e,s){return t.itemList.length?a("tbody",{key:s},[a("tr",[a("td",{attrs:{rowspan:e.contractCostDetailList.length+2}},[t._v(t._s(e.costPhase))])]),t._v(" "),t._l(e.contractCostDetailList,function(s,r){return a("tr",{key:r,staticClass:"only-word"},[a("td",[t._v(t._s(s.costProperty))]),t._v(" "),a("td",[t._v("\n            "+t._s(t._f("timeString")(s.costPeriod))+"\n          ")]),t._v(" "),a("td",[t._v("\n            "+t._s(s.costAmount)+"\n          ")]),t._v(" "),0===r?a("td",{staticClass:"td-date-box",attrs:{rowspan:e.contractCostDetailList.length+1}},[t._v("\n            "+t._s(e.startPayTime)+"\n          ")]):t._e(),t._v(" "),0===r?a("td",{staticClass:"td-date-box",attrs:{rowspan:e.contractCostDetailList.length+1}},[t._v("\n            "+t._s(e.expectPayTime)+"\n          ")]):t._e()])}),t._v(" "),a("tr",{staticClass:"only-word"},[a("td",[t._v("合计")]),t._v(" "),a("td",[t._v("...")]),t._v(" "),a("td",[t._v("\n            "+t._s(t.totalMoneyList[s])+"\n          ")])])],2):t._e()}),t._v(" "),a("tbody",[a("tr",{staticClass:"only-word"},[a("td",[t._v("合计")]),t._v(" "),a("td",[t._v("...")]),t._v(" "),a("td",[t._v("...")]),t._v(" "),a("td",[t._v(t._s(t.sumMoney))]),t._v(" "),a("td",[t._v("...")]),t._v(" "),a("td",[t._v("...")])])])],2)])],1)},staticRenderFns:[]};var _={name:"contractReview",data:function(){return{detailData:{},itemData:{checkOpinion:"",checkStatus:4,auditProcessTypeCode:"",contractBatchNum:""},rules:{auditProcessTypeCode:[{required:!0,message:"请选审核流程",trigger:"change"}],checkOpinion:[{required:!0,message:"请输入审核意见",trigger:"blur"}]}}},components:{reviewTable:a("VU/8")(o,c,!1,function(t){a("yDUc"),a("rjyZ")},"data-v-17bc9e36",null).exports},mounted:function(){var t=this.$route.params.contractBatchNum||"";t?(this.itemData.contractBatchNum=t,this.getData(t)):this.$router.go(-1)},methods:{getData:function(t){var e=this;return i()(r.a.mark(function a(){var s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.get(n.a.checkButtonUrl+"?contractBatchNum="+t);case 2:(s=a.sent)&&(e.detailData=s.data,s.data.companyBoothPrice===s.data.boothPrice&&(e.itemData.auditProcessTypeCode=2));case 4:case"end":return a.stop()}},a,e)}))()},submit:function(){var t,e=this;this.$refs.itemData.validate((t=i()(r.a.mark(function t(a){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!a){t.next=7;break}return t.next=3,e.$http.post(n.a.contractsChecks,e.itemData);case 3:t.sent&&(e.$message.success("操作成功"),e.cancelHandle()),t.next=8;break;case 7:return t.abrupt("return",!1);case 8:case"end":return t.stop()}},t,e)})),function(e){return t.apply(this,arguments)}))},resetForm:function(){this.$refs.itemData.resetFields()},cancelHandle:function(){this.$router.push("/contact/audit")}},filters:{boothIdString:function(t){return t&&t.length?t.join("、"):""}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sign-handle-wrap"},[a("h4",[t._v("合同-审核")]),t._v(" "),a("el-form",{ref:"itemData",staticClass:"c-detail-form",attrs:{model:t.itemData,rules:t.rules,"label-width":"124px","label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"商户名称"}},[a("span",[t._v(t._s(t.detailData.merchantName))])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"品类-品牌"}},[a("span",[t._v(t._s(t.detailData.brandName))])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"注册号"}},[a("span",[t._v(t._s(t.detailData.loginNumber))])])],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"负责人"}},[a("span",[t._v(t._s(t.detailData.leaderName))])])],1),t._v(" "),a("el-col",{attrs:{offset:8,span:8}},[a("el-form-item",{attrs:{label:"负责人身证号"}},[a("span",[t._v(t._s(t.detailData.leaderCard))])])],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"摊位号"}},[a("span",[t._v(t._s(t._f("boothIdString")(t.detailData.boothId)))])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"使用面积"}},[a("span",[t._v(t._s(t.detailData.useableAcreage)+"m²")])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"公司参考单价"}},[a("span",[t._v(t._s(t.detailData.companyBoothPrice)+"元/平米/月")])])],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"公摊比例"}},[a("span",[t._v(t._s(t.detailData.publicScale)+"%")])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"计租面积"}},[a("span",[t._v(t._s(t.detailData.rentAcreage)+"m²")])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"摊位单价"}},[a("span",[t._v(t._s(t.detailData.boothPrice)+"元/平米/月")])])],1)],1),t._v(" "),t.detailData.merchantType&&1===t.detailData.merchantType.code?[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"合同开始时间"}},[a("span",[t._v(t._s(t.detailData.rentBeginTime))])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"合同结束时间"}},[a("span",[t._v(t._s(t.detailData.rentEndTime))])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"租赁期/合同期"}},[a("span",[t._v(t._s(t.detailData.rentPeriod)+"月")])])],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"优惠开始时间"}},[a("span",[t._v(t._s(t.detailData.discountsBeginTime))])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"优惠结束日时间"}},[a("span",[t._v(t._s(t.detailData.discountsEndTime))])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"优惠期"}},[a("span",[t._v(t._s(t.detailData.discountsPeriod)+"月")])])],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"计租开始时间"}},[a("span",[t._v(t._s(t.detailData.hireBeginTime))])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"计租结束日时间"}},[a("span",[t._v(t._s(t.detailData.hireEndTime))])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"计租期"}},[a("span",[t._v(t._s(t.detailData.hirePeriod)+"月")])])],1)],1)]:[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"租赁期/合同期"}},[a("span",[t._v(t._s(t.detailData.rentPeriod)+"月")])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"优惠期"}},[a("span",[t._v(t._s(t.detailData.discountsPeriod)+"月")])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"计租期"}},[a("span",[t._v(t._s(t.detailData.hirePeriod)+"月")])])],1)],1)],t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"首付周期"}},[a("span",[t._v(t._s(t.detailData.downPaymentPeriod)+"月")])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"摊位租金/商铺租金"}},[a("span",[t._v(t._s(t.detailData.totalAmount)+"元")])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"优惠扣回"}},[a("span",[t._v(t._s(t.detailData.deductDiscountsDay)+"天")])])],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{staticClass:"input-textarea-box",attrs:{label:"备注"}},[a("span",[t._v(t._s(t.detailData.contractComment))])])],1)],1),t._v(" "),a("p",{staticClass:"cost-title"},[t._v("费用列表")]),t._v(" "),a("reviewTable",{attrs:{itemList:t.detailData.contractCostPhaseList||[]}}),t._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{staticClass:"input-textarea-box special-item",attrs:{label:"审核结果"}},[a("el-radio-group",{on:{change:t.resetForm},model:{value:t.itemData.checkStatus,callback:function(e){t.$set(t.itemData,"checkStatus","string"==typeof e?e.trim():e)},expression:"itemData.checkStatus"}},[a("el-radio",{attrs:{label:4}},[t._v("通过")]),t._v(" "),a("el-radio",{attrs:{label:3}},[t._v("不通过")])],1)],1)],1)],1),t._v(" "),t.detailData.ifChoose?a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{staticClass:"input-textarea-box special-item",attrs:{label:"审核流程",prop:"auditProcessTypeCode"}},[a("el-radio-group",{model:{value:t.itemData.auditProcessTypeCode,callback:function(e){t.$set(t.itemData,"auditProcessTypeCode","string"==typeof e?e.trim():e)},expression:"itemData.auditProcessTypeCode"}},[a("el-radio",{attrs:{label:2}},[t._v("常规审核")]),t._v(" "),a("el-radio",{attrs:{label:4}},[t._v("非常规审核")])],1)],1)],1)],1):t._e(),t._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{staticClass:"input-textarea-box special-item",attrs:{label:"审核意见",prop:"checkOpinion",rules:3===t.itemData.checkStatus?t.rules.checkOpinion:[{required:!1}]}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.itemData.checkOpinion,callback:function(e){t.$set(t.itemData,"checkOpinion","string"==typeof e?e.trim():e)},expression:"itemData.checkOpinion"}})],1)],1)],1)],2),t._v(" "),a("div",{staticClass:"c-detail-footer-box"},[a("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("保存")]),t._v(" "),a("el-button",{staticClass:"cancel-btn",attrs:{type:"primary"},on:{click:t.cancelHandle}},[t._v("取消")])],1)],1)},staticRenderFns:[]};var d=a("VU/8")(_,m,!1,function(t){a("E4pe"),a("jJZ1")},"data-v-77e8bfea",null);e.default=d.exports},jJZ1:function(t,e){},rjyZ:function(t,e){},yDUc:function(t,e){}});
//# sourceMappingURL=8.506d8a195b82a365076c.js.map