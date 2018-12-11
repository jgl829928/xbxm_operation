<template>
  <div class="contract-receipts">
    <el-form  class="c-search-form" :model="pageParams" ref="pageParams" label-width="80px" :inline="true"
              label-position="right">
      <el-row>
        <el-col :span="8" >
          <el-form-item label="摊位号" prop="itemCode">
            <el-input clearable v-model.trim="pageParams.boothNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="skuCode">
            <el-select v-model.trim="pageParams.boothStatus" clearable placeholder="请选择">
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
          <el-form-item label="商场名称" prop="skuCode">
           <!-- <el-select v-model.trim="pageParams.marketCode" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in storeNameOption"
                :key="index"
                :label="item.marketName"
                :value="item.marketCode">
              </el-option>
            </el-select>-->
            <selectMarket :reqData="pageParams"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="类型" prop="skuCode">
            <el-select v-model.trim="pageParams.boothTypeCode" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in typeOption"
                :key="index"
                :label="item.boothTypeName"
                :value="item.boothTypeCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="楼层" prop="skuCode">
            <el-select v-model.trim="pageParams.floor" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in floorList"
                :key="index"
                :label="item.label"
                :value="item.value">
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
          prop="boothNumber"
          label="摊位号">
        </el-table-column>
        <el-table-column
          min-width="160"
          align="center"
          prop="boothCode"
          label="摊位编号">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="merchantName"
          label="所属商户">
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
          prop="boothTypeName"
          label="类型">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="floor"
          label="楼层">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="area"
          label="区域">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="calculateArea"
          label="计租面积">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="usableArea"
          label="使用面积">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="boothPrice"
          label="摊位单价">
        </el-table-column>
        <el-table-column
          align="center"
          prop="units.desc"
          min-width="110"
          label="单位">
        </el-table-column>
        <el-table-column
          min-width="110"
          prop="boothStatus.desc"
          align="center"
          label="状态">
        </el-table-column>
      </el-table>
    </div>
    <Pagenation :pageparams="pageDefault" @handlePage="getPageList" :itemList="tableList" />
  </div>
</template>

<script>
  import Pagenation from '@/components/pagenation';
  import selectMarket from '@/components/selectMarket';
  import api from '@/api/operation-manage';
  export default {
    name:'colInfoSearch',
    components:{
      Pagenation,
      selectMarket
    },
    data() {
      return {
        pageDefault: {//分页默认参数
          totalRecords: 0,
          currentPage:1,
          pageSize: 20
        },
        pageParams:{//表格查询参数
          boothNumber:'',
          boothStatus:'',
          marketCode:'',
          boothTypeCode:'',
          floor:'',
          currentPage: 1
        },
        tableList:[],
        typeOption:[],//摊位类型下拉框
        storeNameOption:[],//商场名称下拉框
        floorList:[
          {label: '-3层', value: -3},
          {label: '-2层', value: -2},
          {label: '-1层', value: -1},
          {label: '1层', value: 1},
          {label: '2层', value: 2},
          {label: '3层', value: 3},
          {label: '4层', value: 4},
          {label: '5层', value: 5},
          {label: '6层', value: 6},
          {label: '7层', value: 7},
          {label: '8层', value: 8}
        ],
        statusList:[
          {label: '未出租', value: 1},
          {label: '签约待审核', value: 2},
          {label: '已出租', value: 3},
          {label: '交款期', value: 4},
          {label: '欠款待缴费', value: 5},
          {label: '合同即将到期', value: 6},
          {label: '已预定', value: 7}
        ]
      }
    },
    methods: {
      getOptionData(){
        //摊位类型拉框
        let typeOption=this.$http.get(api.allBoothType);
        //商场名称下拉框
        let storeNameOption=this.$http.get(api.allStore);

        Promise.all([typeOption,storeNameOption]).then(res=>{
          if(res[0].code===0){
            this.typeOption=[];
            this.typeOption=[...res[0].data];
          }
          if(res[1].code===0){
            this.storeNameOption=[];
            this.storeNameOption=[...res[1].data];
          }
        })
      },
      async getPageList(index) {
        this.pageParams.currentPage = index || 1;
        this.pageDefault.currentPage = index || 1;
        let res=await this.$http.get(api.boothList,{params:this.pageParams});
        if(res.code===0){
          this.pageDefault.totalRecords=res.page.totalRecords;
          this.tableList=[];
          this.tableList=[...res.data];
        }
      },
      indexMethod(index) {
        return index + (this.pageParams.currentPage - 1)*20 + 1
      },
    },
    beforeMount(){
      this.getOptionData();
      this.getPageList();
    }
  };
</script>
<style lang="less" scoped>
  .contract-receipts{
    .footer-btn{
      width: 342px;
      text-align: right;
    }
  }
  .unit-div{
    margin-top: 30px;
    text-align: right;
  }
</style>
<style lang="less">
  .small-line-height{
    .el-form-item__label{
      line-height: 20px;
    }
  }
</style>
