webpackJsonp([87],{"02D5":function(t,e){},UXQz:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("Xxa5"),r=a.n(l),n=a("exGp"),c=a.n(n),i=a("YH6z"),s=a("vsZy"),o=a("pazF"),m=a("FTcF"),u={name:"contractReceipts",mixins:[s.d],data:function(){return{paymentTime:[],reqData:{merchantName:"",contractBatchNum:"",payType:"",costStatus:"",marketCode:"",currentPage:1},payWay:[{label:"微信",value:1},{label:"支付宝",value:2},{label:"POS机刷卡",value:3}],statusList:[{label:"未交款",value:1},{label:"已交款",value:4},{label:"部分交款",value:2}],itemDetail:{}}},mounted:function(){var t=this.$route.params.marketCode||"";t&&(this.reqData.marketCode=t),this.getList(i.a.contractCosts)},methods:{toPage:function(t){this.$router.push({name:"contractRecCashIn",params:{contractBatchNum:t}})},search:function(){this.reqData.currentPage=1,this.getList(i.a.contractCosts)},viewContract:function(t){var e=this;return c()(r.a.mark(function a(){var l;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.get(i.a.contractCosts+"/"+t);case 2:(l=a.sent)&&(e.itemDetail=l.data,e.$refs.detailDialog.showDialog());case 4:case"end":return a.stop()}},a,e)}))()}},components:{detailDialog:o.a,selectMarket:m.a}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contract-receipts"},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{model:t.reqData,"label-width":"122px",inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"商场名称"}},[a("selectMarket",{attrs:{reqData:t.reqData}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"商户名称"}},[a("el-input",{attrs:{clearable:""},model:{value:t.reqData.merchantName,callback:function(e){t.$set(t.reqData,"merchantName","string"==typeof e?e.trim():e)},expression:"reqData.merchantName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"合同批次号"}},[a("el-input",{attrs:{clearable:""},model:{value:t.reqData.contractBatchNum,callback:function(e){t.$set(t.reqData,"contractBatchNum","string"==typeof e?e.trim():e)},expression:"reqData.contractBatchNum"}})],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.reqData.costStatus,callback:function(e){t.$set(t.reqData,"costStatus","string"==typeof e?e.trim():e)},expression:"reqData.costStatus"}},t._l(t.statusList,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"约定交款起止时间"}},[a("el-date-picker",{staticClass:"picker-time-interval",attrs:{type:"datetimerange","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:t.paymentTime,callback:function(e){t.paymentTime="string"==typeof e?e.trim():e},expression:"paymentTime"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("查询")])],1)])],1)],1),t._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.itemList,height:"500",align:"center",stripe:""}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50",index:t.indexMethod}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"合同批次号","min-width":"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{on:{click:function(a){t.viewContract(e.row.contractBatchNum)}}},[t._v(t._s(e.row.contractBatchNum))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"merchantName",label:"商户名称","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"marketName",label:"商场名称","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime",label:"合同生成时间","min-width":"165"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"约定交款时间","min-width":"165"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.expectPayTimeList,function(l,r){return e.row.expectPayTimeList&&e.row.expectPayTimeList.length?a("p",{key:r},[t._v(t._s(l))]):t._e()})}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"leaderName",label:"负责人"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"leaderTel",label:"负责人联系电话","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态","min-width":"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.paymentStatus?e.row.paymentStatus.desc:""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"payAmount",label:"交款金额"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"latestUpdateUser",label:"操作人"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"latestPayTime",label:"交款操作时间","min-width":"165"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",fixed:"right","min-width":"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"btn-handle",attrs:{disabled:!t.checkKey("contractReceipts_2"),type:"primary"},on:{click:function(a){t.toPage(e.row.contractBatchNum)}}},[t._v("\n            收款\n          ")])]}}])})],1)],1),t._v(" "),a("pagenation",{attrs:{pageparams:t.pageInfo,itemList:t.itemList},on:{handlePage:t.handlePage}}),t._v(" "),a("detailDialog",{ref:"detailDialog",attrs:{curType:1,itemDetail:t.itemDetail}})],1)},staticRenderFns:[]};var d=a("VU/8")(u,p,!1,function(t){a("02D5")},null,null);e.default=d.exports}});
//# sourceMappingURL=87.edcd35a28b9c65611111.js.map