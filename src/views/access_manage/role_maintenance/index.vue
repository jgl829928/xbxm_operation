<template>
  <div class="contract-receipts">
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true" label-position="right">
      <el-row>
        <el-col :span="8" :xs="24">
          <el-form-item label="角色名称" prop="name" min-width="110">
            <el-input clearable v-model.trim="reqData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label="所属组织架构" prop="affiliation">
            <el-select v-model="reqData.affiliation" clearable placeholder="请选择">
              <el-option label="总部" :value=1></el-option>
              <el-option label="商场" :value=2>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label="状态" prop="available">
            <el-select v-model="reqData.available" clearable placeholder="请选择">
              <el-option label="启用" value=1></el-option>
              <el-option label="停用" value=0>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="16">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-button class="btn-search btn-add" type="primary" v-show="$store.getters.getPermission('roleMain_2')" @click="add">添加</el-button>
    </div>
    <div class="c-table-wrap">
      <el-table :data="itemList" style="width: 100%" align="center" stripe height="500">
        <el-table-column align="center" type="index" label="序号" width="50" :index="indexMethod">
        </el-table-column>
        <el-table-column align="center" prop="name" label="角色名称">
        </el-table-column>
        <el-table-column align="center" prop="affiliation" label="所属组织架构" min-width="85">
          <template slot-scope="scope">
            <p>{{scope.row.affiliation.desc}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="available" label="状态">
          <template slot-scope="scope">
            <p>{{scope.row.available.desc}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="登记时间" min-width="165">
        </el-table-column>
        <el-table-column align="center" prop="creater" label="登记人">
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="230">
          <template slot-scope="scope">
            <el-button class="btn-handle" type="primary" :disabled="!$store.getters.getPermission('roleMain_3')" @click="edit(scope.$index,scope.row)">
              修改
            </el-button>
            <el-button class="btn-handle" type="primary" :disabled="!$store.getters.getPermission('roleMain_5')" @click="distribute_access(scope.$index,scope.row)">
              分配权限
            </el-button>
            <el-button class="btn-handle" type="primary" :disabled="!$store.getters.getPermission('roleMain_4')" @click="access_info(scope.$index,scope.row)">
              权限详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <pagenation :pageparams="pageparams" :itemList="itemList" @handlePage="handlePage"></pagenation>
    </div>
    <!-- 权限添加 -->
    <el-dialog :title="dialog_title" :visible.sync="dialogFormVisible" class="s-dialog" @close="clean_data">
      <el-form :model="add_data" :rules="add_rules" ref="add_form">
        <el-form-item label="所属组织架构" :label-width="formLabelWidth" prop="affiliation">
          <el-select v-model="add_data.affiliation" clearable placeholder="请选择">
            <el-option label="总部" :value=1></el-option>
            <el-option label="商场" :value=2></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model.trim="add_data.name" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="available">
          <el-radio-group v-model="add_data.available">
            <el-radio :label="1" value=1>启用</el-radio>
            <el-radio :label="0" value=0>停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save_data" class="btn-save">保 存</el-button>
        <el-button @click="dialogFormVisible = false" class="btn-reset">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 权限分配弹框 -->
    <el-dialog title="权限-分配" :visible.sync="access_dialogVisible" class="m-dialog access-dialog">
      <el-row :gutter="32">
        <el-col :span="16">
          <div class="u-roleInfo-item">
            <label>角色名称</label>
            <span>{{distribute_name}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="u-roleInfo-item">
            <label>所属组织架构</label>
            <span>{{distribute_affiliation}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="24">
          <div class="u-menu-title">运营后台功能菜单</div>
          <el-scrollbar style="height:400px">
            <el-tree :data="distribute_operate" :default-checked-keys="distribute_operate_check" show-checkbox node-key="menuId"
              :props="defaultProps" ref="operate_tree">
            </el-tree>
          </el-scrollbar>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="24">
          <div class="u-menu-title">APP运营功能菜单</div>
            <el-tree :data="distribute_app_operate" :default-checked-keys="app_operate_check" show-checkbox node-key="menuId"
              :props="defaultProps" ref="appOperate_tree">
            </el-tree>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="24">
          <div class="u-menu-title">APP商户功能菜单</div>
            <el-tree :data="distribute_app_merchant" :default-checked-keys="app_merchant_check" show-checkbox node-key="menuId"
              :props="defaultProps" ref="appMerchant_tree">
            </el-tree>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-save" type="primary" @click="distribute_save">保存</el-button>
        <el-button class="btn-reset" type="primary" @click="access_dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 权限详情弹窗 -->
    <el-dialog title="权限-详情" :visible.sync="accessInfo_dialog" class="m-dialog access-dialog">
      <el-row :gutter="32">
        <el-col :span="16">
          <div class="u-roleInfo-item">
            <label>角色名称</label>
            <span>{{accessInfo.name}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="u-roleInfo-item">
            <label>所属组织架构</label>
            <span>{{accessInfo.affiliation}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="24">
          <div class="u-menu-title">运营后台功能菜单</div>
          <el-scrollbar style="height: 400px">
            <el-tree :data="menuTree.operate" node-key="menuId" :props="defaultProps">
            </el-tree>
          </el-scrollbar>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="24">
          <div class="u-menu-title">APP运营功能菜单</div>
            <el-tree :data="menuTree.app_operate" node-key="menuId" :props="defaultProps">
            </el-tree>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="24">
          <div class="u-menu-title">APP商户功能菜单</div>
            <el-tree :data="menuTree.app_merchant" node-key="menuId" :props="defaultProps">
            </el-tree>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-save" type="primary" @click="accessInfo_dialog = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ApiSetting from "../../../api/access-manage";
  import pagenation from "@/components/pagenation";
  export default {
    data() {
      return {
        reqData: {
          currentPage: 1,
          pageSize: 20,
          affiliation: "",
          available: "",
          name: ""
        },
        itemList: [],
        pageparams: {},
        dialog_title: "",
        add_data: {
          affiliation: 1,
          available: 1,
          name: ""
        },
        add_rules: {
          name: [
            { required: true, message: "请输入角色名称", trigger: "blur" },
            { max: 32, message: "角色名称不能多于32个字符", trigger: "blur" }
          ]
        },
        edit_id: "",
        dialogFormVisible: false,

        access_dialogVisible: false,
        distribute_name: "",
        distribute_affiliation: "",
        distribute_id: "",
        distribute_app_merchant: [],
        distribute_app_operate: [],
        distribute_operate: [],

        distribute_operate_check: [],
        app_operate_check: [],
        app_merchant_check: [],

        tree_checked: [],

        accessInfo_dialog: false,
        accessInfo_id: "",
        accessInfo: {},
        menuTree: {},
        form: {
          name: "",
          state: true
        },
        rules: {
          name: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
        },
        formLabelWidth: "100px",

        defaultProps: {
          children: "list",
          label: "name"
        }
      };
    },
    components: { pagenation },
    name: "roleMain",
    methods: {
      // 所有平台的所有权限
      getOtherData(num) {
        let muens = `${ApiSetting.menus}/${num}`;
        this.$http.get(muens).then(res => {
          if (res && res.code === 0 && res.data) {
            switch (num) {
              case 1:
                this.distribute_operate = res.data;
                break;
              case 2:
                this.distribute_app_operate = res.data;
                break;
              case 3:
                this.distribute_app_merchant = res.data;
                break;
              default:
                break;
            }
          } else {
          }
        });
      },
      // 列表信息
      getListData() {
        this.$http
          .get(ApiSetting.roleList, { params: this.reqData })
          .then(res => {
            if (res && res.code === 0 && res.data) {
              this.itemList = res.data;
              this.pageparams = res.page;
            } else {
              this.itemList = [];
            }
          });
      },
      search() {
        this.reqData.currentPage = 1;
        this.getListData();
      },
      indexMethod(index) {
        return index + (this.reqData.currentPage - 1) * 20 + 1;
      },
      // 翻页
      handlePage(val) {
        this.reqData.currentPage = val;
        this.getListData();
      },
      // 添加角色
      add() {
        this.dialogFormVisible = true;
        this.dialog_title = "角色-添加";
        setTimeout(() => {
          this.$refs["add_form"].resetFields();
        }, 50);
      },
      clean_data() {
        Object.assign(this.add_data, this.$options.data().add_data);
      },
      // 编辑角色
      edit(index, row) {
        this.dialogFormVisible = true;
        this.dialog_title = "角色-修改";
        this.edit_id = row.roleId;
        this.add_data = {
          affiliation: row.affiliation.code,
          available: row.available.code,
          name: row.name
        };
      },
      // 保存添加或修改的数据
      save_data() {
        this.$refs["add_form"].validate(valid => {
          if (valid) {
            if (this.dialog_title === "角色-添加") {
              this.$http
                .post(ApiSetting.operate_role, this.add_data)
                .then(res => {
                  if (res && res.code === 0) {
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    this.dialogFormVisible = false;
                    this.getListData();
                  }
                });
            } else {
              let edit_data = Object.assign({}, this.add_data);
              edit_data.roleId = this.edit_id;
              this.$http.put(ApiSetting.operate_role, edit_data).then(res => {
                if (res && res.code === 0) {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                  this.dialogFormVisible = false;
                  this.getListData();
                }
              });
            }
          }
        });
      },

      // 分配权限
      distribute_access(index, row) {
        this.access_dialogVisible = true;
        this.distribute_id = row.roleId;
        this.distribute_name = row.name;
        this.distribute_affiliation = row.affiliation.desc;
        let roleInfo = `${ApiSetting.operate_role}/${row.roleId}`;
        this.$http.get(roleInfo).then(res => {
          if (res && res.code === 0 && res.data) {
            this.tree_checked = [];
            if (
              res.data.menuTree &&
              res.data.menuTree.operate &&
              res.data.menuTree.operate.length !== 0
            ) {
              this.$refs.operate_tree.setCheckedKeys(
                this.filterIds(res.data.menuTree.operate)
              );
            }
            if (
              res.data.menuTree &&
              res.data.menuTree.app_operate &&
              res.data.menuTree.app_operate.length !== 0
            ) {
              this.$refs.appOperate_tree.setCheckedKeys(
                this.filterIds(res.data.menuTree.app_operate)
              );
            }
            if (
              res.data.menuTree &&
              res.data.menuTree.app_merchant &&
              res.data.menuTree.app_merchant.length !== 0
            ) {
              this.$refs.appMerchant_tree.setCheckedKeys(
                this.filterIds(res.data.menuTree.app_merchant)
              );
            }
          }
        });
      },

      filterIds(data) {
        if (data && data.length !== 0) {
          data.forEach((item, index) => {
            if (item.menuType.code == 4) this.tree_checked.push(item.menuId);
            else this.filterIds(item.list);
          });
          return this.tree_checked;
        }
      },

      // 权限分配保存数据
      distribute_save() {
        let node = this.$refs.operate_tree.getCheckedNodes(true, true);
        let node1 = this.$refs.appOperate_tree.getCheckedNodes(true, true);
        let node2 = this.$refs.appMerchant_tree.getCheckedNodes(true, true);
        let parentIds = new Set();
        this.processData(node, parentIds);
        this.processData(node1, parentIds);
        this.processData(node2, parentIds);
        let param = {
          menuIds: Array.from(parentIds),
          roleId: this.distribute_id
        };
        this.$http.post(ApiSetting.distribute_access, param).then(res => {
          if (res && res.code === 0) this.$message.success("保存成功");
          this.access_dialogVisible = false;
          this.getListData();
        });
      },

      //  提交数据处理
      processData(node, parentIds) {
        node.forEach(item => {
          let searchId = this.addSearchData(item.menuId);
          if (searchId) parentIds.add(searchId);
          parentIds.add(item.menuId);
          //   item.parentIds.forEach(i => parentIds.add(parseInt(i)))
        });
      },

      // 添加查询功能
      addSearchData(menuId) {
        let menuNode = this.$refs.operate_tree.getNode(menuId);
        if (!Object.is(menuNode, null) && menuNode.childNodes.length === 0) {
          let cdl = menuNode.parent.childNodes || menuNode.childNodes;
          if (cdl.length > 1) {
            let searchNode = cdl.filter(item =>
              /([\u67e5][\u8be2]*)/g.test(item.label)
            );
            if (searchNode && searchNode.length >= 1) return searchNode[0].key;
          }
        }
      },

      // 权限详情
      access_info(index, row) {
        this.accessInfo_dialog = true;
        this.accessInfo_id = row.roleId;
        let roleInfo = `${ApiSetting.operate_role}/${row.roleId}`;
        this.$http.get(roleInfo).then(res => {
          if (res && res.code === 0 && res.data) {
            this.accessInfo = res.data;
            this.accessInfo.affiliation = this.accessInfo.affiliation.desc;
            this.menuTree = res.data.menuTree || [];
          }
        });
      }
    },
    created() {
      this.getListData();
      // 获取不同平台的所有权限
      this.getOtherData(1);
      this.getOtherData(2);
      this.getOtherData(3);
    }
  };
</script>
<style lang="less" scoped>
  @import url("./index.less");

  .access-dialog .el-tree-node__content .el-tree-node__label::before {
    content: url("../../../assets/images/sdocument.png") !important;
  }
</style>
<style lang="less">
  @import url("./element-index.less");

  .access-dialog.el-tree>div .el-tree-node,
  .access-dialog .el-tree>div {
    display: block;
  }

  .add_dialog {
    .el-checkbox:nth-child(1) {
      margin-right: 30px;
    }

    .el-checkbox+.el-checkbox {
      margin-left: 0;
      margin-right: 30px;
    }
  }

  .add_dialog .u-role-ckeckBox .el-form-item__content {
    width: 480px;
  }
</style>