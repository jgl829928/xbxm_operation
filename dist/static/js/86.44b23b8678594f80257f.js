webpackJsonp([86],{SoPg:function(t,e){},T3eR:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("lC5x"),r=a.n(l),s=a("J0Oq"),n=a.n(s),c=a("RhA+"),o={name:"templateMain",mixins:[a("vsZy").d],data:function(){return{dialogTitle:"合同模板-添加",province:[],location:"",addTplDialog:!1,reqData:{contractTplName:"",contractTypeCode:"",contractTplStatus:""},contractsTypeList:[],statusList:[{label:"启用",value:1},{label:"停用",value:2}],itemList:[],addTplForm:{contractTplId:"",contractTplName:"",contractTypeCode:"",contractTplUrl:""},fileList:[],isAdd:!0,uploadUrl:"",upHeaders:{gTicket:"",sys_authentication:"",sys_id:""},rules:{contractTplName:[{required:!0,message:"请输入合同名称",trigger:"blur"}],contractTypeCode:[{required:!0,message:"请选择合同类型",trigger:"change"}]}}},mounted:function(){this.getList(c.a.contractTpls),this.getContractsType();var t=this.$http.defaults,e=t.baseURL,a=t.headers,l=a.sys_authentication,r=a.sys_id;this.upHeaders={gTicket:this.$store.getters.gTicket,sys_authentication:l,sys_id:r},this.uploadUrl=e+c.a.uploadContract},methods:{getContractsType:function(){var t=this;return n()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get(c.a.basicContracts);case 2:(a=e.sent)&&(t.contractsTypeList=a.data);case 4:case"end":return e.stop()}},e,t)}))()},search:function(){this.reqData.currentPage=1,this.getList(c.a.contractTpls)},handleStatus:function(t){var e=this;return n()(r.a.mark(function a(){var l;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(l=t.contractTplId?t.contractTplId:""){a.next=3;break}return a.abrupt("return",!1);case 3:return a.next=5,e.$http.put(c.a.contractTpls+"/"+l);case 5:a.sent&&(e.$message.success("操作成功"),e.getList(c.a.contractTpls));case 7:case"end":return a.stop()}},a,e)}))()},addTpl:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"new",a=arguments[1];if(this.addTplDialog=!0,this.addTplSta=e,setTimeout(function(){t.$refs.addTplForm.clearValidate()},20),"new"!==e){this.isAdd=!1;var l=a.contractTplId,r=a.contractType,s=a.contractTplName;this.addTplForm={contractTplId:l,contractTplName:s,contractTypeCode:r.contractTypeCode,contractTplUrl:""},this.dialogTitle="合同模板-修改",this.fileList=[{name:s+".docx"}]}else this.isAdd=!0,this.addTplForm={contractTplName:"",contractTypeCode:"",contractTplUrl:""},this.fileList=[],this.dialogTitle="合同模板-添加"},submitAddTpl:function(){var t,e=this;this.$refs.addTplForm.validate((t=n()(r.a.mark(function t(a){var l;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!a){t.next=16;break}if(!e.isAdd||e.addTplForm.contractTplUrl){t.next=3;break}return t.abrupt("return",e.$message.error("请选择模板并上传文件"));case 3:if(l=void 0,"new"!==e.addTplSta){t.next=10;break}return t.next=7,e.$http.post(c.a.contractTpls,e.addTplForm);case 7:l=t.sent,t.next=13;break;case 10:return t.next=12,e.$http.put(c.a.contractTpls,e.addTplForm);case 12:l=t.sent;case 13:l&&(e.addTplDialog=!1,e.$message.success("操作成功"),e.getList(c.a.contractTpls)),t.next=17;break;case 16:return t.abrupt("return",!1);case 17:case"end":return t.stop()}},t,e)})),function(e){return t.apply(this,arguments)}))},handleFileSuccess:function(t,e){if(this.fileList=[e],0===t.code)this.addTplForm.contractTplUrl=t.data.contractTplUrl;else if(this.fileList=[],t.message)this.$message.error(t.message);else{var a=t.msg||"请稍后再试";this.$message.error(a)}},handleRemove:function(){this.addTplForm.contractTplUrl=""},beforeRemove:function(){return!1}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contract-receipts"},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{model:t.reqData,"label-width":"102px",inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"合同名称"}},[a("el-input",{attrs:{clearable:""},model:{value:t.reqData.contractTplName,callback:function(e){t.$set(t.reqData,"contractTplName",e)},expression:"reqData.contractTplName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"合同类型"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.reqData.contractTypeCode,callback:function(e){t.$set(t.reqData,"contractTypeCode",e)},expression:"reqData.contractTypeCode"}},t._l(t.contractsTypeList,function(t,e){return a("el-option",{key:e,attrs:{label:t.contractTypeName,value:t.contractTypeCode}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"所属省份"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.location,callback:function(e){t.location=e},expression:"location"}},t._l(t.province,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.reqData.contractTplStatus,callback:function(e){t.$set(t.reqData,"contractTplStatus",e)},expression:"reqData.contractTplStatus"}},t._l(t.statusList,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})}))],1)],1),t._v(" "),a("el-col",{attrs:{offset:8,span:8}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("查询")])],1)])],1),t._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:8}},[t.checkKey("templateMain_1")?a("el-button",{staticClass:"btn-search btn-add",attrs:{type:"primary"},on:{click:function(e){t.addTpl("new")}}},[t._v("添加")]):t._e()],1)],1)],1),t._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.itemList,height:"500",align:"center",stripe:""}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50",index:t.indexMethod}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"ss",label:"省市"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"contractTplName",label:"合同名称","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"合同类型","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.contractType?e.row.contractType.contractTypeName:""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.contractTplStatus?e.row.contractTplStatus.desc:""))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime",label:"创建时间","min-width":"165"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createUserName",label:"创建人"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"updateTime",label:"最后修改时间","min-width":"165"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"updateUserName",label:"最后修改人","min-width":"100"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",fixed:"right","min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"btn-handle",class:e.row.contractTplStatus&&1===e.row.contractTplStatus.code?"stop":"start",attrs:{type:"primary",disabled:!t.checkKey("templateMain_2")},on:{click:function(a){t.handleStatus(e.row)}}},[t._v("\n              "+t._s(e.row.contractTplStatus?1===e.row.contractTplStatus.code?"停用":"启用":"--")+"\n          ")]),t._v(" "),a("el-button",{staticClass:"btn-handle",attrs:{disabled:!t.checkKey("templateMain_3"),type:"primary"},on:{click:function(a){t.addTpl("revise",e.row)}}},[t._v("修改")])]}}])})],1)],1),t._v(" "),a("pagenation",{attrs:{pageparams:t.pageInfo,itemList:t.itemList},on:{handlePage:t.handlePage}}),t._v(" "),a("el-dialog",{staticClass:"m-dialog add-tpl-dialog",attrs:{title:t.dialogTitle,visible:t.addTplDialog,width:"30%"},on:{"update:visible":function(e){t.addTplDialog=e}}},[a("el-form",{ref:"addTplForm",attrs:{model:t.addTplForm,rules:t.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"合同名称",prop:"contractTplName"}},[a("el-input",{attrs:{disabled:!t.isAdd},model:{value:t.addTplForm.contractTplName,callback:function(e){t.$set(t.addTplForm,"contractTplName",e)},expression:"addTplForm.contractTplName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"合同类型",prop:"contractTypeCode"}},[a("el-select",{staticClass:"el-input-30",attrs:{disabled:!t.isAdd,clearable:"",placeholder:"请选择"},model:{value:t.addTplForm.contractTypeCode,callback:function(e){t.$set(t.addTplForm,"contractTypeCode",e)},expression:"addTplForm.contractTypeCode"}},t._l(t.contractsTypeList,function(t,e){return a("el-option",{key:e,attrs:{label:t.contractTypeName,value:t.contractTypeCode}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"上传模板"}},[a("el-upload",{ref:"upload",attrs:{headers:t.upHeaders,action:t.uploadUrl,accept:".docx","file-list":t.fileList,"on-success":t.handleFileSuccess,"on-remove":t.handleRemove,"before-remove":t.beforeRemove}},[a("el-button",{staticClass:"choose-file-btn",attrs:{slot:"trigger",size:"small",type:"primary"},slot:"trigger"},[t._v("选取文件")]),t._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传.docx文件")])],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"btn-save",attrs:{type:"primary"},on:{click:t.submitAddTpl}},[t._v("保存")]),t._v(" "),a("el-button",{staticClass:"btn-reset",attrs:{type:"primary"},on:{click:function(e){t.addTplDialog=!1}}},[t._v("取消")])],1)],1)],1)},staticRenderFns:[]};var p=a("vSla")(o,i,!1,function(t){a("SoPg")},null,null);e.default=p.exports}});
//# sourceMappingURL=86.44b23b8678594f80257f.js.map