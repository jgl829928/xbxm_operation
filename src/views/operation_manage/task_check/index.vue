<template>
  <div class="contract-receipts task-check">
    <el-form class="c-search-form" :model="pageParams" ref="pageParams" label-width="" :inline="true"
             label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="年月" prop="itemName">
            <el-date-picker
              v-model.trim="pageParams.years"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择年月">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商场名称" prop="skuCode">
            <selectMarket :reqData="pageParams"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="楼层经理" prop="itemCode">
            <el-select v-model.trim="pageParams.floorManagerId" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in floorManagerOption"
                :key="index"
                :label="item.employeeName"
                :value="item.empId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="16">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="getPageList(1)">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="c-table-wrap">
      <el-table
        :data="tableList"
        style="width: 100%"
        align="center"
        stripe height="500">
        <el-table-column
          align="center"
          type="index"
          label="序号"
          min-width="50"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="years"
          label="年月">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="marketName"
          label="商场名称">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="floorManagerName"
          label="楼层经理">
        </el-table-column>
        <el-table-column
          align="center"
          prop="monthOverdueAmount"
          min-width="110"
          label="本月逾期欠款金额任务">
        </el-table-column>
        <el-table-column
          align="center"
          prop="monthAmountReceivable"
          min-width="110"
          label="本月应收款金额任务">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="110"
          prop="actuallyMonthOverdueAmount"
          label="实收本月逾期欠款金额">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="110"
          prop="actuallyMonthAmountReceivables"
          label="实收本月应收款金额">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="receivablesCompletionRate"
          label="收款完成率">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="advancePayment"
          label="提前收款金额">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="overdueUnsignedTasks"
          label="逾期未签户数任务">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="monthSignNumTasks"
          label="本月应签户数任务">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="completeOverdueSignNum"
          label="完成逾期续签户数">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="completeMonthSignNum"
          label="完成本月应签户数">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="renewCompletionRate"
          label="续签完成率">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="advanceSignNum"
          label="提前签约户数">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="monthlyInvestmentAreaTask"
          label="月度招商面积任务">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="110"
          prop="monthlyActualFinishArea"
          label="月度实际完成招商面积">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="investmentCompletionRate"
          label="招商完成率">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="additionalMerchantsNum"
          label="额外招商面积">
        </el-table-column>
      </el-table>
    </div>
    <Pagenation :pageparams="pageDefault" @handlePage="getPageList" :itemList="tableList"/>
  </div>
</template>

<script>
  import Pagenation from '@/components/pagenation';
  import selectMarket from '@/components/selectMarket';
  import api from '@/api/operation-manage';

  export default {
    name:'taskCheck',
    components: {
      Pagenation,
      selectMarket
    },
    data() {
      return {
        pageDefault: {//分页默认参数
          totalRecords: 0,
          currentPage: 1,
          pageSize: 20
        },
        pageParams: {//表格查询参数
          marketCode: '',
          years: '',
          floorManagerId: '',
          currentPage: 1
        },
        tableList: [],
        storeNameOption: [],//商场名称下拉框
        floorManagerOption: [],//商场名称下拉框
      }
    },
    methods: {
      getOptionData() {
        //商场名称下拉框
        let storeNameOption = this.$http.get(api.allStore);
        let floorManagerOption = this.$http.get(api.floorManagerOption);
        Promise.all([storeNameOption,floorManagerOption]).then(res => {
          if (res[0].code === 0) {
            this.storeNameOption = [];
            this.storeNameOption = [...res[0].data];
          }
          if (res[1].code === 0) {
            this.floorManagerOption = [];
            this.floorManagerOption = [...res[1].data];
          }
        })
      },
      async getPageList(index) {
        this.pageParams.currentPage = index || 1;
        this.pageDefault.currentPage = index || 1;
        let res = await this.$http.get(api.monthCheckList, {params: this.pageParams});
        if (res.code === 0) {
          this.pageDefault.totalRecords = res.page.totalRecords;
          this.tableList = [];
          this.tableList = [...res.data];
        }
      },
      indexMethod(index) {
        return index + (this.pageParams.currentPage - 1) * 20 + 1
      },
    },
    beforeMount() {
      this.getOptionData();
      this.getPageList();
    }
  };
</script>
<style lang="less" scoped>
  .contract-receipts {
    .footer-btn {
      width: 342px;
      text-align: right;
    }
  }

  .unit-div {
    margin-top: 30px;
    text-align: right;
  }
</style>
<style lang="less">
  .task-check {

  }
</style>
