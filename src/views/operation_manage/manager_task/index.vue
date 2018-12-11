<template>
  <div class="contract-receipts manager-task">
    <el-form class="c-search-form" :model="pageParams" ref="pageParams" label-width=""
             label-position="right" :inline="true">
      <el-row>
        <el-col :span="8">
          <el-form-item label="年度" prop="skuCode">
              <el-date-picker
                v-model.trim="pageParams.years"
                value-format="yyyy"
                type="year"
                placeholder="选择年">
              </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="月份" prop="skuCode">
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
        class="list-table"
        align="center"
        stripe height="500">
        <el-table-column
          align="center"
          label="序号"
          type="index"
          min-width="50"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="quotaYear"
          label="年度">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          label="月份"
          prop="quotaMonth">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="110"
          label="楼层经理"
          prop="floorManagerName">
        </el-table-column>
        <el-table-column
          align="center"
          prop="region"
          label="区域组名称"
          min-width="110">
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
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="monthDue"
          min-width="120"
          label="本月应收款总额"
          align="center">
        </el-table-column>
        <el-table-column
          min-width="120"
          prop="collectionDueTask"
          label="本月应收款任务"
          align="center">
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
          min-width="135"
          prop="contractNumTask"
          label="逾期未签户数任务"
          align="center">
        </el-table-column>
        <el-table-column
          min-width="120"
          prop="contractNumRenewTask"
          label="本月应续签任务"
          align="center">
        </el-table-column>
        <el-table-column
          min-width="120"
          prop="monthExpectedAmountReceipts"
          label="当期续签预计逾期欠款金额"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="expectedOverdueAmountTask"
          label="当期续签预计本月应收金额"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="expectedOverdueAmountTask"
          label="当期续签预计逾期欠款任务"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="monthExpectedAmountTask"
          label="当期续签预计本月应收任务"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="emptyArea"
          label="本区空场总面积"
          min-width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="emptyAreaLeaesTask"
          label="本月招商任务面积"
          min-width="135"
          align="center">
        </el-table-column>
        <el-table-column
          min-width="120"
          align="center"
          prop="auditStatus.desc"
          label="状态">
        </el-table-column>
        <el-table-column
          align="center"
          label="提交时间"
          min-width="165"
          prop="commitTime">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作" fixed="right"
          width="100">
          <template slot-scope="scope">
            <el-button class="btn-handle" type="primary" @click="openJudgeData(scope.row.monthTaskQuotaId)"
                       v-if="(scope.$index+1)!==tableList.length"
                       :disabled="!(scope.row.auditStatus?(scope.row.auditStatus.code===1):false)||!($store.getters.getPermission('managerTask_2'))"
                       >审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagenation :pageparams="pageDefault" @handlePage="getPageList" :itemList="tableList" />
    <el-dialog
      title="月度任务-审核"
      :visible.sync="centerDialogVisible"
      class="s-dialog">
      <div>
        <el-form ref="form" :model="form" label-width="70px">
          <el-form-item label="审核">
            <el-radio-group v-model.trim="form.auditStatus ">
              <el-radio :label="4">通过</el-radio>
              <el-radio :label="3">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注" class="otherInfo">
            <el-input type="textarea" v-model.trim="form.comment" placeholder="注：审核不通过则必填"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-save" type="primary" @click="submitJudgeData">保 存</el-button>
         <el-button class="btn-reset" type="primary" @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Pagenation from '@/components/pagenation';
  import api from '@/api/operation-manage';
  export default {
    name:'managerTask',
    components:{
      Pagenation
    },
    data() {
      return {
        pageDefault: {//分页默认参数
          totalRecords: 0,
          currentPage:1,
          pageSize: 20
        },
        pageParams:{//表格查询参数
          years:'',
          month:'',
          currentPage: 1
        },
        monthList:[
          {id:1,desc:'1月'},
          {id:2,desc:'2月'},
          {id:3,desc:'3月'},
          {id:4,desc:'4月'},
          {id:5,desc:'5月'},
          {id:6,desc:'6月'},
          {id:7,desc:'7月'},
          {id:8,desc:'8月'},
          {id:9,desc:'9月'},
          {id:10,desc:'10月'},
          {id:11,desc:'11月'},
          {id:12,desc:'12月'}
        ],
        provinceOption:[],//省下拉框
        storeNameOption:[],//商场名称下拉框
        tableList:[],//表格数据
        centerDialogVisible: false,
        monthTaskQuotaId:'',//经理月度任务Id
        form:{
          auditStatus:'',
          comment:''
        },
      }
    },
    methods: {
      async getPageList(index) {
        this.pageParams.currentPage = index || 1;
        this.pageDefault.currentPage = index || 1;
        let res=await this.$http.get(api.managerMonthList,{params:this.pageParams});
        if(res.code===0){
          this.pageDefault.totalRecords=res.page.totalRecords;
          this.tableList=[];
          this.tableList=[...res.data.list];
          if(JSON.stringify(res.data.summation)!=='{}'&&this.tableList.length>0){
            this.tableList.push({...res.data.summation});//合计行
          }
        }
      },
      indexMethod(index) {
        if((index+1)===this.tableList.length){//合计行
          return '合计';
        }
        return index + (this.pageParams.currentPage - 1)*20 + 1
      },
      openJudgeData(id){
        this.centerDialogVisible=true;
        this.monthTaskQuotaId =id;
        this.form. auditStatus='';
        this.form. comment='';
      },
      submitJudgeData(){
        if(this.form.auditStatus===3&&this.form.comment===''){
           return this.$message.error('审核不通过，备注必填！')
        }
        this.form.monthTaskQuotaId =this.monthTaskQuotaId ;
        this.$http.post(api.judgeMonthTask,this.form).then(res=>{
          if(res.code===0){
            this.$message.success('保存成功');
            this.getPageList();
            this.centerDialogVisible=false;
          }
        })
      }
    },
    beforeMount(){
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
</style>
<style lang="less">
  .manager-task {
    .s-dialog {
      .otherInfo .el-form-item__label {
        line-height: normal;
      }
      .otherInfo .el-form-item__content {
        width: 200px;
      }
    }
    .el-table__body{
      .el-table__row:last-child{
        .cell{
          font-weight: bold;
        }
      }
    }
  }
</style>
