<template>
	 <el-dialog :title="titleName" :visible.sync="dialogFormVisibleL" class="l-dialog" :close-on-click-modal="show" :close-on-press-escape="show" :show-close="show">
    	 <el-form  class="c-search-form" :model="reqData" :rules="rules" ref="reqData" label-width="110px" :inline="true"
              label-position="right">
      <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="费用性质" prop="expenceProperty">
            <el-select v-model="reqData.expenceProperty" clearable placeholder="请选择" @change="selectCostType">
              <el-option
                v-for="(item, index) in expensePropertyList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
        <el-radio-group v-model="reqData.status">
      <el-radio :label="false">停用</el-radio>
      <el-radio :label="true">启用</el-radio>
    </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
		 <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="费用类型" prop="expenceName" v-if="checkCont">
            <el-input clearable v-model.trim="reqData.expenceName" placeholder="费用类型"></el-input>
          </el-form-item>
          <el-form-item label="费用类型" prop="expenceName" v-else>
            <el-select
              v-model="reqData.expenceName"
               placeholder="费用类型"
               clearable>
              <el-option
                v-for="(item,index) in expenceNameList"
                :key="index"
                :label="item.desc"
                :value="item.desc">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收入性质" prop="expenceIncome">
            <el-select v-model="reqData.expenceIncome" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in incomeList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="32">
               <el-col :span="12">
          <el-form-item label="周期性质" prop="expencePeriod">
            <el-select v-model="reqData.expencePeriod" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in periodList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
        <el-col :span="12">
          <el-form-item label="费用计价方式" prop="expenceBilling">
            <el-select v-model="reqData.expenceBilling" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in expenseBillingList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row :gutter="32">
        <el-col :span="12">
          <el-form-item label="单位" prop="expenceUnit">
            <el-select v-model="reqData.expenceUnit" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in unitList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
      </el-row>
       <el-row :gutter="32" class="u-area">
       	<el-col :span="12">
       		作用面积范围（计租面积）
       	</el-col>
       	<el-col :span="9" >
       		单价(元）
       	</el-col>
      </el-row>
 <el-row :gutter="32" class="u-area-input"  v-for="(domain, index) in reqData.billingS" :key="index">

  <el-col :span="5" >
    <el-form-item

    :prop="'billingS.' + index + '.beginAcreage'"
    :rules="[
     { validator: checkbillingS, trigger: 'blur' }
    ]"

  >
    <el-input v-model.trim="domain.beginAcreage" placeholder="0.00"  :disabled="index > 0"></el-input>
    </el-form-item>
    </el-col>

    <el-col :span="1.5" class="u-icon">
    ～
	</el-col>

	<el-col :span="5" class="u-error-margin">
       <el-form-item
    :prop="'billingS.' + index + '.endAcreage'"
    :rules="[
    { validator: checkendAcreage, trigger: 'blur' }
    ]"

  >
    <el-input v-model.trim="domain.endAcreage" placeholder="0.00" @blur="checkValue(index)"></el-input>
    </el-form-item>
	</el-col>

	<el-col :span="6.5" class="u-price">
    <el-form-item
    :prop="'billingS.' + index + '.price'"
    :rules="[
      { validator: validatePrice, trigger: 'blur' }
    ]"

  >
    <el-input v-model.trim="domain.price" placeholder="0.00-99999.99"></el-input>

  </el-form-item>
	</el-col>
      <el-col :span="2" class="u-domain">
         <i class="el-icon-circle-plus-outline" @click="addDomain" v-if="index == 0"></i>
    <i class="el-icon-remove-outline" @click.prevent="removeDomain(domain)" v-if="index != 0"></i>
  </el-col>
</el-row>
</el-form>
     <div slot="footer" class="dialog-footer">
            <el-button class="btn-save" type="primary"  @click="submitForm('reqData')">保存</el-button>
             <el-button class="btn-reset" type="primary" @click="resetForm('reqData')">取消</el-button>
          </div>
