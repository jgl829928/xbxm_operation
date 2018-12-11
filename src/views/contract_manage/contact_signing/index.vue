<template>
  <div class="g-contract-siging">
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="110px" :inline="true" label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商户名称">
            <el-input clearable v-model.trim="reqData.merchantName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营品牌">
            <el-select v-model.trim="reqData.brandCode" clearable placeholder="请选择">
              <el-option v-for="(item, index) in brandsList" :key="index" :label="item.brandName" :value="item.brandCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="负责人">
            <el-input clearable v-model.trim="reqData.leaderName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="负责人联系电话">
            <el-input clearable v-model.trim="reqData.leaderTel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :offset="8" :span="8">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="c-table-wrap">
      <el-table :data="itemList" style="width: 100%" height="500" align="center" stripe>
        <el-table-column align="center" type="index" label="序号" width="50" :index="indexMethod">
        </el-table-column>
        <el-table-column align="center" prop="merchantName" label="商户名称" min-width="120">
        </el-table-column>
        <el-table-column align="center" prop="merchantCode" label="商户编号" min-width="160">
        </el-table-column>
        <el-table-column align="center" label="商户性质">
          <template slot-scope="scope">
            <span>{{ scope.row.merchantNature ? scope.row.merchantNature.desc : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="loginNumber" label="注册号" min-width="160">
        </el-table-column>
        <el-table-column align="center" prop="leaderName" label="负责人">
        </el-table-column>
        <el-table-column align="center" prop="leaderTel" label="负责人联系电话" min-width="120">
        </el-table-column>
        <el-table-column align="center" prop="mainBrandName" label="经营品牌" min-width="120">
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="登记时间" min-width="165">
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right" min-width="200">
          <template slot-scope="scope">
            <el-button :disabled="!checkKey('sign_1')" class="btn-handle" type="primary" @click="signing(scope.row.merchantCode, 'new')">新签</el-button>
            <el-button :disabled="!checkKey('sign_2')" class="btn-handle" type="primary" @click="signing(scope.row.merchantCode, 'renew')">续签</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <pagenation :pageparams="pageInfo" :itemList="itemList" @handlePage="handlePage" />
  </div>
</template>

<script>
  import Api from '@/api/contact'
  import { pageListMixin } from '@/utils/mixin'
  export default {
    name: 'contactSign',
    mixins: [pageListMixin],
    data() {
      return {
        reqData: {
          merchantName: '',
          brandCode: '',
          leaderName: '',
          leaderTel: ''
        },
        brandsList: [],
      }
    },
    mounted() {
      this.getList(Api.contractSign);
      this.getBrandsLists();
    },
    methods: {
      async getBrandsLists() {
        let res = await this.$http.get(Api.brandsLists);
        if (res && res.code === 0) {
          this.brandsList = res.data;
        }
      },
      search() {
        this.reqData.currentPage = 1;
        this.getList(Api.contractSign);
      },
      signing(merchantCode, type) {
        this.$router.push({ name: `${type}Handle`, params: { merchantCode: merchantCode } })
      }
    }
  };
</script>
<style lang="less">
  .g-contract-siging {
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
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
    color: #FF7623;
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