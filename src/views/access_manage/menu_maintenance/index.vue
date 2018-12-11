<template>
  <div class="g-menu-content">

    <!-- tab标签 -->
    <el-tabs v-model="activeName" @tab-click="getMenu()" type="card">

      <el-tab-pane label="运营后台" name=1>

        <div>

          <div class="u-menu-title">功能菜单</div>

          <div>
            <el-button v-if="menuTree && menuTree.length === 0" class="btn-search u-add-btn" type="primary" @click="initMenu(1)">添加</el-button>
          </div>

          <el-tree :data="menuTree"
                   node-key="id"
                   default-expand-all
                   :expand-on-click-node="false"
                   :props="props"
                   class="m-menu-tree">

            <span class="custom-tree-node" slot-scope="{ node, data }">

              <span>{{ node.label }}</span>

              <el-tooltip placement="right">

                <span class="u-operate-icon">
                    <img src="../../../assets/images/set.png" alt="">
                  </span>

                <div class="menu-bnt" v-if="data.menuType.code === 1" slot="content">
                   <p v-show="rightControl('menuMain_2')" @click="addMenuSite(1), addSendData(data)">上方添加</p>
                   <p v-show="rightControl('menuMain_2')" @click="addMenuSite(2), addSendData(data)">下方添加</p>
                   <p v-show="rightControl('menuMain_2')" @click="append('menu'), addSendData(data)">添加子菜单</p>
                   <p v-show="rightControl('menuMain_2')" @click="append('page'), addSendData(data)">添加子页面</p>
                   <p v-show="rightControl('menuMain_3')" @click="append('menu'), addSendData(data, 'modification')">修改</p>
                   <p v-show="rightControl('menuMain_4')" @click="deleteMenu(node,data)">删除</p>
                 </div>

                <div class="menu-bnt" v-else slot="content">
                    <p v-show="rightControl('menuMain_2')" @click="addMenuSite(1), addSendData(data)">上方添加</p>
                   <p v-show="rightControl('menuMain_2')" @click="addMenuSite(2), addSendData(data)">下方添加</p>
                   <p  v-show="rightControl('menuMain_4')" @click="deleteMenu(node,data)">删除</p>
                 </div>

              </el-tooltip>

            </span>

          </el-tree>

        </div>

      </el-tab-pane>

      <el-tab-pane label="APP运营" name=2>

        <div>

          <div class="u-menu-title">功能菜单</div>

          <div>
            <el-button class="btn-search u-add-btn" type="primary" @click="initMenu(1)">添加</el-button>
          </div>

          <el-tree :data="menuTree"
                   node-key="id"
                   default-expand-all
                   :expand-on-click-node="false"
                   :props="props"
                   class="m-menu-tree">

            <span class="custom-tree-node" slot-scope="{ node, data }">

            <span>{{ node.label }}</span>

            <el-tooltip placement="right">

            <span class="u-operate-icon">
            <img src="../../../assets/images/set.png" alt="">
            </span>

            <div class="menu-bnt" v-if="data.menuType.code === 1" slot="content">
            <p v-show="rightControl('menuMain_2')" @click="addMenuSite(1), addSendData(data)">上方添加</p>
            <p v-show="rightControl('menuMain_2')" @click="addMenuSite(2), addSendData(data)">下方添加</p>
            <p v-show="rightControl('menuMain_2')" @click="append('menu'), addSendData(data)">添加子菜单</p>
            <p v-show="rightControl('menuMain_2')" @click="append('page'), addSendData(data)">添加子页面</p>
            <p v-show="rightControl('menuMain_3')" @click="append('menu'), addSendData(data, 'modification')">修改</p>
            <p v-show="rightControl('menuMain_4')" @click="deleteMenu(node,data)">删除</p>
            </div>

            <div class="menu-bnt" v-else slot="content">
            <p v-show="rightControl('menuMain_2')" @click="addMenuSite(1), addSendData(data)">上方添加</p>
            <p v-show="rightControl('menuMain_2')" @click="addMenuSite(2), addSendData(data)">下方添加</p>
            <p  v-show="rightControl('menuMain_4')" @click="deleteMenu(node,data)">删除</p>
            </div>

            </el-tooltip>

            </span>

          </el-tree>

        </div>

      </el-tab-pane>

      <el-tab-pane label="APP商户" name=3>

        <div>

          <div class="u-menu-title">功能菜单</div>

          <div>
            <el-button class="btn-search u-add-btn" type="primary" @click="initMenu(1)">添加</el-button>
          </div>

          <el-tree :data="menuTree"
                   node-key="id"
                   default-expand-all
                   :expand-on-click-node="false"
                   :props="props"
                   class="m-menu-tree">

            <span class="custom-tree-node" slot-scope="{ node, data }">

            <span>{{ node.label }}</span>

            <el-tooltip placement="right">

            <span class="u-operate-icon">
            <img src="../../../assets/images/set.png" alt="">
            </span>

            <div class="menu-bnt" v-if="data.menuType.code === 1" slot="content">
            <p v-show="rightControl('menuMain_2')" @click="addMenuSite(1), addSendData(data)">上方添加</p>
            <p v-show="rightControl('menuMain_2')" @click="addMenuSite(2), addSendData(data)">下方添加</p>
            <p v-show="rightControl('menuMain_2')" @click="append('menu'), addSendData(data)">添加子菜单</p>
            <p v-show="rightControl('menuMain_2')" @click="append('page'), addSendData(data)">添加子页面</p>
            <p v-show="rightControl('menuMain_3')" @click="append('menu'), addSendData(data, 'modification')">修改</p>
            <p v-show="rightControl('menuMain_4')" @click="deleteMenu(node,data)">删除</p>
            </div>

            <div class="menu-bnt" v-else slot="content">
            <p v-show="rightControl('menuMain_2')" @click="addMenuSite(1), addSendData(data)">上方添加</p>
            <p v-show="rightControl('menuMain_2')" @click="addMenuSite(2), addSendData(data)">下方添加</p>
            <p  v-show="rightControl('menuMain_4')" @click="deleteMenu(node,data)">删除</p>
            </div>

            </el-tooltip>

            </span>

          </el-tree>

        </div>

      </el-tab-pane>

    </el-tabs>

    <!-- 添加弹窗 -->
    <el-dialog title="权限-添加" :visible.sync="dialogFormVisible" class="s-dialog">

      <el-form :model="sendData" :rules="rules" ref="form">

        <el-form-item v-if="sendData.method === 1 || sendData.method === 2" label="菜单类型" :label-width="formLabelWidth">
          <el-select :disabled="disabled" v-model="sendData.menuType" clearable placeholder="请选择">
            <el-option v-for="(item, index) in addType" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="sendData.menuType === 1" label="菜单名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model.trim="sendData.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item v-if="sendData.menuType === 2" label="页面名称" :label-width="formLabelWidth" prop="url">
          <el-select v-model="sendData.url" clearable filterable placeholder="请选择" @change="pageSelete">
            <el-option v-for="(item, index) in payWay" :key="index" :label="item.label" :value="item.path">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="sendData.menuType === 2" label="菜单URL" :label-width="formLabelWidth">
          <span class="u-special-color">{{sendData.url}}</span>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')" class="btn-save">保 存</el-button>
        <el-button @click="closeDialog('form')" class="btn-reset">取 消</el-button>
      </div>

    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog title="权限-详情" :visible.sync="access_info_dialog" class="m-dialog">

      <el-form class="c-search-form" ref="reqData" label-width="110px" :inline="true" label-position="right">

        <el-row :gutter="32">

          <el-col :span="8">
            <span>菜单名称 </span>
            <span>{{1}}</span>
          </el-col>

          <el-col :span="16">
            <span>菜单URL别名 </span>
            <span>{{2}}</span>
          </el-col>

        </el-row>
        <el-row :gutter="32">

          <el-col :span="16">
            <span>菜单URL</span>
            <span class="u-special-color">{{3}}</span>
          </el-col>

        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button class="btn-save" type="primary" @click="access_info_dialog=false">关闭</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'
