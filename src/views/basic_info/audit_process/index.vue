<template>
  <div class="g-audit-process">
      <el-row>
        <el-col :span="8" v-show="rightControl('auditProcess_add')">
             <el-button class="btn-search btn-add" type="primary" @click="addcontract_type(1)">添加</el-button>
        </el-col>
      </el-row>
 <el-dialog title="审核流程" :visible.sync="dialogFormVisibleL" class="l-dialog" @close="reset">
    	 <el-form  class="c-search-form" :model="reqData" :rules="rules" ref="reqData" label-width="102px" :inline="true"
              label-position="right">
		 <el-row>
        <el-col :span="12">
          <el-form-item label="流程类型" prop="auditType">
            <el-select v-model="reqData.auditType" clearable placeholder="请选择" :disabled="!checkPost">
              <el-option
                v-for="(item, index) in auditTypeList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
        <el-col :span="12">
          <el-form-item label="所在省市" prop="areaCode">
            <el-select v-model="reqData.areaCode" clearable placeholder="请选择" @change="changeMarket(reqData.areaCode)" :disabled="!checkPost">
              <el-option
                v-for="(item, index) in areaList"
                :key="index"
                :label="item.areaName"
                :value="item.areaCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row >
        <el-col :span="12">
          <el-form-item label="商场名称" prop="marketCode">
            <el-select v-model="reqData.marketCode" clearable placeholder="请选择" :disabled="!checkPost">
              <el-option
                v-for="(item, index) in marketList"
                :key="index"
                :label="item.marketName"
                :value="item.marketCode">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
      </el-row>
    <el-row  class="u-area-input">
      <el-col :span="3" class="u-center">
    	<span>流程审核</span>
     </el-col>
    <el-col :span="19" class="u-domain">
			  <el-form-item
    v-for="(domain, index) in reqData.roleNames"
    :label="'审核人' + (index+1)"
    :key="index"
    :prop="'roleNames.' + index + '.roleName'"
    :rules="{
      required: true, message: '审核人不能为空', trigger: 'change'
    }"
    label-width="70px"
  >
    <el-select v-model="domain.roleName" clearable placeholder="请选择" >
              <el-option
                v-for="(item, index) in auditorList"
                :key="index"
                :label="item.roleName"
                :value="item.roleName">
              </el-option>
            </el-select>
            <i class="el-icon-remove-outline u-del" v-if="index != 0" @click.prevent="removeDomain(domain)"></i>
            <i class="el-icon-circle-plus-outline u-add" @click="addDomain" v-if="index == 0"></i>
  </el-form-item>
</el-col>
</el-row>
</el-form>
    
     <div slot="footer" class="dialog-footer">
            <el-button class="btn-save" type="primary"  @click="handleSave('reqData')">保存</el-button>
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
          width="50">
        </el-table-column>
        <el-table-column
          align="center"
          prop="auditTypeCode"
          label="流程编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="auditType"
          label="流程类型">
          <template slot-scope="scope">
            <div v-for="(item,index) in auditTypeList" :key="index">
              {{scope.row.auditType == item.value?item.label:""}}
            </div>  
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="marketName"
          label="商场名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="areaName"
          label="所在省市">
      </el-table-column>
          <el-table-column
          align="center"
          prop="createTime"
          min-width="165px"
          label="登记时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createUserName"
          label="登记人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="updateTime"
          min-width="165px"
          label="修改时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="updateUserName"
          label="修改人">
        </el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          min-width="200">
          <template slot-scope="scope">
            <el-button class="btn-handle" type="primary" @click="addcontract_type(scope.row)" :disabled="!rightControl('auditProcess_edit')">
                修改
            </el-button>
            <el-button class="btn-handle" type="primary" @click="checkInfo(scope.row.roleNames)" :disabled="!rightControl('auditProcess_info')">
                详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
  title="提示"
  :visible.sync="dialogVisibleM"
  width="30%"
   class="m-dialog el-steps-dialog">
  <el-steps :space="200" align-center>
  <el-step :title="item" v-for="(item,index) in auditInfo" :key="index"></el-step>
</el-steps>
     <div slot="footer" class="dialog-footer">
    <el-button type="primary"  @click="dialogVisibleM = false" class="btn-close">关闭</el-button>
  </div>
</el-dialog>
    </div>
  </div>
</template>

