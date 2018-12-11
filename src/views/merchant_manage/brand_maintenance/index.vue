<template>
  <div class="contract-receipts brand-management">
    <el-form class="c-search-form" :model="pageParams" ref="pageParams" label-position="right" :inline="true">
      <el-row>
        <el-col :span="8">
          <el-form-item label="品牌名称" prop="itemCode">
            <el-input clearable v-model.trim="pageParams.brandName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="品牌类型" prop="skuCode">
            <el-select v-model.trim="pageParams.brandType" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in brandOption"
                :key="index"
                :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="品牌编码" prop="itemCode">
            <el-input clearable v-model.trim="pageParams.brandCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="16">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="getPageList(1)">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div v-show="$store.getters.getPermission('brandMain_2')">
      <el-button class="btn-search btn-add" type="primary" @click="openAddDialog">添加品牌</el-button>
    </div>
    <div class="c-table-wrap">
      <el-table
        :data="tableList"
        style="width: 100%"
        align="center"
        stripe height="500">
        <el-table-column
          align="center"
          type="index"
          label="序号"
          min-width="50"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="brandName"
          label="品牌名称">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="marketName"
          label="所属商场">
        </el-table-column>
        <el-table-column
          min-width="150"
          align="center"
          prop="brandCode"
          label="品牌编码">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="brandType.desc"
          label="品牌类型">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="brandStatus.desc"
          label="状态">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          min-width="165"
          label="创建时间">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="createUserName"
          label="创建人">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="190"
          label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button :disabled="!$store.getters.getPermission('brandMain_3')" class="btn-handle" type="primary" @click="openModifyDialog(scope.row.brandCode)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagenation :pageparams="pageDefault" @handlePage="getPageList" :itemList="tableList"/>
    <el-dialog
      title="品牌-添加"
      :visible.sync="centerDialogVisible"
      class="s-dialog">
      <div>
        <el-form :model="addBrandData" :rules="rules" ref="ruleForm" label-width="80px">
          <el-form-item label="品牌名称" prop="brandName">
            <el-input v-model.trim="addBrandData.brandName"></el-input>
          </el-form-item>
          <el-form-item label="所属商场" prop="marketCode">
            <el-select v-model.trim="addBrandData.marketCode" clearable placeholder="请选择"
                       :disabled="currentUser.marketCode!==null">
              <el-option
                v-for="(item, index) in marketOptionData"
                :key="index"
                :label="item.marketName"
                :value="item.marketCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌类型" prop="brandType">
            <el-select v-model.trim="addBrandData.brandType" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in brandOption"
                :key="index"
                :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌状态">
            <el-radio-group v-model.trim="addBrandData.brandStatus">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button :disabled="addBrandBtnDisabled" class="btn-primary btn-save" type="primary" @click="submitForm('ruleForm')">保 存</el-button>
    <el-button class="btn-primary btn-reset" type="primary" @click="centerDialogVisible = false">取 消</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="品牌-修改"
      :visible.sync="modifyDialogVisible"
      class="s-dialog">
      <div>
        <el-form :model="modifyBrandData" :rules="rules1" ref="ruleForm1" label-width="80px">
          <el-form-item label="品牌名称" prop="brandName">
            <el-input v-model.trim="modifyBrandData.brandName" disabled></el-input>
          </el-form-item>
          <el-form-item label="所属商场" prop="marketCode">
            <el-select v-model.trim="modifyBrandData.marketCode" clearable placeholder="请选择" disabled>
              <el-option
                v-for="(item, index) in marketOptionData"
                :key="index"
                :label="item.marketName"
                :value="item.marketCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌类型" prop="brandType">
            <el-select v-model="modifyBrandData.brandType" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in brandOption"
                :key="index"
                :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌状态">
            <el-radio-group v-model="modifyBrandData.brandStatus">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button :disabled="editBrandBtnDisabled" class="btn-primary btn-save" type="primary" @click="modifySubmit('ruleForm1')">保 存</el-button>
    <el-button class="btn-primary btn-reset" type="primary" @click="modifyDialogVisible = false">取 消</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api/operation-manage';
  import Pagenation from '@/components/pagenation';

  export default {
    name:'brandMain',
    components: {
      Pagenation
    },
    computed: {
      currentUser() {
        if(this.$store.state.currentUser){
          this.addBrandData.marketCode = this.$store.state.currentUser.marketCode;
          return this.$store.state.currentUser
        }else{
          return {marketCode:null}
        }
      }
    },
    data() {
      return {
        centerDialogVisible: false,
        modifyDialogVisible: false,
        pageDefault: {//分页默认参数
          totalRecords: 0,
          currentPage: 1,
          pageSize: 20
        },
        pageParams: {
          brandName: '',
          brandCode: '',
          brandType: '',
          currentPage: ''
        },
        addBrandData: {
          brandName: '',
          marketCode: '',
          brandStatus: 1,
          brandType: ''
        },
        modifyBrandData: {
          brandName: '',
          marketCode: '',
          brandStatus: '',
          brandType: ''
        },
        rules: {
          brandName: [
            {required: true, message: '请输入品牌名称', trigger: 'blur'},
          ],
          marketCode: [
            {required: true, message: '请选择商场', trigger: 'change'},
          ],
          brandType: [
            {required: true, message: '请选择品牌类型', trigger: 'change'},
          ]
        },
        rules1: {
          brandName: [
            {required: true, message: '请输入品牌名称', trigger: 'blur'},
          ],
          marketCode: [
            {required: true, message: '请选择商场', trigger: 'change'},
          ],
          brandType: [
            {required: true, message: '请选择品牌类型', trigger: 'change'},
          ]
        },
        brandOption: [],
        marketOptionData: [],
        tableList: [],
        addBrandBtnDisabled:false,
        editBrandBtnDisabled:false
      }
    },
    methods: {
      async getBrandOption() {
        let res = await this.$http.get(api.brandTypeOption);
        if (res.code === 0) {
          this.brandOption = [...res.data];
        }
      },
      async marketOption() {
        let res = await this.$http.get(api.marketOption);
        if (res.code === 0) {
          this.marketOptionData = [...res.data];
        }
      },
      async getPageList(index) {
        this.pageParams.currentPage = index || 1;
        this.pageDefault.currentPage = index || 1;
        let res = await this.$http.get(api.brandList, {params: this.pageParams});
        if (res.code === 0) {
          this.pageDefault.totalRecords = res.page.totalRecords;
          this.tableList = [];
          this.tableList = [...res.data];
        }
      },
      indexMethod(index) {
        return index + (this.pageParams.currentPage - 1) * 20 + 1
      },
      openAddDialog() {
        this.centerDialogVisible = true;
        setTimeout(() => {
          this.resetForm('ruleForm');
        }, 100)
      },
      //新增提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addBrandBtnDisabled=true;
            this.$http({
              url:api.brandList,
              method:'post',
              data:this.addBrandData
            }).then(res => {
              if (res.code === 0) {
                this.$message.success('添加成功');
                this.centerDialogVisible = false;
                this.getPageList()
              }
              this.addBrandBtnDisabled=false;
            });
            /*this.$http.post(api.brandList, this.addBrandData).then(res => {
              if (res.code === 0) {
                this.$message.success('添加成功');
                this.centerDialogVisible = false;
                this.getPageList()
              }
            });*/
          } else {
            return false;
          }
        });
      },
      //打开修改对话框
      openModifyDialog(brandCode) {
        this.$http.get(api.brandList + `/${brandCode}`).then(res => {
          if (res.code === 0) {
            let data = {...res.data};
            this.modifyBrandData.brandName = data.brandName;
            this.modifyBrandData.brandCode = data.brandCode;
            this.modifyBrandData.brandStatus = data.brandStatus.code;
            this.modifyBrandData.brandType = data.brandType.code;
            this.modifyBrandData.marketCode = data.marketDTO.marketCode;
            this.modifyDialogVisible = true;
          }
        })
      },
      //修改提交
      modifySubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editBrandBtnDisabled=true;
            this.$http.put(api.brandList, this.modifyBrandData).then(res => {
              if (res.code === 0) {
                this.$message.success('修改成功');
                this.getPageList()
                this.modifyDialogVisible = false;
              }
              this.editBrandBtnDisabled=false;
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        setTimeout(() => {
          this.$refs[formName].clearValidate();
        }, 100)
      },
    },
    beforeMount() {
      this.getBrandOption();
      this.marketOption();
      this.getPageList();
    }
  };
</script>
<style lang="less" scoped>
  .contract-receipts {
    .footer-btn {
      width: 342px;
      text-align: right;
    }
  }

  .unit-div {
    margin-top: 30px;
    text-align: right;
  }
</style>
<style lang="less">
  .brand-management {
    .el-select .el-input.is-disabled .el-input__inner {
      height: 30px !important;
    }
  }
</style>
