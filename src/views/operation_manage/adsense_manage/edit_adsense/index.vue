<template>
  <div class="contract-receipts add-advertise">
    <div class="main-title">
      <!--<span class="el-icon-back back-btn" @click="$router.go(-1)"></span>-->
      修改广告位</div>
    <el-form class="c-search-form" :rules="rules" :model="ruleForm" ref="ruleForm" label-width="145px" :inline="true"
             label-position="right">
      <el-row>
        <el-col :span="10">
          <el-form-item label="所属商场" prop="marketCode">
           <!-- <el-select v-model.trim="ruleForm.marketCode" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in storeNameOption"
                :key="index"
                :label="item.marketName"
                :value="item.marketCode">
              </el-option>
            </el-select>-->
            <selectMarket :reqData="ruleForm"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="广告位类型" prop="bdType">
            <el-select v-model.trim="ruleForm.bdType" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in bdTypeOption"
                :key="index"
                :label="item.desc"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="广告位名称" prop="bdName">
            <el-input clearable v-model.trim="ruleForm.bdName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="广告位编号(方位号)" prop="coCode">
            <el-input clearable v-model.trim="ruleForm.coCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="所处位置" prop="location">
            <el-input clearable v-model.trim="ruleForm.location"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="封面图" prop="imageUrl">
            <el-upload
              class="avatar-uploader"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :show-file-list="false"
              accept="image/jpg,image/jpeg,image/png,image/bmp,image/gif"
              :before-upload="beforeImgUpload"
              :on-success="handleAvatarSuccess">
              <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <div>
        <el-form-item label="面积/尺寸" prop="bdSize" class="area-size">
          <el-input  clearable v-model.trim="ruleForm.bdSize"></el-input>
        </el-form-item>
        <span class="unit">平米</span>
      </div>
      <el-row>
        <el-col :span="20">
          <el-form-item label="广告位介绍" prop="describtion" class="advertise-introduce">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model.trim="ruleForm.describtion">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="save-btn">
        <el-button class="btn-save-big" type="primary" icon="el-icon-save" @click="submitForm('ruleForm')">保存</el-button>
      </div>

    </el-form>
  </div>
</template>

<script>
  import api from '@/api/operation-manage';
  import selectMarket from '@/components/selectMarket';
  import { mapState } from 'vuex'
  export default {
    name:'editAdsense',
    components: {
      selectMarket
    },
    computed:{
      ...mapState(['gTicket'])
    },
    data() {
      return {
        uploadUrl:'',
        uploadHeaders:{
          gTicket:''
        },
        rules: {
          marketCode: [{required: true, message: '请选择所属商场', trigger: 'change'}],
          bdType: [{required: true, message: '请选择广告位类型', trigger: 'change'}],
          bdName: [{required: true, message: '请输入广告位名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度1-20 个字符', trigger: 'blur'}],
          coCode: [{required: true, message: '请输入广告位方位号', trigger: 'blur'},
            {min: 1, max: 20, message: '长度1-20 个字符', trigger: 'blur'}],
          location: [{required: true, message: '请输入所处位置', trigger: 'blur'},
            {min: 1, max: 30, message: '长度1-30 个字符', trigger: 'blur'}],
          imageUrl: [{required: true, message: '请上传封面图片', trigger: 'change'}],
          bdSize: [{required: true, message: '请输入面积/尺寸', trigger: 'blur'},
            {trigger: 'blur',pattern:/^\d+(?:\.\d{1,2})?$/,message: '请输入大于等于零的数字，最多保留两位小数'}],
          describtion: [{min: 1, max: 120, message: '长度1-120 个字符', trigger: 'blur'}]
        },
        storeNameOption:[],
        ruleForm: {
          marketCode: "",
          bdType: '',
          bdName: "",
          coCode: "",
          location: "",
          imageUrl: "",
          bdSize:'',
          describtion: "",
          initialTime:'2018-05'
        },
        payWay: [
          {label: '微信', value: 1},
          {label: '支付宝', value: 2},
          {label: 'POS机刷卡', value: 3}
        ],
        bdTypeOption: [
          {id: 1, desc: '内墙广告'},
          {id: 2, desc: '外墙广告'}
        ],
      }
    },
    methods: {
      getOptionData() {
        //商场名称下拉框
        let storeNameOption = this.$http.get(api.allStore);
        Promise.all([storeNameOption]).then(res => {
          if (res[0].code === 0) {
            this.storeNameOption = [];
            this.storeNameOption = [...res[0].data];
          }
        })
      },
      beforeImgUpload(file) {
        const isLt5M = file.size / 1024 / 1024 <= 20;
        if (!isLt5M) {
          this.$message.error("上传头像图片大小不能超过20MB!");
        }
        return isLt5M;
      },
      handleAvatarSuccess(res) {
        this.ruleForm.imageUrl = res.data;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.put(api.advertiseList+`/${this.ruleForm.billboardCode}`,this.ruleForm).then(res=>{
              if(res.code===0){
                this.$message.success(res.msg);
                this.$router.push('/operation/adsense');
              }else{
                this.$message.error(res.msg);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getOneData(){
        let id=this.$route.params.id;
        this.$http.get(api.oneAdvertise+`/${id}`).then(res=>{
            if(res.code===0){
              Object.assign(this.ruleForm,res.data);
              let obj={...this.ruleForm.bdType};
              this.ruleForm.bdType=obj.code;
              console.log(this.ruleForm)
            }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    beforeMount() {
      this.getOptionData();
      this.getOneData();
      this.uploadUrl=`${this.$http.defaults.baseURL}/business/operation/image/upload`;
      this.uploadHeaders.gTicket=this.gTicket;
    }
  };
</script>
<style lang="less" scoped>
  .contract-receipts {
    .footer-btn {
      width: 342px;
      text-align: right;
    }
  }

  .unit-div {
    margin-top: 30px;
    text-align: right;
  }
</style>
<style lang="less">
  .add-advertise {
    .main-title {
      width: 80%;
      height: 28px;
      line-height: 28px;
      font-size: 16px;
      color: #444444;
      font-weight: bold;
      text-align: center;
      margin-bottom: 30px;
      .back-btn {
        display: inline-block;
        width: 27px;
        height: 27px;
        line-height: 27px;
        border: 1px solid #EBEBEB;
        border-radius: 50%;
        color: #EBEBEB;
        cursor: pointer;
        font-weight: bold;
        float: left;
      }
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 100%;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .area-size {
      .el-form-item__content {
        width: 200px;
        vertical-align: middle;
        .el-form-item__error{
          width: 250px;
        }
      }
    }
    .unit {
      display: inline-block;
      margin-top: 10px;
    }
    .advertise-introduce {
      width: 100%;
      .el-form-item__content {
        width: 80%;
      }
    }
    .save-btn {
      width: 80%;
      text-align: center;
      margin-top: 30px;
    }
  }
</style>
