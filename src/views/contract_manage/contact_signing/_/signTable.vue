<template>
  <div class="sign-handle-table">
    <el-form class="c-detail-form" :model="itemData" ref="itemData"
             label-position="right">
      <table border="0" cellspacing="0">
        <thead>
          <tr class="only-word">
            <th>期数</th>
            <th>费用类型</th>
            <th>费用周期</th>
            <th>金额（元）</th>
            <th>缴费开始日期</th>
            <th>约定缴费日期/缴费结束日期</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody v-for="(item,index) in costList" :key="index">
          <tr>
            <td :rowspan="item.contractCostDetailList.length+2">{{index+1}}</td>
          </tr>
          <tr v-for="(v,i) in item.contractCostDetailList" :key="i">
            <td>
              <span class="type-name">{{v.costProperty}}</span>
            </td>
            <td>
              <el-date-picker
                v-model.trim="v.costPeriod"
                class="picker-time-interval"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </td>
            <td>
              <input class="amount-input"
                        v-model.number.lazy="v.costAmount"
                        @input="handleInput"
                        @blur="toFixedTwo(v)"
                        placeholder="0.00"/>
            </td>
            <td v-if="i===0" :rowspan="item.contractCostDetailList.length+1" class="td-date-box">
              <el-form-item>
                <el-date-picker
                  class="picker-pay-time"
                  v-model.trim="item.startPayTime"
                  :clearable="false"
                  type="date"
                  value-format="yyyy-MM-dd"
                  @change="_checkTime(item)"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </td>
            <td v-if="i===0" :rowspan="item.contractCostDetailList.length+1" class="td-date-box">
              <el-form-item>
                <el-date-picker
                  class="picker-pay-time"
                  v-model.trim="item.expectPayTime"
                  :clearable="false"
                  type="date"
                  value-format="yyyy-MM-dd"
                  @change="_checkTime(item)"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </td>
            <td v-if="index===0 && i===0" :rowspan="item.contractCostDetailList.length+1">...</td>
            <td v-else-if="index!==0 && i===0" :rowspan="item.contractCostDetailList.length+1">
                <i class="del-btn el-icon-remove-outline" @click="removeSubItem(index)"></i>
            </td>
          </tr>
          <tr class="only-word">
            <td>合计</td>
            <td>...</td>
            <td>
              {{ (totalMoneyList[index] ? totalMoneyList[index] : '0.00') | fixedTwo }}
            </td>
          </tr>
        </tbody>

        <tbody>
          <tr class="only-word">
            <td colspan="7" class="add-item-btn">
                <span @click="addSubItem">
                  <em>+</em>
                  添加周期费用
                </span>
            </td>
          </tr>
          <tr class="only-word">
            <td>合计</td>
            <td>...</td>
            <td></td>
            <td>{{sumMoney ? sumMoney : '0.00'}}</td>
            <td>...</td>
            <td>...</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </el-form>
  </div>
