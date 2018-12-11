<template>
  <div class="contract-receipts">
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true"
             label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同批次号">
            <el-input clearable v-model.trim="reqData.contractBatchNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户名称">
            <el-input clearable v-model.trim="reqData.merchantName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="审核状态">
            <el-select v-model.trim="reqData.contractCheckStatus" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in reviewStatus"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="商户编号">
            <el-input clearable v-model.trim="reqData.merchantCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :offset="8" :span="8">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="c-table-wrap">
      <el-table
        :data="itemList"
        style="width: 100%"
        height="500"
        align="center"
        stripe>
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          align="center"
          prop="contractBatchNum"
          label="合同批次号"
          min-width="160">
        </el-table-column>
        <el-table-column
          align="center"
          label="法务编码"
          min-width="160">
          <template slot-scope="scope">
            <span class="edit-contract-num">{{scope.row.contractCodeNum}}</span>
            <span class="edit-contract-icon"
                  v-if="checkKey('audit_3') && scope.row.contractCheckStatus && scope.row.contractCheckStatus.code === 4"
                  @click="editContractCode(scope.row.contractBatchNum, scope.row.contractCodeNum)"
            ><img src="../../../assets/images/editor.png" alt=""></span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="marketName"
          label="商场名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          label="合同起止日期"
          min-width="210">
          <template slot-scope="scope">
            <span v-if="scope.row.rentBeginTime">{{scope.row.rentBeginTime}}至{{scope.row.rentEndTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="merchantName"
          label="商户名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          label="商户性质">
          <template slot-scope="scope">
            <span>{{scope.row.merchantNature ? scope.row.merchantNature.desc : ''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="brandName"
          label="经营品牌"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="合同生成时间"
          min-width="165">
        </el-table-column>
        <el-table-column
          align="center"
          label="审核状态"
          min-width="110">
          <template slot-scope="scope">
            <span>{{scope.row.contractCheckStatus ? scope.row.contractCheckStatus.desc : ''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          min-width="200">
          <template slot-scope="scope">
            <el-button :disabled="!(checkKey('audit_1') && scope.row.isCheck)" class="btn-handle"
                       type="primary" @click="toPage('contractReview', scope.row.contractBatchNum)">
              审核
            </el-button>
            <el-button :disabled="!checkKey('audit_2')" class="btn-handle"
                       type="primary" @click="toPage('viewContract', scope.row.contractBatchNum)">
              查看合同
            </el-button>
            <!--<el-button v-if=" checkKey('audit_3')"
                       class="btn-handle btn-lang-text" type="primary"
                       @click="editContractCode(scope.row.contractBatchNum)">编辑法务编码</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <pagenation :pageparams="pageInfo" :itemList="itemList" @handlePage="handlePage"/>
    <!--编辑合同编号-->
    <el-dialog
      title="编辑法务编码"
      :visible.sync="contactCodeDialog"
      class="m-dialog single-item-dialog">
      <div>
        <el-form ref="contactCode" :model="contactCode" :rules="rules" :inline="true" label-width="80px"
                 label-position="right">
          <el-form-item label="法务编码" prop="contractCodeNum">
            <el-input v-model.trim="contactCode.contractCodeNum"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-primary btn-save" type="primary" @click="submitEditCode">保 存</el-button>
        <el-button class="btn-primary btn-reset" type="primary" @click="contactCodeDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Api from '@/api/contact'
  import { pageListMixin } from '@/utils/mixin'
  export default {
    name:'contractAudit',
    mixins: [pageListMixin],
    data() {
      return {
        contactCodeDialog: false,
        reqData: {
          contractBatchNum:'',
          merchantName:'',
          contractCheckStatus:'',
          merchantCode:''
        },
        contactCode:{
          contractBatchNum:'',
          contractCodeNum:''
        },
        reviewStatus: [
          {label: '待审核', value: 1},
          {label: '审核中', value: 2},
          {label: '审核不通过', value: 3},
          {label: '审核通过', value: 4},
        ],
        itemList: [],
        rules:{
          contractCodeNum:[{ required: true, message: '请输入法务编码', trigger: 'blur' }]
        },
      }
    },
    mounted() {
      this.getList(Api.checksLists);
    },
    methods: {
      toPage(name, contractBatchNum) {
        this.$router.push({name:name, params:{ contractBatchNum : contractBatchNum}})
      },
      search() {
        this.reqData.currentPage = 1;
        this.getList(Api.checksLists);
      },
      submitEditCode() {
        this.$refs['contactCode'].validate(async (valid) => {
          if (valid) {
            let res = await this.$http.post(Api.editCodeNum,this.contactCode);
            if(res && res.code === 0){
              this.contactCodeDialog = false;
              this.$message.success('操作成功');
              this.getList(Api.checksLists);
            }
          } else {
            return false;
          }
        });
      },
      editContractCode(contractBatchNum, contractCodeNum) {
        this.contactCodeDialog = true;
        setTimeout(()=>{
          this.$refs['contactCode'].resetFields();
          this.contactCode.contractBatchNum = contractBatchNum;
          this.contactCode.contractCodeNum = contractCodeNum;
        },20);
      },
    }
  };
</script>
<style lang="less" scoped>
  .btn-lang-text{
    width: 150px;
  }
  .edit-contract-num, .edit-contract-icon{
    display: inline-block;
  }
  .edit-contract-num{
    width: 120px;
  }
  .edit-contract-icon{
    width: 25px;
    height: 25px;
    position: absolute;
    top: 50%;
    right: -2px;
    transform: translateY(-50%);
    cursor: pointer;
    img{
      vertical-align: middle;
    }
  }
</style>
<style lang="less">
  .single-item-dialog{
    form{
      text-align: center;
      .el-form-item{
        margin-left: -36px;
      }
    }
    .el-dialog__body{
      margin-top: 18px;
    }
  }
</style>
