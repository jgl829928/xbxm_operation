<template>
  <div class="g-attendance-setting">
    <el-form  class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true"
              label-position="right">
      <el-row>
           <el-col :span="8" :xs="24">
            <el-form-item label="商场" prop="marketCode">
         <select-market :reqData="reqData"></select-market>
       </el-form-item>
        </el-col>
           <el-col :span="8" :xs="24">
          <el-form-item label="商户" prop="rankId">
              <el-select v-model="reqData.rankId" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in categotyListFir"
                  :key="index"
                  :label="item.rankName"
                  :value="item.rankId"
                  >
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
          <el-col :span="8">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="c-table-wrap">
      <el-table
        :data="itemList"
        style="width: 100%"
        align="center"
        height="500"
        stripe>
        <el-table-column
          align="center"
          prop="maintenanceId"
          min-width="160"
          label="序号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="marketName"
          label="所属商场">
        </el-table-column>
        <el-table-column
          align="center"
          prop="rankName"
          label="所属商户">
        </el-table-column>
  		<el-table-column
          align="center"
          prop="maintenancePerson"
          label="上班时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="maintenanceCost"
          label="下班时间">
        </el-table-column>
      </el-table>
    </div>
   <pagenation :pageparams="pageparams" :itemList="itemList" @handlePage="handlePage" ></pagenation>
  </div>
</template>

<script>
import ApiSettingCom from '@/api/apiSetting'
import ApiSetting from '@/api/basicApi-estateApi'
import selectMarket from '@/components/selectMarket'
import {getDataAll} from '@/utils/auth'
import pagenation from '@/components/pagenation'
export default {
  name:'maintenance',
  data() {
    return {
      dialogFormVisible1:false,
      dialogFormVisible2:false,
       categotyListFir:[
      ],
      reqData:{
        marketCode:'',
        rankId:''
      },
      pageparams:{
          currentPage:"",
      },
      
      itemList:[
      ],
      fileList1:[],
      fileList2:[],
      title:""
    }
  },
  components:{selectMarket,pagenation},
  created(){
 this.handleCategory('-1','categotyListFir')
 this.getData(1)
  },
  methods: {
     // 权限判断
    rightControl (id) {
      return this.$store.getters.getPermission(id)
    },
    search() {
        this.getData()
    },
     getData(page){
      var _this = this
      var page = page || ""
      var data = {
        ...this.reqData,
        currentPage:page
      }
      getDataAll(page,data,ApiSetting.maintenance,_this)
    },
      //联动
    handleCategory(val,list){
         this.$http({
        url:ApiSettingCom.deviceCategory,
        method:'get',
        params:{parentId:val}
      }).then(res => {
        if(res){
          if(res.code == 0) {
            this[list] = res.data
          }
        }
      })
    },
    handlePage(val){
        this.getData(val)
      },
      //删除
      deleteData(data){
              this.$confirm('此操作将永久删除该条, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.delete(`${ApiSetting.maintenance}/${data}`,{params:{maintenance:data}}).then(res => {
          if(res){
            if(res.code == 0){
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.getData(this.pageparams.currentPage)
          }
          }
        })
        }).catch(() => {
         
        });
      
      }

  }
};
</script>
<style lang="less">
  .g-attendance-setting {
    .el-button a {
      height: 0px;
    }
    .s-dialog .el-dialog__body {
      text-align: center
    }
  }
</style>
<style scoped lang="less">
  .u-check {
    cursor:pointer;
    color: #FF7623;
  }
  .u-left {
    text-align: left;
  }
 .u-center{
  text-align: right;
 }
  .btn-80{
      margin: 20px 0px;
    }
</style>