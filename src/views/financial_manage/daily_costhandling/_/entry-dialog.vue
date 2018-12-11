<template>
  <el-dialog title="日常费用-录入" :visible.sync="entryDialog" class="l-dialog entry-dialog">
    <el-form :model="dialogData" :rules="rules" ref="dialogData" label-width="106px" :inline="true"
             label-position="right">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="费用类型" prop="expenseProperty">
            <el-select v-model.trim="dialogData.expenseProperty">
              <el-option
                v-for="(item, index) in expensePropertyList"
                :key="index"
                :label="item.expenceName"
                :value="item.expenceName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商场名称">
            <span class="u-value">{{$store.getters.currentUser.marketName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="费用名称" prop="expenseName">
            <el-input clearable v-model.trim="dialogData.expenseName" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="各摊位交款金额" prop="averageAmount">
            <el-input clearable v-model.trim.number="dialogData.averageAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="是否全部商户">
            <el-radio-group v-model.trim="merchantRadio">
              <el-radio :label="1">否</el-radio>
              <el-radio :label="2">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预计交款日期" prop="estimatedPayTime">
            <el-date-picker
              v-model.trim="dialogData.estimatedPayTime"
              align="right"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32" v-show="merchantRadio === 1" class="u-area-input">
        <el-col :span="24">
          <el-form-item label="交款商户名称" prop="itemCode">
            <el-transfer v-model.trim="merchantIndex" :data="merchantNameList"></el-transfer>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="btn-save" type="primary" @click="submitDialog">保存</el-button>
      <el-button class="btn-reset" type="primary" @click="entryDialog = false">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import Api from '@/api/financial'
  import { ajaxData } from '@/utils/mixin'
  export default {
    mixins: [ajaxData],
    props:['expensePropertyList'],
    data() {
      return {
        merchantNameList: [],
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        entryDialog:false,
        dialogData:{
          averageAmount:'',
          estimatedPayTime: '',
          expenseName:'',
          expenseProperty:'',
          // merchantCode:''
        },
        merchantIndex:[],
        merchantRadio:1,
        rules: {
          expenseProperty: [
            {required: true, message: '请选择费用类型', trigger: 'change'}
          ],
          expenseName: [
            {required: true, message: '请输入费用名称', trigger: 'blur'}
          ],
          averageAmount: [
            {required: true, message: '请输入各摊位交款金额', trigger: 'blur'},
            {type: 'number', message: '交款金额必须为数字', trigger: 'blur'}
          ],
          estimatedPayTime: [
            {required: true, message: '请输入预计交款日期', trigger: 'blur'}
          ]
        },
      }
    },
    mounted(){
      this.getMerchantData();
    },
    methods:{
      openDialog() {
        this.entryDialog = true;
      },
      //交款商户名称
      getMerchantData(){
        this.ajaxGet({
          url: Api.merchantsList,
          callBack: (res)=>{
            res.data.forEach((val,index)=>{
              this.merchantNameList.push({
                label: val.merchantName,
                key: val.merchantCode
              })
            });
          }
        })
      },
      submitDialog() {
        this.$refs['dialogData'].validate((valid) => {
          if (valid) {
            if(this.merchantRadio===1 && this.merchantIndex.length<1){
              this.$message.error('请选择交款商户名称');
              return false
            }
            let beanData = [];
            if(this.merchantRadio === 1){
              this.merchantIndex.forEach((val, index)=>{
                beanData.push({
                  ...this.dialogData,
                  merchantCode:val
                });
              });
            }else{
              this.merchantNameList.forEach((val, index)=>{
                beanData.push({
                  ...this.dialogData,
                  merchantCode:val.key
                })
              });
            }
            beanData = {
              currentExpenseRQList: beanData
            };
            this.ajaxPost({
              url: Api.contractExpenses,
              data:beanData,
              resetForm:'dialogData',
              callBack:(res)=>{
                this.$emit('submitCheckProp');
                this.$message.success('录入成功');
                this.merchantIndex = [];
                this.merchantRadio = 1;
                this.entryDialog = false;
              }
            });
          }
        });


      },
    }
  }
</script>
<style lang="less">
  .entry-dialog{
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      width: 100%;
    }
    .u-area-input {
      margin-top: 8px;
      .el-form-item__content {
        width: 82%;
        vertical-align: middle;
      }
    }
  }
</style>
<style lang="less" scoped>
  .u-value {
    color: #9B9B9B;
    vertical-align: bottom;
  }
</style>
