webpackJsonp([88],{ve8p:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("lC5x"),r=a.n(n),l=a("J0Oq"),s=a.n(l),i=a("YH6z"),c=a("vsZy"),o=a("FTcF"),u={name:"contractReceipts",mixins:[c.d],data:function(){return{reqData:{merchantName:"",contractBatchNum:"",phone:"",currentPage:1},scheduleDialog:!1,progressList:[],options:[]}},computed:{curProgressActive:function(){for(var t=this.progressList.length;t>0;t--)if(this.progressList[t-1].checkStatus&&4===this.progressList[t-1].checkStatus.code)return t;return 0}},mounted:function(){var t=this.$route.params.marketCode||"";t&&(this.reqData.marketCode=t),this.getList(i.a.contractCosts)},methods:{toPage:function(t){this.$router.push({name:"contractRecCashIn",params:{contractBatchNum:t}})},search:function(){this.reqData.currentPage=1,this.getList(i.a.contractCosts)},viewSchedule:function(t){var e=this;return s()(r.a.mark(function a(){var n;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$http.get(i.a.checkProgress+"/"+t);case 2:(n=a.sent)&&(e.progressList=n.data),e.scheduleDialog=!0;case 5:case"end":return a.stop()}},a,e)}))()},viewContract:function(t){var e=this;return s()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},t,e)}))()}},components:{selectMarket:o.a}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"new-sign"},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{model:t.reqData,"label-width":"122px",inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"商场名称"}},[a("selectMarket",{attrs:{reqData:t.reqData}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"商户名称"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:t.reqData.merchantName,callback:function(e){t.$set(t.reqData,"merchantName","string"==typeof e?e.trim():e)},expression:"reqData.merchantName"}},t._l(t.options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"手机号"}},[a("el-input",{attrs:{clearable:""},model:{value:t.reqData.phone,callback:function(e){t.$set(t.reqData,"phone","string"==typeof e?e.trim():e)},expression:"reqData.phone"}})],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{offset:16,span:8}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("查询")])],1)])],1)],1),t._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.itemList,height:"500",align:"center",stripe:""}},[a("el-table-column",{attrs:{align:"center",label:"业务编号",prop:"num","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"所属商场",prop:"merchantName","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"merchantName",label:"签约商户","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"marketName",label:"代表人","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"leaderTel",label:"手机号","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态","min-width":"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.paymentStatus?e.row.paymentStatus.desc:""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"latestPayTime",label:"签约摊位","min-width":"165"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"payAmount",label:"使用面积"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"签约租赁周期","min-width":"210"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.rentBeginTime?a("span",[t._v(t._s(e.row.rentBeginTime))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"计租期","min-width":"210"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.rentBeginTime?a("span",[t._v(t._s(e.row.rentBeginTime))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"优惠期","min-width":"210"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.rentBeginTime?a("span",[t._v(t._s(e.row.rentBeginTime))]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime",label:"签约日期","min-width":"165"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"marketName",label:"楼层经理","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"审批信息","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"view-info"},[t._v(t._s(e.row.paymentStatus?e.row.paymentStatus.desc:""))]),t._v(" "),a("a",{staticClass:"a-view view-info-btn",on:{click:function(a){t.viewSchedule(e.row.contractBatchNum)}}},[t._v("查看")])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime",label:"合同信息","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{staticClass:"a-view",on:{click:function(a){t.viewContract(e.row.contractBatchNum)}}},[t._v("查看")])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime",label:"账单信息","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{staticClass:"a-view",on:{click:function(a){t.viewContract(e.row.contractBatchNum)}}},[t._v("查看")])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"marketName",label:"登记人","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime",label:"登记时间","min-width":"165"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",width:"300",fixed:"right",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"btn-handle",attrs:{type:"primary"}},[t._v("审核")]),t._v(" "),a("el-button",{staticClass:"btn-handle",attrs:{type:"primary"}},[t._v("续签")]),t._v(" "),a("el-button",{staticClass:"btn-handle",attrs:{type:"primary"}},[t._v("查看")])]}}])})],1)],1),t._v(" "),a("pagenation",{attrs:{pageparams:t.pageInfo,itemList:t.itemList},on:{handlePage:t.handlePage}}),t._v(" "),a("el-dialog",{staticClass:"m-dialog el-steps-dialog",attrs:{title:"合同审核进度",visible:t.scheduleDialog,width:"30%"},on:{"update:visible":function(e){t.scheduleDialog=e}}},[a("el-steps",{attrs:{space:200,active:t.curProgressActive,"align-center":""}},t._l(t.progressList,function(t,e){return a("el-step",{key:e,attrs:{title:t.verifierCharacter,description:t.verifierName}})})),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"btn-save",attrs:{type:"primary"},on:{click:function(e){t.scheduleDialog=!1}}},[t._v("关闭")])],1)],1)],1)},staticRenderFns:[]};var p=a("vSla")(u,m,!1,function(t){a("w2/z")},"data-v-28806ffe",null);e.default=p.exports},"w2/z":function(t,e){}});
//# sourceMappingURL=88.3d5209801f9938253beb.js.map