webpackJsonp([91],{"4K1c":function(t,e){},j1lX:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("9T2X"),n=a("FTcF"),r=a("hm3b"),l={data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},pageparams:{},time:"",reqData:{marketCode:"",companyId:"",startTime:"",endTime:"",currentPage:1,pageSize:20},itemList:[],estate_company:[]}},components:{selectMarket:n.a,pagenation:r.a},name:"taskManage",methods:{getListData:function(){var t=this;this.$http.get(i.a.taskList,{params:this.reqData}).then(function(e){e&&0==e.code&&e.data?(t.itemList=e.data,t.pageparams=e.page):t.itemList=[]})},getOtherData:function(t){var e=this,a={marketCode:""};2===this.currentUser.affiliation?a.marketCode=this.currentUser.marketCode:a.marketCode=t,this.$http.get(i.a.estateCompany,{params:a}).then(function(t){t&&0==t.code&&(e.estate_company=t.data)})},search:function(){this.reqData.currentPage=1,this.reqData.startTime=this.time?this.time[0]:"",this.reqData.endTime=this.time?this.time[1]:"",this.getListData()},handlePage:function(t){this.reqData.currentPage=t,this.getListData()},code_change:function(t){this.getOtherData(t),this.reqData.companyId=""}},computed:{currentUser:function(){return this.$store.state.currentUser}},created:function(){this.getOtherData(""),this.getListData()}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contract-receipts"},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{model:t.reqData,"label-width":"102px",inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"商场",prop:"marketCode"}},[a("select-market",{attrs:{reqData:t.reqData},on:{change:t.code_change}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"物业公司",prop:"companyId"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.reqData.companyId,callback:function(e){t.$set(t.reqData,"companyId",e)},expression:"reqData.companyId"}},t._l(t.estate_company,function(t,e){return a("el-option",{key:e,attrs:{label:t.companyName,value:t.companyId}})}))],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{staticClass:"search_time",attrs:{label:"巡检日期",prop:"time"}},[a("el-date-picker",{attrs:{type:"daterange","picker-options":t.pickerOptions,"range-separator":"至","start-placeholder":"年/月/日","default-time":["00:00:00","23:59:59"],"end-placeholder":"年/月/日",align:"right","value-format":"yyyy-MM-dd"},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("查询")])],1)])],1)],1),t._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.itemList,align:"center",stripe:"",height:"500"}},[a("el-table-column",{attrs:{align:"center",prop:"taskId",label:"序号","min-width":"160"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"marketName",label:"所属商场"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"companyName",label:"物业公司"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"staffName",label:"物业人员"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"serialNumber",label:"巡检点编号","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"pointLocation",label:"巡检点位置","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"checkDate",label:"巡检点任务日期","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"checkPlan",label:"需巡检次数","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"checkActual",label:"已巡检次数","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"updateTime",label:"更新时间","min-width":"165"}})],1)],1),t._v(" "),a("div",{staticClass:"pagination-box"},[a("pagenation",{attrs:{pageparams:t.pageparams,itemList:t.itemList},on:{handlePage:t.handlePage}})],1)],1)},staticRenderFns:[]};var c=a("vSla")(l,s,!1,function(t){a("4K1c")},null,null);e.default=c.exports}});
//# sourceMappingURL=91.b2fc5688660ca2f13fbf.js.map