<template>
  <div class="contract-receipts mnangement">
    <el-form  class="c-search-form" :model="pageParams" ref="pageParams" :inline="true"
              label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商场" prop="skuCode">
            <selectMarket :reqData="pageParams"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系方式" prop="itemCode">
            <el-input clearable v-model.trim="pageParams.phoneNumber"></el-input>
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
          label="序号"
          min-width="130"
          prop="mtApplyRgCode">
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
          prop="merchantName"
          label="姓名">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="phoneNumber"
          label="联系方式">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="property.desc"
          label="经营性质">
        </el-table-column>
        <el-table-column
          min-width="110"
          prop="category"
          align="center"
          label="经营品类">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="mainBrandName"
          label="经营主品牌">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="intentionSize"
          label="期望店铺面积">
        </el-table-column>
        <el-table-column
          align="center"
          prop="intentionBeginTime"
          min-width="120"
          label="意向入驻日期">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          label="经营经验">
          <template slot-scope="scope">
            <span>{{scope.row.expenriced ? '有': '无'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          align="center"
          min-width="165"
          label="申请时间">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
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
            <el-button :disabled="!($store.getters.getPermission('mnangement_2'))" class="btn-handle" type="primary" @click="openFollowRecord(scope.row.mtApplyRgCode)">查看</el-button>
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
          <el-table-column align="center" label="状态变更" prop="followedStatus.desc">
          </el-table-column>
          <el-table-column  align="center" label="跟进说明">
            <template slot-scope="scope">
              <div :title="scope.row.comment" class="one-line">{{scope.row.comment}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="createUserName" label="跟进人"></el-table-column>
          <el-table-column align="center" prop="createTime" label="申请时间" min-width="120"></el-table-column>
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
  import selectMarket from '@/components/selectMarket';
  import api from '@/api/operation-manage';
  export default {
    name:'mnangement',

    components:{
      Pagenation,
      selectMarket
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
          phoneNumber:'',
          currentPage: 1
        },
        storeNameOption:[],
        tableList:[],
        gridData: [],
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
          }
        })
      },
      async getPageList(index) {
        this.pageParams.currentPage = index || 1;
        this.pageDefault.currentPage = index || 1;
        let res=await this.$http.get(api.attractList,{params:this.pageParams});
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
        this.$http.get(api.attractFollowRecord+`/${recodeId}`).then(res=>{
            if(res.code===0){}
            this.gridData=[];
            this.gridData=[...res.data];
            console.log(this.gridData)
        })
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
  .one-line{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
<style lang="less">
  .mnangement .c-table-wrap th{
    font-size: 14px;
    color: #666666;
  }
</style>

