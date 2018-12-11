<template>
  <div class="g-district-manage">
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true" label-position="right">
      <el-row>
         <el-col :span="8">
          <el-form-item prop="areaCode" label="所在省市">
            <el-select v-model="reqData.areaCode" clearable placeholder="请选择" @change="changeMarket(reqData.areaCode)">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.areaName"
                :value="item.areaCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商场名称" prop="marketName">
            <el-select v-model="reqData.marketName" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in marketList"
                :key="index"
                :label="item.marketName"
                :value="item.marketName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="8">
            <el-button class="btn-search" type="primary" @click="search">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="区域-修改" :visible.sync="dialogFormVisible" class="m-dialog" @close="reset">
      <el-form class="c-search-form" :model="reqDiaData" ref="reqDiaData" label-width="" :inline="true" label-position="right">
        <el-row class="u-line">
          <el-col :span="8">
            <span>商场名称：</span>
            <span class="u-color">{{name}}</span>
          </el-col>
          <el-col :span="16">
            <el-form-item label="划分规则" label-width="110px" prop="marketPartitionType"
            :rules="{
      required: true, message: '划分规则不能为空', trigger: 'blur'
          }"
            >
              <el-radio-group v-model="reqDiaData.marketPartitionType">
                <el-radio :label="1">品类划分</el-radio>
                <el-radio :label="2">区域划分</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="c-table-wrap table-wrap">
          <el-button type="text" class="table-add-btn u-add" icon="el-icon-circle-plus-outline"
                   @click="addStoreName()"></el-button>
          <el-table :data="reqDiaData.marketPartitionNames" style="width: 100%" align="center" stripe
    >
            <el-table-column align="center" type="index" label="序号">
            </el-table-column>
            <el-table-column align="center" prop="" label="区域名称">
              <template slot-scope="scope">
                <el-form-item :prop="'marketPartitionNames.'+scope.$index+'.name'"
                :key="scope.$index"
                :rules="[{
             required: true, message: '区域名不能为空', trigger: 'blur'
                },{
             max: 20, message: '字数限制为20字', trigger: 'blur'
                }]">
            <el-input clearable v-model.trim="scope.row.name"></el-input>
              </el-form-item>
              </template>
            </el-table-column>
            <el-table-column align="center" label="" min-width="20">
              <template slot-scope="scope">
              <el-button type="text" @click="deleteStoreName(scope.$index)" class="u-del" icon="el-icon-remove-outline" v-if="scope.$index != 0 "></el-button>
            </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-save" type="primary" @click="saveChange">保存</el-button>
        <el-button class="btn-reset" type="primary" @click="reset">取消</el-button>
      </div>
    </el-dialog>
    <div class="c-table-wrap">
      <el-table :data="itemList" style="width: 100%" align="center" stripe height="500">
        <el-table-column align="center" type="index" label="序号" width="50" :index="indexMethod">
        </el-table-column>
        <el-table-column align="center" prop="marketName" label="商场名称">
        </el-table-column>
        <el-table-column align="center" prop="marketCode" label="商场编码" width="160">
        </el-table-column>
        <el-table-column align="center" prop="areaCodeName" label="所在省市">
        </el-table-column>
        <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="scope">
            {{scope.row.status == true?"启用":"禁用"}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="responsibleUserName" label="负责人">
        </el-table-column>
        <el-table-column align="center" prop="contactTel" label="负责人联系电话" min-width="120">
        </el-table-column>
        <el-table-column align="center" prop="address" label="商场地址">
        </el-table-column>
        <el-table-column align="center" prop="createUserName" label="登记人">
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="登记时间" min-width="165">
        </el-table-column>
        <el-table-column align="center" prop="marketPartitionType" label="规划规则">
          <template slot-scope="scope">
            {{scope.row.marketPartitionType?marketPartitionTypeMap[scope.row.marketPartitionType].value:'--'}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="marketPartitionName" label="区域名称">
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="100"
          fixed="right">
          <template slot-scope="scope">
            <el-button class="btn-handle" type="primary" @click="addcontract_type(scope.row)" :disabled="!rightControl('districtMag_edit')">
              区域修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagenation :pageparams="pageparams" :itemList="itemList" @handlePage="handlePage"></pagenation>
  </div>
</template>

<script>
import pagenation from '@/components/pagenation'
import {getDataAll,keysFilter} from '@/utils/auth'
import ApiSetting from '@/api/basicApi-estateApi'
import ApiSettingCom from '@/api/apiSetting'
  export default {
    name:'districtMag',
    data() {
      return {
        dialogFormVisible: false,
       pageparams:{
        currentPage:1,
       },
        reqData: {
          areaCode: '',
          marketName: '',
        },
        itemList: [
        ],
        marketPartitionTypeMap:{
          1:{value:"品类划分"},
          2:{value:"区域划分"}
        },
        form: {
          name: ''
        },
        reqDiaData:{
          marketCode:"",
          marketPartitionType:"",
          marketPartitionNames:[{name:''}],
        },
        reqDiaDataCopy:{
          marketCode:"",
          marketPartitionType:"",
          marketPartitionNames:[{name:''}],
        },
        formLabelWidth: '120px',
        areaList:[],
        setHeight:{height:0},
        name:'',
        marketList:[],
      }

    },
    components:{pagenation},
    created(){
      this.getArea(null,'areaList',ApiSettingCom.areaAll)
      this.getData()
    },
  methods: {
    // 权限判断
    rightControl (id) {
      return this.$store.getters.getPermission(id)
    },
      //取消关闭弹框
       reset(){
      this.dialogFormVisible = false
      this.$refs['reqDiaData'].resetFields();
      this.$nextTick(() => {
         this.$refs['reqDiaData'].clearValidate()
      })
      this.reqDiaData = keysFilter(this.reqDiaDataCopy,true,[''])
    },
      addcontract_type(data) {
        this.dialogFormVisible = true
        this.reqDiaData.marketCode = data.marketCode
        this.name = data.marketName
        this.reqDiaData.marketPartitionType = data.marketPartitionType
        if(data.marketPartitionName){
          if(data.marketPartitionName.search(';') > -1){
            var partitionArr = data.marketPartitionName.split(';')
          var newArr = []
          partitionArr.forEach((item,index) => {
            var obj = {}
            obj['name']=item
            newArr.push(obj)
        this.reqDiaData.marketPartitionNames = newArr
           })
             window.localStorage.setItem('marketPartitionNameLen',newArr.length)
        }else{
          var newArrSec = []
          var obj = {}
          obj['name']= data.marketPartitionName
          newArrSec.push(obj)
          this.reqDiaData.marketPartitionNames = newArrSec
           window.localStorage.setItem('marketPartitionNameLen',1)
        }
        }

      },
      saveChange(){
        let reqData = keysFilter(this.reqDiaData,'true','marketPartitionNames')
        let marketPartitionNames = this.reqDiaData.marketPartitionNames.map(item =>{
          return item.name
        })
          this.$http.post(ApiSetting.partition,{...reqData,marketPartitionNames:marketPartitionNames}).then(res => {
          if(res){
            if(res.code == 0){
              this.$message.success(res.msg)
              this.dialogFormVisible = false
              this.getData()
            }else{
              this.$message.error(res.msg)
            }
          }
        })
      },
      search() {
        this.getData()
      },
      indexMethod(index) {
      return index + (this.pageparams.currentPage - 1)*20+1
    },
      getData(page){
        var _this = this
      var page = page || this.pageparams.currentPage || ""
      var data = {
        ..._this.reqData,
        currentPage:page
      }
        getDataAll(page,data,ApiSetting.partition,_this)
      },
       handlePage(val){
        this.getData(val)
      },
      //获取省市
      getArea(val,list,url){
         this.$http({
        url:url,
        method:'get',
        params:{areaCode:val}
      }).then(res => {
        if(res){
          if(res.code == 0) {
            this[list] = res.data
          }
        }
      })
    },
     changeMarket(data){
      this.reqData.marketName = ""
      if(data){
        this.getArea(data,'marketList',ApiSettingCom.districtSearch)
      }else{
        this.marketList = []
      }
      
      },
    addStoreName() {
        this.reqDiaData.marketPartitionNames.push({name:''});
         if(this.reqDiaData.marketPartitionNames.length > 10){
           this.$message.error('最多只能填写10个范围')
           return this.reqDiaData.marketPartitionNames.length = 10
        }
      },
     deleteStoreName(index) {
        this.reqDiaData.marketPartitionNames.splice(index, 1)
      },
    }
  };
</script>
<style lang="less">
  .g-district-manage {
    .c-search-form.el-form--inline .el-form-item {
      width: 100%;
      vertical-align: baseline;
       margin-top: 2px;
       font-size: 0;
    }
    .el-dialog .el-form-item__content {
      width: 62%;
      line-height: 0px;
      margin-top: -1px;
    }
    .el-dialog table td:nth-child(2) .cell {
      padding-top:20px;
    }
    .el-dialog table {
      padding-bottom:4px;
    }
    .el-dialog .el-table__header-wrapper{
      height: 40px;
    }
    .el-dialog .c-table-wrap {
      padding-bottom: 0;
      padding-top: 0;
      margin-bottom: 20px;
      th {
        font-family: MicrosoftYaHei-Bold;
        color: #90939A;
      }
   }
  .el-dialog .el-form--inline .el-form-item label {
    line-height: 12px !important;
  }
  .el-dialog .el-table td{
    padding: 0;
  }
    .el-col-16 {
      padding-right: 0px !important;
    }
    .m-dialog .el-dialog__body {
      padding: 0px 30px;
    }
  }
</style>
<style scoped lang="less">
  .table-wrap {
      position: relative;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #EBEBEB;
      border-radius: 4px;
    }
    .table-add-btn {
      position: absolute;
      top: 5px;
      right: 49px;
      color: #FF7722;
      font-weight: bold;
      font-size: 14px;
      z-index: 1;
    }
    .u-del.el-button--text {
      color: #D8D8D8;
    }
    .u-add.el-button--text {
      color: #1989FA;
    }
    .u-color{
      color: #9B9B9B;
    }
    .u-line {
      font-size: 0;
    }
</style>
