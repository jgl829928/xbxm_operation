<template>
  <div class="g-staff-manage">
    <el-form  class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true"
              label-position="right">
      <el-row>
           <el-col :span="8" >
          <el-form-item label="商场" prop="marketCode">
        <select-market :reqData="reqData" @change="code_change"></select-market>
               </el-form-item>
        </el-col>
           <el-col :span="8">
          <el-form-item label="物业公司" prop="companyId">
              <el-select v-model="reqData.companyId" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in companyList"
                  :key="index"
                  :label="item.companyName"
                  :value="item.companyId">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
          <el-col :span="8" >
          <el-form-item label="在职状态" prop="workStatus">
              <el-select v-model="reqData.workStatus" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in workStatusList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="16">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
        </el-col>
      </el-row>
      </el-row>
      <el-row>
        <el-col :span="8" v-show="rightControl('staff_add')">
              <router-link :to="{name:'addStaff'}">
                <el-button class="btn-search btn-add" type="primary">
                添加员工
                </el-button>
              </router-link>
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
          prop="staffId"
          min-width="160"
          label="序号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="companyName"
          label="物业公司">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="cellPhone"
          min-width="165"
          label="手机号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="sex"
          label="性别">
          <template slot-scope="scope">
            {{scope.row.sex == true?'男':'女'}}
          </template>
        </el-table-column>     
        <el-table-column
          align="center"
          prop="age"
          label="年龄">
        </el-table-column>
  		<el-table-column
          align="center"
          prop="identityCard"
          min-width="165"
          label="身份证号码">
        </el-table-column>
        <el-table-column
          align="center"
          prop="permanentAddress"
          label="常住地址">
        </el-table-column>
        <el-table-column
          align="center"
          label="在职状态">
          <template slot-scope="scope">
            <span>{{scope.row.workStatus == 1 ? '离职':'在职'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="entryTime"
          min-width="165"
          label="入职日期">
        </el-table-column>
        <el-table-column
          align="center"
          prop="dimissionTime"
          min-width="165"
          label="离职日期">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createName"
          label="登记人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          min-width="165"
          label="登记时间">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          min-width="100"
          >
          <template slot-scope="scope">
              <router-link
                :to="{name:'editStaff',params:{staffId:scope.row.staffId}}" :disabled="rightControl('staff_edit')" v-if  ="scope.row.workStatus != 1">
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
  name:'staff',
  data() {
    return {
      reqData:{
        companyId:'',
        marketCode:'',
        workStatus:'',
      },
      workStatusList:[
        {label: '在职', value: 0},
        {label: '离职', value: 1},
      ],
      pageparams:{
        currentPage:1,
      },
      itemList:[
      ],
      companyList:[],
    }
  },
  components:{selectMarket,pagenation},
  created(){
    this.getData()
    this.getCompanyList()
  },
   computed: {
     currentUser: function() {
      return this.$store.state.currentUser;
    },
  },
 methods: {
    getOtherData(code) {
      let param = {
        marketCode: ""
      };
      if (this.currentUser.affiliation === 2) {
        param.marketCode = this.currentUser.marketCode;
      } else {
        param.marketCode = code;
      }
      this.getCompanyList(param.marketCode)
    },
     // 商场改变
    code_change(code) {
      this.reqData.companyId = "";
      if(code){
         this.getOtherData(code);
      }
  },
           // 权限判断
    rightControl (id) {
      return this.$store.getters.getPermission(id)
    },
    getData(page){
      var _this = this
      var page = page || ""
      var data = {
        ..._this.reqData,
        currentPage:page
      }
      getDataAll(page,data,ApiSetting.staff,_this)
    },
      handlePage(val){
        this.getData(val)
      },
    search() {
        this.getData()
    },
     //获取所有物业公司
    getCompanyList(marketCode) {
      this.$http({
        url:ApiSetting.companyList,
        params:{marketCode:marketCode},
        method:'get',
        showLoading:false
        }).then(res => {
        if (res && res.code == 0 && res.data) {
            this.companyList = res.data;     
        }
      });
    },
  }
};
</script>
<style lang="less">
  .g-staff-manage {
    .el-button a {
      height: 0px;
    }
    .el-table .cell {
      padding-left: 11px;
    }
  }
</style>