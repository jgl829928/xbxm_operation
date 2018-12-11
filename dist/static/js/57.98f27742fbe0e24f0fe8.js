webpackJsonp([57],{"1CCU":function(e,t){},ACTT:function(e,t){},Gr9z:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Dd8w"),s=a.n(r),l=(a("eMGh"),a("2A+d")),n=a("TIfe"),i={name:"editStaff",data:function(){return{companyList:[],marketSearch:[],reqData:{cellPhone:"",companyId:"",dimissionTime:"",entryTime:"",identityCard:"",marketCode:"",name:"",permanentAddress:"",sex:"",staffId:""},checkEdit:!0,sexList:[{label:"男",value:!0},{label:"女",value:!1}],rules:{name:[{required:!0,message:"请输入员工姓名",trigger:"blur"},{max:20,message:"请输入字数不超过20字",trigger:"blur"}],cellPhone:[{required:!0,message:"请输入手机号",trigger:"blur"},{pattern:/^1[34578]\d{9}$/,message:"目前只支持中国大陆的手机号码",trigger:"blur"}],sex:[{required:!0,message:"请选择性别",trigger:"change"}],marketCode:[{required:!0,message:"请选择商场",trigger:"change"}],companyId:[{required:!0,message:"请选择所属公司",trigger:"change"}],identityCard:[{pattern:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,message:"请输入正确的身份证号",trigger:"blur"}],permanentAddress:[{max:50,message:"请输入字数不超过50字",trigger:"blur"}]},role:!1}},components:{selectMarket:a("FTcF").a},watch:{reqData:{handler:function(e,t){""==e.marketCode&&(e.companyId=""),this.getCompanyList(e.marketCode)},deep:!0}},created:function(){this.getEditData(this.$route.params.staffId)},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var a=t.reqData,r=s()({},a);t.reqData.entryTime>t.reqData.dimissionTime?t.$message.error("入职时间不能晚于离职时间"):t.handleSave("put",r)})},handleSave:function(e,t){var a=this;this.$http({url:l.a.staff,method:e,data:t}).then(function(e){e&&(a.$message.success(e.msg),a.$router.push({name:"staff"}),a.$store.commit("delete_tabs",a.$route))})},getEditData:function(e){var t=this;this.$http.get(l.a.staff,{params:{staffId:e}}).then(function(e){e&&e.data&&(t.getCompanyList(e.data.marketCode),setTimeout(function(){t.reqData=Object(n.d)(e.data[0],!0,["marketName","serveName","createUser","createName","createTime"])},20))})},getCompanyList:function(e){var t=this;this.$http({url:l.a.companyList,params:{marketCode:e},method:"get",showLoading:!1}).then(function(e){e&&0==e.code&&e.data&&(t.companyList=e.data)})}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"g-add-staff"},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{model:e.reqData,rules:e.rules,"label-width":"80px","label-position":"right",inline:!0}},[a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"所属商场",prop:"marketCode"}},[a("select-market",{attrs:{reqData:e.reqData,checkMarket:e.checkEdit}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"物业公司",prop:"companyId"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.reqData.companyId,callback:function(t){e.$set(e.reqData,"companyId",t)},expression:"reqData.companyId"}},e._l(e.companyList,function(e,t){return a("el-option",{key:t,attrs:{label:e.companyName,value:e.companyId}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"员工姓名",prop:"name"}},[a("el-input",{attrs:{clearable:""},model:{value:e.reqData.name,callback:function(t){e.$set(e.reqData,"name","string"==typeof t?t.trim():t)},expression:"reqData.name"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"手机号",prop:"cellPhone"}},[a("el-input",{attrs:{clearable:""},model:{value:e.reqData.cellPhone,callback:function(t){e.$set(e.reqData,"cellPhone","string"==typeof t?t.trim():t)},expression:"reqData.cellPhone"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"性别",prop:"sex"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.reqData.sex,callback:function(t){e.$set(e.reqData,"sex",t)},expression:"reqData.sex"}},e._l(e.sexList,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"身份证号",prop:"identityCard"}},[a("el-input",{attrs:{clearable:""},model:{value:e.reqData.identityCard,callback:function(t){e.$set(e.reqData,"identityCard","string"==typeof t?t.trim():t)},expression:"reqData.identityCard"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:24,xs:24}},[a("el-form-item",{staticClass:"u-textarea",attrs:{label:"常住地址",prop:"permanentAddress"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.reqData.permanentAddress,callback:function(t){e.$set(e.reqData,"permanentAddress","string"==typeof t?t.trim():t)},expression:"reqData.permanentAddress"}})],1)],1)],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"入职时间",prop:"entryTime"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.reqData.entryTime,callback:function(t){e.$set(e.reqData,"entryTime",t)},expression:"reqData.entryTime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8,xs:24}},[a("el-form-item",{attrs:{label:"离职时间",prop:"dimissionTime"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.reqData.dimissionTime,callback:function(t){e.$set(e.reqData,"dimissionTime",t)},expression:"reqData.dimissionTime"}})],1)],1)],1),e._v(" "),a("el-row",{staticClass:"u-button",attrs:{gutter:32}},[a("el-col",{attrs:{span:8,offset:16}},[a("el-button",{staticClass:"btn-save-big",attrs:{type:"primary"},on:{click:function(t){e.submitForm("reqData")}}},[e._v("保存")])],1)],1)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(i,o,!1,function(e){a("ACTT"),a("1CCU")},"data-v-3a6232bc",null);t.default=m.exports}});
//# sourceMappingURL=57.98f27742fbe0e24f0fe8.js.map