<script>
import ApiSetting from '@/api/basicApi-estateApi'
import ApiSettingCom from '@/api/apiSetting'
import {getDataAll,keysFilter} from '@/utils/auth'
export default {
  name:'auditProcess',
  data() {
    return {
      dialogFormVisibleL:false,
      dialogVisibleM:false,
      reqData:{
        auditTypeCode:'',
        auditType:'',
        marketCode:'',
        areaCode:'',
        roleNames: [{roleName:''}],
      },
      itemList:[
      
      ],
      form:{
        name:''
      },
      auditInfo:[],
      auditTypeList:[
        {label: '指标任务审核流程', value: 1},
        {label: '合同常规审核流程', value: 2},
        {label: '合同终止审核流程', value: 3},
        {label: '合同非常规审核流程', value: 4},
        {label: '合同费用退款审核流程', value: 5},
        {label: '日常费用退款审核流程', value: 6},
      ],
      rules:{
        marketCode:[{ required: true, message: '请选择商场', trigger: 'change' }],
        areaCode:[{ required: true, message: '请选择所在省市', trigger: 'change' }],
        auditType:[{ required: true, message: '请选择商场名称', trigger: 'change' }],
      },
      reqBdata:{
        auditTypeCode:'',
        auditType:'',
        marketCode:'',
        areaCode:'',
        roleNames: [{roleName:''}],
      },
      formLabelWidth: '120px',
      areaList:[],
      marketList:[],
      auditorList:[
      ],
      checkPost:"",
    }
  },
  created(){
    this.getData()
    this.getRoles()
    this.handleCascader(null,'areaList',ApiSettingCom.cascaderMarket)
  },
  methods: {
     // 权限判断
    rightControl (id) {
      return this.$store.getters.getPermission(id)
    },
    //获取审核角色
    getRoles(){
      this.$http.get(ApiSetting.auditsRoles).then(res => {
        if(res && res.code == 0 && res.data){
          this.auditorList = res.data
        }
      })
    },
    reset(){
      this.dialogFormVisibleL = false
      // if(!this.checkPost){
      //   var len = window.localStorage.getItem('roleNamesLen')
      //   this.reqData.roleNames.splice(len)
      // }
      this.marketList = []
      this.$refs['reqData'].resetFields();
      setTimeout(() => {
        this.$refs['reqData'].clearValidate();
      },20)
    },
   addcontract_type(data){
    let _this = this
    this.dialogFormVisibleL = true
    if(data != 1){
      this.checkPost = false
      this.handleCascader(data.areaCode,'marketList',ApiSettingCom.marketSearch)
      this.$nextTick(() => {
        window.localStorage.setItem('roleNamesLen',data.roleNames.length)
        this.reqData = keysFilter(data,true,['createTime','createUser','createUserName','updateTime','updateUser','updateUserName'])
        this.reqData.roleNames = this.reqData.roleNames.map(item => {
          return {roleName:item}
        })
     })
  
    }else{
      this.checkPost = true
      this.reqData = keysFilter(this.reqBdata,true,'')
    }
   },
   handleSave(formName){
    this.$refs[formName].validate((valid) => {
          if (valid) {
            let reqData = keysFilter(this.reqData,true,'roleNames')
            let roleNames = this.reqData.roleNames.map(item => {
                return item.roleName
              })
           if(this.checkPost){
              let data={...this.reqData,roleNames:roleNames}
              this.handleData('post','',data)
            }else{
              let data2=roleNames
              this.handleData('put',this.reqData.auditTypeCode,data2)
            }
            
          } else {
            return false;
          }
        });
   },
   handleData(method,code,data){
    this.$http({
      url:`${ApiSetting.audits}/${code}`,
      method:method,
      data:data
    }).then(res => {
              if(res){
                if(res.code == 0){
                  this.$message.success(res.msg)
                  this.dialogFormVisibleL = false
                  this.getData()
                }else{
                  this.$message.error(res.msg)
                }
              }
            })
   },
    //删除dom
    removeDomain(item) {
        var index = this.reqData.roleNames.indexOf(item)
        if (index !== -1) {
          this.reqData.roleNames.splice(index, 1)
        }
      },
      //添加dom
      addDomain() {
        this.reqData.roleNames.push({roleName:''});
        if(this.reqData.roleNames.length > 10){
           this.reqData.roleNames.length = 10
          this.$message.error('最多只能添加10个审核')
        }
      },
      checkInfo(data){
        this.dialogVisibleM = true 
        this.auditInfo = data
      },
      getData(){
        var _this = this
        getDataAll(undefined,undefined,ApiSetting.audits,_this)
      },
          //联动
    handleCascader(val,list,url){
         this.$http({
        url:url,
        method:'get',
        params:{areaCode:val}
      }).then(res => {
        if(res){
          if(res.code == 0) {
            this[list] = res.data
          }
        }
      })
    },
     changeMarket(data){
        this.reqData.marketCode = ""
            if(!data){
        this.marketList = []
      }else{
         this.handleCascader(data,'marketList',ApiSettingCom.marketSearch)
      }
    }
  }
};
</script>
<style lang="less">
	@import './index-element.less';
</style>
<style lang="less" scoped>
  .u-center {
    text-align: right;
    padding-right: 4px !important;
    margin-left: 16px;
    margin-top: 10px;
    span:before {
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }
  }
</style>