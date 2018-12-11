<template>
  <div class="g-add-record-two">
  	<el-form  class="c-search-form" :model="reqData" ref="reqData" :rules="rules" label-width="110px"
              label-position="right" :inline="true">
        <el-row :gutter="32" class="u-bottom">
        <el-col :span="8" :xs="24">
           <el-form-item label="所属商场" prop="marketCode">
       <select-market :reqData="reqData" @change="code_change"></select-market>
      </el-form-item>
        </el-col>
          <el-col :span="8" :xs="24">
          <el-form-item label="物业公司" prop="companyId">
              <el-select v-model="reqData.companyId" clearable placeholder="请选择" @change="companyChange">
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
          <el-form-item label='物业考核周期' prop="assess">
            <el-date-picker
      v-model="reqData.assess"
      type="month"
      value-format="yyyy-MM"
      placeholder="选择月"
      :picker-options="pickerOptions"
      @change="getRecord">
    </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32"  class="u-list">
      	<el-col :span="5" class="u-li">
          <span>{{recode.totalDays || "--"}}</span>
      		<p>考核天数</p>
      	</el-col>
        <el-col :span="5" class="u-li">
          <span>{{recode.assessNumber || "--"}}</span>
          <p>考核人数</p>
        </el-col>
        <el-col :span="5" class="u-li">
          <span>{{recode.qualifiedDays || "--"}}</span>
          <p>合格天数</p>
        </el-col>
        <el-col :span="5" class="u-li">
          <span>{{recode.qualified || "--"}}</span>
          <p>合格人*天</p>
        </el-col>
        <el-col :span="5" class="u-li">
          <span>{{recode.disqualified || "--"}}</span>
          <p>不合格人*天</p>
        </el-col>
      </el-row>
      <el-row :gutter="32" class="u-top">
         <el-col :span="8">
          <el-form-item label='收款方' prop="remittee">
            <el-input clearable v-model.trim="reqData.remittee"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="u-tip">
          <el-form-item label='合同金额（应付)' prop="contractValue" label-width="140px">
            {{reqData.contractValue||0.00}}
          </el-form-item>
          <span>收费标准*人事编制</span>
        </el-col>
      </el-row>
        <el-row :gutter="32">
         <el-col :span="8" :xs="24">
          <el-form-item label='扣款金额' prop="amount">
            <el-input clearable v-model.trim="reqData.amount" placeholder="0.00"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="u-tip-down">
          <el-form-item label='实付金额' prop="amountPaid" label-width="102px">
            {{reMsg || 0.00}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
      	 <el-col :span="8" :xs="24">
          <el-form-item label='说明' prop="accountFor">
            <el-input clearable v-model.trim="reqData.accountFor"></el-input>
          </el-form-item>
        </el-col>
       <el-col :span="12" :xs="24" class="u-tip-down">
          <el-form-item label='付款方' prop="payment" label-width="102px">
            <el-input clearable v-model.trim="reqData.payment"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
         <el-col :span="8" :xs="24">
          <el-form-item label='付款方式' prop="paymentMethod">
            <el-input clearable v-model.trim="reqData.paymentMethod"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row :gutter="32">
        <el-col :span="11" :xs="24">
          <el-form-item label="凭证
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
  </div>
</template>

<script>
import ApiSettingCom from '@/api/apiSetting'
import ApiSetting from '@/api/basicApi-estateApi'
import {keysFilter} from '@/utils/auth'
import selectMarket from '@/components/selectMarket'
export default {
  name:'addRecord',
  data() {
    //验证数字
    let checkAmount=(rule, value, callback) => {
        if (/^\d+(\.\d{1,2})?$/.test(value) == true && Number(value) > this.reqData.contractValue) {
          callback(new Error('扣款金额不能超过合同金额'));
        }else{
          callback();
        }
      };
    return {
      pickerOptions: {
          disabledDate(time) {
            let myDate = new Date()
            return time.getTime() > new Date(myDate.getFullYear(), myDate.getMonth(), 0, 0, 0, 0).getTime()
   }
 },
      reqData:{
        accountFor:'',
        amount:'',
        assess:'',
        companyId: '',
        contractValue:'0.00',
        financeId:"",
        marketCode:'',
        payment:'',
        paymentMethod:'',
        remittee:''
      },
      amountPaid:'',
      rules:{
		marketCode:[
		{ required: true, message: '请选择商场', trigger: 'change' }
		],
		companyId:[{ required: true, message: '请选择物业公司', trigger: 'change' }
		],
		assess: [
            { required: true, message: '请选择考核周期', trigger: 'change' }
          ],
          amount:[
          { validator: checkAmount, required: false,trigger: 'blur' },
          {pattern: /^\d+(\.\d{1,2})?$/, message: '请输入正确格式的金额(2位小数)',trigger: 'blur'},
          ],
          payment:[
            { max: 50, message: '输入字数在50字以内', trigger: 'blur' }
          ],
          remittee:[
            { max: 50, message: '输入字数在50字以内', trigger: 'blur' }
          ],
          accountFor:[
            { max: 50, message: '输入字数在50字以内', trigger: 'blur' }
          ],
          paymentMethod:[
            { max: 50, message: '输入字数在50字以内', trigger: 'blur' }
          ],
      },
      companyList:[],
      fileList:[],
      uploadUrl:ApiSetting.imageUpload,
      marketSearch:[],
      recode:{},
      role:false
    }

  },
  components:{selectMarket},
  computed: {
    gTicket:function(){
      return this.$store.state.gTicket
    },
     currentUser: function() {
      return this.$store.state.currentUser;
    },
     reMsg:{
                get:function(){
                        return this.reqData.contractValue-this.reqData.amount
                    }
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
      }else{
        this.companyList = []
      }  
  },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
          var data = {
            ...this.reqData,
            imgUrl:imgArr,
            amountPaid:this.reMsg || 0,
            totalDays:this.recode.totalDays||"",
            qualifiedDays:this.recode.qualifiedDays||""
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
              url:ApiSetting.finance,
              method:method,
              data:data
            }).then(res => {
              if(res){
                  this.$message.success(res.msg)
                  this.$router.push({name:"expenditure"})
                 this.$store.commit("delete_tabs", this.$route);
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
  companyChange(){
    this.getPay()
    this.getRecord()
  },
  getPay(){
     this.$http.get(ApiSetting.financeContract,{params:{companyId:this.reqData.companyId}}).then(res => {
      if(res && res.code == 0 && res.data){
        this.reqData.contractValue = res.data.contractValue
      }
    })
  },
    //获取固定记录
    getRecord(){
      if(this.reqData.companyId != "" && this.reqData.assess!="")
        this.$http.get(ApiSetting.financeCheck,{params:{
            companyId:this.reqData.companyId,
            data:this.reqData.assess
          }}).then(res => {
            if(res && res.code == 0 && res.data){
                this.recode = res.data
            }else{
              this.recode = {}
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
<style lang="less">
.g-add-record-two {
  .el-col-5{
    width: 20%;
  }
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
    width:93%;
  }
  }
   .el-date-editor.el-input, .el-date-editor.el-input__inner {
  	width: 200px;
  }
  .c-search-form > .u-list > div {
  	text-align: center;
  }
  .u-tip-down,.u-tip{
       .el-form-item__content {
        width:auto;
       }
    }
    .u-tip-down{
      text-align: left !important;
      padding-left: 88px !important;
    } 

      .el-range-separator {
    line-height: 29px;
  }
  .el-date-editor .el-range__icon {
    line-height: 29px;
  }
}
</style>
<style scoped lang="less">
.u-list {
	line-height: 63px;
	margin:0px 0px 50px -10px !important;
	padding:0px 50px;
	p {
    position: relative;
		display:inline-block;
		margin-left: 16px;
		font-size: 14px;
    color: #444444;
}
 .u-li:not(:last-child) p::after{
    content:"";
    display:inline-block;
    height: 30px;
    width: 1px;
    position:absolute;
    right: -45px;
    top:15px;
    background: #D8D8D8;
  }
   .u-li{
    display:flex;
    justify-content:center;
   }
.u-li:last-child p,.u-li:last-child span {
  color: #FF7623;
}
	span {
		font-size: 42px;
    color: #888888;
	}
}
.u-tip {
  text-align: left !important;
  padding-left: 50px !important;
	span{
		display: inline-block;
	margin-left: 10px;
	line-height: 40px;
	font-size: 12px;
	color: #9B9B9B;
	}

}
 .u-bottom {
    margin-bottom: 24px;
  }
  .u-top{
    position:relative;
    padding-top:50px;
  }
  .u-top:before {
    content:"";
    display:inline-block;
    height: 1px;
    width: 90%;
    position:absolute;
    left:50%;
    margin-left: -45%;
    top:0px;
    background: #EBEBEB;
  }
   .btn-80 {
    line-height: 31px;
  }
</style>

