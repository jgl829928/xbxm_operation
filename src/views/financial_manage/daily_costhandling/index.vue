<template>
  <div class="g-daily-costhanding">
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true"
             label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商场名称">
            <selectMarket :reqData="reqData"/>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label="商户名称">
            <el-input clearable v-model.trim="reqData.merchantName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label="负责人">
            <el-input clearable v-model.trim="reqData.leaderName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :xs="24">
          <el-form-item label="联系电话">
            <el-input clearable v-model.trim="reqData.leaderTel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label="费用名称">
            <el-input clearable v-model.trim="reqData.expenseName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="账单状态">
            <el-select v-model.trim="reqData.paymentStatus" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in billStatusList"
                :key="index"
                :label="item.label"
                :value="item.value">
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
      <el-row v-if="checkKey('dailyCosthandling_2')">
        <el-col :span="8">
            <el-button class="btn-search btn-add" type="primary" @click="receiptEntry">收款录入</el-button>
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
          prop="expenseName"
          label="费用名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="expenseProperty"
          label="费用类型"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="merchantCode"
          label="商户编号"
          min-width="160">
        </el-table-column>
        <el-table-column
          align="center"
          prop="merchantName"
          label="商户名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="marketName"
          label="商场名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="leaderName"
          label="负责人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="leaderTel"
          label="负责人联系电话"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="estimatedPayTime"
          label="预计交款日期"
          min-width="165">
        </el-table-column>
        <el-table-column
          align="center"
          prop="amount"
          label="账单金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="cumulativePaidAmount"
          label="交款金额">
        </el-table-column>
        <el-table-column
          align="center"
          label="账单状态"
          min-width="110">
          <template slot-scope="scope">
            {{scope.row.billStatus | billStatus}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createUserName"
          label="录入操作人"
          min-width="90">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createdTime"
          label="费用录入时间"
          min-width="165">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          min-width="380">
          <template slot-scope="scope">
            <el-button class="btn-handle" type="primary"
                       @click="changeModify(scope.row)"
                       :disabled="!(checkKey('dailyCosthandling_3') && scope.row.billStatus === 1)"
                       >修改</el-button>
            <el-button class="btn-handle btn-add" type="primary"
                       @click="deleteData(scope.row.expenseId)"
                       :disabled="!(checkKey('dailyCosthandling_4') && scope.row.billStatus === 1)"
                       >删除</el-button>
            <el-button class="btn-handle" type="primary"
                       @click="cashIn(scope.row.merchantCode)"
                       :disabled="!(checkKey('dailyCosthandling_5') && (scope.row.billStatus === 1 || scope.row.billStatus === 2))"
                       >收款</el-button>
            <el-button class="btn-handle" type="primary"
                       @click="applyRefund(scope.row)"
                       :disabled="!(checkKey('dailyCosthandling_6') &&
                       (scope.row.billStatus === 2 || scope.row.billStatus === 4) &&
                       scope.row.refundStatus && scope.row.refundStatus.code === 0)"
                       >申请退款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <pagenation :pageparams="pageInfo" :itemList="itemList" @handlePage="handlePage"/>
    <!--收款录入弹框-->
    <entryDialog ref="entryDia" :expensePropertyList="expensePropertyList" @submitCheckProp="search"/>
    <!--退款申请-->
    <refundDialog ref="refundDia" :refundDetail="refundDetail" @submitCheckProp="search"/>
    <!--修改弹框-->
    <el-dialog title="日常费用-修改" :visible.sync="modifyDialog" class="l-dialog modify-dialog">
      <el-form :model="modifyData" :rules="rules" ref="modifyData" label-width="102px" :inline="true"
               label-position="right">
        <el-row :gutter="32">
          <el-col :span="12">
            <el-form-item label="费用类型" prop="expenseProperty">
              <el-select v-model.trim="modifyData.expenseProperty">
                <el-option
                  v-for="(item, index) in expensePropertyList"
                  :key="index"
                  :label="item.expenceName"
                  :value="item.expenceName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="费用名称" prop="expenseName">
              <el-input clearable v-model.trim="modifyData.expenseName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="12">
            <el-form-item label="交款金额" prop="averageAmount">
              <el-input clearable v-model.trim="modifyData.averageAmount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计交款日期" prop="estimatedPayTime">
              <el-date-picker
                v-model.trim="modifyData.estimatedPayTime"
                align="right"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-save" type="primary" @click="submitModify">保存</el-button>
        <el-button class="btn-reset" type="primary" @click="modifyDialog = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Api from '@/api/financial'
  import entryDialog from './_/entry-dialog'
  import refundDialog from './_/refund-dialog'
  import selectMarket from '@/components/selectMarket'
  import { pageListMixin, ajaxData, messageBox } from '@/utils/mixin'
  export default {
    name:'dailyCosthandling',
    mixins: [pageListMixin, ajaxData, messageBox],
    data() {
      return {
        value1: [1, 4],
        modifyDialog: false, //修改dialog
        reqData: { //查询数据
          expenseName:'',
          merchantName:'',
          leaderName:'',
          leaderTel:'',
          marketCode:'',
          paymentStatus:'',
          currentPage: 1
        },
        modifyData:{
          expenseProperty:'',
          expenseName:'',
          averageAmount:'',
          estimatedPayTime:'',
          merchantCode:'',
        },
        expenseCode:'',//修改的id
        payWay: [
          {label: '微信', value: 1},
          {label: '支付宝', value: 2},
          {label: 'POS机刷卡', value: 3}
        ],
        statusList: [
          {label: '未交款', value: 1},
          {label: '已交款', value: 2},
          {label: '部分交款', value: 3}
        ],
        billStatusList:[
          {label: '未交款', value: 1},
          {label: '部分交款', value: 2},
          {label: '已交款', value: 4}
        ],
        expensePropertyList: [],
        rules: {
          expenseProperty: [
            {required: true, message: '请选择费用类型', trigger: 'change'}
          ],
          expenseName: [
            {required: true, message: '请输入费用名称', trigger: 'blur'}
          ],
          averageAmount: [
            {required: true, message: '请输入交款金额', trigger: 'blur'}
          ],
          estimatedPayTime: [
            {required: true, message: '请选择预计交款日期', trigger: 'change'}
          ]
        },
        refundDetail:{}, //具体某条数据
      }
    },
    mounted() {
      let marketCode = this.$route.params.marketCode || '';
      if(marketCode) this.reqData.marketCode = marketCode;
      this.getList(Api.contractExpenses);
      this.getCostType();
    },
    methods: {
      async getCostType(){
        let res = await this.$http.get(Api.expences);
        if(res) this.expensePropertyList = res.data;
      },
      applyRefund(row) {
        this.refundDetail = row;
        this.$refs.refundDia.openDialog();
      },
      cashIn(merchantCode) {
        this.$router.push({name: 'dailyCostCashIn', params: {merchantCode: merchantCode}})
      },
      search() {
        this.reqData.currentPage =  1;
        this.getList(Api.contractExpenses);
      },
      //提交修改
      submitModify() {
        this.ajaxPut({
          url: `${Api.contractExpenses}/${this.expenseCode}`,
          data: this.modifyData,
          resetForm:'modifyData',
          validateModel: 'modifyData',
          callBack:()=>{
            this.getList(Api.contractExpenses);
            this.modifyDialog = false;
          }
        })
      },
      // 修改
      changeModify(data) {
        for(let key in this.modifyData){
          this.modifyData[key] = data[key==='averageAmount' ? 'amount' : key];
        }
        this.expenseCode = data.expenseId;
        this.modifyDialog = true;
      },
      receiptEntry() { //收款录入
        this.$refs.entryDia.openDialog();
      },
      deleteData(expenseId){ //删除
        this.confirmBox({
          message: '确认删除此条数据?',
          callBack: ()=>{
            this.ajaxDelete({
              url: `${Api.contractExpenses}/${expenseId}`,
              callBack: ()=>{
                this.getList(Api.contractExpenses);
                this.$message.success('删除成功');
              }
            });
          }
        });
      }
    },
    filters:{
      billStatus(sta) {
        let status = '';
        switch (sta) {
          case 1:
            status = '未交款';
            break;
          case 2:
            status = '部分交款';
            break;
          case 3:
            status = '收款中';
            break;
          case 4:
            status = '已交款';
            break;
          case 5:
            status = '待退款';
            break;
          case 6:
            status = '退款中';
            break;
          case 7:
            status = '已退款';
            break;
          case 8:
            status = '退款失败';
            break;
          case 9:
            status = '部分退款';
            break;
          default:
            break;
        }
        return status
      }
    },
    components:{
      entryDialog,
      refundDialog,
      selectMarket
    }
  };
</script>
<style lang="less">
  .g-daily-costhanding {
    .u-area-input .el-form-item__content {
      width: 82%;
      vertical-align: middle;
    }
    .el-form--inline .el-form-item {
      width: 100%;
      vertical-align: unset;
    }
    .m-dialog .el-dialog__body {
      padding-left: 0;
      .el-col-12 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
      }
    }
    .el-dialog .el-form-item__content {
      text-align: left;
    }
    .modify-dialog{
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
      }
    }
  }
</style>
