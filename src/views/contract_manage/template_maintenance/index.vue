<template>
  <div class="contract-receipts">
    <el-form  class="c-search-form" :model="reqData" ref="reqData" label-width="102px" :inline="true"
              label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同名称">
            <el-input clearable v-model="reqData.contractTplName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同类型">
              <el-select v-model="reqData.contractTypeCode" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in contractsTypeList"
                  :key="index"
                  :label="item.contractTypeName"
                  :value="item.contractTypeCode">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属省份">
              <el-select v-model="location" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in province"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select v-model="reqData.contractTplStatus" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :offset="8" :span="8">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="8">
          <el-button v-if=" checkKey('templateMain_1')" class="btn-search btn-add"
                     type="primary" @click="addTpl('new')">添加</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="c-table-wrap">
      <el-table
        :data="itemList"
        style="width: 100%"
        height="500"
        align="center"
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
          prop="ss"
          label="省市">
        </el-table-column>
        <el-table-column
          align="center"
          prop="contractTplName"
          label="合同名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          align="center"
          label="合同类型"
          min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.contractType ? scope.row.contractType.contractTypeName:''}}</span>
          </template>
        </el-table-column>
         <el-table-column
          align="center"
          label="状态">
           <template slot-scope="scope">
             <span>{{scope.row.contractTplStatus ? scope.row.contractTplStatus.desc:''}}</span>
           </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间"
          min-width="165">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createUserName"
          label="创建人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="updateTime"
          label="最后修改时间"
          min-width="165">
        </el-table-column>
        <el-table-column
          align="center"
          prop="updateUserName"
          label="最后修改人"
          min-width="100">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          min-width="200">
          <template slot-scope="scope">
          	<el-button class="btn-handle"
                       type="primary"
                       :class="scope.row.contractTplStatus &&
                        scope.row.contractTplStatus.code === 1 ? 'stop':'start'"
                       :disabled="!checkKey('templateMain_2')"
                       @click="handleStatus(scope.row)">
                {{scope.row.contractTplStatus ?
                   scope.row.contractTplStatus.code === 1 ? '停用':'启用'
                  : '--'}}
            </el-button>
            <el-button :disabled="!checkKey('templateMain_3')"
                       class="btn-handle" type="primary" @click="addTpl('revise',scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <pagenation :pageparams="pageInfo" :itemList="itemList" @handlePage="handlePage"/>
    <!--合同模板-添加&修改-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addTplDialog"
      width="30%"
      class="m-dialog add-tpl-dialog">
      <el-form :model="addTplForm" :rules="rules" ref="addTplForm" label-width="100px" >
        <el-form-item label="合同名称" prop="contractTplName">
          <el-input :disabled="!isAdd" v-model="addTplForm.contractTplName"></el-input>
        </el-form-item>
        <el-form-item label="合同类型" prop="contractTypeCode">
          <el-select class="el-input-30" v-model="addTplForm.contractTypeCode" :disabled="!isAdd" clearable placeholder="请选择">
            <el-option
              v-for="(item, index) in contractsTypeList"
              :key="index"
              :label="item.contractTypeName"
              :value="item.contractTypeCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传模板">
          <el-upload
            ref="upload"
            :headers="upHeaders"
            :action="uploadUrl"
            accept=".docx"
            :file-list="fileList"
            :on-success="handleFileSuccess"
            :on-remove="handleRemove"
            :before-remove="beforeRemove">
            <el-button slot="trigger" size="small" class="choose-file-btn" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.docx文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-save" type="primary"  @click="submitAddTpl">保存</el-button>
        <el-button class="btn-reset" type="primary" @click="addTplDialog=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Api from '@/api/contact'
  import { pageListMixin } from '@/utils/mixin'
