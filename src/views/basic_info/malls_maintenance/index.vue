<template>
  <div class="g-malls-maintenance">
    <el-form class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true"
             label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商场名称" prop="marketName">
            <el-input clearable v-model.trim="reqData.marketName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="areaCode" label="所在省市">
            <el-select v-model="reqData.areaCode" clearable placeholder="请选择">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.areaName"
                         :value="item.areaCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button class="btn-search" type="primary" @click="search">查询</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" v-show="rightControl('mallsMain_add')">
          <el-button class="btn-search btn-add" type="primary" @click="addcontract_type(1)">添加</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog :title="title" :visible.sync="dialogFormVisibleL" class="l-dialog" @close="reset">
      <el-form class="c-search-form" :model="reqDiaData" :rules="rules" ref="reqDiaData" label-width="110px"
               :inline="true"
               label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商场名称" prop="marketName">
              <el-input clearable v-model.trim="reqDiaData.marketName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="areaCode" label="所在省市">
              <el-select v-model="reqDiaData.areaCode" clearable placeholder="请选择" :disabled="!checkPost">
                <el-option v-for="(item, index) in areaListAll" :key="index" :label="item.areaName"
                           :value="item.areaCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="负责人" prop="responsibleUserName">
              <el-input clearable v-model.trim="reqDiaData.responsibleUserName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人联系电话" prop="contactTel">
              <el-input clearable v-model.trim="reqDiaData.contactTel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="固定电话" prop="landlineTel">
              <el-input clearable v-model.trim="reqDiaData.landlineTel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="楼层" prop="floors">
              <el-select v-model="reqDiaData.floors" multiple placeholder="请选择">
                <el-option
                  v-for="(item,index) in floorList"
                  :key="item.floorNum"
                  :label="item.floorName"
                  :value="item.floorNum"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="状态" prop="status">
              <el-switch>
                <el-radio-group v-model="reqDiaData.status">
                  <el-radio :label="true">启用</el-radio>
                  <el-radio :label="false">禁用</el-radio>
                </el-radio-group>
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="u-area-input">
          <el-col :span="24">
            <el-form-item label="商场地址" prop="address">
              <el-input type="textarea" v-model.trim="reqDiaData.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-save" type="primary" @click="handleSave('reqDiaData')">保存</el-button>
        <el-button class="btn-reset" type="primary" @click="reset">取消</el-button>
      </div>
    </el-dialog>
    <div class="c-table-wrap">
      <el-table
        :data="itemList"
        style="width: 100%"
        align="center"
        height="500"
        stripe>
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          align="center"
          prop="marketName"
          label="商场名称">
          <template slot-scope="scope">
            <p class="u-color" @click="checkInfo(scope.row)">{{scope.row.marketName}}</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="marketCode"
          min-width="160"
          label="商场编码">
        </el-table-column>
        <el-table-column
          align="center"
          prop="areaCodeName"
          label="所在省市">
        </el-table-column>
        <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="scope">
            {{scope.row.status == true?"启用":"禁用"}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="responsibleUserName"
          label="负责人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="contactTel"
          min-width='120'
          label="负责人联系电话">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="商场地址">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createUserName"
          label="登记人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          min-width="165"
          label="登记时间">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed='right'
          min-width="100">
          <template slot-scope="scope">
            <el-button class="btn-handle" type="primary" @click="addcontract_type(scope.row)"
                       :disabled="!rightControl('mallsMain_info')">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="区域-修改" :visible.sync="dialogFormVisibleM" class="m-dialog">
        <el-row>
          <el-col :span="12">
            <span class="u-unit">商场名称</span>
            <span class="u-value">{{marketInfo.marketName}}</span>
          </el-col>
          <el-col :span="12">
            <span class="u-unit">所在省市</span>
            <span class="u-value">{{marketInfo.areaCodeName}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="u-unit">负责人</span>
            <span class="u-value">{{marketInfo.responsibleUserName}}</span>
          </el-col>
          <el-col :span="12">
            <span class="u-unit">负责人联系电话</span>
            <span class="u-value">{{marketInfo.contactTel}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="u-unit">楼层</span>
            <el-tooltip effect="light" :content="marketInfo.floors" placement="bottom">
              <span class="u-value">{{marketInfo.floors || "--"}}</span>
            </el-tooltip>
          </el-col>
          <el-col :span="12">
            <span class="u-unit">区域</span>
            <el-tooltip effect="light" :content="marketInfo.marketPartitionName" placement="bottom">
              <span class="u-value">{{marketInfo.marketPartitionName || "--"}}</span>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="u-unit">状态</span>
            <span class="u-value">{{marketInfo.status == true?'启用':'禁用'}}</span>
          </el-col>
          <el-col :span="12">
            <span class="u-unit">商场地址</span>
            <el-tooltip effect="light" :content="marketInfo.address" placement="bottom">
              <span class="u-value">{{marketInfo.address}}</span>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="u-unit">登记人</span>
            <span class="u-value">{{marketInfo.createUserName}}</span>
          </el-col>
          <el-col :span="12">
            <span class="u-unit">登记时间</span>
            <el-tooltip effect="light" :content="marketInfo.createTime" placement="bottom">
              <span class="u-value">{{marketInfo.createTime}}</span>
            </el-tooltip>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="u-unit">商场固定电话</span>
            <span class="u-value">{{marketInfo.landlineTel}}</span>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button class="btn-close" type="primary" @click="dialogFormVisibleM = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
    <pagenation :pageparams="pageparams" :itemList="itemList" @handlePage="handlePage"></pagenation>
  </div>
</template>

<script>
  import pagenation from '@/components/pagenation'
  import {getDataAll, keysFilter} from '@/utils/auth'
  import ApiSetting from '@/api/basicApi-estateApi'
  import ApiSettingCom from '@/api/apiSetting'

  export default {
    name: 'mallsMain',
    data() {
      return {
        title: '',
        dialogFormVisibleM: false,
        dialogFormVisibleL: false,
        pageparams: {},
        reqData: {
          areaCode: '',
          marketName: '',
        },
        reqDiaData: {
          address: "",
          areaCode: "",
          contactTel: "",
          landlineTel: "",
          floors: [],
          status: true,
          marketCode: "",
          marketName: "",
          responsibleUserName: ""
        },
        floorList: [
          {floorNum: -3, floorName: '-3楼', disabled: false},
          {floorNum: -2, floorName: '-2楼', disabled: false},
          {floorNum: -1, floorName: '-1楼', disabled: false},
          {floorNum: 1, floorName: '1楼', disabled: false},
          {floorNum: 2, floorName: '2楼', disabled: false},
          {floorNum: 3, floorName: '3楼', disabled: false},
          {floorNum: 4, floorName: '4楼', disabled: false},
          {floorNum: 5, floorName: '5楼', disabled: false},
          {floorNum: 6, floorName: '6楼', disabled: false},
          {floorNum: 7, floorName: '7楼', disabled: false},
          {floorNum: 8, floorName: '8楼', disabled: false}
        ],
        reqBdata: {
          address: "",
          areaCode: "",
          contactTel: "",
          landlineTel: "",
          floors: [],
          status: true,
          marketCode: "",
          marketName: "",
          responsibleUserName: ""
        },
        itemList: [],
        marketInfo: {},
        form: {
          name: ''
        },
        rules: {
          marketName: [{required: true, message: '请输入商场名称', trigger: 'blur'},
            {max: 20, message: '请输入限制在20字', trigger: 'blur'}
          ],
          address: [{required: true, message: '请输入商场地址', trigger: 'blur'},
            {max: 20, message: '请输入限制在20字', trigger: 'blur'}],
          contactTel: [{required: true, message: '请输入负责人电话', trigger: 'blur'},
            {pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur'}],
          floors: [{required: true, message: '请选择楼层', trigger: 'change'}],
          areaCode: [{required: true, message: '请选择城市', trigger: 'change'}],
          responsibleUserName: [{required: true, message: '请输入负责人姓名', trigger: 'blur'},
            {max: 20, message: '请输入限制在20字', trigger: 'blur'}],
          landlineTel: [
            {required: true, message: '请输入商场固话', trigger: 'blur'},
            {pattern: /^0\d{2,3}-\d{7,8}$/, message: '请输入正确的商场固话', trigger: 'blur'}
          ]

        },
        formLabelWidth: '120px',
        areaList: [],
        areaListAll: [],
        checkPost: ""
      }

    },
    components: {pagenation},
    created() {
      this.getData()
      this.getArea(null, 'areaList', ApiSettingCom.areaAll)
      this.getArea(null, 'areaListAll', ApiSettingCom.getArea)
    },
    methods: {
      // 权限判断
      rightControl(id) {
        return this.$store.getters.getPermission(id)
      },
      reset() {
        this.dialogFormVisibleL = false
        this.reqDiaData = this.reqBdata
        this.floorList.forEach(item => {
          item.disabled = false
        })
        var len = window.localStorage.getItem('floorsLen')
        this.reqDiaData.floors.splice(len)
        this.floorList.forEach(item => {
          item.disabled = false
        })
        this.$refs['reqDiaData'].resetFields();
        this.$nextTick(() => {
          this.$refs['reqDiaData'].clearValidate();
        })
      },
      // disabledRemove(tag){
      //     this.floorList.forEach(item =>{
      //           if(item.disabled == true){
      //             if(this.reqDiaData.floors.indexOf(tag) == -1){
      //               //this.reqDiaData.floors.(tag)
      //             }
      //           }
      //     })
      // },
      addcontract_type(data) {
        let _this = this
        this.dialogFormVisibleL = true
        if (data != 1) {
          this.checkPost = false
          this.title = "商场-修改"
          this.$nextTick(() => {
            _this.reqDiaData.address = data.address
            _this.reqDiaData.areaCode = data.areaCode
            _this.reqDiaData.marketCode = data.marketCode
            _this.reqDiaData.marketName = data.marketName
            _this.reqDiaData.contactTel = data.contactTel
            _this.reqDiaData.status = data.status
            _this.reqDiaData.responsibleUserName = data.responsibleUserName
            _this.reqDiaData.landlineTel = data.landlineTel
            if (data.floors) {
              window.localStorage.setItem('floors', data.floors.length)
              this.floorList.forEach(item => {
                data.floors.forEach(item1 => {
                  if (item.floorNum == item1.floorNum) {
                    item.disabled = item1.disable
                  }
                })
              })
              this.reqDiaData.floors = data.floors.map(item => {
                return item.floorNum
              })
              window.tempFloors = data.floors
            }
          })

        } else {
          this.checkPost = true
          this.title = "商场-添加"
        }
      },
      handleSave(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.checkPost) {
              this.handleData('post', {...this.reqDiaData})
            } else {
              // this.reqDiaData.floors = this.reqDiaData.floors.map(item => {
              //          return item.floorNum
              //        })
              this.handleData('put', {...this.reqDiaData})
            }

          } else {
            return false;
          }
        });
      },
      handleData(method, data) {
        this.$http({
          url: `${ApiSetting.markets}`,
          method: method,
          data: data
        }).then(res => {
          if (res) {
            if (res.code == 0) {
              this.$message.success(res.msg)
              this.dialogFormVisibleL = false
              this.getData()
            } else {
              this.$message.error(res.msg)
            }
          }
        })
      },
      search() {
        this.getData()
      },
      indexMethod(index) {
        return index + (this.pageparams.currentPage - 1) * 20 + 1
      },
      checkInfo(data) {
        this.dialogFormVisibleM = true
        this.marketInfo = keysFilter(data, true, ['floors'])
        if (data.floors) {
          var floor = data.floors.map(item => {
            return item.floorNum
          })
          this.marketInfo.floors = floor.join("、")
          console.log(this.marketInfo.floors)
        }

      },
      getData(page) {
        var _this = this
        var page = page || ""
        var data = {
          ..._this.reqData,
          currentPage: page
        }
        getDataAll(page, data, ApiSetting.markets, _this)
      },
      handlePage(val) {
        this.getData(val)
      },
      //获取省市
      getArea(val, list, url) {
        this.$http({
          url: url,
          method: 'get',
          params: {areaCode: val}
        }).then(res => {
          if (res) {
            if (res.code == 0) {
              this[list] = res.data
            }
          }
        })
      },
    }
  };
</script>
<style lang="less">
  .g-malls-maintenance {
    .u-area-input .el-form-item__content {
      width: 82%;
      vertical-align: middle;
    }
    .c-search-form.el-form--inline .el-form-item {
      width: 100%;
      vertical-align: unset;
    }
    .m-dialog .el-dialog__body {
      padding-left: 0px;
      .el-col-12 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
      }
    }
    .el-select .el-input.is-disabled .el-input__inner {
      height: 30px !important;
    }
  }
</style>
<style lang="less" scoped>
  .u-color {
    color: #1989FA;
    cursor: pointer;
  }

  .u-value {
    color: #9B9B9B;
  }

  .u-unit {
    display: inline-block;
    width: 102px;
    margin-right: 12px;
    margin-bottom: 22px;
    text-align: right;
  }
</style>
