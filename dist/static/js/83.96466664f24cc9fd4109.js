webpackJsonp([83],{VVWl:function(e,t){},Yovl:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("9T2X"),i=a("FTcF"),n=a("hm3b"),l={data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},pageparams:{},time:"",reqData:{marketCode:"",startTime:"",endTime:"",currentPage:1,pageSize:20},itemList:[]}},components:{selectMarket:i.a,pagenation:n.a},name:"inspectioReport",methods:{getListData:function(){var e=this;this.$http.get(r.a.reportRecord,{params:this.reqData}).then(function(t){t&&0==t.code&&t.data?(e.itemList=t.data,e.pageparams=t.page):e.itemList=[]})},search:function(){this.reqData.currentPage=1,this.reqData.startTime=this.time?this.time[0]:"",this.reqData.endTime=this.time?this.time[1]:"",this.getListData()},handlePage:function(e){this.reqData.currentPage=e,this.getListData()}},created:function(){this.getListData()}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contract-receipts"},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{model:e.reqData,"label-width":"102px",inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"商场",prop:"marketCode"}},[a("select-market",{attrs:{reqData:e.reqData}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{staticClass:"search_time",attrs:{label:"报告时间",prop:"time"}},[a("el-date-picker",{attrs:{type:"daterange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"年/月/日","default-time":["00:00:00","23:59:59"],"end-placeholder":"年/月/日",align:"right","value-format":"yyyy-MM-dd"},model:{value:e.time,callback:function(t){e.time=t},expression:"time"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.search}},[e._v("查询")])],1)])],1)],1),e._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.itemList,align:"center",stripe:"",height:"500"}},[a("el-table-column",{attrs:{align:"center",prop:"reportId",label:"序号","min-width":"160"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"marketName",label:"所属商场"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"equipmentName",label:"报告设备"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"equipmentCode",label:"设备编号"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.equipmentCode?a("p",[e._v(e._s(t.row.equipmentCode))]):a("p",[e._v("-")])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"reportDetail",label:"报告内容"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"reportLocation",label:"所处位置"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createName",label:"记录人"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime",label:"报告时间","min-width":"165"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"money",label:"解决情况"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.reportStatus?a("p",[e._v("待解决")]):1==t.row.reportStatus?a("p",[e._v("已解决")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"updateName",label:"解决人"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"updateTime",label:"解决时间","min-width":"165"}})],1)],1),e._v(" "),a("div",{staticClass:"pagination-box"},[a("pagenation",{attrs:{pageparams:e.pageparams,itemList:e.itemList},on:{handlePage:e.handlePage}})],1)],1)},staticRenderFns:[]};var o=a("VU/8")(l,s,!1,function(e){a("VVWl")},null,null);t.default=o.exports}});
//# sourceMappingURL=83.96466664f24cc9fd4109.js.map