webpackJsonp([18],{SoZN:function(e,t){},"uej/":function(e,t){},zanf:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("aA9S"),l=r.n(a),s=r("IHPB"),o=r.n(s),i=r("rVsN"),n=r.n(i),c=r("4YfN"),u=r.n(c),m=r("hVDB"),d=r("FTcF"),p=r("9rMa"),g={name:"editAdsense",components:{selectMarket:d.a},computed:u()({},Object(p.d)(["gTicket"])),data:function(){return{uploadUrl:"",uploadHeaders:{gTicket:""},rules:{marketCode:[{required:!0,message:"请选择所属商场",trigger:"change"}],bdType:[{required:!0,message:"请选择广告位类型",trigger:"change"}],bdName:[{required:!0,message:"请输入广告位名称",trigger:"blur"},{min:1,max:20,message:"长度1-20 个字符",trigger:"blur"}],coCode:[{required:!0,message:"请输入广告位方位号",trigger:"blur"},{min:1,max:20,message:"长度1-20 个字符",trigger:"blur"}],location:[{required:!0,message:"请输入所处位置",trigger:"blur"},{min:1,max:30,message:"长度1-30 个字符",trigger:"blur"}],imageUrl:[{required:!0,message:"请上传封面图片",trigger:"change"}],bdSize:[{required:!0,message:"请输入面积/尺寸",trigger:"blur"},{trigger:"blur",pattern:/^\d+(?:\.\d{1,2})?$/,message:"请输入大于等于零的数字，最多保留两位小数"}],describtion:[{min:1,max:120,message:"长度1-120 个字符",trigger:"blur"}]},storeNameOption:[],ruleForm:{marketCode:"",bdType:"",bdName:"",coCode:"",location:"",imageUrl:"",bdSize:"",describtion:"",initialTime:"2018-05"},payWay:[{label:"微信",value:1},{label:"支付宝",value:2},{label:"POS机刷卡",value:3}],bdTypeOption:[{id:1,desc:"内墙广告"},{id:2,desc:"外墙广告"}]}},methods:{getOptionData:function(){var e=this,t=this.$http.get(m.a.allStore);n.a.all([t]).then(function(t){0===t[0].code&&(e.storeNameOption=[],e.storeNameOption=[].concat(o()(t[0].data)))})},beforeImgUpload:function(e){var t=e.size/1024/1024<=20;return t||this.$message.error("上传头像图片大小不能超过20MB!"),t},handleAvatarSuccess:function(e){this.ruleForm.imageUrl=e.data},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.$http.put(m.a.advertiseList+"/"+t.ruleForm.billboardCode,t.ruleForm).then(function(e){0===e.code?(t.$message.success(e.msg),t.$router.push("/operation/adsense")):t.$message.error(e.msg)})})},getOneData:function(){var e=this,t=this.$route.params.id;this.$http.get(m.a.oneAdvertise+"/"+t).then(function(t){if(0===t.code){l()(e.ruleForm,t.data);var r=u()({},e.ruleForm.bdType);e.ruleForm.bdType=r.code,console.log(e.ruleForm)}})},resetForm:function(e){this.$refs[e].resetFields()}},beforeMount:function(){this.getOptionData(),this.getOneData(),this.uploadUrl=this.$http.defaults.baseURL+"/business/operation/image/upload",this.uploadHeaders.gTicket=this.gTicket}},b={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"contract-receipts add-advertise"},[r("div",{staticClass:"main-title"},[e._v("\n    修改广告位")]),e._v(" "),r("el-form",{ref:"ruleForm",staticClass:"c-search-form",attrs:{rules:e.rules,model:e.ruleForm,"label-width":"145px",inline:!0,"label-position":"right"}},[r("el-row",[r("el-col",{attrs:{span:10}},[r("el-form-item",{attrs:{label:"所属商场",prop:"marketCode"}},[r("selectMarket",{attrs:{reqData:e.ruleForm}})],1)],1),e._v(" "),r("el-col",{attrs:{span:10}},[r("el-form-item",{attrs:{label:"广告位类型",prop:"bdType"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.ruleForm.bdType,callback:function(t){e.$set(e.ruleForm,"bdType","string"==typeof t?t.trim():t)},expression:"ruleForm.bdType"}},e._l(e.bdTypeOption,function(e,t){return r("el-option",{key:t,attrs:{label:e.desc,value:e.id}})}))],1)],1)],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:10}},[r("el-form-item",{attrs:{label:"广告位名称",prop:"bdName"}},[r("el-input",{attrs:{clearable:""},model:{value:e.ruleForm.bdName,callback:function(t){e.$set(e.ruleForm,"bdName","string"==typeof t?t.trim():t)},expression:"ruleForm.bdName"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:10}},[r("el-form-item",{attrs:{label:"广告位编号(方位号)",prop:"coCode"}},[r("el-input",{attrs:{clearable:""},model:{value:e.ruleForm.coCode,callback:function(t){e.$set(e.ruleForm,"coCode","string"==typeof t?t.trim():t)},expression:"ruleForm.coCode"}})],1)],1)],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:10}},[r("el-form-item",{attrs:{label:"所处位置",prop:"location"}},[r("el-input",{attrs:{clearable:""},model:{value:e.ruleForm.location,callback:function(t){e.$set(e.ruleForm,"location","string"==typeof t?t.trim():t)},expression:"ruleForm.location"}})],1)],1)],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:10}},[r("el-form-item",{attrs:{label:"封面图",prop:"imageUrl"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{headers:e.uploadHeaders,action:e.uploadUrl,"show-file-list":!1,accept:"image/jpg,image/jpeg,image/png,image/bmp,image/gif","before-upload":e.beforeImgUpload,"on-success":e.handleAvatarSuccess}},[e.ruleForm.imageUrl?r("img",{staticClass:"avatar",attrs:{src:e.ruleForm.imageUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)],1),e._v(" "),r("div",[r("el-form-item",{staticClass:"area-size",attrs:{label:"面积/尺寸",prop:"bdSize"}},[r("el-input",{attrs:{clearable:""},model:{value:e.ruleForm.bdSize,callback:function(t){e.$set(e.ruleForm,"bdSize","string"==typeof t?t.trim():t)},expression:"ruleForm.bdSize"}})],1),e._v(" "),r("span",{staticClass:"unit"},[e._v("平米")])],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:20}},[r("el-form-item",{staticClass:"advertise-introduce",attrs:{label:"广告位介绍",prop:"describtion"}},[r("el-input",{attrs:{type:"textarea",rows:5,placeholder:"请输入内容"},model:{value:e.ruleForm.describtion,callback:function(t){e.$set(e.ruleForm,"describtion","string"==typeof t?t.trim():t)},expression:"ruleForm.describtion"}})],1)],1)],1),e._v(" "),r("div",{staticClass:"save-btn"},[r("el-button",{staticClass:"btn-save-big",attrs:{type:"primary",icon:"el-icon-save"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("保存")])],1)],1)],1)},staticRenderFns:[]};var f=r("vSla")(g,b,!1,function(e){r("SoZN"),r("uej/")},"data-v-97cbc55e",null);t.default=f.exports}});
//# sourceMappingURL=18.4e38125d02578e2ad024.js.map