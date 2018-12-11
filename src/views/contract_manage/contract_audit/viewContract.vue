<template>
  <div class="view-contract">
    <h4>查看合同</h4>
    <table border="1">
      <thead>
        <tr class="only-word">
          <th>序号</th>
          <th>合同名称</th>
          <th>签署结果</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr class="only-word" v-for="(item,i) in itemData" :key="i">
          <td>{{item.contractCode}}</td>
          <td>{{item.contractName}}</td>
          <td>
            {{item.signReult ? item.signReult.desc : ''}}
          </td>
          <td>
            <a class="a-view" @click="viewContract(item)">查看合同</a>
            <a v-if="item.signReult ? item.signReult.code === 2 : false" @click="reSign(item.contractCode)">重签</a>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="c-detail-footer-box">
      <el-button class="cancel-btn" type="primary" @click="closePage">
        关 闭
      </el-button>
    </div>
    <contractTpl ref="contractTpl" :tplData="tplData"/>
  </div>
</template>
<script>
  import Api from '@/api/contact'
  import contractTpl from '../c_html/index'
  export default {
    name:'viewContract',
    data() {
      return {
        itemData:[],
        tplData:{},
        contractBatchNum:''
      }
    },
    mounted() {
      let contractBatchNum = this.$route.params.contractBatchNum || '';
      if(!contractBatchNum){
        this.$router.go(-1)
      }else {
        this.contractBatchNum = contractBatchNum;
        this.getData(contractBatchNum);
      }
    },
    methods: {
      closePage() {
        this.$router.push({path:'/contact/audit'})
      },
      async getData(contractBatchNum) {
        let res = await this.$http.get(`${Api.postContracts}/${contractBatchNum}`);
        if(res) {
          this.itemData = res.data
        }
      },
      async viewContract(item) {
        if(item.electronicContractcolUrl){
          window.open(item.electronicContractcolUrl, '_blank');
        }else {
          let { contractTplEunm, contractBatchNum} = item;
          let data = { contractTplEunm, contractBatchNum};
          let res = await this.$http.get(Api.queryCheckContract,{params: data});
          if(res){
            let data = res.data;
            if(contractTplEunm === 1){
              data.contractPeriodCostList.map((item)=>{
                item.costDetail = item.costDetail.replace(/\n/g,'<br/>')
              });
              this.tplData = { contractPeriodCostList : data.contractPeriodCostList, ...data.contractShoot};
            }else {
              this.tplData = data
            }
            this.$refs.contractTpl.showDialog(contractTplEunm);
          }
        }
      },
      async reSign(contractCode) {
        let res = await this.$http.get(`${Api.contractsSeal}?contractCode=${contractCode}`);
        if(res){
          this.$message.success('重签成功');
          this.getData(this.contractBatchNum);
        }
      }
    },
    components:{
      contractTpl
    }
  };
</script>
<style lang="less" scoped>
  .view-contract{
    padding:0 30px 90px;
    .cancel-btn{
      padding: 0;
      a{
        width: 100%;
        height: 100%;
        line-height: 38px;
      }
    }
    h4{
      font-size: 16px;
      color: #444;
      text-align: center;
      font-weight: bold;
    }
    table{
      margin: 30px 0 40px;
      border: 1px solid #e1e1e1;
      border-radius: 6px;
      text-align: center;
      width: 100%;
      th,td{
        text-align: center;
        padding: 2px 16px;
        border: 1px solid #e1e1e1;
      }
      th{
        font-weight: bold;
        color: #90939A;
      }
      td{
        font-size: 12px;
        color: #4A4A4A;
        a{
          text-decoration: underline;
          color: #3F87F5;
        }
        .a-view{
          display: inline-block;
          width: 60%;
          float: left;
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
