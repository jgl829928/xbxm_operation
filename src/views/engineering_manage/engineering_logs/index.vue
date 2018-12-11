<template>
  <div class="contract-receipts g-engineer-main">
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true" label-position="right">
      <el-row >
        <el-col :span="8" :xs="24">
          <el-form-item label="工程名称" prop="engineeringName" min-width="120">
            <el-input clearable v-model.trim="reqData.engineeringName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label="添加人" prop="creater">
            <el-input clearable v-model.trim="reqData.creater"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="12">
          <el-form-item label="跟进起止时间" prop="time">
            <el-date-picker v-model="time" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="年/月/日"
              :default-time="['00:00:00', '23:59:59']" end-placeholder="年/月/日" align="right" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-button class="btn-search btn-add" v-show="$store.getters.getPermission('engineeringLog_2')" type="primary" @click="add">添加</el-button>
    </div>
    <div class="c-table-wrap">
      <el-table :data="itemList" style="width: 100%" align="center" stripe height="500">
        <el-table-column align="center" type="index" label="序号" width="50" :index="indexMethod">
        </el-table-column>
        <el-table-column align="center" prop="engineeringName" label="工程名称">
        </el-table-column>
        <el-table-column align="center" prop="market" label="商场名称">
        </el-table-column>
        <el-table-column align="center" prop="followDate" label="跟进日期">
        </el-table-column>
        <el-table-column align="center" prop="completePercent" label="完成百分比">
        </el-table-column>
        <el-table-column align="center" prop="description" label="工程进度描述">
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="登记日期">
        </el-table-column>
        <el-table-column align="center" prop="creater" label="登记人">
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <pagenation :pageparams="pageparams" :itemList="itemList" @handlePage="handlePage"></pagenation>
    </div>

    <el-dialog title="工程日志-添加" :visible.sync="dialogFormVisible" class="m-dialog log_dialog">
      <el-form class="c-search-form" :model="add_data" ref="add_form" :rules="rules" label-width="110px" :inline="true" label-position="right">
        <el-row :gutter="32">
          <el-col :span="24">
            <el-form-item label="工程名称" prop="engineeringName">
              <el-select v-model="add_data.engineeringName" clearable placeholder="请选择">
                <el-option v-for="(item, index) in engNameList" :key="index" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="24">
            <el-form-item label="跟进日期" prop="followDate">
              <el-date-picker v-model="add_data.followDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="24">
            <el-form-item label="完成百分比" prop="completePercent">
              <el-input clearable v-model.trim="add_data.completePercent" @blur="percent_valid"></el-input>
            </el-form-item>
            <span class="u-special-unit">%</span>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="24">
            <el-form-item label="工程进度描述" prop="description" class="u-special-textarea">
              <el-input type="textarea" clearable v-model.trim="add_data.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-save" type="primary" @click="save">保存</el-button>
        <el-button class="btn-reset" type="primary" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ApiSetting from "../../../api/engineering";
  import pagenation from "@/components/pagenation";
  export default {
    data() {
      return {
        rules: {},
        dialogFormVisible: false,
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
        pageparams: {},
        time: [],
        reqData: {
          creater: "",
          followEndDate: "",
          followStartDate: "",
          engineeringName: "",
          pageSize: 20,
          currentPage: 1
        },
        itemList: [],
        // 工程名称
        engNameList: [],
        // 添加表单数据
        add_data: {
          completePercent: 0,
          description: "",
          engineeringName: "",
          followDate: ""
        },
        rules: {
          engineeringName: [
            { required: true, message: "请选择工程名称", trigger: "blur" }
          ],
          description: [
            { required: false, trigger: "blur" },
            {
              max: 100,
              message: "工程进度描述不能多于100个字符",
              trigger: "blur"
            }
          ],
          completePercent: [
            { required: true, message: "请输入工程进度", trigger: "blur" },
            {pattern:/(^[1-9][0-9]$|^[0-9]$|^100$)/, message: '请输入正确的工程进度', trigger: 'blur'},
          ],
          followDate: [
            { required: true, message: "请选择跟进日期", trigger: "blur" }
          ]
        }
      };
    },
    components: { pagenation },
    name: "engineeringLogs",
    methods: {
      // 完成百分比校验
      percent_valid() {
        if (this.add_data.completePercent) {
          if (isNaN(this.add_data.completePercent)) {
            this.add_data.completePercent = "0";
          } else {
            this.add_data.completePercent = parseInt(
              this.add_data.completePercent
            );
          }
        }
      },
      indexMethod(index) {
        return (this.reqData.currentPage - 1) * 20 + index + 1;
      },
      // 获取工程名称
      getEngName() {
        this.$http.get(ApiSetting.engName, { params: this.reqData }).then(res => {
          if (res && res.code == 0 && res.data) {
            this.engNameList = res.data;
          } else {
            this.engNameList = [];
          }
        });
      },

      // 获取列表数据
      getListData() {
        this.$http.get(ApiSetting.logList, { params: this.reqData }).then(res => {
          if (res && res.code == 0 && res.data) {
            this.itemList = res.data;
            this.pageparams = res.page;
          } else {
            this.itemList = [];
          }
        });
      },
      search() {
        this.reqData.currentPage = 1;
        this.reqData.followStartDate = this.time ? this.time[0] : "";
        this.reqData.followEndDate = this.time ? this.time[1] : "";
        this.getListData();
      },
      // 翻页
      handlePage(val) {
        this.reqData.currentPage = val;
        this.getListData();
      },
      // 添加弹窗
      add() {
        this.dialogFormVisible = true;
        setTimeout(() => {
          this.$refs["add_form"].resetFields();
        }, 50);
      },
      // 保存
      save() {
        this.$refs["add_form"].validate(valid => {
          if (valid) {
            this.$http.post(ApiSetting.addLog, this.add_data).then(res => {
              if (res && res.code == 0) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.dialogFormVisible = false;
                this.getListData();
              }
            });
          }
        });
      },
      cancel() {
        this.dialogFormVisible = false;
      }
    },
    created() {
      // 获取列表信息
      this.getListData();
      this.getEngName();
    }
  };
</script>
<style scoped lang="less">
  .g-engineer-main {
    .u-add-btn {
      margin-left: 20px;
    }
    .u-special-unit {
      display: inline-block;
      margin-top: 10px;
    }
    
  }
</style>
<style lang="less">
  .u-special-textarea .el-form-item__content {
    width: 300px;
  }
  .g-engineer-main {
    .el-range-editor .el-range-input{
      line-height:30px;
    }
  }
  .log_dialog {
    .el-date-editor .el-input__inner {
      width: 170px !important;
    }
    .el-textarea__inner{
      width:300px  !important;
    }
  }
</style>