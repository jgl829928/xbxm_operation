<template>
  <div class="g-contract-search">
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true"
             label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同批次号">
            <el-input clearable v-model="reqData.contractBatchNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户名称">
            <el-input clearable v-model.trim="reqData.merchantName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select v-model.trim="reqData.contractStatus" clearable placeholder="请选择">
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
          <el-form-item label="合同编号">
            <el-input clearable v-model.trim="reqData.contractCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商场名称">
            <selectMarket :reqData="reqData"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="楼层经理">
            <el-input clearable v-model="reqData.floorManagerName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同类型">
            <el-select v-model="reqData.contractTypeCode" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in contractsTypeList"
                :key="index"
                :label="item.contractTypeName"
                :value="item.contractTypeCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法务编码">
            <el-input clearable v-model="reqData.contractCodeNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同开始日期">
            <el-date-picker
              class="picker-time-interval"
              v-model="beginTime"
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
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同结束日期">
            <el-date-picker
              class="picker-time-interval"
              v-model="endTime"
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
        <el-col :offset="8" :span="8">
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
          label="合同编号"
          min-width="160">
          <template slot-scope="scope">
            {{scope.row.contractCode}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="contractBatchNum"
          label="合同批次号"
          min-width="160">
        </el-table-column>
        <el-table-column
          align="center"
          prop="contractCodeNum"
          label="法务编码"
          min-width="160">
        </el-table-column>
        <el-table-column
          align="center"
          prop="contractTypeName"
          label="合同类型"
          min-width="110">
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
          prop="rentBeginTime"
          label="合同开始日期"
          min-width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="rentEndTime"
          label="合同结束日期"
          min-width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="merchantName"
          label="商户名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="brandName"
          label="经营品牌"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          label="摊位号"
          min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.boothId | boothIdString }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="floorManager"
          label="楼层经理">
        </el-table-column>
        <el-table-column
          align="center"
          label="审核状态"
          min-width="110">
          <template slot-scope="scope">
            <span>{{scope.row.contractCheckStatus ? scope.row.contractCheckStatus.desc :''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="合同状态"
          min-width="110">
          <template slot-scope="scope">
            <span>{{scope.row.contractStatus ? scope.row.contractStatus.desc :''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="是否盖章">
          <template slot-scope="scope">
            <span>{{scope.row.sealStatus ? scope.row.sealStatus.desc :''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="totalAmount"
          label="应缴金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="payAmount"
          label="已缴金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="unpaidAmount"
          label="未缴金额">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          min-width="200">
          <template slot-scope="scope">
            <el-button :disabled="!checkKey('contractSearch_1')" class="btn-handle" type="primary" @click="viewContract(scope.row)">
              查看合同
            </el-button>
            <el-button :disabled="!checkKey('contractSearch_2')" class="btn-handle" type="primary"
                       @click="viewSchedule(scope.row.contractBatchNum)">
              查看进度
            </el-button>
            <el-button v-if="false" class="btn-handle" type="primary">
              打印合同
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <pagenation :pageparams="pageInfo" :itemList="itemList" @handlePage="handlePage"/>

    <!--查看进度-->
    <el-dialog
      title="合同审核进度"
      :visible.sync="scheduleDialog"
      width="30%"
      class="m-dialog el-steps-dialog">
      <el-steps :space="200" :active="curProgressActive" align-center >
        <el-step v-for="(item, index) in progressList"
                 :key="index" :title="item.verifierCharacter"
                 :description="item.verifierName"></el-step>
      </el-steps>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="scheduleDialog = false" class="btn-save">关闭</el-button>
      </div>
    </el-dialog>

    <!--合同tpl-->
    <contractTpl ref="contractTpl" :tplData="tplData"/>
  </div>
</template>

<script>
  import Api from '@/api/contact'
  import { pageListMixin } from '@/utils/mixin'
  import contractTpl from '../c_html/index'
  import selectMarket from '@/components/selectMarket'
  export default {
    name:'contractSearch',
    mixins: [pageListMixin],
    data() {
      return {
        scheduleDialog:false,
        beginTime:[], // 合同开始日期
        endTime:[], // 合同结束日期
        tplData:{},
        progressList:[], //审核进度
        reqData: {
          contractCodeNum:'',
          contractCode:'',
          merchantName:'',
          contractBatchNum:'',
          contractStatus:'',
          marketCode:'',
          floorManagerName:'',
          contractTypeCode:'',
          beginRentBeginTime:'',
          beginRentEndTime:'',
          endRentBeginTime:'',
          endRentEndTime:''
        },
        statusList: [
          {label: '已生效', value: 1},
          {label: '未生效', value: 2},
          {label: '已作废', value: 3},
          {label: '已失效', value: 4},
        ],
        contractsTypeList:[], //合同类型
      }
    },
    mounted() {
      this.getList(Api.contractsLists);
      this.getBasicContracts();
    },
    computed:{
      curProgressActive() {
        for(let i=this.progressList.length; i>0 ; i--){
          if(this.progressList[i-1].checkStatus && this.progressList[i-1].checkStatus.code === 4){
            return i
          }
        }
        return 0
      },
    },
    methods: {
      async getBasicContracts() {
        let res = await this.$http.get(Api.basicContracts);
        if(res) {
          this.contractsTypeList = res.data;
        }
      },
      search() {
        this.reqData.currentPage = 1;
        this.getList(Api.contractsLists);
      },
      async viewContract(item) {
        let { electronicContractcolUrl, contractBatchNum, contractTplEunm } = item;
        if(electronicContractcolUrl){
          window.open(electronicContractcolUrl, '_blank');
        }else {
          let data = { contractTplEunm, contractBatchNum};
          let res = await this.$http.get(Api.queryCheckContract,{params: data});
          if(res){
            let data = res.data;
            if(contractTplEunm === 1){
              data.contractPeriodCostList.map((item)=>{
                item.costDetail = item.costDetail.replace(/\n/g,'<br/>')
              });
              this.tplData = { contractPeriodCostList : data.contractPeriodCostList, ...data.contractShoot};
            }else {
              this.tplData = data
            }
            this.$refs.contractTpl.showDialog(contractTplEunm);
          }
        }
      },
      async viewSchedule(contractBatchNum) {
        let res = await this.$http.get(`${Api.checkProgress}/${contractBatchNum}`);
        if(res){
          this.progressList = res.data
        }
        this.scheduleDialog = true;
      },
    },
    filters: {
      boothIdString(arr) {
        if(!arr || !arr.length) return '';
        return arr.join('、')
      }
    },
    components:{ contractTpl,selectMarket }
  };
</script>
<style lang="less" scoped>

  .u-value {
    color: #9B9B9B;
  }

  .u-unit {
    display: inline-block;
    width: 102px;
    padding-right: 12px;
    margin-bottom: 22px;
    text-align: right;
    box-sizing: border-box;
  }

  .u-secondTitle {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    margin-bottom: 10px;
    background: #fafafa;
    font-size: 14px;
  }
</style>
<style lang="less">
  .g-contract-search {
    .c-search-form.el-form--inline .el-form-item {
      width: 100%;
      vertical-align: unset;
    }
    .u-area-input .el-form-item__content {
      width: 82%;
      vertical-align: middle;
    }
    .l-dialog .el-dialog__body {
      .el-col-12 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
      }
      .c-table-wrap {
        margin: 0 !important;
        margin-bottom: 10px !important;
      }
    }
    .el-dialog .el-form-item__content {
      text-align: left;
    }
  }
</style>
