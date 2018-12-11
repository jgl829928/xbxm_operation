<template>
  <div class="g-add-company">
  	<el-form  class="c-search-form" :model="reqData" ref="reqData" :rules="rules" label-width="110px"
              label-position="right" :inline="true">
         <el-row :gutter="32">
        <el-col :span="11" :xs="24">
          <el-form-item label="所属商场" prop="marketCode">
       <select-market :reqData="reqData"></select-market>
     </el-form-item>
        </el-col>
        <el-col :span="12" class="u-left">
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
          <el-button class="btn-handle" @click="dialogFormVisibleFir = true">添加</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="32">
      	<p class="u-orange-title">公司信息</p>
      </el-row>
      <el-row :gutter="32">
       <el-col :span="11" :xs="24">
          <el-form-item label='公司名称' prop="companyName">
            <el-input clearable v-model.trim="reqData.companyName"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="11" class="u-left">
          <el-form-item label='税务编号' prop="taskNumber">
            <el-input clearable v-model.trim="reqData.taskNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
         <el-col :span="11" :xs="24">
          <el-form-item label='公司地址' prop="companyAddress">
            <el-input clearable v-model.trim="reqData.companyAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
       <el-col :span="11" :xs="24">
          <el-form-item label='联系人' prop="contacts">
            <el-input clearable v-model.trim="reqData.contacts"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="11" class="u-left">
          <el-form-item label='联系方式' prop="companyCell">
            <el-input clearable v-model.trim="reqData.companyCell"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
       <p class="u-orange-title">合作信息</p>
      </el-row>
      <el-row :gutter="32">
       <el-col :span="11">
          <el-form-item label='收费标准' prop="ratesStandard" class="u-input-250">
            <el-input clearable v-model.trim="reqData.ratesStandard" placeholder="0.00"></el-input>
          </el-form-item>
          <span class="u-lh">/人*月</span>
        </el-col>
         <el-col :span="12" class="u-input-260">
          <el-form-item label='人事编制' prop="totalPeople" >
            <el-input clearable v-model.trim="reqData.totalPeople" placeholder="0"></el-input>
          </el-form-item>
          <span class="u-lh">/人</span>
        </el-col>
      </el-row>
      <el-row :gutter="32">
       <el-col :span="11" :xs="24">
          <el-form-item label='协议签署时间' prop="contractSignedTime">
           <el-date-picker
      v-model="reqData.contractSignedTime"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
          </el-form-item>
        </el-col>
         <el-col :span="11" class="u-left">
          <el-form-item label='签署主体' prop="signedSubject">
            <el-input clearable v-model.trim="reqData.signedSubject"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
             <el-row :gutter="32">
         <el-col :span="11">
          <el-form-item label="合同起止时间" prop="time">
            <el-date-picker
              v-model="reqData.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
      	<el-col :span="11" :xs="24">
          <el-form-item label="协议附件
" prop="skuCode" >
            <el-upload
  class="upload-demo"
  :action="$http.defaults.baseURL+uploadUrl"
  :before-remove="beforeRemove"
  multiple
  :limit="10"
  :headers="{gTicket:gTicket}"
  :on-exceed="handleExceed"
  :file-list="fileList"
  :on-success="handleList"
  :before-upload="beforeLogoUpload"
  :on-remove="handleRemove">
  <el-button size="small" type="primary" class="btn-80 btn-upload">浏览</el-button>
</el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32" class="u-button">
        <el-col :span="8" :offset="16">
            <el-button class="btn-save-big" type="primary" @click="submitForm('reqData')">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
     <el-dialog title="添加" :visible.sync="dialogFormVisibleFir" class="s-dialog">
  <el-form :model="form" :rules="dialogRules" ref="form" label-width="80px">
    <el-form-item label="名称"  prop="serveName">
      <el-input v-model.trim="form.serveName" auto-complete="off" clearable></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="reset('form')" class="btn-reset">取 消</el-button>
    <el-button type="primary" @click="firCategoryAdd('form')" class="btn-save">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import ApiSettingCom from '@/api/apiSetting'
