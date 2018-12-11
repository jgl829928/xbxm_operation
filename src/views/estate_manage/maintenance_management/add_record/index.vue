<template>
  <div class="g-add-record">
  	<el-form  class="c-search-form" :model="reqData" ref="reqData" :rules="rules" label-width="110px"
              label-position="right" :inline="true">
         <el-row :gutter="32">
        <el-col :span="11" :xs="24">
          <el-form-item label="所属商场" prop="marketCode">
        <select-market :reqData="reqData"></select-market>
      </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
      	<el-col :span="11" :xs="24">
         <el-form-item label="一级分类" prop="firstId">
              <el-select v-model="reqData.firstId" clearable placeholder="请选择"
              @change="changeSec">
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
        <el-col :span="11" :xs="24">
          <el-form-item label="二级分类" prop="rankId">
              <el-select v-model="reqData.rankId" placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in categotyListSec"
                  :key="index"
                  :label="item.rankName"
                  :value="item.rankId">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="32">
         <el-col :span="11" :xs="24">
          <el-form-item label="设备编号" prop="equipmentCode">
              <el-select v-model="reqData.equipmentCode" clearable placeholder="请选择" @change="getMertion">
                <el-option
                  v-for="(item, index) in equipmentCodeList"
                  :key="index"
                  :label="item.equipmentCode"
                  :value="item.equipmentCode">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="11" :xs="24">
          <el-form-item label='设备型号' prop="equipmentModel">
            <el-input clearable v-model.trim="equipment.equipmentModel" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="32">
        <el-col :span="11" :xs="24">
          <el-form-item label='设备名称' prop="equipmentName">
            <el-input clearable v-model.trim="equipment.equipmentName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :xs="24">
          <el-form-item label="维保公司" prop="maintenanceCompany">
            <el-input clearable v-model.trim="reqData.maintenanceCompany"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
      	<el-col :span="11" :xs="24">
          <el-form-item label="维保金额
                  " prop="maintenanceCost" >
            <el-input clearable v-model.trim="reqData.maintenanceCost" placeholder="0.00"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :xs="24">
          <el-form-item label="维保人
                  " prop="maintenancePerson" >
            <el-input clearable v-model.trim="reqData.maintenancePerson"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="32">
         <el-col :span="11">
          <el-form-item label="维保时间" prop="time">
            <el-date-picker
              v-model="reqData.time"
              type="datetimerange"
              :picker-options="pickerOptions0"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              :default-time="['00:00:00','23:59:59']"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
      	<el-col :span="11" :xs="24">
          <el-form-item label="维保附件
" prop="accessoryList" >
                       <el-upload
  class="upload-demo"
  :action="$http.defaults.baseURL+uploadUrl"
  :before-remove="beforeRemove"
  multiple
  :limit="10"
  :on-remove="handleAccessoryRemove"
  :on-exceed="handleExceed"
  :headers="{gTicket:gTicket}"
  :file-list="accessoryList"
  :on-success="handleAccessoryList"
  :before-upload="beforeLogoUpload">
  <el-button size="small" type="primary" class="btn-80 btn-upload">浏览</el-button>
</el-upload>

          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
      	<el-col :span="11" :xs="24">
          <el-form-item label="维保合同
" prop="contractList" >
                       <el-upload
  class="upload-demo"
  :action="$http.defaults.baseURL+uploadUrl"
  :before-remove="beforeRemove"
  multiple
  :limit="10"
  :on-remove="handleContractRemove"
  :on-exceed="handleExceed"
  :file-list="contractList"
  :headers="{gTicket:gTicket}"
  :on-success="handleContractList"
  :before-upload="beforeLogoUpload">
  <el-button size="small" type="primary" class="btn-80 btn-upload">浏览</el-button>
</el-upload>

          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32" class="u-button">
        <el-col :span="8" :offset="16">
            <el-button class=" btn-save-big" type="primary" @click="submitForm('reqData')">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import ApiSettingCom from '@/api/apiSetting'
