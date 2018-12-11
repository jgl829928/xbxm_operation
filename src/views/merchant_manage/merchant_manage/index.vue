<template>
  <div class="contract-receipts">
    <el-form  class="c-search-form" :model="pageParams" ref="reqData" label-width="102px"
              label-position="right" :inline="true">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商场" prop="skuCode">
            <selectMarket :reqData="pageParams"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户编号">
            <el-input clearable v-model.trim="pageParams.merchantCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户名称">
            <el-input clearable v-model.trim="pageParams.merchantName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="经营品牌">
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
          <el-form-item label="商户性质">
            <el-select v-model.trim="pageParams.merchantNature" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in merchantNatureList"
                :key="index"
                :label="item.desc"
                :value="item.code">
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
    <div v-show="$store.getters.getPermission('merchantManage_2')">
      <router-link :to="{name:'addMerchant'}">
        <el-button class="btn-search btn-add" type="primary">添加商户</el-button>
      </router-link>
    </div>
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
          align="center"
          prop="merchantCode"
          min-width="140"
          label="商户编号">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          label="商户名称">
          <template slot-scope="scope">
             <router-link v-if="$store.getters.getPermission('merchantManage_5')" :to="{name:'merchantInfo',params:{id:scope.row.merchantCode}}">{{scope.row.merchantName}}</router-link>
             <span v-else>{{scope.row.merchantName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="marketName"
          label="商场">
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
          min-width="120"
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
        <el-table-column
          align="center"
          min-width="190"
          label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button :disabled="!$store.getters.getPermission('merchantManage_3')" class="btn-handle" type="primary" @click="modify(scope.row.merchantCode)">修改</el-button>
            <el-button :disabled="!$store.getters.getPermission('merchantManage_4')" class="btn-handle btn-add" type="primary" @click="deleteMerchant(scope.row.merchantCode)">删除</el-button>
          </template>
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
    name:'merchantManage',
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
          marketCode:'',
          merchantCode:'',
          merchantName:'',
          brandCode:'',
          merchantNature:'',
          status:true,
          currentPage: 1
        },
        storeNameOption:[],//商场下拉框
        brandOption:[],//经营品牌下拉框
        merchantNatureList:[{code:1,desc:'个人'},{code:2,desc:'企业'}],//商家性质下拉框
        tableList:[],//表格数据
      }
    },
    methods: {
      async getOptionData(){
        //商场名称下拉框
        let storeNameOption = this.$http.get(api.allStore);
        let brandOption=await this.$http.get(api.allBrand);
        Promise.all([storeNameOption,brandOption]).then(res => {
          if (res[0].code === 0) {
            this.storeNameOption = [];
            this.storeNameOption = [...res[0].data];
          }
          if (res[1].code === 0) {
            this.brandOption = [];
            this.brandOption = [...res[1].data];
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
      async deleteMerchant(id){
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(api.merchants+`/${id}`).then(res=>{
            if(res.code===0){
              this.$message.success('删除成功');
              this.getPageList();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      modify(id){
        this.$router.push({name:'editMerchant',params:{id:id}})
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
