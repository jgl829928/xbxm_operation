<template>
  <div class="contract-receipts">
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true" label-position="right">
      <el-row >
        <el-col :span="8" :xs="24">
          <el-form-item label="商场" prop="marketCode">
            <select-market :reqData="reqData" @change="code_change"></select-market>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label="物业公司" prop="companyId">
            <el-select v-model="reqData.companyId" clearable placeholder="请选择">
              <el-option v-for="(item, index) in estate_company" :key="index" :label="item.companyName" :value="item.companyId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="12" :xs="24">
          <el-form-item label="记录时间" prop="time" class="search_time">
            <el-date-picker v-model="time" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="年/月/日"
             :default-time="['00:00:00', '23:59:59']"   end-placeholder="年/月/日" align="right"  value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
         <el-col :span="12" :xs="24">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="c-table-wrap">
      <el-table :data="itemList" style="width: 100%" align="center" stripe height="500">
        <el-table-column align="center" prop="signId" label="序号" min-width="180">
        </el-table-column>
        <el-table-column align="center" prop="marketName" label="所属商场">
        </el-table-column>
        <el-table-column align="center" prop="serialNumber" label="巡检点编号">
        </el-table-column>
        <el-table-column align="center" prop="pointName" label="巡检点名称" >
        </el-table-column>
        <el-table-column align="center" prop="pointLocation" label="所处位置">
        </el-table-column>
        <el-table-column align="center" prop="staffName" label="巡检人">
        </el-table-column>
        <el-table-column align="center" prop="companyName" label="所属公司">
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="巡检记录时间" min-width="165">
        </el-table-column>
      </el-table>
    </div>
     <div class="pagination-box">
     <pagenation :pageparams="pageparams" :itemList="itemList" @handlePage="handlePage"></pagenation>
    </div>
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
      time: "",
      reqData: {
        companyId: "",
        marketCode: "",
        startTime: "",
        endTime: "",
        currentPage: 1,
        pageSize: 20
      },
      pageparams: {},
      estate_company: [],
      itemList: []
    };
  },
  components: { selectMarket, pagenation },
  name: "inspectioCheck",
  methods: {
    getOtherData(code) {
      let param = {
        marketCode: ""
      };
      if (this.currentUser.affiliation === 2) {
        param.marketCode = this.currentUser.marketCode;
      } else {
        param.marketCode = code;
      }
      this.$http.get(ApiSetting.estateCompany, { params: param }).then(res => {
        if (res && res.code == 0) {
          this.estate_company = res.data;
        }
      });
    },
    getListData() {
      this.$http
        .get(ApiSetting.signRecord, { params: this.reqData })
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
      this.reqData.startTime = this.time ? this.time[0] : "";
      this.reqData.endTime = this.time ? this.time[1] : "";
      this.getListData();
    },
    // 翻页
    handlePage(val) {
      this.reqData.currentPage = val;
      this.getListData();
    },
    // 商场改变
    code_change(code) {
      this.getOtherData(code);
      this.reqData.companyId = "";
    }
  },
  computed: {
    currentUser: function() {
      return this.$store.state.currentUser;
    }
  },
  created() {
    // 获取列表信息
    this.getListData();
    this.getOtherData();
  }
};
</script>
<style>
.search_time .el-range-editor .el-range-input {
  line-height: 30px;
}
</style>