</el-dialog>
</template>
<script>
import ApiSetting from "@/api/basicApi-estateApi";
export default {
  props: [
    "dialogFormVisibleL",
    "reqData",
    "priceInfo",
    "checkPost",
    "expensePropertyList",
    "titleName"
  ],
  data() {
    return {
      checkCont: true,
      show: false,
      rules: {
        expenceName: [
          { required: true, message: "请输入费用名称", trigger: "blur" },
          { max: 20, message: "请限制输入在20字内", trigger: "blur" }
        ],
        expenceBilling: [
          { required: true, message: "请选择计价方式", trigger: "change" }
        ],
        expenceProperty: [
          { required: true, message: "请选择费用性质", trigger: "change" }
        ],
        expenceIncome: [
          { required: true, message: "请选择收入性质", trigger: "change" }
        ],
        expencePeriod: [
          { required: true, message: "请选择周期类型", trigger: "change" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        expenceUnit: [
          { required: true, message: "请选择单位", trigger: "change" }
        ]
      },
      expenceNameList: [],
      expenceNameInput: 2,
      //下拉列表内容
      periodList: [
        { label: "一次性", value: 1 },
        { label: "周期性", value: 2 }
      ],
      incomeList: [
        { label: "收入", value: 1 },
        { label: "押金", value: 2 },
        { label: "代收", value: 3 }
      ],
      expenseBillingList: [
        { label: "天面积计价", value: 1 },
        { label: "月面积计价", value: 2 },
        { label: "年面积计价", value: 3 },
        { label: "其他", value: 4 }
      ],
      unitList: [
        { label: "元/年/平方米", value: 1 },
        { label: "元/月/平方米", value: 2 },
        { label: "元/日/平方米", value: 3 },
        { label: "元", value: 4 },
        { label: "元/年", value: 5 },
        { label: "元/月", value: 6 },
        { label: "元/日", value: 7 },
        { label: "其他", value: 8 }
      ]
    };
  },
  watch: {
    priceInfo: function(val, oldVal) {
      this.reqData.billingS = val.billingS;
    }
  },
  created() {
    this.getContractType();
  },
  methods: {
    checkValue(index) {
      if (
        this.reqData.billingS[index + 1] &&
        this.reqData.billingS[index + 1].beginAcreage !== undefined
      ) {
        this.reqData.billingS[index + 1].beginAcreage = this.reqData.billingS[
          index
        ].endAcreage;
      }
    },
    checkbillingS(rule, value, callback) {
      var valNum = Number(value);
      var i = Number(rule.field.replace(/[^0-9]/gi, ""));
      var that = this;
      if (valNum == "") {
        callback(new Error("请输入面积值"));
      }
      if (!valNum) {
        callback(new Error("请输入正确数值"));
      }
      if (valNum < 0 || valNum > 100000) {
        callback(new Error("面积值小于10万)"));
      }
      if (!/^\d+(\.\d{1,2})?$/.test(valNum)) {
        callback(new Error("最多为2位小数"));
      }
      // if (i != 0 && Number(this.reqData.billingS[i - 1].endAcreage) >= valNum) {
      //   callback(new Error('面积值必须递增'))
      //  }

      callback();
    },

    checkendAcreage(rule, value, callback) {
      var valNum = Number(value);
      var i = Number(rule.field.replace(/[^0-9]/gi, ""));
      let _this = this;
      if (valNum == "") {
        callback(new Error("请输入面积值"));
      }
      if (!Number(valNum)) {
        callback(new Error("请输入正确数值"));
      }
      if (valNum < 0 || valNum > 100000) {
        callback(new Error("面积值小于10万"));
      }
      if (!/^\d+(\.\d{1,2})?$/.test(valNum)) {
        callback(new Error("最多为2位小数"));
      }
      if (Number(this.reqData.billingS[i].beginAcreage) >= valNum) {
        callback(new Error("面积值必须递增"));
      }
      if (
        Number(this.reqData.billingS[i + 1]) &&
        Number(this.reqData.billingS[i + 1].beginAcreage) &&
        Number(this.reqData.billingS[i + 1].beginAcreage) != valNum
      ) {
        callback(new Error("面积值必须递增"));
      }
      callback();
    },
    validatePrice(rule, value, callback) {
      var valStr = value.toString();
      if (value === "") {
        callback(new Error("价格不能为空"));
      } else if (value >= 100000) {
        callback(new Error("价格不大于100000"));
      } else if (!/^\d+(\.\d{1,2})?$/.test(valStr)) {
        callback(new Error("输入2位小数"));
      } else {
        callback();
      }
    },
    selectCostType(data) {
      let fields = this.$refs["reqData"].fields;
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].prop === "expenceName") {
          // 通过唯一的prop属性值相同来判别是哪个输入框
          fields[i].resetField();
          fields[i].clearValidate();
          break;
        }
      }
      if (data == 1) {
        this.checkCont = false;
      } else if (data == 2) {
        this.checkCont = true;
      }
    },
    getContractType() {
      this.$http.get(ApiSetting.expencesContract).then(res => {
        if (res && res.code == 0 && res.data) {
          this.expenceNameList = res.data;
        }
      });
    },
    resetForm(formName) {
      let _this = this;
      this.$emit("changeStatus", false);
      setTimeout(() => {
        this.$refs.reqData.clearValidate();
      }, 200);
    },
    //删除dom
    removeDomain(item) {
      var index = this.reqData.billingS.indexOf(item);
      if (index !== -1) {
        this.reqData.billingS.splice(index, 1);
      }
    },
    //添加dom
    addDomain() {
      this.reqData.billingS.push({
        billingCode: "",
        beginAcreage: "",
        endAcreage: "",
        price: ""
      });
      this.reqData.billingS.forEach((item, index) => {
        if (index < this.reqData.billingS.length - 1) {
          if (
            this.reqData.billingS[index + 1] &&
            this.reqData.billingS[index + 1].beginAcreage !== undefined
          ) {
            this.reqData.billingS[index + 1].beginAcreage = item.endAcreage;
          }
        }
      });
      if (this.reqData.billingS.length > 10) {
        this.$message.error("最多只能填写10个范围");
        return (this.reqData.billingS.length = 10);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.checkPost) {
            this.submitFun("post", "");
          } else {
            this.submitFun("put", this.reqData.expenceCode);
          }
        } else {
          return false;
        }
      });
    },
    submitFun(method, urlCode) {
      this.$http({
        url: `${ApiSetting.expences}/${urlCode}`,
        method: method,
        data: { ...this.reqData }
      }).then(res => {
        if (res) {
          if (res.code == 0) {
            this.$message.success(res.msg);
            this.$emit("changeStatus", false);
            this.$emit("refresh");
            this.$refs["reqData"].resetFields();
            setTimeout(() => {
              this.$refs["reqData"].clearValidate();
            }, 10);
            this.reqData.billingS = [
              {
                billingCode: "",
                beginAcreage: "",
                endAcreage: "",
                price: ""
              }
            ];
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    }
  }
};
</script>
  <style lang="less" scoped>
.u-icon {
  padding: 0 !important;
}
.u-area-input {
  padding-left: 48px;
  box-sizing: border-box;
}
</style>
