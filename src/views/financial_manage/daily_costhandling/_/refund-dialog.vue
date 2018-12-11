<template>
  <el-dialog title="日常费用-申请退款" :visible.sync="refundDialog" class="l-dialog refund-dialog">
    <el-form :model="dialogData" :rules="rules" ref="dialogData" label-width="106px" :inline="true"
             label-position="right">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="商户名称">
            <span class="u-value">{{refundDetail.merchantName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商场名称">
            <span class="u-value">{{refundDetail.marketName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="摊位号">
            <span class="u-value">{{refundDetail.boothId}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="费用类型">
            <span class="u-value">{{refundDetail.expenseProperty}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="金额">
            <span class="u-value">{{refundDetail.amount}}元</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="交款日期">
             <span class="u-value">{{refundDetail.payTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="退款金额" prop="refundAmount">
            <el-input clearable v-model.trim="dialogData.refundAmount "></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <span class="u-value">
              {{refundDetail.billStatus === 2 ? '部分交款' : '已交款'}}
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="u-area-input">
        <el-col :span="24">
          <el-form-item label="退款原因" prop="refundResean">
            <el-input type="textarea" v-model.trim="dialogData.refundResean"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="btn-save" type="primary" @click="submitDialog">保存</el-button>
      <el-button class="btn-reset" type="primary" @click="refundDialog = false">取消</el-button>
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
      refundDetail:''
    },
    data() {
      var validateRefundAmount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入退款金额'));
        }
        if (!/^\d+(\.\d+)?$/.test(value.trim()) || value.trim() <= 0 ) {
          callback(new Error('请输入正确的的数字值'));
        }else if(value.trim() > this.refundDetail.amount){
          callback(new Error('退款金额不得大于收款金额'));
        }else{
          callback();
        }
      };
      return {
        refundDialog:false,
        dialogData:{
          refundAmount:'',
          refundResean:''
        },
        option: [
          {label: '微信', value: 1},
          {label: '支付宝', value: 2},
          {label: 'POS机刷卡', value: 3}
        ],
        rules: {
          refundAmount: [
            {required: true, validator: validateRefundAmount, trigger: 'blur' }
          ],
          refundResean: [
            {required: true, message: '请输入退款原因', trigger: 'blur'}
          ],
        },
      }
    },
    methods:{
      openDialog() {
        this.refundDialog = true;
        setTimeout(()=>{
          this.$refs.dialogData.resetFields();
        },10);

      },
      submitDialog() {
        this.ajaxPost({
          url: Api.refundsList,
          validateModel: 'dialogData',
          data: {
            ...this.dialogData,
            expenseId: this.refundDetail.expenseId
          },
          callBack: ()=>{
            this.$message.success('申请成功');
            this.$emit('submitCheckProp');
            this.refundDialog = false;
          }
        });
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
