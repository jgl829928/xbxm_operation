webpackJsonp([8],{"196Q":function(e,t){},A9zj:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}},"CZK+":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("aA9S"),i=n.n(a),s=n("3cXf"),o=n.n(s),r=n("A9zj"),l=n.n(r),c=n("lC5x"),u=n.n(c),d=n("J0Oq"),m=n.n(d),v=n("4YfN"),p=n.n(v),h=n("aozt"),_=n.n(h),f=n("9rMa"),g=n("mfbU"),b={data:function(){return{menuTree:[],props:{label:"name",children:"list"},addType:[{label:"菜单",value:1},{label:"页面",value:2}],disabled:!1,activeName:"1",payWay:[],sendData:{byname:"",menuId:0,method:3,name:"",menuType:"",num:0,parentIds:"",serveType:1,sys:"oms",url:"",buttons:[]},access_info_dialog:!1,dialogFormVisible:!1,formLabelWidth:"100px",modification:!1,rules:{name:[{required:!0,message:"请输入菜单名称",trigger:"blur"}],url:[{required:!0,message:"请选择一个页面",trigger:"change"}]}}},created:function(){this.getPages(),this.getMenu()},methods:p()({},Object(f.c)(["getPermission"]),{rightControl:function(e){return this.$store.getters.getPermission(e)},getMenu:function(){var e=this;return m()(u.a.mark(function t(){var n;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get(g.a.createMenu+"/"+parseInt(e.activeName));case 2:0===(n=t.sent).code?(e.menuTree=n.data,e.dataFliter(n.data)):e.$message.error(n.msg);case 4:case"end":return t.stop()}},t,e)}))()},dataFliter:function(e){for(var t in e)2===e[t].menuType.code?e[t].list=null:this.dataFliter(e[t].list)},getPages:function(){var e=this;return m()(u.a.mark(function t(){var n;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_.a.get("../../static/page.json");case 2:n=t.sent,e.payWay=n.data.pages;case 4:case"end":return t.stop()}},t,e)}))()},addMenuSite:function(e){this.dialogFormVisible=!0,this.sendData.method=e},append:function(e){this.dialogFormVisible=!0,this.sendData.menuType="page"===e?2:1,this.sendData.method="page"===e?4:3},addSendData:function(e,t){this.sendData.num=e.num,this.sendData.menuId=e.menuId,t&&(this.sendData.name=e.name,this.modification=!0)},pageSelete:function(e){var t=this;if(""!==e){var n=this.payWay.filter(function(t){return t.path===e});n[0].apis.forEach(function(e){var n={};n.desc=e.split(":")[1],n.funId=e.split(":")[0],t.sendData.buttons.push(n)}),this.sendData.name=n[0].label,this.sendData.byname=n[0].name}},initMenu:function(e){this.disabled=!0,this.dialogFormVisible=!0,this.sendData.menuType=e,this.sendData.method=e},deleteMenu:function(e,t){!t.list||t.list.length<=1?this.sendDelete(t.menuId):this.$message.warning("当前菜单下存在多个子菜单")},sendDelete:function(e){var t=this;return m()(u.a.mark(function n(){var a;return u.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.$http.delete(g.a.createMenu+"/"+e);case 2:0===(a=n.sent).code?t.$message.success("删除成功"):t.$message.error(a.message),t.getMenu();case 5:case"end":return n.stop()}},n,t)}))()},sendRqs:function(){var e=this;return m()(u.a.mark(function t(){var n,a,i;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.sendData.serveType=parseInt(e.activeName),n=void 0,!e.modification){t.next=9;break}return a=e.sendData,a.method,i=l()(a,["method"]),t.next=6,e.$http.put(g.a.createMenu,o()(i));case 6:n=t.sent,t.next=12;break;case 9:return t.next=11,e.$http.post(g.a.createMenu,o()(e.sendData));case 11:n=t.sent;case 12:0===n.code?e.$message.success(n.msg):e.$message.error(n.msg),e.closeDialog(),e.getMenu();case 15:case"end":return t.stop()}},t,e)}))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.sendRqs()})},closeDialog:function(e){i()(this.sendData,this.$options.data().sendData),this.dialogFormVisible=!1,this.disabled=!1,this.modification=!1}})},w={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"g-menu-content"},[a("el-tabs",{attrs:{type:"card"},on:{"tab-click":function(t){e.getMenu()}},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"运营后台",name:"1"}},[a("div",[a("div",{staticClass:"u-menu-title"},[e._v("功能菜单")]),e._v(" "),a("div",[e.menuTree&&0===e.menuTree.length?a("el-button",{staticClass:"btn-search u-add-btn",attrs:{type:"primary"},on:{click:function(t){e.initMenu(1)}}},[e._v("添加")]):e._e()],1),e._v(" "),a("el-tree",{staticClass:"m-menu-tree",attrs:{data:e.menuTree,"node-key":"id","default-expand-all":"","expand-on-click-node":!1,props:e.props},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.node,s=t.data;return a("span",{staticClass:"custom-tree-node"},[a("span",[e._v(e._s(i.label))]),e._v(" "),a("el-tooltip",{attrs:{placement:"right"}},[a("span",{staticClass:"u-operate-icon"},[a("img",{attrs:{src:n("W+Gm"),alt:""}})]),e._v(" "),1===s.menuType.code?a("div",{staticClass:"menu-bnt",attrs:{slot:"content"},slot:"content"},[a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.addMenuSite(1),e.addSendData(s)}}},[e._v("上方添加")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.addMenuSite(2),e.addSendData(s)}}},[e._v("下方添加")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.append("menu"),e.addSendData(s)}}},[e._v("添加子菜单")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.append("page"),e.addSendData(s)}}},[e._v("添加子页面")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_3"),expression:"rightControl('menuMain_3')"}],on:{click:function(t){e.append("menu"),e.addSendData(s,"modification")}}},[e._v("修改")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_4"),expression:"rightControl('menuMain_4')"}],on:{click:function(t){e.deleteMenu(i,s)}}},[e._v("删除")])]):a("div",{staticClass:"menu-bnt",attrs:{slot:"content"},slot:"content"},[a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.addMenuSite(1),e.addSendData(s)}}},[e._v("上方添加")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.addMenuSite(2),e.addSendData(s)}}},[e._v("下方添加")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_4"),expression:"rightControl('menuMain_4')"}],on:{click:function(t){e.deleteMenu(i,s)}}},[e._v("删除")])])])],1)}}])})],1)]),e._v(" "),a("el-tab-pane",{attrs:{label:"APP运营",name:"2"}},[a("div",[a("div",{staticClass:"u-menu-title"},[e._v("功能菜单")]),e._v(" "),a("div",[a("el-button",{staticClass:"btn-search u-add-btn",attrs:{type:"primary"},on:{click:function(t){e.initMenu(1)}}},[e._v("添加")])],1),e._v(" "),a("el-tree",{staticClass:"m-menu-tree",attrs:{data:e.menuTree,"node-key":"id","default-expand-all":"","expand-on-click-node":!1,props:e.props},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.node,s=t.data;return a("span",{staticClass:"custom-tree-node"},[a("span",[e._v(e._s(i.label))]),e._v(" "),a("el-tooltip",{attrs:{placement:"right"}},[a("span",{staticClass:"u-operate-icon"},[a("img",{attrs:{src:n("W+Gm"),alt:""}})]),e._v(" "),1===s.menuType.code?a("div",{staticClass:"menu-bnt",attrs:{slot:"content"},slot:"content"},[a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.addMenuSite(1),e.addSendData(s)}}},[e._v("上方添加")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.addMenuSite(2),e.addSendData(s)}}},[e._v("下方添加")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.append("menu"),e.addSendData(s)}}},[e._v("添加子菜单")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.append("page"),e.addSendData(s)}}},[e._v("添加子页面")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_3"),expression:"rightControl('menuMain_3')"}],on:{click:function(t){e.append("menu"),e.addSendData(s,"modification")}}},[e._v("修改")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_4"),expression:"rightControl('menuMain_4')"}],on:{click:function(t){e.deleteMenu(i,s)}}},[e._v("删除")])]):a("div",{staticClass:"menu-bnt",attrs:{slot:"content"},slot:"content"},[a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.addMenuSite(1),e.addSendData(s)}}},[e._v("上方添加")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.addMenuSite(2),e.addSendData(s)}}},[e._v("下方添加")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_4"),expression:"rightControl('menuMain_4')"}],on:{click:function(t){e.deleteMenu(i,s)}}},[e._v("删除")])])])],1)}}])})],1)]),e._v(" "),a("el-tab-pane",{attrs:{label:"APP商户",name:"3"}},[a("div",[a("div",{staticClass:"u-menu-title"},[e._v("功能菜单")]),e._v(" "),a("div",[a("el-button",{staticClass:"btn-search u-add-btn",attrs:{type:"primary"},on:{click:function(t){e.initMenu(1)}}},[e._v("添加")])],1),e._v(" "),a("el-tree",{staticClass:"m-menu-tree",attrs:{data:e.menuTree,"node-key":"id","default-expand-all":"","expand-on-click-node":!1,props:e.props},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.node,s=t.data;return a("span",{staticClass:"custom-tree-node"},[a("span",[e._v(e._s(i.label))]),e._v(" "),a("el-tooltip",{attrs:{placement:"right"}},[a("span",{staticClass:"u-operate-icon"},[a("img",{attrs:{src:n("W+Gm"),alt:""}})]),e._v(" "),1===s.menuType.code?a("div",{staticClass:"menu-bnt",attrs:{slot:"content"},slot:"content"},[a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.addMenuSite(1),e.addSendData(s)}}},[e._v("上方添加")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.addMenuSite(2),e.addSendData(s)}}},[e._v("下方添加")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.append("menu"),e.addSendData(s)}}},[e._v("添加子菜单")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.append("page"),e.addSendData(s)}}},[e._v("添加子页面")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_3"),expression:"rightControl('menuMain_3')"}],on:{click:function(t){e.append("menu"),e.addSendData(s,"modification")}}},[e._v("修改")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_4"),expression:"rightControl('menuMain_4')"}],on:{click:function(t){e.deleteMenu(i,s)}}},[e._v("删除")])]):a("div",{staticClass:"menu-bnt",attrs:{slot:"content"},slot:"content"},[a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.addMenuSite(1),e.addSendData(s)}}},[e._v("上方添加")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_2"),expression:"rightControl('menuMain_2')"}],on:{click:function(t){e.addMenuSite(2),e.addSendData(s)}}},[e._v("下方添加")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.rightControl("menuMain_4"),expression:"rightControl('menuMain_4')"}],on:{click:function(t){e.deleteMenu(i,s)}}},[e._v("删除")])])])],1)}}])})],1)])],1),e._v(" "),a("el-dialog",{staticClass:"s-dialog",attrs:{title:"权限-添加",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.sendData,rules:e.rules}},[1===e.sendData.method||2===e.sendData.method?a("el-form-item",{attrs:{label:"菜单类型","label-width":e.formLabelWidth}},[a("el-select",{attrs:{disabled:e.disabled,clearable:"",placeholder:"请选择"},model:{value:e.sendData.menuType,callback:function(t){e.$set(e.sendData,"menuType",t)},expression:"sendData.menuType"}},e._l(e.addType,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1):e._e(),e._v(" "),1===e.sendData.menuType?a("el-form-item",{attrs:{label:"菜单名称","label-width":e.formLabelWidth,prop:"name"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.sendData.name,callback:function(t){e.$set(e.sendData,"name","string"==typeof t?t.trim():t)},expression:"sendData.name"}})],1):e._e(),e._v(" "),2===e.sendData.menuType?a("el-form-item",{attrs:{label:"页面名称","label-width":e.formLabelWidth,prop:"url"}},[a("el-select",{attrs:{clearable:"",filterable:"",placeholder:"请选择"},on:{change:e.pageSelete},model:{value:e.sendData.url,callback:function(t){e.$set(e.sendData,"url",t)},expression:"sendData.url"}},e._l(e.payWay,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.path}})}))],1):e._e(),e._v(" "),2===e.sendData.menuType?a("el-form-item",{attrs:{label:"菜单URL","label-width":e.formLabelWidth}},[a("span",{staticClass:"u-special-color"},[e._v(e._s(e.sendData.url))])]):e._e()],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"btn-save",attrs:{type:"primary"},on:{click:function(t){e.submitForm("form")}}},[e._v("保 存")]),e._v(" "),a("el-button",{staticClass:"btn-reset",on:{click:function(t){e.closeDialog("form")}}},[e._v("取 消")])],1)],1),e._v(" "),a("el-dialog",{staticClass:"m-dialog",attrs:{title:"权限-详情",visible:e.access_info_dialog},on:{"update:visible":function(t){e.access_info_dialog=t}}},[a("el-form",{ref:"reqData",staticClass:"c-search-form",attrs:{"label-width":"110px",inline:!0,"label-position":"right"}},[a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:8}},[a("span",[e._v("菜单名称 ")]),e._v(" "),a("span",[e._v(e._s(1))])]),e._v(" "),a("el-col",{attrs:{span:16}},[a("span",[e._v("菜单URL别名 ")]),e._v(" "),a("span",[e._v(e._s(2))])])],1),e._v(" "),a("el-row",{attrs:{gutter:32}},[a("el-col",{attrs:{span:16}},[a("span",[e._v("菜单URL")]),e._v(" "),a("span",{staticClass:"u-special-color"},[e._v(e._s(3))])])],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"btn-save",attrs:{type:"primary"},on:{click:function(t){e.access_info_dialog=!1}}},[e._v("关闭")])],1)],1)],1)},staticRenderFns:[]};var M=n("vSla")(b,w,!1,function(e){n("o7Zx"),n("196Q")},"data-v-2fb01ec8",null);t.default=M.exports},"W+Gm":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAA41JREFUOBF9VF2IVVUU/ta5p+F6HSftxx8EY5g7M9nkIOmDGoUQ/fjggxGJ4iA+mFQgBTX3jk7MUcy5dyhJKYjoRaJUrOihH5zRHvIHBIeymGjmzs2iHwRjkJJznbn3nNW3t7OPNzX3w9nrfGutb6+fvbbgNkuL7bMwEW/EDPlEgrG/bmOaqPxEqhM017IVkJcxES0E9CJCvEu1OBPtya5E7KWkOHbKYW73nOB27c6+AcV7dN+HGY33SbHcbnSab1tn91x2E2IcBeLDJO5yfm6/OULBEFQeksL4+84IHtYgjr7SXHaE1DOB9Cr41QjV6DSxZimO73a2SRoO0PySOYjDCWS6UhIEcYKrCnrvX0biX6V//JLBNeici0p4muIQSV8wmI1Qg44GVKZWIOVdRlTZbBTo61MEgRXNR0SU27kEsMJdE0BYJfUch19LObw6SeAiovhvuv6CzOyZ0wRgSmtZ04fp9A8a/I9kz+gF54zwtxztyzJQ3uAwz14NYZkzXQtNAxj6kxIMh8bgWoN0ryUTuQdTtZ+JPWN1QeAx7E4SfurIzC6aa32UDkUSraxXaHfr4+zkIDLpWRKMXDE6dvUBxHocKf8p2Tv6/XT075CmDxnvmASjf/LaaD9TKteTWVnwBLv7iiMzGJvxI7+foRavtjaF0ueM8k1yPI2w9ofubF/uM8YDJDzM05qoPCSF0iFrjPgO4jfdAup8HjRlbKbrvJ/ifvqPoFp71pNC+Qi8VAvBY4jjD21axhreEF2e1x0PzrO//Gi+JQvVrfD9Ew5LdsV8ZPy3/hOB5lv3sEY+iqUeczrruJ11ZARMS8DrgU1Qr1cGxg4mRBQ017EIOvmtDIzfnUyKBqt9VH5fx3QCd2VkoHRA89mTnBw2CA0kX0+yM4ZMdyxegNrUIPMmx+S9LJ29TkmErMFB1qyJp9iZNU7/t+wgmLsr3ktA6msgWoTC2JcmkOuPg+hlntthx2maycjamzX1vWFVmyywbOnbUvzpBymWvkiyqrfkpe0j6RYWdxWuahoanWDUadrMh6SW8rk67+y1u+U8R/U56S+ddZjZr0fIH6a7Cyl5DZXaOXbc1O5VjtUCePIiyQeNA9Nt5DBspNjJBi43WP1KalgPak/bIySpyOuj9jFQM2bhBxE7PcxD2tiAb9iMk2i+c59sGzbdT9YtCRNtnaC97c2oRY8h3fixBN+x3rde/wLvpmFCKAMbogAAAABJRU5ErkJggg=="},o7Zx:function(e,t){}});
//# sourceMappingURL=8.e3ab61e477c04306c12a.js.map