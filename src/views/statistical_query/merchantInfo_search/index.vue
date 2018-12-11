<template>
  <div class="contract-receipts merchantinfo-search">
    <el-form  class="c-search-form" :model="pageParams" ref="pageParams" label-width="110px" :inline="true"
              label-position="right">
      <el-row>
        <el-col :span="8" >
          <el-form-item label="商户编号" prop="itemCode">
            <el-input clearable v-model.trim="pageParams.merchantCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" >
          <el-form-item label="商户名称" prop="itemCode">
            <el-input clearable v-model.trim="pageParams.merchantName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" >
          <el-form-item label="负责人" prop="itemCode">
            <el-input clearable v-model.trim="pageParams.leaderName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" >
          <el-form-item label="负责人联系电话" prop="itemCode">
            <el-input clearable v-model.trim="pageParams.leaderTel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营品牌" prop="skuCode">
            <el-select v-model.trim="pageParams.brandCode" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in brandOption"
                :key="index"
                :label="item.brandName"
                :value="item.brandCode">
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
          <el-form-item label="经营类别" prop="skuCode">
            <el-select v-model.trim="pageParams.managementTypeId" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in mangementTypeDTOList"
                :key="index"
                :label="item.managementTypeName"
                :value="item.managementTypeId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户性质" prop="skuCode">
            <el-select v-model.trim="pageParams.merchantNature" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in merchantNatureList"
                :key="index"
                :label="item.value"
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
          min-width="120"
          align="center"
          prop="merchantCode"
          label="商户编号">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          label="商户名称">
          <template slot-scope="scope">
            <router-link :to="{name:'merchantInfo',params:{id:scope.row.merchantCode}}">{{scope.row.merchantName}}</router-link>
          </template>
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
          label="门店名称">
          <template slot-scope="scope">
            <span>{{scope.row.shopNameList.join('；')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="mainBrandName"
          label="经营品牌">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="managementTypeName"
          label="经营类别">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="merchantNature.desc"
          label="商户性质">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="leaderName"
          label="负责人">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="leaderTel"
          label="负责人联系电话">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          min-width="165"
          label="登记时间">
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
    name:'merInfoSearch',
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
          merchantCode:'',
          merchantName:'',
          leaderName:'',
          leaderTel:'',
          brandCode:'',
          marketCode:'',
          managementTypeId:'',
          merchantNature:'',
          status:true,
          currentPage: 1
        },
        brandOption:[],//经营品牌下拉框
        storeNameOption:[],//商场名称下拉框
        mangementTypeDTOList:[],//经营类别下拉框
        merchantNatureList:[{id:1,value:'个人'},{id:2,value:'企业'}],//商户性质下拉框
        tableList:[],//表格数据

      }
    },
    methods: {
      getOptionData(){
        //经营品牌下拉框
        let brandOption=this.$http.get(api.allBrand);
        //商场名称下拉框
        let storeNameOption=this.$http.get(api.allStore);
        //经营类别下拉框
        let manangeTypeOption=this.$http.get(api.allManageType);
        Promise.all([brandOption,storeNameOption,manangeTypeOption]).then(res=>{
          if(res[0].code===0){
            this.brandOption=[];
            this.brandOption=[...res[0].data];
          }
          if(res[1].code===0){
            this.storeNameOption=[];
            this.storeNameOption=[...res[1].data];
          }
          if(res[2].code===0){
            this.mangementTypeDTOList=[];
            this.mangementTypeDTOList=[...res[2].data];
            console.log(this.mangementTypeDTOList)
          }
        })
      },
      async getPageList(index) {
        this.pageParams.currentPage = index || 1;
        this.pageDefault.currentPage = index || 1;
        let res=await this.$http.get(api.merchants,{params:this.pageParams});
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


</style>
