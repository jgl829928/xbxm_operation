<template>
  <div class="sign-handle-wrap">
    <template v-if="!isPreview">
      <h4>客户{{curType === 'new'?'新':'续'}}签合同</h4>
      <el-form class="c-detail-form" :model="itemData" :rules="rules" ref="itemData" label-width="124px"
               label-position="right">
        <el-row>
          <el-col :span="8">
            <el-form-item label="商户名称">
              <span>{{baseInfo.merchantName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品类-品牌">
              <span>{{baseInfo.brandName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册号">
              <span>{{baseInfo.loginNumber}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="负责人">
              <span>{{baseInfo.leaderName}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset="8" :span="8">
            <el-form-item label="负责人身证号">
              <span>{{baseInfo.leaderCard}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="curType === 'renew'">
          <el-col :span="24">
            <el-form-item label="续签类型" prop="signType"
                          :rules=" curType === 'renew' ? rules.signType:[{ required: false }]">
              <el-select v-model.trim="itemData.signType" class="sign-type-select" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in signTypeList"
                  :key="index"
                  :label="item.desc"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="摊位号"
                          :prop="'contractQuery' + '.boothId'"
                          :rules="{
                            required: true, message: '请选择摊位号', trigger: 'change'
                          }">
              <el-select
                v-model.trim="itemData.contractQuery.boothId"
                multiple
                collapse-tags
                @change="boothIdChange"
                placeholder="请选择">
                <el-option
                  v-for="(item,index) in boothList"
                  :key="index"
                  :label="item.boothNumber"
                  :value="item.boothCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="使用面积" prop="useableAcreage">
              <el-input clearable v-model.trim="itemData.useableAcreage"></el-input>
              <label>m²</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司参考单价">
              <span>{{managementPrice}}元/平米/月</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="公摊比例" prop="publicScale">
              <el-input clearable v-model.trim="itemData.publicScale"></el-input>
              <label>%</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计租面积"
                          :prop="'contractQuery' + '.rentAcreage'"
                          :rules="{
                            required: true, validator: rentAcreageDecimal, trigger: 'blur'
                          }">
              <el-input clearable v-model.trim="itemData.contractQuery.rentAcreage"></el-input>
              <label>m²</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="摊位单价" prop="boothPrice">
              <el-input clearable v-model.trim="itemData.boothPrice"></el-input>
              <label>元/平米/月</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="curType === 'new'">
          <el-col :span="24">
            <el-form-item label="商户类型">
              <el-radio-group class="cur-radio-group" v-model.trim="itemData.merchantType">
                <el-radio :label="2">开张前签约</el-radio>
                <el-radio :label="1">开张后签约</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-show="isAfterOpen">
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同开始时间"
                            prop="rentBeginTime"
                            :rules=" isAfterOpen ? rules.rentBeginTime:[{ required: false }]">
                <el-date-picker
                  v-model.trim="itemData.rentBeginTime"
                  type="date"
                  @change="_checkTime(itemData, 'rent')"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同结束时间"
                            prop="rentEndTime"
                            :rules=" isAfterOpen ? rules.rentEndTime:[{ required: false }]">
                <el-date-picker
                  v-model.trim="itemData.rentEndTime"
                  type="date"
                  @change="_checkTime(itemData, 'rent')"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="租赁期/合同期"
                            prop="rentPeriod"
                            :rules=" isAfterOpen ? rules.rentPeriod:[{ required: false }]">
                <el-input clearable v-model.trim="itemData.rentPeriod"></el-input>
                <label>月</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="优惠开始时间"
                            prop="discountsBeginTime"
                            :rules=" isAfterOpen ? rules.discountsBeginTime:[{ required: false }]">
                <el-date-picker
                  v-model.trim="itemData.discountsBeginTime"
                  type="date"
                  @change="_checkTime(itemData, 'discounts')"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="优惠结束日时间"
                            prop="discountsEndTime"
                            :rules=" isAfterOpen ? rules.discountsEndTime:[{ required: false }]">
                <el-date-picker
                  v-model.trim="itemData.discountsEndTime"
                  type="date"
                  @change="_checkTime(itemData, 'discounts')"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="优惠期"
                            prop="discountsPeriod"
                            :rules=" isAfterOpen ? rules.discountsPeriod:[{ required: false }]">
                <el-input clearable v-model.trim="itemData.discountsPeriod"></el-input>
                <label>月</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="计租开始时间"
                            prop="hireBeginTime"
                            :rules=" isAfterOpen ? rules.hireBeginTime:[{ required: false }]">
                <el-date-picker
                  v-model.trim="itemData.hireBeginTime"
                  type="date"
                  @change="_checkTime(itemData, 'hire')"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计租结束日时间"
                            prop="hireEndTime"
                            :rules=" isAfterOpen ? rules.hireEndTime:[{ required: false }]">
                <el-date-picker
                  v-model.trim="itemData.hireEndTime"
                  type="date"
                  @change="_checkTime(itemData, 'hire')"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计租期"
                            prop="hirePeriod"
                            :rules=" isAfterOpen ? rules.hirePeriod:[{ required: false }]">
                <el-input clearable v-model.trim="itemData.hirePeriod"></el-input>
                <label>月</label>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-show="!isAfterOpen">
          <el-row>
            <el-col :span="8">
              <el-form-item label="租赁期/合同期"
                            prop="rentPeriod"
                            :rules=" !isAfterOpen ? rules.rentPeriod:[{ required: false }]">
                <el-input clearable v-model.trim="itemData.rentPeriod"></el-input>
                <label>月</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="优惠期"
                            prop="discountsPeriod"
                            :rules=" !isAfterOpen ? rules.discountsPeriod:[{ required: false }]">
                <el-input clearable v-model.trim="itemData.discountsPeriod"></el-input>
                <label>月</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计租期"
                            prop="hirePeriod"
                            :rules=" !isAfterOpen ? rules.hirePeriod:[{ required: false }]">
                <el-input clearable v-model.trim="itemData.hirePeriod"></el-input>
                <label>月</label>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="首付周期"
                          prop="downPaymentPeriod">
              <el-input clearable v-model.trim="itemData.downPaymentPeriod"></el-input>
              <label>月</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="摊位租金/商铺租金">
              <el-input disabled v-model.trim="itemData.totalAmount"></el-input>
              <label>元</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="优惠扣回" prop="deductDiscountsDay">
              <el-input clearable v-model.trim="itemData.deductDiscountsDay"></el-input>
              <label>天</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="input-textarea-box" label="备注" prop="contractComment">
              <el-input type="textarea" maxlength="200" v-model.trim="itemData.contractComment"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <p class="cost-title">费用列表</p>
        <signTable
          ref="signTable"
          :costList="itemData.contractCostPhaseList"
          :baseCostObj="baseCostObj"/>
        <el-row>
          <el-col :span="24">
            <el-form-item class="manager-box" label="楼层经理" prop="empId">
              <el-select class="el-input-h" :disabled="cueIsManager" v-model.trim="itemData.empId" @change="_changeManager"
                         placeholder="请选择">
                <el-option
                  v-for="item in managerList"
                  :key="item.empId"
                  :label="item.employeeName"
                  :value="item.empId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="c-detail-footer-box">
        <el-button type="primary" @click="nextHandle">下一步</el-button>
        <el-button class="cancel-btn" type="primary" @click="cancelHandle">取消</el-button>
      </div>
    </template>
    <template v-else>
      <confirmView :preContract="preContract"
                   :contractDetail="contractDetail"
                   :itemData="itemData"
                   :curBoothNum="curBoothNum"
                   @prvHandle="isPreview=false"/>
    </template>
  </div>
</template>
<script>
  import Api from '@/api/contact'
  import signTable from './signTable'
  import confirmView from './confirmView'

  export default {
    data() {
      const decimal = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.errMsg[rule.field]));
        }
        if (!/(^[0-9]{1,18}$)|(^[0-9]{1,18}[\.]{1}[0-9]{1,2}$)/.test(value)) {
          callback(new Error("只能输入数字且最多两位小数"));
        } else {
          if (rule.field === "publicScale") {
            if (parseFloat(value) > 100) {
              callback(new Error("公摊比例不能超过100"));
            }
          }
          callback();
        }
      };
      const integer = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.errMsg[rule.field]));
        }
        if (!/^(0|[1-9]\d{0,18})$/.test(value)) {
          callback(new Error("请填写整数"));
        } else {
          callback();
        }
      };
      return {
        isPreview: false,
        curType: "new", // 页面状态 new：合同，renew：续签，
        itemData: {
          signType: "",
          useableAcreage: "",
          publicScale: "",
          boothPrice: "",
          merchantType: 1,
          rentBeginTime: "",
          rentEndTime: "",
          discountsBeginTime: "",
          discountsEndTime: "",
          hireBeginTime: "",
          hireEndTime: "",
          downPaymentPeriod: "",
          totalAmount: "",
          contractComment: "",
          rentPeriod: "",
          discountsPeriod: "",
          deductDiscountsDay: "",
          hirePeriod: "",
          contractQuery: {
            boothId: [],
            rentAcreage: ""
          },
          marketEmployee: {empId: "", employeeName: ""},
          empId: "",
          contractCostPhaseList: [
            {
              costPhase: "",
              startPayTime: "",
              expectPayTime: "",
              contractCostDetailList: []
            }
          ]
        },
        rentAcreageDecimal: decimal, // 小数检验
        cueIsManager: false, //当前角色是否是楼层经理
        signTypeList: [],
        curMerchantCode: "", // 当前MerchantCode
        baseInfo: {}, // 基本信息
        managementPrice: 0, // 公司参考单价
        baseCostObj: {
          // 初始费用列表
          costPhase: "",
          startPayTime: "",
          expectPayTime: "",
          contractCostDetailList: []
        },
        boothList: [], // 摊位号
        curBoothNum:'', // 选择的第一个摊位号
        managerList: [], // 楼层经理
        preContract: [], // 合同名称
        contractDetail: {}, // 合同预览基础信息
        rules: {
          useableAcreage: [
            {required: true, validator: decimal, trigger: "blur"}
          ],
          publicScale: [
            {required: true, validator: decimal, trigger: "blur"}
          ],
          boothPrice: [
            {required: true, validator: decimal, trigger: "blur"}
          ],
          signType: [
            {required: true, message: "请选择续签类型", trigger: "change"}
          ],
          rentBeginTime: [
            {required: true, message: "请选择合同开始时间", trigger: "change"}
          ],
          rentEndTime: [
            {required: true, message: "请选择合同结束时间", trigger: "change"}
          ],
          discountsBeginTime: [
            {required: true, message: "请选择优惠开始时间", trigger: "change"}
          ],
          discountsEndTime: [
            {required: true, message: "请选择优惠结束日时间", trigger: "change"}
          ],
          hireBeginTime: [
            {required: true, message: "请选择计租开始时间", trigger: "change"}
          ],
          hireEndTime: [
            {required: true, message: "请选择计租结束日时间", trigger: "change"}
          ],
          empId: [
            {required: true, message: "请选择楼层经理", trigger: "change"}
          ],
          rentPeriod: [
            {required: true, validator: integer, trigger: 'blur'}
          ],
          discountsPeriod: [
            {required: true, validator: integer, trigger: 'blur'}
          ],
          hirePeriod: [
            {required: true, validator: integer, trigger: 'blur'}
          ],
          downPaymentPeriod: [
            {required: true, validator: integer, trigger: 'blur'}
          ],
          totalAmount: [
            {required: true, validator: decimal, trigger: 'blur'}
          ],
          deductDiscountsDay: [
            {required: true, validator: integer, trigger: 'blur'}
          ],
          contractComment: [
            {required: true, message: '请填写备注', trigger: 'blur'}
          ]
        },
        errMsg: {
          useableAcreage: '请输入使用面积',
          publicScale: '请输入公摊比例',
          boothPrice: '请输入摊位单价',
          totalAmount: '请填写摊位租金/商铺租金',
          discountsPeriod: '请填写优惠期',
          hirePeriod: '请填写计租期',
          downPaymentPeriod: '请填写首付周期',
          deductDiscountsDay: '请填写优惠扣回',
          rentPeriod: '请填写租赁期/合同期',
          'contractQuery.rentAcreage': '计租面积不能为空',
        }
      };
    },
    computed: {
      isAfterOpen() {
        return this.itemData.merchantType === 1 || this.curType === "renew";
      },
      curEmpId() {
        return this.$store.getters.currentUser.userId;
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let merchantCode = this.$route.params.merchantCode || '';
        if (!merchantCode) return false;
        this.curType = this.$route.meta.type || '';
        this.curMerchantCode = merchantCode;
        this.initInfo();
      },
      async initInfo() {
        // 基础信息&摊位号
        let [booth, baseInfo] = await this.$http.all([
          this.$http.get(Api.boothStatus),
          this.$http.get(
            `${Api.contractsBaseInfo}?merchantCode=${this.curMerchantCode}`
          )
        ]);
        if (booth) {
          this.boothList = booth.data;
        }
        if (baseInfo) {
          let data = baseInfo.data,
            contractDetail = data.contractDetail,
            costList = data.contractExpenceList;
          this.contractDetail = contractDetail;
          this.signTypeList = data.signTypeList;
          let {
            merchantName,
            loginNumber,
            leaderName,
            leaderCard
          } = contractDetail.merchant;
          this.getManagerList(contractDetail.market.marketCode);
          this.baseInfo = {
            merchantName,
            loginNumber,
            leaderName,
            leaderCard,
            brandName: contractDetail.brand.brandName
          };
          for (let i = 0; i < costList.length; i++) {
            this.baseCostObj.contractCostDetailList.push({
              costProperty: costList[i].expenceName,
              costAmount: "",
              costPeriod: [],
              incomeProperty: costList[i].expenceIncome.code
            });
          }
          // if(this.curType === 'new')
          this.itemData.contractCostPhaseList = [
            JSON.parse(JSON.stringify(this.baseCostObj))
          ];
        }
      },
      async getManagerList(marketCode) {
        // 楼层经理
        let res = await this.$http.get(
          `${Api.getFloorManagers}?marketCodes=[${marketCode}]`
        );
        if (res) {
          this.managerList = res.data;
          for (let i = 0; i < this.managerList.length; i++) {
            if (this.managerList[i].empId === this.curEmpId) {
              this.itemData.empId = this.managerList[i].empId;
              this.itemData.marketEmployee = {
                empId: this.managerList[i].empId,
                employeeName: this.managerList[i].employeeName
              };
              this.cueIsManager = true;
              break;
            }
          }
        }
      },
      nextHandle() {
        this.$refs["itemData"].validate(async valid => {
          if (valid) {
            if (this.$refs.signTable._checkValidData() === 1) {
              //数据校验
              return this.$message.error("请选择缴费周期");
            } else if (!this.$refs.signTable._checkValidData()) {
              return this.$message.error("请核对费用周期与金额是否有效");
            }
            let res = await this.$http.get(Api.preContract);
            if (res) this.preContract = res.data;
            this.isPreview = true;
          } else {
            return false;
          }
        });
      },
      boothIdChange(val) {
        //同步查找公司参考单价
        if (val.length) {
          let firstVal = val[0];
          for (let i = 0; i < this.boothList.length; i++) {
            if (firstVal === this.boothList[i].boothCode) {
              this.curBoothNum = this.boothList[i].boothNumber;
              return (this.managementPrice = this.boothList[i].boothPrice);
            }
          }
        } else {
          this.managementPrice = 0;
        }

      },
      _checkTime(item, type) {
        // 开始&结束时间限制
        if (!item[`${type}BeginTime`] || !item[`${type}EndTime`]) return false;
        if (new Date(item[`${type}EndTime`]) < new Date(item[`${type}BeginTime`]))
          item[`${type}EndTime`] = item[`${type}BeginTime`];
      },
      _changeManager(id) {
        for (let i = 0; i < this.managerList.length; i++) {
          if (id === this.managerList[i].empId) {
            this.itemData.marketEmployee = {
              empId: this.managerList[i].empId,
              employeeName: this.managerList[i].employeeName
            };
            return false;
          }
        }
      },
      cancelHandle() {
        this.$router.push("/contact/sign");
      }
    },
    components: {
      signTable,
      confirmView
    },
    /*watch: {
      '$route'() {
        this.$refs['itemData'].resetFields();
        this.init();
      }
    }*/
  };
