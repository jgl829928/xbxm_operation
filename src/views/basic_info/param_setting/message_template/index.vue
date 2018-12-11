<template>
  <div class="g-message-template">
    <el-form  class="c-search-form" :model="labelMap" ref="labelMap"  :inline="true"
              label-position="right">
      <div class="u-orange-title">合同到期提醒</div>
      <el-row :gutter="32" class="u-input">
        <el-col :span="17" :xs="24" >
          <el-form-item label="短信模版" label-width="105px"
          :rules="[
      { max: 200, message: '请输入内容限制在200字内', trigger: 'blur' }
    ]" prop="1.templateContent">
            <el-input type="textarea" v-model.trim="labelMap[1].templateContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :xs="24">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="labelMap[1].status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">停用</el-radio>
    </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
     <el-row :gutter="32" class="u-input">
        <el-col :span="17" :xs="24" >
          <el-form-item label="APP提醒模版" label-width="105px"
          :rules="[
      { max: 200, message: '请输入内容限制在200字内', trigger: 'blur' }
    ]" prop="4.templateContent">
            <el-input type="textarea" v-model.trim="labelMap[2].templateContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :xs="24">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="labelMap[2].status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">停用</el-radio>
    </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="u-orange-title">合同交费提醒</div>
      <el-row :gutter="32" class="u-input">
        <el-col :span="17" :xs="24" >
          <el-form-item label="短信模版" label-width="105px" :rules="[
      { max: 200, message: '请输入内容限制在200字内', trigger: 'blur' }
    ]" prop="2.templateContent">
            <el-input type="textarea" v-model.trim="labelMap[3].templateContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :xs="24">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="labelMap[3].status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">停用</el-radio>
    </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
     <el-row :gutter="32" class="u-input">
        <el-col :span="17" :xs="24" >
          <el-form-item label="APP提醒模版" label-width="105px" :rules="[
      { max: 200, message: '请输入内容限制在200字内', trigger: 'blur' }
    ]" prop="5.templateContent">
            <el-input type="textarea" v-model.trim="labelMap[4].templateContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :xs="24">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="labelMap[4].status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">停用</el-radio>
    </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="u-orange-title">日常缴费提醒</div>
      <el-row :gutter="32" class="u-input">
        <el-col :span="17" :xs="24" >
          <el-form-item label="短信模版" label-width="105px" :rules="[
      { max: 200, message: '请输入内容限制在200字内', trigger: 'blur' }
    ]" prop="3.templateContent">
            <el-input type="textarea" v-model.trim="labelMap[5].templateContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :xs="24">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="labelMap[5].status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">停用</el-radio>
    </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
     <el-row :gutter="32" class="u-input">
        <el-col :span="17" :xs="24" >
          <el-form-item label="APP提醒模版" label-width="105px"
          :rules="[
      { max: 200, message: '请输入内容限制在200字内', trigger: 'blur' }
    ]" prop="6.templateContent">
            <el-input type="textarea" v-model.trim="labelMap[6].templateContent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :xs="24">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="labelMap[6].status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">停用</el-radio>
    </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
          <div class="u-example">
            说明：模板中需要动态插入的文字请用编号代替，第一处需要插入的位置标注{0}，第二处标注{1}，以此类推。
          </div>
      </el-row>
      <el-row :gutter="32">
          <div class="u-example u-color">
            例如：尊敬的商户{0}，您好，您的{1}已经欠款了，请您及时到物业财务部门交款，咨询电话123456，谢谢！
          </div>
      </el-row>
      <el-row :gutter="32">
          <div class="z-center">
            <el-button class="btn-save-big" type="primary" @click="save" v-show="rightControl('messageModules_save')">保存</el-button>
          </div>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import ApiSetting from '@/api/basicApi-estateApi'
export default {
  name:'messageModules',
  data() {
    return {
      labelMap:{
        1:{
          informationTemplateCode:"",
          templateType:"",
          templateContent:"",
          status:0
        },
        2:{
          informationTemplateCode:"",
          templateType:"",
          templateContent:"",
          status:0
        },
        3:{
          informationTemplateCode:"",
          templateType:"",
          templateContent:"",
          status:0
        },
        4:{
          informationTemplateCode:"",
          templateType:"",
          templateContent:"",
          status:0
        },
        5:{
          informationTemplateCode:"",
          templateType:"",
          templateContent:"",
          status:0
        },
        6:{
          informationTemplateCode:"",
          templateType:"",
          templateContent:"",
          status:0
        },
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
    save() {
      this.$refs['labelMap'].validate((valid) => {
    if (valid) {
      let arr = []
      for(var item in this.labelMap){
        arr.push(this.labelMap[item])
      }
      var status = arr.some((item)=> {
        return item.status == 1 && (item.templateContent == null ||item.templateContent == "")
      })
      if(status){
        this.$message.error('启用状态下必须填写模版内容')
      }else{
          this.$http.post(ApiSetting.basicTemplate,arr).then(res => {
        if(res){
          if(res.code == 0){
            this.$message.success(res.msg)
            this.getData()
          }else{
            this.$message.error(res.msg)
          }
        }
      })
      }
    }
  })
    },
    indexMethod(index) {
      return index + (this.labelMap.page - 1)*20 + 1
    },
    getData(){
      this.$http({
        url:ApiSetting.basicTemplate,
        method:'get',
        showLoading:true
      }).then(res => {
        if(res && res.data){
          if(res.code == 0){
            this.labelMap = res.data
           }
        }
      })
    }
  }
};
</script>
<style lang="less">
	.g-message-template {
		.u-input .el-form-item__content {
			width: 75%;
      vertical-align: middle;
		}
    .c-search-form.el-form--inline .el-form-item {
      width: 100%;
      vertical-align: unset;
    }
  .el-col-8 {
    .el-form-item__content {
      width: auto;
    }
  }
  .c-search-form > div > div:nth-child(2) {
    margin-top: 20px;
    text-align: left;
  }
	}
</style>
<style scoped lang="less">
  .u-example {
    margin-left: 15%;
    font-size: 12px;
  }
  .u-color {

    color: #1989FA;
  }
  .z-center {
    text-align: center;
    margin: 60px 0px;
  }

</style>
