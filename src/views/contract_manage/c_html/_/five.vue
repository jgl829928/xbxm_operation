<template>
  <div class="content-tpl five-tpl">
    <h4>新博新美连锁反商业贿赂协议</h4>
    <div class="base-info">
      <p>甲方 <span class="s-value">{{tplData.partya}}</span></p>
      <p>乙方 <span class="s-value">{{tplData.partyb}}</span></p>
      <p>为规范新博新美连锁商场正常经营活动，维护甲、乙双方的共同利益，遵循诚实信用的原则，经友好协商，签订本协议，以便双方共同遵守。</p>
    </div>
    <div class="terms">
      <h5><span>第一条</span>甲、乙双方的责任</h5>
      <div>
        1.1  严格遵守国家有关法律、法规。
      </div>
      <div>
        1.2  严格执行双方签订的《新博新美连锁商场管理合同》。
      </div>
      <div>
        1.3  甲、乙双方不得为获取不正当的利益，采用任何方式损害对方的合法权益。
      </div>
      <div>
        1.4  任何一方发现对方业务人员在业务活动中有违法、违规、违纪、违反本协议行为的，有义务即时向对方监督部门举报（双方监督部门电话附后），举报时须提供相关证明材料。
      </div>
      <h5><span>第二条</span>甲方的责任</h5>
      <div>2.1  应与乙方保持正常的业务交往，按照有关法律法规和程序开展业务工作。</div>
      <div>
        2.2  在商务活动中应当依法办事、廉洁自律，不得有任何涉及商业贿赂或损害企业利益的行为（包括但不限于以下情形）：
        <p>
          2.2.1 向乙方单位及乙方工作人员索要或接受乙方单位以及乙方工作人员的回扣、礼金、有价证券、贵重物品或好处费、感谢费等；
        </p>
        <p>
          2.2.2 在业务活动中以任何理由设置障碍、态度粗鲁、刁难乙方；
        </p>
        <p>
          2.2.3 在乙方单位报销任何应由甲方或甲方工作人员个人支付的费用；
        </p>
        <p>
          2.2.4 要求或接受乙方单位或乙方工作人员为甲方工作人员装修住房、婚丧嫁娶、或为其配偶及亲戚朋友安排工作提供方便；
        </p>
        <p>
          2.2.5 参加乙方单位或乙方工作人员安排的宴请、健身、娱乐、桑拿、按摩等活动；
        </p>
        <p>
          2.2.6 向乙方单位或乙方工作人员要求为甲方工作人员或其配偶及亲戚朋友介绍经营业务等活动。
        </p>
      </div>
      <h5><span>第三条</span>乙方的责任</h5>
      <div>3.1  应与甲方保持正常的业务交往，按照有关法律法规和程序开展业务工作。</div>
      <div>
        3.2  在与甲方的商务活动中应当依法办事、廉洁自律，不得以任何方式从事任何涉及商业贿赂或损害甲方企业利益的行为，包括但不限于以下情形：
        <p>3.2.1 以任何理由或方式向甲方及其工作人员赠送礼金、有价证券、贵重物品及回扣、好处费、感谢费等；</p>
        <p>3.2.2 以任何理由或方式为甲方及其工作人员报销应由甲方及其工作人员支付的费用；</p>
        <p>3.2.3 为甲方工作人员装修住房、安排婚丧嫁娶活动及为其配偶或亲戚朋友安排工作或牵线搭桥、提供方便；</p>
        <p>3.2.4 以任何理由宴请甲方单位及其工作人员；以任何理由安排甲方单位及其工作人员参与其组织的健身、娱乐、桑拿按摩等活动；</p>
        <p>3.2.5 为甲方工作人员及其配偶、亲戚朋友介绍经营业务、提供经营业务的便利条件，进行经营业务合同等活动。</p>
      </div>
      <h5><span>第四条</span>第4条违约责任</h5>
      <div class="important-info important-info-line">
        乙方单位或工作人员违反本协议第1条或第3条的，乙方应赔偿甲方违约金人民币五万元整，甲方有权据此解除《新博新美连锁商场管理合同》，同时甲方将永久性地取消乙方与甲方再次合作的资格，构成犯罪的，甲方将向司法机关报案，追究乙方及乙方相关人员刑事责任；给甲方造成损失的，乙方应赔偿甲方的全部损失。
      </div>
      <h5><span>第五条</span>第5条本协议作为《新博新美连锁商场管理合同》的附件，与主合同具有同等法律效力。</h5>
    </div>
    <div class="sign-info">
      <p>甲方</p>
      <p>乙方</p>
      <p>授权代表</p>
      <p>授权代表</p>
      <p>日期 <label>{{tplData.date}}</label></p>
      <p>日期 <label>{{tplData.date}}</label></p>
      <p>甲方监督部门电话：028-85510288</p>
    </div>
  </div>
</template>
<script>
  export default {
    props:['tplData'],
  };
</script>
<style lang="less" scoped>
  .five-tpl{
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
