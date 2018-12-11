webpackJsonp([82],{RjP9:function(t,e){},"gs6/":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("4YfN"),n=a.n(r),l=a("2A+d"),s=(a("eMGh"),a("FTcF")),o=a("hm3b"),i=a("TIfe"),c={name:"staff",data:function(){return{reqData:{companyId:"",marketCode:"",workStatus:""},workStatusList:[{label:"在职",value:0},{label:"离职",value:1}],pageparams:{currentPage:1},itemList:[],companyList:[]}},components:{selectMarket:s.a,pagenation:o.a},created:function(){this.getData(),this.getCompanyList()},computed:{currentUser:function(){return this.$store.state.currentUser}},methods:{getOtherData:function(t){var e={marketCode:""};2===this.currentUser.affiliation?e.marketCode=this.currentUser.marketCode:e.marketCode=t,this.getCompanyList(e.marketCode)},code_change:function(t){this.reqData.companyId="",t&&this.getOtherData(t)},rightControl:function(t){return this.$store.getters.getPermission(t)},getData:function(t){t=t||"";var e=n()({},this.reqData,{currentPage:t});Object(i.b)(t,e,l.a.staff,this)},handlePage:function(t){this.getData(t)},search:function(){this.getData()},getCompanyList:function(t){var e=this;this.$http({url:l.a.companyList,params:{marketCode:t},method:"get",showLoading:!1}).then(function(t){t&&0==t.code&&t.data&&(e.companyList=t.data)})}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"g-staff-manage"},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{model:t.reqData,"label-width":"102px",inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"商场",prop:"marketCode"}},[a("select-market",{attrs:{reqData:t.reqData},on:{change:t.code_change}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"物业公司",prop:"companyId"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.reqData.companyId,callback:function(e){t.$set(t.reqData,"companyId",e)},expression:"reqData.companyId"}},t._l(t.companyList,function(t,e){return a("el-option",{key:e,attrs:{label:t.companyName,value:t.companyId}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"在职状态",prop:"workStatus"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.reqData.workStatus,callback:function(e){t.$set(t.reqData,"workStatus",e)},expression:"reqData.workStatus"}},t._l(t.workStatusList,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8,offset:16}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("查询")])],1)])],1),t._v(" "),a("el-row",[a("el-col",{directives:[{name:"show",rawName:"v-show",value:t.rightControl("staff_add"),expression:"rightControl('staff_add')"}],attrs:{span:8}},[a("router-link",{attrs:{to:{name:"addStaff"}}},[a("el-button",{staticClass:"btn-search btn-add",attrs:{type:"primary"}},[t._v("\n              添加员工\n              ")])],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.itemList,align:"center",height:"500",stripe:""}},[a("el-table-column",{attrs:{align:"center",prop:"staffId","min-width":"160",label:"序号"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"companyName",label:"物业公司"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"name",label:"姓名"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"cellPhone","min-width":"165",label:"手机号"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"sex",label:"性别"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(1==e.row.sex?"男":"女")+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"age",label:"年龄"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"identityCard","min-width":"165",label:"身份证号码"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"permanentAddress",label:"常住地址"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"在职状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(1==e.row.workStatus?"离职":"在职"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"entryTime","min-width":"165",label:"入职时间"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"dimissionTime","min-width":"165",label:"离职时间"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createName",label:"登记人"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime","min-width":"165",label:"登记时间"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",fixed:"right","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[1!=e.row.workStatus?a("router-link",{attrs:{to:{name:"editStaff",params:{staffId:e.row.staffId}},disabled:t.rightControl("staff_edit")}},[a("el-button",{staticClass:"btn-handle",attrs:{type:"primary"}},[t._v("\n              修改\n              ")])],1):t._e()]}}])})],1)],1),t._v(" "),a("pagenation",{attrs:{pageparams:t.pageparams,itemList:t.itemList},on:{handlePage:t.handlePage}})],1)},staticRenderFns:[]};var p=a("vSla")(c,m,!1,function(t){a("RjP9")},null,null);e.default=p.exports}});
//# sourceMappingURL=82.484b5b50151802c49271.js.map