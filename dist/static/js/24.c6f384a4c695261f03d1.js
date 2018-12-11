webpackJsonp([24],{"4Z8P":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("Dd8w"),n=a.n(r),l=a("Xxa5"),c=a.n(l),o=a("exGp"),s=a.n(o),i=a("RhA+"),u=a("vsZy"),p=a("2v3v"),m=a("FTcF"),d={name:"contractSearch",mixins:[u.d],data:function(){return{scheduleDialog:!1,beginTime:[],endTime:[],tplData:{},progressList:[],reqData:{contractCodeNum:"",contractCode:"",merchantName:"",contractBatchNum:"",contractStatus:"",marketCode:"",floorManagerName:"",contractTypeCode:"",beginRentBeginTime:"",beginRentEndTime:"",endRentBeginTime:"",endRentEndTime:""},statusList:[{label:"已生效",value:1},{label:"未生效",value:2},{label:"已作废",value:3},{label:"已失效",value:4}],contractsTypeList:[]}},mounted:function(){this.getList(i.a.contractsLists),this.getBasicContracts()},computed:{curProgressActive:function(){for(var t=this.progressList.length;t>0;t--)if(this.progressList[t-1].checkStatus&&4===this.progressList[t-1].checkStatus.code)return t;return 0}},methods:{getBasicContracts:function(){var t=this;return s()(c.a.mark(function e(){var a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get(i.a.basicContracts);case 2:(a=e.sent)&&(t.contractsTypeList=a.data);case 4:case"end":return e.stop()}},e,t)}))()},search:function(){this.reqData.currentPage=1,this.getList(i.a.contractsLists)},viewContract:function(t){var e=this;return s()(c.a.mark(function a(){var r,l,o,s,u,p;return c.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(r=t.electronicContractcolUrl,l=t.contractBatchNum,o=t.contractTplEunm,!r){a.next=5;break}window.open(r,"_blank"),a.next=10;break;case 5:return s={contractTplEunm:o,contractBatchNum:l},a.next=8,e.$http.get(i.a.queryCheckContract,{params:s});case 8:(u=a.sent)&&(p=u.data,1===o?(p.contractPeriodCostList.map(function(t){t.costDetail=t.costDetail.replace(/\n/g,"<br/>")}),e.tplData=n()({contractPeriodCostList:p.contractPeriodCostList},p.contractShoot)):e.tplData=p,e.$refs.contractTpl.showDialog(o));case 10:case"end":return a.stop()}},a,e)}))()},viewSchedule:function(t){var e=this;return s()(c.a.mark(function a(){var r;return c.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.get(i.a.checkProgress+"/"+t);case 2:(r=a.sent)&&(e.progressList=r.data),e.scheduleDialog=!0;case 5:case"end":return a.stop()}},a,e)}))()}},filters:{boothIdString:function(t){return t&&t.length?t.join("、"):""}},components:{contractTpl:p.a,selectMarket:m.a}},b={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"g-contract-search"},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{model:t.reqData,"label-width":"102px",inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"合同批次号"}},[a("el-input",{attrs:{clearable:""},model:{value:t.reqData.contractBatchNum,callback:function(e){t.$set(t.reqData,"contractBatchNum",e)},expression:"reqData.contractBatchNum"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"商户名称"}},[a("el-input",{attrs:{clearable:""},model:{value:t.reqData.merchantName,callback:function(e){t.$set(t.reqData,"merchantName","string"==typeof e?e.trim():e)},expression:"reqData.merchantName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.reqData.contractStatus,callback:function(e){t.$set(t.reqData,"contractStatus","string"==typeof e?e.trim():e)},expression:"reqData.contractStatus"}},t._l(t.statusList,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"合同编号"}},[a("el-input",{attrs:{clearable:""},model:{value:t.reqData.contractCode,callback:function(e){t.$set(t.reqData,"contractCode","string"==typeof e?e.trim():e)},expression:"reqData.contractCode"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"商场名称"}},[a("selectMarket",{attrs:{reqData:t.reqData}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"楼层经理"}},[a("el-input",{attrs:{clearable:""},model:{value:t.reqData.floorManagerName,callback:function(e){t.$set(t.reqData,"floorManagerName",e)},expression:"reqData.floorManagerName"}})],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"合同类型"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.reqData.contractTypeCode,callback:function(e){t.$set(t.reqData,"contractTypeCode",e)},expression:"reqData.contractTypeCode"}},t._l(t.contractsTypeList,function(t,e){return a("el-option",{key:e,attrs:{label:t.contractTypeName,value:t.contractTypeCode}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"法务编码"}},[a("el-input",{attrs:{clearable:""},model:{value:t.reqData.contractCodeNum,callback:function(e){t.$set(t.reqData,"contractCodeNum",e)},expression:"reqData.contractCodeNum"}})],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"合同开始日期"}},[a("el-date-picker",{staticClass:"picker-time-interval",attrs:{type:"datetimerange","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:t.beginTime,callback:function(e){t.beginTime=e},expression:"beginTime"}})],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"合同结束日期"}},[a("el-date-picker",{staticClass:"picker-time-interval",attrs:{type:"datetimerange","picker-options":t.pickerOptions,"value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:t.endTime,callback:function(e){t.endTime=e},expression:"endTime"}})],1)],1),t._v(" "),a("el-col",{attrs:{offset:8,span:8}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("查询")])],1)])],1)],1),t._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.itemList,height:"500",align:"center",stripe:""}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50",index:t.indexMethod}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"合同编号","min-width":"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(e.row.contractCode)+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"contractBatchNum",label:"合同批次号","min-width":"160"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"contractCodeNum",label:"法务编码","min-width":"160"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"contractTypeName",label:"合同类型","min-width":"110"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"marketName",label:"商场名称","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime",label:"合同生成时间","min-width":"165"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"rentBeginTime",label:"合同开始日期","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"rentEndTime",label:"合同结束日期","min-width":"150"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"merchantName",label:"商户名称","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"brandName",label:"经营品牌","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"摊位号","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("boothIdString")(e.row.boothId)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"floorManager",label:"楼层经理"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"审核状态","min-width":"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.contractCheckStatus?e.row.contractCheckStatus.desc:""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"合同状态","min-width":"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.contractStatus?e.row.contractStatus.desc:""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"是否盖章"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.sealStatus?e.row.sealStatus.desc:""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"totalAmount",label:"应缴金额"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"payAmount",label:"已缴金额"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"unpaidAmount",label:"未缴金额"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",fixed:"right","min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"btn-handle",attrs:{disabled:!t.checkKey("contractSearch_1"),type:"primary"},on:{click:function(a){t.viewContract(e.row)}}},[t._v("\n            查看合同\n          ")]),t._v(" "),a("el-button",{staticClass:"btn-handle",attrs:{disabled:!t.checkKey("contractSearch_2"),type:"primary"},on:{click:function(a){t.viewSchedule(e.row.contractBatchNum)}}},[t._v("\n            查看进度\n          ")]),t._v(" "),t._e()]}}])})],1)],1),t._v(" "),a("pagenation",{attrs:{pageparams:t.pageInfo,itemList:t.itemList},on:{handlePage:t.handlePage}}),t._v(" "),a("el-dialog",{staticClass:"m-dialog el-steps-dialog",attrs:{title:"合同审核进度",visible:t.scheduleDialog,width:"30%"},on:{"update:visible":function(e){t.scheduleDialog=e}}},[a("el-steps",{attrs:{space:200,active:t.curProgressActive,"align-center":""}},t._l(t.progressList,function(t,e){return a("el-step",{key:e,attrs:{title:t.verifierCharacter,description:t.verifierName}})})),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"btn-save",attrs:{type:"primary"},on:{click:function(e){t.scheduleDialog=!1}}},[t._v("关闭")])],1)],1),t._v(" "),a("contractTpl",{ref:"contractTpl",attrs:{tplData:t.tplData}})],1)},staticRenderFns:[]};var f=a("VU/8")(d,b,!1,function(t){a("9VqV"),a("wvfO")},"data-v-b08c8fe2",null);e.default=f.exports},"9VqV":function(t,e){},wvfO:function(t,e){}});
//# sourceMappingURL=24.c6f384a4c695261f03d1.js.map