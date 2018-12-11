<template>
  <div class="contract-receipts">
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true" label-position="right">
      <el-row>
        <el-col :span="8" :xs="24">
          <el-form-item label="员工姓名" prop="employeeName">
            <el-input clearable v-model.trim="reqData.employeeName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label="员工状态" prop="available">
            <el-select v-model="reqData.available" clearable placeholder="请选择">
              <el-option label="正常" value="1"></el-option>
              <el-option label="离职" value="0">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label="手机号" prop="mobile">
            <el-input clearable v-model.trim="reqData.mobile"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="角色名称" prop="roleId">
            <el-select v-model="reqData.roleId" clearable placeholder="请选择">
              <el-option v-for="(item, index) in allRole" :key="index" :label="item.name" :value="item.roleId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商场名称" prop="marketCode">
            <el-select v-model="reqData.marketCode" clearable placeholder="请选择" @change="getMerchantList(reqData.marketCode,true)">
              <el-option v-for="(item, index) in marketList" :key="index" :label="item.marketName" :value="item.marketCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
    <el-col :span="8">
          <el-form-item label="员工类型" prop="employeeType">
            <el-select v-model="reqData.employeeType" clearable placeholder="请选择">
              <el-option label="正式员工" :value=0> </el-option>
              <el-option label="第三方公司员工" :value=2> </el-option>
              <el-option label="商户员工" :value=1>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="8">
        <el-col :span="8" :offset="16">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="role_func">
      <el-button class="btn-search btn-add" type="primary" v-show="$store.getters.getPermission('personnelMain_2')"
        @click="add_person">添加</el-button>
      <el-upload class="upload-demo" :show-file-list=false :on-success="leading_success" :on-error="leading_error"
        :headers="{gTicket:gTicket,'sys_authentication':$http.defaults.headers['sys_authentication'],'sys_id':$http.defaults.headers['sys_id']}"
        :action="upload_url">
        <el-button class="btn-search btn-add" type="primary" v-show="$store.getters.getPermission('personnelMain_5')">导入员工信息</el-button>
      </el-upload>
    </div>
    <div class="c-table-wrap">
      <el-table :data="itemList" style="width: 100%" align="center" stripe height="500">
        <el-table-column align="center" type="index" label="序号" width="50" :index="indexMethod">
        </el-table-column>
        <el-table-column align="center" prop="employeeNum" label="员工ID">
        </el-table-column>
        <el-table-column align="center" prop="employeeName" label="员工姓名">
        </el-table-column>
        <el-table-column align="center" prop="mobile" label="手机号" min-width="120">
        </el-table-column>
        <el-table-column align="center" prop="employeeType" label="员工类型">
          <template slot-scope="scope">
            <span>{{scope.row.employeeType.desc}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="from" label="员工所属部门" min-width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.from">{{scope.row.from.desc}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="marketName" label="商场名称">
        </el-table-column>
        <el-table-column align="center" prop="roleName" label="角色名称" min-width="120">
        </el-table-column>
        <el-table-column align="center" prop="available" label="员工状态">
          <template slot-scope="scope">
            <span>{{scope.row.available.desc}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间" min-width="165">
        </el-table-column>
        <el-table-column align="center" prop="latestUpdateUser" label="修改人">
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="200" fixed="right">
          <template slot-scope="scope">
            <el-button class="btn-handle" type="primary" :disabled="!$store.getters.getPermission('personnelMain_3')"
              @click="edit_person(scope.$index,scope.row)">
              修改
            </el-button>
            <el-button class="btn-handle" type="primary" :disabled="!$store.getters.getPermission('personnelMain_4')"
              @click="check_accessInfo(scope.$index,scope.row)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <pagenation :pageparams="pageparams" :itemList="itemList" @handlePage="handlePage"></pagenation>
    </div>


    <el-dialog :title="dialog_title" :visible.sync="add_dialog" class="l-dialog add_dialog" @close="clean_data">
      <el-form :model="add_data" :rules="add_rules" ref="add_form" label-width="120px" :inline="true" label-position="right">
        <el-row :gutter="32">
          <el-col :span="12" :xs="24">
            <el-form-item label="员工ID" prop="empId" v-if="dialog_title=='员工信息-修改'">
              <el-input clearable v-model.trim="add_data.empId" disabled></el-input>
            </el-form-item>
            <el-form-item label="所属商场" prop="marketCode" v-else>
              <el-select v-model="add_data.marketCode" clearable placeholder="请选择" @change="getMerchantList(add_data.marketCode)">
                <el-option v-for="(item, index) in marketList" :key="index" :label="item.marketName" :value="item.marketCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="员工姓名" prop="employeeName">
              <el-input clearable v-model.trim="add_data.employeeName" :disabled="dialog_title=='员工信息-修改'"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="12" v-if="!add_data.employeeType==0">
            <el-form-item label="手机号" prop="mobile">
              <el-input clearable v-model.trim="add_data.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="员工类型" prop="employeeType">
              <el-select v-model="add_data.employeeType" clearable placeholder="请选择" :disabled="dialog_title=='员工信息-修改'">
                <el-option label="第三方公司员工" :value=2></el-option>
                <el-option label="商户员工" :value=1>
                </el-option>
                <el-option label="正式员工" :value=0 v-if="dialog_title=='员工信息-修改'">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="12" v-if="!add_data.employeeType==0">
            <el-form-item label="所属商户" prop="merchantCode">
              <el-select v-model="add_data.merchantCode" clearable placeholder="请选择">
                <el-option v-for="(item, index) in merchantList" :key="index" :label="item.merchantName" :value="item.merchantCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="24">
            <el-form-item label="角色" prop="roleIds" class="u-role-ckeckBox">
              <el-checkbox-group v-model="add_data.roleIds">
                <el-checkbox v-for="item in roleList" :label="item.roleId" :key="item.roleId">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="24">
            <el-form-item label="状态" prop="itemCode">
              <el-radio-group v-model="add_data.available">
                <el-radio :label="1" :value="1">正常</el-radio>
                <el-radio :label="0" :value="0">离职</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32" v-if="dialog_title=='员工信息-修改'">
          <el-col :span="24">
            <el-form-item label="密码修正" prop="itemCode">
              <a @click="reset_pwd" class="reset_pwd">重置密码</a>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-save" type="primary" @click="save_data">保存</el-button>
        <el-button class="btn-reset" type="primary" @click="cancel">取消</el-button>
      </div>
    </el-dialog>

    <!-- 权限详情弹窗 -->
    <el-dialog title="权限-详情" :visible.sync="accessInfo_dialog" class="m-dialog access-dialog">
      <el-row :gutter="32">
        <el-col :span="12">
          <div class="u-roleInfo-item">
            <label>员工姓名</label>
            <span>{{person_info.employeeName}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="u-roleInfo-item">
            <label>手机号</label>
            <span>{{person_info.mobile}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <div class="u-roleInfo-item">
            <label>员工状态</label>
            <span>{{person_info.state}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="u-roleInfo-item">
            <label>商场名称</label>
            <span>{{person_info.marketName}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <div class="u-roleInfo-item">
            <label>员工类型</label>
            <span>{{person_info.type}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="u-roleInfo-item">
            <label>商户名称</label>
            <span>{{person_info.merchantName}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <div class="u-roleInfo-item">
            <label>角色</label>
            <span>{{person_info.roleName}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="24">
          <div class="u-menu-title">运营后台功能菜单</div>
          <el-scrollbar style="height: 400px">
            <el-tree :data="operate" node-key="menuId" :props="defaultProps">
            </el-tree>
          </el-scrollbar>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="24">
          <div class="u-menu-title">APP运营功能菜单</div>
          <el-tree :data="app_operate" node-key="menuId" :props="defaultProps">
          </el-tree>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="24">
          <div class="u-menu-title">APP商户功能菜单</div>
          <el-tree :data="app_merchant" node-key="menuId" :props="defaultProps">
          </el-tree>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-save" type="primary" @click="accessInfo_dialog=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ApiSetting from "../../../api/access-manage";
  import selectMarket from "../../estate_manage/_/selectMarket";
  import pagenation from "@/components/pagenation";
  export default {
    data() {
      return {
        gTicket: "",
        upload_url: ApiSetting.upload_employeesInfo,
        allRole: [],
        reqData: {
          available: "",
          currentPage: 1,
          employeeName: "",
          employeeType: "",
          marketCode: "",
          merchantCode: "",
          mobile: "",
          pageSize: 20
        },
        marketList: [],
        roleList: [],
        merchantList: [],
        itemList: [],
        pageparams: {},
        rules: {},
        radio2: "",
        statusList: [],

        // 添加人员弹窗
        add_dialog: false,
        dialog_title: "员工信息-添加",
        add_data: {
          available: 1,
          employeeName: "",
          employeeType: 1,
          marketCode: "",
          marketName: "",
          merchantCode: "",
          merchantName: "",
          mobile: "",
          roleIds: []
        },
        add_rules: {
          employeeName: [
            { required: true, message: "请输入员工姓名", trigger: "blur" },
            { max: 32, message: "角色名称不能多于32个字符", trigger: "blur" }
          ],
          mobile: [
            { required: true, message: "请输入手机号", trigger: "blur" },
            {
              validator: function (rule, value, callback) {
                if (value) {
                  if (/^1[34578]\d{9}$/.test(value) == false) {
                    callback(new Error("请输入正确的手机号"));
                  } else {
                    callback();
                  }
                }
              },
              trigger: "blur"
            }
          ],
          roleIds: [{ required: true, message: "请选择角色", trigger: "change" }],
          marketCode: [{ required: true, message: "请选择商场", trigger: "change" }]
        },
        editId: "",
        // 权限详情弹窗
        accessInfo_dialog: false,
        person_info: {},
        app_merchant: [],
        app_operate: [],
        operate: [],
        defaultProps: {
          children: "list",
          label: "name"
        }
      };
    },
    components: { pagenation },
    name: "personnelMain",
    methods: {
      // 列表信息
      getListData() {
        this.$http
          .get(ApiSetting.employees, { params: this.reqData })
          .then(res => {
            if (res && res.code == 0 && res.data) {
              this.itemList = res.data;
              this.pageparams = res.page;
              if (this.itemList && this.itemList.length > 0) {
                this.itemList.map(item => {
                  if (item.roleInfo && item.roleInfo.length > 0) {
                    item.roleName = item.roleInfo
                      .map(items => {
                        return items.roleName;
                      })
                      .join("，");
                  }
                });
              }
            } else {
              this.itemList = [];
            }
          });
      },
      // 获取商户信息
      getMerchantList(code, isSearch) {
        let param = {
          marketCode: code
        };
        this.$http({
          method: "get",
          url: ApiSetting.merchantList,
          params: param,
          showLoading: false,
        }).then(res => {
          if (res && res.code == 0) {
            this.merchantList = res.data;
            if (this.dialog_title === "员工信息-添加") {
              this.add_data.merchantCode = "";
            }
            if (isSearch) {
              this.reqData.merchantCode = "";
            }
          }
        });
      },
      // 商场及角色名称信息
      getOtherData() {
        this.$http.get(ApiSetting.marketList).then(res => {
          if (res && res.code == 0) {
            this.marketList = res.data;
          }
        });
        let roleList = `${ApiSetting.roleNameList}/0`
        this.$http.get(roleList).then(res => {
          if (res && res.code == 0 && res.data) {
            this.allRole = res.data;
          } else {
            this.allRole = [];
          }
        });
      },
      // 获取角色列表
      getRoleList(num) {
        let roleList = `${ApiSetting.roleNameList}/${num}`
        this.$http.get(roleList).then(res => {
          if (res && res.code == 0 && res.data) {
            this.roleList = res.data;
          } else {
            this.roleList = [];
          }
        });
      },
      search() {
        this.reqData.currentPage = 1;
        this.getListData();
      },
      // 翻页
      handlePage(val) {
        this.reqData.currentPage = val;
        this.getListData();
      },
      indexMethod(index) {
        return index + (this.reqData.currentPage - 1) * 20 + 1;
      },
      // 添加人员
      add_person() {
        this.dialog_title = "员工信息-添加";
        this.add_dialog = true;
        delete this.add_data.empId;
        this.getRoleList(2)
      },
      clean_data() {
        Object.assign(this.add_data, this.$options.data().add_data);
      },
      // 编辑人员
      edit_person(index, row) {
        this.dialog_title = "员工信息-修改";
        this.editId = row.empId;
        this.getMerchantList(row.marketCode)
        if (row.employeeType.code === 0) this.getRoleList(0)
        else this.getRoleList(2)
        this.add_dialog = true;
        this.add_data = {
          empId: row.empId,
          available: row.available.code,
          employeeName: row.employeeName,
          employeeType: row.employeeType.code,
          marketCode: row.marketCode,
          marketName: row.marketName,
          merchantCode: row.merchantCode,
          merchantName: row.merchantName,
          mobile: row.mobile,
          roleIds: row.roleIds
        };
      },
      // 保存
      save_data() {
        this.$refs["add_form"].validate(valid => {
          if (valid) {
            this.marketList.map(item => {
              if (item.marketCode == this.add_data.marketCode) {
                this.add_data.marketName = item.marketName;
              }
            });
            this.merchantList.map(item => {
              if (item.merchantCode == this.add_data.merchantCode) {
                this.add_data.merchantName = item.merchantName;
              }
            });
            if (this.dialog_title == "员工信息-添加") {
              this.$http.post(ApiSetting.employees, this.add_data).then(res => {
                if (res && res.code == 0) {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                  this.add_dialog = false;
                  this.getListData();
                }
              });
            } else {
              let editEmployees = `${ApiSetting.employees}/${this.editId}`;
              this.$http.put(editEmployees, this.add_data).then(res => {
                if (res && res.code == 0) {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                  this.add_dialog = false;
                  this.getListData();
                }
              });
            }
          }
        });
      },
      // 重置密码
      reset_pwd() {
        this.$confirm('请确定是否需要重置密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let reset_pwd = `${ApiSetting.change_pwd}/${this.add_data.empId}/pwd/actions/reset`
          this.$http.patch(reset_pwd).then(res => {
            if (res && res.code == 0) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
            }
          });
        })
      },
      cancel() {
        this.add_dialog = false;
      },
      // 查看人员的权限
      check_accessInfo(index, row) {
        this.accessInfo_dialog = true;
        let employeesInfo = `${ApiSetting.employees}/${row.empId}`;
        this.$http.get(employeesInfo).then(res => {
          if (res && res.code == 0 && res.data) {
            this.person_info = res.data;
            this.person_info.type = this.person_info.employeeType.desc;
            this.person_info.state = this.person_info.available.desc;
            this.person_info.roleName = this.person_info.roleInfo
              .map(items => {
                return items.roleName;
              })
              .join("，");
            this.app_merchant = this.person_info.menuMap.app_merchant;
            this.app_operate = this.person_info.menuMap.app_operate;
            this.operate = this.person_info.menuMap.operate;
          }
        });
        this.person_info = row;
      },
      // 导入成功
      leading_success(res, file) {
        if (res.code == 0) {
          this.$message({
            message: "导入成功",
            type: "success"
          });
        } else {
          this.$message.error(`${res.msg},请重新导入`);
        }
      },
      leading_error() {
        this.$message.error("导入失败，请重新导入");
      },
      marketData(data) {
        this.reqData.marketCode = data;
      },
    },
    created() {
      this.gTicket = this.$store.state.gTicket;
      this.getOtherData();
      this.getListData();
    }
  };
</script>
<style lang="less" scoped>
  @import url("../role_maintenance/index.less");

  .access-dialog .el-tree-node__content .el-tree-node__label::before {
    content: url("../../../assets/images/sdocument.png") !important;
  }

  .upload-demo {
    display: inline-block;
  }
</style>
<style lang="less">
  @import url("../role_maintenance/element-index.less");

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

    .reset_pwd {
      height: 30px;
      line-height: 30px;
    }
  }

  .add_dialog .u-role-ckeckBox .el-form-item__content {
    width: 480px;
  }

  .role_func {
    .el-upload-list {
      display: none;
    }

    .btn-add {
      margin-right: 10px;
    }
  }
</style>