</script>
<style lang="less" scoped>
  .sign-handle-wrap {
    padding-bottom: 90px;
    h4 {
      font-size: 16px;
      color: #444;
      text-align: center;
      font-weight: bold;
    }
    .c-detail-form {
      padding: 30px;
      .el-form-item__content {
        & > span {
          color: #9b9b9b;
        }
        & > label {
          margin-left: 4px;
        }
      }
    }
    .cost-title {
      height: 38px;
      line-height: 38px;
      padding-left: 32px;
      background: #fff7f2;
      margin-top: 28px;
    }
  }
</style>
<style lang="less">
  .sign-handle-wrap {
    .c-detail-form {
      input {
        font-size: 12px;
      }
      .el-form-item {
        .el-form-item__label,
        .el-form-item__content {
          line-height: 30px;
          font-size: 12px;
        }
        .el-input__icon {
          line-height: 30px;
        }
        .el-input {
          width: 170px;
          input {
            height: 30px;
            line-height: 30px;
          }
        }
      }
      .el-row {
        & > div > div {
          display: inline-block;
          width: 360px;
          text-align: left;
          &.input-textarea-box {
            width: calc(~"100% - 66px");
            min-width: 934px;
          }
        }
        & > div:last-child {
          text-align: right;
        }
        & > div:first-child {
          text-align: left;
        }
        & > div {
          text-align: center;
        }
      }
      .sign-type-select {
        .el-input input {
          width: 170px;
          height: 30px !important;
          line-height: 30px;
        }
      }
      .cur-radio-group{
        label.el-radio{
          .el-radio__label{
            font-size: 12px;
          }
        }
      }
      .manager-box{
        .el-form-item__label{
          height: 36px;
          line-height: 36px;
        }
      }
    }
  }
</style>
