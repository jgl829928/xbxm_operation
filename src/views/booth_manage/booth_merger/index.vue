<template>
<div class="booth-merger">
  <el-form class="c-search-form" :model="inquireData" ref="inquireData" label-width="102px" label-position="right" :inline="true">
    <el-row :gutter="32">
      <el-col :span="8">
        <el-form-item label="摊位号" prop="boothNo">
          <el-input clearable v-model="inquireData.boothNo"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="原摊位号" prop="protBooth">
          <el-input clearable v-model="inquireData.protBooth"></el-input>
        </el-form-item>
      </el-col>

    </el-row>
    <el-row :gutter="32">
      <el-col :span="8" :offset="16">
        <div class="c-footer-btn">
          <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">查询</el-button>
          <el-button class="btn-search" type="primary" @click="centerDialogVisible = true">摊位合并</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>

  <div class="c-table-wrap">
    <el-table border :data="itemList" style="width: 100%" align="center" stripe>
      <el-table-column align="center" type="index" label="序号" width="50" :index="indexMethod">
      </el-table-column>
      <el-table-column align="center" prop="name" label="摊位号">
      </el-table-column>
      <el-table-column align="center" prop="name" label="摊位编号">
      </el-table-column>
      <el-table-column align="center" prop="name" label="所属商场">
      </el-table-column>
      <el-table-column align="center" prop="name" label="原摊位号">
      </el-table-column>
      <el-table-column align="center" prop="name" label="合并时间">
      </el-table-column>
      <el-table-column align="center" prop="name" label="合并人">
      </el-table-column>
      <el-table-column align="center" prop="name" label="备注">
      </el-table-column>

    </el-table>
  </div>
  <div class="pagination-box">
    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>
  </div>
  <el-dialog title="摊位-合并" :visible.sync="centerDialogVisible" class="l-dialog" center>
    <div>
      <el-form ref="ruleForm" :rules='rules' :model="ruleForm" label-width="100px">
        <el-row :gutter="32">
          <el-col :span="12" :xs="24">
            <el-form-item label="摊位一">
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="摊位二">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="12" :xs="24">
            <el-form-item label="摊位号" prop="boothNo">
              <el-select v-model="ruleForm.boothNo" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in boothNo"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="摊位号" prop="boothNo" >
              <el-select v-model="ruleForm.boothNo2" clearable placeholder="请选择">
                <el-option
                  v-for="(item, index) in boothNo"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="12" :xs="24">
            <el-form-item label="摊位计租面积" prop="skuCode">
              <span>100  元/月/平</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="摊位单价" >
              <span>100  元/月/平</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="12" :xs="24">
            <el-form-item label="摊位实际面积" prop="skuCode">
              <span>100  元/月/平</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="摊位实际面积" >
              <span>100  元/月/平</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="12" :xs="24">
            <el-form-item label="摊位计租面积" prop="skuCode">
              <span>100  元/月/平</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="摊位计租面积" >
              <span>100  元/月/平</span>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="32">
          <el-col :span="12" :xs="24">
            <el-form-item label="新摊位号" prop="newBoothNo" >
              <el-input clearable v-model="ruleForm.newBoothNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="摊位单价" prop="boothPrice">
              <el-input clearable  class="univalence" v-model="ruleForm.boothPrice"></el-input>
              元/平/天
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :span="12" :xs="24">
            <el-form-item label="摊位实际面积" >
              <span>100  元/月/平</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-form-item label="摊位计租面积" >
              <span>100  元/月/平</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注" class="textarea">
          <el-input type="textarea" class="textareaInput" v-model="ruleForm.desc"></el-input>
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
export default {
  data() {
    return {
      centerDialogVisible: false,
      title: '',
      boothNo:[{  //摊位号
          label: '1-2',
          value: 1
        },
        {
          label: '1-2',
          value: 2
        }
      ],
      ruleForm: {
        boothNo:'',
        boothPrice:'',
        boothPrice2:'',
        boothArea:'',
        boothArea2:'',
        boothRentArea:'',
        boothRentArea2:'',
        desc: '',
        page:1
      },
      inquireData: {  //搜索
        boothNo: '',
        protBooth: ''
      },
      rules:{
        boothNo:[
          {required:true,message:'请选择摊位号',trigger:'blur'}
        ],
        newBoothNo:[
          {required:true,message:'请输入新摊位号',trigger:'blur'}
        ],
        boothPrice:[
          {required:true,message:'请输入摊位单价',trigger:'blur'}
        ]
      },
      itemList: [{
          name: "testName"
        },
        {
          name: "testName"
        },
      ],
      statusList: [{
          label: '未交款',
          value: 1
        },
        {
          label: '已交款',
          value: 2
        }
      ],
    }
  },
  methods: {
    submitForm(form){
      this.$refs[form].validate((valid) => {
         console.log(valid)
      });
    },
    indexMethod(index) {
      return index + (this.ruleForm.page - 1) * 20 + 1
    },
  }
};
</script>
<style lang="less" scoped>
.booth-merger {
    .footer-btn {
        width: 342px;
        text-align: right;
    }
    .el-dialog .el-form-item__content {
        width: 80%;
    }
    .el-dialog {
        .el-form-item.textarea {
            .textareaInput{
              width: 400px;
            }
        }
        .el-form-item .univalence {
            width: 50%;
        }
    }
}
.unit-div {
    margin-top: 30px;
    text-align: right;
}
</style>