import {mapMutations, mapState} from 'vuex'
import sendURL from '@/api/access-manage'
export default {
  data () {
    return {
      menuTree: [], // 菜单树
      props: {
        label: 'name',
        children: 'list'
      }, // 菜单树配置

      addType: [
        {label: '菜单', value: 1},
        {label: '页面', value: 2}
      ], // 添加菜单弹窗 ---- 菜单类型
      disabled: false, // 添加菜单弹窗 ---- 禁用菜单类型选择

      activeName: '1', // tab切换

      payWay: [], // 所有页面集合

      sendData: {
        byname: '', // 页面Name
        menuId: 0, // 选中菜单的ID
        method: 3, // 新增菜单的方式  1：上方添加  2：下方添加  3：添加子菜单 4：添加子页面
        name: '', // 菜单名称
        menuType: '', // 菜单类型   1：菜单  2：页面
        num: 0, // 选中菜单的序号
        parentIds: '', // 所有的上级ID
        serveType: 1, // 服务类型: 1:后台 2：运营 3：app商户
        sys: 'oms',
        url: '', // 页面路由
        buttons : [] // 功能点集合
      },

      access_info_dialog: false,
      dialogFormVisible: false,
      formLabelWidth: '100px',
      modification: false,

      rules: {
        name: [{required: true, message: '请输入菜单名称', trigger: 'blur'}],
        url: [{required: true, message: '请选择一个页面', trigger: 'change'}]
      }
    }
  },

  created () {
    this.getPages()
    this.getMenu()
  },

  methods: {
    ...mapMutations(['getPermission']),
    // 权限判断---按钮
    rightControl (id) {
      return this.$store.getters.getPermission(id)
    },

    // 获取菜单
    async getMenu () {
      let menu = await this.$http.get(sendURL.createMenu + '/' + parseInt(this.activeName))
      if (menu.code === 0) {
        this.menuTree = menu.data
        this.dataFliter(menu.data)
      } else this.$message.error(menu.msg)
    },

    //  获取菜单 --- 数据处理
    dataFliter (data) {
      for (let i in data) {
        if (data[i].menuType.code === 2) data[i].list = null
        else this.dataFliter(data[i].list)
      }
    },

    //  获取页面资源
    async getPages () {
      let resource = await axios.get('../../static/page.json')
      this.payWay = resource.data.pages
    },

    //  添加方向
    addMenuSite (site) {
      this.dialogFormVisible = true
      this.sendData.method = site
    },

    // 添加子集
    append (type) {
      this.dialogFormVisible = true
      this.sendData.menuType = type === 'page' ? 2 : 1
      this.sendData.method = type === 'page' ? 4 : 3
    },

    //  添加请求数据
    addSendData (data, type) {
      // this.sendData.parentIds = data.parentIds.join(',')
      this.sendData.num = data.num
      this.sendData.menuId = data.menuId
      if (type) {
        this.sendData.name = data.name
        this.modification = true
      }
    },

    // 处理选中的页面数据
    pageSelete (path) {
      if (path !== '') {
        let seletedMenu = this.payWay.filter((item) => item.path === path)
        let apis = seletedMenu[0].apis
        apis.forEach((item) => {
          let api = {}
          api.desc = item.split(':')[1]
          api.funId = item.split(':')[0]
          this.sendData.buttons.push(api)
        })
        this.sendData.name = seletedMenu[0].label
        this.sendData.byname = seletedMenu[0].name
      }
    },

    // 添加初始菜单
    initMenu (menuType) {
      this.disabled = true
      this.dialogFormVisible = true
      this.sendData.menuType = menuType
      this.sendData.method = menuType
    },

    // 删除菜单
    deleteMenu (node, data) {
      if (!data.list || data.list.length <= 1) {
        this.sendDelete(data.menuId)
      } else this.$message.warning('当前菜单下存在多个子菜单')
    },

    // 发送删除请求
    async sendDelete (menuId) {
      let deleteSuccess = await this.$http.delete(sendURL.createMenu + '/' + menuId)
      if (deleteSuccess.code === 0) this.$message.success('删除成功')
      else this.$message.error(deleteSuccess.message)
      this.getMenu()
    },

    // 发送 创建、修改菜单的请求
    async sendRqs () {
      this.sendData.serveType = parseInt(this.activeName)
      let addSuccess
      if (this.modification) {
        let {method, ...sendData} = this.sendData
        addSuccess = await this.$http.put(sendURL.createMenu, JSON.stringify(sendData))
      } else addSuccess = await this.$http.post(sendURL.createMenu, JSON.stringify(this.sendData))

      if (addSuccess.code === 0) this.$message.success(addSuccess.msg)
      else this.$message.error(addSuccess.msg)

      this.closeDialog()
      this.getMenu()
    },

    // 表单验证必填项
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) this.sendRqs()
        else return false
      })
    },

    // 关闭弹窗 ---- 清除数据
    closeDialog (formName) {
    // this.$refs[formName].resetFields()
      Object.assign(this.sendData, this.$options.data().sendData)
      this.dialogFormVisible = false
      this.disabled = false
      this.modification = false
    }
  }
}
</script>
<style lang="less" scoped>
.g-menu-content {
  .u-special-color {
    color: #1989fa;
  }
  .el-tree-node__content{
    height:48px;
  }
  .u-menu-title {
    margin-top: 34px;
    display: block;
    height: 44px;
    line-height: 44px;
    opacity: 0.6;
    background: #fff7f2;
    font-size: 16px;
    color: #444444;
    padding-left: 20px;
    border-bottom: 1px solid #e4e7ed;
    margin-bottom: 10px;
  }
  .el-dropdown-link img {
    width: 15px;
    height: 15px;
  }
  .u-operate-icon {
    display: inline-block;
    position: absolute;
    right: 32px;
  }
  .m-dialog {
    .el-row {
      margin-top: 20px;
    }
    .el-row:nth-last-child(1) {
      margin-bottom: 20px;
    }
  }
  .menu_icon{
    width:16px;
    height:16px;
    margin-right:10px;
  }
  .btn-search{
    width:200px;
    height:40px;
    display: block;
    margin:180px auto 0;
    border-radius: 4px;
    background-color: #FF7623
  }
}

.el-tooltip__popper span{
  padding:0;
  div{
    p{
      height: 30px;
      line-height: 30px;
      padding:5px 10px;
    }
  }
}
.menu-bnt>p{
  height:40px;
  line-height: 40px;
  &:hover{
    cursor:pointer;
  }
}
</style>
<style>
@import url("./element-index.less");
.el-tree-node.is-expanded>.el-tree-node__children{
  font-size:12px;
}
  .el-tree-node__content{
    height:40px;
  }
</style>
