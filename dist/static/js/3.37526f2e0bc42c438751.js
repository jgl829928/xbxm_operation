webpackJsonp([3],{"1Aa/":function(e,t,a){var r=a("adiS"),i=a("biYF")("iterator"),s=a("ZVlJ");e.exports=a("AKd3").isIterable=function(e){var t=Object(e);return void 0!==t[i]||"@@iterator"in t||s.hasOwnProperty(r(t))}},KH7x:function(e,t,a){"use strict";t.__esModule=!0;var r=s(a("MGgt")),i=s(a("HzJ8"));function s(e){return e&&e.__esModule?e:{default:e}}t.default=function(){return function(e,t){if(Array.isArray(e))return e;if((0,r.default)(Object(e)))return function(e,t){var a=[],r=!0,s=!1,n=void 0;try{for(var o,c=(0,i.default)(e);!(r=(o=c.next()).done)&&(a.push(o.value),!t||a.length!==t);r=!0);}catch(e){s=!0,n=e}finally{try{!r&&c.return&&c.return()}finally{if(s)throw n}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},MGgt:function(e,t,a){e.exports={default:a("hWTF"),__esModule:!0}},Mv24:function(e,t){},RMvd:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={name:"newHandle",components:{signHandle:a("pkOJ").a}},i={render:function(){var e=this.$createElement;return(this._self._c||e)("signHandle")},staticRenderFns:[]},s=a("vSla")(r,i,!1,null,null,null);t.default=s.exports},Wwhq:function(e,t){},hWTF:function(e,t,a){a("A1pn"),a("IsPG"),e.exports=a("1Aa/")},pkOJ:function(e,t,a){"use strict";var r=a("IHPB"),i=a.n(r),s=a("lC5x"),n=a.n(s),o=a("3cXf"),c=a.n(o),l=a("KH7x"),u=a.n(l),m=a("J0Oq"),d=a.n(m),p=a("RhA+"),h={props:["costList","baseCostObj"],data:function(){return{itemData:{},totalMoneyList:[],curTotalMoney:""}},computed:{sumMoney:function(){return this.totalMoneyList=this.costList.map(function(e){return e.contractCostDetailList.map(function(e){return e.costAmount}).reduce(function(e,t){return parseFloat(t||0)+e},0)}),this.curTotalMoney=this.totalMoneyList.reduce(function(e,t){return parseFloat(t)+e},0),this.curTotalMoney&&(this.curTotalMoney=parseFloat(this.curTotalMoney).toFixed(2)),this.curTotalMoney},stagingBaseCost:function(){for(var e=JSON.parse(c()(this.baseCostObj)),t=e.contractCostDetailList,a=[],r=0;r<t.length;r++)"商家综合管理费"!==t[r].costProperty&&"商铺租金"!==t[r].costProperty||a.push(t[r]);return e.contractCostDetailList=a,e}},methods:{toFixedTwo:function(e){e.costAmount&&(e.costAmount=parseFloat(e.costAmount).toFixed(2))},handleInput:function(e){e.target.value=e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]||null},removeSubItem:function(e){this.costList.splice(e,1)},addSubItem:function(){return 1===this._checkValidData()?this.$message.error("请选择缴费周期"):this._checkValidData()?void this.costList.push(JSON.parse(c()(this.stagingBaseCost))):this.$message.error("请核对费用周期与金额是否有效")},_checkValidData:function(){for(var e=this.costList,t={hasRight:!1,hasErr:!1},a=!1,r=0,i=e.length;r<i;r++){if(a=!1,!e[r].startPayTime||!e[r].expectPayTime)return 1;for(var s=e[r].contractCostDetailList,n=0;n<s.length;n++){var o=s[n].costPeriod?s[n].costPeriod.length:0;(s[n].costAmount||o)&&(s[n].costAmount&&o?(t.hasRight=!0,a=!0):t.hasErr=!0)}if(!a)return!1}return!t.hasErr&&!!t.hasRight},_checkTime:function(e){if(!e.expectPayTime||!e.startPayTime)return!1;new Date(e.expectPayTime)<new Date(e.startPayTime)&&(e.expectPayTime=e.startPayTime)}},filters:{fixedTwo:function(e){return e?parseFloat(e).toFixed(2):0}}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sign-handle-table"},[a("el-form",{ref:"itemData",staticClass:"c-detail-form",attrs:{model:e.itemData,"label-position":"right"}},[a("table",{attrs:{border:"0",cellspacing:"0"}},[a("thead",[a("tr",{staticClass:"only-word"},[a("th",[e._v("期数")]),e._v(" "),a("th",[e._v("费用类型")]),e._v(" "),a("th",[e._v("费用周期")]),e._v(" "),a("th",[e._v("金额（元）")]),e._v(" "),a("th",[e._v("缴费开始日期")]),e._v(" "),a("th",[e._v("约定缴费日期/缴费结束日期")]),e._v(" "),a("th",[e._v("操作")])])]),e._v(" "),e._l(e.costList,function(t,r){return a("tbody",{key:r},[a("tr",[a("td",{attrs:{rowspan:t.contractCostDetailList.length+2}},[e._v(e._s(r+1))])]),e._v(" "),e._l(t.contractCostDetailList,function(i,s){return a("tr",{key:s},[a("td",[a("span",{staticClass:"type-name"},[e._v(e._s(i.costProperty))])]),e._v(" "),a("td",[a("el-date-picker",{staticClass:"picker-time-interval",attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:i.costPeriod,callback:function(t){e.$set(i,"costPeriod","string"==typeof t?t.trim():t)},expression:"v.costPeriod"}})],1),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model.number.lazy",value:i.costAmount,expression:"v.costAmount",modifiers:{number:!0,lazy:!0}}],staticClass:"amount-input",attrs:{placeholder:"0.00"},domProps:{value:i.costAmount},on:{input:e.handleInput,blur:[function(t){e.toFixedTwo(i)},function(t){e.$forceUpdate()}],change:function(t){e.$set(i,"costAmount",e._n(t.target.value))}}})]),e._v(" "),0===s?a("td",{staticClass:"td-date-box",attrs:{rowspan:t.contractCostDetailList.length+1}},[a("el-form-item",[a("el-date-picker",{staticClass:"picker-pay-time",attrs:{clearable:!1,type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},on:{change:function(a){e._checkTime(t)}},model:{value:t.startPayTime,callback:function(a){e.$set(t,"startPayTime","string"==typeof a?a.trim():a)},expression:"item.startPayTime"}})],1)],1):e._e(),e._v(" "),0===s?a("td",{staticClass:"td-date-box",attrs:{rowspan:t.contractCostDetailList.length+1}},[a("el-form-item",[a("el-date-picker",{staticClass:"picker-pay-time",attrs:{clearable:!1,type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},on:{change:function(a){e._checkTime(t)}},model:{value:t.expectPayTime,callback:function(a){e.$set(t,"expectPayTime","string"==typeof a?a.trim():a)},expression:"item.expectPayTime"}})],1)],1):e._e(),e._v(" "),0===r&&0===s?a("td",{attrs:{rowspan:t.contractCostDetailList.length+1}},[e._v("...")]):0!==r&&0===s?a("td",{attrs:{rowspan:t.contractCostDetailList.length+1}},[a("i",{staticClass:"del-btn el-icon-remove-outline",on:{click:function(t){e.removeSubItem(r)}}})]):e._e()])}),e._v(" "),a("tr",{staticClass:"only-word"},[a("td",[e._v("合计")]),e._v(" "),a("td",[e._v("...")]),e._v(" "),a("td",[e._v("\n            "+e._s(e._f("fixedTwo")(e.totalMoneyList[r]?e.totalMoneyList[r]:"0.00"))+"\n          ")])])],2)}),e._v(" "),a("tbody",[a("tr",{staticClass:"only-word"},[a("td",{staticClass:"add-item-btn",attrs:{colspan:"7"}},[a("span",{on:{click:e.addSubItem}},[a("em",[e._v("+")]),e._v("\n                添加周期费用\n              ")])])]),e._v(" "),a("tr",{staticClass:"only-word"},[a("td",[e._v("合计")]),e._v(" "),a("td",[e._v("...")]),e._v(" "),a("td"),e._v(" "),a("td",[e._v(e._s(e.sumMoney?e.sumMoney:"0.00"))]),e._v(" "),a("td",[e._v("...")]),e._v(" "),a("td",[e._v("...")]),e._v(" "),a("td")])])],2)])],1)},staticRenderFns:[]};var f=a("vSla")(h,v,!1,function(e){a("v2bE"),a("Wwhq")},"data-v-0bc06097",null).exports,g=a("4YfN"),b=a.n(g),y={props:["preContract","contractDetail","itemData","curBoothNum"],data:function(){return{tplData:{},validList:[],totalMoneyList:[],costDetailList:[],tplOneTotalMoney:{depositPrice:0,cashPledge:0,totalMoney:0,totalRental:0,totalManagement:0,totalOperation:0,totalPremium:0,totalRun:0,totalAssistant:0},leaderTel:"",merchantCode:"",verificationCode:"",messageTips:"获取验证码",canGetCode:!0}},mounted:function(){var e=this.contractDetail.merchant,t=e.leaderTel,a=e.merchantCode;this.leaderTel=t.substr(0,3)+"****"+t.substr(7),this.merchantCode=a,this._formatValidList(this.itemData.contractCostPhaseList)},methods:{viewContract:function(e){var t=this;return d()(n.a.mark(function a(){var r,i,s,o,c,l;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return r=t.itemData.contractQuery,i=t.contractDetail.merchant,s=i.marketCode,o=i.merchantCode,c={boothId:r.boothId.length?r.boothId[0]:"",contractTplEunm:e,marketCode:s,merchantCode:o,rentAcreage:r.rentAcreage,totalMoney:t.tplOneTotalMoney.totalMoney},a.next=4,t.$http.get(p.a.previewContract,{params:c});case 4:(l=a.sent)&&0===l.code&&(t.tplData=t._assemblyData(e,l.data),t.$refs.contractTpl.showDialog(e));case 6:case"end":return a.stop()}},a,t)}))()},getVerificationCode:function(){var e=this;return d()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.canGetCode){t.next=2;break}return t.abrupt("return",!1);case 2:return t.next=4,e.$http.get(p.a.sendMessage+"?merchantCode="+e.merchantCode);case 4:if(!(a=t.sent)&&0!==a.code){t.next=9;break}e._codeCountdown(),t.next=10;break;case 9:return t.abrupt("return",e.$message.error("网络繁忙，请稍后再试"));case 10:case"end":return t.stop()}},t,e)}))()},submitReview:function(){var e=this;return d()(n.a.mark(function t(){var a,r,i,s;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.verificationCode){t.next=2;break}return t.abrupt("return",e.$message.error("请输入验证码"));case 2:return a=e.contractDetail.merchant,r=a.merchantCode,i=a.marketCode,delete(s=JSON.parse(c()(e.itemData))).empId,s.contractCostPhaseList=e.validList,s.contractQuery={merchantCode:r,marketCode:i,boothId:s.contractQuery.boothId,rentAcreage:s.contractQuery.rentAcreage},s.checkNum=e.verificationCode,s.signType||(s.signType=1),t.next=11,e.$http.post(p.a.postContracts,s);case 11:t.sent&&(e.$message.success("操作成功"),e.$store.commit("delete_tabs",e.$route),e.$router.push("/contact/sign"));case 13:case"end":return t.stop()}},t,e)}))()},prvHandle:function(){this.$emit("prvHandle")},_assemblyData:function(e,t){var a=this,r={};if(1===e){var i=this.itemData,s=i.merchantType,n=i.rentBeginTime,o=i.rentEndTime,c=i.rentPeriod,l=i.hirePeriod,u=i.hireBeginTime,m=i.hireEndTime,d=i.discountsPeriod,p=i.discountsBeginTime,h=i.discountsEndTime,v=i.useableAcreage,f=i.publicScale,g=i.boothPrice,y=i.contractQuery,_=i.deductDiscountsDay,T=i.downPaymentPeriod;v=parseFloat(v)||"",f=parseFloat(f)||0;var D=y.rentAcreage,C=this.validList.map(function(e,t){return{costPhase:e.costPhase,costDetail:a.costDetailList[t],amount:a.totalMoneyList[t],startPayTime:e.startPayTime,endPayTime:e.expectPayTime}}),P=parseFloat((parseFloat(c)/12).toFixed(2))||"",w={boothId:this.curBoothNum,rank:s,rentBeginTime:n,rentEndTime:o,rentPeriod:c,hirePeriod:l,hireBeginTime:u,hireEndTime:m,discountsPeriod:d,discountsBeginTime:p,discountsEndTime:h,useableAcreage:v,publicScale:f,publicAcreage:v*parseFloat(f)/100||"",hireArea:D,boothPrice:g,rentYear:P,downPaymentPeriod:T,deductDiscountsDay:_,totalMoneyChinese:t.totalMoneyChinese,date:t.date,contractPeriodCostList:C};r=b()({},w,this.tplOneTotalMoney,t.contractShoot)}else r=t;return r},_codeCountdown:function(){var e=this,t=119;!function a(){if(0===t)return e.canGetCode=!0,e.messageTips="获取验证码",t=119,!1;e.canGetCode=!1,e.messageTips=t+"s 后重试",t--,setTimeout(function(){a()},1e3)}()},_formatValidList:function(e){if(!e.length)return[];for(var t=[],a=[],r=[],i=[],s=[],n=[],o=[],c=[],l=[],u=[],m=[],d=0,p=e.length;d<p;d++){var h=e[d].contractCostDetailList;t.push({costPhase:d+1,expectPayTime:e[d].expectPayTime,startPayTime:e[d].startPayTime,contractCostDetailList:[]}),i.push([]),n.push([]);for(var v=0;v<h.length;v++)h[v].costPeriod.length&&(t[d].contractCostDetailList.push(h[v]),i[d].push(h[v].costAmount),n[d].unshift(h[v].costProperty+":<br/>"+(h[v].costPeriod[0]||"-")+"到"+(h[v].costPeriod[1]||"-")+","+h[v].costAmount+"元<br/>")),"商场管理及商品质量保证金"===h[v].costProperty&&a.push(h[v].costAmount),"电表押金"===h[v].costProperty&&r.push(h[v].costAmount),"商铺租金"===h[v].costProperty&&s.push(h[v].costAmount),"商家综合管理费"===h[v].costProperty&&o.push(h[v].costAmount),"运营杂费"===h[v].costProperty&&c.push(h[v].costAmount),"整体保险费"===h[v].costProperty&&l.push(h[v].costAmount),"整体运营费"===h[v].costProperty&&u.push(h[v].costAmount),"营业员管理基金"===h[v].costProperty&&m.push(h[v].costAmount)}this.totalMoneyList=i.map(function(e){return e.reduce(function(e,t){return parseFloat(t||0)+e},0)}),this.costDetailList=n.map(function(e){return e.reduce(function(e,t){return t+e},"")}),this.tplOneTotalMoney.depositPrice=a.reduce(function(e,t){return parseFloat(t||0)+e},0),this.tplOneTotalMoney.cashPledge=r.reduce(function(e,t){return parseFloat(t||0)+e},0),this.tplOneTotalMoney.totalRental=s.reduce(function(e,t){return parseFloat(t||0)+e},0),this.tplOneTotalMoney.totalManagement=o.reduce(function(e,t){return parseFloat(t||0)+e},0),this.tplOneTotalMoney.totalOperation=c.reduce(function(e,t){return parseFloat(t||0)+e},0),this.tplOneTotalMoney.totalPremium=l.reduce(function(e,t){return parseFloat(t||0)+e},0),this.tplOneTotalMoney.totalRun=u.reduce(function(e,t){return parseFloat(t||0)+e},0),this.tplOneTotalMoney.totalAssistant=m.reduce(function(e,t){return parseFloat(t||0)+e},0),this.tplOneTotalMoney.totalMoney=this.totalMoneyList.reduce(function(e,t){return parseFloat(t||0)+e},0),this.validList=t},_dateDifference:function(e,t){if(!e||!t)return"";var a,r=void 0;return e=Date.parse(e),r=(t=Date.parse(t))-e,r=Math.abs(r),a=Math.floor(r/864e5),parseFloat((a/365).toFixed(2))}},components:{contractTpl:a("2v3v").a}},_={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"confirm-view"},[a("h4",[e._v("合同确认")]),e._v(" "),a("div",{staticClass:"contact-content"},[e._m(0),e._v(" "),e._m(1),e._v(" "),e._l(e.preContract,function(t,r){return a("div",{key:r,staticClass:"c-item"},[t.desc?a("div",[a("span",{attrs:{title:t.desc}},[e._v(e._s(t.desc))])]):e._e(),e._v(" "),t.desc?a("div",[a("span",{staticClass:"s-view",on:{click:function(a){e.viewContract(t.code)}}},[e._v("预览")])]):e._e()])})],2),e._v(" "),a("div",{staticClass:"con-verification"},[a("div",[a("span",{staticClass:"s-title"},[e._v("负责人手机号")]),e._v(" "),a("span",[e._v(e._s(e.leaderTel))])]),e._v(" "),a("div",{staticClass:"verification-box"},[a("el-input",{attrs:{placeholder:"请输入短信验证码"},model:{value:e.verificationCode,callback:function(t){e.verificationCode="string"==typeof t?t.trim():t},expression:"verificationCode"}}),e._v(" "),a("el-button",{staticClass:"verification-code-btn",attrs:{disabled:!e.canGetCode},on:{click:e.getVerificationCode}},[e._v(e._s(e.messageTips))])],1),e._v(" "),a("p",[e._v("填写验证码提交审核，即视为商户对协议内容确认完成且无异议")])]),e._v(" "),a("div",{staticClass:"c-detail-footer-box"},[a("el-button",{staticClass:"cancel-btn",on:{click:e.prvHandle}},[e._v("上一步")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.submitReview}},[e._v("提交审核")])],1),e._v(" "),a("contractTpl",{ref:"contractTpl",attrs:{tplData:e.tplData}})],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"c-item c-item-title"},[t("div",[t("span",[this._v("合同名称")])]),this._v(" "),t("div",[t("span",[this._v("操作")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"c-item c-item-title"},[t("div",[t("span",[this._v("合同名称")])]),this._v(" "),t("div",[t("span",[this._v("操作")])])])}]};var T={data:function(){var e=this,t=function(t,a,r){if(!a)return r(new Error(e.errMsg[t.field]));/(^[0-9]{1,18}$)|(^[0-9]{1,18}[\.]{1}[0-9]{1,2}$)/.test(a)?("publicScale"===t.field&&parseFloat(a)>100&&r(new Error("公摊比例不能超过100")),r()):r(new Error("只能输入数字且最多两位小数"))},a=function(t,a,r){if(!a)return r(new Error(e.errMsg[t.field]));/^(0|[1-9]\d{0,18})$/.test(a)?r():r(new Error("请填写整数"))};return{isPreview:!1,curType:"new",itemData:{signType:"",useableAcreage:"",publicScale:"",boothPrice:"",merchantType:1,rentBeginTime:"",rentEndTime:"",discountsBeginTime:"",discountsEndTime:"",hireBeginTime:"",hireEndTime:"",downPaymentPeriod:"",totalAmount:"",contractComment:"",rentPeriod:"",discountsPeriod:"",deductDiscountsDay:"",hirePeriod:"",contractQuery:{boothId:[],rentAcreage:""},marketEmployee:{empId:"",employeeName:""},empId:"",contractCostPhaseList:[{costPhase:"",startPayTime:"",expectPayTime:"",contractCostDetailList:[]}]},rentAcreageDecimal:t,cueIsManager:!1,signTypeList:[],curMerchantCode:"",baseInfo:{},baseCostObj:{costPhase:"",startPayTime:"",expectPayTime:"",contractCostDetailList:[]},boothList:[],curBoothNum:"",managerList:[],preContract:[],contractDetail:{},rules:{useableAcreage:[{required:!0,validator:t,trigger:"blur"}],publicScale:[{required:!0,validator:t,trigger:"blur"}],boothPrice:[{required:!0,validator:t,trigger:"blur"}],signType:[{required:!0,message:"请选择续签类型",trigger:"change"}],rentBeginTime:[{required:!0,message:"请选择合同开始时间",trigger:"change"}],rentEndTime:[{required:!0,message:"请选择合同结束时间",trigger:"change"}],discountsBeginTime:[{required:!0,message:"请选择优惠开始时间",trigger:"change"}],discountsEndTime:[{required:!0,message:"请选择优惠结束日时间",trigger:"change"}],hireBeginTime:[{required:!0,message:"请选择计租开始时间",trigger:"change"}],hireEndTime:[{required:!0,message:"请选择计租结束日时间",trigger:"change"}],empId:[{required:!0,message:"请选择楼层经理",trigger:"change"}],rentPeriod:[{required:!0,validator:a,trigger:"blur"}],discountsPeriod:[{required:!0,validator:a,trigger:"blur"}],hirePeriod:[{required:!0,validator:a,trigger:"blur"}],downPaymentPeriod:[{required:!0,validator:a,trigger:"blur"}],totalAmount:[{required:!0,validator:t,trigger:"blur"}],deductDiscountsDay:[{required:!0,validator:a,trigger:"blur"}],contractComment:[{required:!0,message:"请填写备注",trigger:"blur"}]},errMsg:{useableAcreage:"请输入使用面积",publicScale:"请输入公摊比例",boothPrice:"请输入摊位单价",totalAmount:"请填写摊位租金/商铺租金",discountsPeriod:"请填写优惠期",hirePeriod:"请填写计租期",downPaymentPeriod:"请填写首付周期",deductDiscountsDay:"请填写优惠扣回",rentPeriod:"请填写租赁期/合同期","contractQuery.rentAcreage":"计租面积不能为空"}}},computed:{isAfterOpen:function(){return 1===this.itemData.merchantType||"renew"===this.curType},curEmpId:function(){return this.$store.getters.currentUser.userId}},mounted:function(){this.init()},methods:{init:function(){var e=this.$route.params.merchantCode||"";if(!e)return!1;this.curType=this.$route.meta.type||"",this.curMerchantCode=e,this.initInfo()},initInfo:function(){var e=this;return d()(n.a.mark(function t(){var a,r,i,s,o,l,m,d,h,v,f,g,b;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.all([e.$http.get(p.a.boothStatus),e.$http.get(p.a.contractsBaseInfo+"?merchantCode="+e.curMerchantCode)]);case 2:if(a=t.sent,r=u()(a,2),i=r[0],s=r[1],i&&(e.boothList=i.data),s){for(o=s.data,l=o.contractDetail,m=o.contractExpenceList,e.contractDetail=l,e.signTypeList=o.signTypeList,d=l.merchant,h=d.merchantName,v=d.loginNumber,f=d.leaderName,g=d.leaderCard,e.getManagerList(l.market.marketCode),e.baseInfo={merchantName:h,loginNumber:v,leaderName:f,leaderCard:g,brandName:l.brand.brandName},b=0;b<m.length;b++)e.baseCostObj.contractCostDetailList.push({costProperty:m[b].expenceName,costAmount:"",costPeriod:[],incomeProperty:m[b].expenceIncome.code});e.itemData.contractCostPhaseList=[JSON.parse(c()(e.baseCostObj))]}case 8:case"end":return t.stop()}},t,e)}))()},getManagerList:function(e){var t=this;return d()(n.a.mark(function a(){var r,i;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.$http.get(p.a.getFloorManagers+"?marketCodes=["+e+"]");case 2:if(!(r=a.sent)){a.next=15;break}t.managerList=r.data,i=0;case 6:if(!(i<t.managerList.length)){a.next=15;break}if(t.managerList[i].empId!==t.curEmpId){a.next=12;break}return t.itemData.empId=t.managerList[i].empId,t.itemData.marketEmployee={empId:t.managerList[i].empId,employeeName:t.managerList[i].employeeName},t.cueIsManager=!0,a.abrupt("break",15);case 12:i++,a.next=6;break;case 15:case"end":return a.stop()}},a,t)}))()},nextHandle:function(){var e,t=this;this.$refs.itemData.validate((e=d()(n.a.mark(function e(a){var r,s;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a){e.next=14;break}if(1!==t.$refs.signTable._checkValidData()){e.next=5;break}return e.abrupt("return",t.$message.error("请选择缴费周期"));case 5:if(t.$refs.signTable._checkValidData()){e.next=7;break}return e.abrupt("return",t.$message.error("请核对费用周期与金额是否有效"));case 7:return e.next=9,t.$http.get(p.a.preContract);case 9:(r=e.sent)&&((s=[].concat(i()(r.data))).length&&s.length%2!=0&&s.push({desc:"",code:""}),t.preContract=s),t.isPreview=!0,e.next=15;break;case 14:return e.abrupt("return",!1);case 15:case"end":return e.stop()}},e,t)})),function(t){return e.apply(this,arguments)}))},boothIdChange:function(e){if(e.length)for(var t=e[0],a=0;a<this.boothList.length;a++)if(t===this.boothList[a].boothCode)return this.curBoothNum=this.boothList[a].boothNumber},_checkTime:function(e,t){if(!e[t+"BeginTime"]||!e[t+"EndTime"])return!1;new Date(e[t+"EndTime"])<new Date(e[t+"BeginTime"])&&(e[t+"EndTime"]=e[t+"BeginTime"])},_changeManager:function(e){for(var t=0;t<this.managerList.length;t++)if(e===this.managerList[t].empId)return this.itemData.marketEmployee={empId:this.managerList[t].empId,employeeName:this.managerList[t].employeeName},!1},cancelHandle:function(){this.$router.push("/contact/sign")}},components:{signTable:f,confirmView:a("vSla")(y,_,!1,function(e){a("rnPX"),a("Mv24")},"data-v-0911b550",null).exports}},D={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"c-detail-container sign-handle-wrap"},[e.isPreview?[a("confirmView",{attrs:{preContract:e.preContract,contractDetail:e.contractDetail,itemData:e.itemData,curBoothNum:e.curBoothNum},on:{prvHandle:function(t){e.isPreview=!1}}})]:[a("h4",{staticClass:"title"},[e._v("客户"+e._s("new"===e.curType?"新":"续")+"签合同")]),e._v(" "),a("el-form",{ref:"itemData",staticClass:"c-detail-form",attrs:{model:e.itemData,rules:e.rules,"label-width":"144px","label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"商户名称"}},[a("span",[e._v(e._s(e.baseInfo.merchantName))])])],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"注册号"}},[a("span",[e._v(e._s(e.baseInfo.loginNumber))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"负责人"}},[a("span",[e._v(e._s(e.baseInfo.leaderName))])])],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"负责人身证号"}},[a("span",[e._v(e._s(e.baseInfo.leaderCard))])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"品类-品牌"}},[a("span",[e._v(e._s(e.baseInfo.brandName))])])],1)],1),e._v(" "),a("el-row",{directives:[{name:"show",rawName:"v-show",value:"renew"===e.curType,expression:"curType === 'renew'"}]},[a("el-col",{attrs:{span:24}},[a("el-form-item",{staticClass:"has-more-spacing",attrs:{label:"续签类型",prop:"signType",rules:"renew"===e.curType?e.rules.signType:[{required:!1}]}},[a("el-select",{staticClass:"sign-type-select",attrs:{clearable:"",placeholder:"请选择"},model:{value:e.itemData.signType,callback:function(t){e.$set(e.itemData,"signType","string"==typeof t?t.trim():t)},expression:"itemData.signType"}},e._l(e.signTypeList,function(e,t){return a("el-option",{key:t,attrs:{label:e.desc,value:e.code}})}))],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{staticClass:"has-more-spacing",attrs:{label:"摊位号",prop:"contractQuery.boothId",rules:{required:!0,message:"请选择摊位号",trigger:"change"}}},[a("el-select",{attrs:{multiple:"","collapse-tags":"",placeholder:"请选择"},on:{change:e.boothIdChange},model:{value:e.itemData.contractQuery.boothId,callback:function(t){e.$set(e.itemData.contractQuery,"boothId","string"==typeof t?t.trim():t)},expression:"itemData.contractQuery.boothId"}},e._l(e.boothList,function(e,t){return a("el-option",{key:t,attrs:{label:e.boothNumber,value:e.boothCode}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"使用面积",prop:"useableAcreage"}},[a("el-input",{attrs:{clearable:""},model:{value:e.itemData.useableAcreage,callback:function(t){e.$set(e.itemData,"useableAcreage","string"==typeof t?t.trim():t)},expression:"itemData.useableAcreage"}}),e._v(" "),a("span",{staticClass:"s-unit"},[e._v("m²")])],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{staticClass:"has-more-spacing",attrs:{label:"公摊比例",prop:"publicScale"}},[a("el-input",{attrs:{clearable:""},model:{value:e.itemData.publicScale,callback:function(t){e.$set(e.itemData,"publicScale","string"==typeof t?t.trim():t)},expression:"itemData.publicScale"}}),e._v(" "),a("span",{staticClass:"s-unit"},[e._v("%")])],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"计租面积",prop:"contractQuery.rentAcreage",rules:{required:!0,validator:e.rentAcreageDecimal,trigger:"blur"}}},[a("el-input",{attrs:{clearable:""},model:{value:e.itemData.contractQuery.rentAcreage,callback:function(t){e.$set(e.itemData.contractQuery,"rentAcreage","string"==typeof t?t.trim():t)},expression:"itemData.contractQuery.rentAcreage"}}),e._v(" "),a("span",{staticClass:"s-unit"},[e._v("m²")])],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"摊位单价",prop:"boothPrice"}},[a("el-input",{attrs:{clearable:""},model:{value:e.itemData.boothPrice,callback:function(t){e.$set(e.itemData,"boothPrice","string"==typeof t?t.trim():t)},expression:"itemData.boothPrice"}}),e._v(" "),a("span",{staticClass:"s-unit"},[e._v("元/平米/月")])],1)],1)],1),e._v(" "),a("div",{staticClass:"div-line"}),e._v(" "),"new"===e.curType?a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"商户类型"}},[a("el-radio-group",{model:{value:e.itemData.merchantType,callback:function(t){e.$set(e.itemData,"merchantType",t)},expression:"itemData.merchantType"}},[a("el-radio",{attrs:{label:1}},[e._v("开张后签约")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("开张前签约")])],1)],1)],1)],1):e._e(),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.isAfterOpen,expression:"isAfterOpen"}]},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{staticClass:"has-more-spacing",attrs:{label:"租赁期/合同期",prop:"rentPeriod",rules:e.isAfterOpen?e.rules.rentPeriod:[{required:!1}]}},[a("el-input",{attrs:{clearable:""},model:{value:e.itemData.rentPeriod,callback:function(t){e.$set(e.itemData,"rentPeriod","string"==typeof t?t.trim():t)},expression:"itemData.rentPeriod"}}),e._v(" "),a("span",{staticClass:"s-unit"},[e._v("月")])],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{staticClass:"has-more-spacing",attrs:{label:"合同开始时间",prop:"rentBeginTime",rules:e.isAfterOpen?e.rules.rentBeginTime:[{required:!1}]}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},on:{change:function(t){e._checkTime(e.itemData,"rent")}},model:{value:e.itemData.rentBeginTime,callback:function(t){e.$set(e.itemData,"rentBeginTime","string"==typeof t?t.trim():t)},expression:"itemData.rentBeginTime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"合同结束日时间",prop:"rentEndTime",rules:e.isAfterOpen?e.rules.rentEndTime:[{required:!1}]}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},on:{change:function(t){e._checkTime(e.itemData,"rent")}},model:{value:e.itemData.rentEndTime,callback:function(t){e.$set(e.itemData,"rentEndTime","string"==typeof t?t.trim():t)},expression:"itemData.rentEndTime"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{staticClass:"has-more-spacing",attrs:{label:"优惠期",prop:"discountsPeriod",rules:e.isAfterOpen?e.rules.discountsPeriod:[{required:!1}]}},[a("el-input",{attrs:{clearable:""},model:{value:e.itemData.discountsPeriod,callback:function(t){e.$set(e.itemData,"discountsPeriod","string"==typeof t?t.trim():t)},expression:"itemData.discountsPeriod"}}),e._v(" "),a("span",{staticClass:"s-unit"},[e._v("月")])],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{staticClass:"has-more-spacing",attrs:{label:"优惠开始时间",prop:"discountsBeginTime",rules:e.isAfterOpen?e.rules.discountsBeginTime:[{required:!1}]}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},on:{change:function(t){e._checkTime(e.itemData,"discounts")}},model:{value:e.itemData.discountsBeginTime,callback:function(t){e.$set(e.itemData,"discountsBeginTime","string"==typeof t?t.trim():t)},expression:"itemData.discountsBeginTime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"优惠结束日时间",prop:"discountsEndTime",rules:e.isAfterOpen?e.rules.discountsEndTime:[{required:!1}]}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},on:{change:function(t){e._checkTime(e.itemData,"discounts")}},model:{value:e.itemData.discountsEndTime,callback:function(t){e.$set(e.itemData,"discountsEndTime","string"==typeof t?t.trim():t)},expression:"itemData.discountsEndTime"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{staticClass:"has-more-spacing",attrs:{label:"计租期",prop:"hirePeriod",rules:e.isAfterOpen?e.rules.hirePeriod:[{required:!1}]}},[a("el-input",{attrs:{clearable:""},model:{value:e.itemData.hirePeriod,callback:function(t){e.$set(e.itemData,"hirePeriod","string"==typeof t?t.trim():t)},expression:"itemData.hirePeriod"}}),e._v(" "),a("span",{staticClass:"s-unit"},[e._v("月")])],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"计租开始时间",prop:"hireBeginTime",rules:e.isAfterOpen?e.rules.hireBeginTime:[{required:!1}]}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},on:{change:function(t){e._checkTime(e.itemData,"hire")}},model:{value:e.itemData.hireBeginTime,callback:function(t){e.$set(e.itemData,"hireBeginTime","string"==typeof t?t.trim():t)},expression:"itemData.hireBeginTime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"计租结束日时间",prop:"hireEndTime",rules:e.isAfterOpen?e.rules.hireEndTime:[{required:!1}]}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},on:{change:function(t){e._checkTime(e.itemData,"hire")}},model:{value:e.itemData.hireEndTime,callback:function(t){e.$set(e.itemData,"hireEndTime","string"==typeof t?t.trim():t)},expression:"itemData.hireEndTime"}})],1)],1)],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.isAfterOpen,expression:"!isAfterOpen"}]},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{staticClass:"has-more-spacing",attrs:{label:"租赁期/合同期",prop:"rentPeriod",rules:e.isAfterOpen?[{required:!1}]:e.rules.rentPeriod}},[a("el-input",{attrs:{clearable:""},model:{value:e.itemData.rentPeriod,callback:function(t){e.$set(e.itemData,"rentPeriod","string"==typeof t?t.trim():t)},expression:"itemData.rentPeriod"}}),e._v(" "),a("span",{staticClass:"s-unit"},[e._v("月")])],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"优惠期",prop:"discountsPeriod",rules:e.isAfterOpen?[{required:!1}]:e.rules.discountsPeriod}},[a("el-input",{attrs:{clearable:""},model:{value:e.itemData.discountsPeriod,callback:function(t){e.$set(e.itemData,"discountsPeriod","string"==typeof t?t.trim():t)},expression:"itemData.discountsPeriod"}}),e._v(" "),a("span",{staticClass:"s-unit"},[e._v("月")])],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"计租期",prop:"hirePeriod",rules:e.isAfterOpen?[{required:!1}]:e.rules.hirePeriod}},[a("el-input",{attrs:{clearable:""},model:{value:e.itemData.hirePeriod,callback:function(t){e.$set(e.itemData,"hirePeriod","string"==typeof t?t.trim():t)},expression:"itemData.hirePeriod"}}),e._v(" "),a("span",{staticClass:"s-unit"},[e._v("月")])],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"div-line div-bottom-more"}),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{staticClass:"has-more-spacing",attrs:{label:"首付周期",prop:"downPaymentPeriod"}},[a("el-input",{attrs:{clearable:""},model:{value:e.itemData.downPaymentPeriod,callback:function(t){e.$set(e.itemData,"downPaymentPeriod","string"==typeof t?t.trim():t)},expression:"itemData.downPaymentPeriod"}}),e._v(" "),a("span",{staticClass:"s-unit"},[e._v("月")])],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{staticClass:"has-more-spacing",attrs:{label:"优惠扣回",prop:"deductDiscountsDay"}},[a("el-input",{attrs:{clearable:""},model:{value:e.itemData.deductDiscountsDay,callback:function(t){e.$set(e.itemData,"deductDiscountsDay","string"==typeof t?t.trim():t)},expression:"itemData.deductDiscountsDay"}}),e._v(" "),a("span",{staticClass:"s-unit"},[e._v("天")])],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"摊位租金/商铺租金"}},[a("el-input",{attrs:{disabled:""},model:{value:e.itemData.totalAmount,callback:function(t){e.$set(e.itemData,"totalAmount","string"==typeof t?t.trim():t)},expression:"itemData.totalAmount"}}),e._v(" "),a("span",{staticClass:"s-unit"},[e._v("元")])],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{staticClass:"input-textarea-box-24",attrs:{label:"备注",prop:"contractComment"}},[a("el-input",{attrs:{type:"textarea",maxlength:"200"},model:{value:e.itemData.contractComment,callback:function(t){e.$set(e.itemData,"contractComment","string"==typeof t?t.trim():t)},expression:"itemData.contractComment"}})],1)],1)],1),e._v(" "),a("p",{staticClass:"cost-title"},[e._v("费用列表")]),e._v(" "),a("signTable",{ref:"signTable",attrs:{costList:e.itemData.contractCostPhaseList,baseCostObj:e.baseCostObj}}),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{staticClass:"manager-box",attrs:{label:"楼层经理",prop:"empId"}},[a("el-select",{staticClass:"el-input-h",attrs:{disabled:e.cueIsManager,placeholder:"请选择"},on:{change:e._changeManager},model:{value:e.itemData.empId,callback:function(t){e.$set(e.itemData,"empId","string"==typeof t?t.trim():t)},expression:"itemData.empId"}},e._l(e.managerList,function(e){return a("el-option",{key:e.empId,attrs:{label:e.employeeName,value:e.empId}})}))],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"c-detail-footer-box"},[a("el-button",{attrs:{type:"primary"},on:{click:e.nextHandle}},[e._v("下一步")]),e._v(" "),a("el-button",{staticClass:"cancel-btn",on:{click:e.cancelHandle}},[e._v("取消")])],1)]],2)},staticRenderFns:[]};var C=a("vSla")(T,D,!1,function(e){a("xDTQ")},"data-v-b31f20ce",null);t.a=C.exports},rnPX:function(e,t){},v2bE:function(e,t){},xDTQ:function(e,t){}});
//# sourceMappingURL=3.37526f2e0bc42c438751.js.map