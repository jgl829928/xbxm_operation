webpackJsonp([31],{FipV:function(e,t){},Xlwz:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("4YfN"),s=a.n(r),l=(a("eMGh"),a("2A+d")),o=a("TIfe"),i={name:"addCompany",data:function(){return{dialogFormVisibleFir:!1,reqData:{companyAddress:"",companyId:"",serveId:"",marketCode:"",signedSubject:"",taskNumber:"",contacts:"",contractSignedTime:"",totalPeople:"",companyCell:"",ratesStandard:"",companyName:"",time:[]},rules:{companyName:[{required:!0,message:"请输入公司名称",trigger:"blur"},{max:50,message:"最多输入50个字",trigger:"blur"}],ratesStandard:[{validator:function(e,t,a){var r=Number(t);""==t?a(new Error("请输入收费标准")):r<=0?a(new Error("收费标准必须大于0")):/^\d+(\.\d{1,2})?$/.test(t)?a():a(new Error("请输入正确的金额格式(小数两位)"))},trigger:"blur"},{required:!0,message:"请填写收费标准",trigger:"blur"}],totalPeople:[{validator:function(e,t,a){var r=Number(t);""==t?a(new Error("请输入人数")):r<=0?a(new Error("人数必须大于0")):/^\d+$/.test(t)?a():a(new Error("请输入整数"))},trigger:"blur"},{required:!0,message:"请输入人数",trigger:"blur"}],serveId:[{required:!0,message:"请选择服务范围",trigger:"change"}],marketCode:[{required:!0,message:"请选择商场",trigger:"change"}],taskNumber:[{max:50,message:"最多输入50个字",trigger:"blur"}],companyAddress:[{max:50,message:"最多输入50个字",trigger:"blur"}],contacts:[{max:20,message:"最多输入20个字",trigger:"blur"}],companyCell:[{max:20,message:"最多输入20个字",trigger:"blur"},{pattern:/^1[34578]\d{9}$/,message:"目前只支持中国大陆的手机号码",trigger:"blur"}],signedSubject:[{max:20,message:"最多输入20个字",trigger:"blur"}]},dialogRules:{serveName:[{required:!0,message:"请输入服务范围",trigger:"blue"}]},form:{serveName:""},service:[],fileList:[],uploadUrl:l.a.imageUpload,marketSearch:[],checkEdit:"",role:!1}},components:{selectMarket:a("FTcF").a},created:function(){this.getService()},computed:{gTicket:function(){return this.$store.state.gTicket}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;console.log(t.reqData);var a=Object(o.d)(t.reqData,!0,["time"]),r=[];0!=t.fileList.length&&t.fileList.forEach(function(e){var t={};t.name=e.name,t.url=e.url,-1==r.indexOf(e)&&r.push(t)});var l=void 0,i=void 0;null!=t.reqData.time?(l=t.reqData.time[0],i=t.reqData.time[1]):(l="",i="");var n=s()({},a,{imgUrl:r,contractBeginTime:l,contractEndTime:i});t.handleSave("post",n)})},handleSave:function(e,t){var a=this;this.$http({url:l.a.company,method:e,data:t}).then(function(e){e&&(a.$message.success(e.msg),a.$router.push({name:"company"}),a.$store.commit("delete_tabs",a.$route))})},reset:function(e){var t=this;this.dialogFormVisibleFir=!1,this.$refs[e].resetFields(),this.$nextTick(function(){t.$refs[e].clearValidate()})},getService:function(){var e=this;this.$http.get(l.a.serveRange).then(function(t){t&&0==t.code&&(e.service=t.data)})},handleRemove:function(e,t){this.fileList=t},handleList:function(e,t,a){e&&0==e.code&&e.data&&this.fileList.push(e.data)},handleExceed:function(e,t){this.$message.warning("当前限制选择 3 个文件，本次选择了 "+e.length+" 个文件，共选择了 "+(e.length+t.length)+" 个文件")},beforeRemove:function(e,t){return this.$confirm("确定移除 "+e.name+"？")},beforeLogoUpload:function(e){var t="image/jpeg"===e.type||"image/png",a=e.size/1024/1024<5;return t||this.$message.error("上传图片只能是 jpg、png、jpeg、bmp格式!"),a||this.$message.error("上传图片大小不能超过5MB!"),t&&a},firCategoryAdd:function(e){var t=this;this.$refs[e].validate(function(e){e&&t.$http.post(l.a.serveRange,s()({},t.form)).then(function(e){if(e){if(0!=e.code)return t.$message.error(e.msg);t.$message.success(e.msg),t.getService(),t.dialogFormVisibleFir=!1}})})}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"g-add-company"},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{model:e.reqData,rules:e.rules,"label-width":"110px","label-position":"right",inline:!0}},[a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:11,xs:24}},[a("el-form-item",{attrs:{label:"所属商场",prop:"marketCode"}},[a("select-market",{attrs:{reqData:e.reqData}})],1)],1),e._v(" "),a("el-col",{staticClass:"u-left",attrs:{span:12}},[a("el-form-item",{attrs:{label:"服务范围",prop:"serveId"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.reqData.serveId,callback:function(t){e.$set(e.reqData,"serveId",t)},expression:"reqData.serveId"}},e._l(e.service,function(e,t){return a("el-option",{key:t,attrs:{label:e.serveName,value:e.serveId}})}))],1),e._v(" "),a("el-button",{staticClass:"btn-handle",on:{click:function(t){e.dialogFormVisibleFir=!0}}},[e._v("添加")])],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("p",{staticClass:"u-orange-title"},[e._v("公司信息")])]),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:11,xs:24}},[a("el-form-item",{attrs:{label:"公司名称",prop:"companyName"}},[a("el-input",{attrs:{clearable:""},model:{value:e.reqData.companyName,callback:function(t){e.$set(e.reqData,"companyName","string"==typeof t?t.trim():t)},expression:"reqData.companyName"}})],1)],1),e._v(" "),a("el-col",{staticClass:"u-left",attrs:{span:11}},[a("el-form-item",{attrs:{label:"税务编号",prop:"taskNumber"}},[a("el-input",{attrs:{clearable:""},model:{value:e.reqData.taskNumber,callback:function(t){e.$set(e.reqData,"taskNumber","string"==typeof t?t.trim():t)},expression:"reqData.taskNumber"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:11,xs:24}},[a("el-form-item",{attrs:{label:"公司地址",prop:"companyAddress"}},[a("el-input",{attrs:{clearable:""},model:{value:e.reqData.companyAddress,callback:function(t){e.$set(e.reqData,"companyAddress","string"==typeof t?t.trim():t)},expression:"reqData.companyAddress"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:11,xs:24}},[a("el-form-item",{attrs:{label:"联系人",prop:"contacts"}},[a("el-input",{attrs:{clearable:""},model:{value:e.reqData.contacts,callback:function(t){e.$set(e.reqData,"contacts","string"==typeof t?t.trim():t)},expression:"reqData.contacts"}})],1)],1),e._v(" "),a("el-col",{staticClass:"u-left",attrs:{span:11}},[a("el-form-item",{attrs:{label:"联系方式",prop:"companyCell"}},[a("el-input",{attrs:{clearable:""},model:{value:e.reqData.companyCell,callback:function(t){e.$set(e.reqData,"companyCell","string"==typeof t?t.trim():t)},expression:"reqData.companyCell"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("p",{staticClass:"u-orange-title"},[e._v("合作信息")])]),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:11}},[a("el-form-item",{staticClass:"u-input-250",attrs:{label:"收费标准",prop:"ratesStandard"}},[a("el-input",{attrs:{clearable:"",placeholder:"0.00"},model:{value:e.reqData.ratesStandard,callback:function(t){e.$set(e.reqData,"ratesStandard","string"==typeof t?t.trim():t)},expression:"reqData.ratesStandard"}})],1),e._v(" "),a("span",{staticClass:"u-lh"},[e._v("/人*月")])],1),e._v(" "),a("el-col",{staticClass:"u-input-260",attrs:{span:12}},[a("el-form-item",{attrs:{label:"人事编制",prop:"totalPeople"}},[a("el-input",{attrs:{clearable:"",placeholder:"0"},model:{value:e.reqData.totalPeople,callback:function(t){e.$set(e.reqData,"totalPeople","string"==typeof t?t.trim():t)},expression:"reqData.totalPeople"}})],1),e._v(" "),a("span",{staticClass:"u-lh"},[e._v("/人")])],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:11,xs:24}},[a("el-form-item",{attrs:{label:"协议签署时间",prop:"contractSignedTime"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.reqData.contractSignedTime,callback:function(t){e.$set(e.reqData,"contractSignedTime",t)},expression:"reqData.contractSignedTime"}})],1)],1),e._v(" "),a("el-col",{staticClass:"u-left",attrs:{span:11}},[a("el-form-item",{attrs:{label:"签署主体",prop:"signedSubject"}},[a("el-input",{attrs:{clearable:""},model:{value:e.reqData.signedSubject,callback:function(t){e.$set(e.reqData,"signedSubject","string"==typeof t?t.trim():t)},expression:"reqData.signedSubject"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:11}},[a("el-form-item",{attrs:{label:"合同起止时间",prop:"time"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd",align:"right"},model:{value:e.reqData.time,callback:function(t){e.$set(e.reqData,"time",t)},expression:"reqData.time"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:11,xs:24}},[a("el-form-item",{attrs:{label:"协议附件\n",prop:"skuCode"}},[a("el-upload",{staticClass:"upload-demo",attrs:{action:e.$http.defaults.baseURL+e.uploadUrl,"before-remove":e.beforeRemove,multiple:"",limit:10,headers:{gTicket:e.gTicket},"on-exceed":e.handleExceed,"file-list":e.fileList,"on-success":e.handleList,"before-upload":e.beforeLogoUpload,"on-remove":e.handleRemove}},[a("el-button",{staticClass:"btn-80 btn-upload",attrs:{size:"small",type:"primary"}},[e._v("浏览")])],1)],1)],1)],1),e._v(" "),a("el-row",{staticClass:"u-button",attrs:{gutter:32}},[a("el-col",{attrs:{span:8,offset:16}},[a("el-button",{staticClass:"btn-save-big",attrs:{type:"primary"},on:{click:function(t){e.submitForm("reqData")}}},[e._v("保存")])],1)],1)],1),e._v(" "),a("el-dialog",{staticClass:"s-dialog",attrs:{title:"添加",visible:e.dialogFormVisibleFir},on:{"update:visible":function(t){e.dialogFormVisibleFir=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.dialogRules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"名称",prop:"serveName"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.serveName,callback:function(t){e.$set(e.form,"serveName","string"==typeof t?t.trim():t)},expression:"form.serveName"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"btn-reset",on:{click:function(t){e.reset("form")}}},[e._v("取 消")]),e._v(" "),a("el-button",{staticClass:"btn-save",attrs:{type:"primary"},on:{click:function(t){e.firCategoryAdd("form")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var c=a("vSla")(i,n,!1,function(e){a("m5rD"),a("FipV")},"data-v-689327d7",null);t.default=c.exports},m5rD:function(e,t){}});
//# sourceMappingURL=31.7dafb1aa476737913ed7.js.map