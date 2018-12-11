<template>
  <div class="contract-receipts advertising">
    <el-form class="c-search-form" :model="pageParams" ref="pageParams"  :inline="true"
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
          min-width="110"
          prop="marketName"
          label="商场">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="110"
          prop="billboardName"
          label="广告位">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="110"
          prop="coCode"
          label="意向广告位编号">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="merchantName"
          label="申请人">
        </el-table-column>
        <el-table-column
          min-width="120"
          align="center"
          prop="phoneNumber"
          label="联系电话">
        </el-table-column>
        <el-table-column
          align="center"
          prop="intentionBeginTime"
          min-width="120"
          label="意向开始投放日期">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          min-width="165"
          label="申请时间">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="110"
          prop="origin.desc"
          label="来源">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="followedStatus.desc"
          label="跟进状态">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="110"
          label="跟进记录" fixed="right">
          <template slot-scope="scope">
            <el-button :disabled="!($store.getters.getPermission('advertising_2'))" class="btn-handle" type="primary" @click="openFollowRecord(scope.row.bdApplyRgCode)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagenation :pageparams="pageDefault" @handlePage="getPageList" :itemList="tableList" />
    <el-dialog
      title="跟进记录"
      :visible.sync="dialogVisible"
      class="l-dialog">
      <div class="c-table-wrap">
        <el-table align="center" :data="gridData" stripe>
          <el-table-column prop="followedStatus.desc" label="状态变更" align="center"></el-table-column>
          <el-table-column label="跟进说明" align="center">
            <template slot-scope="scope">
              <div :title="scope.row.comment" class="one-line">{{scope.row.comment}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="createUserName" label="跟进人" align="center"></el-table-column>
          <el-table-column prop="createTime" label="申请时间" min-width="120" align="center"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-save" type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Pagenation from '@/components/pagenation';
  import api from '@/api/operation-manage';
  export default {
    name:'advertising',
    components:{
      Pagenation
    },
    data() {
      return {
        dialogVisible:false,
        pageDefault: {//分页默认参数
          totalRecords: 0,
          currentPage:1,
          pageSize: 20
        },
        pageParams:{//表格查询参数
          marketCode:'',
          billboardCode:'',
          currentPage: 1
        },
        storeNameOption:[],
        advertiseList:[],
        tableList:[],
        gridData: [],
        storeOptionDisabled:false
      }
    },
    methods: {
      getOptionData(){
        //商场名称下拉框
        let storeNameOption=this.$http.get(api.allStore);
        Promise.all([storeNameOption]).then(res=>{
          if(res[0].code===0){
            this.storeNameOption=[];
            this.storeNameOption=[...res[0].data];
            let { marketCode } = this.$store.getters.currentUser;
            console.log('advertising',marketCode)
            if(marketCode){
              this.pageParams.marketCode=marketCode;
              this.storeOptionDisabled=true;
              this.getAdvertiseOptionData();
            }
          }
        })
      },
      getAdvertiseOptionData() {
        if (this.pageParams.marketCode !== '') {
          //广告位下拉框
          let advertiseOption = this.$http.get(api.selectAdvertiseOption + `?marketCode=${this.pageParams.marketCode}`);
          Promise.all([advertiseOption]).then(res => {
            if (res[0].code === 0) {
              this.advertiseList = [];
              this.advertiseList = [...res[0].data];
            }
          })
        } else {
          this.advertiseList = [];
        }
      },
      async getPageList(index) {
        this.pageParams.currentPage = index || 1;
        this.pageDefault.currentPage = index || 1;
        let res=await this.$http.get(api.advertising,{params:this.pageParams});
        if(res.code===0){
          this.pageDefault.totalRecords=res.page.totalRecords;
          this.tableList=[];
          this.tableList=[...res.data];
        }
      },
      indexMethod(index) {
        return index + (this.pageParams.currentPage - 1)*20 + 1
      },
      openFollowRecord(id){
        let recodeId=id;
        this.$http.get(api.advertisingFollowList+`/${recodeId}`).then(res=>{
          if(res.code===0){}
          this.gridData=[];
          this.gridData=[...res.data];
        });
        this.dialogVisible=true;
      }
    },
    beforeMount(){
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
  .one-line{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
<style lang="less">
  .advertising{
    .el-input.is-disabled .el-input__inner{
      height: 36px!important;
    }
    .c-table-wrap th{
      font-size: 14px;
      color: #666666;
    }
  }
</style>
