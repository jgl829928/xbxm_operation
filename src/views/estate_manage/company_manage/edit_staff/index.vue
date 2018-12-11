<template>
  <div class="g-add-staff">
  	<el-form  class="c-search-form" :model="reqData" ref="reqData" :rules="rules" label-width="80px"
              label-position="right" :inline="true">
         <el-row :gutter="32">
      <el-col :span="8" :xs="24">
           <el-form-item label="所属商场" prop="marketCode">
       <select-market :reqData="reqData" :checkMarket="checkEdit"></select-market>
      </el-form-item>
        </el-col>
          <el-col :span="8" :xs="24">
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
        <el-col :span="8" :xs="24">
          <el-form-item label='员工姓名' prop="name">
            <el-input clearable v-model.trim="reqData.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
         <el-col :span="8" :xs="24">
          <el-form-item label='手机号' prop="cellPhone">
            <el-input clearable v-model.trim="reqData.cellPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label="性别" prop="sex">
              <el-select v-model="reqData.sex" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in sexList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label='身份证号' prop="identityCard">
            <el-input clearable v-model.trim="reqData.identityCard"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="32">
         <el-col :span="24" :xs="24">
          <el-form-item label='常住地址' prop="permanentAddress" class="u-textarea">
            <el-input type="textarea" v-model.trim="reqData.permanentAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
       <el-col :span="8" :xs="24">
          <el-form-item label='入职时间' prop="entryTime">
           <el-date-picker
      v-model="reqData.entryTime"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label='离职时间' prop="dimissionTime">
           <el-date-picker
      v-model="reqData.dimissionTime"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32" class="u-button">
        <el-col :span="8" :offset="16">
            <el-button class="btn-save-big" type="primary" @click="submitForm('reqData')">保存</el-button>
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
  name:"editStaff",
  data() {
    return {
        companyList:[],
       marketSearch:[],
      reqData:{
        cellPhone:'',
        companyId:'',
        dimissionTime:'',
        entryTime:'',
        identityCard: '',
        marketCode:'',
        name:"",
        permanentAddress:'',
        sex:'',
        staffId:''
      },
      checkEdit:true,
      sexList:[
        {label: '男', value: true},
        {label: '女', value: false}
      ],
      rules:{
		name:[
    { required: true, message: '请输入员工姓名', trigger: 'blur' },
		{ max: 20, message: '请输入字数不超过20字', trigger: 'blur' }
		],
		cellPhone:[
     { required: true, message: '请输入手机号', trigger: 'blur' },
            {pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码',trigger: 'blur'}
		],
		sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          marketCode: [
            { required: true, message: '请选择商场', trigger: 'change' }
          ],
           companyId: [
            { required: true, message: '请选择所属公司', trigger: 'change' }
          ],
          identityCard: [
            {pattern:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, message: '请输入正确的身份证号',trigger: 'blur'}
    ],
    permanentAddress:[{ max: 50, message: '请输入字数不超过50字', trigger: 'blur' }]
      },
      role:false
    }

  },
  components:{selectMarket},
   watch:{
        reqData:{//深度监听，可监听到对象、数组的变化
            handler(val, oldVal){
              if(val.marketCode == ""){
                  val.companyId = ""
                }
                this.getCompanyList(val.marketCode);
            },
            deep:true
        }
    },
  created(){
     this.getEditData(this.$route.params.staffId)
  },
  methods: {
   submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             let reqData = this.reqData
          var data = {
            ...reqData
          }
          if( this.reqData.entryTime > this.reqData.dimissionTime){
           this.$message.error('入职时间不能晚于离职时间')
          }else{
              this.handleSave('put',data)
          }

          } else {
            return false;
          }
        });
      },
      //保存的函数
      handleSave(method,data){
        this.$http({
              url:ApiSetting.staff,
              method:method,
              data:data
            }).then(res => {
              if(res){
                  this.$message.success(res.msg)
                  this.$router.push({name:"staff"})
                  this.$store.commit("delete_tabs", this.$route);
              }
            })
      },
      //获取编辑页内容
      getEditData(params){
        this.$http.get(ApiSetting.staff,{params:{staffId:params}}).then(res => {
          if(res && res.data){
             this.getCompanyList(res.data.marketCode)
             setTimeout(()=> {
            this.reqData= keysFilter(res.data[0],true,['marketName','serveName','createUser','createName','createTime'])
             },20)
             
            
          }
        })
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
<style scoped lang="less">
.g-add-staff {
	padding: 50px;
  padding-left: 40px;
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
}
</style>
<style lang="less">
.g-add-staff {
	.el-col-offset-16 {
		margin-left: 35%;
		margin-top: 60px;
	}
	.c-search-form .el-form-item__content {
    text-align: left;
  }
  .u-textarea{
    width: 100%;
     .el-form-item__content {
    width:91%;
  }
  }

}
</style>

