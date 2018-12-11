<template>
  <div class="contract-receipts boothinfo-search">
    <el-form class="c-search-form" :model="pageParams" ref="pageParams" label-width="125px" :inline="true"
             label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商户编号" prop="itemCode">
            <el-input clearable v-model.trim="pageParams.merchantCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户名称" prop="itemCode">
            <el-input clearable v-model.trim="pageParams.merchantName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商场名称" prop="itemCode">
            <!-- <el-select v-model.trim="pageParams.marketCode" clearable placeholder="请选择">
               <el-option
                 v-for="(item, index) in storeNameOption"
                 :key="index"
                 :label="item.marketName"
                 :value="item.marketCode">
               </el-option>
             </el-select>-->
            <selectMarket :reqData="pageParams"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="款项类型" prop="skuCode">
            <el-select v-model.trim="pageParams.transactionType" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in incomeType"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="付款方式" prop="skuCode">
            <el-select v-model.trim="pageParams.payMode" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in payMode"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="skuCode">
            <el-select v-model.trim="pageParams.status" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in status"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="预定收款起止日期" prop="itemName">
            <el-date-picker
              v-model.trim="expectPayTime"
              type="daterange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="交款起止日期" prop="itemName">
            <el-date-picker
              v-model.trim="payTime"
              type="daterange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="getPageList(1)">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div v-show="$store.getters.getPermission('boothInfoSearch_2')">
      <el-button class="btn-search btn-add" type="primary" @click="exportData">导出</el-button>
    </div>
    <div class="c-table-wrap">
      <el-table
        :data="tableList"
        style="width: 100%"
        align="center"
        stripe height="500">
        <el-table-column
          align="center"
          type="index"
          label="序号"
          min-width="50"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          align="center"
          prop="costName"
          min-width="150"
          label="费用名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="costType"
          min-width="150"
          label="费用类型">
        </el-table-column>
        <el-table-column
          align="center"
          prop="contractBatchNum"
          min-width="160"
          label="合同编号">
        </el-table-column>
        <el-table-column
          min-width="150"
          align="center"
          prop="merchantCode"
          label="商户编号">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="merchantName"
          label="商户名称">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="marketName"
          label="商场名称">
        </el-table-column>
        <el-table-column
          min-width="110"
          prop="manager"
          align="center"
          label="楼层经理">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="costTypeName"
          label="款项类型">
        </el-table-column>
        <el-table-column
          min-width="110"
          prop="paymentStatus.desc"
          align="center"
          label="收款状态">
        </el-table-column>
        <el-table-column
          min-width="110"
          prop="refundStatus.desc"
          align="center"
          label="退款状态">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="165"
          prop="expectPayTime"
          label="预定收款时间">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="transactionAmount"
          label="金额">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="payMode.desc"
          label="付款方式">
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderNo"
          min-width="200"
          label="第三方交易流水号">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="165"
          prop="transactionTime"
          label="交款时间">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="transactionAmount"
          label="交款金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="paySuccessTime"
          min-width="165"
          label="收款成功时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="payOptUserName"
          min-width="110"
          label="收款操作人">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="165"
          prop="payOptTime"
          label="收款操作时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="refundSuccessTime"
          min-width="165"
          label="退款成功时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="refundOptUserName"
          min-width="110"
          label="退款操作人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="refundOptTime"
          min-width="165"
          label="退款操作时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="refundErrorMsg"
          min-width="110"
          label="退款失败原因">
        </el-table-column>
      </el-table>
    </div>
    <Pagenation :pageparams="pageDefault" @handlePage="getPageList" :itemList="tableList"/>
  </div>
