<template>
  <div class="g-contract-change">
    <el-form  class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true"
              label-position="right">
      <el-row>
        <el-col :span="8" :xs="24">
          <el-form-item label="商户名称">
            <el-input clearable v-model.trim="reqData.merchantName"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="8" :xs="24">
          <el-form-item label="经营品牌">
            <el-input clearable v-model.trim="reqData.brandName"></el-input>
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
      <el-table
        :data="itemList"
        style="width: 100%"
        height="500"
        align="center"
        stripe>
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          align="center"
          prop="contractBatchNum"
          label="合同批次号"
          min-width="160">
        </el-table-column>
        <el-table-column
          align="center"
          prop="marketName"
          label="商场名称"
          min-width="120">
        </el-table-column>
         <el-table-column
          align="center"
          label="合同起止日期"
          min-width="210">
          <template slot-scope="scope">
            <span v-if="scope.row.rentBeginTime"> {{scope.row.rentBeginTime}} 至 {{scope.row.rentEndTime}} </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="merchantName"
          label="商户名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="merchantCode"
          label="商户编号"
          min-width="160">
        </el-table-column>
        <el-table-column
          align="center"
          label="商户性质">
          <template slot-scope="scope">
            <span>{{scope.row.merchantNature ? scope.row.merchantNature.desc : ''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="brandName"
          label="经营品牌"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          min-width="180">
          <template slot-scope="scope">
          	<el-button class="btn-handle" type="primary">
              <router-link
                :to="{name:'conChangeHandle',params:{id:1}}">
                变更
              </router-link>
            </el-button>
            <el-button class="btn-handle" type="primary">
              终止
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <pagenation :pageparams="pageInfo" :itemList="itemList" @handlePage="handlePage"/>
  </div>
</template>

<script>
  import Api from '@/api/contact'
  import { pageListMixin } from '@/utils/mixin'
export default {
  name:'contractChange',
  mixins: [pageListMixin],
  data() {
    return {
      reqData:{
        itemCode:'',
        skuCode:'',
        itemName:'',
        shelf:'',
        operator: '',
        status:'',
        page:1,
        value:''
      },
      itemList:[
        {name:"testName"},
      ],
    }
  },
  mounted() {
    this.getList(Api.alterLists);
  },
  methods: {
    search() {
      this.reqData.currentPage = 1;
      this.getList(Api.alterLists);
    },
  }
};
</script>
<style lang="less">
	.g-contract-change{
		.c-search-form.el-form--inline .el-form-item {
      width: 100%;
      vertical-align: unset;
    }
		.u-area-input .el-form-item__content {
			width: 82%;
			vertical-align: middle;
		}
		.l-dialog .el-dialog__body {

        .el-col-12 {
        overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
      }
       .c-table-wrap {
        margin: 0 !important;
        margin-bottom: 10px !important;
      }
    }
    .el-dialog .el-form-item__content {
    	text-align: left;
    }
	}
</style>
<style lang="less" scoped>
  .u-color {
    color:#FF7623;
  }
  .u-value {
    color: #9B9B9B;
  }
  .u-unit {
    display: inline-block;
    width: 102px;
    padding-right: 12px;
    margin-bottom: 22px;
    text-align: right;
    box-sizing: border-box;
  }
  .u-secondTitle {
  	height: 40px;
  	line-height: 40px;
  	padding-left: 20px;
  	margin-bottom: 10px;
  	background: #fafafa;
  	font-size: 14px;
  }
</style>
