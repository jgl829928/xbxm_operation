webpackJsonp([22],{FJcx:function(e,t){},aHEt:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("Dd8w"),l=r.n(a),i=r("woOf"),o=r.n(i),n=r("Gu7T"),s=r.n(n),m=r("//Fk"),c=r.n(m),u=r("hVDB"),d={name:"editRental",data:function(){return{time:"",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,r=new Date;r.setTime(r.getTime()-6048e5),e.$emit("pick",[r,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,r=new Date;r.setTime(r.getTime()-2592e6),e.$emit("pick",[r,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,r=new Date;r.setTime(r.getTime()-7776e6),e.$emit("pick",[r,t])}}]},rules:{marketCode:[{required:!0,message:"请选择所属商场",trigger:"change"}],billboardCode:[{required:!0,message:"请选择广告位",trigger:"change"}],merchantCode:[{required:!0,message:"请选择投放商户",trigger:"change"}],timeSelect:[{required:!0,message:"请选择上架时间",trigger:"change"}],signPrice:[{required:!0,message:"请输入签约价格",trigger:"blur"},{trigger:"blur",pattern:/^\d+(?:\.\d{1,2})?$/,message:"请输入大于零等于零的数字，最多保留两位小数"}],finalPrice:[{required:!0,message:"请输入实际成交价格",trigger:"blur"},{trigger:"blur",pattern:/^\d+(?:\.\d{1,2})?$/,message:"请输入大于等于零的数字，最多保留两位小数"}]},storeNameOption:[],advertiseList:[],merchantList:[],merchantTypeList:[{desc:"外部商户",value:1},{desc:"内部商户",value:2}],ruleForm:{marketCode:"",billboardCode:"",merchantCode:"",merchantName:"",merchantType:2,timeSelect:[],beginTime:"",endTime:"",duration:"",signPrice:"",finalPrice:""},storeOptionDisabled:!1}},methods:{getOptionData:function(){var e=this,t=this.$http.get(u.a.allStore);c.a.all([t]).then(function(t){if(0===t[0].code){e.storeNameOption=[],e.storeNameOption=[].concat(s()(t[0].data));var r=e.$store.getters.currentUser.marketCode;console.log("editRental",r),r&&(e.ruleForm.marketCode=r,e.storeOptionDisabled=!0,e.getAdvertiseOptionData())}})},getAdvertiseOptionData:function(){var e=this;if(""!==this.ruleForm.marketCode){var t=this.$http.get(u.a.selectAdvertiseOption+"?marketCode="+this.ruleForm.marketCode+"&bdStatus=1"),r=this.$http.get(u.a.merchants+"?marketCode="+this.ruleForm.marketCode);c.a.all([t,r]).then(function(t){0===t[0].code&&(e.advertiseList=[],e.advertiseList=[].concat(s()(t[0].data))),0===t[1].code&&(e.merchantList=[],e.merchantList=[].concat(s()(t[1].data)))})}else this.advertiseList=[],this.merchantList=[]},timeSelected:function(e){if(null===e)this.ruleForm.duration="",this.ruleForm.beginTime="",this.ruleForm.endTime="";else{var t=[].concat(s()(e));this.ruleForm.beginTime=t[0],this.ruleForm.endTime=t[1];var r=new Date(t[0]),a=new Date(t[1]);this.ruleForm.duration=(a-r)/1e3/86400+1+""}},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.$http.put(u.a.advertiseRentalList+"/"+t.ruleForm.bdRentCode,t.ruleForm).then(function(e){0===e.code?(t.$message.success(e.msg),t.$router.push("/operation/rental")):t.$message.error(e.msg)})})},resetForm:function(e){this.$refs[e].resetFields()}},beforeMount:function(){var e=this;this.getOptionData();var t=this.$route.params.id;t&&this.$http.get(u.a.singleRental+"/"+t).then(function(t){o()(e.ruleForm,t.data),e.getAdvertiseOptionData();var r=l()({},e.ruleForm);e.ruleForm.timeSelect=[],e.ruleForm.timeSelect.push(r.beginTime),e.ruleForm.timeSelect.push(r.endTime),e.ruleForm.merchantType=r.merchantType.code,e.ruleForm.merchantCode=r.merchantCode+"",2===e.ruleForm.merchantType?e.ruleForm.merchantName="":(e.ruleForm.merchantName=r.merchantName,e.ruleForm.merchantCode=""),0===e.ruleForm.finalPrice&&(e.ruleForm.finalPrice="")})}},p={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"contract-receipts edit-rental"},[r("div",{staticClass:"main-title"},[e._v("\n    修改登记信息\n  ")]),e._v(" "),r("br"),e._v(" "),r("el-form",{ref:"ruleForm",staticClass:"c-search-form",attrs:{rules:e.rules,model:e.ruleForm,"label-width":"110px",inline:!0,"label-position":"right"}},[r("el-row",[r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"商场",prop:"marketCode"}},[r("el-select",{attrs:{disabled:e.storeOptionDisabled,clearable:"",placeholder:"请选择"},on:{change:e.getAdvertiseOptionData},model:{value:e.ruleForm.marketCode,callback:function(t){e.$set(e.ruleForm,"marketCode","string"==typeof t?t.trim():t)},expression:"ruleForm.marketCode"}},e._l(e.storeNameOption,function(e,t){return r("el-option",{key:t,attrs:{label:e.marketName,value:e.marketCode}})}))],1)],1),e._v(" "),r("el-col",{staticStyle:{"text-align":"left"},attrs:{span:8}},[r("el-form-item",{attrs:{label:"广告位",prop:"billboardCode"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.ruleForm.billboardCode,callback:function(t){e.$set(e.ruleForm,"billboardCode","string"==typeof t?t.trim():t)},expression:"ruleForm.billboardCode"}},e._l(e.advertiseList,function(e,t){return r("el-option",{key:t,attrs:{label:e.billboardName,value:e.billboardCode}})}))],1)],1)],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"商户类型",prop:"merchantType"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.ruleForm.merchantType,callback:function(t){e.$set(e.ruleForm,"merchantType","string"==typeof t?t.trim():t)},expression:"ruleForm.merchantType"}},e._l(e.merchantTypeList,function(e,t){return r("el-option",{key:t,attrs:{label:e.desc,value:e.value}})}))],1)],1),e._v(" "),r("el-col",{staticStyle:{"text-align":"left"},attrs:{span:8}},[2===e.ruleForm.merchantType?r("el-form-item",{attrs:{label:"投放商户",prop:"merchantCode"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.ruleForm.merchantCode,callback:function(t){e.$set(e.ruleForm,"merchantCode","string"==typeof t?t.trim():t)},expression:"ruleForm.merchantCode"}},e._l(e.merchantList,function(e,t){return r("el-option",{key:t,attrs:{label:e.merchantName,value:e.merchantCode}})}))],1):r("el-form-item",{attrs:{label:"投放商户",prop:"merchantName"}},[r("el-input",{attrs:{placeholder:"请输入"},model:{value:e.ruleForm.merchantName,callback:function(t){e.$set(e.ruleForm,"merchantName","string"==typeof t?t.trim():t)},expression:"ruleForm.merchantName"}})],1)],1)],1),e._v(" "),r("el-row",[r("el-col",{staticStyle:{"text-align":"left"},attrs:{span:8}},[r("el-form-item",{attrs:{label:"投放时间",prop:"timeSelect"}},[r("el-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd","picker-options":e.pickerOptions},on:{change:e.timeSelected},model:{value:e.ruleForm.timeSelect,callback:function(t){e.$set(e.ruleForm,"timeSelect","string"==typeof t?t.trim():t)},expression:"ruleForm.timeSelect"}})],1)],1),e._v(" "),r("el-col",{staticStyle:{"text-align":"left"},attrs:{span:8}},[r("el-form-item",{attrs:{label:"时长"}},[r("span",{staticClass:"duration-day"},[e._v(e._s(e.ruleForm.duration||0)+"  天")])])],1)],1),e._v(" "),r("el-row",[r("el-col",{staticStyle:{"text-align":"left"},attrs:{span:8}},[r("el-form-item",{attrs:{label:"签约价格",prop:"signPrice"}},[r("el-input",{attrs:{clearable:""},model:{value:e.ruleForm.signPrice,callback:function(t){e.$set(e.ruleForm,"signPrice","string"==typeof t?t.trim():t)},expression:"ruleForm.signPrice"}})],1)],1),e._v(" "),r("el-col",{staticStyle:{"text-align":"left"},attrs:{span:8}},[r("el-form-item",{attrs:{label:"实际成交价格",prop:"finalPrice"}},[r("el-input",{attrs:{clearable:""},model:{value:e.ruleForm.finalPrice,callback:function(t){e.$set(e.ruleForm,"finalPrice","string"==typeof t?t.trim():t)},expression:"ruleForm.finalPrice"}})],1)],1)],1),e._v(" "),r("div",{staticClass:"save-div"},[r("el-button",{staticClass:"btn-save-big",attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("保存")])],1)],1)],1)},staticRenderFns:[]};var h=r("VU/8")(d,p,!1,function(e){r("FJcx"),r("vHiB")},"data-v-c24bda6c",null);t.default=h.exports},vHiB:function(e,t){}});
//# sourceMappingURL=22.0964815252f7f50339c9.js.map