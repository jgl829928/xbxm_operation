webpackJsonp([33],{BkVI:function(e,t){},FjHB:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("lC5x"),i=a.n(l),r=a("J0Oq"),n=a.n(r),s=a("IHPB"),o=a.n(s),c=a("rVsN"),d=a.n(c),p=a("hm3b"),m=a("hVDB"),g={name:"advertising",components:{Pagenation:p.a},data:function(){return{dialogVisible:!1,pageDefault:{totalRecords:0,currentPage:1,pageSize:20},pageParams:{marketCode:"",billboardCode:"",currentPage:1},storeNameOption:[],advertiseList:[],tableList:[],gridData:[],storeOptionDisabled:!1}},methods:{getOptionData:function(){var e=this,t=this.$http.get(m.a.allStore);d.a.all([t]).then(function(t){if(0===t[0].code){e.storeNameOption=[],e.storeNameOption=[].concat(o()(t[0].data));var a=e.$store.getters.currentUser.marketCode;console.log("advertising",a),a&&(e.pageParams.marketCode=a,e.storeOptionDisabled=!0,e.getAdvertiseOptionData())}})},getAdvertiseOptionData:function(){var e=this;if(""!==this.pageParams.marketCode){var t=this.$http.get(m.a.selectAdvertiseOption+"?marketCode="+this.pageParams.marketCode);d.a.all([t]).then(function(t){0===t[0].code&&(e.advertiseList=[],e.advertiseList=[].concat(o()(t[0].data)))})}else this.advertiseList=[]},getPageList:function(e){var t=this;return n()(i.a.mark(function a(){var l;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.pageParams.currentPage=e||1,t.pageDefault.currentPage=e||1,a.next=4,t.$http.get(m.a.advertising,{params:t.pageParams});case 4:0===(l=a.sent).code&&(t.pageDefault.totalRecords=l.page.totalRecords,t.tableList=[],t.tableList=[].concat(o()(l.data)));case 6:case"end":return a.stop()}},a,t)}))()},indexMethod:function(e){return e+20*(this.pageParams.currentPage-1)+1},openFollowRecord:function(e){var t=this,a=e;this.$http.get(m.a.advertisingFollowList+"/"+a).then(function(e){e.code,t.gridData=[],t.gridData=[].concat(o()(e.data))}),this.dialogVisible=!0}},beforeMount:function(){this.getOptionData(),this.getPageList()}},b={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contract-receipts advertising"},[a("el-form",{ref:"pageParams",staticClass:"c-search-form",attrs:{model:e.pageParams,inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"商场",prop:"skuCode"}},[a("el-select",{attrs:{disabled:e.storeOptionDisabled,clearable:"",placeholder:"请选择"},on:{change:e.getAdvertiseOptionData},model:{value:e.pageParams.marketCode,callback:function(t){e.$set(e.pageParams,"marketCode","string"==typeof t?t.trim():t)},expression:"pageParams.marketCode"}},e._l(e.storeNameOption,function(e,t){return a("el-option",{key:t,attrs:{label:e.marketName,value:e.marketCode}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"广告位",prop:"skuCode"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.pageParams.billboardCode,callback:function(t){e.$set(e.pageParams,"billboardCode","string"==typeof t?t.trim():t)},expression:"pageParams.billboardCode"}},e._l(e.advertiseList,function(e,t){return a("el-option",{key:t,attrs:{label:e.billboardName,value:e.billboardCode}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getPageList(1)}}},[e._v("查询")])],1)])],1)],1),e._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableList,align:"center",stripe:"",height:"500"}},[a("el-table-column",{attrs:{align:"center",type:"index",label:"序号",width:"50",index:e.indexMethod}}),e._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"110",prop:"marketName",label:"商场"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"110",prop:"billboardName",label:"广告位"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"110",prop:"coCode",label:"意向广告位编号"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"110",align:"center",prop:"merchantName",label:"申请人"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120",align:"center",prop:"phoneNumber",label:"联系电话"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"intentionBeginTime","min-width":"165",label:"意向开始投放时间"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime","min-width":"165",label:"申请时间"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"110",prop:"origin.desc",label:"来源"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"110",align:"center",prop:"followedStatus.desc",label:"跟进状态"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"110",label:"跟进记录",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"btn-handle",attrs:{disabled:!e.$store.getters.getPermission("advertising_2"),type:"primary"},on:{click:function(a){e.openFollowRecord(t.row.bdApplyRgCode)}}},[e._v("查看")])]}}])})],1)],1),e._v(" "),a("Pagenation",{attrs:{pageparams:e.pageDefault,itemList:e.tableList},on:{handlePage:e.getPageList}}),e._v(" "),a("el-dialog",{staticClass:"l-dialog",attrs:{title:"跟进记录",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticClass:"c-table-wrap"},[a("el-table",{attrs:{align:"center",data:e.gridData,stripe:""}},[a("el-table-column",{attrs:{prop:"followedStatus.desc",label:"状态变更",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"跟进说明",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"one-line",attrs:{title:t.row.comment}},[e._v(e._s(t.row.comment))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"createUserName",label:"跟进人",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"申请时间","min-width":"120",align:"center"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"btn-save",attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("关 闭")])],1)])],1)},staticRenderFns:[]};var u=a("vSla")(g,b,!1,function(e){a("BkVI"),a("bsRM")},"data-v-63c3dd7e",null);t.default=u.exports},bsRM:function(e,t){}});
//# sourceMappingURL=33.8dc39374d460b4bb3159.js.map