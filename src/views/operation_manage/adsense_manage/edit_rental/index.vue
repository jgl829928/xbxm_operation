<template>
  <div class="contract-receipts edit-rental">
    <div class="main-title">
      <!--<span class="el-icon-back back-btn" @click="$router.go(-1)"></span>-->
      修改登记信息
    </div>
    <br>
    <el-form class="c-search-form" :rules="rules" :model="ruleForm" ref="ruleForm" label-width="110px" :inline="true"
             label-position="right">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商场" prop="marketCode">
            <el-select v-model.trim="ruleForm.marketCode" :disabled="storeOptionDisabled" clearable placeholder="请选择" @change="getAdvertiseOptionData">
              <el-option
                v-for="(item, index) in storeNameOption"
                :key="index"
                :label="item.marketName"
                :value="item.marketCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: left">
          <el-form-item label="广告位" prop="billboardCode">
            <el-select v-model.trim="ruleForm.billboardCode" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in advertiseList"
                :key="index"
                :label="item.billboardName"
                :value="item.billboardCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="商户类型" prop="merchantType">
            <el-select v-model.trim="ruleForm.merchantType" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in merchantTypeList"
                :key="index"
                :label="item.desc"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: left">
          <el-form-item label="投放商户" prop="merchantCode" v-if="ruleForm.merchantType===2">
            <el-select v-model.trim="ruleForm.merchantCode" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in merchantList"
                :key="index"
                :label="item.merchantName"
                :value="item.merchantCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投放商户" prop="merchantName" v-else>
            <el-input v-model.trim="ruleForm.merchantName"  placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="text-align: left">
          <el-form-item label="投放时间" prop="timeSelect">
            <el-date-picker
              v-model.trim="ruleForm.timeSelect"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="timeSelected"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: left">
          <el-form-item label="时长">
            <span class="duration-day">{{ruleForm.duration||0}}  天</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="text-align: left">
          <el-form-item label="签约价格" prop="signPrice">
            <el-input clearable v-model.trim="ruleForm.signPrice"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: left">
          <el-form-item label="实际成交价格" prop="finalPrice">
            <el-input clearable v-model.trim="ruleForm.finalPrice"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="save-div">
        <el-button class="btn-save-big" type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import api from '@/api/operation-manage';

  export default {
    name:'editRental',

    data() {
      return {
        time: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        rules: {
          marketCode: [{required: true, message: '请选择所属商场', trigger: 'change'}],
          billboardCode: [{required: true, message: '请选择广告位', trigger: 'change'}],
          merchantCode: [{required: true, message: '请选择投放商户', trigger: 'change'}],
          timeSelect: [{required: true, message: '请选择上架时间', trigger: 'change'}],
          signPrice: [{required: true, message: '请输入签约价格', trigger: 'blur'},
            {trigger: 'blur', pattern: /^\d+(?:\.\d{1,2})?$/, message: '请输入大于零等于零的数字，最多保留两位小数'}
          ],
          finalPrice: [{required: true, message: '请输入实际成交价格', trigger: 'blur'},
            {trigger: 'blur', pattern: /^\d+(?:\.\d{1,2})?$/, message: '请输入大于等于零的数字，最多保留两位小数'}
          ],
        },
        storeNameOption: [],
        advertiseList: [],
        merchantList: [],
        merchantTypeList:[{desc:'外部商户',value:1},{desc:'内部商户',value:2}],
        ruleForm: {
          marketCode: '',
          billboardCode: '',
          merchantCode: '',
          merchantName: '',
          merchantType: 2,
          timeSelect:[],
          beginTime: '',
          endTime: '',
          duration: '',
          signPrice: '',
          finalPrice: ''
        },
        storeOptionDisabled:false
      }
    },
    methods: {
      getOptionData() {
        let storeNameOption = this.$http.get(api.allStore);
        Promise.all([storeNameOption]).then(res => {
          if (res[0].code === 0) {
            this.storeNameOption = [];
            this.storeNameOption = [...res[0].data];
            let { marketCode } = this.$store.getters.currentUser;
            console.log('editRental',marketCode)
            if(marketCode){
              this.ruleForm.marketCode=marketCode;
              this.storeOptionDisabled=true;
              this.getAdvertiseOptionData();
            }
          }
        })
      },
      getAdvertiseOptionData() {
        if (this.ruleForm.marketCode !== '') {
          //广告位下拉框
          let advertiseOption = this.$http.get(api.selectAdvertiseOption + `?marketCode=${this.ruleForm.marketCode}&bdStatus=1`);
          //商户下拉框
          let merchantOption = this.$http.get(api.merchants + `?marketCode=${this.ruleForm.marketCode}`);
          Promise.all([advertiseOption, merchantOption]).then(res => {
            if (res[0].code === 0) {
              this.advertiseList = [];
              this.advertiseList = [...res[0].data];
            }
            if (res[1].code === 0) {
              this.merchantList = [];
              this.merchantList = [...res[1].data];
            }
          })
        } else {
          this.advertiseList = [];
          this.merchantList = [];
        }
      },
      timeSelected(e) {
        if (e === null) {
          this.ruleForm.duration = '';
          this.ruleForm.beginTime = '';
          this.ruleForm.endTime = '';
        } else {
          let timeArr = [...e];
          this.ruleForm.beginTime = timeArr[0];
          this.ruleForm.endTime = timeArr[1];
          //计算时长
          let start = new Date(timeArr[0]);
          let end = new Date(timeArr[1]);
          this.ruleForm.duration = ((end - start) / 1000 / (24 * 60 * 60)+1) + '';
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.put(api.advertiseRentalList+`/${this.ruleForm.bdRentCode}`, this.ruleForm).then(res => {
              if (res.code === 0) {
                this.$message.success(res.msg);
                this.$router.push('/operation/rental');
              } else {
                this.$message.error(res.msg);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    beforeMount() {
      this.getOptionData();
      //获取数据
      let bdRentCode = this.$route.params.id;
      if (bdRentCode) {
        this.$http.get(api.singleRental + `/${bdRentCode}`).then(res => {
            Object.assign(this.ruleForm,res.data);
            this.getAdvertiseOptionData();
            //时间处理
            let obj={...this.ruleForm};
            this.ruleForm.timeSelect=[];
            this.ruleForm.timeSelect.push(obj.beginTime);
            this.ruleForm.timeSelect.push(obj.endTime);
            //商户类型处理
            this.ruleForm.merchantType=obj.merchantType.code;
            //投放商户处理
            this.ruleForm.merchantCode=obj.merchantCode+'';
            //投放商户处理
            if(this.ruleForm.merchantType===2){
              this.ruleForm.merchantName='';
            }else{
              this.ruleForm.merchantName=obj.merchantName;
              this.ruleForm.merchantCode='';
            }
            //实际成交价格处理
          if(this.ruleForm.finalPrice===0)this.ruleForm.finalPrice='';
        })
      }
    }
  };
</script>
<style lang="less" scoped>
  .contract-receipts {
    .footer-btn {
      width: 342px;
      text-align: right;
    }
  }

  .unit-div {
    margin-top: 30px;
    text-align: right;
  }

  .save-div {
    width: 60%;
    text-align: center;
    margin-top: 30px;
  }
</style>
<style lang="less">
  .edit-rental {
    .main-title {
      width: 60%;
      height: 28px;
      line-height: 28px;
      font-size: 16px;
      color: #444444;
      font-weight: bold;
      text-align: center;
      margin-bottom: 30px;
      .back-btn {
        display: inline-block;
        width: 27px;
        height: 27px;
        line-height: 27px;
        border: 1px solid #EBEBEB;
        border-radius: 50%;
        color: #EBEBEB;
        cursor: pointer;
        font-weight: bold;
        float: left;
      }
    }
    .duration-day {
      display: inline-block;
      text-indent: 10px;
      white-space: pre;
    }
    .el-input.is-disabled .el-input__inner{
      height: 36px!important;
    }
    .el-date-editor--daterange.el-input__inner{
      width: 270px;
    }
  }
</style>
