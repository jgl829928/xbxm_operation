<template>
  <div class="p-expenditure-manage">
    <el-form  class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true"
              label-position="right">
      <el-row>
           <el-col :span="8" :xs="24">
          <el-form-item label="商场" prop="marketCode">
         <select-market :reqData="reqData" @change="code_change"></select-market>
       </el-form-item>
        </el-col>
           <el-col :span="8" :xs="24">
          <el-form-item label="物业公司" prop="companyId" >
              <el-select v-model="reqData.companyId" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in companyList"
                  :key="index"
                  :label="item.companyName"
                  :value="item.companyId">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
          <el-col :span="8" :xs="24">
          <el-form-item label="考核月份" prop="assess">
              <el-date-picker
                 v-model="reqData.assess"
                 value-format="yyyy-MM"
                type="month"
                :picker-options="pickerOptions"
             placeholder="选择月">
          </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="16">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" v-show="rightControl('expenditure_add')">
            <router-link :to="{name:'addRecord'}">
            <el-button class="btn-search btn-add" type="primary">
              添加记录
            </el-button>
          </router-link>
        </el-col>
      </el-row>
    </el-form>
    <div class="c-table-wrap">
      <el-table
        :data="itemList"
        style="width: 100%"
        align="center"
        height="500"
        stripe>
        <el-table-column
          align="center"
          prop="financeId"
          min-width="160"
          label="序号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="companyName"
          label="物业公司">
        </el-table-column>
        <el-table-column
          align="center"
          prop="year"
          label="年份">
        </el-table-column>
        <el-table-column
          align="center"
          prop="month"
          label="月份">
        </el-table-column>
        <el-table-column
          align="center"
          prop="day"
          min-width="120"
          label="合格/总天数">
        </el-table-column>
        <el-table-column
          align="center"
          prop="remittee"
          label="收款方">
        </el-table-column>
  		<el-table-column
          align="center"
          prop="paymentMethod"
          label="付款方式">
        </el-table-column>
        <el-table-column
          align="center"
          prop="contractValue"
          label="合同金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="amount"
          label="扣款金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="amountPaid"
          label="实付金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="payment"
          label="付款方">
        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="凭证">
          <template slot-scope="scope">
            <p  v-show="rightControl('expenditure_info')" class="u-check" @click="checkConstrck(scope.row)">查看</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="accountFor"
          label="说明">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createName"
          label="登记人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          min-width="130"
          label="登记时间">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          min-width="190">
          <template slot-scope="scope">
            <router-link
                :to="{name:'editRecord',params:{financeId:scope.row.financeId}}" :disabled="!rightControl('expenditure_edit')">
            <el-button class="btn-handle" type="primary">
                修改
            </el-button>
            </router-link>
            <el-button class="btn-handle" type="primary" @click="deleteData(scope.row.financeId)" :disabled="!rightControl('expenditure_delete')">
                删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
     <pagenation :pageparams="pageparams" :itemList="itemList" @handlePage="handlePage"></pagenation>
       <!-- 查看 -->
   <el-dialog title="凭证-查看" :visible.sync="dialogFormVisible" class="s-dialog" center>
      <div>
        <el-row v-for="(item,index) in fileList" :key="index">
          <el-col :span="19" class="u-left">
                <span>{{item.name}}</span>
            <span v-if="fileList.length == 0">（无）</span>
          </el-col>
          <el-col :span="5" :xs="24">
            <a @click="download_file(item.url,item.name)">下载</a>
              </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
      <el-button class="btn-80" @click="dialogFormVisible = false">关 闭</el-button>
       </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ApiSetting from "@/api/basicApi-estateApi";
import ApiSettingCom from "@/api/apiSetting";
import selectMarket from "@/components/selectMarket";
import pagenation from "@/components/pagenation";
import { getDataAll } from "@/utils/auth";
export default {
  name:'expenditure',
  data() {
    return {
      pickerOptions: {
          disabledDate(time) {
            let myDate = new Date()
            return time.getTime() > new Date(myDate.getFullYear(), myDate.getMonth(), 0, 0, 0, 0).getTime()
   }
 },

      dialogFormVisible: false,
      reqData: {
        marketCode: "",
        assess: "",
        companyId: ""
      },
      pageparams: {
        currentPage: 1
      },
      itemList: [],
      companyList: [],
      fileList: []
    };
  },
  components: { selectMarket, pagenation },
  created() {
    this.getData();
    this.getCompanyList()
  },
   computed: {
     currentUser: function() {
      return this.$store.state.currentUser;
    },
  },
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
      this.getCompanyList(param.marketCode)
    },
     // 商场改变
    code_change(code) {
      this.reqData.companyId = "";
      if(code){
         this.getOtherData(code);
      }
  },
       // 权限判断
    rightControl (id) {
      return this.$store.getters.getPermission(id)
    },
    // 下载文件
    download_file(data, filename) {
      this.$http({
        method: "get",
        url: "/business/download",
        params: {
          fileUrl: data
        },
        showLoading:false,
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
    },
    checkConstrck(data) {
      this.dialogFormVisible = true;
      if (data.imgFinanceUrl) {
        this.fileList = data.imgFinanceUrl;
      } else {
        this.fileList = [];
      }
    },
    getData(page) {
      var _this = this;
      var page = page || "";
      var data = {
        ..._this.reqData,
        currentPage: page
      };
      getDataAll(page, data, ApiSetting.finance, _this);
    },
    handlePage(val) {
      this.getData(val);
    },
    search() {
      this.getData();
      this.getCompanyList()
    },
    //获取所有物业公司
    getCompanyList(marketCode) {
      this.$http({
        url:ApiSetting.companyList,
        params:{marketCode:marketCode},
        method:'get',
        showLoading:false
        }).then(res => {
        if (res && res.code == 0 && res.data) {
            this.companyList = res.data;     
        }
      });
    },
    //删除
    deleteData(data) {
      this.$confirm("此操作将永久删除该条, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete(`${ApiSetting.finance}/${data}`, {
              params: { finance: data }
            })
            .then(res => {
              if (res) {
                if (res.code == 0) {
                  this.$message({
                    type: "success",
                    message: res.msg
                  });
                  this.getData(this.pageparams.currentPage);
                }
              }
            });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="less">
.p-expenditure-manage {
  .s-dialog .el-dialog__body {
    text-align: center;
  }
  .el-date-editor.el-input {
    width:100%;
  }
}
</style>
<style scoped lang="less">
  .el-button a {
      height: 0px;
    }
  .u-check {
    cursor:pointer;
    color: #1989fa;
  }
   .u-center{
  text-align: right;

 }
 .u-left {
    text-align: left;
  }
  .btn-80{
      margin: 20px 0px;
    }
</style>
