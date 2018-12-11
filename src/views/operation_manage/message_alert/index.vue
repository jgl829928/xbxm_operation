<template>
  <div class="contract-receipts message-alert">
    <el-form  class="c-search-form" :model="pageParams" ref="pageParams" label-width="102px" :inline="true"
              label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="账号/手机号" prop="appAccount">
            <el-input clearable v-model.trim="pageParams.appAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户名称" prop="merchantName">
            <el-input clearable v-model.trim="pageParams.merchantName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="skuCode">
            <el-select v-model.trim="pageParams.pushStatus" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in statusList"
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
          <el-form-item label="推送类型" prop="skuCode">
            <el-select v-model.trim="pageParams.pushType" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in pushTypeList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="推送起止时间" prop="itemName">
            <el-date-picker
              v-model.trim="timeSelect"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="getPageList(1)">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
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
          width="50"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          min-width="120"
          align="center"
          prop="appAccount"
          label="账号/手机号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="pushContent"
          width="400"
          label="消息内容">
        </el-table-column>
        <el-table-column
          min-width="110"
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
          prop="pushType.desc"
          label="推送类型">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="businessType.desc"
          label="业务类型">
        </el-table-column>
        <el-table-column
          align="center"
          prop="pushTime"
          min-width="165"
          label="推送时间">
        </el-table-column>
        <el-table-column
          min-width="80"
          align="center"
          prop="pushStatus.desc"
          label="状态">
        </el-table-column>
      </el-table>
    </div>
    <Pagenation :pageparams="pageDefault" @handlePage="getPageList" :itemList="tableList"/>
  </div>
</template>
<script>
  import Pagenation from '@/components/pagenation';
  import api from '@/api/operation-manage';

  export default {
    name:'messageAlert',
    components: {
      Pagenation
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
        timeSelect:[],
        pageParams: {//表格查询参数
          appAccount: '',
          merchantName: '',
          pushStatus: '',
          pushType: '',
          startTime: '',
          endTime: '',
          currentPage: 1
        },
        tableList: [],
        pushTypeList:[//推送类型下拉框
          {label:'APP',value:1},
          {label:'短信',value:2}
        ],
        statusList:[//状态下拉框
          {label:'失败',value:1},
          {label:'成功',value:2}
        ]
      }
    },
    methods: {
      async getPageList(index) {
        this.pageParams.currentPage = index || 1;
        this.pageDefault.currentPage = index || 1;
        let res = await this.$http.get(api.messageList, {params: this.pageParams});
        if (res.code === 0) {
          this.pageDefault.totalRecords = res.page.totalRecords;
          this.tableList = [];
          this.tableList = [...res.data];
        }
      },
      indexMethod(index) {
        return index + (this.pageParams.currentPage - 1) * 20 + 1
      },
    },
    beforeMount() {
      this.getPageList();
    },
    watch:{
      timeSelect:function(newval,oldval) {
        if(newval!==null){
          this.pageParams.startTime=newval[0];
          this.pageParams.endTime=newval[1];
        }else{
          this.pageParams.startTime='';
          this.pageParams.endTime='';
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .contract-receipts{
    .footer-btn{
      width: 342px;
      text-align: right;
    }
  }
  .unit-div{
    margin-top: 30px;
    text-align: right;
  }
</style>
<style lang="less">
  .message-alert{
    .el-date-editor--datetimerange.el-input,
    .el-date-editor--datetimerange.el-input__inner{
      width: 400px;
    }
  }
</style>
