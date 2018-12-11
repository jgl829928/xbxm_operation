<template>
  <div class="content-tpl one-tpl">
    <h4>新博新美连锁商场管理合同</h4>
    <div class="base-one base-info">
      <p>出租方（以下简称为甲方）<span class="s-value">{{tplData.partya}}</span></p>
      <p>法定代表人<span class="s-value">{{tplData.partyaLegalRepresentative}}</span></p>
      <p>地址<span class="s-value">{{tplData.partyaAddress}}</span></p>
      <p>联系电话<span class="s-value">{{tplData.partyaTelephone}}</span></p>
    </div>
    <div class="base-two base-info">
      <p>承租方（以下简称为乙方）<span class="s-value">{{tplData.partyb}}</span></p>
      <p>法定代表人/负责人<span class="s-value">{{tplData.partybLegalRepresentative}}</span></p>
      <p>营业执照注册号/身份证号码<span class="s-value">{{tplData.loginNumber}}</span></p>
      <p>联系电话<span class="s-value">{{tplData.partybMobilephone}}</span></p>
      <p>地址<span class="s-value">{{tplData.partybAddress}}</span></p>
    </div>
    <div class="terms">
      <h5><span>第一条</span>租赁商铺的用途、租期及面积</h5>
      <div>
        1、甲方将新博美新美连锁
          <label>{{tplData.shopName}}</label> 店
          <label>{{tplData.shopArea}}</label> 区域
          <label>{{tplData.floor}}</label> 楼
          <label>{{tplData.boothId}}</label> 号商铺（商铺具体位置：<label>{{tplData.detailAddress}}</label>）租赁给乙方经营
          <label>{{tplData.managementType}}</label> 品类
          <label>{{tplData.brand}}</label> 品牌的家居建材类商品。
      </div>
      <div>
        2、租期：甲、乙双方选择以下第 {{tplData.rank}} 项作为租期约定。
        <template v-if="tplData.rank == 1">
          <p>
            （1）本合同的租赁期从
            <label>{{tplData.rentBeginTime}}</label> 起至 <label>{{tplData.rentEndTime}}</label> 止，共计 <label>{{tplData.rentPeriod}}</label> 月。
            （其中包含计租期 <label>{{tplData.hirePeriod}}</label> 月，
            从 <label>{{tplData.hireBeginTime}}</label> 起至 <label>{{tplData.hireEndTime}}</label> 止；
            优惠期 <label>{{tplData.discountsPeriod}}</label >月，
            从 <label>{{tplData.discountsBeginTime}}</label> 起至 <label>{{tplData.discountsEndTime}}</label> 止）。
          </p>
          <p>
            （2）本合同租赁期共计
            <label>____</label> 月，租赁期开始日为甲方
            <label>{{tplData.shopName}}</label> 店正式开业之日，租赁期包含计租期和优惠期。其中计租期
            <label>____</label> 月，自甲方
            <label>{{tplData.shopName}}</label> 店正式开业之日起算；优惠期
            <label>____</label> 月，自本合同约定的计租期结束之日起算。甲方
            <label>{{tplData.shopName}}</label> 店正式开业之日以甲方书面通知乙方为准，由甲方自行确定。
          </p>
        </template>
        <template v-else>
          <p>
            （1）本合同的租赁期从
            <label>{{tplData.rentBeginTime}}</label> 起至 <label>{{tplData.rentEndTime}}</label> 止，共计 <label>____</label> 月。
            其中包含计租期 <label>____</label> 月，
            从 <label>{{tplData.hireBeginTime}}</label> 起至 <label>{{tplData.hireEndTime}}</label> 止；
            优惠期 <label>____</label >月，
            从 <label>{{tplData.discountsBeginTime}}</label> 起至 <label>{{tplData.discountsEndTime}}</label> 止）。
          </p>
          <p>
            （2）本合同租赁期共计
            <label>{{tplData.rentPeriod}}</label> 月，租赁期开始日为甲方
            <label>{{tplData.shopName}}</label> 店正式开业之日，租赁期包含计租期和优惠期。其中计租期
            <label>{{tplData.hirePeriod}}</label> 月，自甲方
            <label>{{tplData.shopName}}</label> 店正式开业之日起算；优惠期
            <label>{{tplData.discountsPeriod}}</label> 月，自本合同约定的计租期结束之日起算。甲方
            <label>{{tplData.shopName}}</label> 店正式开业之日以甲方书面通知乙方为准，由甲方自行确定。
          </p>
        </template>

      </div>
      <div>
        3、计租期收取的费用包括： 租金、商家综合管理费、运营杂费、整体保险费、整体运营费、营业员管理基金、相关的水费、电费、燃气费等公用事业费用、电表押金、商场管理及商品质量保证金等费用；
        <br/>
        优惠期收取的费用包括：优惠期不收取租金，但仍按合同约定标准收取商家综合管理费、运营杂费、整体保险费、整体运营费、营业员管理基金、相关的水费、电费、燃气费等公用事业费用、电表押金、商场管理及商品质量保证金等费用)
      </div>
      <div>
        4、乙方租赁商铺使用面积为：
        <label>{{tplData.useableAcreage}}</label> 平方米；公摊面积按照使用面积的
        <label>{{tplData.publicScale}}</label> %进行计算，公摊面积为
        <label>{{tplData.publicAcreage}}</label> 平方米；商铺计价面积（使用面积+公摊面积）为
        <label>{{tplData.hireArea}}</label> 平方米。
      </div>
      <h5><span>第二条</span>租赁费用</h5>
      <div>
        1、费用类别
        <p>
          （1）商铺租金为商铺计价面积
          <label>{{tplData.hireArea}}</label> 平方米*月单价
          <label>{{tplData.boothPrice}}</label> 元/平方米*计租期
          <label>{{tplData.hirePeriod}}</label> 月，共计
          <label>{{tplData.totalRental}}</label> 元。
        </p>
        <p>
          （2）商家综合管理费包括 费、 费、 费等各项费用；算方式为：商铺计价面积
          <label>{{tplData.hireArea}}</label> 平方米*月单价
          <label>{{tplData.managementPrice}}</label> 元/平方米*租赁期
          <label>{{tplData.rentPeriod}}</label> 月，共计
          <label>{{tplData.totalManagement}}</label> 元。
        </p>
        <p>
          （3）运营杂费包括 费、 费、 费等各项费用，计算方式为单价
          <label>{{tplData.operationPrice}}</label> 元/年*租赁期
          <label>{{tplData.rentYear}}</label> 年， 共计
          <label>{{tplData.totalOperation}}</label> 元。
        </p>
        <p>
          （4）整体保险费为单价
          <label>{{tplData.premiumPrice}}</label> 元/年*租赁期
          <label>{{tplData.rentYear}}</label> 年， 共计
          <label>{{tplData.totalPremium}}</label> 元。
        </p>
        <p>
          （5）整体运营费包括 费、 费等各项费用，计算方式为：单价
          <label>{{tplData.runPrice}}</label> 元/年*租赁期
          <label>{{tplData.rentYear}}</label> 年，共计
          <label>{{tplData.totalRun}}</label> 元。
        </p>
        <p>
          （6）营业员管理基金为单价
          <label>{{tplData.assistantPrice}}</label> 元/年*租赁期
          <label>{{tplData.rentYear}}</label> 年， 共计
          <label>{{tplData.totalAssistant}}</label> 元。
        </p>
        <p>
          （7）商场管理及商品质量保证金
          <label>{{tplData.depositPrice}}</label> 元/户（该保证金经营期间不退，也不计息，乙方可于办理退场手续壹年后办理无息退还手续）。
        </p>
        <p>
          （8）电表押金
          <label>{{tplData.cashPledge}}</label> 元/户
        </p>
        <p>
          （9）乙方应向甲方交纳费用总计
          <label>{{tplData.totalMoney}}</label> 元。（大写:
          <label>{{tplData.totalMoneyChinese}}</label>）
        </p>
        <p>（10）自商铺交付之日起，乙方须自行负担与租赁商铺使用有关的水费、电费、燃气费等公用事业费用，乙方可委托甲方代为支付，甲方代为支付后5日内，乙方应足额支付甲方相应费用。</p>
        <p>（11）税费：与本合同有关的公证费（如有）、房产税、土地使用费等将由甲方和乙方各自按有关规定及合同约定负担，如果法律、法规及本合同没有规定负担方法的，则由双方各半负担。
          <br/>
          除法律规定或经双方协议由甲方代扣代缴的以外，乙方须自行向政府有关部门支付因租赁及经营该商铺而产生的一切政府税费。</p>
        <p>（12）双方因签署本合同而发生的律师费等其他费用，由双方各自负担。</p>
        <p>（13）甲方接受乙方的上述费用，不得被视作甲方放弃其向乙方追究乙方违反、不遵守、不履行本合同项下乙方须遵守及履行的任何协议、条文、规定及条件之责任的权利。</p>
        <p>（14）特别约定</p>
        2、费用支付
        <p>（1）支付方式 <br/>
          商铺租金和商家综合管理费可分期结算； <br/>
          运营杂费、整体保险费、整体运营费及营业员管理基金至少每一年结算一次； <br/>
          商场管理及商品质量保证金、电表押金新入场商家一次性交纳，续签商家由上一年度结转。</p>
        <p>
          （2 ）支付期限 <br/>
          乙方于合同租赁期开始日前一次性向甲方支付
          <label>{{tplData.downPaymentPeriod}}</label> 个月的商铺租金、商家综合管理费和至少一年的运营杂费、整体保险费、整体运营费、营业员管理基金、商场管理及商品质量保证金、电表押金，剩余费用按本合同约定期限足额交纳。具体见附件《付款时间表》。
        </p>
      </div>
      <h5><span>第三条</span>关于入场装修（新项目）</h5>
      <div>
        <div>
          1、甲方通过手机短信、微信、QQ、线上线下公告、书面等任一形式向乙方发放入场装修通知，具体联系方式，参见以下第四条第1款；
        </div>
        <div>
          2、乙方必须在甲方发出的入场装修通知后5个工作日内，前往商场签订《商家装修协议书》，如未在规定时间签订《商家装修协议书》，延期7日（不含）以上30日（不含）以内，则扣除本合同约定给予的优惠期
          <label>{{tplData.deductDiscountsDay}}</label> 日；延期30日（含）以上60日（不含）以内，不再享有本合同中约定给予的优惠期；延期60日（含）以上，则视同乙方自动放弃该商铺的租赁权，该商铺租赁权将不再为乙方保留，甲方有权收回做其他处理，乙方已缴纳费用总额的50%作为违约金，不予退还；
        </div>
      </div>
      <h5><span>第四条</span>双方联系方式</h5>
      <div>
        1、乙方提供的联系方式如下
        <div class="contact-way">
          <p>
            移动电话：
            <label>{{tplData.partybMobilephone}}</label>
          </p>
          <p>
            固定电话：
            <label>{{tplData.partybTelephone}}</label>
          </p>
        </div>
        <div class="contact-way">
          <p>
            紧急联系人电话：
            <label>{{tplData.urgencyTelephone}}</label>
          </p>
          <p>
            QQ号：
            <label>{{tplData.qq}}</label>
          </p>
        </div>
        <div class="contact-way">
          <p>
            微信号：
            <label>{{tplData.wxId}}</label>
          </p>
          <p>
            电子邮箱：
            <label>{{tplData.partybEmail}}</label>
          </p>
        </div>
        <div class="contact-way">
          <p>
            乙方联系地址：
            <label>{{tplData.partybAddress}}</label>
          </p>
        </div>
      </div>
      <div>
        2、甲方联系地址
        <label>{{tplData.partyaAddress}}</label>
      </div>
      <div>
        3、甲乙双方以上述联系地址作为书面文件送达地址，乙方联系方式变更应及时通过书面文件通知甲方，若未及时通知甲方，则按原有联系方式进行送达并视为送达有效。
      </div>
      <h5><span>第五条</span>声明与保证</h5>
      <div>
        双方声明与保证如下：本合同的签订系甲乙双方真实意思表示，双方不存在欺诈、胁迫、显失公平等情形，且双方已于合同签订前告知一切可能存在的风险，并对合同租金、期限、支付方式、违约责任、解除条件等条款双方均基于自身的经营状况已做详尽的考虑。
      </div>
    </div>
    <div class="sign-info">
      <p>甲方（盖章）</p>
      <p>乙方（盖章）</p>
      <p>法定代表人或授权代表（签字）</p>
      <p>法定代表人或授权代表（签字）</p>
      <p>日期 <label>{{tplData.date}}</label></p>
    </div>
    <div class="annex">
      <p>附件：《付款时间表》</p>
      <div>
        <div class="sign-info">
          <p>甲方(盖章)</p>
          <p>乙方(盖章)</p>
          <p>授权代表（签字）</p>
          <p>授权代表（签字）</p>
          <p>时间 <label>{{tplData.date}}</label></p>
          <p>时间 <label>{{tplData.date}}</label></p>
        </div>
        <el-table
          :data="tplData.contractPeriodCostList"
          border
          style="width: 100%">
          <el-table-column
            prop="costPhase"
            width="46"
            align="center"
            label="期数">
          </el-table-column>
          <el-table-column
            label="缴费明细"
            width="200">
            <template slot-scope="scope">
              <p v-html="scope.row.costDetail"></p>
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            align="center"
            label="金额">
          </el-table-column>
          <el-table-column
            prop="startPayTime"
            align="center"
            label="交费开始日">
          </el-table-column>
          <el-table-column
            prop="endPayTime"
            align="center"
            label="交费截止日">
          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    props:['tplData']
  };
</script>
<style lang="less" scoped>
  .one-tpl{

  }
</style>
