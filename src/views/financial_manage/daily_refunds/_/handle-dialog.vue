<template>
  <el-dialog :title="handleSta === 1 ? '日常退款-审核':'日常退款'" :visible.sync="handleDialog" class="l-dialog refund-dialog">
    <el-form :model="dialogData" :rules="rules" ref="dialogData" label-width="106px" :inline="true"
             label-position="right">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="商户名称">
            <span class="u-value">{{dataList.merchantName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商场名称">
            <span class="u-value">{{dataList.marketName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="摊位号">
            <span class="u-value">{{dataList.boothId}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="费用类型">
            <span class="u-value">{{dataList.expenseProperty}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="付款类型">
            <span class="u-value">{{dataList.payMode? dataList.payMode.desc: ''}}</span>
            <!--<span class="u-value">{{dataList.payMode==1? '微信': (dataList.payMode==2? '支付宝': (dataList.payMode==3? '银行转账': 'POS机刷卡'))}}</span>-->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商户订单号">
            <span class="u-value">{{dataList.orderNo}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="交款金额">
            <span class="u-value">{{dataList.amount}}元</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="交款时间">
             <span class="u-value">{{dataList.payedTransactionTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="退款金额">
            <span class="u-value">{{dataList.refundAmount}}元</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <span class="u-value">{{dataList.paymentStatus? dataList.paymentStatus.desc: ''}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="申请人">
            <span class="u-value">{{dataList.refundApplicant}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="退款申请时间">
            <span class="u-value">{{dataList.createTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="24">
          <el-form-item label="退款原因">
            <span class="u-value">{{dataList.refundResean}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="handleSta === 1">
        <el-row :gutter="32">
          <el-col :span="24">
            <el-form-item label="审核结果">
              <el-radio-group v-model.trim="dialogData.conclusion">
                <el-radio :label="4">通过</el-radio>
                <el-radio :label="3">不通过</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="u-area-input" v-if="dialogData.conclusion === 3">
          <el-col :span="24">
            <el-form-item label="备注" prop="comment">
              <el-input type="textarea" v-model.trim="dialogData.comment"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="btn-save" type="primary" @click="submitDialog">{{ handleSta === 1 ? '保存':'退款' }}</el-button>
      <el-button class="btn-reset" type="primary" @click="handleDialog = false">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import Api from '@/api/financial'
  import { ajaxData } from '@/utils/mixin'
  export default {
    mixins:[ajaxData],
    props:{
      someObj:{
        type:Array,
        default() {
          return []
        }
      },
      handleSta:{
        type:Number,
        required:true
      },
      dataList:''
    },
    data() {
      return {
        handleDialog:false,
        dialogData:{
          conclusion: 4,
          comment: '',
          contractBatchNum: '-',
          refundId: this.dataList.refundId
        },
        option: [
          {label: '微信', value: 1},
          {label: '支付宝', value: 2},
          {label: 'POS机刷卡', value: 3}
        ],
        rules: {
          comment: [
            {required: true, message: '请输入备注内容', trigger: 'blur'}
          ],
        },
      }
    },
    methods:{
      openDialog() {
        this.handleDialog = true;
      },
      submitDialog() {
        // 审核
        if(this.handleSta === 1){
          this.ajaxPut({
            url: `${Api.refundsList}`,
            data: {
              ...this.dialogData,
              refundId: this.dataList.refundId
            },
            validateModel: 'dialogData',
            resetForm: 'dialogData',
            callBack: ()=>{
              this.$message.success('成功');
              this.handleDialog = false;
              this.$emit('submitCheckProp');
            }
          })
        }else{
          this.ajaxPost({
            url: Api.refundsPay,
            data:{
              expenseId: this.dataList.expenseId,
              refundAmount: this.dataList.refundAmount,
              refundId: this.dataList.refundId
            },
            callBack: ()=>{
              this.$message.success('成功');
              this.handleDialog = false;
              this.$emit('submitCheckProp');
            }
          });
        }

      },
    }
  }
</script>
<style lang="less">
  .refund-dialog{
    .el-form--inline .el-form-item {
      width: 100%;
      vertical-align: unset;
    }
    .u-area-input .el-form-item__content {
      width: 82%;
      vertical-align: middle;
    }
    .u-value {
      color: #9B9B9B;
      vertical-align: bottom;
    }
  }
</style>