import ApiSetting from '@/api/basicApi-estateApi'
import {keysFilter} from '@/utils/auth'
import selectMarket from '@/components/selectMarket'
export default {
  name:'addMainRecord',
  data() {
      let ratesStandardNum = (rule, value, callback) => {
      let num = Number(value)
     if(value === ''){
        callback(new Error('请输入维保金额'));
      }else if(num <= 0){
        callback(new Error('维保金额必须大于0'));
      }else if(!/^\d+(\.\d{1,2})?$/.test(value)){
         callback(new Error('请输入正确的金额格式(小数两位)'));
      }else{
        callback()
      }
    }
    return {
      checkEdit:"",
      uploadUrl:ApiSetting.imageUpload,
       pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      reqData:{
        equipmentCode:"",
        maintenanceCompany:"",
        maintenanceCost:'0.00',
        maintenanceId:"",
        maintenancePerson:"",
        firstId: '',
        rankId:'',
        marketCode:'',
        time:[new Date().getTime(),(new Date().getTime()+60000)],
      },
      //编码和名称
      equipment:{
        equipmentModel:"",
        equipmentName:""
      },
      firstId:"",
      rankId:"",
      time:"",
      contractList:[],
      accessoryList:[],
      categotyListFir:[
      ],
      categotyListSec:[],
      rules:{
		time:[
		{ required: true, message: '请选择交款起止时间', trigger: 'change'}
		],
    maintenanceCost:[
   { validator: ratesStandardNum, trigger: 'blur' },
   { required: true, message: '请输入维保金额', trigger: 'change' }
    ],
     equipmentCode: [
            { required: true, message: '请选择设备编号', trigger: 'change' }
          ],
          firstId: [
            { required: true, message: '请选择一级分类', trigger: 'change' }
          ],
          marketCode :[
            { required: true, message: '请选择商场', trigger: 'change' }
          ],
          maintenanceCompany:[
            { max: 30, message: '最多输入30个字', trigger: 'blur' }
          ],
          maintenancePerson:[
            { max: 12, message: '最多输入12个字', trigger: 'blur' }
          ]
      },
      equipmentCodeList:[],
      marketSearch:[],
      role:false
    }

  },
 components:{selectMarket},
 created(){
    this.handleCategory('-1','categotyListFir')
  },
    computed:{
    gTicket:function(){
      return this.$store.state.gTicket
    }
  },
  watch:{
        reqData:{//深度监听，可监听到对象、数组的变化
            handler(val, oldVal){
              if(val.marketCode == ""){
                  val.companyId = ""
                }
                this.getEquipmentCodeList(val.marketCode);
            },
            deep:true
        }
    }, 
  methods: {
    //获取设备型号和设备名称
     getMertion(equipmentCode){
      this.$http.get(ApiSetting.equipmentCode,{params:{equipmentCode:equipmentCode}}).then(res => {
          if(res){
            if(res.code == 0){
                this.equipment = res.data
            }
          }
      })
     },
     handleAccessoryRemove(file, fileList) {
       this.accessoryList = fileList
      },
      handleContractRemove(file, fileList) {
       this.contractList = fileList
      },
        handleContractList(res, file, fileList){
          if(res && res.code == 0 && res.data){
            this.contractList.push(res.data)
          }

    },
       handleAccessoryList(response, file, fileList){
        if(response && response.code == 0 && response.data){
      this.accessoryList.push(response.data)
    }
    },
     handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
     beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    // 上传图片前限制
beforeLogoUpload(file) {
const isJPG =
file.type === "image/jpeg" || "image/png" || "image/jpg" || "image/bmp";
const isLt2M = file.size / 1024 / 1024 < 5;
if (!isJPG) {
this.$message.error("上传图片只能是 jpg、png、jpeg、bmp格式!");
}
if (!isLt2M) {
this.$message.error("上传图片大小不能超过5MB!");
}
return isJPG && isLt2M;
},
   submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let reqData = keysFilter(this.reqData,true,['firstId','rankId','time'])
          if(this.reqData.rankId == "" ) {
            this.reqData.rankId = this.reqData.firstId
          }
          let accessoryimgArr = []
          if(this.accessoryList.length != 0){
            this.accessoryList.forEach(item => {
             let imgUrl = {}
            imgUrl['name'] = item['name']
            imgUrl['url'] = item['url']
            if(accessoryimgArr.indexOf(item) == -1){
              accessoryimgArr.push(imgUrl)
            }
          })
          }
          let contractimgArr = []
          if(this.contractList.length != 0){
            this.contractList.forEach(item => {
             let imgUrl = {}
            imgUrl['name'] = item['name']
            imgUrl['url'] = item['url']
            if(contractimgArr.indexOf(item) == -1){
              contractimgArr.push(imgUrl)
            }
          })
          }
          var time1 = this.formatDateTime(this.reqData.time[0])
          var time2 = this.formatDateTime(this.reqData.time[1])
        
          var data = {
            ...reqData,
            ...this.equipment,
            rankId:this.reqData.rankId,
            beginTime:time1,
            endTime:time2,
            imgAccessoryUrl:accessoryimgArr,
            imgContractUrl:contractimgArr
          }
              this.handleSave('post',data)
          } else {
            return false;
          }
        });
      },
      formatDateTime: function (inputTime) {
            var date = new Date(inputTime);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        },
       //保存的函数
      handleSave(method,data){
        this.$http({
              url:ApiSetting.maintenance,
              method:method,
              data:data
            }).then(res => {
              if(res){
                  this.$message.success(res.msg)
                  this.$router.push({name:"maintenance"})
                 this.$store.commit("delete_tabs", this.$route);
              }
            })
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
            if(res.data.length > 0){
              this[list] = res.data
              if(list == 'categotyListSec'){
               this.reqData.rankId = res.data[0].rankId;
              }
            }else{
              this[list] = []
              this.reqData.rankId = "";
            }
          }
        }
      })
    },
      changeSec() {
      if(this.reqData.firstId != ""){
        this.handleCategory(this.reqData.firstId, "categotyListSec");
      }else{
        this.categotyListSec = []
        this.reqData.rankId = "";
      }
    },
      //获取所有设备
      getEquipmentCodeList(marketCode){
        this.$http.get(ApiSetting.allCode,{params:{marketCode:marketCode}}).then(res => {
          if(res){
            if(res.code == 0) {
              this.equipmentCodeList = res.data
            }
          }
        })
      }
  }
};
</script>
<style scope lang="less">
.g-add-record {
	padding: 50px;
  .btn-handle {
  	background: #FF7623;
  	color: #fff;
  	border: none;
  	margin-top: 5px;
  	margin-left: 4px;
  }
  .u-margin-6 {
  	margin-left: 10px;
  }
   .btn-80 {
    line-height: 31px;
  }
}
</style>
<style lang="less">
.g-add-record {
	.el-col-offset-16 {
		margin-left: 35%;
		margin-top: 60px;
	}
	.c-search-form .el-form-item__content {
    text-align: left;
  }
}
</style>

