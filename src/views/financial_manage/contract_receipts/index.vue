<template>
  <div class="contract-receipts">
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="122px" :inline="true"
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
        <!--<el-col :span="8">
          <el-form-item label="付款方式">
            <el-select v-model.trim="reqData.payType" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in payWay"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select v-model.trim="reqData.costStatus" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="约定交款起止时间">
            <el-date-picker
              class="picker-time-interval"
              v-model.trim="paymentTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
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
          label="约定交款时间"
          min-width="165">
          <template slot-scope="scope">
            <p v-if="scope.row.expectPayTimeList && scope.row.expectPayTimeList.length"
            v-for="(item,index) in scope.row.expectPayTimeList" :key="index"
            >{{item}}</p>
          </template>
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
          label="状态"
          min-width="110">
          <template slot-scope="scope">
            <span>{{ scope.row.paymentStatus ? scope.row.paymentStatus.desc:'' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="payAmount"
          label="交款金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="latestUpdateUser"
          label="操作人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="latestPayTime"
          label="交款操作时间"
          min-width="165">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          min-width="110">
          <template slot-scope="scope">
            <el-button :disabled="!checkKey('contractReceipts_2')" class="btn-handle" type="primary"
                       @click="toPage(scope.row.contractBatchNum)">
              收款
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <pagenation :pageparams="pageInfo" :itemList="itemList" @handlePage="handlePage"/>

    <!--合同详情-->
    <detailDialog ref="detailDialog" :curType="1" :itemDetail="itemDetail"/>
  </div>
</template>

<script>
  import Api from '@/api/financial'
  import { pageListMixin } from '@/utils/mixin'
  import detailDialog from '../_/detailDialog'
  import selectMarket from '@/components/selectMarket'
export default {
  name:'contractReceipts',
  mixins: [pageListMixin],
  data() {
    return {
      paymentTime:[], //交款时间
      reqData:{
        merchantName:'',
        contractBatchNum:'',
        payType:'',
        costStatus:'',
        marketCode:'',
        currentPage:1
      },
      payWay:[
        {label: '微信', value: 1},
        {label: '支付宝', value: 2},
        {label: 'POS机刷卡', value: 3}
      ],
      statusList:[
        {label: '未交款', value: 1},
        {label: '已交款', value: 4},
        {label: '部分交款', value: 2}
      ],
      itemDetail:{}, //单个详情
    }
  },
  mounted() {
    let marketCode = this.$route.params.marketCode || '';
    if(marketCode) this.reqData.marketCode = marketCode;
    this.getList(Api.contractCosts);
  },
  methods: {
    toPage(contractBatchNum) {
      this.$router.push({name:'contractRecCashIn', params:{ contractBatchNum : contractBatchNum}})
    },
    search() {
      this.reqData.currentPage = 1;
      this.getList(Api.contractCosts);
    },
    async viewContract(contractBatchNum) {
      let res = await this.$http.get(`${Api.contractCosts}/${contractBatchNum}`);
      if(res){
        this.itemDetail = res.data;
        this.$refs.detailDialog.showDialog();
      }
    }
  },
  components:{
    detailDialog,
    selectMarket
  }
};
</script>
<style lang="less">
  .contract-receipts{
    .c-search-form .el-form-item__label{
      padding-right: 10px;
    }
  }
</style>
