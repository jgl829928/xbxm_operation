<template>
  <div class="g-device-manage">
    <el-form  class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true"
              label-position="right">
      <el-row>
           <el-col :span="8" :xs="24">
            <el-form-item label="商场" prop="marketCode">
         <select-market :reqData="reqData"></select-market>
       </el-form-item>
        </el-col>
           <el-col :span="8" :xs="24">
            <el-form-item label="设备分类">
<el-cascader
  :options="options"
  :props="props"
  @change = "handleItemChange"
  @active-item-change="handleItemChange"
  placeholder="请选择"
  :change-on-select="changeOnSelect"
  clearable
></el-cascader>
</el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label="设备编号" prop="equipmentCode">
            <el-input clearable v-model.trim="reqData.equipmentCode" placeholder="设备唯一标识"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="16">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
        </el-col>
      </el-row>
       <el-row>
        <el-col :span="8" v-show="rightControl('device_add')">
              <router-link :to="{name:'addDevice'}">
                <el-button class="btn-search btn-add" type="primary">
                添加物业设备
                </el-button>
              </router-link>
        </el-col>
      </el-row>
    </el-form>
    <div class="c-table-wrap">
      <el-table
        :data="itemList"
        style="width: 100%"
        align="center"
        height="500"
        stripe>
        <el-table-column
          align="center"
          prop="equipmentId"
          min-width="160"
          label="序号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="marketName"
          label="所属商场">
        </el-table-column>
        <el-table-column
          align="center"
          prop="rankName"
          label="一级分类">
        </el-table-column>
        <el-table-column
          align="center"
          prop="rankSecName"
          label="二级分类">
        </el-table-column>
        <el-table-column
          align="center"
          prop="equipmentModel"
          label="设备型号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="equipmentName"
          label="设备名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="equipmentCode"
          label="设备编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="location"
          label="安装位置">
        </el-table-column>
  		<el-table-column
          align="center"
          prop="maintenanceNumber"
          label="维保次数">
        </el-table-column>
        <el-table-column
          align="center"
          prop="maintenanceCost"
          label="维保金额">
        </el-table-column>
        <el-table-column
          align="center"
          label="运行状态">
          <template slot-scope="scope">
            {{runStatusMap[scope.row.runStatus].text}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createName"
          label="登记人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="登记时间"
          min-width="165">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          min-width="165"
          fixed="right">
          <template slot-scope="scope">
            <router-link
                :to="{name:'editDevice',
                params:{equipmentCode:scope.row.equipmentCode}}"
                 v-show="rightControl('device_edit')">
            <el-button class="btn-handle" type="primary">
                修改
            </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagenation :pageparams="pageparams" :itemList="itemList" @handlePage="handlePage"></pagenation>
  </div>
</template>

<script>
import ApiSetting from '@/api/basicApi-estateApi'
import ApiSettingCom from '@/api/apiSetting'
import selectMarket from '@/components/selectMarket'
import pagenation from '@/components/pagenation'
import {getDataAll} from '@/utils/auth'
export default {
  name:'device',
  data() {
    return {
      changeOnSelect:true,
      reqData:{
        equipmentCode:'',
        marketCode:'',
        orderStage:'',
        searchCount:''
      },
      pageparams:{
        currentPage:1,
      },
      itemList:[

      ],
      runStatusMap:{
        0:{text:"正常运行中"},
        1:{text:"故障维修中"},
        2:{text:"停止运行"},
        3:{text:"报废"}
      },
      props: {
        value: "rankId",
        label: "rankName",
        children: "data"
      },
      options:[],
      selectedOptions: ['', '']
    }
  },
  components:{selectMarket,pagenation},
  created(){
    this.getData()
    this.handleItemChange([])
  },
  methods: {
    // 权限判断
    rightControl (id) {
      return this.$store.getters.getPermission(id)
    },
    search() {
      this.getData()
    },
    getData(page){
      var _this = this
      var page = page  || ""
      if(!this.selectedOptions[1]){
          var rankId=this.selectedOptions[0]
      }else{
        var rankId=this.selectedOptions[1]
      }
      var data = {
        ..._this.reqData,
        rankId:rankId,
        currentPage:page
      }
      getDataAll(page,data,ApiSetting.estateDevice,_this)
    },
    //处理联动
    handleItemChange(val) {
        var code = val[val.length - 1];
        this.$http({
          url:ApiSettingCom.deviceCategory,
        method: 'get',
        params:{parentId:code}
        }).then(res => {
      if(!res || res.code != 0 ) return
          if(val && val.length === 0){
             this.options = res.data

              this.options.map((item,index) => {
                return this.$set(item,'data',[])
             })


          }else if(val && val.length === 1) {
            if(res.data.length != 0){
              this.options.filter((item,index) =>{
                if(item.rankId === res.data[0].parentId && item.data.length === 0){
                   item.data = res.data
                  }
                })
            }

            }

        })
        this.selectedOptions = val
      },
      handlePage(val){
        this.getData(val)
      }
  }
};
</script>
<style lang="less">
  .g-device-manage {
    .el-button a {
      height: 0px;
    }
  }
</style>
