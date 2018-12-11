webpackJsonp([35],{WS3n:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("9T2X"),s=a("FTcF"),i=a("hm3b"),n={data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},pageparams:{},time:[],reqData:{marketCode:"",currentPage:1,pageSize:20,startTime:"",endTime:""},itemList:[],dialogFormVisible:!1,accessory_msg:{projectReport:[],checkRecord:[],comparisonRecord:[],scenePictures:[],repairContract:[],repairReceipt:[]},imgDialog:!1,bigImageUrl:""}},components:{selectMarket:s.a,pagenation:i.a},name:"seviceRecord",methods:{open_img:function(e){this.imgDialog=!0,this.bigImageUrl=e},getListData:function(){var e=this;this.$http.get(r.a.repairList,{params:this.reqData}).then(function(t){t&&0==t.code&&t.data?(e.itemList=t.data,e.pageparams=t.page):e.itemList=[]})},search:function(){this.reqData.currentPage=1,this.reqData.startTime=this.time?this.time[0]:"",this.reqData.endTime=this.time?this.time[1]:"",this.getListData()},check_accessory:function(e,t){this.dialogFormVisible=!0,this.accessory_msg={projectReport:t.projectReport,checkRecord:t.checkRecord,comparisonRecord:t.comparisonRecord,scenePictures:t.scenePictures,repairContract:t.repairContract,repairReceipt:t.repairReceipt}},add_record:function(){this.$router.push("/estate/seviceRecord/addServiceRecord")},delete_record:function(e,t){var a=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e=r.a.operate_repair+"/"+t.repairId;a.$http.delete(e).then(function(e){e&&0==e.code&&(a.$message({message:"删除成功",type:"success"}),a.getListData())})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},handlePage:function(e){this.reqData.currentPage=e,this.getListData()},download_file:function(e,t){var a=this;this.$http({method:"get",url:"/business/download",showLoading:!1,params:{fileUrl:e},responseType:"arraybuffer"}).then(function(e){a.download(e.data,t)})},download:function(e,t){if(e){var a=new Blob([e]);if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(a,t);else{var r=window.URL.createObjectURL(new Blob([e])),s=document.createElement("a");s.style.display="none",s.href=r,s.setAttribute("download",t),document.body.appendChild(s),s.click()}}}},created:function(){this.getListData()}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contract-receipts"},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{model:e.reqData,"label-width":"102px",inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"商场",prop:"marketCode"}},[a("select-market",{attrs:{reqData:e.reqData}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{staticClass:"search_time",attrs:{label:"操作时间",prop:"itemName"}},[a("el-date-picker",{attrs:{type:"daterange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"年/月/日","default-time":["00:00:00","23:59:59"],"end-placeholder":"年/月/日",align:"right","value-format":"yyyy-MM-dd"},model:{value:e.time,callback:function(t){e.time=t},expression:"time"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.search}},[e._v("查询")])],1)])],1)],1),e._v(" "),a("div",[a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.$store.getters.getPermission("seviceRecord_2"),expression:"$store.getters.getPermission('seviceRecord_2')"}],staticClass:"btn-search btn-add",attrs:{type:"primary"},on:{click:e.add_record}},[e._v("\n      维修登记\n    ")])],1),e._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.itemList,align:"center",stripe:"",height:"500"}},[a("el-table-column",{attrs:{align:"center",prop:"repairId",label:"序号","min-width":"160"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"marketName",label:"商场"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"typeName",label:"维护类别"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"equipmentOwner",label:"设备所属"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"projectName",label:"项目名称","min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"supplier",label:"施工日期","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",[e._v(e._s(t.row.repairStartDate)+"至"+e._s(t.row.repairEndDate))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"repairCost",label:"结算金额"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"repairCompany",label:"施工方"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"repairName",label:"联系人"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"repairPhone",label:"联系方式","min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"repairExplain",label:"说明","min-width":"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",{staticClass:"overflow_text",attrs:{title:t.row.repairExplain}},[e._v(e._s(t.row.repairExplain))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"money",label:"附件"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a",{on:{click:function(a){e.check_accessory(t.$index,t.row)}}},[e._v("查看")])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createName",label:"登记人"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime",label:"登记时间","min-width":"165"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作","min-width":"200",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"btn-handle",attrs:{type:"primary",disabled:!e.$store.getters.getPermission("seviceRecord_3")}},[a("router-link",{attrs:{to:{name:"editServiceRecord",params:{repairId:t.row.repairId}}}},[e._v("\n              修改\n            ")])],1),e._v(" "),a("el-button",{staticClass:"btn-handle btn-add",attrs:{type:"primary",disabled:!e.$store.getters.getPermission("seviceRecord_4")},on:{click:function(a){e.delete_record(t.$index,t.row)}}},[e._v("\n            删除\n          ")])]}}])})],1)],1),e._v(" "),a("div",{staticClass:"pagination-box"},[a("pagenation",{attrs:{pageparams:e.pageparams,itemList:e.itemList},on:{handlePage:e.handlePage}})],1),e._v(" "),a("el-dialog",{staticClass:"l-dialog accessory_dialog",attrs:{title:"附件-查看",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("div",{staticClass:"m-accessoryInfo"},[a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:8,xs:24}},[a("label",[e._v("立项报告")])]),e._v(" "),a("el-col",{attrs:{span:16,xs:24}},e._l(e.accessory_msg.projectReport,function(t,r){return e.accessory_msg.projectReport?a("ul",{key:r,staticClass:"accessory_item"},[a("li",[a("span",[e._v(e._s(t.name))]),e._v(" "),a("a",{on:{click:function(a){e.download_file(t.url,t.name)}}},[e._v("下载")])])]):a("span",[e._v(" （无）")])}))],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:8,xs:24}},[a("label",[e._v("验收记录")])]),e._v(" "),a("el-col",{attrs:{span:16,xs:24}},e._l(e.accessory_msg.checkRecord,function(t,r){return e.accessory_msg.checkRecord?a("ul",{key:r,staticClass:"accessory_item"},[a("li",[a("span",[e._v(e._s(t.name))]),e._v(" "),a("a",{on:{click:function(a){e.download_file(t.url,t.name)}}},[e._v("下载")])])]):a("span",[e._v(" （无）")])}))],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:8,xs:24}},[a("label",[e._v("比价记录")])]),e._v(" "),a("el-col",{attrs:{span:16,xs:24}},e._l(e.accessory_msg.comparisonRecord,function(t,r){return e.accessory_msg.comparisonRecord?a("ul",{key:r,staticClass:"accessory_item"},[a("li",[a("span",[e._v(e._s(t.name))]),e._v(" "),a("a",{on:{click:function(a){e.download_file(t.url,t.name)}}},[e._v("下载")])])]):a("span",[e._v(" （无）")])}))],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:8,xs:24}},[a("label",[e._v("现场照片")])]),e._v(" "),a("el-col",{attrs:{span:16,xs:24}},e._l(e.accessory_msg.scenePictures,function(t,r){return e.accessory_msg.scenePictures?a("div",{key:r,staticClass:"img_box"},[a("img",{attrs:{src:t.url,alt:""},on:{click:function(a){e.open_img(t.url)}}})]):a("span",[e._v(" （无）")])}))],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:8,xs:24}},[a("label",[e._v("合同")])]),e._v(" "),a("el-col",{attrs:{span:16,xs:24}},e._l(e.accessory_msg.repairContract,function(t,r){return e.accessory_msg.repairContract?a("ul",{key:r,staticClass:"accessory_item"},[a("li",[a("span",[e._v(e._s(t.name))]),e._v(" "),a("a",{on:{click:function(a){e.download_file(t.url,t.name)}}},[e._v("下载")])])]):a("span",[e._v(" （无）")])}))],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:8,xs:24}},[a("label",[e._v("收据")])]),e._v(" "),a("el-col",{attrs:{span:16,xs:24}},e._l(e.accessory_msg.repairReceipt,function(t,r){return e.accessory_msg.repairReceipt?a("ul",{key:r,staticClass:"accessory_item"},[a("li",[a("span",[e._v(e._s(t.name))]),e._v(" "),a("a",{on:{click:function(a){e.download_file(t.url,t.name)}}},[e._v("下载")])])]):a("span",[e._v(" （无）")])}))],1)],1)]),e._v(" "),a("el-dialog",{staticClass:"l-dialog bigImgDialog",attrs:{title:"附件-查看",visible:e.imgDialog},on:{"update:visible":function(t){e.imgDialog=t}}},[a("img",{attrs:{src:e.bigImageUrl,alt:""}})])],1)},staticRenderFns:[]};var l=a("VU/8")(n,o,!1,function(e){a("vFKw"),a("tbXm")},"data-v-6e684b7d",null);t.default=l.exports},tbXm:function(e,t){},vFKw:function(e,t){}});
//# sourceMappingURL=35.7d0991edd502ca83bdb5.js.map