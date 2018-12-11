<template>
  <div class="contract-receipts add-content">
    <div class="main-title">
      <!--<span class="el-icon-back back-btn" @click="$router.go(-1)"></span>-->
      添加内容</div>
    <br>
    <el-form class="c-search-form" :rules="rules" :model="ruleForm" ref="ruleForm" label-width="102px" :inline="true"
             label-position="right">
      <div>
        <el-form-item label="文章标题" prop="title">
          <el-input clearable v-model.trim="ruleForm.title"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="副标题" class="second-title" prop="subtitle">
          <el-input clearable v-model.trim="ruleForm.subtitle"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="发布渠道" prop="releaseChannelList" class="second-title">
          <el-select v-model.trim="ruleForm.releaseChannelList" multiple placeholder="请选择">
            <el-option v-for="item in channels" :key="item.code" :label="item.desc" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-button disabled class="btn-search" type="primary">浏览</el-button>-->
      </div>
      <div>
        <el-form-item label="封面图" prop="coverImageUrl">
          <el-upload
            class="avatar-uploader"
            :headers="uploadHeaders"
            :action="uploadUrl"
            accept="image/jpg,image/jpeg,image/png,image/bmp,image/gif"
            :show-file-list="false"
            :before-upload="beforeImgUpload"
            :on-success="coverImageUpload">
            <img v-if="ruleForm.coverImageUrl" :src="ruleForm.coverImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="作者" prop="author" class="author">
          <el-input clearable v-model.trim="ruleForm.author"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="摘要" prop="contentAbstract">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            clearable
            v-model.trim="ruleForm.contentAbstract"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="正文类型" prop="contentType">
          <el-radio-group v-model.trim="ruleForm.contentType">
            <el-radio label="1">链接</el-radio>
            <el-radio label="2">图文</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div v-if="ruleForm.contentType==='1'">
        <el-form-item label="文章链接" prop="link">
          <el-input clearable v-model.trim="ruleForm.link"></el-input>
        </el-form-item>
      </div>
      <div class="editor-container-wrap" v-else>
        <Tinymce :height=400 ref="editor" v-model.trim="ruleForm.content"/>
      </div>
      <div class="save-btn">
        <el-button class="btn-save-big" type="primary" icon="el-icon-save" @click="submitForm('ruleForm')">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import api from '@/api/operation-manage';
  import Tinymce from '../component/Tinymce';
  import { mapState } from 'vuex'
  export default {
    name:'addContent',

    computed:{
      ...mapState(['gTicket'])
    },
    components: {Tinymce},
    data() {
      return {
        uploadUrl:'',
        uploadHeaders:{
          gTicket:''
        },
        channels:[
          {code:1,desc:'App首页'}
        ],
        rules: {
          title: [{required: true, message: '请输入文章标题', trigger: 'blur'},
            {min: 1, max: 30, message: '长度1-30 个字符', trigger: 'blur'}],
          subtitle: [{required: false,min: 1, max: 20, message: '长度1-20 个字符', trigger: 'blur'}],
          releaseChannelList: [{required: true, message: '请选择发布渠道', trigger: 'change'}],
          coverImageUrl: [{required: true, message: '请上传封面图', trigger: 'change'}],
          author: [{required: true, message: '请输入作者', trigger: 'blur'},
            {min: 1, max: 10, message: '长度1-10 个字符', trigger: 'blur'}],
          contentAbstract: [{required: true, message: '请输入摘要', trigger: 'blur'},
            {min: 1, max: 120, message: '长度1-120 个字符', trigger: 'blur'}],
          contentType: [{required: true, message: '请选择类型', trigger: 'change'}],
          link: [{required: true, message: '请输入链接', trigger: 'blur'}],
        },
        ruleForm: {
          title: '',
          subtitle: '',
          releaseChannelList: [1],
          coverImageUrl: '',
          author: '',
          contentAbstract: '',
          contentType: '1',
          link: '',
          content:''
        }
      }
    },
    methods: {
      beforeImgUpload(file) {
        const isLt5M = file.size / 1024 / 1024 <= 20;
        if (!isLt5M) {
          this.$message.error("上传头像图片大小不能超过20MB!");
        }
        return isLt5M;
      },
      coverImageUpload(res) {//封面图上传
        this.ruleForm.coverImageUrl= res.data;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           console.log(this.ruleForm);
           this.$http.post(api.addContent,this.ruleForm).then(res=>{
             if(res.code===0){
               this.$message.success(res.msg);
               this.$store.commit("delete_tabs", this.$route);
               this.$router.push({path:'/operation/content'})
             }else{
               this.$message.error(res.msg)
             }
           })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    beforeMount(){
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
  .add-content {
    .main-title {
      width: 60%;
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
    .c-search-form{
      .el-form-item__content{
        width: 580px;
      }
      .second-title .el-form-item__content{
        width: 477px;
      }
      .author .el-form-item__content{
        width: 200px;
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
        width: 170px;
        vertical-align: middle;
      }
    }
    .unit {
      display: inline-block;
      margin-top: 10px;
    }
    .save-btn {
      width: 60%;
      text-align: center;
    }
    .editor-container-wrap{
      min-height: 500px;
      width: 80%;
      margin: 15px 0 30px 102px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
    .mce-container, .mce-container-body{
      display: block;
    }
  }
</style>
