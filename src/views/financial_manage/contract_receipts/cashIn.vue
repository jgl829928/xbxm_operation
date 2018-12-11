<template>
  <div class="receipts-wrap">
    <p class="tips">合同-收款</p>
    <el-form label-width="110px" :inline="true" label-position="right">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="商户名称">
            <span class="v-value">{{merchant.merchantName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同编号">
            <span class="v-value">{{$route.params.contractBatchNum}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="负责人联系电话">
            <span class="v-value">{{merchant.leaderTel}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="摊位号">
            <span class="v-value">{{merchant.boothId}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="营业执照号">
            <span class="v-value">{{merchant.loginNumber}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同签订时间">
            <span class="v-value">{{merchant.createTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="合同开始日期">
            <span class="v-value">{{merchant.rentBeginTime}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同结束日期">
            <span class="v-value">{{merchant.rentEndTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <p class="tips">费用列表</p>
    <div class="c-table-wrap">
      <el-table
        :data="itemList"
        style="width: 100%"
        align="center"
        stripe
        show-summary
        :summary-method="getSummaries"
        @selection-change="handleSelectionChange">
        <el-table-column
          align="center"
          prop="costPhase"
          width="50"
          label="期数">
        </el-table-column>
        <el-table-column
          align="center"
          prop="costProperty"
          label="费用类型">
        </el-table-column>
        <el-table-column
          align="center"
          prop="costAmount"
          label="金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="cumulativePaidAmount"
          label="已交金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="unpaidPayment"
          label="未交金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="expectPayTime"
          label="预计收款日期">
        </el-table-column>
        <el-table-column
          align="center"
          label="单位">
          <template slot-scope="scope">元</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="收入性质">
          <template slot-scope="scope">
            <span>{{ scope.row.incomeProperty ? scope.row.incomeProperty.desc:'' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          :selectable="selectable"
          width="50">
        </el-table-column>
      </el-table>
    </div>
    <el-form label-width="110px" :model="submitData" ref="submitData" :inline="true" :rules="rules" label-position="right">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="未交款金额">
            <span class="v-value">{{unpaidPayment}}元</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="已交款金额">
            <span class="v-value">{{paymentSuccess}}元</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="交款金额" prop="payAmount">
            <template v-if="canInput">
              <el-input class="c-el-input" clearable
                        v-model.trim="submitData.payAmount">
              </el-input>
              <span class="v-value">元</span>
            </template>
            <span v-else class="v-value">{{submitData.payAmount}}元</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="32">
          <el-form-item label="付款方式" prop="payType">
            <el-radio-group v-model.trim="submitData.payType">
              <!--<el-radio :label="1">微信</el-radio>
              <el-radio :label="2">支付宝</el-radio>-->
              <el-radio :label="3">POS机刷卡</el-radio>
              <el-radio :label="4">银行转账</el-radio>
              <el-radio :label="5">现金</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32" v-if="submitData.payType==1 || submitData.payType==2">
        <el-col :span="12">
          <el-form-item label="付款码" prop="payNumber">
            <el-input class="c-el-input" clearable v-model.trim="submitData.payNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer-wrap">
      <el-button class="btn-120" type="primary" @click="submit">收款</el-button>
      <el-button class="btn-120" type="default" @click="cancel">
        取消
      </el-button>
    </div>
  </div>
</template>

<script>
  import Api from '@/api/financial'
  import { contractDetailMixin, ajaxData, messageBox } from '@/utils/mixin'
  export default {
    name:'contractRecCashIn',
    mixins: [contractDetailMixin, ajaxData, messageBox],
    data() {
      const checkPayAmount = (rule, value, callback) => {
        value = value.toString();
        if (!value || !value.trim()) {
          return callback(new Error('请输入大于零的数字值'));
        }
        setTimeout(() => {
          if (!/^\d+(\.\d+)?$/.test(value.trim()) || value.trim() <= 0) {
            callback(new Error('请输入大于零的数字值'));
          } else {
            callback();
          }
        }, 100);
      };
      return {
        value:'',
        radio: 1,
        name:'',
        submitData:{
          contractBatchNum:'',
          costId:[],
          payAmount: 0,
          payNumber:'',
          payType: 3
        },
        paymentSuccess:'', //已交款金额
        unpaidPayment:'', //未交款金额
        rules: {
          payAmount: [
            { required: true, validator: checkPayAmount, trigger: 'blur'}
          ],
          payType: [
            { required: true, message: '选择付款方式', trigger: 'blur'}
          ],
          payNumber: [
            { required: true, message: '付款码不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    mounted() {
      let contractBatchNum = this.$route.params.contractBatchNum || '';
      this.getData(Api.contractCosts, contractBatchNum);
      this.submitData.contractBatchNum = contractBatchNum;
    },
    methods: {
      cancel() {
        this.$router.push({path:'/finance/contractReceipts'})
      },
      submit() {
        if(!this.submitData.costId.length) return this.$message.error('请勾选费用列表中交款项');
        this.ajaxPost({
          url: Api.costsReceipt,
          data: this.submitData,
          validateModel: 'submitData',
          callBack:(res)=>{
            let resData = res.data;
            if(resData.num && resData.num.code === 0){
              this.confirmBox({
                title: '操作提示',
                message: resData.desc,
                btn: '确认,取消',
                callBack: async ()=> {
                  let data = {
                    'contractBatchNum': this.submitData.contractBatchNum,
                    'orderNo': resData.orderNo,
                    'costId': JSON.stringify(this.submitData.costId)
                  };
                  let confirmedRes = await this.$http.get(Api.costsConfirmed,{params: data});
                  if(confirmedRes){
                    this.$message.success('支付成功');
                    this.$router.push('/finance/contractReceipts')
                  }
                }
              });
            }else{
              this.$router.push('/finance/contractReceipts')
            }
          }
        });
      },
      selectable() {
        let status = arguments[0].costPaymentStatus ? arguments[0].costPaymentStatus.code : '';
        if(status === 1 || status === 2){
          return true;
        }else{
          return false;
        }
      },
    }
  };
</script>
<style lang="less" scoped>
  .receipts-wrap{
    form{
      padding: 20px 35px;
    }
    .v-value {
      color: #9B9B9B;
      vertical-align:middle;
    }
    .footer-wrap{
      button:nth-child(2){
        margin-left: 30px;
      }
    }
    padding-bottom: 30px;
    &>div{
      padding: 16px 16px 0;
    }
    .tips{
      font-size: 12px;
      background: #FAFAFA;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
    }
    .el-col{
      height: 40px;
      line-height: 40px;
      margin-bottom: 12px;
    }
    .c-table-wrap{
      padding-bottom: 16px;
    }
    .footer-wrap{
      text-align: center;
    }
  }
</style>
<style lang="less">
  .receipts-wrap {
    .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td{
      background-color:#fff
    }
    .c-el-input{
      width: 200px;
    }
  }
</style>