</template>
<script>
  import Pagenation from '@/components/pagenation';
  import selectMarket from '@/components/selectMarket';
  import api from '@/api/operation-manage';

  export default {
    name: 'boothInfoSearch',
    components: {
      Pagenation,
      selectMarket
    },
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        pageDefault: {//分页默认参数
          totalRecords: 0,
          currentPage: 1,
          pageSize: 20
        },
        expectPayTime: [],
        payTime: [],
        pageParams: {//表格查询参数
          merchantCode: '',
          merchantName: '',
          marketCode: '',
          transactionType: '',
          payMode: '',
          status: '',
          expectPayTimeStart: '',
          expectPayTimeEnd: '',
          payTimeStart: '',
          payTimeEnd: '',
          currentPage: 1
        },
        exportParams: {
          currentPage: 1,
          pageSize: 10000
        },
        tableList: [],
        typeOption: [],//摊位类型下拉框
        storeNameOption: [],//商场名称下拉框
        incomeType: [
          {label: '日常款项', value: 1},
          {label: '合同款项', value: 2},
        ],
        payMode: [
          /*{label: '微信', value: 1},
            {label: '支付宝', value: 2},*/
          {label: '银行转账', value: 4},
          {label: 'POS机刷卡', value: 3},
          {label: '现金', value: 5}
        ],
        status: [
          {label: '已交款', value: 0},
          {label: '已退款', value: 1},
          {label: '退款失败', value: 2}
        ]
      }
    },
    methods: {
      getOptionData() {
        //摊位类型拉框
        let typeOption = this.$http.get(api.allBoothType);
        //商场名称下拉框
        let storeNameOption = this.$http.get(api.allStore);

        Promise.all([typeOption, storeNameOption]).then(res => {
          if (res[0].code === 0) {
            this.typeOption = [];
            this.typeOption = [...res[0].data];
          }
          if (res[1].code === 0) {
            this.storeNameOption = [];
            this.storeNameOption = [...res[1].data];
          }
        })
      },
      async getPageList(index) {
        this.pageParams.currentPage = index || 1;
        this.pageDefault.currentPage = index || 1;
        let res = await this.$http.get(api.inComeList, {params: this.pageParams});
        if (res.code === 0) {
          this.pageDefault.totalRecords = res.page.totalRecords;
          this.tableList = [];
          this.tableList = [...res.data];
        }
      },
      indexMethod(index) {
        return index + (this.pageParams.currentPage - 1) * 20 + 1
      },
      download(data, i) {
        if (!data){return}
        let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, `收款信息-${this.currentTime()}_${i + 1}.xls`);
        }else{
          let downloadElement = document.createElement('a');
          let href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = `收款信息-${this.currentTime()}_${i + 1}.xls`; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        }
      },
      exportData() {
        let _this = this;
        let data = {...this.pageParams, ...this.exportParams};
        let p = new Promise(function (resolve, reject) {
          resolve()
        });
        let get_request_sth_func = function (i) {
          return function request_sth() {
            return new Promise(function (resolve, reject) {
              data.currentPage = i + 1;
              _this.$http({
                method: 'get',
                url: `${api.exportIncomeList}`,
                params: data,
                responseType: "blob",
                showLoading: false
              }).then(res => {
                _this.download(res.data, i);
                resolve();
              })
            })
          }
        };
        if (this.pageDefault.totalRecords >= 0) {
          let total = this.pageDefault.totalRecords;
          let size = data.pageSize;
          let reqCount = (Math.ceil(total / size) === 0) ? 1 : Math.ceil(total / size);
          for (let i = 0; i < reqCount; i++) {
            p = p.then(get_request_sth_func(i))
          }
        }
      },
      currentTime() {
        let date = new Date();
        let year = date.getFullYear(),
          month = date.getMonth()+1,
          day = date.getDate(),
          hour = date.getHours(),
          min = date.getMinutes(),
          sec = date.getSeconds();
        let newTime = year + '-' + (month < 10? '0' + month : month) + '-' +(day < 10? '0' + day : day) + ' ' +
          (hour < 10? '0' + hour : hour) + '-' +(min < 10? '0' + min : min) + '-' + (sec < 10? '0' + sec : sec);
        return newTime;
      }
    },
      beforeMount() {
        this.getOptionData();
        this.getPageList();
      },
      watch: {
        expectPayTime: function (newval, oldval) {
          if (newval !== null) {
            this.pageParams.expectPayTimeStart = newval[0];
            this.pageParams.expectPayTimeEnd = newval[1];
          } else {
            this.pageParams.expectPayTimeStart = '';
            this.pageParams.expectPayTimeEnd = '';
          }
        },
        payTime: function (newval, oldval) {
          if (newval !== null) {
            this.pageParams.payTimeStart = newval[0];
            this.pageParams.payTimeEnd = newval[1];
          } else {
            this.pageParams.payTimeStart = '';
            this.pageParams.payTimeEnd = '';
          }
        }
      }
    };
</script>
<style lang="less" scoped>
  .contract-receipts {
    .footer-btn {
      width: 342px;
      text-align: right;
    }
  }

  .unit-div {
    margin-top: 30px;
    text-align: right;
  }
</style>
<style lang="less">
  .boothinfo-search {
    .line-height-label {
      label {
        line-height: 20px;
      }
    }
  }
</style>
