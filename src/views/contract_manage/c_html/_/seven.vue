<template>
  <div class="content-tpl seven-tpl">
    <h4>新博新美连锁商品售后服务协议</h4>
    <div class="base-info">
      <p>甲方 <span class="s-value">{{tplData.partya}}</span></p>
      <p>乙方 <span class="s-value">{{tplData.partyb}}</span></p>
      <p>为维护消费者的合法权益，让消费者满意放心，保证所售商品质量优良，做好售后服务，提高商场整体形象，扩大销售，甲、乙双方作如下约定：</p>
    </div>
    <div class="terms">
      <div v-for="item in itemData" :key="item.val">
        {{item.val}}
        <p v-if="item.sub" v-for="sub in item.sub" :key="sub">
          {{sub}}
        </p>
      </div>
    </div>
    <div class="sign-info">
      <p>甲方(盖章)</p>
      <p>乙方(盖章)</p>
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
          {'val':'1、乙方向甲方提供直接供应商或生产厂家的产品厂家授权书的复印件，并提供详细通讯方式。'},
          {'val':'2、为确保产品质量，乙方须向甲方出示由直接供应商或生产厂家出具的质量信誉保证资料（质量保证书和产品合格证等）。'},
          {
            'val':'3、乙方必须自觉做好商品售后服务工作，包括：',
            'sub':[
              '1) 遵循甲方的服务理念，负责所销售商品的售后服务。',
              '2) 售后服务电话的接听时间为9:00至17:00，在国家法定节假日和双休日，应具备正常安装、维修作业的服务。',
              '3) 在免费服务期内，保修期内的商品不得收取任何费用（除人为因素、意外事件等非正常原因造成的损坏）。',
              '4) 保修期外的商品维修，上门服务费用和材料费由用户承担，乙方在维修前应向用户说明，并征得用户同意。',
              '5) 要求安装服务的，应在48小时内上门，用户要求维修服务的，应在72小时内上门，同等条件下维修优先。',
              '6) 向甲方出示直接供应商或生产厂家签定的有效赔付合同，严格执行“三包”制度。'
            ]
          },
          {'val':'4、乙方在本商场内经营的商品必须有产品质量保证书和合格证书，有较为详细的安装及使用说明书。'},
          {'val':'5、乙方必须确保在本商场内的商品货真价实，禁售假、冒、伪、劣产品。'},
          {'val':'6、乙方在商场内必须使用甲方统一印制的标价签，“POP海报”促销标价签。'},
          {'val':'7、为保护消费者权益，本商场实行“退、换货”制度及“先行代赔”制度，具体内容如下：'},
          {
            'val':'“退、换货”制度：',
            'sub':[
              '① 自售出之日起、商品在未污损、配件齐全、外包装完好，不影响二次销售的情况下，30日内凭购货单据可退、换货（预订商品按订单合同约定执行）。',
              '② 在保质期内，纯属质量问题，造成主要功能丧失，或主要部件损坏、难以修复使用的商品。可以退、换货。',
              '③ 在保质期内二次修复仍不能正常使用的商品，可以办理退、换货手续。',
              '④ 经鉴定为假冒伪劣商品的，应予以退换。',
              '⑤ 对已安装的商品出现质量问题，采取先修理，后退换的方式，修理三次后达不到既定质量标准，可以办理退货手续。',
              '⑥ 对于特价处理商品，一经售出恕不退还。',
              '⑦ 在退、换货范围内允许退换的商品, 在售出时如有赠品、赠券，应同时退回。'
            ]
          },
          {
            'val':'“先行代赔”制度：',
            'sub':[
              '1、甲方受理投诉后，经查实确系产品质量问题的，乙方应接受甲方提出的处理意见向消费者赔礼道歉，并作相应处理，详细填写质量处理记录并限期修、换、退、赔。',
              '2、甲方对质量问题调解无效，应会同工商及技术监督部门对该商品质量问题做出书面鉴定，相关费用由乙方承担。当乙方拖延、拒绝或无力执行处理决定，甲方可动用乙方商场管理及商品质量保证金实行“先行代赔”，工商、技监部门在“先行代赔”协议书上签字认可，乙方应在三日内补齐质量保证金差额部分。',
              '3、如乙方退场后当确定质量和服务责任由乙方承担，一周内未得到乙方明确答复的，由甲方直接与消费者协商，乙方同意甲方有权使用质保金。',
              '4、“先行代赔”的范围：根据我国目前相关法律、法规规定，“先行代赔”以直接损失为主。',
              '5、“先行代赔”赔付方式：根据我国目前相关法律、法规规定，“先行代赔”主要是无条件修复、更换。当确实无法修复或更换时，才进行现金补偿。',
              '6、在新博新美连锁所有商场购物，消费者只要到甲方商场总服务台POS机统一交款，并与新博新美连锁商场签订了《商品销售合同书》将享受新博新美连锁商场先行赔付的服务。建筑材料的“三包”期如果国家有规定的，按国家规定执行，国家没有规定的，按一年执行。如乙方的“三包”期高于上述标准的，按乙方承诺的期限执行。',
              '7、乙方向甲方一次性交纳商场管理及商品质量保证金。该保证金中途不退、不计息。在乙方退场壹年后无质量投诉，甲方如数退还保证金。如国家规定，乙方对产品承诺的质量保证期超过一年的，则甲方退还保证金期限为国家规定期限和乙方承诺的质量保证期届满后退还。',
              '8、进场厂商因违法、违规经营，受到消费者投诉，并经媒体曝光和政府有关质量检测权威部门认定，对消费者及本商场品牌造成较大损失和影响者,该进场厂商除接受政府部门的处罚外，并视情节严重，赔偿甲方5000元/次以上的名誉损失费，赔偿金在乙方保证金中扣除，不足部分甲方仍享有继续追讨的权利,情节严重者，商场有权取消其在本商场的经营权。',
              '9、在新的售后服务协议未出台前，此协议自双方签字盖章后生效；如有新的售后服务协议出台，以新协议为执行标准。',
              '10、本承诺书一式两份，甲乙双方各存一份，双方签字盖章后生效。'
            ]
          }
        ]
      }
    },
    methods: {

    }
  };
</script>
<style lang="less" scoped>
  .seven-tpl{
    .base-info{
      p{
        width: 100% !important;
      }
      p:last-child{
        text-indent: 2em;
      }
    }
  }
</style>
