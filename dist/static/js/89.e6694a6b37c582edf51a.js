webpackJsonp([89],{wA2x:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("9T2X"),r=a("FTcF"),n=a("hm3b"),l={data:function(){return{reqData:{currentPage:1,pageSize:20,marketCode:"",companyId:"",assessDate:""},pageparams:{},estate_company:[],itemList:[]}},components:{selectMarket:r.a,pagenation:n.a},name:"examination",methods:{getListData:function(){var t=this;this.$http.get(s.a.chacktaskList,{params:this.reqData}).then(function(e){e&&0==e.code&&e.data?(t.itemList=e.data,t.pageparams=e.page):t.itemList=[]})},getOtherData:function(t){var e=this,a={marketCode:""};2===this.currentUser.affiliation?a.marketCode=this.currentUser.marketCode:a.marketCode=t,this.$http.get(s.a.estateCompany,{params:a}).then(function(t){t&&0==t.code&&(e.estate_company=t.data)})},search:function(){this.reqData.currentPage=1,this.getListData()},handlePage:function(t){this.reqData.currentPage=t,this.getListData()},code_change:function(t){this.getOtherData(t),this.reqData.companyId=""}},computed:{currentUser:function(){return this.$store.state.currentUser}},created:function(){this.getOtherData(),this.getListData()}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"g-examination-manage"},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{model:t.reqData,"label-width":"102px",inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"商场",prop:"marketCode"}},[a("select-market",{attrs:{reqData:t.reqData},on:{change:t.code_change}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"物业公司",prop:"companyId"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.reqData.companyId,callback:function(e){t.$set(t.reqData,"companyId",e)},expression:"reqData.companyId"}},t._l(t.estate_company,function(t,e){return a("el-option",{key:e,attrs:{label:t.companyName,value:t.companyId}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"考核月份",prop:"assessDate"}},[a("el-date-picker",{attrs:{type:"month",placeholder:"年/月",clearable:"","value-format":"yyyy-MM"},model:{value:t.reqData.assessDate,callback:function(e){t.$set(t.reqData,"assessDate",e)},expression:"reqData.assessDate"}})],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8,offset:16}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("查询")])],1)])],1)],1),t._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.itemList,align:"center",stripe:"",height:"500"}},[a("el-table-column",{attrs:{align:"center",prop:"assessId",label:"序号","min-width":"160"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"marketName",label:"商场"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"companyName",label:"物业公司"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"year",label:"年份"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"month",label:"月份"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"totalDays",label:"考核天数"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"assessNumber",label:"考核人数"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"qualified",label:"合格人*天"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"disqualified",label:"不合格人*天","min-width":"140"}})],1)],1),t._v(" "),a("div",{staticClass:"pagination-box"},[a("pagenation",{attrs:{pageparams:t.pageparams,itemList:t.itemList},on:{handlePage:t.handlePage}})],1)],1)},staticRenderFns:[]};var o=a("vSla")(l,i,!1,function(t){a("yxRQ")},null,null);e.default=o.exports},yxRQ:function(t,e){}});
//# sourceMappingURL=89.e6694a6b37c582edf51a.js.map