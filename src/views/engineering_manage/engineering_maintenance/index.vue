<template>
  <div class="contract-receipts">
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true" label-position="right">
      <el-row >
        <el-col :span="8" :xs="24">
          <el-form-item label="工程名称" prop="engineeringName">
            <el-input clearable v-model.trim="reqData.engineeringName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label="负责人" prop="charge">
            <el-input clearable v-model.trim="reqData.charge"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="12">
          <el-form-item label="工程起止日期" prop="time" class="search_time">
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
      <el-button class="btn-search btn-add" v-show="$store.getters.getPermission('engineeringMain_2')" type="primary" @click="add">添加</el-button>
    </div>
    <div class="c-table-wrap">
      <el-table :data="itemList" style="width: 100%" align="center" stripe height="500">
        <el-table-column align="center" type="index" label="序号" width="50" :index="indexMethod">
        </el-table-column>
        <el-table-column align="center" prop="engineeringName" label="工程名称" min-width="120">
        </el-table-column>
        <el-table-column align="center" prop="market" label="商场名称">
        </el-table-column>
        <el-table-column align="center" prop="name" label="工程起止日期" min-width="200">
          <template slot-scope="scope">
            <p>{{scope.row.startDate}}至{{scope.row.endDate}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="规划设计日期" min-width="200">
          <template slot-scope="scope">
            <p>{{scope.row.planStartDate}}至{{scope.row.planEndDate}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="supplier" label="装修时间" min-width="200">
          <template slot-scope="scope">
            <p>{{scope.row.decoStartDate}}至{{scope.row.decoEndDate}} </p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="budget" label="工程预算">
        </el-table-column>
        <el-table-column align="center" prop="charge" label="工程负责人" min-width="100">
        </el-table-column>
        <el-table-column align="center" prop="chargePhone" label="负责人电话" min-width="120">
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="登记日期" min-width="100">
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="200" fixed="right">
          <template slot-scope="scope">
            <el-button class="btn-handle" type="primary" v-show="$store.getters.getPermission('engineeringMain_3')" @click="edit_eng(scope.$index,scope.row)">
              修改
            </el-button>
            <el-button class="btn-handle" type="primary" v-show="$store.getters.getPermission('engineeringMain_4')" @click="delete_eng(scope.$index,scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <pagenation :pageparams="pageparams" :itemList="itemList" @handlePage="handlePage"></pagenation>
    </div>

    <el-dialog :title="dialog_title" :visible.sync="dialogFormVisible" class="l-dialog engineer_dialog" @close="clean_data">
      <el-form class="c-search-form" :model="add_data" :rules="rules" ref="add_form" label-width="120px" :inline="true" label-position="right">
        <el-row :gutter="32">
          <el-col :span="12" :xs="24">
            <el-form-item label="工程名称" prop="engineeringName">
              <el-input clearable v-model.trim="add_data.engineeringName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="工程预算" prop="budget">
              <el-input clearable v-model.trim="add_data.budget"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="12">
            <el-form-item label="工程负责人电话" prop="chargePhone">
              <el-input clearable v-model.trim="add_data.chargePhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工程负责人" prop="charge">
              <el-input clearable v-model.trim="add_data.charge"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="12">
            <el-form-item label="工程时间" prop="engineerTime">
              <el-date-picker v-model="add_data.engineerTime" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期"
                :default-time="['00:00:00', '23:59:59']" end-placeholder="结束日期" align="right" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="12">
            <el-form-item label="规划时间" prop="planTime">
              <el-date-picker v-model="add_data.planTime" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期"
                :default-time="['00:00:00', '23:59:59']" end-placeholder="结束日期" align="right" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="12">
            <el-form-item label="装修时间" prop="decoTime">
              <el-date-picker v-model="add_data.decoTime" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期"
                :default-time="['00:00:00', '23:59:59']" end-placeholder="结束日期" align="right" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="company_message">
          <p>装修公司信息</p>
        </div>
        <el-row :gutter="32">
          <el-col :span="12">
            <el-form-item label="公司名称" prop="company">
              <el-input clearable v-model.trim="add_data.company"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="contact">
              <el-input clearable v-model.trim="add_data.contact"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="12">
            <el-form-item label="联系方式(手机号)" prop="contactPhone">
              <el-input clearable v-model.trim="add_data.contactPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="address">
              <el-input clearable v-model.trim="add_data.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-save" type="primary" @click="save_data">保存</el-button>
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
        charge: "",
        startDate: "",
        endDate: "",
        engineeringName: "",
        pageSize: 20,
        currentPage: 1
      },
      itemList: [],

      dialog_title: "工程-添加",
      add_data: {
        decoTime: [],
        planTime: [],
        engineerTime: [],

        address: "",
        budget: "0.00",
        charge: "",
        chargePhone: "",
        company: "",
        contact: "",
        contactPhone: "",
        decoEndDate: "",
        decoStartDate: "",
        endDate: "",
        engineeringName: "",
        planEndDate: "",
        planStartDate: "",
        startDate: ""
      },
      rules: {
        engineeringName: [
          { required: true, message: "请输入工程名称", trigger: "blur" },
          { max: 50, message: "工程项目不能多于50个字符", trigger: "blur" }
        ],
        budget: [
          { required: true, message: "请输入工程预算", trigger: "blur" },

          {
            pattern: /^\d+(\.\d{1,2})?$/,
            message: "请输入正确的金额(两位小数)",
            trigger: "blur"
          }
        ],
        charge: [
          { required: true, message: "请输入工程负责人", trigger: "blur" },
          { max: 20, message: "工程负责人不能多于20个字符", trigger: "blur" }
        ],
        chargePhone: [
          { required: true, message: "请输入负责人电话", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        engineerTime: [
          { required: true, message: "请选择工程时间", trigger: "blur" }
        ],
        planTime: [
          { required: true, message: "请选择规划时间", trigger: "blur" }
        ],
        decoTime: [
          { required: true, message: "请选择装修时间", trigger: "blur" }
        ],

        address: [
          { required: false, trigger: "blur" },
          { max: 50, message: "公司地址不能多于30个字符", trigger: "blur" }
        ],
        company: [
          { required: false, trigger: "blur" },
          { max: 50, message: "公司名称不能多于30个字符", trigger: "blur" }
        ],
        contactPhone: [
          { required: false, trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        contact: [
          { required: false, trigger: "blur" },
          { max: 20, message: "公司联系人不能多于30个字符", trigger: "blur" }
        ]
      },
      editEngineeringId: ""
    };
  },
  components: { pagenation },
  name: "engineeringMain",
  methods: {
    indexMethod(index) {
      return (this.reqData.currentPage - 1) * 20 + index + 1;
    },
    // 获取列表数据
    getListData() {
      this.$http
        .get(ApiSetting.maintainList, { params: this.reqData })
        .then(res => {
          if (res && res.code == 0 && res.data) {
            this.itemList = res.data;
            this.pageparams = res.page;
          } else {
            this.itemList = [];
          }
        });
    },
    // 搜索
    search() {
      this.reqData.currentPage = 1;
      this.reqData.startDate = this.time ? this.time[0] : "";
      this.reqData.endDate = this.time ? this.time[1] : "";
      this.getListData();
    },
    // 翻页
    handlePage(val) {
      this.reqData.currentPage = val;
      this.getListData();
    },

    // 删除工程
    delete_eng(index, row) {
      this.$confirm("是否删除该工程?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let delete_engineer = `${ApiSetting.addmaintain}/${
            row.engineeringId
          }`;
          this.$http.delete(delete_engineer).then(res => {
            if (res && res.code == 0) {
              this.getListData();
              this.$message({
                message: "删除成功",
                type: "success"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 点击新增
    add() {
      this.dialog_title = "工程-添加";
      this.dialogFormVisible = true;
    },
    clean_data() {
      Object.assign(this.add_data, this.$options.data().add_data);
    },
    // 点击修改
    edit_eng(index, row) {
      this.dialogFormVisible = true;
      this.dialog_title = "工程-修改";
      this.editEngineeringId = row.engineeringId;
      let maintainInfo = `${ApiSetting.addmaintain}/${this.editEngineeringId}`;

      this.$http.get(maintainInfo).then(res => {
        if (res && res.code == 0 && res.data) {
          res.data.engineerTime = [];

          res.data.planTime = [];

          res.data.decoTime = [];

          res.data.engineerTime.push(res.data.startDate);
          res.data.engineerTime.push(res.data.endDate);

          res.data.planTime.push(res.data.planStartDate);
          res.data.planTime.push(res.data.planEndDate);

          res.data.decoTime.push(res.data.decoStartDate);
          res.data.decoTime.push(res.data.decoEndDate);
          Object.assign(this.add_data, res.data);
        }
      });
    },
    // 保存
    save_data() {
      this.$refs["add_form"].validate(valid => {
        if (valid) {
          let addData = Object.assign({}, this.add_data);
          addData.budget = Number(addData.budget).toFixed(2);
          addData.decoStartDate = addData.decoTime ? addData.decoTime[0] : "";
          addData.decoEndDate = addData.decoTime ? addData.decoTime[1] : "";

          addData.planStartDate = addData.planTime ? addData.planTime[0] : "";
          addData.planEndDate = addData.planTime ? addData.planTime[1] : "";

          addData.startDate = addData.engineerTime
            ? addData.engineerTime[0]
            : "";
          addData.endDate = addData.engineerTime ? addData.engineerTime[1] : "";

          delete addData.decoTime;
          delete addData.planTime;
          delete addData.engineerTime;
          if (this.dialog_title == "工程-添加") {
            this.$http.post(ApiSetting.addmaintain, addData).then(res => {
              if (res && res.code == 0) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.dialogFormVisible = false;
                this.getListData();
                this.$refs["add_form"].resetFields();
              }
            });
          } else {
            addData.engineeringId = this.editEngineeringId;
            this.$http.put(ApiSetting.addmaintain, addData).then(res => {
              if (res && res.code == 0) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.dialogFormVisible = false;
                this.getListData();
                this.$refs["add_form"].resetFields();
              }
            });
          }
        } else {
          return false;
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
  }
};
</script>
<style lang="less" scoped>
.u-add-btn {
  margin-left: 20px;
}

.company_message {
  width: 100%;
  height: 38px;
  background: #fff7f2;
  color: #444444;
  line-height: 38px;
  padding-left: 20px;
  margin: 30px 0 20px;
  p {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
<style lang="less">
.search_time .el-range-editor .el-range-input {
  line-height: 30px;
}
.engineer_dialog {
  .el-date-editor .el-range-separator {
    height: 32px;
  }
  .el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner,
  .el-date-editor--timerange.el-input,
  .el-date-editor--timerange.el-input__inner {
    width: 496px !important;
  }
}
</style>