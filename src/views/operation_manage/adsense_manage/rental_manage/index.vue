<template>
  <div class="contract-receipts rental-manage">
    <el-form  class="c-search-form" :model="pageParams" ref="pageParams"  :inline="true"
              label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商场" prop="skuCode">
            <el-select v-model.trim="pageParams.marketCode" :disabled="storeOptionDisabled" clearable placeholder="请选择" @change="getAdvertiseOptionData">
              <el-option
                v-for="(item, index) in storeNameOption"
                :key="index"
                :label="item.marketName"
                :value="item.marketCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="广告位" prop="skuCode">
            <el-select v-model.trim="pageParams.billboardCode" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in advertiseList"
                :key="index"
                :label="item.billboardName"
                :value="item.billboardCode">
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
    <div v-show="$store.getters.getPermission('rental_2')">
      <router-link :to="{name:'addRental'}">
        <el-button class="btn-add btn-search" type="primary" icon="el-icon-add">添加出租信息</el-button>
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
          label="序号"
          min-width="145"
          prop="bdRentCode">
        </el-table-column>
        <el-table-column
          min-width="100"
          align="center"
          prop="marketName"
          label="商场">
        </el-table-column>
        <el-table-column
          min-width="100"
          align="center"
          prop="billboardName"
          label="广告位">
        </el-table-column>
        <el-table-column
          min-width="100"
          align="center"
          prop="merchantName"
          label="投放商户">
        </el-table-column>
        <el-table-column
          align="center"
          prop="beginTime"
          min-width="120"
          label="开始日期">
        </el-table-column>
        <el-table-column
          align="center"
          prop="endTime"
          min-width="120"
          label="结束日期">
        </el-table-column>
        <el-table-column
          min-width="100"
          prop="duration"
          align="center"
          label="时长(天)">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="signPrice"
          label="签约价格">
          <template slot-scope="scope">
            <span>{{scope.row.signPrice.toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          align="center"
          prop="finalPrice"
          label="结算价格">
          <template slot-scope="scope">
            <span>{{scope.row.finalPrice.toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          align="center"
          prop="createUserName"
          label="登记人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          min-width="120"
          label="登记日期">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="200"
          label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button :disabled="!($store.getters.getPermission('rental_3'))" class="btn-handle" type="primary" @click="modifyRental(scope.row.bdRentCode)">修改</el-button>
            <el-button :disabled="!($store.getters.getPermission('rental_4'))" class="btn-handle btn-add" type="primary" @click="deleteRental(scope.row.bdRentCode)">删除</el-button>
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
    name:'rental',
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
          marketCode: '',
          billboardCode: '',
          currentPage: 1
        },
        tableList: [],
        storeNameOption: [],//商场名称下拉框
        advertiseList: [],//广告位下拉框,
        storeOptionDisabled:false
      }
    },
    methods: {
      getOptionData() {
        //商场名称下拉框
        let storeNameOption = this.$http.get(api.allStore);
        Promise.all([storeNameOption]).then(res => {
          if (res[0].code === 0) {
            this.storeNameOption = [];
            this.storeNameOption = [...res[0].data];
            let { marketCode } = this.$store.getters.currentUser;
            if(marketCode){
              this.pageParams.marketCode=marketCode;
              this.storeOptionDisabled=true;
              this.getAdvertiseOptionData();
            }
          }
        })
      },
      getAdvertiseOptionData() {
        //广告位下拉框
        if(this.pageParams.marketCode===''){
          this.advertiseList = [];
        }else{
          this.$http.get(api.selectAdvertiseOption+`?marketCode=${this.pageParams.marketCode}&bdStatus=`).then(res => {
            if (res.code === 0) {
              this.advertiseList = [];
              this.advertiseList = [...res.data];
            }
          })
        }
      },
      async getPageList(index) {
        this.pageParams.currentPage = index || 1;
        this.pageDefault.currentPage = index || 1;
        let res = await this.$http.get(api.advertiseRentalList, {params: this.pageParams});
        if (res.code === 0) {
          this.pageDefault.totalRecords = res.page.totalRecords;
          this.tableList = [];
          this.tableList = [...res.data];
        }
      },
      deleteRental(id) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(api.advertiseRentalList + `/${id}`).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg);
              this.getPageList();
            }else{
              this.$message.error(res.msg);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      isStartUseBillboard(id,status){
        this.$http.put(api.isStartUseBillboards+`/${id}?bdStatus=${status}`).then(res=>{
          if(res.code===0){
            this.$message.success(res.msg);
            this.getPageList();
          }else{
            this.$message.error(res.msg)
          }
        })
      },
      modifyRental(id){
        this.$router.push({name:'editRental',params:{id:id}})
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
  .rental-manage{
   .el-input.is-disabled .el-input__inner{
      height: 36px!important;
    }
  }
</style>
