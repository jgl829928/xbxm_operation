<template>
  <div class="contract-receipts">
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true" label-position="right">
      <el-row >
        <el-col :span="8" :xs="24">
          <el-form-item label="商场" prop="marketCode">
           <select-market :reqData="reqData"></select-market>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="报告时间" prop="time" class="search_time">
            <el-date-picker v-model="time" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="年/月/日"
             :default-time="['00:00:00', '23:59:59']"  end-placeholder="年/月/日" align="right" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="c-table-wrap">
      <el-table :data="itemList" style="width: 100%" align="center" stripe height="500">
        <el-table-column align="center" prop="reportId" label="序号" min-width="160">
        </el-table-column>
        <el-table-column align="center" prop="marketName" label="所属商场">
        </el-table-column>
        <el-table-column align="center" prop="equipmentName" label="报告设备">
        </el-table-column>
        <el-table-column align="center" prop="equipmentCode" label="设备编号">
           <template slot-scope="scope">
            <p v-if="scope.row.equipmentCode">{{scope.row.equipmentCode}}</p>
            <p v-else>-</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="reportDetail" label="报告内容">
        </el-table-column>
        <el-table-column align="center" prop="reportLocation" label="所处位置">
        </el-table-column>
        <el-table-column align="center" prop="createName" label="记录人">
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="报告时间" min-width="165">
        </el-table-column>
        <el-table-column align="center" prop="money" label="解决情况">
          <template slot-scope="scope">
            <p v-if="scope.row.reportStatus==0">待解决</p>
            <p v-else-if="scope.row.reportStatus==1">已解决</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateName" label="解决人">
        </el-table-column>
        <el-table-column align="center" prop="updateTime" label="解决时间" min-width="165">
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
import pagenation from '@/components/pagenation'
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
       pageparams:{ },
      time: "",
      reqData: {
        marketCode: "",
        startTime: "",
        endTime: "",
        currentPage: 1,
        pageSize: 20
      },
      itemList: []
    };
  },
  components: { selectMarket ,pagenation},
  name:"inspectioReport",
  methods: {
    getListData() {
      this.$http
        .get(ApiSetting.reportRecord, { params: this.reqData })
        .then(res => {
          if (res && res.code == 0&& res.data) {
            this.itemList = res.data;
             this.pageparams = res.page
          }else{
             this.itemList =[]
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
    }
  },
  created() {
    // 获取列表信息
    this.getListData();
  }
};
</script>
<style>

.search_time .el-range-editor .el-range-input {
  line-height: 30px;
}
</style>
