<template>
  <div class="sign-handle-wrap">
    <h4>合同-审核</h4>
    <el-form class="c-detail-form" :model="itemData" :rules="rules" ref="itemData" label-width="124px"
             label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商户名称">
            <span>{{detailData.merchantName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="品类-品牌">
            <span>{{detailData.brandName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="注册号">
            <span>{{detailData.loginNumber}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="负责人">
            <span>{{detailData.leaderName}}</span>
          </el-form-item>
        </el-col>
        <el-col :offset="8" :span="8">
          <el-form-item label="负责人身证号">
            <span>{{detailData.leaderCard}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="摊位号">
            <span>{{ detailData.boothId | boothIdString}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="使用面积">
            <span>{{detailData.useableAcreage}}m²</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公司参考单价">
            <span>{{detailData.companyBoothPrice}}元/平米/月</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="公摊比例">
            <span>{{detailData.publicScale}}%</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计租面积">
            <span>{{ detailData.rentAcreage }}m²</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="摊位单价">
            <span>{{detailData.boothPrice}}元/平米/月</span>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="detailData.merchantType ? detailData.merchantType.code === 1 : false">
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同开始时间">
              <span>{{detailData.rentBeginTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同结束时间">
              <span>{{detailData.rentEndTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="租赁期/合同期">
              <span>{{detailData.rentPeriod}}月</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="优惠开始时间">
              <span>{{detailData.discountsBeginTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="优惠结束日时间">
              <span>{{detailData.discountsEndTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="优惠期">
              <span>{{detailData.discountsPeriod}}月</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="计租开始时间">
              <span>{{detailData.hireBeginTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计租结束日时间">
              <span>{{detailData.hireEndTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计租期">
              <span>{{detailData.hirePeriod}}月</span>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <el-row>
          <el-col :span="8">
            <el-form-item label="租赁期/合同期">
              <span>{{detailData.rentPeriod}}月</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="优惠期">
              <span>{{detailData.discountsPeriod}}月</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计租期">
              <span>{{detailData.hirePeriod}}月</span>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <el-row>
        <el-col :span="8">
          <el-form-item label="首付周期">
            <span>{{detailData.downPaymentPeriod}}月</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="摊位租金/商铺租金">
            <span>{{detailData.totalAmount}}元</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="优惠扣回">
            <span>{{detailData.deductDiscountsDay}}天</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="input-textarea-box" label="备注">
            <span>{{detailData.contractComment}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="cost-title">费用列表</p>
      <reviewTable :itemList="detailData.contractCostPhaseList || []"/>
      <el-row>
        <el-col :span="24">
          <el-form-item class="input-textarea-box special-item" label="审核结果">
            <el-radio-group v-model.trim="itemData.checkStatus" @change="resetForm">
              <el-radio :label="4">通过</el-radio>
              <el-radio :label="3">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="detailData.ifChoose">
        <el-col :span="24">
          <el-form-item class="input-textarea-box special-item" label="审核流程" prop="auditProcessTypeCode">
            <el-radio-group v-model.trim="itemData.auditProcessTypeCode">
              <el-radio :label="2">常规审核</el-radio>
              <el-radio :label="4">非常规审核</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="input-textarea-box special-item" label="审核意见"
                        prop="checkOpinion"
                        :rules=" itemData.checkStatus === 3 ? rules.checkOpinion:[{ required: false }]">
            <el-input type="textarea" v-model.trim="itemData.checkOpinion"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="c-detail-footer-box">
      <el-button type="primary" @click="submit">保存</el-button>
      <el-button class="cancel-btn" type="primary" @click="cancelHandle">取消</el-button>
    </div>
  </div>
</template>
<script>
  import Api from '@/api/contact'
  import reviewTable from './_/reviewTable'
  export default {
    name:'contractReview',
    data() {
      return {
        detailData:{},
        itemData:{
          checkOpinion:'',
          checkStatus: 4,
          auditProcessTypeCode:'',
          contractBatchNum:''
        },
        rules:{
          auditProcessTypeCode:[{ required: true, message: '请选审核流程', trigger: 'change' }],
          checkOpinion:[{ required: true, message: '请输入审核意见', trigger: 'blur' }],
        },
      }
    },
    components:{
      reviewTable
    },
    mounted() {
      let contractBatchNum = this.$route.params.contractBatchNum || '';
      if(!contractBatchNum){
        this.$router.go(-1)
      }else {
        this.itemData.contractBatchNum = contractBatchNum;
        this.getData(contractBatchNum);
      }
    },
    methods: {
      async getData(contractBatchNum) {
        let res = await this.$http.get(`${Api.checkButtonUrl}?contractBatchNum=${contractBatchNum}`);
        if(res) {
          this.detailData = res.data;
          if(res.data.companyBoothPrice === res.data.boothPrice) this.itemData.auditProcessTypeCode = 2;
        }
      },
      submit() {
        this.$refs['itemData'].validate(async (valid) => {
          if (valid) {
            let res = await this.$http.post( Api.contractsChecks, this.itemData );
            if(res) {
               this.$message.success('操作成功');
               this.cancelHandle();
            }
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$refs['itemData'].resetFields();
      },
      cancelHandle() {
        this.$router.push('/contact/audit');
      }
    },
    filters: {
      boothIdString(arr) {
        if(!arr || !arr.length) return '';
        return arr.join('、')
      }
    }
  };
</script>
<style lang="less" scoped>
  .sign-handle-wrap{
    padding-bottom: 90px;
    h4{
      font-size: 16px;
      color: #444;
      text-align: center;
      font-weight: bold;
    }
    .c-detail-form{
      padding: 30px;
      .el-form-item__content{
        &>span{
          color: #9B9B9B;
        }
        &>label{
          margin-left: 4px;
        }
      }
    }
    .cost-title{
      height: 38px;
      line-height: 38px;
      padding-left: 32px;
      background: #FFF7F2;
    }
  }
</style>
<style lang="less">
  .sign-handle-wrap {
    .c-detail-form{
      .el-form-item{
        .el-form-item__label, .el-form-item__content{
          line-height: 30px;
          font-size: 12px;
        }
        .el-input__icon{
          line-height: 30px;
        }
        .el-input{
          width: 170px;
          input{
            height: 30px;
            line-height: 30px;
          }
        }
      }
      .el-row{
        &>div>div{
          display: inline-block;
          width: 360px;
          text-align: left;
          &.input-textarea-box{
            width: calc(~'100% - 66px');
            min-width: 916px;
          }
        }
        &>div:last-child{
          text-align: right;
        }
        &>div:first-child{
          text-align: left;
        }
        &>div{
          text-align: center;
        }
      }
      .special-item{
        width: 100% !important;
        label{
          width: 70px !important;
        }
        .el-form-item__content{
          margin-left: 70px !important;
        }
      }
    }
  }
</style>
