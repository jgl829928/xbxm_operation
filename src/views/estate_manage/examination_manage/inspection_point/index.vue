<template>
  <div class="contract-receipts">
    <!-- 搜索 -->
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true" label-position="right">
      <el-row >
        <el-col :span="12" :xs="24">
          <el-form-item label="商场" prop="marketCode">
            <select-market :reqData="reqData"></select-market>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-button class="btn-search btn-add" type="primary" @click="point_add" v-show="$store.getters.getPermission('inspectionPoint_2')">添加巡检点</el-button>
    </div>
    <!-- 表格 -->
    <div class="c-table-wrap">
      <el-table :data="itemList" style="width: 100%" align="center" stripe height="500">
        <el-table-column align="center" prop="pointId" label="序号" min-width="160">
        </el-table-column>
        <el-table-column align="center" prop="marketName" label="所属商场">
        </el-table-column>
        <el-table-column align="center" prop="serialNumber" label="巡检点编号" min-width="105">
        </el-table-column>
        <el-table-column align="center" prop="pointName" label="巡检点名称" min-width="120">
        </el-table-column>
        <el-table-column align="center" prop="pointLocation" label="所处位置" min-width="100">
        </el-table-column>
        <el-table-column align="center" prop="createName" label="登记人">
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="登记时间" min-width="165">
        </el-table-column>
        <el-table-column align="center" label="巡检配置" >
          <template slot-scope="scope">
            <a  class="special_link" @click="point_set(scope.$index, scope.row)" :disabled="!$store.getters.getPermission('inspectionPoint_4')">
              配置
            </a>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="200" fixed="right">
          <template slot-scope="scope">
            <a class="special_link download_link"  @click="download_code(scope.$index,scope.row)" :disabled="!$store.getters.getPermission('inspectionPoint_5')">
              下载二维码
            </a>
            <el-button class="btn-handle" type="primary" @click="point_edit(scope.$index, scope.row)" :disabled="!$store.getters.getPermission('inspectionPoint_3')">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <pagenation :pageparams="pageparams" :itemList="itemList" @handlePage="handlePage"></pagenation>
    </div>
    <!-- 巡检点添加弹窗 -->
    <el-dialog :title="dialog_title" :visible.sync="point_add_dialog" class="s-dialog" @close="clean_data">
      <el-form :model="point_add_form" :rules="point_add_rules" ref="point_add_form">
        <el-form-item label="所属商场" :label-width="formLabelWidth" prop="marketCode">
          <el-select v-model="point_add_form.marketCode" clearable placeholder="请选择" :disabled="role">
            <el-option v-for="(item, index) in marketList" :key="index" :label="item.marketName" :value="item.marketCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡检点编号" :label-width="formLabelWidth" prop="serialNumber">
          <el-input v-model.trim="point_add_form.serialNumber" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="巡检点名称" :label-width="formLabelWidth" prop="pointName">
          <el-input v-model.trim="point_add_form.pointName" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="所处位置" :label-width="formLabelWidth" prop="pointLocation">
          <el-input v-model.trim="point_add_form.pointLocation" auto-complete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save_add" class="btn-save">保 存</el-button>
        <el-button @click="point_add_dialog = false" class="btn-reset">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 巡检点配置弹窗 -->
    <el-dialog title="巡检点-配置" :visible.sync="point_set_dialog" class="l-dialog">
      <el-table :data="setting_list" fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="序号" type="index">
        </el-table-column>
        <el-table-column align="center" label="物业公司">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select v-model="scope.row.companyId"  placeholder=""  @change="getstaff(scope.row.companyId)">
                <el-option v-for="(item, index) in estate_company" :key="index" :label="item.companyName" :value="item.companyId">
                </el-option>
              </el-select>
            </template>
            <span v-else>{{ scope.row.companyName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="物业人员">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select v-model="scope.row.staffId"  placeholder="" clearable>
                <el-option v-for="(item, index) in estate_staff" :key="index" :label="item.name" :value="item.staffId">
                </el-option>
              </el-select>
            </template>
            <span v-else>{{ scope.row.staffName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="巡检次数/日">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input type="number" class="edit-input" size="small"  v-model.number="scope.row.checkNumber"></el-input>
            </template>
            <span v-else>{{ scope.row.checkNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最小巡检时间间隔(h)">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input type="number" class="edit-input" size="small" precision="2" v-model.number="scope.row.checkInterval"></el-input>
            </template>
            <span v-else>{{ scope.row.checkInterval}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="160">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit" type="primary" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">保存</el-button>
            <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
            <el-button type="primary" size="small" icon="el-icon-edit" @click="delete_config(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add_config" class="btn-save">添 加</el-button>
        <el-button @click="point_set_dialog = false" class="btn-reset">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ApiSetting from "../../../../api/estate-inspection";
import selectMarket from "@/components/selectMarket";
import pagenation from "@/components/pagenation";
export default {
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
      pageparams: {},
      reqData: {
        marketCode: "",
        currentPage: 1,
        pageSize: 20
      },
      itemList: [],
      // 巡检点添加
      dialog_title: "巡检点-添加",
      marketList: [],
      point_add_dialog: false,
      formLabelWidth: "100px",
      marketCode: "",
      point_add_form: {
        marketCode: "",
        pointLocation: "",
        pointName: "",
        serialNumber: ""
      },
      point_add_rules: {
        marketCode: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        pointLocation: [
          { required: true, message: "请输入巡检点位置", trigger: "blur" },
          { max: 50, message: "长度应小于50", trigger: "blur" }
        ],
        pointName: [
          { required: false, trigger: "blur" },
          { max: 20, message: "长度应小于20", trigger: "blur" }
        ],
        serialNumber: [
          { required: false, trigger: "blur" },
          { max: 30, message: "长度应小于30", trigger: "blur" }
        ]
      },
      edit_point_id: "",
      set_point_id: "",
      // 巡检点配置
      point_set_dialog: false,
      setting_list: [],
      estate_company: [],
      estate_staff: [],
      role: false
    };
  },
  computed: {
    currentUser: function() {
      return this.$store.state.currentUser;
    }
  },
  components: { selectMarket, pagenation },
  name: "inspectionPoint",
  methods: {
    // 下载二维码
    download_code(index, row) {
      let param = {
        fileUrl: row.pictureUrl
      };
      this.$http({
        method: "get",
        url: "/business/download",
        showLoading: false,
        params: param,
        showLoading: false,
        responseType: "arraybuffer"
      }).then(res => {
        this.download(res.data);
      });
    },
    download(data) {
      if (!data) {
        return;
      }
      let jpgData = new Blob([data]);
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(jpgData, "二维码.jpg");
      } else {
        let url = window.URL.createObjectURL(jpgData);
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", "二维码.jpg");
        document.body.appendChild(link);
        link.click();
      }
    },

    //判断当前用户权限
    judegRole() {
      if (this.currentUser.affiliation === 2) {
        this.marketCode = this.currentUser.marketCode;
        this.point_add_form.marketCode = this.currentUser.marketCode;
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

    getListData() {
      this.$http
        .get(ApiSetting.pointList, { params: this.reqData })
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
      this.getListData();
    },

    // 翻页
    handlePage(val) {
      this.reqData.currentPage = val;
      this.getListData();
    },
    clean_data() {
      Object.assign(this.point_add_form, this.$options.data().point_add_form);
      this.point_add_form.marketCode = this.marketCode;
    },
    // 添加巡检点
    point_add() {
      this.dialog_title = "巡检点—添加";
      this.point_add_dialog = true;
      this.point_add_form.pointName = "";
    },

    // 修改巡检点
    point_edit(index, row) {
      this.dialog_title = "巡检点—修改";
      this.point_add_dialog = true;
      this.point_add_form = {
        marketCode: row.marketCode,
        pointLocation: row.pointLocation,
        pointName: row.pointName,
        serialNumber: row.serialNumber
      };
      this.edit_point_id = row.pointId;
    },

    // 操作巡检点保存
    save_add() {
      this.$refs["point_add_form"].validate(valid => {
        if (valid) {
          if (this.dialog_title == "巡检点—添加") {
            this.$http
              .post(ApiSetting.addPoint, this.point_add_form)
              .then(res => {
                if (res && res.code == 0) {
                  this.point_add_dialog = false;
                  this.getListData();
                  this.$refs["point_add_form"].resetFields();
                }
              });
          } else {
            let addPoint = `${ApiSetting.addPoint}/${this.edit_point_id}`;
            this.$http.put(addPoint, this.point_add_form).then(res => {
              if (res && res.code == 0) {
                this.edit_point_id = "";
                this.point_add_dialog = false;
                this.getListData();
                this.$refs["point_add_form"].resetFields();
              }
            });
          }
        }
      });
    },

    //查询巡检点配置
    point_set(index, row) {
      this.set_point_id = row.pointId;
      this.point_set_dialog = true;
      // 获取巡检点列表
      this.setPointList(this.set_point_id);
      // 获取物业公司数据
      this.companyData(row.marketCode);
    },

    // 获取巡检点配置数据
    setPointList(id) {
      let pointSet = `${ApiSetting.pointSet}/${id}`;
      this.$http.get(pointSet).then(res => {
        if (res && res.code == 0) {
          if (res.data) {
            res.data.map(item => {
              item.edit = false;
            });
            this.setting_list = res.data;
          } else {
            this.setting_list = [];
          }
        }
      });
    },
    // 获取物业公司信息
    companyData(code) {
      let company = `${ApiSetting.company}/${code}`;
      this.$http.get(company).then(res => {
        if (res && res.code == 0) {
          this.estate_company = res.data;
        }
      });
    },
    // 获取物业人员信息
    getstaff(id) {
      let staff = `${ApiSetting.staff}/${id}`;
      this.$http.get(staff).then(res => {
        if (res && res.code == 0) {
          this.estate_staff = res.data;
        }
      });
    },
    // 添加巡检点配置
    add_config() {
      let add_data = {
        checkInterval: "",
        checkNumber: "",
        companyName: "",
        pointId: this.set_point_id,
        staffName: "",
        edit: true
      };
      this.setting_list.push(add_data);
    },

    // 巡检点配置保存
    confirmEdit(row) {
      let param = {
        checkInterval: row.checkInterval,
        checkNumber: row.checkNumber,
        companyId: row.companyId,
        pointId: row.pointId,
        staffId: row.staffId
      };
      if (row.configId) {
        // 编辑保存
        let editPointSet = `${ApiSetting.addPointSet}/${row.configId}`;
        this.$http.put(editPointSet, param).then(res => {
          if (res && res.code == 0) {
            row.edit = false;
            this.setPointList(this.set_point_id);
          }
        });
      } else {
        // 添加保存
        this.$http.post(ApiSetting.addPointSet, param).then(res => {
          if (res && res.code == 0) {
            row.edit = false;
            this.setPointList(this.set_point_id);
          }
        });
      }
    },

    // 巡检点删除
    delete_config(row, index) {
      if (row.configId) {
        // 这是已添加删除
        let deletePointSet = `${ApiSetting.addPointSet}/${row.configId}`;
        this.$http.delete(deletePointSet).then(res => {
          if (res && res.code == 0) {
            this.setPointList(this.set_point_id);
          }
        });
      } else {
        // 未添加删除
        this.setting_list.splice(index, 1);
      }
    },
    add_marketData(data) {
      this.point_add_form.marketCode = data;
    }
  },
  created() {
    // 角色判断
    this.judegRole();
    // 获取商场信息
    this.getMarketList();
    // 获取列表信息
    this.getListData();
  }
};
</script>
<style lang="less" scoped>
.special_link{
  font-size: 12px;
  color: #3f87f5;
  text-decoration: underline;
 
}
.download_link{
   margin-right:20px;
}
</style>
