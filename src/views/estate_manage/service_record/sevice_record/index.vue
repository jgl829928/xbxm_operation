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
          <el-form-item label="操作时间" prop="itemName" class="search_time">
            <el-date-picker v-model="time" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="年/月/日"
              :default-time="['00:00:00', '23:59:59']" end-placeholder="年/月/日" align="right" value-format="yyyy-MM-dd">
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
    <div>
      <el-button class="btn-search btn-add" type="primary" @click="add_record" v-show="$store.getters.getPermission('seviceRecord_2')">
        维修登记
      </el-button>
    </div>
    <div class="c-table-wrap">
      <el-table :data="itemList" style="width: 100%" align="center" stripe height="500">
        <el-table-column align="center" prop="repairId" label="序号" min-width="160">
        </el-table-column>
        <el-table-column align="center" prop="marketName" label="商场">
        </el-table-column>
        <el-table-column align="center" prop="typeName" label="维护类别">
        </el-table-column>
        <el-table-column align="center" prop="equipmentOwner" label="设备所属">
        </el-table-column>
        <el-table-column align="center" prop="projectName" label="项目名称" min-width="120">
        </el-table-column>
        <el-table-column align="center" prop="supplier" label="施工日期" min-width="200">
          <template slot-scope="scope">
            <p>{{scope.row.repairStartDate}}至{{scope.row.repairEndDate}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="repairCost" label="结算金额">
        </el-table-column>
        <el-table-column align="center" prop="repairCompany" label="施工方">
        </el-table-column>
        <el-table-column align="center" prop="repairName" label="联系人">
        </el-table-column>
        <el-table-column align="center" prop="repairPhone" label="联系方式" min-width="120">
        </el-table-column>
        <el-table-column align="center" prop="repairExplain" label="说明" min-width="160">
           <template slot-scope="scope">
            <p class="overflow_text" :title="scope.row.repairExplain">{{scope.row.repairExplain}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="money" label="附件">
          <template slot-scope="scope">
            <a @click="check_accessory(scope.$index, scope.row)">查看</a>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createName" label="登记人">
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="登记时间" min-width="165">
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="200" fixed="right" >
          <template slot-scope="scope">
            <el-button class="btn-handle" type="primary"  :disabled="!$store.getters.getPermission('seviceRecord_3')"> 
              <router-link :to="{name:'editServiceRecord',
                params:{repairId:scope.row.repairId}}" >
                修改
              </router-link>
            </el-button>
            <el-button class="btn-handle btn-add" type="primary" @click='delete_record(scope.$index, scope.row)' :disabled="!$store.getters.getPermission('seviceRecord_4')">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <pagenation :pageparams="pageparams" :itemList="itemList" @handlePage="handlePage"></pagenation>
    </div>

    <el-dialog title="附件-查看" :visible.sync="dialogFormVisible" class="l-dialog accessory_dialog">
      <div class="m-accessoryInfo">
        <el-row :gutter="32">
          <el-col :span="8" :xs="24">
            <label>立项报告</label>
          </el-col>
          <el-col :span="16" :xs="24">
            <ul class="accessory_item" v-if="accessory_msg.projectReport" v-for="(item,index) in accessory_msg.projectReport" :key="index">
              <li>
                <span>{{item.name}}</span>
                <a @click="download_file(item.url,item.name)">下载</a>
                <!-- <a :href="$http.defaults.baseURL+'/business/download?fileUrl='+item.url">下载
                </a> -->
              </li>
            </ul>
            <span v-else> （无）</span>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="8" :xs="24">
            <label>验收记录</label>
          </el-col>
          <el-col :span="16" :xs="24">
            <ul class="accessory_item" v-if="accessory_msg.checkRecord" v-for="(item,index) in accessory_msg.checkRecord" :key="index">
              <li>
                <span>{{item.name}}</span>
                <a @click="download_file(item.url,item.name)">下载</a>
                <!-- <a :href="$http.defaults.baseURL+'/business/download?fileUrl='+item.url">下载
                </a> -->
              </li>
            </ul>
            <span v-else> （无）</span>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="8" :xs="24">
            <label>比价记录</label>
          </el-col>
          <el-col :span="16" :xs="24">
            <ul class="accessory_item" v-if="accessory_msg.comparisonRecord" v-for="(item,index) in accessory_msg.comparisonRecord" :key="index">
              <li>
                <span>{{item.name}}</span>
                <a @click="download_file(item.url,item.name)">下载</a>
                <!-- <a :href="$http.defaults.baseURL+'/business/download?fileUrl='+item.url">下载
                </a> -->
              </li>
            </ul>
            <span v-else> （无）</span>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="8" :xs="24">
            <label>现场照片</label>
          </el-col>
          <el-col :span="16" :xs="24">
            <div v-if="accessory_msg.scenePictures" v-for="(item,index) in accessory_msg.scenePictures" :key="index" class="img_box">
              <img :src="item.url" alt="" @click="open_img(item.url)">
            </div>
            <span v-else> （无）</span>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="8" :xs="24">
            <label>合同</label>
          </el-col>
          <el-col :span="16" :xs="24">
            <ul class="accessory_item" v-if="accessory_msg.repairContract" v-for="(item,index) in accessory_msg.repairContract" :key="index">
              <li>
                <span>{{item.name}}</span>
                <a @click="download_file(item.url,item.name)">下载</a>
                <!-- <a :href="$http.defaults.baseURL+'/business/download?fileUrl='+item.url">下载
                </a> -->
              </li>
            </ul>
            <span v-else> （无）</span>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="8" :xs="24">
            <label>收据</label>
          </el-col>
          <el-col :span="16" :xs="24">
            <ul class="accessory_item" v-if="accessory_msg.repairReceipt" v-for="(item,index) in accessory_msg.repairReceipt" :key="index">
              <li>
                <span>{{item.name}}</span>
                <a @click="download_file(item.url,item.name)">下载</a>
                <!-- <a :href="$http.defaults.baseURL+'/business/download?fileUrl='+item.url">下载
                </a> -->
              </li>
            </ul>
            <span v-else> （无）</span>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog title="附件-查看" :visible.sync="imgDialog" class="l-dialog bigImgDialog">
      <img :src="bigImageUrl" alt="">
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
      time: [],
      reqData: {
        marketCode: "",
        currentPage: 1,
        pageSize: 20,
        startTime: "",
        endTime: ""
      },
      itemList: [],
      dialogFormVisible: false,
      accessory_msg: {
        projectReport: [],
        checkRecord: [],
        comparisonRecord: [],
        scenePictures: [],
        repairContract: [],
        repairReceipt: []
      },
      imgDialog: false,
      bigImageUrl: ""
    };
  },
  components: { selectMarket, pagenation },
  name: "seviceRecord",
  methods: {
    open_img(url) {
      this.imgDialog = true;
      this.bigImageUrl = url;
    },
    getListData() {
      this.$http
        .get(ApiSetting.repairList, { params: this.reqData })
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
    // 查看弹窗
    check_accessory(index, row) {
      this.dialogFormVisible = true;
      this.accessory_msg = {
        projectReport: row.projectReport,
        checkRecord: row.checkRecord,
        comparisonRecord: row.comparisonRecord,
        scenePictures: row.scenePictures,
        repairContract: row.repairContract,
        repairReceipt: row.repairReceipt
      };
    },
    // 维修登记
    add_record() {
      this.$router.push("/estate/seviceRecord/addServiceRecord");
    },
    // 删除
    delete_record(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let delete_record = `${ApiSetting.operate_repair}/${row.repairId}`;
          this.$http.delete(delete_record).then(res => {
            if (res && res.code == 0) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getListData();
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
    // 翻页
    handlePage(val) {
      this.reqData.currentPage = val;
      this.getListData();
    },
    // 下载文件
    download_file(data, filename) {
      this.$http({
        method: "get",
        url: "/business/download",
        showLoading: false,
        params: {
          fileUrl: data
        },
        responseType: "arraybuffer"
      }).then(res => {
        this.download(res.data, filename);
      });
    },
    download(data, filename) {
      if (!data) {
        return;
      }
      let jpgData = new Blob([data]);
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(jpgData, filename);
      } else {
        let url = window.URL.createObjectURL(new Blob([data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      }
    }
  },
  created() {
    // 获取列表信息
    this.getListData();
  }
};
</script>
<style lang="less" scoped>
.m-accessoryInfo label {
  font-size: 12px;
  color: #888888;
}

.accessory_item li {
  margin-bottom: 20px;
  text-align: left;
  a {
    float: right;
    color: #1989fa;
    text-decoration: underline;
    margin-right: 100px;
  }
}
.overflow_text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bigImgDialog {
  text-align: center;
  img {
    width: 430px;
    height: 430px;
  }
}
</style>
<style lang="less">
.accessory_dialog .el-dialog__body {
  padding: 10px 38px 40px 20px !important;
}
.search_time .el-range-editor .el-range-input {
  line-height: 30px;
}
.m-accessoryInfo {
  .img_box {
    display: inline-block;
    margin-right: 20px;
  }
  .el-row .el-col {
    margin-top: 24px;
  }
  .el-col-8 {
    text-align: right;
  }
  img {
    width: 50px;
    height: 50px;
  }
}
</style>