<template>
  <el-form class="action-handle-wrap" label-width="120px" :inline="true"
           label-position="right">
    <p class="tips">合同-{{cTitle}}</p>
    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="商户名称">
            <span class="span-val">{{merchant.merchantName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人">
            <span class="span-val">{{merchant.leaderName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <template v-if="pageStatus === 'review'">
            <el-form-item label="商场名称">
              <span class="span-val">{{merchant.marketName}}</span>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="负责人联系电话">
              <span class="span-val">{{merchant.leaderTel}}</span>
            </el-form-item>
          </template>
        </el-col>
        <el-col :span="12">
          <el-form-item label="摊位号">
            <span class="span-val">{{merchant.boothId}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="营业执照号">
            <span class="span-val">{{merchant.loginNumber}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同签订时间">
            <span class="span-val">{{merchant.createTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="合同开始日期">
            <span class="span-val">{{merchant.rentBeginTime}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同结束日期">
            <span class="span-val">{{merchant.rentEndTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <p class="tips">
      费用列表
      <el-button v-if="false" class="btn-76" type="primary" @click="viewContract">查看合同</el-button>
    </p>
    <div class="c-table-wrap">
      <curTable :itemList="itemListInfo.refundDTO"/>
    </div>

    <div>
      <el-form label-width="110px" :model="submitData" ref="submitData" :inline="true" :rules="rules"
               label-position="right">
        <!--退款申请-->
        <template v-if="pageStatus === 'apply'">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="未退金额">
                <span class="span-val">{{itemListInfo.noRefundAmount}}元</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="已退金额">
                <span class="span-val">{{itemListInfo.retiredAmount}}元</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="选择退款金额">
                <span class="span-val">{{itemListInfo.noRefundAmount}}元</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="退款金额" prop="refundAmount">
                <el-input class="c-el-input" clearable v-model.trim="submitData.refundAmount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <template v-if="pageStatus === 'review'">
          <el-form class="action-handle-wrap" :model="itemData" :rules="rules2" ref="itemData" label-width="120px"
                   :inline="true"
                   label-position="right">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="未退金额">
                  <span class="span-val">{{itemListInfo.noRefundAmount}}元</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="已退金额">
                  <span class="span-val">{{itemListInfo.retiredAmount}}元</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="退款金额">
                  <span class="span-val">{{itemListInfo.refundAmount}}元</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="退款人">
                  <span class="span-val">{{itemListInfo.createUserName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="退款时间">
                  <span class="span-val">{{itemListInfo.createTime}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="审核结果">
                  <el-radio-group v-model.trim="itemData.conclusion">
                    <el-radio :label="4">通过</el-radio>
                    <el-radio :label="3">不通过</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="itemData.conclusion === 3">
              <el-col :span="12" class="input-textarea-box">
                <el-form-item label="备注" prop="comment">
                  <el-input type="textarea" v-model.trim="itemData.comment"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
        <template v-if="pageStatus === 'refunds'">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="未退金额">
                <span class="span-val">{{itemListInfo.noRefundAmount}}元</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="已退金额">
                <span class="span-val">{{itemListInfo.retiredAmount}}元</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="退款金额">
                <span class="span-val">{{itemListInfo.refundAmount}}元</span>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </el-form>
    </div>

    <div class="footer-wrap">
      <el-button class="btn-120" type="primary" @click="submit">{{cBtnName}}</el-button>
      <el-button class="btn-120" type="default" @click="cancel">
        取消
      </el-button>
    </div>

    <!--合同详情-->
    <detailDialog ref="detailDialog" :curType="2" :itemDetail="itemDetail"/>
  </el-form>

</template>

<script>
  import curTable from './_/table'
  import Api from '@/api/financial'
  import detailDialog from '../_/detailDialog'
  import {contractDetailMixin, ajaxData} from '@/utils/mixin'

  export default {
    name: 'contractApplyRef',
    // name:'contractRefReview',
    // name:'contractRef',
    mixins: [contractDetailMixin, ajaxData],
    data() {
      const refundAmount = (rule, value, callback) => {
        value = value.toString();
        if (!value || !value.trim()) {
          return callback(new Error('请输入大于零的数字值'));
        }
        setTimeout(() => {
          if (!/^\d+(\.\d+)?$/.test(value.trim()) || value.trim() <= 0) {
            callback(new Error('请输入正确的的数字值'));
          }else if(value.trim() > this.itemListInfo.noRefundAmount){
            callback(new Error('退款金额不得大于收款金额'));
          }else{
            callback();
          }
        }, 100);
      };
      return {
        name: '',
        pageStatus: '', //当前页面状态 apply:申请；review:审核；refunds:退款
        contractBatchNum: '',
        itemData: {
          conclusion: 4,
          comment: '',
          contractBatchNum: '',
          refundId: ''
        },
        submitData: {
          contractBatchNum: '',
          refundAmount: ''
        },
        rules: {
          refundAmount: [
            {required: true, validator: refundAmount, trigger: 'blur'}
          ]
        },
        rules2: {
          comment: [
            {required: true, message: '请输入备注内容', trigger: 'blur'}
          ]
        },
        itemDetail: {}, //单个合同详情
      }
    },
    computed: {
      cTitle() {
        let title = '';
        switch (this.pageStatus) {
          case 'apply':
            title = '退款申请';
            break;
          case 'review':
            title = '退款审核';
            break;
          case 'refunds':
            title = '退款';
            break;
          default:
            title = '--'
        }
        return title
      },
      cBtnName() {
        let name = '';
        switch (this.pageStatus) {
          case 'apply':
            name = '提交';
            break;
          case 'review':
            name = '保存';
            break;
          case 'refunds':
            name = '退款';
            break;
          default:
            name = '--'
        }
        return name
      },
    },
    components: {
      curTable,
      detailDialog
    },
    mounted() {
      this.contractBatchNum = this.$route.params.contractBatchNum || '';
      this.pageStatus = this.$route.meta.type;
      this.getDetailData(this.contractBatchNum);
    },
    methods: {
      cancel() {
        this.$router.push({path: '/finance/contractRefunds'})
      },
      getDetailData(contractBatchNum) {
        this.ajaxGet({
          url: `${Api.contractRefunds}/${contractBatchNum}`,
          callBack: (res) => {
            this.merchant = res.data.merchant;
            this.itemListInfo = res.data;
          }
        });
      },
      submit() {
        if (this.pageStatus === 'apply') { //退款申请
          this.submitData.contractBatchNum = this.contractBatchNum;
          this.ajaxPost({
            url: Api.contractRefund,
            data: this.submitData,
            validateModel: 'submitData',
            callBack: (res) => {
              this.$router.push('/finance/contractRefunds')
            }
          });
        } else if (this.pageStatus === 'review') { //退款审核
          this.itemData.refundId = this.itemListInfo.refundId;
          this.itemData.contractBatchNum = this.contractBatchNum;
          this.ajaxPost({
            url: Api.contractAudit,
            data: this.itemData,
            validateModel: 'itemData',
            callBack: (res) => {
              this.$message.success('成功');
              this.$router.push('/finance/contractRefunds')
            }
          });
        } else if (this.pageStatus === 'refunds') {
          this.ajaxPost({
            url: Api.contractCostsRefund,
            data: {
              contractBatchNum: this.contractBatchNum,
              refundId: this.itemListInfo.refundId
            },
            callBack: (res) => {
              this.$router.push('/finance/contractRefunds')
            }
          });
        }

      },
      // 查看合同
      async viewContract() {
        let res = await this.$http.get(`${Api.contractDetail}/${this.contractBatchNum}`);
        if (res) {
          this.itemDetail = res.data;
          this.$refs.detailDialog.showDialog();
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .action-handle-wrap {
    padding-bottom: 30px;
    & > div {
      padding: 16px 16px 0;
    }
    .tips {
      font-size: 12px;
      background: #FAFAFA;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      .btn-76 {
        float: right;
        margin-top: 4px;
        padding: 8px 12px;
      }
    }
    .el-col {
      height: 40px;
      line-height: 40px;
      margin-bottom: 12px;
      .span-val {
        vertical-align: middle;
        color: #9B9B9B;
      }
    }
    .c-table-wrap {
      padding-bottom: 16px;
    }
    .footer-wrap {
      text-align: center;
    }
  }
</style>
<style lang="less">
  .action-handle-wrap {
    .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td {
      background-color: #fff
    }
    .c-el-input {
      width: 200px;
    }
    .footer-wrap {
      button:nth-child(2) {
        margin-left: 30px;
      }
    }
    .input-textarea-box {
      height: inherit !important;
      & > div {
        width: 100%;
        .el-form-item__content {
          width: calc(~'100% - 120px');
        }
      }
    }
  }
</style>
