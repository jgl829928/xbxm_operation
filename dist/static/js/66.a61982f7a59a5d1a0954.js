webpackJsonp([66],{"9CV3":function(t,e){},ezdG:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("4YfN"),i=a.n(n),l=a("eMGh"),s=a("2A+d"),o=a("FTcF"),r=a("TIfe"),c=a("hm3b"),d={name:"maintenance",data:function(){return{dialogFormVisible1:!1,dialogFormVisible2:!1,categotyListFir:[],reqData:{marketCode:"",rankId:""},pageparams:{currentPage:""},itemList:[],fileList1:[],fileList2:[],title:""}},components:{selectMarket:o.a,pagenation:c.a},created:function(){this.handleCategory("-1","categotyListFir"),this.getData(1)},methods:{rightControl:function(t){return this.$store.getters.getPermission(t)},download_file:function(t,e){var a=this;this.$http({method:"get",url:"/business/download",params:{fileUrl:t},showLoading:!1,responseType:"arraybuffer"}).then(function(t){a.download(t.data,e)})},download:function(t,e){if(t){var a=new Blob([t]);if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(a,e);else{var n=window.URL.createObjectURL(new Blob([t])),i=document.createElement("a");i.style.display="none",i.href=n,i.setAttribute("download",e),document.body.appendChild(i),i.click()}}},search:function(){this.getData()},checkConstrck1:function(t,e){this.dialogFormVisible1=!0,t.imgContractUrl?this.fileList1=t.imgContractUrl:this.fileList1=[]},checkConstrck2:function(t,e){this.dialogFormVisible2=!0,t.imgAccessoryUrl?this.fileList2=t.imgAccessoryUrl:this.fileList2=[]},getData:function(t){t=t||"";var e=i()({},this.reqData,{currentPage:t});Object(r.b)(t,e,s.a.maintenance,this)},handleCategory:function(t,e){var a=this;this.$http({url:l.b.deviceCategory,method:"get",params:{parentId:t}}).then(function(t){t&&0==t.code&&(a[e]=t.data)})},handlePage:function(t){this.getData(t)},deleteData:function(t){var e=this;this.$confirm("此操作将永久删除该条, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.delete(s.a.maintenance+"/"+t,{params:{maintenance:t}}).then(function(t){t&&0==t.code&&(e.$message({type:"success",message:t.msg}),e.getData(e.pageparams.currentPage))})}).catch(function(){})}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"g-reserve-manage"},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{model:t.reqData,"label-width":"102px",inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"商场",prop:"marketCode"}},[a("select-market",{attrs:{reqData:t.reqData}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"一级分类",prop:"rankId"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.reqData.rankId,callback:function(e){t.$set(t.reqData,"rankId",e)},expression:"reqData.rankId"}},t._l(t.categotyListFir,function(t,e){return a("el-option",{key:e,attrs:{label:t.rankName,value:t.rankId}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"协议签署时间",prop:"contractSignedTime"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd hh:mm:ss",placeholder:"选择日期"},model:{value:t.reqData.contractSignedTime,callback:function(e){t.$set(t.reqData,"contractSignedTime",e)},expression:"reqData.contractSignedTime"}})],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8,offset:16}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("查询")])],1)])],1)],1),t._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.itemList,align:"center",height:"500",stripe:""}},[a("el-table-column",{attrs:{align:"center",prop:"maintenanceId","min-width":"160",label:"审批编号"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"marketName",label:"审批类型"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"rankName",label:"审批状态"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"equipmentName",label:"详情"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"",label:"审核信息"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",{directives:[{name:"show",rawName:"v-show",value:t.rightControl("maintenance_contractInfo"),expression:"rightControl('maintenance_contractInfo')"}],staticClass:"u-check",on:{click:function(a){t.checkConstrck1(e.row)}}},[t._v("查看")])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime","min-width":"165",label:"创建时间"}})],1)],1),t._v(" "),a("pagenation",{attrs:{pageparams:t.pageparams,itemList:t.itemList},on:{handlePage:t.handlePage}}),t._v(" "),a("el-dialog",{staticClass:"s-dialog",attrs:{title:"维保合同-查看",visible:t.dialogFormVisible1,center:""},on:{"update:visible":function(e){t.dialogFormVisible1=e}}},[a("div",[t._l(t.fileList1,function(e,n){return a("el-row",{key:n},[a("el-col",{staticClass:"u-left",attrs:{span:19,xs:24}},[a("span",[t._v(t._s(e.name))]),t._v(" "),0==t.fileList1.length?a("span",[t._v("（无）")]):t._e()]),t._v(" "),a("el-col",{staticClass:"u-center",attrs:{span:5,xs:24}},[a("a",{on:{click:function(a){t.download_file(e.url,e.name)}}},[t._v("下载")])])],1)}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"btn-80",on:{click:function(e){t.dialogFormVisible1=!1}}},[t._v("关 闭")])],1)],2)]),t._v(" "),a("el-dialog",{staticClass:"s-dialog",attrs:{title:"维保附件-查看",visible:t.dialogFormVisible2,center:""},on:{"update:visible":function(e){t.dialogFormVisible2=e}}},[a("div",[t._l(t.fileList2,function(e,n){return a("el-row",{key:n},[a("el-col",{staticClass:"u-left",attrs:{span:19,xs:24}},[a("span",[t._v(t._s(e.name))]),t._v(" "),0==t.fileList2.length?a("span",[t._v("（无）")]):t._e()]),t._v(" "),a("el-col",{staticClass:"u-center",attrs:{span:5,xs:24}},[a("a",{on:{click:function(a){t.download_file(e.url,e.name)}}},[t._v("下载")])])],1)}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"btn-80",on:{click:function(e){t.dialogFormVisible2=!1}}},[t._v("关 闭")])],1)],2)])],1)},staticRenderFns:[]};var u=a("vSla")(d,m,!1,function(t){a("vZIT"),a("9CV3")},"data-v-18d29238",null);e.default=u.exports},vZIT:function(t,e){}});
//# sourceMappingURL=66.a61982f7a59a5d1a0954.js.map