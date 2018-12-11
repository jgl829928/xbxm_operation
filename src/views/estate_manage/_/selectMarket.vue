<template>
        <el-select v-model="marketCode" clearable placeholder="请选择" :disabled="role" @change="code">
          <el-option
            v-for="(item, index) in marketSearch"
            :key="index"
            :label="item.marketName"
            :value="item.marketCode">
          </el-option>
        </el-select>
</template>
<script>
import ApiSettingCom from "@/api/apiSetting";
export default {
  data() {
    return {
      marketCode: "",
      marketSearch: [],
      role: false
    };
  },
  created() {
    this.getMarket();
    this.judegRole();
  },
  computed: {
    currentUser: function() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    //判断当前用户权限
   code(){
      this.$emit("update:marketCode", this.marketCode);
    },
    judegRole(){
      if(this.currentUser.affiliation === 2){
        this.marketCode = this.currentUser.marketCode
        this.$emit("update:marketCode", this.marketCode);
        this.role = true;
      } else {
        this.role = false;
      }
    },
    //获取所有商场
    getMarket() {
      this.$http.get(ApiSettingCom.marketSearch).then(res => {
        if (res) {
          if (res.code == 0) {
            this.marketSearch = res.data;
          }
        }
      });
    }
  }
};
</script>