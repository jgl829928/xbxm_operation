<template>
  <el-dialog title="合同-款项详情" :visible.sync="contractDetail" class="l-dialog contract-detail-dialog">
    <el-form label-width="110px" :inline="true" label-position="right">
      <el-row>
        <el-col :span="12">
          <el-form-item label="商户名称">
            <span class="v-value">{{merchant.merchantName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人">
            <span class="v-value">{{merchant.leaderName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="负责人联系电话">
            <span class="v-value">{{merchant.leaderTel}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="摊位号">
            <span class="v-value s-booth-id">{{merchant.boothId}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
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
      <el-row>
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
    <div class="contract-list-wrap">
      <p>{{curType===1? '费用列表':'周期费用列表'}}</p>
      <el-row class="c-table-wrap">
        <el-table :data="itemList" style="width: 100%" align="center" stripe>
          <el-table-column
            v-if="curType===1"
            align="center"
            prop="costPhase"
            width="50"
            label="期数">
          </el-table-column>
          <el-table-column
            v-else
            type="index"
            align="center"
            label="序号">
          </el-table-column>
          <el-table-column align="center" prop="costProperty" label="费用类型">
          </el-table-column>
          <el-table-column align="center" prop="costAmount" label="金额">
          </el-table-column>
          <el-table-column align="center" label="单位">
            <template slot-scope="scope">元</template>
          </el-table-column>
          <el-table-column align="center" label="收入性质">
            <template slot-scope="scope">
              <span>{{ scope.row.incomeProperty ? scope.row.incomeProperty.desc:'' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.costPaymentStatus ? scope.row.costPaymentStatus.desc:'' }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="curType === 1" align="center" prop="recentlyPayTime" label="收款成功时间">
          </el-table-column>
          <el-table-column v-else align="center" prop="errMessage" label="退款失败原因">
          </el-table-column>
        </el-table>
      </el-row>
      <div class="dialog-footer">
        <el-button class="btn-save" type="primary" @click="contractDetail=false">关闭</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      itemDetail: {
        type: Object,
        default() {
          return {}
        }
      },
      curType: {
        type: Number,
        default: 1  //收款：1，退款：2
      }
    },
    computed:{
      itemList() {
        return this.itemDetail.list || this.itemDetail.resultRefundDTO || this.itemDetail.amountDTO || []
      },
      merchant() {
        return this.itemDetail.merchant || this.itemDetail.financeDTO ||{}
      }
    },
    data() {
      return {
        contractDetail: false
      }
    },
    methods: {
      showDialog() {
        this.contractDetail = true;
      }
    }
  };
</script>
<style lang="less" scoped>
  .v-value {
    color: #9B9B9B;
  }
  .s-booth-id{
    word-break: break-all;
  }
  .contract-list-wrap {
    padding: 20px 20px 40px;
    & > p {
      height: 40px;
      background: #FAFAFA;
      line-height: 40px;
      padding: 0 16px;
    }
  }
  .dialog-footer {
    text-align: center;
    margin-top: 40px;
  }
</style>
<style lang="less">
  .l-dialog.contract-detail-dialog {
    .el-dialog__body {
      padding: 0;
      .el-form {
        padding: 0 20px;
        border-bottom: 1px solid #EBEBEB;
      }
    }
    .c-table-wrap {
      padding: 16px;
    }
  }
</style>
