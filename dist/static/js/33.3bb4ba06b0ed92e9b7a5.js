webpackJsonp([33],{"9YKX":function(e,t){},"9tVn":function(e,t){},"CN+l":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Dd8w"),r=a.n(n),l=a("eMGh"),i=a("2A+d"),s=a("FTcF"),o=a("TIfe"),c=a("hm3b"),m={name:"maintenance",data:function(){return{dialogFormVisible1:!1,dialogFormVisible2:!1,categotyListFir:[],reqData:{marketCode:"",rankId:""},pageparams:{currentPage:""},itemList:[],fileList1:[],fileList2:[],title:""}},components:{selectMarket:s.a,pagenation:c.a},created:function(){this.handleCategory("-1","categotyListFir"),this.getData(1)},methods:{rightControl:function(e){return this.$store.getters.getPermission(e)},search:function(){this.getData()},getData:function(e){e=e||"";var t=r()({},this.reqData,{currentPage:e});Object(o.b)(e,t,i.a.maintenance,this)},handleCategory:function(e,t){var a=this;this.$http({url:l.b.deviceCategory,method:"get",params:{parentId:e}}).then(function(e){e&&0==e.code&&(a[t]=e.data)})},handlePage:function(e){this.getData(e)},deleteData:function(e){var t=this;this.$confirm("此操作将永久删除该条, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.delete(i.a.maintenance+"/"+e,{params:{maintenance:e}}).then(function(e){e&&0==e.code&&(t.$message({type:"success",message:e.msg}),t.getData(t.pageparams.currentPage))})}).catch(function(){})}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"g-attendance-record"},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{model:e.reqData,"label-width":"102px",inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"商场",prop:"marketCode"}},[a("select-market",{attrs:{reqData:e.reqData}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"商户",prop:"rankId"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.reqData.rankId,callback:function(t){e.$set(e.reqData,"rankId",t)},expression:"reqData.rankId"}},e._l(e.categotyListFir,function(e,t){return a("el-option",{key:t,attrs:{label:e.rankName,value:e.rankId}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"手机号",prop:"equipmentCode"}},[a("el-input",{attrs:{clearable:"",placeholder:"设备唯一标识"},model:{value:e.reqData.equipmentCode,callback:function(t){e.$set(e.reqData,"equipmentCode","string"==typeof t?t.trim():t)},expression:"reqData.equipmentCode"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:8,offset:16}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.search}},[e._v("查询")])],1)])],1)],1),e._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.itemList,align:"center",height:"500",stripe:""}},[a("el-table-column",{attrs:{align:"center",prop:"maintenanceId","min-width":"160",label:"序号"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"marketName",label:"所属商场"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"rankName",label:"所属商户"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"equipmentName",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"equipmentCode","min-width":"160",label:"手机号"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"maintenanceCompany",label:"考勤日期"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"maintenancePerson",label:"上班时间"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"maintenanceCost",label:"下班时间"}})],1)],1),e._v(" "),a("pagenation",{attrs:{pageparams:e.pageparams,itemList:e.itemList},on:{handlePage:e.handlePage}})],1)},staticRenderFns:[]};var d=a("VU/8")(m,p,!1,function(e){a("9YKX"),a("9tVn")},"data-v-73d6b22a",null);t.default=d.exports}});
//# sourceMappingURL=33.3bb4ba06b0ed92e9b7a5.js.map