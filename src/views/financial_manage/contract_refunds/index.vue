<template>
  <div class="contract-refunds">
    <el-form  class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true"
              label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商场名称">
            <selectMarket :reqData="reqData"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户名称">
            <el-input clearable v-model.trim="reqData.merchantName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同批次号">
            <el-input clearable v-model.trim="reqData.contractBatchNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="缴费状态">
            <el-select v-model.trim="reqData.paymentStatus" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in paymentStatusList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="退款审核状态">
            <el-select v-model.trim="reqData.refundAuditStatus" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in refundAuditStatusList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="退款状态">
            <el-select v-model.trim="reqData.refundStatus" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in refundStatusList"
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
          <el-form-item label="联系电话">
            <el-input clearable v-model.trim="reqData.leaderTel"></el-input>
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
        align="center"
        height="500"
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
          label="合同批次号"
          min-width="160">
          <template slot-scope="scope">
            <a @click="viewContract(scope.row.contractBatchNum)">{{ scope.row.contractBatchNum }}</a>
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
          prop="createTime"
          label="合同生成时间"
          min-width="165">
        </el-table-column>
        <el-table-column
          align="center"
          label="缴费状态"
          min-width="110">
          <template slot-scope="scope">
            <span>{{ scope.row.paymentStatus ? scope.row.paymentStatus.desc:'' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="totalAmount"
          label="账单金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="paidAmount"
          label="已缴金额">
        </el-table-column>
        <el-table-column
          align="center"
          label="退款审核状态"
          min-width="110">
          <template slot-scope="scope">
            <span>{{ scope.row.refundAuditStatus ? scope.row.refundAuditStatus.desc: ''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="退款状态"
          min-width="110">
          <template slot-scope="scope">
            <span>{{ scope.row.refundStatus ? scope.row.refundStatus.desc: ''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="refundAuditAmount"
          label="申请退款金额"
          min-width="110">
        </el-table-column>
        <el-table-column
          align="center"
          prop="refundAmount"
          label="已退款金额"
          min-width="110">
        </el-table-column>
        <el-table-column
          align="center"
          prop="refundApplyTime"
          label="退款申请时间"
          min-width="165">
        </el-table-column>
        <el-table-column
          align="center"
          prop="refundApplyUserName"
          label="申请人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="refundOptTime"
          label="退款操作时间"
          min-width="165">
        </el-table-column>
        <el-table-column
          align="center"
          prop="refundOptUserName"
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
          prop="refundMessage"
          label="备注"
          min-width="160">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="380"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button class="btn-handle" type="primary"
                       :disabled="!btnCheck('apply',scope.row)"
                       @click="toPage('contractApplyRef', scope.row.contractBatchNum)">
              退款申请
            </el-button>
            <el-button class="btn-handle" type="primary"
                       :disabled="!(btnCheck('review',scope.row) && scope.row.canAudit)"
                       @click="toPage('contractRefReview', scope.row.contractBatchNum)">
              审核
            </el-button>
            <el-button class="btn-handle" type="primary"
                       :disabled="!btnCheck('refund',scope.row)" @click="toPage('contractRef', scope.row.contractBatchNum)">
              退款
            </el-button>
            <el-button class="btn-handle" type="primary" @click="viewSchedule(scope.row)"
                       :disabled="!btnCheck('schedule',scope.row)">查看进度</el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <pagenation :pageparams="pageInfo" :itemList="itemList" @handlePage="handlePage"/>

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

    <!--合同详情-->
    <detailDialog ref="detailDialog" :curType="2" :itemDetail="itemDetail"/>
  </div>
</template>

<script>
import Api from '@/api/financial'
import detailDialog from '../_/detailDialog'
import { pageListMixin } from '@/utils/mixin'
import selectMarket from '@/components/selectMarket'
export default {
  name: 'contractRefunds',
  mixins: [pageListMixin],
  data() {
    return {
      scheduleDialog: false,
      reqData: {
        merchantName: '',
        contractBatchNum: '',
        leaderName: '',
        refundAuditStatus: '',
        marketCode: '',
        leaderTel: '',
        currentPage: 1
      },
      payWay: [
        {label: '微信', value: 1},
        {label: '支付宝', value: 2},
        {label: 'POS机刷卡', value: 3}
      ],
      refundAuditStatusList: [
        {label: '未发生', value: 0},
        {label: '退款待审核', value: 1},
        {label: '审核中', value: 2},
        {label: '审核不通过', value: 3},
        {label: '审核通过', value: 4},
      ],
      paymentStatusList: [
        {label: '已交款', value: 4},
        {label: '部分交款', value: 2}
      ],
      refundStatusList: [
        {label: '未发生', value: 0},
        {label: '待退款', value: 5},
        {label: '退款中', value: 6},
        {label: '已退款', value: 7},
        {label: '退款失败', value: 8}
      ],
      itemDetail: {}, //单个合同详情
      reviewProgress: [], //审核进度
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
    this.getList(Api.contractRefund);
  },
  methods: {
    toPage(name, contractBatchNum) {
      this.$router.push({name: name, params: {contractBatchNum: contractBatchNum}})
    },
    // 审核 退款 状态判断
    btnCheck(type, staItem) {
      let reviewCode = staItem.refundAuditStatus.code  // 审核状态
      let refundCode = staItem.refundStatus.code  // 退款状态
      if (type === 'apply') {
        if (!this.checkKey('contractRefunds_2')) return false
        if (reviewCode === 0 || reviewCode === 3) return true
        return false
      } else if (type === 'review') {
        if (!this.checkKey('contractRefunds_3')) return false
        if (reviewCode === 1 || reviewCode === 2) return true
        return false
      } else if (type === 'refund') {
        if (!this.checkKey('contractRefunds_4')) return false
        if (reviewCode === 4 && refundCode !== 6 && refundCode !== 7) return true
        return false;
      } else if (type === 'schedule') {
        if (!this.checkKey('contractRefunds_5')) return false
        if (reviewCode !== 0 || refundCode === 7) return true
        return false
      }
    },

    async viewSchedule(bean) {
      let data = {
        contractBatchNum: bean.contractBatchNum,
        contractCostId: bean.contractCostId,
        refundId: bean.refundId
      };
      let res = await this.$http.get(Api.refundPlan, {params: data});
      if (res) {
        this.reviewProgress = res.data;
        this.scheduleDialog = true;
      }
    },
    // 查看合同
    async viewContract(contractBatchNum) {
      let res = await this.$http.get(`${Api.contractDetail}/${contractBatchNum}`);
      if (res) {
        this.itemDetail = res.data;
        this.$refs.detailDialog.showDialog();
      }
    },
    search() {
      this.reqData.currentPage = 1;
      this.getList(Api.contractRefund);
    },
  },
  components: {
    detailDialog,
    selectMarket
  }
}
</script>
<style lang="less" scoped>
  .contract-refunds{
    .el-button+.el-button{
      margin-left: 2px;
    }
  }
</style>
