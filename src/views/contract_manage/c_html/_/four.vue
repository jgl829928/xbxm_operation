<template>
  <div class="content-tpl four-tpl">
    <h4>新博新美连锁商场消防及安全责任书</h4>
    <div class="terms">
      <div v-for="item in itemData" :key="item">
          {{item}}
      </div>
    </div>
    <div class="sign-info">
      <p>甲方(盖章)</p>
      <p>乙方(盖章)</p>
      <p>法定代表人/授权代表（签字）：</p>
      <p>法定代表人/授权代表（签字）：</p>
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
          '为了认真贯彻《中华人民共和国消防法》、《四川省消防条例》，把“预防为主，安全第一”的方针放在首位，抓好防火、防盗、防诈骗、防职工犯罪为重点的四防安全工作；把经营、安全、效益三者融为一体，认真落实“谁经营、谁负责”的原则，为创造良好的经营安全环境，双方协商商场消防及安全责任按以下条款共同遵守',
          '1、不断加强商家和本公司职工的防火意识，爱护消防设施设备。',
          '2、在防火安全工作中要切实做到“三懂三会”。三懂即：懂得本岗位经营的商品和原材料的火灾危险性；懂得预防火灾的措施；懂得火灾的扑救方法。三会：会使用消防器材；会扑救初期火灾；会报警。',
          '3、严禁擅自改动喷淋、温感器、电源线路，禁止乱拉乱接电线，乱丢烟头，特别要严禁存放易燃、易爆物品。',
          '4、不准阻塞消防通道，严禁挪用消防器材，在消防卷帘门下堆放物品。',
          '5、切实管好自己的门，管好自己的人，严防被盗、被骗，特别对现金，有价票据要管好，不要随意存放在不安全的地方，若发生案件要保护好现场，及时向当地公安机关报案。',
          '6、要加强对临时工管理，商场营业时间外不准留人，不得在营业时间外进货、发货。',
          '7、要经常进行防火安全检查，及时整改隐患，对违反安全管理规定的责任区域经指出又不改正的，对责任人实行处罚。',
          '8、责任人做到随时检查，确保天天安全，年年安全。',
          '9、在本经营场地内按30平方自备4公斤干粉灭火器瓶，并保证灭火器压力正常。'
        ],
      }
    },
  };
</script>
<style lang="less" scoped>
  .four-tpl{
    .terms{
      &>div{
        text-indent: 2em;
      }
    }
  }
</style>
