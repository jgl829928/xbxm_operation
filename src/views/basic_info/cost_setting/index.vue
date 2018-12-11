<template>
  <div class="g-cost-setting">
  	 <el-form  class="c-search-form" :model="reqpageData" ref="reqpageData" label-width="102px" :inline="true"
              label-position="right">
      <el-row :gutter="32">
        <el-col :span="8" :xs="24">
          <el-form-item label="费用性质" prop="expenceProperty">
            <el-select v-model.trim="reqpageData.expenceProperty" clearable placeholder="请选择"  @focus="checkOne(1)">
              <el-option
                v-for="(item, index) in expensePropertyList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-form-item label="费用编号" prop="expenceCode">
            <el-input clearable v-model.trim="reqpageData.expenceCode" @focus="checkOne(2)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24">
          <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search1">查询</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="8" v-show="rightControl('costSetting_add')">
             <el-button class="btn-search btn-add" type="primary" @click="addcontract_type()">添加</el-button>
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
          type="index"
          label="序号"
          width="50"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          align="center"
          prop="expenceName"
          label="费用类型">
        </el-table-column>
        <el-table-column
          align="center"
          prop="expenceCode"
          label="费用编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="marketName"
          label="所在商场">
        </el-table-column>
        <el-table-column
          align="center"
          prop="expencePeriod"
          label="周期性质">
          <template slot-scope="scope">
            {{scope.row.expencePeriod == 1?'一次性':'周期性'}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="expenceIncome"
          label="收入性质">
          <template slot-scope="scope">
            {{expenceIncomeMap[scope.row.expenceIncome].text}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="expenceProperty"
          label="费用性质">
          <template slot-scope="scope">
            {{scope.row.expenceProperty == 1?'合同费用':'非合同费用'}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="expenceBilling"
          label="费用计价方式"
          min-width="120px">
           <template slot-scope="scope">
            {{expenceBillingMap[scope.row.expenceBilling].text}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="单价">
          <template slot-scope="scope">
            <p class="u-color" @click="checkInfo(scope.row)">查看</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="状态">
          <template slot-scope="scope">
            {{scope.row.status == true?'启用':'禁用'}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          min-width="100"
          >
          <template slot-scope="scope">
            <el-button class="btn-handle" type="primary" @click="editcontract_type(scope.row)" :disabled="!rightControl('costSetting_edit')">
                修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
     <el-dialog title="查看单价" :visible.sync="dialogFormVisibleS" class="s-dialog">
      <span class="u-unit">单位</span><span class="u-value">{{priceInfo.unitName}}</span>
      <el-table
        :data="priceInfo.billingS"
        style="width: 100%"
        align="center"
        stripe>
        <el-table-column
          align="center"
          prop="billingTypeName"
          label="作用面积范围(计租面积)"
          min-width="140">
          <template slot-scope="scope">
            {{scope.row.beginAcreage}}～{{scope.row.endAcreage}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="price"
          label="单价（元）">
        </el-table-column>
      </el-table>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogFormVisibleS = false" class="btn-close">关闭</el-button>
  </div>
</el-dialog>
    </div>
    <add-cost :dialogFormVisibleL="dialogFormVisibleL"
    @changeStatus="getStatus" @refresh="search" :priceInfo="priceInfo" :checkPost="checkPost" :expensePropertyList="expensePropertyList" :titleName="titleName" :reqData="reqData"></add-cost>
<pagenation :pageparams="pageparams" :itemList="itemList" @handlePage="handlePage" ></pagenation>
  </div>
</template>

<script>
import ApiSetting from '@/api/basicApi-estateApi'
import pagenation from '@/components/pagenation'
import {getDataAll,keysFilter} from '@/utils/auth'
import {mapMutations, mapState} from 'vuex'
import addCost from './_/add_cost'
export default {
  name:'costSetting',
  data() {
    return {
            reqData:{
        expenceName:"",
        expenceCode:"",
        expenceBilling:'',
        expenceProperty:'',
        expenceIncome:'',
        expencePeriod: '',
        status:'',
        expenceUnit:"",
        billingS:[{
            billingCode:"",
            beginAcreage: '0.01',
            endAcreage:'',
            price:'',
          }]
      },
      dialogFormVisibleS:false,
      dialogFormVisibleL:false,
      reqpageData:{
          expenceCode:"",
          expenceProperty:"",
          orderStage:"",
          pageSize:"20",
          searchCount:"",
      },
      expenceIncomeMap:{
        1:{text:'收入'},
        2:{text:'押金'},
        3:{text:'代收'}
      },
      expenceBillingMap:{
        1:{text:'天面积计价'},
        2:{text:'月面积计价'},
        3:{text:'年面积计价'},
        4:{text:'其他'},
      },
      expensePropertyList:[
      {label:'合同费用',value:1},
      {label:'非合同费用',value:2}
      ],
      pageparams:{},
      itemList:[
      ],
      form:{
        name:''
      },
      formLabelWidth: '120px',
      priceInfo:{},
      checkPost:"",
      titleName:''
    }

  },
  components:{pagenation,addCost},
  created(){
    this.getData()
  },
  methods: {
    // 权限判断
    rightControl (id) {
      return this.$store.getters.getPermission(id)
    },
    checkOne(num){
      if(num == 1){
        if(this.reqpageData.expenceCode != "" && this.reqpageData.expenceProperty == ""){
          this.$notify({
          title: '警告',
          message: '搜索条件只能选择一个',
          type: 'warning'
        });
          this.reqpageData.expenceProperty = ""
        }
      }else if(num == 2){
        if(this.reqpageData.expenceCode == "" && this.reqpageData.expenceProperty != ""){
          this.$notify({
          title: '警告',
          message: '搜索条件只能选择一个',
          type: 'warning'
        });
          this.reqpageData.expenceCode = ""
        }
      }
    },
   addcontract_type(data){
    this.titleName="添加费用"
    this.checkPost = false
    this.dialogFormVisibleL = true
   },
   checkInfo(data){
    this.dialogFormVisibleS = true
    this.getPrice(data.expenceCode)
   },
   getPrice(data){
    this.$http.get(`${ApiSetting.expences}/${data}/price`).then(res => {
      if(res){
        if(res.code == 0){
            this.priceInfo = res.data
        }
      }
    })
   },
   search1(){
  if(this.reqpageData.expenceCode != "" && this.reqpageData.expenceProperty != ""){
          this.$notify({
          title: '警告',
          message: '搜索条件只能选择一个',
          type: 'warning'
        });
        }else{
          this.getData()
        }
   },
   search(){
    if(this.reqpageData.expenceCode != "" && this.reqpageData.expenceProperty != ""){
          this.$notify({
          title: '警告',
          message: '搜索条件只能选择一个',
          type: 'warning'
        });
        }else{
          this.getData(this.pageparams.currentPage)
        }

   },
    indexMethod(index) {
      return index + (this.pageparams.currentPage - 1)*20 + 1
    },
    //修改
    editcontract_type(data){
      this.titleName="修改费用"
        this.checkPost = true
      this.dialogFormVisibleL = true
      this.reqData = keysFilter(data,true,'')
      this.$set(this.reqData,'billingS',[{
            billingCode:"",
            beginAcreage: '',
            endAcreage:'',
            price:'',
          }])
       this.getPrice(data.expenceCode)
    },
   //获取数据
    getData(page){
      var _this = this
      var currentpage = page ||  ""
      var dataFilter
      if(this.reqpageData.expenceCode != ""){
        dataFilter = keysFilter(this.reqpageData,true,['expenceProperty'])
      }else if(this.reqpageData.expenceProperty != ""){
         dataFilter = keysFilter(this.reqpageData,true,['expenceCode'])
      }
      var data={
        currentPage:currentpage,
        ...dataFilter
      }
     getDataAll(currentpage,data,ApiSetting.expences,_this)
    },
    handlePage(val){
      this.getData(val)
    },
    getStatus(data){
      this.dialogFormVisibleL = data
      let reqData={
        expenceName:"",
        expenceCode:"",
        expenceBilling:'',
        expenceProperty:'',
        expenceIncome:'',
        expencePeriod: '',
        status:'',
        expenceUnit:"",
        billingS:[{
            billingCode:"",
            beginAcreage: '',
            endAcreage:'',
            price:'',
          }]
      }

      this.reqData = keysFilter(reqData,true,[''])
    }

  }
};
</script>
<style lang="less">
	@import './index-element.less';
</style>
<style lang="less" scoped>
  .u-color {
    color: #1989fa;
    cursor: pointer;
  }
  .u-unit {
    display: inline-block;
    color: #444;
    margin-right: 12px;
    margin-bottom: 10px;
  }
  .u-value {
    color:#9B9B9B;
  }
  th {
    font-size: 12px;
    background: #fafafa;
  }
  table {
    border:1px solid #fafafa;
  }
  td {
    color:#9B9B9B;
  }
 .u-button {
  padding: 0 !important;
  width: 40px;
  margin-top: -8px;
  margin-left: -3px;
  color: rgb(230, 106, 32);
border-color: rgb(230, 106, 32);
 }

</style>
