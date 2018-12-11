<template>
  <div class="booth-type">
    <div>
      <el-button class="btn-search btn-add" type="primary" @click='Dialog("add")' v-show="rightControl('boothType_3')">添加</el-button>
    </div>
    <div class="c-table-wrap">
      <el-table
        :data="typeList"
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
          prop="boothTypeName"
          label="摊位类型名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="marketName"
          label="所属商场" width='120'>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="登记时间" width='165'>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createUserName"
          label="登记人" width='120'>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button class="btn-handle" @click='Dialog("edit",scope.row.boothTypeCode)' type="primary" :disabled="!rightControl('boothType_2')">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <Pagenation :pageparams="pageDefault" @handlePage="getPageList" :itemList="typeList" />

    <el-dialog
      :title="title"
      :visible.sync="centerDialogVisible"
       class="s-dialog" width="30%">
      <div>
        <el-form ref="ruleForm" :rules='rules' :model="ruleForm" label-width="80px" >
          <el-form-item label="类型名称" prop='boothTypeName' center>
            <el-input  v-model.trim="ruleForm.boothTypeName" maxlength="19"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-primary btn-save" type="primary" @click="submitForm('ruleForm')">保 存</el-button>
        <el-button class="btn-primary btn-reset" type="primary" @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api/boothApi';
  import Pagenation from '@/components/pagenation';

export default {
  name:'boothType',
  components:{
    Pagenation
  },
  data() {
    return {
      centerDialogVisible:false,
      title:'摊位类型-添加',
      typeList:[],
      pageDefault: {//分页默认参数
        totalRecords: 0,
        currentPage:1,
        pageSize: 20
      },
      boothTypeCode:'',//类型id
      formType:'add',//类型id
      ruleForm:{
        boothTypeName:''
      },
      rules:{
        boothTypeName:[
          {required:true,message:'请输入类型名称',trigger:'change'}
        ]
      },
      page:1
    }
  },
  mounted(){
    var _this=this
    this.getPageList()
  },
  methods: {
         // 权限判断
    rightControl (id) {
      return this.$store.getters.getPermission(id)
    },
    getPageList(index){  //查询
      this.pageDefault.currentPage = index || 1;
      this.$http.get(api.boothType, {params: this.pageDefault}).then(res=>{
        if (res.code === 0) {
          this.pageDefault.totalRecords = res.page.totalRecords;
          this.typeList=res.data
        }
      });
    },
    Dialog(type,id){
      this.centerDialogVisible=true;
      var _this=this
      if(type == 'add'){
        this.title='摊位类型-添加'
        this.formType='add'
        setTimeout(function(){
          _this.$refs['ruleForm'].resetFields();
        },100)
      }else{
        this.title='摊位类型-修改'
        this.boothTypeCode=id
        this.formType='edit'
        this.$http.get(api.typeCheck, {params:{boothTypeCode:id}}).then(res=>{
          if (res.code === 0) {
            this.ruleForm=res.data
          }
        });
      }
    },
    submitForm(form){
      var _this=this
      this.$refs[form].validate((valid) => {
        if(valid){
          var title=''
          if(_this.formType=='add'){
            title='添加成功'
            this.$http({
              url:api.boothType,
              method:'post',
              data:_this.ruleForm.boothTypeName,
              delayLoading:false
            }).then(res => {
              if (res.code === 0) {
                this.$message.success(title);
                _this.centerDialogVisible=false;
                _this.getPageList()
              }
            });

          }else{
            title='修改成功'
            _this.ruleForm.boothTypeCode=_this.boothTypeCode
            this.$http.put(api.typeEdit,_this.ruleForm).then(res=>{ //
              if(res.code===0){
                this.$message.success(title);
                _this.centerDialogVisible=false;
                _this.getPageList()
              }
            })
          }

        }

      });
    },
    indexMethod(index) {
      return index + (this.typeList.length - 1)*20 + 1
    },
  }
};
</script>
<style>
</style>
