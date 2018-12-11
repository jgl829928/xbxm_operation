<template>
	<div class="p-login">
		<div class="m-left-bg">
		</div>
		<div class="m-right-form">
      
      <div class="u-inside">
        <div class="u-logo">
          <img src="../../assets/images/login-logo.png">
        </div>
        <div class="m-line"></div>
        <div class="m-form-title">
          优选运营管理系统
        </div>
        <div class="m-form-input">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" @keyup.enter.native="submitForm('ruleForm')">
            <el-form-item  prop="username">
              <el-input v-model.trim="ruleForm.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item  prop="password">
              <el-input @change="hintError.hintMsg = '', hintError.inputName = ''" :class="hintError.inputName" type="password" v-model.trim="ruleForm.password" placeholder="密码"></el-input>
              <p class="hint-error">{{hintError.hintMsg}}</p>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
				
		</div>
	</div>
</template>

<script>
  import ApiSetting from "@/api/access-manage";
  import {getCookie, getUser} from "@/utils/auth";
  import axios from "axios";
  import router from '@/routes'

  export default {
    data() {
      return {
        hintError: {
          inputName: '',
          hintMsg: '',
        },
        ruleForm: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            {required: true, message: "用户名不能为空", trigger: "blur"}
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: "blur"},
            {max: 18, message: "密码长度为6-18位", trigger: "blur"},
            {min: 6, message: "密码长度为6-18位", trigger: "blur"},
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$http.post(ApiSetting.login, {...this.ruleForm}).then(res => {
              if (res && res.code == 0 && res.data) {
                if(res.data.user.affiliation){
                  this.$message.success(res.msg);
                  let userInfo = {};
                   userInfo.affiliation = res.data.user.affiliation.code;
                userInfo.userId = res.data.user.empId;
                userInfo.marketCode = res.data.user.marketCode || null;
                userInfo.marketName = res.data.user.marketName || null;
                userInfo.employeeName = res.data.user.employeeName || null;

                this.$store.dispatch("setUser", userInfo);
                this.$store.dispatch("setgTicket", res.data.gTicket);
                this.$router.push("/index");
                this.$store.commit("delete_allTab");
                this.$store.commit("add_tabs", {
                  route: "/index",
                  name: "首页"
                });
                this.$store.commit("set_active_index", "首页");
                }else{
                  this.hintError.inputName = 'error'
                  this.hintError.hintMsg = '账号或密码错误，请重试'
                }
              } else {
                this.hintError.inputName = 'error'
                this.hintError.hintMsg = res.msg || '网络不可用，请重试'
              }
            })
          }
        });
      },
    }
  };
</script>
<style scoped lang="less">
  @import "./index.less";
</style>

<style lang="less">
  @import "./index-element.less";
</style>
