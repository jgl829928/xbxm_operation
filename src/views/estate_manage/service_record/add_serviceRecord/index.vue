<template>
  <div class="contract-receipts add-service">
    <el-form :model="reqData" :rules="rules" ref="repaireForm" label-width="140px" label-position="right" :inline="true">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="商场名称" prop="marketCode">
            <el-select v-model="reqData.marketCode" clearable placeholder="请选择" :disabled="role">
              <el-option v-for="(item, index) in marketList" :key="index" :label="item.marketName" :value="item.marketCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备所属" prop="equipmentOwner">
            <el-select v-model="reqData.equipmentOwner" clearable placeholder="请选择">
              <el-option label="商场" value=0></el-option>
              <el-option label="商户" value=1></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="维修类别" prop="typeName">
            <el-select v-model="reqData.typeName" clearable placeholder="请选择">
              <el-option v-for="(item, index) in typeList" :key="index" :label="item" :value="item">
              </el-option>
              <div>
                  <el-input v-model.trim="typeName" v-if="show_input" placeholder="请输入类别名称"></el-input>
                </div>
                <div class="select_add">
                  <div v-if="!show_input">
                    <i class="el-icon-circle-plus-outline" @click="add_type"></i>
                    <span @click="add_type">添加</span>
                  </div>
                  <div v-else>
                    <span @click="save_addType">保存</span>
                    <span @click="add_type" class="cancel_btn">取消</span>
                  </div>
                </div>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="工程项目" prop="projectName">
            <el-input clearable v-model.trim="reqData.projectName" placeholder="项目报备名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="施工时间" prop="time">
            <el-date-picker v-model="reqData.time" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="年/月/日"
              end-placeholder="年/月/日" align="right" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="维护费用" prop="repairCost">
            <el-input clearable v-model.trim="reqData.repairCost" @blur="repairCost_valid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="施工方" prop="repairCompany">
            <el-input clearable v-model.trim="reqData.repairCompany" placeholder="公司/个人"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="联系人" prop="repairName">
            <el-input clearable v-model.trim="reqData.repairName" placeholder="姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系方式" prop="repairPhone">
            <el-input clearable v-model.trim="reqData.repairPhone" placeholder="手机号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="24">
          <el-form-item label="维修内容" class="otherInfo" prop="repairExplain">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model.trim="reqData.repairExplain	">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="立项报告" prop="projectReport">
            <el-upload class="upload-demo" ref="upload" :action="$http.defaults.baseURL+'/business/property/resource'" :on-preview="handlePreview"
              :headers="{gTicket:gTicket}"
              :on-remove="handleRemove('projectReport')" :file-list="reqData.projectReport" :on-success="upLoadPic('projectReport')">
              <el-button slot="trigger" size="small" type="primary" class="btn-80 btn-upload">浏 览</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="验收记录" prop="checkRecord">
            <el-upload class="upload-demo" ref="upload" :action="$http.defaults.baseURL+'/business/property/resource'" :on-preview="handlePreview"
              :headers="{gTicket:gTicket}"
              :on-remove="handleRemove('checkRecord')" :file-list="reqData.checkRecord" :on-success="upLoadPic('checkRecord')">
              <el-button slot="trigger" size="small" type="primary" class="btn-80 btn-upload">浏 览</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="比价记录" prop="comparisonRecord">
            <el-upload class="upload-demo" ref="upload" :action="$http.defaults.baseURL+'/business/property/resource'" :on-preview="handlePreview"
              :headers="{gTicket:gTicket}"
              :on-remove="handleRemove('comparisonRecord')" :file-list="reqData.comparisonRecord" :on-success="upLoadPic('comparisonRecord')">
              <el-button slot="trigger" size="small" type="primary" class="btn-80 btn-upload">浏 览</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现场照片" prop="scenePictures">
            <el-upload class="upload-demo" ref="upload" :action="$http.defaults.baseURL+'/business/property/resource'" :on-preview="handlePreview"
              :headers="{gTicket:gTicket}"
              :on-remove="handleRemove('scenePictures')" :file-list="reqData.scenePictures" :on-success="upLoadPic('scenePictures')">
              <el-button slot="trigger" size="small" type="primary" class="btn-80 btn-upload">浏 览</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="合同" prop="repairContract">
            <el-upload class="upload-demo" ref="upload" :action="$http.defaults.baseURL+'/business/property/resource'" :on-preview="handlePreview"
              :headers="{gTicket:gTicket}"
              :on-remove="handleRemove('repairContract')" :file-list="reqData.repairContract" :on-success="upLoadPic('repairContract')">
              <el-button slot="trigger" size="small" type="primary" class="btn-80 btn-upload">浏 览</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收据" prop="repairReceipt">
            <el-upload class="upload-demo" ref="upload" :action="$http.defaults.baseURL+'/business/property/resource'" :on-preview="handlePreview"
              :headers="{gTicket:gTicket}"
              :on-remove="handleRemove('repairReceipt')" :file-list="reqData.repairReceipt" :on-success="upLoadPic('repairReceipt')">
              <el-button slot="trigger" size="small" type="primary" class="btn-80 btn-upload">浏 览</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <div class="save-div">
            <el-button class="btn-save-big" @click="submitForm('repaireForm')">提 交
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getCookie,clean_data } from "../../../../utils/auth.js";
import ApiSetting from "../../../../api/estate-inspection";
import selectMarket from "../../_/selectMarket";
export default {
  name:"addServiceRecord",
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      marketList: [],
      typeList: [" "],
      show_input: false,
      typeName: "",
      gTicket: "",
      reqData: {
        time: [],
        marketCode: "",
        equipmentOwner: "",
        typeName: "",
        projectName: "",
        repairStartDate: "",
        repairEndDate: "",
        repairCost: "0.00",
        repairCompany: "",
        repairName: "",
        repairPhone: "",
        repairExplain: "",
        projectReport: [],
        checkRecord: [],
        comparisonRecord: [],
        scenePictures: [],
        repairContract: [],
        repairReceipt: []
      },
      rules: {
        marketCode: [
          { required: true, message: "请选择商场", trigger: "blur" }
        ],
        equipmentOwner: [
          { required: true, message: "请选择设备所属", trigger: "blur" }
        ],
        typeName: [
          { required: true, message: "请选择维护类别", trigger: "change" }
        ],
        projectName: [
          { required: true, message: "请输入工程项目", trigger: "blur" },
          { max: 30, message: "工程项目不能多于30个字符", trigger: "blur" }
        ],
        time: [{ required: true, message: "请选择施工时间", trigger: "blur" }],
        repairCost: [
          { required: true, message: "请输入维护费用", trigger: "blur" },
          {pattern:/^\d+(\.\d{1,2})?$/, message: "请输入正确的金额(小数不可超过两位)", trigger: 'blur'},
        ],
        repairCompany: [
          { max: 30, message: "施工方不能多于30个字符", trigger: "blur" }
        ],
        repairName: [
          { max: 20, message: "联系人不能多于20个字符", trigger: "blur" }
        ],
        repairPhone: [
          { required: false, trigger: "blur" },
           {pattern:/^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'},
        ],
        repairExplain: [
          { max: 120, message: "维修内容不能多于120个字符", trigger: "blur" }
        ]
      },
      fileList: [],
      role: false
    };
  },
  components: { selectMarket },
  computed: {
    currentUser: function() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    // 获取维修类别
    getTypeList() {
      this.$http.get(ApiSetting.repairType).then(res => {
        if (res && res.code == 0) {
          this.typeList = res.data;
          if (this.typeList.length == 0) {
            this.typeList = [" "];
          }
        } else {
          this.typeList = [" "];
        }
      });
    },
    //判断当前用户权限
    judegRole() {
      if (this.currentUser.affiliation === 2) {
        this.reqData.marketCode = this.currentUser.marketCode;
        this.role = true;
      } else {
        this.role = false;
      }
    },
    // 获取商场列表
    getMarketList() {
      this.$http.get(ApiSetting.marketList).then(res => {
        if (res && res.code == 0 && res.data) {
          this.marketList = res.data;
        } else {
          this.marketList = [];
        }
      });
    },
    repairCost_valid() {
      if (this.reqData.repairCost) {
        if (isNaN(this.reqData.repairCost)) {
          this.reqData.repairCost = "0.00";
        }
      }
    },
    // 点击添加维修类型
    add_type() {
      this.show_input = !this.show_input;
      this.typeName = "";
    },
    // 保存维修类型
    save_addType() {
      this.typeName = this.typeName.replace(/(^\s*)|(\s*$)/g, "");
      if (this.typeName) {
        this.$http
          .post(ApiSetting.repairType, { typeName: this.typeName })
          .then(res => {
            if (res && res.code == 0) {
              this.show_input = !this.show_input;
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.getTypeList();
            }
          });
      } else {
        this.$message.error("请输入内容");
      }
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.reqData.equipmentOwner =
            this.reqData.equipmentOwner == "商场" ? 0 : 1;
          let data = Object.assign({}, this.reqData);
          data.repairStartDate = data.time ? data.time[0] : "";
          data.repairEndDate = data.time ? data.time[1] : "";
          delete data.time;
          this.$http.post(ApiSetting.operate_repair, data).then(res => {
            if (res && res.code == 0) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.$store.commit("delete_tabs", this.$route);
              this.$router.push("/estate/seviceRecord");
            }
          });
        } else {
          return false;
        }
      });
    },

    submitUpload() {
      this.$refs.upload.submit();
    },

    // 图片上传成功
    upLoadPic(name) {
      return (res, file, fileList) => {
        this.reqData[name].push(res.data);
      };
    },
    handleRemove(name) {
      return (res, file, fileList) => {
        let file_list = this.reqData[name];
        file_list.forEach((item, index) => {
          if (file_list[index].url == res.url) {
            file_list.splice(index, 1);
          }
        });
      };
    },
    handlePreview(file) {
      // console.log(file);
    },
    marketData(data) {
      this.reqData.marketCode = data;
    }
  },
  created() {
    this.gTicket = this.$store.state.gTicket;
    // 角色判断
    this.judegRole();
    // 获取维修类别
    this.getTypeList();
    // 获取商场列表
    this.getMarketList();
  },
  
};
</script>
<style lang="less" scoped>
.contract-receipts {
  .footer-btn {
    width: 342px;
    text-align: right;
  }
  .save-div {
    width: 100%;
    text-align: center;
  }
}

.unit-div {
  margin-top: 30px;
  text-align: right;
}

.select_add {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #1989fa;
  font-size: 14px;
}

.cancel_btn {
  color: #666;
}
</style>
<style lang="less">
.add-service {
  .el-date-editor.el-input {
    width: 200px;
  }
  .brand-wrap {
    .brand {
      padding: 0 !important;
      line-height: 40px;
      text-align: right;
    }
    .el-col-7 {
      text-align: left;
    }
  }
  .otherInfo {
    width: 100%;
    .el-form-item__content {
      width: 400px;
    }
  }
  .el-date-editor--daterange.el-input__inner {
    width: 300px;
  }
}
</style>