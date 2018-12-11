<template>
  <div class="content-tpl six-tpl">
    <h4>《新博新美连锁商品价格保护协议》</h4>
    <div class="terms">
      <div>
        为使新博新美连锁内销售的商品更具价格竞争力，更能有效吸引消费群体，扩大、促进商品销售，甲、乙双方就商品价格特作如下约定：
      </div>
      <div>
        第一：乙方出售的商品价格在本地市场必须统一标价，统一折扣，标价同期不得高于成都或周边地区同类市场（如:
        <label></label> ,
        <label></label> ,
        <label></label> ）价格。
      </div>
      <div v-for="item in itemData" :key="item">
          {{item}}
      </div>
    </div>
    <div class="sign-info">
      <p>甲方</p>
      <p>乙方</p>
      <p>授权代表</p>
      <p>授权代表</p>
      <p>日期 <label>{{tplData.date}}</label></p>
      <p>日期 <label>{{tplData.date}}</label></p>
    </div>
  </div>
</template>
<script>
  export default {
    props:['tplData'],
    data() {
      return {
        itemData:[
          '第二：乙方须使用甲方统一印制并经物价局部门审核通过的商品标价签。',
          '第三：甲方对乙方商品价格有监管权利，若乙方商品价格高出同类市场价格，甲方给予乙方整改期限，乙方在整改期限内未完成价格整改，甲方有权采取罚款、末位淘汰制扣分，收回经营场地等管理措施。',
          '第四：如遇媒体曝光及消费者投诉价格虚高的，乙方必须在三个工作日向甲方提交相关证明材料文件，甲方在收到相关证明材料后三个工作日调查并澄清相关信息。如情况属实，乙方必须无条件按差价的五倍返还消费者，并接受甲方差价十倍的现金处罚。',
          '第五：若乙方商品售价在本地市场有限时特价的，在甲方商场必须同步执行，否则必须作下架处理。',
          '第六、在甲方组织的营销活动或对外统一宣传中对消费者的价格承诺，乙方需严格遵守。若由于乙方未能遵守相应的价格承诺造成消费者投诉的，并对甲方商誉造成不良影响的，乙方承担相应的赔偿责任。'
        ],
      }
    },
  };
</script>
<style lang="less" scoped>
  .six-tpl{
    .terms{
      &>div{
        text-indent: 2em;
      }
    }
  }
</style>
