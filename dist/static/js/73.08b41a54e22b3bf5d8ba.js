webpackJsonp([73],{GLSV:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),r=a.n(n),s=a("exGp"),i=a.n(s),l=a("Gu7T"),o=a.n(l),c=a("//Fk"),d=a.n(c),m=a("hm3b"),p=a("hVDB"),u={name:"rental",components:{Pagenation:m.a},data:function(){return{pageDefault:{totalRecords:0,currentPage:1,pageSize:20},pageParams:{marketCode:"",billboardCode:"",currentPage:1},tableList:[],storeNameOption:[],advertiseList:[],storeOptionDisabled:!1}},methods:{getOptionData:function(){var e=this,t=this.$http.get(p.a.allStore);d.a.all([t]).then(function(t){if(0===t[0].code){e.storeNameOption=[],e.storeNameOption=[].concat(o()(t[0].data));var a=e.$store.getters.currentUser.marketCode;a&&(e.pageParams.marketCode=a,e.storeOptionDisabled=!0,e.getAdvertiseOptionData())}})},getAdvertiseOptionData:function(){var e=this;""===this.pageParams.marketCode?this.advertiseList=[]:this.$http.get(p.a.selectAdvertiseOption+"?marketCode="+this.pageParams.marketCode+"&bdStatus=").then(function(t){0===t.code&&(e.advertiseList=[],e.advertiseList=[].concat(o()(t.data)))})},getPageList:function(e){var t=this;return i()(r.a.mark(function a(){var n;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.pageParams.currentPage=e||1,t.pageDefault.currentPage=e||1,a.next=4,t.$http.get(p.a.advertiseRentalList,{params:t.pageParams});case 4:0===(n=a.sent).code&&(t.pageDefault.totalRecords=n.page.totalRecords,t.tableList=[],t.tableList=[].concat(o()(n.data)));case 6:case"end":return a.stop()}},a,t)}))()},deleteRental:function(e){var t=this;this.$confirm("确认删除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.delete(p.a.advertiseRentalList+"/"+e).then(function(e){0===e.code?(t.$message.success(e.msg),t.getPageList()):t.$message.error(e.msg)})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},isStartUseBillboard:function(e,t){var a=this;this.$http.put(p.a.isStartUseBillboards+"/"+e+"?bdStatus="+t).then(function(e){0===e.code?(a.$message.success(e.msg),a.getPageList()):a.$message.error(e.msg)})},modifyRental:function(e){this.$router.push({name:"editRental",params:{id:e}})},indexMethod:function(e){return e+20*(this.pageParams.currentPage-1)+1}},beforeMount:function(){this.getOptionData(),this.getPageList()}},g={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contract-receipts rental-manage"},[a("el-form",{ref:"pageParams",staticClass:"c-search-form",attrs:{model:e.pageParams,inline:!0,"label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"商场",prop:"skuCode"}},[a("el-select",{attrs:{disabled:e.storeOptionDisabled,clearable:"",placeholder:"请选择"},on:{change:e.getAdvertiseOptionData},model:{value:e.pageParams.marketCode,callback:function(t){e.$set(e.pageParams,"marketCode","string"==typeof t?t.trim():t)},expression:"pageParams.marketCode"}},e._l(e.storeNameOption,function(e,t){return a("el-option",{key:t,attrs:{label:e.marketName,value:e.marketCode}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"广告位",prop:"skuCode"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.pageParams.billboardCode,callback:function(t){e.$set(e.pageParams,"billboardCode","string"==typeof t?t.trim():t)},expression:"pageParams.billboardCode"}},e._l(e.advertiseList,function(e,t){return a("el-option",{key:t,attrs:{label:e.billboardName,value:e.billboardCode}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"c-footer-btn"},[a("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.getPageList(1)}}},[e._v("查询")])],1)])],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.$store.getters.getPermission("rental_2"),expression:"$store.getters.getPermission('rental_2')"}]},[a("router-link",{attrs:{to:{name:"addRental"}}},[a("el-button",{staticClass:"btn-add btn-search",attrs:{type:"primary",icon:"el-icon-add"}},[e._v("添加出租信息")])],1)],1),e._v(" "),a("div",{staticClass:"c-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableList,align:"center",stripe:"",height:"500"}},[a("el-table-column",{attrs:{align:"center",label:"序号","min-width":"145",prop:"bdRentCode"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"100",align:"center",prop:"marketName",label:"商场"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"100",align:"center",prop:"billboardName",label:"广告位"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"100",align:"center",prop:"merchantName",label:"投放商户"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"beginTime","min-width":"120",label:"开始日期"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"endTime","min-width":"120",label:"结束日期"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"100",prop:"duration",align:"center",label:"时长(天)"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"110",align:"center",prop:"signPrice",label:"签约价格"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.signPrice.toFixed(2)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"100",align:"center",prop:"finalPrice",label:"结算价格"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.finalPrice.toFixed(2)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"100",align:"center",prop:"createUserName",label:"登记人"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"createTime","min-width":"120",label:"登记日期"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"200",label:"操作",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"btn-handle",attrs:{disabled:!e.$store.getters.getPermission("rental_3"),type:"primary"},on:{click:function(a){e.modifyRental(t.row.bdRentCode)}}},[e._v("修改")]),e._v(" "),a("el-button",{staticClass:"btn-handle btn-add",attrs:{disabled:!e.$store.getters.getPermission("rental_4"),type:"primary"},on:{click:function(a){e.deleteRental(t.row.bdRentCode)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),a("Pagenation",{attrs:{pageparams:e.pageDefault,itemList:e.tableList},on:{handlePage:e.getPageList}})],1)},staticRenderFns:[]};var b=a("VU/8")(u,g,!1,function(e){a("fnHu"),a("g7ci")},"data-v-0260c3b5",null);t.default=b.exports},fnHu:function(e,t){},g7ci:function(e,t){}});
//# sourceMappingURL=73.08b41a54e22b3bf5d8ba.js.map