<template>
  <div class="g-maintenance-management">
    <el-form  class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true"
              label-position="right">
      <el-row>
           <el-col :span="8" :xs="24">
            <el-form-item label="商场" prop="marketCode">
         <select-market :reqData="reqData"></select-market>
       </el-form-item>
        </el-col>
           <el-col :span="8" :xs="24">
          <el-form-item label="一级分类" prop="rankId">
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
      <el-row>
        <el-col :span="8" v-show="rightControl('maintenance_add')">   
              <router-link :to="{name:'addMainRecord'}">
                <el-button class="btn-search btn-add" type="primary">
                添加维保记录
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
          prop="maintenanceId"
          min-width="160"
          label="维保序号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="marketName"
          label="所属商场">
        </el-table-column>
        <el-table-column
          align="center"
          prop="rankName"
          label="设备类型">
        </el-table-column>
        <el-table-column
          align="center"
          prop="equipmentName"
          label="设备名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="equipmentCode"
          min-width="160"
          label="设备编号">
        </el-table-column>     
        <el-table-column
          align="center"
          prop="maintenanceCompany"
          label="维保公司">
        </el-table-column>
  		<el-table-column
          align="center"
          prop="maintenancePerson"
          label="维保人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="maintenanceCost"
          label="维保金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="beginTime"
          min-width="165"
          label="维保开始时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="endTime"
          min-width="165"
          label="维保结束时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="维保合同">
          <template slot-scope="scope">
            <p class="u-check" @click="checkConstrck1(scope.row)" v-show="rightControl('maintenance_contractInfo')">查看</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="维保附件">
          <template slot-scope="scope">
            <p class="u-check" @click="checkConstrck2(scope.row)" v-show="rightControl('maintenance_accessoryInfo')">查看</p>
          </template>
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
          min-width="190">
          <template slot-scope="scope">
            <router-link :to="{name:'editMainRecord',params:{maintenanceId:scope.row.maintenanceId}}" v-show="rightControl('maintenance_edit')">
            <el-button class="btn-handle" type="primary">
                修改
            </el-button>
            </router-link>
             <el-button class="btn-handle btn-add" type="primary" @click="deleteData(scope.row.maintenanceId)" v-show="rightControl('maintenance_delete')">
                删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
   <pagenation :pageparams="pageparams" :itemList="itemList" @handlePage="handlePage" ></pagenation>
  <!-- 查看 -->
   <el-dialog title="维保合同-查看" :visible.sync="dialogFormVisible1" class="s-dialog" center>
      <div>
        <el-row v-for="(item,index) in fileList1" :key="index">
          <el-col :span="19" :xs="24" class="u-left">
                <span>{{item.name}}</span>
            <span v-if="fileList1.length == 0">（无）</span>
          </el-col>
          <el-col :span="5" :xs="24" class="u-center">
            <a @click="download_file(item.url,item.name)">下载</a>
              </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
      <el-button class="btn-80" @click="dialogFormVisible1 = false">关 闭</el-button>
       </span>
      </div>
    </el-dialog>
     <el-dialog title="维保附件-查看" :visible.sync="dialogFormVisible2" class="s-dialog" center>
      <div>
        <el-row v-for="(item,index) in fileList2" :key="index">
          <el-col :span="19" :xs="24" class="u-left">
                <span>{{item.name}}</span>
            <span v-if="fileList2.length == 0">（无）</span>
          </el-col>
          <el-col :span="5" :xs="24" class="u-center">
            <a @click="download_file(item.url,item.name)">下载</a>
              </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
      <el-button class="btn-80" @click="dialogFormVisible2 = false">关 闭</el-button>
       </span>
      </div>
    </el-dialog>
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
     // 下载文件
    download_file(data,filename) {
      this.$http({
        method: "get",
        url: "/business/download",
        params: {
          fileUrl: data
        },
        showLoading:false,
        responseType: "arraybuffer"
      }).then(res => {
        this.download(res.data,filename);
      });
    },
    download(data,filename) {
      if (!data) {
        return;
      }
      let jpgData = new Blob([data]);
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(jpgData, filename);
      } else {
        let url = window.URL.createObjectURL(new Blob([data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      }
    },
    search() {
        this.getData()
    },
    checkConstrck1(data,num){
      this.dialogFormVisible1 = true
      if(data.imgContractUrl) {
        this.fileList1 = data.imgContractUrl
      }else{
        this.fileList1=[]
      }
    },
    checkConstrck2(data,num){
      this.dialogFormVisible2 = true
      if(data.imgAccessoryUrl){
        this.fileList2 = data.imgAccessoryUrl
      }else{
        this.fileList2=[]
      }
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
  .g-maintenance-management {
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
    color: #1989fa;
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