<template>
    <div>
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                <img src="../../assets/images/logo.png" alt="" @click="toindex">
            </el-col>
            <el-col :span="10">
                <div class="tools item_title">
                    优选运营管理系统
                </div>
            </el-col>
            <el-col :span="4" class="userinfo" >
                <img src="../../assets/images/userimg.png" />
                <el-dropdown @command="handleCommand"  trigger="click">
                  <div @click="getUserInfo">
                    <span class="el-dropdown-link">
                        {{employeeName}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    </div>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item command="a">个人信息</el-dropdown-item>
                        <el-dropdown-item command="b">修改密码</el-dropdown-item>
                        <el-dropdown-item command="c">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <!-- 个人信息弹窗 -->
        <el-dialog title="个人信息" :visible.sync="dialogFormVisible" class="s-dialog userInfo_dialog" :modal="false">
            <el-row :gutter="32">
                <el-col :span="8">
                    <label>用户名</label>
                </el-col>
                <el-col :span="12">
                    <span>{{userInfo.username}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="32">
                <el-col :span="8">
                    <label>姓名</label>
                </el-col>
                <el-col :span="12">
                    <span>{{userInfo.employeeName}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="32">
                <el-col :span="8">
                    <label>职位</label>
                </el-col>
                <el-col :span="12">
                    <span>{{userInfo.position}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="32">
                <el-col :span="8">
                    <label>所在商场</label>
                </el-col>
                <el-col :span="12">
                    <span>{{userInfo.marketName}}</span>
                </el-col>
            </el-row>
            <el-row :gutter="32">
                <el-col :span="8">
                    <label>部门</label>
                </el-col>
                <el-col :span="12">
                    <span>{{userInfo.department}}</span>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" class="btn-reset" type="primary">关 闭</el-button>
            </div>
        </el-dialog>

        <!-- 修改密码弹窗 -->
        <el-dialog title="个人信息" :visible.sync="changePwd_dialog" class="s-dialog" :modal="false">
            <el-form :model="pwd_data" :rules="change_rules" ref="change_form">
                <el-form-item label="原密码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="pwd_data.password" auto-complete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPwd">
                    <el-input v-model="pwd_data.newPwd" auto-complete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth" prop="verifyPwd">
                    <el-input v-model="pwd_data.verifyPwd" auto-complete="off" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="btn-save" type="primary" @click="save">保存</el-button>
                <el-button @click="changePwd_dialog = false" class="btn-reset">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import ApiSetting from "../../api/access-manage";
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pwd_data.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      collapsed: false,
      dialogFormVisible: false,
      changePwd_dialog: false,
      pwd_data: {
        password: "",
        newPwd: "",
        verifyPwd: ""
      },
      employeeName:"",
      formLabelWidth: "80px",
      change_rules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        newPwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            validator: function(rule, value, callback) {
              if (value) {
                if (
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(value) ==
                  false
                ) {
                  callback(new Error("请输入6-18数字及字母"));
                } else {
                  callback();
                }
              }
            },
            trigger: "blur"
          }
        ],
        verifyPwd: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      },
      userInfo: {}
    };
  },
  methods: {
    toindex() {
      this.$router.push({ path: "/" });
    },

    // 获取用户详细信息
    getUserInfo() {
      this.$http({
        method: "get",
        url: ApiSetting.userInfo,
        showLoading: false
      }).then(res => {
        if (res) {
          if(res.data){
            this.userInfo = res.data;
          }
        }
      });
    },
    //获取用户信息
    getUserInfo1() {
      this.$http({
        method: "get",
        url: ApiSetting.userInfo,
        showLoading: false
      }).then(res => {
        if (res) {
          if(res.data){

          }else{
            if(this.timerId) clearInterval(this.timerId);
            this.$message.error('该账号已在其他设备登录');
            this.$router.push({name:'login'})
          }
        }
      });
    },
    // 点击下拉框
    handleCommand(command) {
      switch (command) {
        case "a":
          this.dialogFormVisible = true;
          break;
        case "b":
          this.changePwd_dialog = true;
          this.$refs["change_form"].resetFields();
          break;
        case "c":
          this.login_out();
          break;
        default:
          break;
      }
    },
    // 保存
    save() {
      this.$refs["change_form"].validate(valid => {
        if (valid) {
          let changePwd = `${ApiSetting.change_pwd}/${this.userInfo.empId}/pwd`;
          let change_data = Object.assign({}, this.pwd_data);
          change_data.username = this.userInfo.username;
          delete change_data.verifyPwd;
          this.$http.patch(changePwd, change_data).then(res => {
            if (res && res.code == 0) {
              this.$message({
                message: "保存成功,请使用新密码重新登录",
                type: "success"
              });
              this.$router.push("/login");
            }
          });
        } else {
          return false;
        }
      });
    },
    // 退出登录
    login_out() {
      this.$confirm("确定要退出本次登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http.delete(ApiSetting.loginOut).then(res => {
          if (res) {
            if(this.timerId) clearInterval(this.timerId);
            this.$store.dispatch("setgTicket", null);
            this.$router.push("/login");
          }
        })
      })
    }
  },
  created() {
    this.timerId = setInterval(()=> {
      this.getUserInfo1()
    },10000);
    if(this.$store.state.currentUser.employeeName){
        this.employeeName=this.$store.state.currentUser.employeeName
    } 
  }
};
</script>
<style lang='less'>
@import url("./index-element.less");
</style>
<style lang="less" scoped>
@import url("./index.less");
</style>
