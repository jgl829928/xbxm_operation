<template>
  <div class="g-add-device">
  	<el-form  class="c-search-form" :model="reqData" ref="reqData" :rules="rules" label-width="110px"
              label-position="right" :inline="true">
         <el-row :gutter="32">
        <el-col :span="11" :xs="24">
          <el-form-item label="所属商场" prop="marketCode">
       <select-market :reqData="reqData"></select-market>
 </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
      	<el-col :span="12">
          <el-form-item label="一级分类" prop="firstId">
              <el-select v-model="reqData.firstId" clearable placeholder="请选择"
              @change="changeSec">
                <el-option
                  v-for="(item, index) in categotyListFir"
                  :key="index"
                  :label="item.rankName"
                  :value="item.rankId"
                  >
                </el-option>
              </el-select>
          </el-form-item>
          <el-button class="btn-handle" @click="showAdd(0)">添加</el-button>
        </el-col>
        <el-col :span="12" class="u-margin-6">
          <el-form-item label="二级分类" prop="rankId" label-width="110px">
              <el-select v-model="reqData.rankId" placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in categotyListSec"
                  :key="index"
                  :label="item.rankName"
                  :value="item.rankId">
                </el-option>
              </el-select>
          </el-form-item>
          <el-button class="btn-handle" @click="showAdd(1)">添加</el-button>
        </el-col>
      </el-row>
       <el-row :gutter="32">
        <el-col :span="12" :xs="24">
          <el-form-item label='设备名称' prop="equipmentName">
            <el-input clearable v-model.trim="reqData.equipmentName"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="11" class="u-margin-6">
          <el-form-item label="运行状态" prop="runStatus">
              <el-select v-model="reqData.runStatus" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in deviceStatus"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="32">
        <el-col :span="12" :xs="24">
          <el-form-item label='设备型号' prop="equipmentModel">
            <el-input clearable v-model.trim="reqData.equipmentModel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" class="u-margin-6">
          <el-form-item label="设备编号
" prop="equipmentCode">
            <el-input clearable v-model.trim="reqData.equipmentCode" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
      	<el-col :span="12" :xs="24">
          <el-form-item label="安装位置
" prop="location">
            <el-input clearable v-model.trim="reqData.location"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
      	<el-col :span="12" :xs="24">
          <el-form-item label="设备检验标识
