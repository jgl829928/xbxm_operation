<template>
  <div class="g-contract-type">
      <el-row >
        <el-col :span="8" v-show="rightControl('contractType_add')">
            <el-button class="btn-search btn-add" type="primary" @click="addcontract_type">添加</el-button>
        </el-col>
      </el-row>
 <el-dialog title="合同类型-添加" :visible.sync="dialogFormVisible" class="s-dialog">
  <el-form :model="form" :rules="rules" ref="form">
    <el-form-item label="合同类型名称" label-width="105px" prop="contractTypeName">
      <el-input v-model.trim="form.contractTypeName" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="contractAdd('form')" class="btn-save">确 定</el-button>
    <el-button @click="reset('form')" class="btn-reset">取 消</el-button>
  </div>
</el-dialog>
    <div class="c-table-wrap">
      <el-table
        :data="itemList"
        style="width: 100%"
        height="500"
        stripe
        >
        <el-table-column
          align="center"
          prop="contractTypeName"
          label="合同类型名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createUserName"
          label="创建人">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          min-width="100">
          <template slot-scope="scope">
            <el-button class="btn-handle btn-add" type="primary" @click="contractDel(scope.row.contractTypeCode)" :disabled="!rightControl('contractType_delete')">
                删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
    </div>
  </div>
</template>
<script>
import ApiSetting from '@/api/basicApi-estateApi'
export default {
  name:'contractType',
  data() {
    return {
      dialogFormVisible:false,
      itemList:[
      ],
      form:{
        contractTypeName:""
      },
      rules:{
        contractTypeName:[{ required: true, message: '请输入内容', trigger: 'blur' },{ max: 20, message: '请输入内容限制在20字内', trigger: 'blur' }]
      },
      formLabelWidth: '120px'
    }

  },
  created(){
    this.getData()
  },
      watch: {
  dialogFormVisible: function(val,oldVla) {
    this.$nextTick(() => {
          this.$refs['form'].resetFields();
      }, 0);
    }
},
  methods: {
    // 权限判断
    rightControl (id) {
      return this.$store.getters.getPermission(id)
    },
   addcontract_type(){
    this.dialogFormVisible = true
   },
    indexMethod(index) {
      return index + (this.reqData.page - 1)*20 + 1
    },
    //获取合同列表
    getData(){
        this.$http.get(ApiSetting.constractsList)
        .then(res => {
          if(!res) return
          this.itemList = res.data
        })
    },
    //添加合同类型
    contractAdd(form){
       this.$refs[form].validate((valid) => {
          if (valid) {
              this.$http.post(ApiSetting.constractsList,{
        ...this.form
      }).then(res => {
        if(res){
          if(res.code == 0){
            this.$message.success(res.msg)
            this.getData()
            this.dialogFormVisible = false
          }else{
           return this.$message.error(res.msg)
          }

        }

      })
          } else {

          }
      })

    },
    //删除合同类型
    contractDel(code){

            this.$confirm('此操作将永久删除该数据, 是否继续?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.$http.delete(`${ApiSetting.constractsList}/${code}`).then(res => {
        if(res){
          if(res.code == 0) {
            this.$message({
            type: 'success',
            message: res.msg
          });
            this.getData()
            }else{
        this.$message.error(res.msg)
      }
   }
})


}).catch(err => {


        })
    },
    reset(){
      this.dialogFormVisible = false
    }
  }
};
</script>