import ApiSetting from '@/api/basicApi-estateApi'
import {keysFilter} from '@/utils/auth'
import selectMarket from '@/components/selectMarket'
export default {
  name:'addCompany',
  data() {
   let ratesStandardNum = (rule, value, callback) => {
      let num = Number(value)
      if(value ==''){
        callback(new Error('请输入收费标准'));
      }else if(num <= 0){
        callback(new Error('收费标准必须大于0'));
      }else if(!/^\d+(\.\d{1,2})?$/.test(value)){
         callback(new Error('请输入正确的金额格式(小数两位)'));
      }else{
        callback()
      }
    }
    let peopleNum = (rule, value, callback) => {
      let num = Number(value)
      if(value ==''){
        callback(new Error('请输入人数'));
      }else if(num <= 0){
        callback(new Error('人数必须大于0'));
      }else if(!/^\d+$/.test(value)){
         callback(new Error('请输入整数'));
      }else{
        callback()
      }
    }
    return {
      dialogFormVisibleFir:false,
      reqData:{
        companyAddress:'',
        companyId:'',
        serveId:'',
        marketCode:'',
        signedSubject:'',
        taskNumber:"",
        contacts:'',
        contractSignedTime:'',
        totalPeople:'',
        companyCell:'',
        ratesStandard:"",
        companyName:'',
        time:[],
      },
      rules:{
		companyName:[
		{ required: true, message: '请输入公司名称', trigger: 'blur' },
    { max: 50, message: '最多输入50个字', trigger: 'blur' }
		],
		ratesStandard:[
     { validator: ratesStandardNum, trigger: 'blur' },
      {required:true,message:'请填写收费标准',trigger:'blur'}
		],
		      totalPeople: [
            { validator: peopleNum, trigger: 'blur' },
            {required:true,message:'请输入人数',trigger:'blur'}

          ],
          serveId: [
            { required: true, message: '请选择服务范围', trigger: 'change' }
          ],
          marketCode: [
            { required: true, message: '请选择商场', trigger: 'change' }
          ],
          taskNumber:[
            { max: 50, message: '最多输入50个字', trigger: 'blur' }
          ],
          companyAddress: [
            { max: 50, message: '最多输入50个字', trigger: 'blur' }
          ],
          contacts:[
            { max: 20, message: '最多输入20个字', trigger: 'blur' }
          ],
          companyCell:[
            { max: 20, message: '最多输入20个字', trigger: 'blur' },
            {pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码',trigger: 'blur'}
          ],
          signedSubject:[
            { max: 20, message: '最多输入20个字', trigger: 'blur' }
          ]
      },
      dialogRules:{
        serveName: [
            { required: true, message: '请输入服务范围', trigger: 'blue'}
          ]
      },
      form:{serveName:""},
      service:[],
      fileList:[],
      uploadUrl:ApiSetting.imageUpload,
      marketSearch:[],
      checkEdit:"",
      role:false,
    }

  },
  components:{selectMarket},
  created(){
    this.getService()
  },
  computed:{
    gTicket:function(){
      return this.$store.state.gTicket
    },
  },
  methods: {
   submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.reqData)
          let reqData = keysFilter(this.reqData,true,['time'])
          let imgArr = []
          if(this.fileList.length != 0){
            this.fileList.forEach(item => {
             let imgUrl = {}
            imgUrl['name'] = item['name']
            imgUrl['url'] = item['url']
            if(imgArr.indexOf(item) == -1){
              imgArr.push(imgUrl)
            }
          })
          }
          let contractBeginTime,contractEndTime
          if(this.reqData.time != null){
             contractBeginTime = this.reqData.time[0] 
             contractEndTime = this.reqData.time[1]
          }else{
            contractBeginTime = ""
            contractEndTime = ""
          }
          var data = {
            ...reqData,
            imgUrl:imgArr,
            contractBeginTime:contractBeginTime,
            contractEndTime:contractEndTime
          }

              this.handleSave('post',data)
            
          } else {
            return false;
          }
        });
      },
      //保存的函数
      handleSave(method,data){
        this.$http({
              url:ApiSetting.company,
              method:method,
              data:data
            }).then(res => {
              if(res){
                  this.$message.success(res.msg)
                  this.$router.push({name:"company"})
                this.$store.commit("delete_tabs", this.$route);
              }
            })
      },
     reset(form){
      this.dialogFormVisibleFir = false
      this.$refs[form].resetFields();
      this.$nextTick(()=>{
        this.$refs[form].clearValidate();
      })
    },
      //获取服务范围
      getService(){
        this.$http.get(ApiSetting.serveRange).then(res => {
          if(res && res.code == 0){
            this.service = res.data
          }
        })
      },
      handleRemove(file, fileList) {
       this.fileList = fileList
      },
        handleList(res, file, fileList){
      if(res && res.code == 0 && res.data){
          this.fileList.push(res.data)
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
 //添加服务范围
    firCategoryAdd(form){
       this.$refs[form].validate((valid) => {
          if (valid) {
      this.$http.post(ApiSetting.serveRange,{
        ...this.form
      }).then(res => {
        if(res){
          if(res.code == 0){
            this.$message.success(res.msg)
            this.getService()
            this.dialogFormVisibleFir = false
          }else{
           return this.$message.error(res.msg)
          }
        }

      })
          } else {

          }
      })
//          .u-input-250{
//      .el-form-item__content {
//     width: 273px;
//     .el-input {
//       width: 80%;
//       margin-right: 7px;
//     }
//   }
//   }
//   .u-input-260{
//     margin-left: 2.6%;
//      .el-form-item__content {
//     width: 283px;
//     .el-input {
//       width: 71%;
//       margin-right: 7px;
//     }
//   }
// }
    },
  }
};
</script>
<style scoped lang="less">
.g-add-company {
	padding: 50px;
  .btn-handle {
  	background: #FF7623;
  	color: #fff;
  	border: none;
  	margin-top: 5px;
  	margin-left: 4px;
  }
  .u-lh {
    line-height: 36px;
  }
  .u-input-260 {
    text-align: left;
  }
  .u-left {
    text-align: left;
  }
   .btn-80 {
    line-height: 31px;
  }
}
</style>
<style lang="less">
.g-add-company {
	.el-col-offset-16 {
		margin-left: 35%;
		margin-top: 60px;
	}
	.c-search-form .el-form-item__content {
    text-align: left;
  }
  .el-range-separator {
    line-height: 29px;
  }
  .el-date-editor .el-range__icon {
    line-height: 29px;
  }
}
</style>

