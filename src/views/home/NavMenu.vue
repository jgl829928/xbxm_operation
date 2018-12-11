<template>
    <div>
        <label v-for="(item,index) in navMenus" :key="index"> 
          <div v-if="item.name!='首页'">
            <el-menu-item :index="item.url?item.url+'':item.menuId+''" :key="item.menuId" v-if="!item.list||item.list.length==0">
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
            <el-submenu :index="item.url?item.url+'':item.menuId+''" :key="item.menuId" v-else>
                <template slot="title" >
                    <i :class="item.iconCls"></i>
                    {{item.name}}
                </template>
                <NavMenu :navMenus="item.list"></NavMenu>
            </el-submenu>
             </div>
        </label>
    </div>
</template>
<script>
export default {
  props: ["navMenus"],
  name: "NavMenu",
  data() {
    return {};
  },
  methods: {
    delaData(data) {
      if (data) {
        data.map((item, index) => {
          item.type = item.menuType.code;
          if (item.menuType.code == 2) {
            item.list = [];
          } else {
            this.delaData(item.list);
          }
        });
      }
    },
    permissionKey(data) {},
    toPath(path) {
      this.$router.push(path);
    }
  },
  created() {  
    this.delaData(this.navMenus);
  }
};
</script>