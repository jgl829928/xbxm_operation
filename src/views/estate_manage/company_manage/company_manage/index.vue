<template>
  <div class="g-company-manage">
    <el-form  class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true"
              label-position="right">
      <el-row>
           <el-col :span="8" :xs="24">
           <el-form-item label="商场" prop="marketCode">
         <select-market :reqData="reqData"></select-market>
       </el-form-item>
        </el-col>
           <el-col :span="8" :xs="24">
          <el-form-item label="服务范围" prop="serveId">
              <el-select v-model="reqData.serveId" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in service"
                  :key="index"
                  :label="item.serveName"
                  :value="item.serveId">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="8">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" v-show="rightControl('company_add')">
              <router-link :to="{name:'addCompany'}">
                <el-button class="btn-search btn-add" type="primary">
                添加公司
                </el-button>
              </router-link>
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
          prop="companyId"
          min-width="160"
          label="序号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="marketName"
          label="合作商场">
        </el-table-column>
        <el-table-column
          align="center"
          prop="serveName"
          label="服务范围">
        </el-table-column>
        <el-table-column
          align="center"
          prop="companyName"
          label="公司名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="contacts"
          label="联系人">
          </el-table-column>  
           <el-table-column
          align="center"
          prop="companyCell"
          label="联系方式">
        </el-table-column>     
        <el-table-column
          align="center"
          prop="contractBeginTime"
          min-width="120"
          label="合同开始日期">
        </el-table-column>
  		<el-table-column
          align="center"
          prop="contractEndTime"
          min-width="120"
          label="合同结束日期">
        </el-table-column>
        <el-table-column
          align="center"
          prop="contractSignedTime"
          min-width="120"
          label="合同部署日期">
        </el-table-column>
        <el-table-column
          align="center"
          prop="signedSubject"
          label="签署主体">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createName"
          label="登记人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          min-width="120"
          label="登记时间">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          min-width="100"
          fixed="right">
          <template slot-scope="scope">
            <router-link
                :to="{name:'editCompany',params:{companyId:scope.row.companyId}}" :disabled="!rightControl('company_edit')">
            <el-button class="btn-handle" type="primary">
                修改       
            </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagenation :pageparams="pageparams" :itemList="itemList" @handlePage="handlePage"></pagenation>
  </div>
</template>

<script>
import ApiSetting from '@/api/basicApi-estateApi'
import ApiSettingCom from '@/api/apiSetting'
import selectMarket from '@/components/selectMarket'
import pagenation from '@/components/pagenation'
import {getDataAll} from '@/utils/auth'
export default {
  name:'company',
  data() {
    return {
      changeOnSelect:true,
      reqData:{
        marketCode:'',
        serveId:'',
      },
      itemList:[
      ],
      pageparams:{
        currentPage:1,
      },
      service:[],
    }
  },
  components:{selectMarket,pagenation},
  created(){
    this.getData()
    this.getService()
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
        ..._this.reqData,
        currentPage:page
      }
      getDataAll(page,data,ApiSetting.company,_this)
    },
      handlePage(val){
        this.getData(val)
      },
      //获取服务范围
      getService(){
        this.$http.get(ApiSetting.serveRange).then(res => {
          if(res && res.code == 0){
            this.service = res.data
          }
        })
      }
  }
};
</script>
<style lang="less">
  .g-company-manage {
    .el-button a {
      height: 0px;
    }
  }
</style>