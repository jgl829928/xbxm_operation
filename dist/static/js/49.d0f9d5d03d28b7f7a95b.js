webpackJsonp([49],{"/qV9":function(e,a){},"9xX3":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t("IHPB"),l=t.n(r),n=t("rVsN"),s=t.n(n),i=t("4YfN"),c=t.n(i),o=t("hVDB"),m=t("9rMa"),d={name:"addMerchant",computed:c()({},Object(m.d)(["gTicket"])),data:function(){return{uploadUrl:"",uploadHeaders:{gTicket:""},dialogVisible:!1,merchantNatureList:[],typeOption:[],brandOption:[],levelOption:[],tableData:[{name:""}],reqData:{merchantName:"",shopName:"",storeName:"",merchantNature:"",loginNumber:"",leaderName:"",leaderCard:"",leaderTel:"",urgencyTel:"",wxId:"",telephone:"",email:"",qq:"",legalCard:"",address:"",mainType:"",mainBrand:"",mainAgencyLevel:"",merchantBrandList:[],refundAccountName:"",refundAccountBank:"",refundAccountNumber:"",remark:"",merchantPictureList:[{merchantPictureType:1,merchantPictureUrl:"",desc:"营业执照"},{merchantPictureType:2,merchantPictureUrl:"",desc:"税务登记证"},{merchantPictureType:3,merchantPictureUrl:"",desc:"身份证正面"},{merchantPictureType:4,merchantPictureUrl:"",desc:"身份证反面"},{merchantPictureType:5,merchantPictureUrl:"",desc:"其他"}]},merchantBrandList:{brandClass:1,managementTypeId:"",brandCode:"",agencyLevel:""},merchantBrandList1:{brandClass:2,managementTypeId:"",brandCode:"",agencyLevel:""},merchantBrandList2:{brandClass:2,managementTypeId:"",brandCode:"",agencyLevel:""},rules:{merchantName:[{required:!0,message:"请输入商户名称",trigger:"blur"},{min:1,max:50,message:"请输入1-50位商户名称",trigger:"blur"}],storeName:[{required:!0,message:"请输入门店名称",trigger:"change"}],merchantNature:[{required:!0,message:"请选择商户性质",trigger:"change"}],loginNumber:[{required:!1,message:"请输入注册号",trigger:"blur"},{min:1,max:50,message:"请输入1-50位注册号",trigger:"blur"},{pattern:/^[0-9a-zA-Z]+$/,message:"只能输入字母和数字",trigger:"blur"}],leaderName:[{required:!0,message:"请输入负责人",trigger:"blur"},{min:1,max:20,message:"长度1-20位",trigger:"blur"}],leaderCard:[{required:!0,message:"请输入负责人身份证号",trigger:"blur"},{message:"请输入正确的身份证号",trigger:"blur",pattern:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/}],leaderTel:[{required:!0,message:"请输入联系电话",trigger:"blur"},{message:"请输入正确的手机号",trigger:"blur",pattern:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0-9]|18[0-9])\d{8}$/}],urgencyTel:[{required:!0,message:"请输入紧急联系人电话",trigger:"blur"},{message:"请输入正确的手机号",trigger:"blur",pattern:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0-9]|18[0-9])\d{8}$/}],wxId:[{required:!0,message:"请输入微信号",trigger:"blur"},{min:1,max:40,message:"请输入1-40位微信号",trigger:"blur"},{message:"请输入正确的微信号",trigger:"blur",pattern:/^[a-zA-Z\d_@]{5,}$/}],mainType:[{required:!0,message:"请选择类别",trigger:"change"}],mainBrand:[{required:!0,message:"请选择品牌",trigger:"change"}],mainAgencyLevel:[{required:!0,message:"请选择代理级别",trigger:"change"}],refundAccountName:[{required:!0,message:"请输入账户姓名",trigger:"blur"},{min:1,max:20,message:"请输入1-20位账户姓名",trigger:"blur"}],refundAccountBank:[{required:!0,message:"请输入开户行",trigger:"blur"},{min:1,max:50,message:"请输入1-50位开户行",trigger:"blur"}],refundAccountNumber:[{required:!0,message:"请输入返款账户卡号",trigger:"blur"},{pattern:/^\d{1,30}$/,message:"请输入1-30位正确的账户卡号",trigger:"blur"}],telephone:[{pattern:/^(0\d{2}-?\d{8})|0\d{3}-?\d{7}$/,message:"请输入正确的固定电话",trigger:"blur"}],qq:[{pattern:/^\d{5,15}$/,message:"请输入5-15位正确的QQ号",trigger:"blur"}],legalCard:[{max:20,message:"输入位数最多20位",trigger:"blur"},{message:"请输入正确的注册号（身份证号）",trigger:"blur",pattern:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/}],address:[{required:!0,message:"请输入联系地址",trigger:"blur"},{max:100,message:"输入位数最多100位",trigger:"blur"}],email:[{pattern:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,message:"请输入正确的邮箱",trigger:"blur"}]}}},methods:{getOptionData:function(){var e=this,a=this.$http.get(o.a.merchantsOptionInfo),t=this.$http.get(o.a.allBrand);s.a.all([a,t]).then(function(a){0===a[0].code&&(e.merchantNatureList=[],e.typeOption=[],e.levelOption=[],e.merchantNatureList=[].concat(l()(a[0].data.merchantNatureList)),e.typeOption=[].concat(l()(a[0].data.mangementTypeDTOList)),e.levelOption=[].concat(l()(a[0].data.agencyLevelList))),0===a[1].code&&(e.brandOption=[],e.brandOption=[].concat(l()(a[1].data)))})},addStoreName:function(){this.tableData.length<20?this.tableData.push({name:""}):this.$message.warning("最多添加20个门店名称")},deleteStoreName:function(e){this.tableData.splice(e,1)},showName:function(){for(var e=[],a=[].concat(l()(this.tableData)),t=0;t<a.length;t++)""!==a[t].name&&e.push(a[t].name);this.reqData.storeName=e.join(","),this.reqData.shopName=[].concat(e),this.dialogVisible=!1},changeLoginNumStatus:function(e){this.rules.loginNumber[0].required=2===e},changeMainType:function(e){this.merchantBrandList.managementTypeId=e},changeMainBrand:function(e){this.merchantBrandList.brandCode=e},changeMainAgencyLevel:function(e){this.merchantBrandList.agencyLevel=e},beforeImgUpload:function(e){var a=e.size/1024/1024<=5;return a||this.$message.error("上传头像图片大小不能超过5MB!"),a},licenseUpload:function(e){this.reqData.merchantPictureList[0].merchantPictureUrl=e.data.merchantPictureUrl},taxUpload:function(e){this.reqData.merchantPictureList[1].merchantPictureUrl=e.data.merchantPictureUrl},idCardAUpload:function(e){this.reqData.merchantPictureList[2].merchantPictureUrl=e.data.merchantPictureUrl},idCardBUpload:function(e){this.reqData.merchantPictureList[3].merchantPictureUrl=e.data.merchantPictureUrl},otherUpload:function(e){this.reqData.merchantPictureList[4].merchantPictureUrl=e.data.merchantPictureUrl},storeUpload:function(e){var a={merchantPictureType:6,merchantPictureUrl:e.data.merchantPictureUrl,desc:"门店照片"};this.reqData.merchantPictureList.push(a)},deleteImg:function(e){this.reqData.merchantPictureList[e].merchantPictureUrl=""},deleteStoreImg:function(e){this.reqData.merchantPictureList.splice(e,1)},submitForm:function(e){var a=this,t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var r=c()({},a.merchantBrandList1),l=c()({},a.merchantBrandList2),n=[c()({},a.merchantBrandList)];""!==r.managementTypeId&&""!==r.brandCode&&""!==r.agencyLevel&&n.push(r),""!==l.managementTypeId&&""!==l.brandCode&&""!==l.agencyLevel&&n.push(l),a.reqData.merchantBrandList=[].concat(n),console.log(a.reqData.merchantBrandList),a.$http.post(o.a.merchants,a.reqData).then(function(e){0===e.code&&(t.$message.success(e.msg),a.$store.commit("delete_tabs",a.$route),t.$router.push({path:"/merchant/merchantManage"}))})})},resetForm:function(e){this.$refs[e].resetFields()}},mounted:function(){this.getOptionData(),this.uploadUrl=this.$http.defaults.baseURL+"/business/merchants/pictures/uploads",this.uploadHeaders.gTicket=this.gTicket}},u={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"contract-receipts add-merchant"},[t("div",{staticClass:"main-title"},[e._v("\n    添加商户信息\n  ")]),e._v(" "),t("el-form",{ref:"ruleForm",staticClass:"c-search-form",attrs:{model:e.reqData,rules:e.rules,"label-width":"128px","label-position":"right",inline:!0}},[t("div",{staticClass:"title"},[e._v("商户基本信息")]),e._v(" "),t("el-row",[t("el-col",{attrs:{span:9}},[t("el-form-item",{attrs:{label:"商户名称",prop:"merchantName"}},[t("el-input",{attrs:{clearable:""},model:{value:e.reqData.merchantName,callback:function(a){e.$set(e.reqData,"merchantName","string"==typeof a?a.trim():a)},expression:"reqData.merchantName"}})],1)],1),e._v(" "),t("el-col",{attrs:{span:15}},[t("el-form-item",{attrs:{label:"门店名称",prop:"storeName"}},[t("el-input",{staticClass:"store-name-all",attrs:{clearable:""},on:{focus:function(a){e.dialogVisible=!0}},model:{value:e.reqData.storeName,callback:function(a){e.$set(e.reqData,"storeName","string"==typeof a?a.trim():a)},expression:"reqData.storeName"}})],1)],1)],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:9}},[t("el-form-item",{attrs:{label:"商户性质",prop:"merchantNature"}},[t("el-select",{attrs:{clearable:"",placeholder:"请选择"},on:{change:e.changeLoginNumStatus},model:{value:e.reqData.merchantNature,callback:function(a){e.$set(e.reqData,"merchantNature","string"==typeof a?a.trim():a)},expression:"reqData.merchantNature"}},e._l(e.merchantNatureList,function(e,a){return t("el-option",{key:a,attrs:{label:e.desc,value:e.code}})}))],1)],1),e._v(" "),t("el-col",{attrs:{span:15}},[t("el-form-item",{attrs:{label:"注册号",prop:"loginNumber"}},[t("el-input",{attrs:{clearable:""},model:{value:e.reqData.loginNumber,callback:function(a){e.$set(e.reqData,"loginNumber","string"==typeof a?a.trim():a)},expression:"reqData.loginNumber"}})],1)],1)],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:9}},[t("el-form-item",{attrs:{label:"法人代表/负责人",prop:"leaderName"}},[t("el-input",{attrs:{clearable:""},model:{value:e.reqData.leaderName,callback:function(a){e.$set(e.reqData,"leaderName","string"==typeof a?a.trim():a)},expression:"reqData.leaderName"}})],1)],1),e._v(" "),t("el-col",{attrs:{span:9}},[t("el-form-item",{attrs:{label:"负责人身份证号",prop:"leaderCard"}},[t("el-input",{attrs:{clearable:""},model:{value:e.reqData.leaderCard,callback:function(a){e.$set(e.reqData,"leaderCard","string"==typeof a?a.trim():a)},expression:"reqData.leaderCard"}})],1)],1)],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:9}},[t("el-form-item",{attrs:{label:"联系电话",prop:"leaderTel"}},[t("el-input",{attrs:{clearable:""},model:{value:e.reqData.leaderTel,callback:function(a){e.$set(e.reqData,"leaderTel","string"==typeof a?a.trim():a)},expression:"reqData.leaderTel"}})],1)],1),e._v(" "),t("el-col",{attrs:{span:9}},[t("el-form-item",{attrs:{label:"紧急联系人电话",prop:"urgencyTel"}},[t("el-input",{attrs:{clearable:""},model:{value:e.reqData.urgencyTel,callback:function(a){e.$set(e.reqData,"urgencyTel","string"==typeof a?a.trim():a)},expression:"reqData.urgencyTel"}})],1)],1)],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:9}},[t("el-form-item",{attrs:{label:"微信号",prop:"wxId"}},[t("el-input",{attrs:{clearable:""},model:{value:e.reqData.wxId,callback:function(a){e.$set(e.reqData,"wxId","string"==typeof a?a.trim():a)},expression:"reqData.wxId"}})],1)],1),e._v(" "),t("el-col",{attrs:{span:9}},[t("el-form-item",{attrs:{label:"固定电话",prop:"telephone"}},[t("el-input",{attrs:{clearable:""},model:{value:e.reqData.telephone,callback:function(a){e.$set(e.reqData,"telephone","string"==typeof a?a.trim():a)},expression:"reqData.telephone"}})],1)],1)],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:9}},[t("el-form-item",{attrs:{label:"电子邮箱",prop:"email"}},[t("el-input",{attrs:{clearable:""},model:{value:e.reqData.email,callback:function(a){e.$set(e.reqData,"email","string"==typeof a?a.trim():a)},expression:"reqData.email"}})],1)],1),e._v(" "),t("el-col",{attrs:{span:9}},[t("el-form-item",{attrs:{label:"QQ",prop:"qq"}},[t("el-input",{attrs:{clearable:""},model:{value:e.reqData.qq,callback:function(a){e.$set(e.reqData,"qq","string"==typeof a?a.trim():a)},expression:"reqData.qq"}})],1)],1)],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:9}},[t("el-form-item",{attrs:{label:"法人代表证号",prop:"legalCard"}},[t("el-input",{attrs:{clearable:""},model:{value:e.reqData.legalCard,callback:function(a){e.$set(e.reqData,"legalCard","string"==typeof a?a.trim():a)},expression:"reqData.legalCard"}})],1)],1),e._v(" "),t("el-col",{attrs:{span:9}},[t("el-form-item",{attrs:{label:"联系地址",prop:"address"}},[t("el-input",{attrs:{type:"textarea",clearable:""},model:{value:e.reqData.address,callback:function(a){e.$set(e.reqData,"address","string"==typeof a?a.trim():a)},expression:"reqData.address"}})],1)],1)],1),e._v(" "),t("div",{staticClass:"title"},[e._v("经营品牌信息")]),e._v(" "),t("el-row",{staticClass:"brand-wrap"},[t("el-col",{staticClass:"brand",attrs:{span:2}},[e._v("\n        主品牌\n      ")]),e._v(" "),t("el-col",{attrs:{span:7}},[t("el-form-item",{attrs:{label:"类别",prop:"mainType","label-width":"60px"}},[t("el-select",{attrs:{clearable:"",placeholder:"请选择"},on:{change:e.changeMainType},model:{value:e.reqData.mainType,callback:function(a){e.$set(e.reqData,"mainType","string"==typeof a?a.trim():a)},expression:"reqData.mainType"}},e._l(e.typeOption,function(e,a){return t("el-option",{key:a,attrs:{label:e.managementTypeName,value:e.managementTypeId}})}))],1)],1),e._v(" "),t("el-col",{attrs:{span:7}},[t("el-form-item",{attrs:{label:"品牌",prop:"mainBrand","label-width":"60px"}},[t("el-select",{attrs:{clearable:"",placeholder:"请选择"},on:{change:e.changeMainBrand},model:{value:e.reqData.mainBrand,callback:function(a){e.$set(e.reqData,"mainBrand","string"==typeof a?a.trim():a)},expression:"reqData.mainBrand"}},e._l(e.brandOption,function(e,a){return t("el-option",{key:a,attrs:{label:e.brandName,value:e.brandCode}})}))],1)],1),e._v(" "),t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"代理级别",prop:"mainAgencyLevel","label-width":"80px"}},[t("el-select",{attrs:{clearable:"",placeholder:"请选择"},on:{change:e.changeMainAgencyLevel},model:{value:e.reqData.mainAgencyLevel,callback:function(a){e.$set(e.reqData,"mainAgencyLevel","string"==typeof a?a.trim():a)},expression:"reqData.mainAgencyLevel"}},e._l(e.levelOption,function(e,a){return t("el-option",{key:a,attrs:{label:e.desc,value:e.code}})}))],1)],1)],1),e._v(" "),t("el-row",{staticClass:"brand-wrap"},[t("el-col",{staticClass:"brand",attrs:{span:2}},[e._v("\n        子品牌1\n      ")]),e._v(" "),t("el-col",{attrs:{span:7}},[t("el-form-item",{attrs:{label:"类别","label-width":"60px"}},[t("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.merchantBrandList1.managementTypeId,callback:function(a){e.$set(e.merchantBrandList1,"managementTypeId","string"==typeof a?a.trim():a)},expression:"merchantBrandList1.managementTypeId"}},e._l(e.typeOption,function(e,a){return t("el-option",{key:a,attrs:{label:e.managementTypeName,value:e.managementTypeId}})}))],1)],1),e._v(" "),t("el-col",{attrs:{span:7}},[t("el-form-item",{attrs:{label:"品牌","label-width":"60px"}},[t("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.merchantBrandList1.brandCode,callback:function(a){e.$set(e.merchantBrandList1,"brandCode","string"==typeof a?a.trim():a)},expression:"merchantBrandList1.brandCode"}},e._l(e.brandOption,function(e,a){return t("el-option",{key:a,attrs:{label:e.brandName,value:e.brandCode}})}))],1)],1),e._v(" "),t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"代理级别","label-width":"80px"}},[t("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.merchantBrandList1.agencyLevel,callback:function(a){e.$set(e.merchantBrandList1,"agencyLevel","string"==typeof a?a.trim():a)},expression:"merchantBrandList1.agencyLevel"}},e._l(e.levelOption,function(e,a){return t("el-option",{key:a,attrs:{label:e.desc,value:e.code}})}))],1)],1)],1),e._v(" "),t("el-row",{staticClass:"brand-wrap"},[t("el-col",{staticClass:"brand",attrs:{span:2}},[e._v("\n        子品牌2\n      ")]),e._v(" "),t("el-col",{attrs:{span:7}},[t("el-form-item",{attrs:{label:"类别","label-width":"60px"}},[t("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.merchantBrandList2.managementTypeId,callback:function(a){e.$set(e.merchantBrandList2,"managementTypeId","string"==typeof a?a.trim():a)},expression:"merchantBrandList2.managementTypeId"}},e._l(e.typeOption,function(e,a){return t("el-option",{key:a,attrs:{label:e.managementTypeName,value:e.managementTypeId}})}))],1)],1),e._v(" "),t("el-col",{attrs:{span:7}},[t("el-form-item",{attrs:{label:"品牌","label-width":"60px"}},[t("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.merchantBrandList2.brandCode,callback:function(a){e.$set(e.merchantBrandList2,"brandCode","string"==typeof a?a.trim():a)},expression:"merchantBrandList2.brandCode"}},e._l(e.brandOption,function(e,a){return t("el-option",{key:a,attrs:{label:e.brandName,value:e.brandCode}})}))],1)],1),e._v(" "),t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"代理级别","label-width":"80px"}},[t("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.merchantBrandList2.agencyLevel,callback:function(a){e.$set(e.merchantBrandList2,"agencyLevel","string"==typeof a?a.trim():a)},expression:"merchantBrandList2.agencyLevel"}},e._l(e.levelOption,function(e,a){return t("el-option",{key:a,attrs:{label:e.desc,value:e.code}})}))],1)],1)],1),e._v(" "),t("div",{staticClass:"title"},[e._v("返款账户信息")]),e._v(" "),t("el-row",[t("el-col",{attrs:{span:10}},[t("el-form-item",{attrs:{label:"账户姓名",prop:"refundAccountName"}},[t("el-input",{attrs:{clearable:""},model:{value:e.reqData.refundAccountName,callback:function(a){e.$set(e.reqData,"refundAccountName","string"==typeof a?a.trim():a)},expression:"reqData.refundAccountName"}})],1)],1)],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:9}},[t("el-form-item",{attrs:{label:"开户行",prop:"refundAccountBank"}},[t("el-input",{attrs:{clearable:""},model:{value:e.reqData.refundAccountBank,callback:function(a){e.$set(e.reqData,"refundAccountBank","string"==typeof a?a.trim():a)},expression:"reqData.refundAccountBank"}})],1)],1),e._v(" "),t("el-col",{attrs:{span:9}},[t("el-form-item",{attrs:{label:"返款账户卡号",prop:"refundAccountNumber"}},[t("el-input",{attrs:{clearable:""},model:{value:e.reqData.refundAccountNumber,callback:function(a){e.$set(e.reqData,"refundAccountNumber","string"==typeof a?a.trim():a)},expression:"reqData.refundAccountNumber"}})],1)],1)],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:16}},[t("el-form-item",{staticClass:"otherInfo",attrs:{label:"备注"}},[t("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:e.reqData.remark,callback:function(a){e.$set(e.reqData,"remark","string"==typeof a?a.trim():a)},expression:"reqData.remark"}})],1)],1)],1),e._v(" "),t("div",{staticClass:"title"},[e._v("附件")]),e._v(" "),t("el-row",{staticClass:"img-row"},[t("el-col",{attrs:{span:8}},[t("p",[e._v("营业执照")]),e._v(" "),t("el-form-item",{attrs:{label:""}},[t("el-upload",{staticClass:"avatar-uploader",attrs:{index:1,headers:e.uploadHeaders,action:e.uploadUrl,"show-file-list":!1,accept:"image/jpg,image/jpeg,image/png,image/bmp,image/gif","before-upload":e.beforeImgUpload,"on-success":e.licenseUpload}},[e.reqData.merchantPictureList[0].merchantPictureUrl?t("div",{staticClass:"avatar"},[t("img",{attrs:{src:e.reqData.merchantPictureList[0].merchantPictureUrl}})]):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),e.reqData.merchantPictureList[0].merchantPictureUrl?t("span",{staticClass:"el-icon-error delete-img",on:{click:function(a){e.deleteImg(0)}}}):e._e()],1)],1),e._v(" "),t("el-col",{attrs:{span:8}},[t("p",[e._v("税务登记证")]),e._v(" "),t("el-form-item",{attrs:{label:""}},[t("el-upload",{staticClass:"avatar-uploader",attrs:{headers:e.uploadHeaders,action:e.uploadUrl,accept:"image/jpg,image/jpeg,image/png,image/bmp,image/gif","show-file-list":!1,"before-upload":e.beforeImgUpload,"on-success":e.taxUpload}},[e.reqData.merchantPictureList[1].merchantPictureUrl?t("div",{staticClass:"avatar"},[t("img",{attrs:{src:e.reqData.merchantPictureList[1].merchantPictureUrl}})]):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),e.reqData.merchantPictureList[1].merchantPictureUrl?t("span",{staticClass:"el-icon-error delete-img",on:{click:function(a){e.deleteImg(1)}}}):e._e()],1)],1)],1),e._v(" "),t("el-row",{staticClass:"img-row"},[t("el-col",{attrs:{span:8}},[t("p",[e._v("法人代表身份证正面")]),e._v(" "),t("el-form-item",{attrs:{label:""}},[t("el-upload",{staticClass:"avatar-uploader",attrs:{headers:e.uploadHeaders,action:e.uploadUrl,accept:"image/jpg,image/jpeg,image/png,image/bmp,image/gif","show-file-list":!1,"before-upload":e.beforeImgUpload,"on-success":e.idCardAUpload}},[e.reqData.merchantPictureList[2].merchantPictureUrl?t("div",{staticClass:"avatar"},[t("img",{attrs:{src:e.reqData.merchantPictureList[2].merchantPictureUrl}})]):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),e.reqData.merchantPictureList[2].merchantPictureUrl?t("span",{staticClass:"el-icon-error delete-img",on:{click:function(a){e.deleteImg(2)}}}):e._e()],1)],1),e._v(" "),t("el-col",{attrs:{span:8}},[t("p",[e._v("法人代表身份证反面")]),e._v(" "),t("el-form-item",{attrs:{label:""}},[t("el-upload",{staticClass:"avatar-uploader",attrs:{headers:e.uploadHeaders,action:e.uploadUrl,accept:"image/jpg,image/jpeg,image/png,image/bmp,image/gif","show-file-list":!1,"before-upload":e.beforeImgUpload,"on-success":e.idCardBUpload}},[e.reqData.merchantPictureList[3].merchantPictureUrl?t("div",{staticClass:"avatar"},[t("img",{attrs:{src:e.reqData.merchantPictureList[3].merchantPictureUrl}})]):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),e.reqData.merchantPictureList[3].merchantPictureUrl?t("span",{staticClass:"el-icon-error delete-img",on:{click:function(a){e.deleteImg(3)}}}):e._e()],1)],1)],1),e._v(" "),t("el-row",{staticClass:"img-row"},[t("el-col",{attrs:{span:24}},[t("p",[e._v("门店照片")])]),e._v(" "),e._l(e.reqData.merchantPictureList,function(a,r){return r>4?t("el-col",{key:r,attrs:{span:4}},[t("el-form-item",{attrs:{label:""}},[t("div",{staticClass:"avatar"},[t("img",{attrs:{src:a.merchantPictureUrl}})]),e._v(" "),t("span",{staticClass:"el-icon-error delete-img",on:{click:function(a){e.deleteStoreImg(r)}}})])],1):e._e()}),e._v(" "),t("el-col",{attrs:{span:4}},[t("el-form-item",{attrs:{label:""}},[t("el-upload",{staticClass:"avatar-uploader",attrs:{headers:e.uploadHeaders,action:e.uploadUrl,accept:"image/jpg,image/jpeg,image/png,image/bmp,image/gif","before-upload":e.beforeImgUpload,"show-file-list":!1,"on-success":e.storeUpload}},[t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1)],2),e._v(" "),t("el-row",{staticClass:"img-row"},[t("el-col",{attrs:{span:8}},[t("p",[e._v("其他")]),e._v(" "),t("el-form-item",{attrs:{label:""}},[t("el-upload",{staticClass:"avatar-uploader",attrs:{headers:e.uploadHeaders,action:e.uploadUrl,accept:"image/jpg,image/jpeg,image/png,image/bmp,image/gif","show-file-list":!1,"before-upload":e.beforeImgUpload,"on-success":e.otherUpload}},[e.reqData.merchantPictureList[4].merchantPictureUrl?t("div",{staticClass:"avatar"},[t("img",{attrs:{src:e.reqData.merchantPictureList[4].merchantPictureUrl}})]):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),e.reqData.merchantPictureList[4].merchantPictureUrl?t("span",{staticClass:"el-icon-error delete-img",on:{click:function(a){e.deleteImg(4)}}}):e._e()],1)],1)],1),e._v(" "),t("div",{staticClass:"save-div"},[t("el-button",{staticClass:"btn-save-small",attrs:{type:"primary"},on:{click:function(a){e.submitForm("ruleForm")}}},[e._v("保 存")]),e._v(" "),t("el-button",{staticClass:"btn-save-small btn-cancle",attrs:{type:"primary"},on:{click:function(a){e.$router.push({name:"merchantManage"})}}},[e._v("取 消")])],1)],1),e._v(" "),t("el-dialog",{staticClass:"m-dialog",attrs:{title:"门店",visible:e.dialogVisible},on:{"update:visible":function(a){e.dialogVisible=a}}},[t("div",{staticClass:"table-wrap"},[t("el-button",{staticClass:"table-add-btn",attrs:{type:"text",icon:"el-icon-circle-plus-outline"},on:{click:e.addStoreName}}),e._v(" "),t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,stripe:"",align:"center"}},[t("el-table-column",{attrs:{label:"序号",align:"center",width:"120",type:"index"}}),e._v(" "),t("el-table-column",{attrs:{label:"门店名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-input",{staticClass:"store-name-input",model:{value:a.row.name,callback:function(t){e.$set(a.row,"name","string"==typeof t?t.trim():t)},expression:"scope.row.name"}})]}}])}),e._v(" "),t("el-table-column",{attrs:{align:"center",label:""},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-button",{attrs:{type:"text",icon:"el-icon-remove-outline"},on:{click:function(t){e.deleteStoreName(a.$index)}}})]}}])})],1)],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{staticClass:"btn-save",attrs:{type:"primary"},on:{click:e.showName}},[e._v("确 定")]),e._v(" "),t("el-button",{staticClass:"btn-reset",on:{click:function(a){e.dialogVisible=!1}}},[e._v("取 消")])],1)])],1)},staticRenderFns:[]};var p=t("vSla")(d,u,!1,function(e){t("/qV9"),t("Q1Qo")},"data-v-407b6120",null);a.default=p.exports},Q1Qo:function(e,a){}});
//# sourceMappingURL=49.d0f9d5d03d28b7f7a95b.js.map