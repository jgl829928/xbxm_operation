<template>
  <div class="sign-handle-table">
    <el-form class="c-detail-form" ref="itemList"
             label-position="right">
      <table border="1">
        <thead>
          <tr class="only-word">
          <th>期数</th>
          <th>费用类型</th>
          <th>费用周期</th>
          <th>金额（元）</th>
          <th>缴费开始日期</th>
          <th>约定缴费日期/缴费结束日期</th>
        </tr>
        </thead>
        <tbody v-if="itemList.length" v-for="(item,index) in itemList" :key="index">
          <tr>
            <td :rowspan="item.contractCostDetailList.length+2">{{ item.costPhase }}</td>
          </tr>
          <tr class="only-word" v-for="(v,i) in item.contractCostDetailList" :key="i">
            <td>{{v.costProperty}}</td>
            <td>
              {{ v.costPeriod | timeString }}
            </td>
            <td>
              {{v.costAmount}}
            </td>
            <td v-if="i===0" :rowspan="item.contractCostDetailList.length+1" class="td-date-box">
              {{item.startPayTime}}
            </td>
            <td v-if="i===0" :rowspan="item.contractCostDetailList.length+1" class="td-date-box">
              {{item.expectPayTime}}
            </td>
          </tr>

          <tr class="only-word">
            <td>合计</td>
            <td>...</td>
            <td>
              {{totalMoneyList[index]}}
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr class="only-word">
            <td>合计</td>
            <td>...</td>
            <td>...</td>
            <td>{{sumMoney}}</td>
            <td>...</td>
            <td>...</td>
          </tr>
        </tbody>
      </table>
    </el-form>
  </div>
</template>
<script>
  export default {
    props:['itemList'],
    data() {
      return {
        totalMoneyList:[]
      }
    },
    computed:{
      sumMoney() {
        this.totalMoneyList = this.itemList.map(
          row => row.contractCostDetailList.map(
            item => item.costAmount ).reduce( (acc, cur) => (parseFloat(cur || 0) + acc), 0)
        );
        return this.totalMoneyList.reduce( (acc, cur) => (parseFloat(cur) + acc), 0);
      },
    },
    filters: {
      timeString(arr) {
        if(!arr || !arr.length) return '';
        return arr[0] + ' 至 ' + arr[1]
      }
    }
  };
</script>
<style lang="less" scoped>
  .sign-handle-table{
    padding: 20px 0 30px;
    table{
      border: 1px solid #EBEBEB;
      border-radius: 6px;
      text-align: center;
      width: 100%;
      th,td{
        text-align: center;
        padding: 2px 16px;
        border-color: #e1e1e1;
      }
      th{
        font-weight: bold;
        color: #90939A;
      }
      td{
        font-size: 12px;
        color: #4A4A4A;
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
    }
  }
</style>
<style lang="less">
  .sign-handle-table{
    .td-date-box>.el-form-item{
      margin-bottom: 0;
    }
    td{
      &>.el-form-item{
        display: inline-block;
      }
      .amount-input.el-input{
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
      }
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
      }
    }
  }

</style>
