<template>
<div class="booth-grouping">
  <el-form class="c-search-form" :model="pageParams" ref="pageParams" label-width="102px" label-position="right" :inline="true">
    <el-row :gutter="32">
      <el-col :span="8">
        <el-form-item label="摊位组名称">
          <el-input clearable v-model.trim="pageParams.boothGroupsName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="楼层经理">
          <el-input clearable v-model.trim="pageParams.manager"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="商场名称">
          <selectMarket :reqData="pageParams"/>

        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :span="8">
        <el-form-item label="状态">
          <el-select v-model.trim="pageParams.groupsStatus" clearable placeholder="请选择">
            <el-option
              v-for="(item, index) in statusList"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="8">
        <div class="c-footer-btn">
          <el-button class="btn-search" type="primary" icon="el-icon-search" @click="groupingList(1)">查询</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
  <div>
    <el-button class="btn-search btn-add" type="primary" @click="Dialog('add')" v-show="rightControl('boothGroupe_4')">添加</el-button>
  </div>
  <div class="c-table-wrap">
    <el-table  :data="itemList" style="width:100% !important" align="center" stripe height="500">
      <el-table-column align="center" type="index" label="序号" width="50">
      </el-table-column>
      <el-table-column align="center" prop="boothGroupsName" label="摊位组名称" minWidth='120'>
      </el-table-column>
      <el-table-column align="center" prop="marketName" label="商场名称"  width='120'>
      </el-table-column>
      <el-table-column align="center" prop="manager" label="楼层经理"  width='120'>
      </el-table-column>
      <el-table-column align="center" prop="groupsStatus" label="状态"   width='110'>
        <template slot-scope="scope">
          {{scope.row.groupsStatus == true?'启用':'停用'}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateTime" label="最后修改时间"  width="165">
      </el-table-column>
      <el-table-column align="center" prop="operatorName" label="最后修改人"  width='120'>
      </el-table-column>
      <el-table-column align="center" width="300" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button class="btn-handle" type="primary" @click="particulars(scope.row.boothGroupsCode)" :disabled="!rightControl('boothGroupe_2')">详情</el-button>
          <el-button class="btn-handle" type="primary" @click="Dialog('edit',scope.row.boothGroupsCode)" :disabled="!rightControl('boothGroupe_3')">修改</el-button>
          <el-button class="btn-handle btn-add" type="primary" @click="del(scope.row.boothGroupsCode)" :disabled="!rightControl('boothGroupe_5')">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>

  <Pagenation :pageparams="pageDefault" @handlePage="groupingList" :itemList="itemList" />

  <el-dialog :title="title" :visible.sync="centerDialogVisible" class="l-dialog" @close="reset">
    <el-dialog
      width="30%"
      title="选择摊位"
      :visible.sync="innerVisible"
      class="l-dialog booth-dialog"  append-to-body>
      <el-form label-width="100px">
        <el-row :gutter="32">
          <el-col :span="12" :xs="24">
            <el-form-item label="商场名称">
              <span class="gray">{{marketInfo.marketName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="楼层">
              <el-select v-model.trim="floorStatus" clearable placeholder="全部层" @change="selectFloor">
                <el-option
                  v-for="(item, index) in floorList"
                  :key="index"
                  :label="item + '层'"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-transfer class='booth-dialogTransfer' v-model="boothNoValue" :data="boothNoList"></el-transfer>

      <span slot="footer" class="dialog-footer">
        <el-button class="btn-primary btn-save" type="primary" @click="boothNoSubmit">保 存</el-button>
        <el-button class="btn-primary btn-reset" type="primary" @click="innerVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <div>
      <el-form ref="ruleForm"  :rules="rules" :model="ruleForm" label-width="100px" >
        <el-row :gutter="32">
          <el-col :span="12" :xs="24">
            <el-form-item label="摊位组名称"  prop="boothGroupsName">
              <el-input clearable v-model.trim="ruleForm.boothGroupsName" maxlength='50'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="商场名称" v-if="affiliation==2">
                <span class="gray" >{{ruleForm.marketName}}</span>
            </el-form-item>
            <el-form-item label="商场名称"  prop="marketCode" v-if="affiliation==1">
                <el-select v-model="ruleForm.marketCode" clearable placeholder="请选择" @change='marketChange' >
                  <el-option
                    v-for="(item, index) in marketNameOption"
                    :key="index"
                    :label="item.marketName"
                    :value="item.marketCode">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="12" :xs="24" v-if="affiliation==1&&ruleForm.marketCode || affiliation==2">
            <el-form-item label="楼层经理" prop="manager" >
              <el-select v-model.trim="ruleForm.manager" clearable placeholder="请选择" @change="selectVal">
                <el-option
                  v-for="(item, index) in managerList"
                  :key="index"
                  :label="item.employeeName"
                  :value="item.employeeName"  >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24" v-if="affiliation==1&&ruleForm.marketCode || affiliation==2">
            <el-form-item label="摊位编号" prop="boothNumber">
              <el-input v-model.trim="ruleForm.boothNumber" @focus="boothSelect"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="状态">
          <el-radio-group v-model.trim="ruleForm.groupsStatus">
            <el-radio :label='1' class="gray">启用</el-radio>
            <el-radio :label='0' class="gray">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button class="btn-primary btn-save" type="primary" @click="submitForm('ruleForm')">保 存</el-button>
    <el-button class="btn-primary btn-reset" type="primary" @click="reset">取 消</el-button>
  </span>
  </el-dialog>

  <el-dialog
    width="30%"
    title="摊位组-详情"
    :visible.sync="particularsVisible"
    class="l-dialog">
    <el-form label-width="100px">
      <el-row :gutter="32">
        <el-col :span="12" :xs="24">
          <el-form-item label="摊位组名称">
            <span class="gray">{{particularsData.boothGroupsName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item label="商场名称">
            <span class="gray">{{particularsData.marketName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item label="楼层经理">
            <span class="gray">{{particularsData.manager}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item label="状态">
            <span class="gray">{{particularsData.groupsStatus == true?'启用':'禁用'}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-form-item label="摊位号">
            <span class="gray">{{particularsData.boothNumber}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">

      <el-button class="btn-primary btn-reset" type="primary" @click="particularsVisible = false">关 闭</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script>
  import api from '@/api/boothApi';
  import Pagenation from '@/components/pagenation';
  import selectMarket from '@/components/selectMarket';
export default {
  name:'boothGroupe',
  components:{
    Pagenation,
    selectMarket
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser
    }
  },
  data() {
    return {
      boothNoList:[],//摊位列表
      boothNoValue: [], //已选摊位
      centerDialogVisible: false,
      innerVisible: false,
      particularsVisible: false,
      affiliation:2, //是否是总部账号   1是
      pageDefault: {//分页默认参数
        totalRecords: 0,
        currentPage:1,
        pageSize: 20
      },
      marketInfo:{'marketName':'龙泉商场','marketCode':'51000001'},  //商场信息
      title: '摊位组-新增',
      formType: 'add',
      boothGroupsCode: '',  //列表摊位id
      pageParams: { //搜索表单
        boothGroupsName: '',
        manager: '',
        marketCode: '',
        groupsStatus: '',
        currentPage:1
      },
      marketNameOption:[],  //商场名称
      statusList:[//搜索-状态
        {label: '启用',value: 1},
        {label: '停用',value: 0}
      ],
      managerList:[],//楼层经理
      particularsData:{}, //详情数据
      ruleForm: { //新增修改表单
        groupsStatus:1,
        boothGroupsName: '',
        boothNumber: '',
        marketCode:'',
        marketName:'',
        managerCode:'',
        manager:''
      },
      rules:{
        boothGroupsName:[
          {required:true,message:'请输入摊位组名称',trigger:'blur'}
        ],
        manager:[
          {required:true,message:'请选择楼层经理',trigger:'change'}
        ],
        marketCode:[
          {required:true,message:'请选择商场',trigger:'change'}
        ],
        boothNumber:[
          {required:true,message:'请输入摊位编号',trigger:'change'}
        ]
      },
      itemList: [ //列表
        // {
        //   boothGroupsName: "",
        //   manager: "",
        //   operatorName: "",
        //   updateTime: "",
        //   marketName: "",
        //   groupsStatus:""
        // }
      ],
      floorList: ['全部'],  //楼层列表
      floorStatus:"",  //默认楼层

    }
  },
  mounted() {
    let _this=this
    this.groupingList()
    this.marketInfo=this.currentUser
    // console.log(this.marketInfo)
    if(this.currentUser.affiliation ==1){
      this.affiliation=1
      this.$http.get(api.marketsName, {params: {areaCode:''}}).then(res=>{
        if(res.code===0){
          this.marketNameOption=res.data;
        }
      })
    }else{
      this.affiliation=2
      this.ruleForm.marketName=this.marketInfo.marketName
      this.ruleForm.marketCode=this.marketInfo.marketCode
      //获取楼层经理
      this.$http.get(api.floorManagers, {params:{marketCodes:'['+_this.marketInfo.marketCode+']'}}).then(res=>{
        if(res.code===0){
          _this.managerList=res.data
        }
      });
    }

  },
  methods: {
    marketChange(val){
      let _this=this
      // console.log(_this.ruleForm.marketCode)
      _this.ruleForm.boothNumber=''
      _this.ruleForm.manager=''
      _this.boothNoValue=[]
      //获取楼层经理
      this.$http.get(api.floorManagers, {params:{marketCodes:'['+val+']'}}).then(res=>{
        if(res.code===0){
          _this.managerList=res.data
        }
      });
      _this.marketNameOption.forEach(item=>{
        if(item.marketCode == val){
          _this.marketInfo.marketName=item.marketName
          _this.marketInfo.marketCode=val
        }
      })


    },
      // 权限判断
    rightControl (id) {
      return this.$store.getters.getPermission(id)
    },
    selectVal(val){
      let _this=this
      // console.log(val)
      _this.managerList.forEach((item,index)=>{
        if(val == item.employeeName){
          _this.ruleForm.manager=item.employeeName
          _this.ruleForm.managerCode=item.empId
        }
      })

    },
    reset(){
      let _this=this
      this.centerDialogVisible = false
      this.$refs['ruleForm'].resetFields();
      this.$refs['ruleForm'].clearValidate();
    },
    groupingList(index){
      this.pageParams.currentPage = index || 1;
      this.$http.get(api.boothGroups, {params: this.pageParams}).then(res=>{
        // console.log(res)
        if (res.code === 0) {
          this.pageDefault.totalRecords = res.page.totalRecords;
          this.itemList=res.data;
        }
      });
    },
    Dialog(type,id){
      var _this=this
      this.centerDialogVisible=true;
      _this.boothNoList=[]
      _this.boothNoValue=[]
      if(type == 'add'){
        this.title='摊位组-添加'
        this.formType='add'
        setTimeout(function(){
          if(_this.affiliation ==2){
            _this.ruleForm.marketCode=_this.marketInfo.marketCode
            _this.ruleForm.marketName=_this.marketInfo.marketName
          }else{
            _this.marketInfo={}
          }
          _this.ruleForm.groupsStatus=1
          _this.$refs['ruleForm'].clearValidate();

        },100)
      }else{
        this.title='摊位组-修改'
        this.formType='edit'
        this.boothGroupsCode=id
        this.$http.get(api.boothParticulars, {params:{boothGroupsCode:id}}).then(res=>{
          if(res.code===0){
            _this.ruleForm=res.data;
            _this.boothNoValue=res.data.boothNumber.split(',')
            this.marketInfo.marketName=res.data.marketName
            this.marketInfo.marketCode=res.data.marketCode
            if(_this.affiliation==1){
              //获取楼层经理
              _this.$http.get(api.floorManagers, {params:{marketCodes:'['+_this.ruleForm.marketCode+']'}}).then(res=>{
                if(res.code===0){
                  _this.managerList=res.data
                }
              });
            }

          }
        });

      }
    },
    del(code){
      var _this=this
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(api.boothGroups,{params:{boothGroupsCode:code}}).then(res=>{
          if(res.code===0){
            this.$message.success('删除成功');
            _this.groupingList();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    boothNoSubmit(){
      var _this=this
      _this.ruleForm.boothNumber=this.boothNoValue.join(',')
      _this.innerVisible=false;
      // console.log(_this.ruleForm.boothNumber)
    },
    boothSelect(){  //选择摊位号
      var _this=this
      this.innerVisible = true
      _this.boothNoList=[]
      _this.boothNoValue=[]

      this.$http.get(api.marketFloor,{params:{marketCode:_this.marketInfo.marketCode}}).then(res=>{ //获取楼层
        if(res.code===0){
          _this.floorList=res.data.floors.split(',')
          _this.floorList.unshift('全部')
          // this.marketNameOption=res.data;
        }
      })
      this.$http.get(api.boothList,{params:{marketCode:_this.marketInfo.marketCode,floor:''}}).then(res=>{ //获取摊位
        if(res.code===0){
          for(let i=0;i<res.data.length;i++){
            _this.boothNoList.push({"key":res.data[i].boothNumber,"label":res.data[i].boothNumber})
          }

          for(let i=0;i<_this.boothNoValue.length;i++){
            _this.boothNoList.push({"key":_this.boothNoValue[i],"label":_this.boothNoValue[i]})
          }

        }
      })

    },
    selectFloor(e){
      var _this=this
      let floor=e;
      if(floor=='全部'){
        floor=''
      }
      _this.boothNoList=[]
      this.$http.get(api.boothList,{params:{marketCode:_this.marketInfo.marketCode,floor:floor}}).then(res=>{ //获取摊位
        if(res.code===0){
          for(let i=0;i<res.data.length;i++){
            _this.boothNoList.push({"key":res.data[i].boothNumber,"label":res.data[i].boothNumber})
          }
          // for(let i=0;i<_this.boothNoValue.length;i++){
          //   _this.boothNoList.push({"key":_this.boothNoValue[i],"label":_this.boothNoValue[i]})
          // }
        }
      })
    },
    particulars(code){  //详情
      this.particularsVisible=true;
      var _this=this
      this.$http.get(api.boothParticulars, {params:{boothGroupsCode:code}}).then(res=>{
        if(res.code===0){
          _this.particularsData=res.data
        }
      });
    },
    submitForm(form){
      var _this=this
      this.$refs[form].validate((valid) => {
        if(valid){
          var title=''
          if(_this.formType=='add'){
            title='添加成功'

            this.$http({
              url:api.boothGroups,
              method:'post',
              data:_this.ruleForm,
              delayLoading:true
            }).then(res => {
              if (res.code === 0) {
                this.$message.success(title);
                _this.centerDialogVisible=false;
                _this.groupingList()
                _this.boothNoList=[]
                _this.boothNoValue=[]
              }
            });

          }else{
            title='修改成功'
            _this.ruleForm.boothGroupsCode=_this.boothGroupsCode
            this.$http.put(api.boothGroups,_this.ruleForm).then(res=>{ //
              if(res.code===0){
                this.$message.success(title);
                _this.centerDialogVisible=false;
                _this.groupingList()
                _this.boothNoList=[]
                _this.boothNoValue=[]
              }
            })
          }

        }

      });
    },
    indexMethod(index) {
      return index + (this.pageParams.currentPage - 1) * 20 + 1
    },
  }
};
</script>
<style lang="less" scoped>
.booth-grouping {
    .footer-btn {
        width: 342px;
        text-align: right;
    }
    .el-dialog .el-form-item__content {
        width: 80%;
    }
    .el-dialog {
      .gray{
        color:#9B9B9B
      }
    }

}

</style>
<style lang='less'>
.booth-dialog{
  .booth-dialogTransfer{
    text-align:center;
    .el-transfer-panel{
      text-align:left;
    }
    .el-button--primary.is-disabled{
      border-radius:50%;
    }
  }

}

</style>
