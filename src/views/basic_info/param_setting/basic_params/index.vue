<template>
  <div class="g-basic-params">
  	<el-form  class="c-search-form" :model="reqData" ref="reqData" :rules="rules"
              label-position="right" :inline="true">
      <el-row :gutter="32">
        <el-col :span="11" :xs="24">
          <el-form-item label='合同到期提醒天数' label-width="180px" prop="contractExpire">
            <el-input clearable v-model.trim="reqData.contractExpire"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :xs="24">
          <el-form-item label="合同交费到期提醒天数
" prop="contractPaymentExpire" label-width="180px">
            <el-input clearable v-model.trim="reqData.contractPaymentExpire"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
      	<el-col :span="11" :xs="24">
          <el-form-item label="日常交费到期提醒天数
" prop="dailyPaymentExpire" label-width="180px">
            <el-input clearable v-model.trim="reqData.dailyPaymentExpire"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
      <el-col :span="11" :xs="24">
	<el-form-item label="是否短信提醒" prop="isMessageNotifications" label-width="180px">
    <el-radio-group v-model="reqData.isMessageNotifications">
      <el-radio :label="1" >是</el-radio>
      <el-radio :label="0" >否</el-radio>
    </el-radio-group>
  </el-form-item>
  </el-col>
    <el-col :span="11" :xs="24">
	<el-form-item label="是否APP推送消息" prop="isAppPush" label-width="180px">
    <el-radio-group v-model="reqData.isAppPush">
      <el-radio :label="1" >是</el-radio>
      <el-radio :label="0">否</el-radio>
    </el-radio-group>
  </el-form-item>
  </el-col>
      </el-row>
      <el-row :gutter="32" class="u-button">
        <el-col :span="8" :offset="16">
            <el-button class="btn-save-big" type="primary" @click="submitForm('reqData')" v-show="rightControl('basicParams_save')">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import ApiSetting from '@/api/basicApi-estateApi'
export default {
  name:'basicParams',
  data() {
    return {
    	reqData:{
        contractExpire:'5',
        contractPaymentExpire:'5',
        dailyPaymentExpire:'5',
        isAppPush:1,
        isMessageNotifications:1,
        messageNotificationsCode:'',
      },
      rules:{
		contractExpire:[
		{ required: true, message: '请输入合同到期提醒天数', trigger: 'blur' },
     {pattern: /^[0-9]*[1-9][0-9]*$/, message: '请输入正确天数',trigger: 'blur'}
		],
		contractPaymentExpire:[{ required: true, message: '请输入合同交费到期提醒天数', trigger: 'blur' },
     {pattern: /^[0-9]*[1-9][0-9]*$/, message: '请输入正确天数',trigger: 'blur'}
		],
		dailyPaymentExpire: [
            { required: true, message: '请输入日常交费到期提醒天数', trigger: 'blur' },
            {pattern: /^[0-9]*[1-9][0-9]*$/, message: '请输入正确天数',trigger: 'blur'}
          ],
          isAppPush: [
            { required: true, message: '请选择是否APP推送', trigger: 'change' }
          ],
          isMessageNotifications: [
            { required: true, message: '请选择是否短信提醒', trigger: 'change' }
          ]
      }
    }
  },
  created(){
    this.getData()
  },
  methods: {
     // 权限判断
    rightControl (id) {
      return this.$store.getters.getPermission(id)
    },
   submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.$http.put(ApiSetting.basicParams,{...this.reqData}).then(res => {
              if(!res) return
              if(res.code == 0){
                this.$message.success(res.msg)
                this.getData()
              }else{
                this.$message.error(res.msg)
              }

            })
          } else {
            return false;
          }
        });
      },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //获取基础参数
      getData(){
        this.$http({
          url:ApiSetting.basicParams,
          method:'get',
          showLoading:true}).then(res => {
            if(res && JSON.stringify(res.data) != "{}")
            this.reqData = res.data
        })
      }
  }
};
</script>
<style scoped lang="less">
.g-basic-params {
	padding: 50px;
  .c-search-form .el-form-item__content {
    text-align: left;
  }
}
</style>
<style lang="less">
.g-basic-params {
	.el-col-offset-16 {
		margin-left: 35%;
		margin-top: 60px;
	}
  .el-form--inline .el-form-item__content {
    text-align: left;
  }
}
</style>

