<template>
  <div class="g-examination-manage">
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true" label-position="right">
      <el-row >
        <el-col :span="8" :xs="24">
          <el-form-item label="商场" prop="marketCode">
            <select-market :reqData="reqData"  @change="code_change"></select-market>
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
        <el-col :span="8" :xs="24">
          <el-form-item label="考核月份" prop="assessDate">
            <el-date-picker v-model="reqData.assessDate" type="month" placeholder="年/月" clearable value-format="yyyy-MM">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="8" :offset="16">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="c-table-wrap">
      <el-table :data="itemList" style="width: 100%" align="center" stripe height="500" >
        <el-table-column align="center" prop="assessId" label="序号" min-width="160">
        </el-table-column>
        <el-table-column align="center" prop="marketName" label="商场">
        </el-table-column>
        <el-table-column align="center" prop="companyName" label="物业公司">
        </el-table-column>
        <el-table-column align="center" prop="year" label="年份">
        </el-table-column>
        <el-table-column align="center" prop="month" label="月份">
        </el-table-column>
        <el-table-column align="center" prop="totalDays" label="考核天数">
        </el-table-column>
        <el-table-column align="center" prop="assessNumber" label="考核人数">
        </el-table-column>
        <el-table-column align="center" prop="qualified" label="合格人*天">
        </el-table-column>
        <el-table-column align="center" prop="disqualified" label="不合格人*天"  min-width="140">
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
      reqData: {
        currentPage: 1,
        pageSize: 20,
        marketCode: "",
        companyId: "",
        assessDate: ""
      },
      pageparams: {},
      estate_company: [],
      // 列表数据
      itemList: []
    };
  },
  components: { selectMarket, pagenation },
  name: "examination",
  methods: {
    getListData() {
      this.$http
        .get(ApiSetting.chacktaskList, { params: this.reqData })
        .then(res => {
          if (res && res.code == 0 && res.data) {
            this.itemList = res.data;
            this.pageparams = res.page;
          } else {
            this.itemList = [];
          }
        });
    },
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
    // 获取物业公司数据
    this.getOtherData();
    // 获取列表信息
    this.getListData();
  }
};
</script>
<style lang="less">
.g-examination-manage {
  .el-date-editor.el-input {
    width: 100%;
  }
}
</style>