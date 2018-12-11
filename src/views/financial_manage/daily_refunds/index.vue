<template>
  <div class="contract-refunds">
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true"
             label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商场名称" >
            <selectMarket :reqData="reqData"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户名称">
            <el-input clearable v-model.trim="reqData.merchantName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="退款审核状态" >
            <el-select v-model.trim="reqData.refundAuditStatus" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in statusList"
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
          <el-form-item label="负责人">
            <el-input clearable v-model.trim="reqData.leaderName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话" >
            <el-input clearable v-model.trim="reqData.leaderTel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="付款方式" >
            <el-select v-model.trim="reqData.payMode" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in payWay"
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
          <el-form-item label="退款费用状态" >
            <el-select v-model.trim="reqData.refundCostStatus" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in statusCostList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="退款起止时间">
            <el-date-picker
              class="picker-time-interval"
              v-model.trim="refundTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
          prop="expenseName"
          label="费用名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="merchantName"
          label="商户名称"
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
          prop="marketName"
          label="商场名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="amount"
          label="账单金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="cumulativePaidAmount"
          label="已缴金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="payedTransactionTime"
          label="交款时间"
          min-width="165">
        </el-table-column>
        <el-table-column
          align="center"
          label="付款方式"
          min-width="110">
          <template slot-scope="scope">
            <span>{{scope.row.payMode? scope.row.payMode.desc: ''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderNo"
          label="第三方交易流水号"
          min-width="160">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="退款申请时间"
          min-width="165">
        </el-table-column>
        <el-table-column
          align="center"
          prop="refundAmount"
          label="申请退款金额"
          min-width="110">
        </el-table-column>
        <el-table-column
          align="center"
          prop="totalRefundAmount"
          label="已退款金额"
          min-width="110">
        </el-table-column>
        <el-table-column
          align="center"
          label="退款审核状态"
          min-width="110">
          <template slot-scope="scope">
            <span>{{scope.row.refundAuditStatus? scope.row.refundAuditStatus.desc: ''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="退款费用状态"
          min-width="110">
          <template slot-scope="scope">
            <span>{{scope.row.refundCostStatus? scope.row.refundCostStatus.desc: ''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="refundResean"
          label="退款原因"
          min-width="120">
        </el-table-column>
        <!--<el-table-column
          align="center"
          prop="refundTransactionTime"
          label="退款操作时间"
          min-width="165">
        </el-table-column>-->
        <el-table-column
          align="center"
          prop="refundOperateUser"
          label="退款操作人"
          min-width="90">
        </el-table-column>
        <el-table-column
          align="center"
          prop="refundTime"
          label="退款成功时间"
          min-width="165">
        </el-table-column>
        <el-table-column
          align="center"
          prop="comment"
          label="备注"
          min-width="160">
        </el-table-column>
        <el-table-column
          align="center"
          width="300"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button class="btn-handle" type="primary" @click="handlingDialog(1,scope.row)"
                       :disabled="!(btnCheck('review',scope.row) && scope.row.canAudit)">审核</el-button>
            <el-button class="btn-handle" type="primary" @click="handlingDialog(2,scope.row)"
                       :disabled="!btnCheck('refund',scope.row)">退款</el-button>
            <el-button class="btn-handle" type="primary" @click="viewSchedule(scope.row.refundId)"
                       :disabled="!btnCheck('schedule',scope.row)">查看进度</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <pagenation :pageparams="pageInfo" :itemList="itemList" @handlePage="handlePage"/>
    <!--审核&退款-->
    <handleDialog ref="handleDia" :handleSta="handleSta" :dataList="refundDetail" @submitCheckProp="submitCheckProp"/>
    <!--查看进度-->
    <el-dialog
      title="退款审核进度"
      :visible.sync="scheduleDialog"
      width="30%"
      class="m-dialog el-steps-dialog">
      <el-steps :space="200" :active="curProgressActive" align-center >
        <el-step v-for="(item, index) in reviewProgress"
                 :key="index" :title="item.auditRoles"
                 :description="item.auditorName"></el-step>
      </el-steps>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="scheduleDialog = false" class="btn-save">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Api from '@/api/financial'
  import { pageListMixin,ajaxData } from '@/utils/mixin'
  import selectMarket from '@/components/selectMarket'
  import handleDialog from './_/handle-dialog'
  export default {
    name:'dailyRefunds',
    mixins: [pageListMixin,ajaxData],
    data() {
      return {
        handleSta: 1, // 操作 1:审核，2：退款
        scheduleDialog: false, //查看进度
        reqData: {
          merchantName: '',
          leaderName: '',
          leaderTel: '',
          payMode: '',
          marketCode: '',
          refundAuditStatus:'',
          refundCostStatus:'',
          currentPage:1
        },
        refundTime:[],
        payWay: [
/*          {label: '微信', value: 1},
          {label: '支付宝', value: 2},*/
          {label: 'POS机刷卡', value: 3},
          {label: '银行转账', value: 4},
          {label: '现金', value: 5}
        ],
        statusList: [
          {label: '退款待审核', value: 1},
          {label: '审核中', value: 2},
          {label: '审核不通过', value: 3},
          {label: '审核通过', value: 4},
        ],
        statusCostList: [
          {label: '待退款', value: 5},
          {label: '退款中', value: 6},
          {label: '已退款', value: 7},
          {label: '退款失败', value: 8}
        ],
        refundDetail:{}, //具体某条数据
        reviewProgress:[] ,//审核进度
      }
    },
    computed:{
      curProgressActive() {
        for(let i=this.reviewProgress.length; i>0 ; i--){
          if(this.reviewProgress[i-1].conclusion && this.reviewProgress[i-1].conclusion.code === 4){
            return i
          }
        }
        return 0
      },
    },
    mounted() {
      this.getList(Api.refundsList);
    },
    methods: {
      btnCheck(type,staItem) {
        let reviewCode = staItem.refundAuditStatus.code, refundCode = staItem.refundCostStatus.code;
        if(type === 'review'){
          if(!this.checkKey('dailyRefunds_2')) return false;
          if(reviewCode === 1 || reviewCode === 2) return true;
          return false;
        }else if(type === 'refund'){
          if (!this.checkKey('dailyRefunds_3')) {
           return false
          }
          if (reviewCode === 4 && refundCode !== 7) {
           return true
          }
          return false;
        }else if(type === 'schedule'){
          if(!this.checkKey('dailyRefunds_4')) return false;
          if(reviewCode) return true;
          return false;
        }
      },
      search() {
        this.reqData.currentPage = 1;
        this.getList(Api.refundsList);
      },
      handlingDialog(sta, row) {
        this.handleSta = sta;
        this.refundDetail = row;
        this.$refs.handleDia.openDialog();
      },
      viewSchedule(refundId) {
        this.ajaxGet({
          url: `${Api.refundsList}/${refundId}`,
          callBack: (res)=>{
            this.reviewProgress = res.data;
            this.scheduleDialog = true;
          }
        });
      },
      submitCheckProp(){
        this.getList(Api.refundsList);
      }
    },
    components:{
      handleDialog,
      selectMarket
    }
  };
</script>

<style lang="less" scoped>
  .contract-refunds {
    .el-button + .el-button {
      margin-left: 2px;
    }
  }
</style>
