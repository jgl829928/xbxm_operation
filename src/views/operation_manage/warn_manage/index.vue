<template>
  <div class="contract-receipts warn-manage">
    <el-form  class="c-search-form" :model="pageParams" ref="pageParams" :inline="true"
              label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商场" prop="skuCode">
            <selectMarket :reqData="pageParams"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="提醒类型" prop="skuCode">
            <el-select v-model.trim="pageParams.topicCode" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in remindOption"
                :key="index"
                :label="item.topicName"
                :value="item.topicCode">
              </el-option>
            </el-select>
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
          label="序号"
          min-width="115"
          prop="reminderCode">
        </el-table-column>
        <el-table-column
          align="center"
          prop="appAccount"
          min-width="120"
          label="用户账号">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="userName"
          label="用户姓名">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="marketName"
          label="所属商场">
        </el-table-column>
        <el-table-column
          align="center"
          prop="topicName"
          min-width="115"
          label="提醒类型/主题">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="remindTime"
          label="提醒时间">
        </el-table-column>
        <el-table-column
          min-width="120"
          align="center"
          prop="remindedName"
          label="联系人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="phoneNumber"
          min-width="115"
          label="联系方式">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          label="地址">
          <template slot-scope="scope">
            <div class="one-line" :title="scope.row.address">{{scope.row.address}}</div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          label="备注">
          <template slot-scope="scope">
            <div class="one-line" :title="scope.row.comment">{{scope.row.comment}}</div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          align="center"
          label="购买商品">
          <template slot-scope="scope">
            <span>--</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          align="center"
          label="保修期">
          <template slot-scope="scope">
            <span>--</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          min-width="165"
          label="记录时间">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="remindStatus.desc"
          label="完成状态">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button :disabled="!($store.getters.getPermission('warn_2'))" class="btn-handle btn-add" type="primary" @click="deleteRemind(scope.row.reminderCode)">删除</el-button>
          </template>
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
    name:'warn',

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
        timeSelect:[],
        pageParams: {//表格查询参数
          marketCode: '',
          topicCode: '',
          currentPage: 1
        },
        tableList: [],
        storeNameOption: [],//商场名称下拉框
        remindOption:[],
      }
    },
    methods: {
      getOptionData() {
        //商场名称下拉框
        let storeNameOption = this.$http.get(api.allStore);
        let remindOption = this.$http.get(api.remindOption);
        Promise.all([storeNameOption,remindOption]).then(res => {
          if (res[0].code === 0) {
            this.storeNameOption = [];
            this.storeNameOption = [...res[0].data];
          }
          if (res[1].code === 0) {
            this.remindOption = [];
            this.remindOption = [...res[1].data];
          }
        })
      },
      async getPageList(index) {
        this.pageParams.currentPage = index || 1;
        this.pageDefault.currentPage = index || 1;
        let res = await this.$http.get(api.remindersList, {params: this.pageParams});
        if (res.code === 0) {
          this.pageDefault.totalRecords = res.page.totalRecords;
          this.tableList = [];
          this.tableList = [...res.data];
        }
      },
      deleteRemind(id) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(api.deleteRemind + `/${id}`).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg);
              this.getPageList();
            }else{
              this.$message.error(res.msg);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      indexMethod(index) {
        return index + (this.pageParams.currentPage - 1) * 20 + 1
      },
    },
    beforeMount() {
      this.getOptionData();
      this.getPageList();
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
  .warn-manage{
    .one-line{
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
</style>
