webpackJsonp([81],{D0N5:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("woOf"),o=a.n(i),n=a("bOdI"),s=a.n(n),r=a("9T2X"),l=a("FTcF"),d=a("hm3b"),c={data:function(){return{pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},pageparams:{},reqData:{marketCode:"",currentPage:1,pageSize:20},itemList:[],dialog_title:"巡检点-添加",marketList:[],point_add_dialog:!1,formLabelWidth:"100px",marketCode:"",point_add_form:{marketCode:"",pointLocation:"",pointName:"",serialNumber:""},point_add_rules:{marketCode:[{required:!0,message:"请输入活动名称",trigger:"blur"}],pointLocation:[{required:!0,message:"请输入巡检点位置",trigger:"blur"},{max:50,message:"长度应小于50",trigger:"blur"}],pointName:[{required:!1,trigger:"blur"},{max:20,message:"长度应小于20",trigger:"blur"}],serialNumber:[{required:!1,trigger:"blur"},{max:30,message:"长度应小于30",trigger:"blur"}]},edit_point_id:"",set_point_id:"",point_set_dialog:!1,setting_list:[],estate_company:[],estate_staff:[],role:!1}},computed:{currentUser:function(){return this.$store.state.currentUser}},components:{selectMarket:l.a,pagenation:d.a},name:"inspectionPoint",methods:{download_code:function(t,e){var a,i=this,o={fileUrl:e.pictureUrl};this.$http((a={method:"get",url:"/business/download",showLoading:!1,params:o},s()(a,"showLoading",!1),s()(a,"responseType","arraybuffer"),a)).then(function(t){i.download(t.data)})},download:function(t){if(t){var e=new Blob([t]);if(window.navigator&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(e,"二维码.jpg");else{var a=window.URL.createObjectURL(e),i=document.createElement("a");i.style.display="none",i.href=a,i.setAttribute("download","二维码.jpg"),document.body.appendChild(i),i.click()}}},judegRole:function(){2===this.currentUser.affiliation?(this.marketCode=this.currentUser.marketCode,this.point_add_form.marketCode=this.currentUser.marketCode,this.role=!0):this.role=!1},getMarketList:function(){var t=this;this.$http.get(r.a.marketList).then(function(e){e&&0==e.code&&e.data?t.marketList=e.data:t.marketList=[]})},getListData:function(){var t=this;this.$http.get(r.a.pointList,{params:this.reqData}).then(function(e){e&&0==e.code&&e.data?(t.itemList=e.data,t.pageparams=e.page):t.itemList=[]})},search:function(){this.reqData.currentPage=1,this.getListData()},handlePage:function(t){this.reqData.currentPage=t,this.getListData()},clean_data:function(){o()(this.point_add_form,this.$options.data().point_add_form),this.point_add_form.marketCode=this.marketCode},point_add:function(){this.dialog_title="巡检点—添加",this.point_add_dialog=!0,this.point_add_form.pointName=""},point_edit:function(t,e){this.dialog_title="巡检点—修改",this.point_add_dialog=!0,this.point_add_form={marketCode:e.marketCode,pointLocation:e.pointLocation,pointName:e.pointName,serialNumber:e.serialNumber},this.edit_point_id=e.pointId},save_add:function(){var t=this;this.$refs.point_add_form.validate(function(e){if(e)if("巡检点—添加"==t.dialog_title)t.$http.post(r.a.addPoint,t.point_add_form).then(function(e){e&&0==e.code&&(t.point_add_dialog=!1,t.getListData(),t.$refs.point_add_form.resetFields())});else{var a=r.a.addPoint+"/"+t.edit_point_id;t.$http.put(a,t.point_add_form).then(function(e){e&&0==e.code&&(t.edit_point_id="",t.point_add_dialog=!1,t.getListData(),t.$refs.point_add_form.resetFields())})}})},point_set:function(t,e){this.set_point_id=e.pointId,this.point_set_dialog=!0,this.setPointList(this.set_point_id),this.companyData(e.marketCode)},setPointList:function(t){var e=this,a=r.a.pointSet+"/"+t;this.$http.get(a).then(function(t){t&&0==t.code&&(t.data?(t.data.map(function(t){t.edit=!1}),e.setting_list=t.data):e.setting_list=[])})},companyData:function(t){var e=this,a=r.a.company+"/"+t;this.$http.get(a).then(function(t){t&&0==t.code&&(e.estate_company=t.data)})},getstaff:function(t){var e=this,a=r.a.staff+"/"+t;this.$http.get(a).then(function(t){t&&0==t.code&&(e.estate_staff=t.data)})},add_config:function(){var t={checkInterval:"",checkNumber:"",companyName:"",pointId:this.set_point_id,staffName:"",edit:!0};this.setting_list.push(t)},confirmEdit:function(t){var e=this,a={checkInterval:t.checkInterval,checkNumber:t.checkNumber,companyId:t.companyId,pointId:t.pointId,staffId:t.staffId};if(t.configId){var i=r.a.addPointSet+"/"+t.configId;this.$http.put(i,a).then(function(a){a&&0==a.code&&(t.edit=!1,e.setPointList(e.set_point_id))})}else this.$http.post(r.a.addPointSet,a).then(function(a){a&&0==a.code&&(t.edit=!1,e.setPointList(e.set_point_id))})},delete_config:function(t,e){var a=this;if(t.configId){var i=r.a.addPointSet+"/"+t.configId;this.$http.delete(i).then(function(t){t&&0==t.code&&a.setPointList(a.set_point_id)})}else this.setting_list.splice(e,1)},add_marketData:function(t){this.point_add_form.marketCode=t}},created:function(){this.judegRole(),this.getMarketList(),this.getListData()}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contract-receipts"},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{model:t.reqData,"label-width":"102px",inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:12,xs:24}},[a("el-form-item",{attrs:{label:"商场",prop:"marketCode"}},[a("select-market",{attrs:{reqData:t.reqData}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12,xs:24}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("查询")])],1)])],1)],1),t._v(" "),a("div",[a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.$store.getters.getPermission("inspectionPoint_2"),expression:"$store.getters.getPermission('inspectionPoint_2')"}],staticClass:"btn-search btn-add",attrs:{type:"primary"},on:{click:t.point_add}},[t._v("添加巡检点")])],1),t._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.itemList,align:"center",stripe:"",height:"500"}},[a("el-table-column",{attrs:{align:"center",prop:"pointId",label:"序号","min-width":"160"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"marketName",label:"所属商场"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"serialNumber",label:"巡检点编号","min-width":"105"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"pointName",label:"巡检点名称","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"pointLocation",label:"所处位置","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createName",label:"登记人"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime",label:"登记时间","min-width":"165"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"巡检配置"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{staticClass:"special_link",attrs:{disabled:!t.$store.getters.getPermission("inspectionPoint_4")},on:{click:function(a){t.point_set(e.$index,e.row)}}},[t._v("\n            配置\n          ")])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作","min-width":"200",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{staticClass:"special_link download_link",attrs:{disabled:!t.$store.getters.getPermission("inspectionPoint_5")},on:{click:function(a){t.download_code(e.$index,e.row)}}},[t._v("\n            下载二维码\n          ")]),t._v(" "),a("el-button",{staticClass:"btn-handle",attrs:{type:"primary",disabled:!t.$store.getters.getPermission("inspectionPoint_3")},on:{click:function(a){t.point_edit(e.$index,e.row)}}},[t._v("\n            修改\n          ")])]}}])})],1)],1),t._v(" "),a("div",{staticClass:"pagination-box"},[a("pagenation",{attrs:{pageparams:t.pageparams,itemList:t.itemList},on:{handlePage:t.handlePage}})],1),t._v(" "),a("el-dialog",{staticClass:"s-dialog",attrs:{title:t.dialog_title,visible:t.point_add_dialog},on:{"update:visible":function(e){t.point_add_dialog=e},close:t.clean_data}},[a("el-form",{ref:"point_add_form",attrs:{model:t.point_add_form,rules:t.point_add_rules}},[a("el-form-item",{attrs:{label:"所属商场","label-width":t.formLabelWidth,prop:"marketCode"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择",disabled:t.role},model:{value:t.point_add_form.marketCode,callback:function(e){t.$set(t.point_add_form,"marketCode",e)},expression:"point_add_form.marketCode"}},t._l(t.marketList,function(t,e){return a("el-option",{key:e,attrs:{label:t.marketName,value:t.marketCode}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"巡检点编号","label-width":t.formLabelWidth,prop:"serialNumber"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.point_add_form.serialNumber,callback:function(e){t.$set(t.point_add_form,"serialNumber","string"==typeof e?e.trim():e)},expression:"point_add_form.serialNumber"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"巡检点名称","label-width":t.formLabelWidth,prop:"pointName"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.point_add_form.pointName,callback:function(e){t.$set(t.point_add_form,"pointName","string"==typeof e?e.trim():e)},expression:"point_add_form.pointName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"所处位置","label-width":t.formLabelWidth,prop:"pointLocation"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.point_add_form.pointLocation,callback:function(e){t.$set(t.point_add_form,"pointLocation","string"==typeof e?e.trim():e)},expression:"point_add_form.pointLocation"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"btn-save",attrs:{type:"primary"},on:{click:t.save_add}},[t._v("保 存")]),t._v(" "),a("el-button",{staticClass:"btn-reset",on:{click:function(e){t.point_add_dialog=!1}}},[t._v("取 消")])],1)],1),t._v(" "),a("el-dialog",{staticClass:"l-dialog",attrs:{title:"巡检点-配置",visible:t.point_set_dialog},on:{"update:visible":function(e){t.point_set_dialog=e}}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.setting_list,fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"序号",type:"index"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"物业公司"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.edit?[a("el-select",{attrs:{placeholder:""},on:{change:function(a){t.getstaff(e.row.companyId)}},model:{value:e.row.companyId,callback:function(a){t.$set(e.row,"companyId",a)},expression:"scope.row.companyId"}},t._l(t.estate_company,function(t,e){return a("el-option",{key:e,attrs:{label:t.companyName,value:t.companyId}})}))]:a("span",[t._v(t._s(e.row.companyName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"物业人员"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.edit?[a("el-select",{attrs:{placeholder:"",clearable:""},model:{value:e.row.staffId,callback:function(a){t.$set(e.row,"staffId",a)},expression:"scope.row.staffId"}},t._l(t.estate_staff,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.staffId}})}))]:a("span",[t._v(t._s(e.row.staffName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"巡检次数/日"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.edit?[a("el-input",{staticClass:"edit-input",attrs:{type:"number",size:"small"},model:{value:e.row.checkNumber,callback:function(a){t.$set(e.row,"checkNumber",t._n(a))},expression:"scope.row.checkNumber"}})]:a("span",[t._v(t._s(e.row.checkNumber))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"最小巡检时间间隔(h)"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.edit?[a("el-input",{staticClass:"edit-input",attrs:{type:"number",size:"small",precision:"2"},model:{value:e.row.checkInterval,callback:function(a){t.$set(e.row,"checkInterval",t._n(a))},expression:"scope.row.checkInterval"}})]:a("span",[t._v(t._s(e.row.checkInterval))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作","min-width":"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.edit?a("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-circle-check-outline"},on:{click:function(a){t.confirmEdit(e.row)}}},[t._v("保存")]):a("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-edit"},on:{click:function(t){e.row.edit=!e.row.edit}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-edit"},on:{click:function(a){t.delete_config(e.row,e.$index)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"btn-save",attrs:{type:"primary"},on:{click:t.add_config}},[t._v("添 加")]),t._v(" "),a("el-button",{staticClass:"btn-reset",on:{click:function(e){t.point_set_dialog=!1}}},[t._v("关 闭")])],1)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(c,p,!1,function(t){a("uw9a")},"data-v-4293107e",null);e.default=m.exports},uw9a:function(t,e){}});
//# sourceMappingURL=81.2725a9f660a024aaba24.js.map