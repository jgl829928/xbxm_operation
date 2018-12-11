<template>
  <div class="sign-handle-table">
    <el-form class="c-detail-form" :model="itemData" ref="itemData"
             label-position="right">
      <table border="1">
        <thead>
          <tr class="only-word">
            <th>期数</th>
            <th>费用类型</th>
            <th>金额（元）</th>
            <th>预订收款日期</th>
            <th>收入性质</th>
            <th>计算公式</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>摊位租金</td>
            <td>
              <el-input class="amount-input" v-model.trim="itemData.money" placeholder="请输入金额"></el-input>
            </td>
            <td>
              <el-date-picker
                class="ex-date-picker"
                v-model.trim="itemData.time"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </td>
            <td>
              {{itemData.nature}}
            </td>
            <td>
              摊位租金*结算周期/计租期
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>综合管理费</td>
            <td>
              <el-input class="amount-input" v-model.trim="itemData.money" placeholder="请输入金额"></el-input>
            </td>
            <td>
              <el-date-picker
                class="ex-date-picker"
                v-model.trim="itemData.time"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </td>
            <td>
              {{itemData.nature}}
            </td>
            <td>
              60元/年*租赁期
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>运营杂费</td>
            <td>
              <el-input class="amount-input" v-model.trim="itemData.money" placeholder="请输入金额"></el-input>
            </td>
            <td>
              <el-date-picker
                class="ex-date-picker"
                v-model.trim="itemData.time"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </td>
            <td>
              {{itemData.nature}}
            </td>
            <td>
              60元/年*租赁期
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>整体保险费</td>
            <td>
              <el-input class="amount-input" v-model.trim="itemData.money" placeholder="请输入金额"></el-input>
            </td>
            <td>
              <el-date-picker
                class="ex-date-picker"
                v-model.trim="itemData.time"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </td>
            <td>
              {{itemData.nature}}
            </td>
            <td>
              100元/年*租赁期
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>整体运营费</td>
            <td>
              <el-input class="amount-input" v-model.trim="itemData.money" placeholder="请输入金额"></el-input>
            </td>
            <td>
              <el-date-picker
                class="ex-date-picker"
                v-model.trim="itemData.time"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </td>
            <td>
              {{itemData.nature}}
            </td>
            <td>
              90元/年*租赁期
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>营业员管理基金</td>
            <td>
              <el-input class="amount-input" v-model.trim="itemData.money" placeholder="请输入金额"></el-input>
            </td>
            <td>
              <el-date-picker
                class="ex-date-picker"
                v-model.trim="itemData.time"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </td>
            <td>
              {{itemData.nature}}
            </td>
            <td>
              60元/年*租赁期
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td>保证金</td>
            <td>
              <el-input class="amount-input" v-model.trim="itemData.money" placeholder="请输入金额"></el-input>
            </td>
            <td>
              <el-date-picker
                class="ex-date-picker"
                v-model.trim="itemData.time"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </td>
            <td>
              {{itemData.nature}}
            </td>
            <td>
              60元/户
            </td>
          </tr>
        </tbody>

        <tbody>
          <tr class="only-word">
            <td>合计</td>
            <td>...</td>
            <td>3400.00</td>
            <td>...</td>
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
  data() {
    return {
      itemData:{
        name:'',
        money:'102.00',
        timeA:[],
        time:'',
        nature:'收入'
      },

      rules:{
        time:[{ required: true, message: '请选择时间', trigger: 'blur' }],
      },
    }
  },
  methods: {
    removeSubItem(i) {
      this.itemData.item.splice(i, 1)
    },
    addSubItem() {
      this.itemData.item.push({
        name:'',
        money:'102.00',
        timeA:[],
        time:''
      })
    },
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
    .ex-date-picker{
      padding: 6px 0;
      .el-input__icon{
        line-height: 30px;
      }
      width: 170px;
      input{
        height: 30px;
        line-height: 30px;
      }
    }
  }

</style>
