<template>
  <div class="contract-receipts monthly-task">
    <el-form class="c-search-form" :model="pageParams" ref="pageParams" label-width="" :inline="true"
             label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="年度">
            <el-date-picker
              v-model.trim="pageParams.years"
              value-format="yyyy"
              type="year"
              placeholder="选择年">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="月份">
            <el-select v-model.trim="pageParams.month" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in monthList"
                :key="index"
                :label="item.desc"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="getPageList(1)">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="unit-div"><span>单位</span><span>元、平方米、户</span></div>
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
          width="50"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          align="center"
          label="年度"
          min-width="110"
          prop="quotaYear">
        </el-table-column>
        <el-table-column
          align="center"
          label="月份"
          min-width="110"
          prop="quotaMonth">
        </el-table-column>
        <el-table-column
          align="center"
          label="楼层经理"
          min-width="110"
          prop="floorManagerName">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          label="区域组名称"
          prop="region">
        </el-table-column>
        <el-table-column
          prop="arrear"
          label="本年度前期欠款总金额（含以往所有欠款金额）"
          min-width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="collectionArrearTask"
          label="本月前期欠款收款任务"
          min-width="120"
          align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model.trim="scope.row.collectionArrearTask" v-if="scope.row.editStatus===9"></el-input>
            <span v-else>{{scope.row.collectionArrearTask}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="monthDue"
          label="本月应收款总额"
          min-width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="collectionDueTask"
          label="本月应收款任务"
          min-width="120"
          align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model.trim="scope.row.collectionDueTask" v-if="scope.row.editStatus===9"></el-input>
            <span v-else>{{scope.row.collectionDueTask}}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="120"
          prop="contractNumBeyondTimeLimit"
          label="逾期未签户数"
          align="center">
        </el-table-column>
        <el-table-column
          min-width="120"
          prop="contractNumRenew"
          label="本月应续签户数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="contractNumTask"
          label="逾期未签户数任务"
          min-width="135"
          align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model.trim="scope.row.contractNumTask" v-if="scope.row.editStatus===9"></el-input>
            <span v-else>{{scope.row.contractNumTask}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="contractNumRenewTask"
          label="本月应续签任务"
          min-width="120"
          align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model.trim="scope.row.contractNumRenewTask" v-if="scope.row.editStatus===9"></el-input>
            <span v-else>{{scope.row.contractNumRenewTask}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="monthExpectedAmountReceipts"
          label="当期续签预计逾期欠款金额"
          min-width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="monthExpectedAmount"
          min-width="120"
          label="当期续签预计本月应收金额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="expectedOverdueAmountTask"
          min-width="120"
          label="当期续签预计逾期欠款任务"
          align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model.trim="scope.row.expectedOverdueAmountTask"
                      v-if="scope.row.editStatus===9"></el-input>
            <span v-else>{{scope.row.expectedOverdueAmountTask}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="monthExpectedAmountTask"
          min-width="120"
          label="当期续签预计本月应收任务"
          align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model.trim="scope.row.monthExpectedAmountTask"
                      v-if="scope.row.editStatus===9"></el-input>
            <span v-else>{{scope.row.monthExpectedAmountTask}}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="120"
          prop="emptyArea"
          label="本区空场总面积"
          align="center">
        </el-table-column>
        <el-table-column
          prop="emptyAreaLeaesTask"
          label="本月招商任务面积"
          min-width="135"
          align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model.trim="scope.row.emptyAreaLeaesTask" v-if="scope.row.editStatus===9"></el-input>
            <span v-else>{{scope.row.emptyAreaLeaesTask}}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="120"
          align="center"
          prop="taskStatus.desc"
          label="状态">
          <template slot-scope="scope">
            <div>{{(scope.row.taskStatus.code===1) ? scope.row.auditStatus.desc : scope.row.taskStatus.desc}}</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="300"
          label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button class="btn-handle" type="primary" @click="scope.row.editStatus=9"
                       :disabled="!($store.getters.getPermission('monthlyTask_4'))||scope.row.taskStatus.code===1"
                       >编辑</el-button>
            <el-button class="btn-handle" type="primary" @click="submitSingleData(scope.row,'草稿')"
                       :disabled="!($store.getters.getPermission('monthlyTask_2'))||scope.row.taskStatus.code===1"
                      >保存</el-button>
            <el-button class="btn-handle" type="primary" @click="submitSingleData(scope.row,'提交')"
                       :disabled="!($store.getters.getPermission('monthlyTask_3'))||scope.row.taskStatus.code===1"
                       >提交</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagenation :pageparams="pageDefault" @handlePage="getPageList" :itemList="tableList"/>
  </div>
</template>

<script>
  import Pagenation from '@/components/pagenation';
  import api from '@/api/operation-manage';

  export default {
    name:'monthlyTask',

    components: {
      Pagenation
    },
    data() {
      return {
        pageDefault: {//分页默认参数
          totalRecords: 0,
          currentPage: 1,
          pageSize: 20
        },
        pageParams: {//表格查询参数
          years: '',
          month: '',
          currentPage: 1
        },
        monthList: [
          {id: 1, desc: '1月'},
          {id: 2, desc: '2月'},
          {id: 3, desc: '3月'},
          {id: 4, desc: '4月'},
          {id: 5, desc: '5月'},
          {id: 6, desc: '6月'},
          {id: 7, desc: '7月'},
          {id: 8, desc: '8月'},
          {id: 9, desc: '9月'},
          {id: 10, desc: '10月'},
          {id: 11, desc: '11月'},
          {id: 12, desc: '12月'}
        ],
        provinceOption: [],//省下拉框
        storeNameOption: [],//商场名称下拉框
        tableList: [],//表格数据
        centerDialogVisible: false,
        form: {
          passRaido: '',
          desc: ''
        },
      }
    },
    methods: {
      async getPageList(index) {
        this.pageParams.currentPage = index || 1;
        this.pageDefault.currentPage = index || 1;
        let res = await this.$http.get(api.monthTaskTarget, {params: this.pageParams});
        if (res.code === 0) {
          this.pageDefault.totalRecords = res.page.totalRecords;
          this.tableList = [];
          let arr = [...res.data];
          for (let i = 0; i < arr.length; i++) {
            arr[i].editStatus = 10;
          }
          this.tableList = [...arr];
        }
      },
      indexMethod(index) {
        return index + (this.pageParams.currentPage - 1) * 20 + 1
      },
      submitSingleData(data, type) {
        //输入合法判断
        let arr = ['contractNumTask', 'contractNumRenewTask', 'collectionArrearTask', 'collectionDueTask', 'expectedOverdueAmountTask', 'monthExpectedAmountTask', 'emptyAreaLeaesTask'];
        let reg = /^\d+(?:\.\d{1,2})?$/;
        let reg1 = /^(0|[1-9][0-9]*)$/;
        let isContinue = false;
        for (let item of arr) {
          if (item === 'contractNumTask' && reg1.test(data[item]) === false) {
            this.$message.error('逾期未签户数任务只能输入大于等于零的整数');
            isContinue = true;
            break;
          } else if (item === 'contractNumRenewTask' && reg1.test(data[item]) === false) {
            this.$message.error('本月应续签任务只能输入大于等于零的整数');
            isContinue = true;
            break;
          } else {
            if (reg.test(data[item]) === false) {
              this.$message.error('请输入大于等于零的数字，最多保留两位小数');
              isContinue = true;
              break;
            }
          }
        }
        if (isContinue) {
          return false;
        }
        //输入合法判断结束
        if (type === '草稿') {
          let params = {...data};
          params.taskStatus = 0;
          this.$http.post(api.monthTaskSubmit, params).then(res => {
            if (res.code === 0) {
              this.$message.success('保存成功');
              data.editStatus = 10;
              this.getPageList();
            }
          })
        } else {
          let params = {...data};
          params.taskStatus = 1;
          this.$http.post(api.monthTaskSubmit, params).then(res => {
            if (res.code === 0) {
              data.editStatus = 10;
              this.$message.success('提交成功');
              this.getPageList();
            }
          })
        }
      }
    },
    beforeMount() {
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
  .table-input {
    width: 100%;
  }
</style>
<style lang="less">
  .monthly-task {
    .el-table .el-input input {
      height: 30px;
      line-height: 30px;
      padding: 0 2px;
    }
  }
</style>
