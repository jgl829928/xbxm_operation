<template>
  <el-table
    :data="itemList"
    style="width: 100%"
    align="center"
    stripe
    show-summary
    :summary-method="getSummaries">
    <el-table-column
      align="center"
      type="index"
      label="序号"
      width="50">
    </el-table-column>
    <el-table-column
      align="center"
      prop="costProperty"
      label="费用类型">
    </el-table-column>
    <el-table-column
      align="center"
      prop="cumulativePaidAmount"
      label="金额">
    </el-table-column>
    <el-table-column
      align="center"
      label="单位">
      <template slot-scope="scope">
        元
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="收入性质">
      <template slot-scope="scope">
        <span>{{ scope.row.incomeProperty ? scope.row.incomeProperty.desc:'' }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props:{
    itemList:{
      type: Array
    }
  },
  methods:{
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += '';
        } else {
          sums[index] = '--';
        }
      });
      return sums;
    }
  }
};
</script>
