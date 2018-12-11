<template>
  <div class="confirm-view">
    <h4>合同确认</h4>
    <div class="contact-content">
      <div v-for="(v,i) in preContract" :key="i">
        <p>
          <span>{{v.desc}}</span>
          <a @click="viewContract(v.code)">预览</a>
        </p>
      </div>
    </div>
    <div class="con-verification">
      <p>填写验证码提交审核，即视为商户对协议内容确认完成且无异议</p>
      <div>
        <span>负责人手机号</span>
        <span>{{leaderTel}}</span>
      </div>
      <div class="verification-box">
        <span>验证码</span>
        <el-input v-model.trim="verificationCode" placeholder="请输入验证码"></el-input>
        <el-button class="verification-code-btn" type="primary" :disabled="!canGetCode" @click="getVerificationCode">{{messageTips}}</el-button>
      </div>
    </div>
    <div class="c-detail-footer-box">
      <el-button class="cancel-btn" type="primary" @click="prvHandle">上一步</el-button>
      <el-button type="primary" @click="submitReview">提交审核</el-button>
    </div>
    <contractTpl ref="contractTpl" :tplData="tplData"/>
  </div>
</template>
<script>
  import Api from '@/api/contact'
  import contractTpl from '../../c_html/index'
export default {
  props:['preContract','contractDetail','itemData','curBoothNum'],
  data() {
    return {
      isSubmit:false,
      isSubmitSms:false,
      tplData:{},
      validList:[], // contractCostPhaseList 有效数据
      totalMoneyList:[], //各期总价
      costDetailList:[], //格式费用详情
      tplOneTotalMoney:{ //合同1所需价格合计
        depositPrice: 0,
        cashPledge: 0,
        totalMoney: 0,
        totalRental:0,
        totalManagement:0,
        totalOperation:0,
        totalPremium:0,
        totalRun:0,
        totalAssistant:0
      },
      leaderTel:'',
      merchantCode:'',
      verificationCode:'',
      messageTips: '获取验证码',
      canGetCode: true,
    }
  },
  mounted() {
    let { leaderTel, merchantCode } = this.contractDetail.merchant;
    this.leaderTel = leaderTel.substr(0, 3) + '****' + leaderTel.substr(7);
    this.merchantCode = merchantCode;
    this._formatValidList(this.itemData.contractCostPhaseList)
  },
  methods: {
    async viewContract(code) {
      let { contractQuery } = this.itemData,
          { marketCode, merchantCode } = this.contractDetail.merchant;
      let data = {
        boothId: contractQuery.boothId.length ? contractQuery.boothId[0] : '',
        contractTplEunm: code,
        marketCode: marketCode,
        merchantCode: merchantCode,
        rentAcreage: contractQuery.rentAcreage,
        totalMoney: this.tplOneTotalMoney.totalMoney
      };
      let res = await this.$http.get(Api.previewContract,{params: data});
      if(res && res.code === 0){
        this.tplData = this._assemblyData(code, res.data);
        this.$refs.contractTpl.showDialog(code);
      }
    },
    async getVerificationCode() {
      if(!this.canGetCode) return false;
      if(this.isSubmitSms) return false;
      this.isSubmitSms = true;
      let res = await this.$http.get(`${Api.sendMessage}?merchantCode=${this.merchantCode}`);
      if(res || res.code === 0){
        this._codeCountdown();
      }else {
        return this.$message.error('网络繁忙，请稍后再试');
      }
      if(this.smsTimer) clearTimeout(this.smsTimer);
      this.smsTimer = setTimeout(()=>{
        this.isSubmitSms = false;
      },1000)
    },
    async submitReview() {
      if(!this.verificationCode) return this.$message.error('请输入验证码');
      let { merchantCode, marketCode} = this.contractDetail.merchant;
      let data = JSON.parse(JSON.stringify(this.itemData));
      delete data.empId;
      data.contractCostPhaseList = this.validList;
      data.contractQuery = {
        merchantCode: merchantCode,
        marketCode: marketCode,
        boothId: data.contractQuery.boothId,
        rentAcreage: data.contractQuery.rentAcreage
      };
      data.checkNum = this.verificationCode;
      if(!data.signType) data.signType = 1;
      if(this.isSubmit) return false;
      this.isSubmit = true;
      let res = await this.$http.post(Api.postContracts, data);
      if(res) {
        this.$message.success('操作成功');
        this.$store.commit("delete_tabs", this.$route);
        this.$router.push('/contact/sign');
      }
      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(()=>{
        this.isSubmit = false;
      },1000)
    },
    prvHandle() {
      this.$emit('prvHandle')
    },
    _assemblyData(code,resData) {
      let returnData = {};
      if(code === 1){
        let { merchantType:rank, rentBeginTime, rentEndTime, rentPeriod, hirePeriod, hireBeginTime, hireEndTime,
            discountsPeriod, discountsBeginTime, discountsEndTime, useableAcreage, publicScale, boothPrice,
            contractQuery, deductDiscountsDay, downPaymentPeriod }= this.itemData;
            useableAcreage = parseFloat(useableAcreage) || '';
            publicScale = parseFloat(publicScale) || 0;
        let hireArea = contractQuery.rentAcreage, //商铺计价面积
          contractPeriodCostList = this.validList.map(( item, i ) => {  //格式化费用列表
            return {
              "costPhase": item.costPhase,
              "costDetail": this.costDetailList[i],
              "amount": this.totalMoneyList[i],
              "startPayTime": item.startPayTime,
              "endPayTime": item.expectPayTime
            };
          }),
          rentYear = parseFloat( (parseFloat(rentPeriod) / 12).toFixed(2) ) || '';
        /*if(rank === 1) {
          rentYear = this._dateDifference(hireBeginTime, hireEndTime)
        }else if(rank === 2) {
          rentYear = parseFloat( (parseFloat(rentPeriod) / 12).toFixed(2) ) || ''
        }*/
        let data = {
          boothId: this.curBoothNum, rank, rentBeginTime, rentEndTime, rentPeriod,
          hirePeriod, hireBeginTime, hireEndTime, discountsPeriod, discountsBeginTime, discountsEndTime,
          useableAcreage, publicScale, publicAcreage: useableAcreage * parseFloat(publicScale) / 100 || '', hireArea,
          boothPrice,rentYear,downPaymentPeriod, deductDiscountsDay,
          totalMoneyChinese:resData.totalMoneyChinese,
          date:resData.date,
          contractPeriodCostList
        };
        returnData = { ...data, ...this.tplOneTotalMoney, ...resData.contractShoot }
      }else {
        returnData = resData
      }
      return returnData
    },
    _codeCountdown() {
      let countdown = 119;
      let settime = () => {
        if (countdown === 0) {
          this.canGetCode = true;
          this.messageTips = '获取验证码';
          countdown = 119;
          return false;
        } else {
          this.canGetCode = false;
          this.messageTips = `${countdown}s 后重试`;
          countdown--;
        }
        setTimeout(() => {
          settime()
        },1000 );
      };
      settime()
    },
    _formatValidList(arr) { //格式化费用列表 & 计算 depositPrice、cashPledge 总和
      if(!arr.length) return [];
      let validList = [], depositPriceList = [], cashPledgeList = [], totalMoneyList = [], totalRentalList = [] ,costDetailList = [],
          totalManagement = [], totalOperation = [], totalPremium = [], totalRun = [], totalAssistant = [];
      for(let i = 0, len = arr.length; i<len; i++) {
        let cur = arr[i].contractCostDetailList;
        validList.push({
              costPhase: i + 1 ,
              expectPayTime: arr[i].expectPayTime,
              startPayTime: arr[i].startPayTime,
              contractCostDetailList:[]
            });
        totalMoneyList.push([]); costDetailList.push([]);
        for(let j=0; j<cur.length; j++){
          if(cur[j].costPeriod.length){
            validList[i].contractCostDetailList.push(cur[j]);
            totalMoneyList[i].push(cur[j].costAmount);
            costDetailList[i].unshift(`${cur[j].costProperty}:<br/>${cur[j].costPeriod[0] || '-' }到${cur[j].costPeriod[1] || '-' },${cur[j].costAmount}元<br/>`)
          }
          if(cur[j].costProperty === '商场管理及商品质量保证金'){
            depositPriceList.push(cur[j].costAmount);
          }
          if(cur[j].costProperty === '电表押金'){
            cashPledgeList.push(cur[j].costAmount);
          }
          if(cur[j].costProperty === '商铺租金'){
            totalRentalList.push(cur[j].costAmount);
          }
          if(cur[j].costProperty === '商家综合管理费'){
            totalManagement.push(cur[j].costAmount);
          }
          if(cur[j].costProperty === '运营杂费'){
            totalOperation.push(cur[j].costAmount);
          }
          if(cur[j].costProperty === '整体保险费'){
            totalPremium.push(cur[j].costAmount);
          }
          if(cur[j].costProperty === '整体运营费'){
            totalRun.push(cur[j].costAmount);
          }
          if(cur[j].costProperty === '营业员管理基金'){
            totalAssistant.push(cur[j].costAmount);
          }
        }
      }
      this.totalMoneyList = totalMoneyList.map(item => item.reduce((acc, cur) => (parseFloat(cur || 0) + acc), 0));
      this.costDetailList = costDetailList.map(item => item.reduce((acc, cur) => cur + acc,''));
      this.tplOneTotalMoney['depositPrice'] = depositPriceList.reduce( (acc, cur) => (parseFloat(cur || 0) + acc), 0);
      this.tplOneTotalMoney['cashPledge'] = cashPledgeList.reduce( (acc, cur) => (parseFloat(cur || 0) + acc), 0);
      this.tplOneTotalMoney['totalRental'] = totalRentalList.reduce( (acc, cur) => (parseFloat(cur || 0) + acc), 0);
      this.tplOneTotalMoney['totalManagement'] = totalManagement.reduce( (acc, cur) => (parseFloat(cur || 0) + acc), 0);
      this.tplOneTotalMoney['totalOperation'] = totalOperation.reduce( (acc, cur) => (parseFloat(cur || 0) + acc), 0);
      this.tplOneTotalMoney['totalPremium'] = totalPremium.reduce( (acc, cur) => (parseFloat(cur || 0) + acc), 0);
      this.tplOneTotalMoney['totalRun'] = totalRun.reduce( (acc, cur) => (parseFloat(cur || 0) + acc), 0);
      this.tplOneTotalMoney['totalAssistant'] = totalAssistant.reduce( (acc, cur) => (parseFloat(cur || 0) + acc), 0);
      this.tplOneTotalMoney['totalMoney'] = this.totalMoneyList.reduce( (acc, cur) => (parseFloat(cur || 0) + acc), 0);
      this.validList = validList;
    },
    _dateDifference(sDate1, sDate2) {
      if(!sDate1 || !sDate2) return '';
      let dateSpan, iDays, iYear;
      sDate1 = Date.parse(sDate1);
      sDate2 = Date.parse(sDate2);
      dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      iYear = parseFloat((iDays / 365).toFixed(2));
      return iYear
    }
  },
  components:{
    contractTpl
  }
};
</script>
<style lang="less" scoped>
  .confirm-view{
    h4{
      font-size: 16px;
      color: #444;
      text-align: center;
      font-weight: bold;
    }
    p{
      font-size: 14px;
      color: #444;
    }
    .contact-content{
      overflow: hidden;
      padding: 40px 0 75px;
      &>div{
        text-align: center;
        float: left;
        width: 50%;
        margin-bottom: 20px;
      }
      &>div:nth-child(7), &>div:nth-child(8){
        margin-bottom: 0;
      }
      p{
        display: inline-block;
        width: 390px;
        text-align: left;
        a{
          color: #3F87F5;
          margin-left: 68px;
          float: right;
        }
      }
    }
    .con-verification{
      width: 396px;
      margin: 0 auto;
      &>div{
        span:first-child{
          display: inline-block;
          width: 85px;
          margin-right: 30px;
        }
      }
      &>div:nth-child(2){
        margin: 25px 0;
      }
    }
  }
</style>
<style lang="less">
  .confirm-view{
    .verification-box{
      margin-bottom: 68px;
      div.el-input{
        width: 130px;
        height: 26px;
        input {
          height: 26px;
          line-height: 26px;
        }
      }
      .verification-code-btn{
        width: 80px;
        height: 26px;
        font-size: 12px;
        padding: 0;
        line-height: 24px;
      }
    }
  }
</style>