" prop="skuCode" >

            <el-upload
  class="upload-demo"
  :action="$http.defaults.baseURL+uploadUrl"
  :before-remove="beforeRemove"
  multiple
  :limit="10"
  :on-exceed="handleExceed"
  :on-success="handleList"
  :file-list="fileList"
   :headers="{gTicket:gTicket}"
  :on-remove="handleRemove"
  :before-upload="beforeLogoUpload">
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
 <el-dialog title="分类-添加" :visible.sync="dialogFormVisibleFir" class="s-dialog" @close="reset">
  <el-form :model="form" :rules="dialogRules" ref="form" label-width="80px">
    <el-form-item label="一级分类" prop="parentId" v-if="secFormShow">
              <el-select v-model="form.parentId" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in categotyListFir"
                  :key="index"
                  :label="item.rankName"
                  :value="item.rankId"
                  >
                </el-option>
              </el-select>
    </el-form-item>
    <el-form-item label="名称"  prop="rankName">
      <el-input v-model.trim="form.rankName" auto-complete="off" clearable></el-input>
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
import ApiSettingCom from "@/api/apiSetting";
import ApiSetting from "@/api/basicApi-estateApi";
import { keysFilter, getCookie } from "@/utils/auth";
import selectMarket from '@/components/selectMarket'
export default {
  name:'addDevice',
  data() {
    return {
      checkEdit: "",
      dialogFormVisibleFir: false,
      reqData: {
        equipmentCode: "",
        marketCode: "",
        equipmentModel: "",
        equipmentId: "",
        equipmentName: "",
        location: "",
        rankId: "",
        runStatus: "",
        firstId: ""
      },
      categotyListFir: [],
      uploadUrl: ApiSetting.imageUpload,
      categotyListSec: [],
      deviceStatus: [
        { value: 0, label: "正常运行中" },
        { value: 1, label: "故障维修中" },
        { value: 2, label: "停止运行" },
        { value: 3, label: "报废" }
      ],
      rules: {
        marketCode: [
          { required: true, message: "请选择商场", trigger: "change" }
        ],
        firstId: [{ required: true, message: "请选择分类", trigger: "change" }],
        equipmentName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
          { max: 30, message: "最多输入30个字", trigger: "blur" }
        ],
        equipmentModel: [
          { required: true, message: "请输入设备型号", trigger: "blur" },
          { max: 30, message: "最多输入30个字", trigger: "blur" }
        ],
        runStatus: [
          { required: true, message: "请选择运行状态", trigger: "blur" }
        ],
        equipmentCode: [
          { required: true, message: "请选择设备编号", trigger: "blur" },
          { max: 50, message: "最多输入50个字", trigger: "blur" }
        ],
        location: [
          {
            max: 50,
            message: "最多输入50个字",
            trigger: "blur"
          }
        ]
      },

      form: {
        parentId: "",
        rankName: ""
      },
      fileList: [],
      secFormShow: false,
      dialogRules: {
        rankName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { max: 20, message: "最多输入20个字", trigger: "blur" }
        ],
        parentId: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      marketSearch: [],
      role: false
    };
  },
  components:{selectMarket},
  created() {
    this.handleCategory("-1", "categotyListFir");
  },
  computed: {
    gTicket: function() {
      return this.$store.state.gTicket;
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handleList(res, file, fileList) {
      if (res && res.code == 0 && res.data) {
        this.fileList.push(res.data);
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + this.fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
    //显示添加分类
    showAdd(index) {
      this.dialogFormVisibleFir = true;
      if (index == 0) {
        this.secFormShow = false;
      } else {
        this.secFormShow = true;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let reqData = keysFilter(this.reqData, true, ["firstId", "rankId"]);
          if (this.reqData.rankId == "") {
            this.reqData.rankId = this.reqData.firstId;
          }

          let imgArr = [];
          if (this.fileList.length != 0) {
            this.fileList.forEach(item => {
              let imgUrl = {};
              imgUrl["name"] = item["name"];
              imgUrl["url"] = item["url"];
              if (imgArr.indexOf(item) == -1) {
                imgArr.push(imgUrl);
              }
            });
          }
          let data = {
            ...reqData,
            imageUrl: imgArr,
            rankId: this.reqData.rankId
          };
            this.handleSave("post", data);
        } else {
          return false;
        }
      });
    },
    //保存的函数
    handleSave(method, data) {
      this.$http({
        url: ApiSetting.estateDevice,
        method: method,
        data: data
      }).then(res => {
        if (res) {
            this.$message.success(res.msg);
            this.$router.push({ name: "device" });
            this.$store.commit("delete_tabs", this.$route);
        }
      });
    },
    //添加分类
    firCategoryAdd(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$http
            .post(ApiSettingCom.deviceCategory, {
              ...this.form
            })
            .then(res => {
              if (res) {
                if (res.code == 0) {
                  this.$message.success(res.msg);
                  this.handleCategory("", "categotyListFir");
                 this.changeSec()
                  this.dialogFormVisibleFir = false;
                } else {
                  return this.$message.error(res.msg);
                }
              }
            });
        } else {
        }
      });
    },
    //删除分类
    reset() {
      this.dialogFormVisibleFir = false;
      this.$refs["form"].resetFields();
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //联动
    handleCategory(val, list) {
      this.$http({
        url: ApiSettingCom.deviceCategory,
        method: "get",
        params: { parentId: val },
        showLoading: false
      }).then(res => {
        if (res) {
          if (res.code == 0) {
            if (res.data.length > 0) {
              this[list] = res.data;
              if(list == 'categotyListSec'){
               this.reqData.rankId = res.data[0].rankId;
              }
            } else {
              this[list] = [];
              this.reqData.rankId = "";
            }
          }
        }
      });
    },
    changeSec() {
      if(this.reqData.firstId != ""){
        this.handleCategory(this.reqData.firstId, "categotyListSec");
      }else{
        this.categotyListSec = []
        this.reqData.rankId = "";
      }
    }
  }
};
</script>
<style scoped lang="less">
.g-add-device {
  padding: 50px;
  padding-right: 20px;
  .btn-handle {
    background: #ff7623;
    color: #fff;
    border: none;
    margin-top: 5px;
    margin-left: 4px;
  }
  .u-margin-6 {
    text-align: left;
  }
  .btn-80 {
    line-height: 31px;
  }
}
</style>
<style lang="less">
.g-add-device {
  .el-col-offset-16 {
    margin-left: 35%;
    margin-top: 60px;
  }
  .c-search-form .el-form-item__content {
    text-align: left;
  }
}
</style>