</template>
<script>
export default {
  props:['costList','baseCostObj'],
  data() {
    return {
      itemData:{},
      totalMoneyList: [],
      curTotalMoney: ''
    }
  },
  computed:{
    sumMoney() {
      this.totalMoneyList = this.costList.map(
        row => row.contractCostDetailList.map(
          item => item.costAmount ).reduce( (acc, cur) => (parseFloat(cur || 0) + acc), 0)
      );
      this.curTotalMoney = this.totalMoneyList.reduce( (acc, cur) => (parseFloat(cur) + acc), 0);
      if(this.curTotalMoney) this.curTotalMoney = parseFloat(this.curTotalMoney).toFixed(2);
      return this.curTotalMoney
    },
    stagingBaseCost() {
      let stagingCostObj = JSON.parse(JSON.stringify(this.baseCostObj));
      let contractCostDetailList = stagingCostObj.contractCostDetailList, stagingCost = [];
      for (let i=0; i<contractCostDetailList.length; i++){
        if(contractCostDetailList[i].costProperty === '商家综合管理费' || contractCostDetailList[i].costProperty === '商铺租金'){
          stagingCost.push(contractCostDetailList[i])
        }
      }
      stagingCostObj.contractCostDetailList = stagingCost;
      return stagingCostObj
    }
  },
  methods: {
    toFixedTwo(item) {
      if(item.costAmount) item.costAmount = parseFloat(item.costAmount).toFixed(2);
    },
    handleInput(e){
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
    },
    removeSubItem(i) {
      this.costList.splice(i, 1)
    },
    addSubItem() {
      if(this._checkValidData() === 1){
        return this.$message.error('请选择缴费周期');
      }else if(!this._checkValidData()){
        return this.$message.error('请核对费用周期与金额是否有效');
      }
      this.costList.push(JSON.parse(JSON.stringify(this.stagingBaseCost)))
    },
    _checkValidData() { // 校验数据是否有效
      let arr = this.costList;
      let status = {
        hasRight:false,
        hasErr:false,
      }, singleSta = false;
      for(let i=0, len=arr.length; i<len; i++){
        singleSta = false;
        if(!arr[i].startPayTime || !arr[i].expectPayTime) return 1;
        let list = arr[i].contractCostDetailList;
        for(let j=0; j<list.length; j++){
          let costPeriodLen = list[j].costPeriod ? list[j].costPeriod.length : 0;
          if(!list[j].costAmount && !costPeriodLen) {
            continue;
          }else if(list[j].costAmount && costPeriodLen) {
            status.hasRight = true;
            singleSta = true
          }else {
            status.hasErr = true;
          }
        }
        if(!singleSta) return false
      }
      if(status.hasErr) {
        return false;
      }else if(status.hasRight) {
        return true;
      }else {
        return false;
      }
    },
    _checkTime(item) { // 开始&结束时间限制
      if(!item.expectPayTime || !item.startPayTime) return false;
      if(new Date(item.expectPayTime) < new Date(item.startPayTime)) item.expectPayTime = item.startPayTime;
    }
  },
  filters:{
    fixedTwo(v) {
      if(v) return parseFloat(v).toFixed(2);
      return 0.00
    }
  }
};
</script>
<style lang="less" scoped>
  .sign-handle-table{
    overflow: auto;
    padding: 20px 0 30px;
    table{
      border: 1px solid #e1e1e1;
      border-radius: 6px;
      text-align: center;
      width: 100%;
      th,td{
        text-align: center;
        padding: 2px 10px;
      }
      th{
        font-weight: bold;
        color: #90939A;
        border: 1px solid #e1e1e1;
      }
      td{
        font-size: 12px;
        color: #4A4A4A;
        border: 1px solid #e1e1e1;
        .del-btn{
          font-size: 16px;
          color: #FF7623;
          cursor: pointer;
        }
      }
      td.add-item-btn{
        background: #FFF7F2;
        span{
          cursor: pointer;
        }
        em{
          font-size: 24px;
          color: #FF7623;
          vertical-align: middle;
          height: 16px;
          line-height: 10px;
          display: inline-block;
        }
      }
      tr.only-word{
        td,th{
          padding: 12px;
        }
      }
      .type-name{
        display: inline-block;
        min-width: 84px;
      }
    }
  }
</style>
<style lang="less">
  .sign-handle-table{
    div.picker-time-interval.el-range-editor.el-input__inner{
      padding: 3px 0;
      width: 220px;
      border: none;
      &>i.el-input__icon, &>input.el-range-input, &>span.el-range-separator{
        line-height: 34px;
      }
    }
    .c-detail-form .el-form-item div.picker-pay-time.el-input{
      width: 130px;
    }
    .td-date-box>.el-form-item{
      margin-bottom: 0;
    }
    input[type='radio']{
      outline: none;
    }
    td{
      &>.el-form-item{
        display: inline-block;
      }
      .amount-input{
        height: 30px;
        line-height: 30px;
        width: 100px;
        border-radius: 6px;
        border: 1px solid #FFF1E9;
        padding: 0 15px;
        color: #4A4A4A;
      }
      .amount-input:focus{
        border: 1px solid #FF7623;
        outline: 0;
      }
      /*.amount-input.el-input{
        input{
          height: 30px;
          line-height: 30px;
          width: 100px;
          border-radius: 6px;
        }
        .el-input__inner{
          border: 1px solid #FFF1E9;
        }
        .el-input__inner:focus{
          border-color: #FF7623;
          outline: 0;
        }
      }*/
    }
    .sign-range-editor{
      border: none;
      width: 264px;
      .el-range__icon{
        color: #FF7623;
      }
      .el-range-input, .el-range-separator{
        font-size: 12px;
        color: #4A4A4A;
        /*border-color: #e1e1e1;*/
      }
    }
  }

</style>
