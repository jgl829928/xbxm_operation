<template>
  <el-row class="g-home-container">
    <homeHead></homeHead>
    <el-col :span="24" class="main">
      <el-aside class='menu-expanded'>
        <!-- 导航菜单-->
        <el-menu :default-active="activeMenus" class="el-menu-vertical-demo" router>
          <NavMenu :navMenus="menuData"></NavMenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-tabs v-model="activeIndex" type="border-card" closable @tab-click="tabClick(activeIndex)" @dblclick.native="tabRemove(activeIndex)" v-if="options.length" @tab-remove="tabRemove"
          class="m-home-tab">
          <el-tab-pane :key="index" v-for="(item, index) in options" :label="item.name" :name="item.name" >
          </el-tab-pane>
        </el-tabs>
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <div>
                <router-view></router-view>
              </div>
            </transition>
          </el-col>
        </div>
      </el-main>
    </el-col>
  </el-row>
</template>

<script>
import ApiSetting from "@/api/access-manage.js";
import homeHead from "./header.vue";
import NavMenu from "./NavMenu.vue";
export default {
  data() {
    return {
      editableTabsValue: "1",
      collapsed: false,
      menuData: [],
      permissionKeys: [],
      delRoute: null,
      isTabClick: false,
      activeMenus: "",
      routers: [],
      time:"",
    };
  },
  components: { homeHead, NavMenu },
  methods: {
    setAddKeep(to, from) {
      if (to.meta.hasOwnProperty("keepAlive")) {
        setTimeout(() => {
          this.$store.commit("add_keep_alive", to.name);
        }, 5);
      }
    },
    // 设置tab
    setTab(to, from) {
      // tab选中状态
      let flag = false;
      for (let option of this.options) {
        if (option.name === to.meta.name) {
          flag = true;
          this.$store.commit("set_active_index", to.meta.name);
          break;
        }
      }
      if (!flag) {
        this.$store.commit("add_tabs", {
          route: to.path,
          name: to.meta.name
        });
        this.$store.commit("set_active_index", to.meta.name);
      }
    },
    //   获取菜单信息
    getMenu(num) {
      let muens = `${ApiSetting.roleMenus}/${num}`;
      this.$http.get(muens).then(res => {
        if (res && res.code == 0 && res.data) {
          this.menuData = res.data;
          this.delaData(this.menuData);
        } else {
          this.menuData = [];
        }
      });
      this.$store.commit("set_permission", {
        permissionKeys: this.permissionKeys,
        routers: this.routers
      });
    },
    // 获取权限id
    delaData(data) {
      if (data) {
        data.map((item, index) => {
          // item.type = item.menuType.code;
          if (item.list && item.list.length !== 0) {
            if (item.menuType.code === 2) {
              this.routers.push(item.url);
            }
            this.delaData(item.list);
          } else if (item.menuType.code === 4) {
            this.permissionKeys.push(item.url);
          } else if (item.menuType.code === 2) {
            this.routers.push(item.byname);
          }
        });
      }
    },
    // tab切换时，动态的切换路由
    tabClick(activeIndex) {
      clearTimeout(this.time); //首先清除计时器
      this.time = setTimeout(() => {
        this.isTabClick = true;
        this.options.map(item => {
          if (item.name === this.activeIndex) {
            this.$router.push({ path: item.route });
          }
        });
        this.$store.commit("set_active_index", this.activeIndex);
      }, 300);
    },


    tabRemove(targetName) {
      clearTimeout(this.time);  //清除
      // 首页不可删除
      if (targetName === "首页") {
        return;
      }
      this.delRoute = null;
      this.findName(this.$router.options.routes, targetName);
      let cueRoute = this.delRoute;
      this.$store.commit("delete_tabs", cueRoute);
      if (cueRoute.meta && cueRoute.meta.hasOwnProperty("keepAlive")) {
        this.$store.commit("del_keep_alive", cueRoute.name);
      }
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {
          this.$store.commit(
            "set_active_index",
            this.options[this.options.length - 1].name
          );
          this.options.map(item => {
            if (item.name === this.activeIndex) {
              this.$router.push({ path: item.route });
            }
          });
        } else {
          this.$router.push({ path: "/index" });
        }
      }
    },
    findName(data, targetName) {
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].hasOwnProperty("meta")) {
          if (data[i].meta.name === targetName) {
            return (this.delRoute = data[i]);
          } else {
            if (data[i].children && data[i].children.length > 0) {
              if (!this.delRoute) {
                this.findName(data[i].children, targetName);
              }
            }
          }
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        document
          .querySelector(".el-tabs__nav")
          .children[0].children[0].removeNode();
      } else {
        document
          .querySelector(".el-tabs__nav")
          .children[0].children[0].remove();
      }
    });
  },
  created() {
    this.getMenu(1);
    this.activeMenus = this.$route.matched[1].path;
    if (this.$store.state.options.length === 0) {
      // 刷新时以当前路由做为tab加入tabs
      if (this.$route.path !== "/index") {
        this.$store.commit("add_tabs", { route: "/index", name: "首页" });
        this.$store.commit("add_tabs", {
          route: this.$route.path,
          name: this.$route.meta.name
        });
        this.$store.commit("set_active_index", this.$route.meta.name);
      } else {
        this.$store.commit("add_tabs", { route: "/index", name: "首页" });
        this.$store.commit("set_active_index", "首页");
        this.$router.push("/index");
      }
    }
  },
  computed: {
    // 选项卡
    options() {
      return this.$store.state.options;
    },
    // 当前选项卡
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
      }
    }
  },
  watch: {
    $route(to, from) {
      this.activeMenus = to.matched[1].path;
      if (!this.isTabClick) {
        if (to.meta.hasOwnProperty("keepAlive")) {
          this.$store.commit("del_keep_alive", to.name);
        }
      }
      this.setAddKeep(to, from);
      this.setTab(to, from);
      this.isTabClick = false;
    }
  }
};
</script>

<style lang='less'>
@import url("./index-element.less");
</style>
<style lang="less" scoped>
@import url("./index.less");
</style>
