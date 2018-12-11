webpackJsonp([40],{"3+iB":function(e,t){},"97ZU":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("woOf"),s=a.n(r),i=(a("TIfe"),a("9T2X")),o={data:function(){return{gTicket:"",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},marketList:[],typeList:[],show_input:!1,typeName:"",reqData:{time:[],marketCode:"",equipmentOwner:"",typeName:"",projectName:"",repairStartDate:"",repairEndDate:"",repairCost:"0.00",repairCompany:"",repairName:"",repairPhone:"",repairExplain:"",projectReport:[],checkRecord:[],comparisonRecord:[],scenePictures:[],repairContract:[],repairReceipt:[]},rules:{marketCode:[{required:!0,message:"请选择商场",trigger:"blur"}],equipmentOwner:[{required:!0,message:"请选择设备所属",trigger:"blur"}],typeName:[{required:!0,message:"请选择维护类别",trigger:"change"}],projectName:[{required:!0,message:"请输入工程项目",trigger:"blur"},{max:30,message:"工程项目不能多于30个字符",trigger:"blur"}],time:[{required:!0,message:"请选择施工时间",trigger:"blur"}],repairCost:[{required:!0,message:"请输入维护费用",trigger:"blur"},{pattern:/^\d+(\.\d{1,2})?$/,message:"请输入正确的金额(小数不可超过两位)",trigger:"blur"}],repairCompany:[{max:30,message:"施工方不能多于30个字符",trigger:"blur"}],repairName:[{max:20,message:"联系人不能多于20个字符",trigger:"blur"}],repairPhone:[{required:!1,trigger:"blur"},{pattern:/^1[34578]\d{9}$/,message:"请输入正确的手机号",trigger:"blur"}],repairExplain:[{max:120,message:"维修内容不能多于120个字符",trigger:"blur"}]},fileList:[],role:!1}},components:{selectMarket:a("LG0m").a},name:"editServiceRecord",computed:{currentUser:function(){return this.$store.state.currentUser}},methods:{getRepairInfo:function(){var e=this,t=i.a.repairList+"/"+this.$route.params.repairId;this.$http.get(t).then(function(t){t&&0==t.code&&(t.data.time=[],t.data.time.push(t.data.repairStartDate),t.data.time.push(t.data.repairEndDate),s()(e.reqData,t.data))})},getTypeList:function(){var e=this;this.$http.get(i.a.repairType).then(function(t){t&&0==t.code?e.typeList=t.data:e.typeList=[]})},judegRole:function(){2===this.currentUser.affiliation?(this.reqData.marketCode=this.currentUser.marketCode,this.role=!0):this.role=!1},getMarketList:function(){var e=this;this.$http.get(i.a.marketList).then(function(t){t&&0==t.code&&t.data?e.marketList=t.data:e.marketList=[]})},repairCost_valid:function(){this.reqData.repairCost&&isNaN(this.reqData.repairCost)&&(this.reqData.repairCost="0.00")},add_type:function(){this.show_input=!this.show_input,this.typeName=""},save_addType:function(){var e=this;this.typeName=this.typeName.replace(/(^\s*)|(\s*$)/g,""),this.typeName?this.$http.post(i.a.repairType,{typeName:this.typeName}).then(function(t){t&&0==t.code&&(e.$message({message:"保存成功",type:"success"}),e.show_input=!e.show_input,e.getTypeList())}):this.$message.error("请输入内容")},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.reqData.equipmentOwner="商场"==t.reqData.equipmentOwner?0:1;var a=s()({},t.reqData);a.repairStartDate=a.time?a.time[0]:"",a.repairEndDate=a.time?a.time[1]:"",delete a.time;var r=i.a.operate_repair+"/"+t.$route.params.repairId;t.$http.put(r,a).then(function(e){e&&0==e.code&&(t.$message({message:"保存成功",type:"success"}),t.$store.commit("delete_tabs",t.$route),t.$router.push("/estate/seviceRecord"))})})},submitUpload:function(){this.$refs.upload.submit()},upLoadPic:function(e){var t=this;return function(a,r,s){t.reqData[e].push(a.data)}},handleRemove:function(e){var t=this;return function(a,r,s){var i=t.reqData[e];i.forEach(function(e,t){i[t].url==a.url&&i.splice(t,1)})}},handlePreview:function(e){},marketData:function(e){this.reqData.marketCode=e}},mounted:function(){this.gTicket=this.$store.state.gTicket,this.judegRole(),this.getTypeList(),this.getMarketList(),this.getRepairInfo()}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contract-receipts add-service"},[a("el-form",{ref:"repaireForm",attrs:{model:e.reqData,rules:e.rules,"label-width":"140px","label-position":"right",inline:!0}},[a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"商场名称",prop:"marketCode"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择",disabled:e.role},model:{value:e.reqData.marketCode,callback:function(t){e.$set(e.reqData,"marketCode",t)},expression:"reqData.marketCode"}},e._l(e.marketList,function(e,t){return a("el-option",{key:t,attrs:{label:e.marketName,value:e.marketCode}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"设备所属",prop:"equipmentOwner"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.reqData.equipmentOwner,callback:function(t){e.$set(e.reqData,"equipmentOwner",t)},expression:"reqData.equipmentOwner"}},[a("el-option",{attrs:{label:"商场",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"商户",value:"1"}})],1)],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"维修类别",prop:"typeName"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.reqData.typeName,callback:function(t){e.$set(e.reqData,"typeName",t)},expression:"reqData.typeName"}},[e._l(e.typeList,function(e,t){return a("el-option",{key:t,attrs:{label:e,value:e}})}),e._v(" "),a("div",[e.show_input?a("el-input",{attrs:{placeholder:"请输入类别名称"},model:{value:e.typeName,callback:function(t){e.typeName=t},expression:"typeName"}}):e._e()],1),e._v(" "),a("div",{staticClass:"select_add"},[e.show_input?a("div",[a("span",{on:{click:e.save_addType}},[e._v("保存")]),e._v(" "),a("span",{staticClass:"cancel_btn",on:{click:e.add_type}},[e._v("取消")])]):a("div",[a("i",{staticClass:"el-icon-circle-plus-outline",on:{click:e.add_type}}),e._v(" "),a("span",{on:{click:e.add_type}},[e._v("添加")])])])],2)],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"工程项目",prop:"projectName"}},[a("el-input",{attrs:{clearable:"",placeholder:"项目报备名称"},model:{value:e.reqData.projectName,callback:function(t){e.$set(e.reqData,"projectName","string"==typeof t?t.trim():t)},expression:"reqData.projectName"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"施工时间",prop:"time"}},[a("el-date-picker",{attrs:{type:"daterange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"年/月/日","end-placeholder":"年/月/日",align:"right","value-format":"yyyy-MM-dd"},model:{value:e.reqData.time,callback:function(t){e.$set(e.reqData,"time",t)},expression:"reqData.time"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"维护费用",prop:"repairCost"}},[a("el-input",{attrs:{clearable:""},on:{blur:e.repairCost_valid},model:{value:e.reqData.repairCost,callback:function(t){e.$set(e.reqData,"repairCost","string"==typeof t?t.trim():t)},expression:"reqData.repairCost"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"施工方",prop:"repairCompany"}},[a("el-input",{attrs:{clearable:"",placeholder:"公司/个人"},model:{value:e.reqData.repairCompany,callback:function(t){e.$set(e.reqData,"repairCompany","string"==typeof t?t.trim():t)},expression:"reqData.repairCompany"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"联系人",prop:"repairName"}},[a("el-input",{attrs:{clearable:"",placeholder:"姓名"},model:{value:e.reqData.repairName,callback:function(t){e.$set(e.reqData,"repairName","string"==typeof t?t.trim():t)},expression:"reqData.repairName"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"联系方式",prop:"repairPhone"}},[a("el-input",{attrs:{clearable:"",placeholder:"手机号"},model:{value:e.reqData.repairPhone,callback:function(t){e.$set(e.reqData,"repairPhone","string"==typeof t?t.trim():t)},expression:"reqData.repairPhone"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:16}},[a("el-form-item",{staticClass:"otherInfo",attrs:{label:"维修内容",prop:"repairExplain"}},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:e.reqData.repairExplain,callback:function(t){e.$set(e.reqData,"repairExplain","string"==typeof t?t.trim():t)},expression:"reqData.repairExplain\t"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"立项报告",prop:"projectReport"}},[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:e.$http.defaults.baseURL+"/business/property/resource","on-preview":e.handlePreview,headers:{gTicket:e.gTicket},"on-remove":e.handleRemove("projectReport"),"file-list":e.reqData.projectReport,"on-success":e.upLoadPic("projectReport")}},[a("el-button",{staticClass:"btn-80 btn-upload",attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("浏 览")])],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"验收记录",prop:"checkRecord"}},[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:e.$http.defaults.baseURL+"/business/property/resource","on-preview":e.handlePreview,headers:{gTicket:e.gTicket},"on-remove":e.handleRemove("checkRecord"),"file-list":e.reqData.checkRecord,"on-success":e.upLoadPic("checkRecord")}},[a("el-button",{staticClass:"btn-80 btn-upload",attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("浏 览")])],1)],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"比价记录",prop:"comparisonRecord"}},[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:e.$http.defaults.baseURL+"/business/property/resource","on-preview":e.handlePreview,headers:{gTicket:e.gTicket},"on-remove":e.handleRemove("comparisonRecord"),"file-list":e.reqData.comparisonRecord,"on-success":e.upLoadPic("comparisonRecord")}},[a("el-button",{staticClass:"btn-80 btn-upload",attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("浏 览")])],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"现场照片",prop:"scenePictures"}},[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:e.$http.defaults.baseURL+"/business/property/resource","on-preview":e.handlePreview,headers:{gTicket:e.gTicket},"on-remove":e.handleRemove("scenePictures"),"file-list":e.reqData.scenePictures,"on-success":e.upLoadPic("scenePictures")}},[a("el-button",{staticClass:"btn-80 btn-upload",attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("浏 览")])],1)],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"合同",prop:"repairContract"}},[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:e.$http.defaults.baseURL+"/business/property/resource","on-preview":e.handlePreview,headers:{gTicket:e.gTicket},"on-remove":e.handleRemove("repairContract"),"file-list":e.reqData.repairContract,"on-success":e.upLoadPic("repairContract")}},[a("el-button",{staticClass:"btn-80 btn-upload",attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("浏 览")])],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"收据",prop:"repairReceipt"}},[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:e.$http.defaults.baseURL+"/business/property/resource","on-preview":e.handlePreview,headers:{gTicket:e.gTicket},"on-remove":e.handleRemove("repairReceipt"),"file-list":e.reqData.repairReceipt,"on-success":e.upLoadPic("repairReceipt")}},[a("el-button",{staticClass:"btn-80 btn-upload",attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[e._v("浏 览")])],1)],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:16}},[a("div",{staticClass:"save-div"},[a("el-button",{staticClass:"btn-save-big",on:{click:function(t){e.submitForm("repaireForm")}}},[e._v("提 交\n          ")])],1)])],1)],1)],1)},staticRenderFns:[]};var p=a("VU/8")(o,l,!1,function(e){a("3+iB"),a("NiBo")},"data-v-5eecc3aa",null);t.default=p.exports},NiBo:function(e,t){}});
//# sourceMappingURL=40.856515f6086e3190b998.js.map