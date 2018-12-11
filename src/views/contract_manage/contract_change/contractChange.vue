<template>
  <div class="sign-handle-wrap">
    <template v-if="!isPreview">
      <h4>合同变更</h4>
      <el-form class="c-detail-form" :model="itemData" :rules="rules" ref="itemData" label-width="124px"
               label-position="right">
        <el-row>
          <el-col :span="24">
            <el-form-item label="合同变更">
              <span>ht0001</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="商户名称">
              <span>郭德纲</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品类-品牌">
              <span>郭德纲</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册号">
              <span>110102199101123454</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="负责人">
              <span>郭佳</span>
            </el-form-item>
          </el-col>
          <el-col :offset="8" :span="8">
            <el-form-item label="负责人身证号">
              <span>110102199101123454</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="摊位号" prop="name">
              <el-input clearable v-model.trim="itemData.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="使用面积" prop="name">
              <el-input clearable v-model.trim="itemData.name"></el-input>
              <label>m²</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司参考单价">
              <span>50元/平米/月</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="公摊比例" prop="name">
              <el-input clearable v-model.trim="itemData.name"></el-input>
              <label>%</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计租面积" prop="name">
              <el-input clearable v-model.trim="itemData.name"></el-input>
              <label>m²</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="摊位单价" prop="name">
              <el-input clearable v-model.trim="itemData.name"></el-input>
              <label>元/平米/月</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="商户类型">
              <el-radio-group v-model.trim="itemData.radio">
                <el-radio :label="1">开张后签约</el-radio>
                <el-radio :label="2">开张前签约</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <template v-if="itemData.radio === 1">
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同开始时间" prop="time">
                <el-date-picker
                  v-model.trim="itemData.time"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同结束时间" prop="time">
                <el-date-picker
                  v-model.trim="itemData.time"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="租赁期/合同期" prop="name">
                <el-input clearable v-model.trim="itemData.name"></el-input>
                <label>月</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="优惠开始时间" prop="time">
                <el-date-picker
                  v-model.trim="itemData.time"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="优惠结束日时间" prop="time">
                <el-date-picker
                  v-model.trim="itemData.time"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="优惠期" prop="name">
                <el-input clearable v-model.trim="itemData.name"></el-input>
                <label>月</label>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="计租开始时间" prop="time">
                <el-date-picker
                  v-model.trim="itemData.time"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计租结束日时间" prop="time">
                <el-date-picker
                  v-model.trim="itemData.time"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计租期" prop="name">
                <el-input clearable v-model.trim="itemData.name"></el-input>
                <label>月</label>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <template v-else>
          <el-row>
            <el-col :span="8">
              <el-form-item label="租赁期/合同期" prop="name">
                <el-input clearable v-model.trim="itemData.name"></el-input>
                <label>月</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="优惠期" prop="name">
                <el-input clearable v-model.trim="itemData.name"></el-input>
                <label>月</label>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计租期" prop="name">
                <el-input clearable v-model.trim="itemData.name"></el-input>
                <label>月</label>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <el-row>
          <el-col :span="8">
            <el-form-item label="首付周期" prop="name">
              <el-input clearable v-model.trim="itemData.name"></el-input>
              <label>月</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="摊位租金/商铺租金" prop="name">
              <el-input clearable v-model.trim="itemData.name"></el-input>
              <label>元</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="优惠扣回" prop="name">
              <el-input clearable v-model.trim="itemData.name"></el-input>
              <label>天</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="input-textarea-box" label="备注" prop="name">
              <el-input type="textarea" v-model.trim="itemData.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <p class="cost-title">费用列表</p>
        <reviewTable/>
        <el-row>
          <el-col :span="24">
            <el-form-item class="input-textarea-box" label="楼层经理" prop="name">
              <el-select v-model.trim="itemData.opt" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="c-detail-footer-box">
        <el-button type="primary" @click="nextHandle">下一步</el-button>
        <el-button class="cancel-btn" type="primary" @click="cancelHandle">取消</el-button>
      </div>
    </template>
    <template v-else>
      <confirmView @prvHandle="isPreview=false"/>
    </template>
  </div>
</template>
<script>
  import reviewTable from './_/reviewTable'
  import confirmView from './_/confirmView'
  export default {
    name:'conChangeHandle',
    data() {
      return {
        isPreview: false,
        itemData:{
          name:'',
          radio:1,
          time:'',
          opt:''
        },
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          },
          {
            value: '选项2',
            label: '双皮奶'
          }
        ],
        rules:{
          name:[{ required: true, message: '请输入合同编号', trigger: 'blur' }],
          time:[{ required: true, message: '请选择时间', trigger: 'blur' }]
        },
      }
    },
    components:{
      reviewTable,
      confirmView
    },
    mounted() {

    },
    methods: {
      nextHandle() {
        this.isPreview = true;
      },
      cancelHandle() {
        this.$router.push('/contact/change');
      }
    }
  };
</script>
<style lang="less" scoped>
  .sign-handle-wrap{
    padding-bottom: 90px;
    h4{
      font-size: 16px;
      color: #444;
      text-align: center;
      font-weight: bold;
    }
    .c-detail-form{
      padding: 30px;
      .el-form-item__content{
        &>span{
          color: #9B9B9B;
        }
        &>label{
          margin-left: 4px;
        }
      }
    }
    .cost-title{
      height: 38px;
      line-height: 38px;
      padding-left: 32px;
      background: #FFF7F2;
    }
  }
</style>
<style lang="less">
  .sign-handle-wrap {
    .c-detail-form{
      input{
        font-size: 12px;
      }
      .el-form-item{
        .el-form-item__label, .el-form-item__content{
          line-height: 30px;
          font-size: 12px;
        }
        .el-input__icon{
          line-height: 30px;
        }
        .el-input{
          width: 170px;
          input{
            height: 30px;
            line-height: 30px;
          }
        }
      }
      .el-row{
        &>div>div{
          display: inline-block;
          width: 360px;
          text-align: left;
          &.input-textarea-box{
            width: calc(~'100% - 66px');
            min-width: 934px;
          }
        }
        &>div:last-child{
          text-align: right;
        }
        &>div:first-child{
          text-align: left;
        }
        &>div{
          text-align: center;
        }
      }
    }
  }
</style>
