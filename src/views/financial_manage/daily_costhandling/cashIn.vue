<template>
  <div class="c-detail-container c-financial-detail receipts-wrap">
    <p class="tips">日常费用-收款</p>
    <el-form class="c-detail-form" label-width="120px" :inline="true"
             label-position="right">
      <div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="商户名称">
              <span>{{costData.merchantName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商场名称">
              <span>{{costData.marketName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户编号">
              <span>{{costData.merchantCode}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="span-boothId-box" label="在租摊位">
              <span class="span-boothId" :title="costData.boothId">{{costData.boothId}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <p class="tips">费用列表</p>
      <div class="c-table-wrap">
        <el-table
          :data="itemList"
          ref="receiptTable"
          style="width: 100%"
          align="center"
          stripe
          @selection-change="handleSelectionChange">
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            align="center"
            prop="expenseName"
            label="费用名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="expenseProperty"
            label="费用类型">
          </el-table-column>
          <el-table-column
            align="center"
            prop="estimatedPayTime"
            label="预计交款日期">
          </el-table-column>
          <el-table-column
            align="center"
            prop="amount"
            label="交款金额（元）">
          </el-table-column>
          <el-table-column
            align="center"
            prop="createdTime"
            label="录入时间">
          </el-table-column>
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
        </el-table>
      </div>
      <el-form class="handle-form" :model="reqData" :rules="rules" ref="reqData" label-width="106px" :inline="true"
               label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="交款金额" prop="payAmount">
              <template v-if="canInput">
                <el-input clearable
                          v-model.trim="reqData.payAmount">
                </el-input>
                <span>元</span>
              </template>
              <span v-else>{{reqData.payAmount}}元</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="未交款金额">
              <span>{{noPayAmount}}元</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="付款方式">
              <el-radio-group v-model.trim="reqData.payMode">
                <!--<el-radio :label="1">微信</el-radio>
                <el-radio :label="2">支付宝</el-radio>-->
                <el-radio :label="3">pos机刷卡</el-radio>
                <el-radio :label="4">银行卡转账</el-radio>
                <el-radio :label="5">现金</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="reqData.payMode === 1 || reqData.payMode === 2">
            <el-form-item label="付款码" prop="payNumber">
              <el-input clearable v-model.trim="reqData.payNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="c-detail-footer-box">
        <el-button type="primary" @click="submitData">收款</el-button>
        <el-button class="cancel-btn" @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import Api from '@/api/financial'
  import {ajaxData, messageBox} from '@/utils/mixin';

  export default {
    name: 'dailyCostCashIn',
    mixins: [ajaxData, messageBox],
    data() {
      return {
        itemList: [],
        costData: {},
        reqData: {
          payMode: 3,
          payNumber: '',
          payAmount: 0,
          costId: []
        },
        noPayAmount: 0,
        rules: {
          payNumber: [{required: true, message: '请输入付款码', trigger: 'blur'}]
        }
      }
    },
    mounted() {
      this.getData();
    },
    computed: {
      canInput() {
        return this.reqData.costId.length === 1
      }
    },
    methods: {
      cancel() {
        this.$router.push({path: '/finance/dailyCosthandling'})
      },
      getData() {
        this.ajaxGet({
          url: `${Api.contractExpenses}/${this.$route.params.merchantCode}`,
          callBack: (res) => {
            this.costData = res.data;
            this.itemList = res.data.currentExpenseDTOList;
            setTimeout(() => {
              if (this.itemList) {
                this.itemList.forEach(row => {
                  this.$refs.receiptTable.toggleRowSelection(row);
                  this.noPayAmount = this.noPayAmount + row.amount;
                });
              }
            }, 10);
          }
        });
      },
      submitData() {
        if (this.reqData.costId.length < 1) {
          this.$message.error('请勾选费用列表中费用项');
          return false;
        }
        this.ajaxPost({
          url: Api.costsPayment,
          data: this.reqData,
          validateModel: 'reqData',
          callBack: (res) => {
            let resData = res.data;
            if (resData.num && resData.num.code === 0) {
              this.confirmBox({
                title: '操作提示',
                message: resData.desc,
                btn: '确认,取消',
                callBack: async () => {
                  let confirmedRes = await this.$http.put(`${Api.costsPayment}/${resData.orderNo}`);
                  if (confirmedRes) {
                    this.$message.success('支付成功');
                    this.$router.push("/finance/dailyCosthandling");
                  }
                }
              });
            } else {
              this.$router.push("/finance/dailyCosthandling");
            }
          }
        })
      },
      handleSelectionChange(item) {
        this.reqData.costId = [];
        this.reqData.payAmount = 0;
        item.forEach((val) => {
          this.reqData.costId.push(val.expenseId);
          this.reqData.payAmount += val.amount;
        });
        this.reqData.payAmount = this.reqData.payAmount.toFixed(2);
      }
    }
  };
</script>
<style lang="less" scoped>
  .receipts-wrap {
    .span-boothId {
      display: inline-block;
      width: calc(~'100% - 120px');
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
    }
  }
</style>
<style lang="less">
  .span-boothId-box{
    width: 100%;
    &>div.el-form-item__content{
      width: calc(~'100% - 120px');
    }
  }
</style>
