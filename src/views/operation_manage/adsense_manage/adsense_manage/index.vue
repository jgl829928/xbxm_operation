<template>
  <div class="contract-receipts adsense-manage">
    <el-form class="c-search-form" :model="pageParams" ref="pageParams" label-width="85px"  :inline="true"
             label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商场" prop="skuCode">
            <selectMarket :reqData="pageParams"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="类型" prop="skuCode">
            <el-select v-model.trim="pageParams.bdType" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in bdTypeOption"
                :key="index"
                :label="item.desc"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="展位状态" prop="skuCode">
            <el-select v-model.trim="pageParams.bdStatus" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in bdStatusOption"
                :key="index"
                :label="item.desc"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="广告位编号(方位号)" prop="skuCode" class="line-height-label">
            <el-input clearable v-model.trim="pageParams.coCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="getPageList(1)">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div v-show="$store.getters.getPermission('adsense_2')">
      <router-link :to="{name:'addAdsense'}">
        <el-button class="btn-search btn-add" type="primary" icon="el-icon-add">添加广告位</el-button>
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
          width="120"
          prop="billboardCode">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="110"
          prop="marketName"
          label="所属商城">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="bdType.desc"
          label="类型">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="bdName"
          label="名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="coCode"
          width="150"
          label="广告位编号(方位号)">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="location"
          label="所处位置">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="110"
          label="尺寸/面积">
          <template slot-scope="scope">
            <span>{{scope.row.bdSize.toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="describtion"
          min-width="110"
          label="介绍">
        </el-table-column>
        <el-table-column
          align="center"
          prop="initialTime"
          min-width="120"
          label="上架日期">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="shelfedDays"
          label="上架天数">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="idleDays"
          label="空置天数">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="rentedDays"
          label="出租天数">
        </el-table-column>
        <el-table-column
          align="center"
          prop="blockUpTime"
          min-width="120"
          label="停用日期">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="totalIncome"
          label="累计收益">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="bdStatus.desc"
          label="展位状态">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="120"
          prop="contractEndDate"
          label="合同结束日期">
        </el-table-column>
        <el-table-column
          align="center"
          width="300"
          label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button class="btn-handle" type="primary"
                       :disabled="!($store.getters.getPermission('adsense_3'))"
                       @click="modifyBillboard(scope.row.billboardCode)">修改</el-button>
            <el-button class="btn-handle start" type="primary"
                       v-if="scope.row.bdStatus.code===3"
                       :disabled="!($store.getters.getPermission('adsense_5'))"
                       @click="isStartUseBillboard(scope.row.billboardCode,4)">启用</el-button>
            <el-button class="btn-handle stop" type="primary" v-else
                       :disabled="!($store.getters.getPermission('adsense_6'))"
                       @click="isStartUseBillboard(scope.row.billboardCode,3)">停用</el-button>
            <el-button class="btn-handle btn-add" type="primary"
                       :disabled="!($store.getters.getPermission('adsense_4'))"
                       @click="deleteBillboard(scope.row.billboardCode)">删除
            </el-button>
          </template>
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
    name:'adsense',

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
          bdType: '',
          bdStatus: '',
          coCode: '',
          currentPage: 1
        },
        tableList: [],
        storeNameOption: [],//商场名称下拉框,
        bdTypeOption: [
          {id: 1, desc: '内墙广告'},
          {id: 2, desc: '外墙广告'}
        ],
        bdStatusOption: [//广告位状态下拉框
          {id: 1, desc: '空闲'},
          {id: 2, desc: '已出租'},
          {id: 3, desc: '停用'}
        ]
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
          }
        })
      },
      async getPageList(index) {
        this.pageParams.currentPage = index || 1;
        this.pageDefault.currentPage = index || 1;
        let res = await this.$http.get(api.advertiseList, {params: this.pageParams});
        if (res.code === 0) {
          this.pageDefault.totalRecords = res.page.totalRecords;
          this.tableList = [];
          this.tableList = [...res.data];
        }
      },
      deleteBillboard(id) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(api.advertiseList + `/${id}`).then(res => {
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
      modifyBillboard(id){
        this.$router.push({name:'editAdsense',params:{id:id}})
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
  .adsense-manage {
    .el-table__body {
      .el-button {
        margin: 0 5px;
      }
    }
    .line-height-label{
      label{
        line-height: 20px;
      }
    }
  }
</style>
