<template>
  <div class="contract-receipts">
    <el-form  class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true"
              label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商场" prop="skuCode">
            <el-select v-model.trim="reqData.status" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商户" prop="skuCode">
            <el-select v-model.trim="reqData.status" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户手机号" prop="itemCode">
            <el-input clearable v-model.trim="reqData.name"></el-input>
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
    </el-form>
    <div class="c-table-wrap">
      <el-table
        border
        :data="itemList"
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
          align="center"
          prop="itemCode"
          label="所属商场">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="所属商户">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="客户账号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="supplier"
          label="客户姓名">
        </el-table-column>
        <el-table-column
          align="center"
          label="手机号">
        </el-table-column>
        <el-table-column
          align="center"
          label="客户地址">
        </el-table-column>
        <el-table-column
          align="center"
          label="后续商品购买意愿">
        </el-table-column>
        <el-table-column
          align="center"
          label="登记人">
        </el-table-column>
        <el-table-column
          align="center"
          label="登记时间">
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
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
        reqData:{
          itemCode:'',
          skuCode:'',
          itemName:'',
          shelf:'',
          operator: '',
          status:'',
          page:1,
          value:'',
          time:''
        },
        payWay:[
          {label: '微信', value: 1},
          {label: '支付宝', value: 2},
          {label: 'POS机刷卡', value: 3}
        ],
        statusList:[
          {label: '未交款', value: 1},
          {label: '已交款', value: 2},
          {label: '部分交款', value: 3}
        ],
        itemList:[
          {name:"testName"},
          {name:"testName"},
          {name:"testName"},
        ],
      }
    },
    methods: {
      search() {

      },
      indexMethod(index) {
        return index + (this.reqData.page - 1)*20 + 1
      },
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
