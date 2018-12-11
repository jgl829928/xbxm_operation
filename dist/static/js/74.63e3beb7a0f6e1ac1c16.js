webpackJsonp([74],{HgFt:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0__api_boothApi__=__webpack_require__("UpQb"),__WEBPACK_IMPORTED_MODULE_1__api_apiSetting__=__webpack_require__("eMGh");__webpack_exports__.a={name:"boothMap",computed:{currentUser:function(){return this.$store.state.currentUser}},data:function(){return{displayFla:!1,ProvincesList:[],areaCode:"510",shopList:[],marketCode:"51000007",address:{areaCode:510,marketCode:51000007},particularsData:{area:"",boothCode:"",boothNumber:"",boothPrice:"",boothStatus:"",boothType:"",calculateArea:"",contractBatchNum:"",floor:"",manager:"",marketCode:"",merchantName:"",rentBeginTime:"",rentEndTime:"",units:"",usableArea:""}}},mounted:function(){var a=this,t=this;this.address.marketCode=this.currentUser.marketCode||"51000007",this.marketCode=this.currentUser.marketCode||"51000007",vueThis=this,httpApi=__WEBPACK_IMPORTED_MODULE_0__api_boothApi__.a.boothMapParticulars,this.boothMap(this.address),this.$http.get(__WEBPACK_IMPORTED_MODULE_0__api_boothApi__.a.areasMarket).then(function(t){0===t.code&&(a.ProvincesList=t.data)}),this.$http.get(__WEBPACK_IMPORTED_MODULE_0__api_boothApi__.a.marketsName,{params:{areaCode:this.areaCode}}).then(function(a){0===a.code&&(t.shopList=a.data)})},methods:{rightControl:function(a){return this.$store.getters.getPermission(a)},selectArea:function(a){var t=this;this.$http.get(__WEBPACK_IMPORTED_MODULE_0__api_boothApi__.a.marketsName,{params:{areaCode:a}}).then(function(a){0===a.code&&(t.shopList=a.data,t.marketCode="")})},select:function(){var a={areaCode:this.areaCode,marketCode:this.marketCode};$(".floorsUI").remove(),this.boothMap(a)},map:function(a){var t=IndoorMap({mapDiv:"indoor3d",dim:"2d"});t.load(a,function(){t.showAreaNames(!0).setSelectable(!0);var a=IndoorMap.getUI(t);document.querySelector(".g-booth-map").appendChild(a)})},boothMap:function boothMap(data){var _this3=this,mapData={};this.$http.get(__WEBPACK_IMPORTED_MODULE_0__api_boothApi__.a.boothMap,{params:data}).then(function(res){if(0==res.code){for(var floorList=res.data.boothArray.boothMapList,boothList=res.data.boothNumberList,floorS=[],i=0;i<floorList.length;i++){var _id,Name,floorOutline,floorOutlineList=[],cToObj;floorOutline=eval("("+floorList[i].boothMap.coordinate+")");var blankAreaCoordinate=floorList[i].boothMap.blankAreaCoordinate;cToObj=eval("("+blankAreaCoordinate+")");var floorData={PubPoint:[],Outline:floorOutline,FuncAreas:cToObj,_id:i,floor:floorList[i].boothMap.floor,Name:floorList[i].boothMap.floor+"层"};floorS.push(floorData)}for(var j=0;j<floorS.length;j++)for(var boothData=boothList[floorS[j].floor]||[],_i=0;_i<boothData.length;_i++){var boothOutline,boothCoordinateList=[];boothData[_i].boothCoordinate=boothData[_i].boothCoordinate||"[[[0,0]]]",boothCoordinateList=eval("("+boothData[_i].boothCoordinate+")");var data={Center:[0,0],Outline:boothCoordinateList,Category:boothData[_i].boothStatus.code,Name:boothData[_i].boothNumber,BrandShop:boothData[_i].boothCode};floorS[j].FuncAreas.push(data)}mapData.data={Floors:floorS,building:{DefaultFloor:0,Name:res.data.boothArray.marketName}},_this3.map(mapData)}})},close:function(){this.displayFla=!1,$(".dialog-map").addClass("displayFla"),$(".masking").addClass("displayFla")}}}},fbPY:function(a,t){},lLrU:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=e("HgFt"),o={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"g-booth-map"},[e("div",{directives:[{name:"show",rawName:"v-show",value:a.rightControl("boothMap_1"),expression:"rightControl('boothMap_1')"}],staticClass:"Filter"},[e("el-select",{attrs:{clearable:"",placeholder:"省市"},on:{change:a.selectArea},model:{value:a.areaCode,callback:function(t){a.areaCode="string"==typeof t?t.trim():t},expression:"areaCode"}},a._l(a.ProvincesList,function(a,t){return e("el-option",{key:t,attrs:{label:a.areaName,value:a.areaCode}})})),a._v(" "),e("el-select",{attrs:{clearable:"",placeholder:"商场名称"},model:{value:a.marketCode,callback:function(t){a.marketCode="string"==typeof t?t.trim():t},expression:"marketCode"}},a._l(a.shopList,function(a,t){return e("el-option",{key:t,attrs:{label:a.marketName,value:a.marketCode}})})),a._v(" "),e("el-button",{staticClass:"btn-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:a.select}},[a._v("查询")])],1),a._v(" "),e("div",{staticClass:"masking",class:a.displayFla?"":"displayFla",on:{click:a.close}}),a._v(" "),e("div",{staticClass:"dialog-map",class:a.displayFla?"":"displayFla"},[e("div",{staticClass:"dialog-title"},[a._v("摊位 - 详情")]),a._v(" "),e("div",{staticClass:"dialog-content"},[e("el-form",[e("el-row",{attrs:{gutter:32}},[e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{attrs:{label:"摊位号"}},[e("span",{staticClass:"boothNumber gray"},[a._v(a._s(a.particularsData.boothNumber))])])],1),a._v(" "),e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{staticClass:"boothCodeChunk",attrs:{label:"摊位编号"}},[e("span",{staticClass:"boothCode gray"},[a._v(a._s(a.particularsData.boothCode))])])],1)],1),a._v(" "),e("el-row",{attrs:{gutter:32}},[e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{attrs:{label:"商场名称"}},[e("span",{staticClass:"marketName gray"},[a._v(a._s(a.particularsData.marketName))])])],1),a._v(" "),e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{attrs:{label:"摊位类型"}},[e("span",{staticClass:"boothType gray"},[a._v(a._s(a.particularsData.boothType))])])],1)],1),a._v(" "),e("el-row",{attrs:{gutter:32}},[e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{attrs:{label:"楼层经理"}},[e("span",{staticClass:"manager gray"},[a._v(a._s(a.particularsData.manager))])])],1),a._v(" "),e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{attrs:{label:"楼层"}},[e("span",{staticClass:"floor gray"},[a._v(a._s(a.particularsData.floor))])])],1)],1),a._v(" "),e("el-row",{attrs:{gutter:32}},[e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{attrs:{label:"区域"}},[e("span",{staticClass:"area gray"},[a._v(a._s(a.particularsData.area))])])],1),a._v(" "),e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{attrs:{label:"状态"}},[e("span",{staticClass:"boothStatus gray"},[a._v(a._s(a.particularsData.boothStatus))])])],1)],1),a._v(" "),e("el-row",{attrs:{gutter:32}},[e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{attrs:{label:"计租面积"}},[e("span",{staticClass:"calculateArea gray"},[a._v(a._s(a.particularsData.calculateArea))])])],1),a._v(" "),e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{attrs:{label:"使用面积"}},[e("span",{staticClass:"usableArea gray"},[a._v(a._s(a.particularsData.usableArea))])])],1)],1),a._v(" "),e("el-row",{attrs:{gutter:32}},[e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{attrs:{label:"摊位单价"}},[e("span",{staticClass:"boothPrice gray"},[a._v(a._s(a.particularsData.boothPrice))])])],1),a._v(" "),e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{attrs:{label:"单位"}},[e("span",{staticClass:"units gray"},[a._v(a._s(a.particularsData.units))])])],1)],1),a._v(" "),e("el-row",{attrs:{gutter:32}},[e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{attrs:{label:"合同编号"}},[e("span",{staticClass:"contractBatchNum gray"},[a._v(a._s(a.particularsData.contractBatchNum))])])],1),a._v(" "),e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{attrs:{label:"商户名称"}},[e("span",{staticClass:"merchantName gray"},[a._v(a._s(a.particularsData.merchantName))])])],1)],1),a._v(" "),e("el-row",{attrs:{gutter:32}},[e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{staticClass:"rentTime",attrs:{label:"合同开始日期"}},[e("span",{staticClass:"rentBeginTime gray"},[a._v(a._s(a.particularsData.rentBeginTime))])])],1),a._v(" "),e("el-col",{attrs:{span:12,xs:24}},[e("el-form-item",{staticClass:"rentTime",attrs:{label:"合同结束日期"}},[e("span",{staticClass:"rentEndTime gray"},[a._v(a._s(a.particularsData.rentEndTime))])])],1)],1)],1),a._v(" "),e("div",{staticClass:"dialog-footer"},[e("el-button",{staticClass:"btn-primary btn-save",attrs:{type:"primary"},on:{click:a.close}},[a._v("取 消")])],1)],1)]),a._v(" "),e("div",{staticStyle:{width:"750px",height:"600px",top:"20px",left:"6%",position:"relative","z-index":"2"},attrs:{id:"indoor3d"}}),a._v(" "),a._m(0)])},staticRenderFns:[function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"statusColor"},[e("ul",[e("li",[e("div",{staticClass:"unrentable"}),a._v(" "),e("span",[a._v("未出租")])]),a._v(" "),e("li",[e("div",{staticClass:"alreadyTaken"}),a._v(" "),e("span",[a._v("已出租")])]),a._v(" "),e("li",[e("div",{staticClass:"payment"}),a._v(" "),e("span",[a._v("交款期")])]),a._v(" "),e("li",[e("div",{staticClass:"predetermine"}),a._v(" "),e("span",[a._v("已预定")])]),a._v(" "),e("li",[e("div",{staticClass:"expire"}),a._v(" "),e("span",[a._v("合同即将到期")])]),a._v(" "),e("li",[e("div",{staticClass:"authstr"}),a._v(" "),e("span",[a._v("签约待审核")])]),a._v(" "),e("li",[e("div",{staticClass:"Arrears"}),a._v(" "),e("span",[a._v("欠款待缴费")])])])])}]};var r=function(a){e("fbPY")},i=e("VU/8")(s.a,o,!1,r,"data-v-3166896c",null);t.default=i.exports}});
//# sourceMappingURL=74.63e3beb7a0f6e1ac1c16.js.map