<template>
  <el-select class="el-input-h" v-model="reqData.marketCode" clearable placeholder="请选择" @change="code_change" :disabled="checkMarket">
    <el-option
      v-for="(item, index) in marketsList"
      :key="index"
      :label="item.marketName"
      :value="item.marketCode">
    </el-option>
  </el-select>
</template>
<script>
  import Api from '@/api/contact'
	export default {
    props:['reqData','checkMarket'],
    data() {
		  return {
        marketsList:[]
      }
    },
    mounted() {
      let { marketCode, marketName } = this.$store.getters.currentUser;
      if(marketCode && marketName) {
        this.marketsList = [{marketCode,marketName}]
      }else {
        this.getMarketsList();
      }
    },
    methods:{
		  async getMarketsList() {
        let res = await this.$http.get(Api.marketsList);
        if(res) this.marketsList = res.data;
      },
      code_change(){
        this.$emit('change',this.reqData.marketCode) 
      }
    }
	}
</script>