export default {
  name:'templateMain',
  mixins: [pageListMixin],
  data() {
    return {
      dialogTitle:'合同模板-添加',
      province:[], //省份列表
      location:'',//省份
      addTplDialog: false,
      reqData:{
        contractTplName:'',
        contractTypeCode:'',
        contractTplStatus:''
      },
      contractsTypeList:[], //合同类型
      statusList:[
        {label: '启用', value: 1},
        {label: '停用', value: 2},
      ],
      itemList:[],
      addTplForm:{
        contractTplId:'',
        contractTplName:'',
        contractTypeCode:'',
        contractTplUrl:''
      },
      fileList:[], // 文件列表
      isAdd: true, // 是否是新增
      uploadUrl:'',
      upHeaders:{
        gTicket:'',
        sys_authentication:'',
        sys_id:''
      },
      rules: { // 添加模板
        contractTplName: [
          { required: true, message: '请输入合同名称', trigger: 'blur' },
        ],
        contractTypeCode: [
          { required: true, message: '请选择合同类型', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getList(Api.contractTpls);
    this.getContractsType();
    let { baseURL, headers } = this.$http.defaults;
    let { sys_authentication,sys_id } = headers;
    this.upHeaders = { gTicket: this.$store.getters.gTicket, sys_authentication, sys_id };
    this.uploadUrl = baseURL + Api.uploadContract;
  },
  methods: {
    async getContractsType() {
      let res = await this.$http.get(Api.basicContracts);
      if(res){
        this.contractsTypeList = res.data;
      }
    },
    search() {
      this.reqData.currentPage = 1;
      this.getList(Api.contractTpls);
    },
    async handleStatus(item) {
      let contractTplId = item.contractTplId ? item.contractTplId : '';
      if(!contractTplId) return false;
      let res = await this.$http.put(`${Api.contractTpls}/${contractTplId}`);
      if(res){
        this.$message.success('操作成功');
        this.getList(Api.contractTpls);
      }
    },
    addTpl(sta = 'new', item) {
      this.addTplDialog = true;
      this.addTplSta = sta;
      setTimeout(()=>{
        this.$refs['addTplForm'].clearValidate();
      },20);
      if(sta !== 'new'){
        this.isAdd = false;
        let { contractTplId, contractType, contractTplName } = item;
        this.addTplForm = {
          contractTplId,
          contractTplName,
          contractTypeCode: contractType.contractTypeCode,
          contractTplUrl:''
        };
        this.dialogTitle = '合同模板-修改';
        this.fileList = [{ name: `${contractTplName}.docx` }];
      }else {
        this.isAdd = true;
        this.addTplForm = {
          contractTplName:'',
          contractTypeCode:'',
          contractTplUrl:''
        };
        this.fileList = [];
        this.dialogTitle = '合同模板-添加'
      }
    },
    submitAddTpl() {
      this.$refs['addTplForm'].validate(async (valid) => {
        if (valid) {
          if(this.isAdd && !this.addTplForm.contractTplUrl) return this.$message.error('请选择模板并上传文件');
          let res;
          if(this.addTplSta === 'new'){
            res = await this.$http.post(Api.contractTpls, this.addTplForm)
          }else {
            res = await this.$http.put(Api.contractTpls, this.addTplForm)
          }
          if(res){
            this.addTplDialog = false;
            this.$message.success('操作成功');
            this.getList(Api.contractTpls);
          }
        } else {
          return false;
        }
      });
    },
    handleFileSuccess(file, fileList) {
      this.fileList = [ fileList ];
      if(file.code === 0) {
        this.addTplForm.contractTplUrl = file.data.contractTplUrl
      }else {
        this.fileList = [];
        if(file.message){
          this.$message.error(file.message);
        }else {
          let msg = file.msg || '请稍后再试';
          this.$message.error(msg);
        }
      }
    },
    handleRemove() {
      this.addTplForm.contractTplUrl = ''
    },
    beforeRemove() {
      return false
    }
  }
};
</script>
<style lang="less">
  .add-tpl-dialog{
    .el-form-item__content{
      width: inherit !important;
    }
    .choose-file-btn{
      color: #1989FA;
      background-color: #fff;
      border-color: #1989FA;
    }
    .el-upload-list li.el-upload-list__item{
      &>i{
        display: none !important;
      };
    }
  }
</style>
