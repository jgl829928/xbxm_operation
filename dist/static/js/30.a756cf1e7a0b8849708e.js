webpackJsonp([30],{"4Lsd":function(e,t){},S4Hb:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("Xxa5"),o=a.n(l),r=a("exGp"),n=a.n(r),s=a("Gu7T"),i=a.n(s),c=a("//Fk"),p=a.n(c),u=a("hm3b"),b=a("FTcF"),m=a("hVDB"),d={name:"colInfoSearch",components:{Pagenation:u.a,selectMarket:b.a},data:function(){return{pageDefault:{totalRecords:0,currentPage:1,pageSize:20},pageParams:{boothNumber:"",boothStatus:"",marketCode:"",boothTypeCode:"",floor:"",currentPage:1},tableList:[],typeOption:[],storeNameOption:[],floorList:[{label:"-3层",value:-3},{label:"-2层",value:-2},{label:"-1层",value:-1},{label:"1层",value:1},{label:"2层",value:2},{label:"3层",value:3},{label:"4层",value:4},{label:"5层",value:5},{label:"6层",value:6},{label:"7层",value:7},{label:"8层",value:8}],statusList:[{label:"未出租",value:1},{label:"签约待审核",value:2},{label:"已出租",value:3},{label:"交款期",value:4},{label:"欠款待缴费",value:5},{label:"合同即将到期",value:6},{label:"已预定",value:7}]}},methods:{getOptionData:function(){var e=this,t=this.$http.get(m.a.allBoothType),a=this.$http.get(m.a.allStore);p.a.all([t,a]).then(function(t){0===t[0].code&&(e.typeOption=[],e.typeOption=[].concat(i()(t[0].data))),0===t[1].code&&(e.storeNameOption=[],e.storeNameOption=[].concat(i()(t[1].data)))})},getPageList:function(e){var t=this;return n()(o.a.mark(function a(){var l;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.pageParams.currentPage=e||1,t.pageDefault.currentPage=e||1,a.next=4,t.$http.get(m.a.boothList,{params:t.pageParams});case 4:0===(l=a.sent).code&&(t.pageDefault.totalRecords=l.page.totalRecords,t.tableList=[],t.tableList=[].concat(i()(l.data)));case 6:case"end":return a.stop()}},a,t)}))()},indexMethod:function(e){return e+20*(this.pageParams.currentPage-1)+1}},beforeMount:function(){this.getOptionData(),this.getPageList()}},g={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contract-receipts"},[a("el-form",{ref:"pageParams",staticClass:"c-search-form",attrs:{model:e.pageParams,"label-width":"80px",inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"摊位号",prop:"itemCode"}},[a("el-input",{attrs:{clearable:""},model:{value:e.pageParams.boothNumber,callback:function(t){e.$set(e.pageParams,"boothNumber","string"==typeof t?t.trim():t)},expression:"pageParams.boothNumber"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"状态",prop:"skuCode"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.pageParams.boothStatus,callback:function(t){e.$set(e.pageParams,"boothStatus","string"==typeof t?t.trim():t)},expression:"pageParams.boothStatus"}},e._l(e.statusList,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"商场名称",prop:"skuCode"}},[a("selectMarket",{attrs:{reqData:e.pageParams}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"类型",prop:"skuCode"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.pageParams.boothTypeCode,callback:function(t){e.$set(e.pageParams,"boothTypeCode","string"==typeof t?t.trim():t)},expression:"pageParams.boothTypeCode"}},e._l(e.typeOption,function(e,t){return a("el-option",{key:t,attrs:{label:e.boothTypeName,value:e.boothTypeCode}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"楼层",prop:"skuCode"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.pageParams.floor,callback:function(t){e.$set(e.pageParams,"floor","string"==typeof t?t.trim():t)},expression:"pageParams.floor"}},e._l(e.floorList,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getPageList(1)}}},[e._v("查询")])],1)])],1)],1),e._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableList,align:"center",stripe:"",height:"500"}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号","min-width":"50",index:e.indexMethod}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"110",align:"center",prop:"boothNumber",label:"摊位号"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"160",align:"center",prop:"boothCode",label:"摊位编号"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"110",align:"center",prop:"merchantName",label:"所属商户"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"110",align:"center",prop:"marketName",label:"商场名称"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"110",align:"center",prop:"boothTypeName",label:"类型"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"110",align:"center",prop:"floor",label:"楼层"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"110",align:"center",prop:"area",label:"区域"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"110",align:"center",prop:"calculateArea",label:"计租面积"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"110",align:"center",prop:"usableArea",label:"使用面积"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"110",align:"center",prop:"boothPrice",label:"摊位单价"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"units.desc","min-width":"110",label:"单位"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"110",prop:"boothStatus.desc",align:"center",label:"状态"}})],1)],1),e._v(" "),a("Pagenation",{attrs:{pageparams:e.pageDefault,itemList:e.tableList},on:{handlePage:e.getPageList}})],1)},staticRenderFns:[]};var h=a("VU/8")(d,g,!1,function(e){a("4Lsd"),a("vZUk")},"data-v-78efc31e",null);t.default=h.exports},vZUk:function(e,t){}});
//# sourceMappingURL=30.a756cf1e7a0b8849708e.js.map