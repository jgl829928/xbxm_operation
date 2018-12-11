<template>
  <div class="booth-maintenance">
    <el-form  class="c-search-form" :model="pageParams" ref="reqData" label-width="102px"
              label-position="right" :inline="true">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商场名称">
            <selectMarket :reqData="pageParams"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="摊位号" >
            <el-input clearable v-model.trim="pageParams.boothNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="类型">
            <el-select v-model.trim="pageParams.boothTypeCode" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in typeList"
                :key="index"
                :label="item.boothTypeName"
                :value="item.boothTypeCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="楼层经理" >
            <el-input clearable v-model.trim="pageParams.managerName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="楼层">
            <el-select v-model.trim="pageParams.floor" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in floor"
                :key="index"
                :label="item + '层'"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select v-model.trim="pageParams.boothStatus" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="16">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="getPageList(1)">查询</el-button>

            <!-- <el-button class="btn-search" type="primary">导入</el-button>
            <el-button class="btn-search" type="primary">模板下载</el-button> -->
          </div>
        </el-col>
      </el-row>

    </el-form>
    <div>
      <el-button class="btn-search btn-add" type="primary"  @click="Dialog('add')" v-show="rightControl('boothMain_3')">添加</el-button>
    </div>

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
          width="50"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="boothNumber"
          label="摊位号"  min-width='160'>
          <template slot-scope="scope">
             <span class='booth-maintenance-hiddenText' :title="scope.row.boothNumber">{{scope.row.boothNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="boothCode"
          label="摊位编号"  min-width='160'>
          <template slot-scope="scope">
             <span class='booth-maintenance-hiddenText' :title="scope.row.boothCode">{{scope.row.boothCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="marketName"
          label="商场名称" min-width='120'>
        </el-table-column>
        <el-table-column
          align="center"
          prop="boothTypeName"
          label="类型"  min-width='120'>
        </el-table-column>
        <el-table-column
          align="center"
          prop="managerName"
          label="楼层经理" min-width='110'>
        </el-table-column>
        <el-table-column
          align="center"
          prop="floor"
          label="楼层" min-width='110'>
        </el-table-column>
        <el-table-column
          align="center"
          prop="area"
          label="区域" min-width='110'>
        </el-table-column>
        <el-table-column
          align="center"
          prop="boothStatus.desc"
          label="状态"  min-width='110'>
        </el-table-column>
        <el-table-column
          align="center"
          prop="calculateArea"
          label="计租面积" min-width='110'>
          <template slot-scope="scope">
             <span>{{scope.row.calculateArea.toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="usableArea"
          label="使用面积" min-width='110'>
          <template slot-scope="scope">
             <span>{{scope.row.usableArea.toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="boothPrice"
          label="摊位单价" min-width='110'>
          <template slot-scope="scope">
             <span>{{scope.row.boothPrice.toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="units.desc"
          label="单位" min-width='140'>
        </el-table-column>
        <el-table-column
          align="center"
          prop="notes"
          label="备注"  min-width='220'>
          <template slot-scope="scope">
             <span class='booth-maintenance-hiddenText' :title="scope.row.notes">{{scope.row.notes}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="190"
          label="操作"
          fixed="right">
          <template slot-scope="scope">
            <el-button class="btn-handle" @click="Dialog('edit',scope.row.boothCode)" type="primary" :disabled="!rightControl('boothMain_2')">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <Pagenation :pageparams="pageDefault" @handlePage="getPageList" :itemList="itemList" />

    <el-dialog
      :title="title"
      :visible.sync="centerDialogVisible"
      class="l-dialog"
        @close="reset">
      <div>
        <el-form ref="ruleForm" :rules='rules' :model="ruleForm" label-width="80px">
          <el-row :gutter="32">
            <el-col :span="12" :xs="24">
              <el-form-item label="摊位号" prop="boothNumber">
                <el-input clearable v-model.trim="ruleForm.boothNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="商场"  prop="marketCode">
                <el-select  v-model.trim="ruleForm.marketCode" clearable placeholder="请选择" :disabled="affiliation" @change='marketChange'>
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
          <el-row :gutter="32" v-if="affiliation==false&&ruleForm.marketCode || affiliation==true">
            <el-col :span="12" :xs="24" >
              <el-form-item label="楼层"  prop="floor">
                <el-select v-model.trim="ruleForm.floor" clearable placeholder="请选择">
                  <el-option
                    v-for="(item, index) in floor"
                    :key="index"
                    :label="item + '层'"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="摊位编号"  prop="boothCode">
                <el-input v-model.trim="ruleForm.boothCode" clearable  disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32" v-if="affiliation==false&&ruleForm.marketCode || affiliation==true">
            <el-col :span="12" :xs="24">
              <el-form-item label="摊位类型" prop="boothTypeCode">
                <el-select v-model.trim="ruleForm.boothTypeCode" clearable placeholder="请选择">
                  <el-option
                    v-for="(item, index) in typeList"
                    :key="index"
                    :label="item.boothTypeName"
                    :value="item.boothTypeCode">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="区域"  prop="area">
                <el-select v-model.trim="ruleForm.area" clearable placeholder="请选择">
                  <el-option
                    v-for="(item, index) in area"
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="12" :xs="24">
              <el-form-item label="摊位单价" prop="boothPrice">
                <el-input clearable v-model.trim="ruleForm.boothPrice" maxlength="8"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="单位"  prop="units">
                <el-select v-model.trim="ruleForm.units" clearable placeholder="请选择">
                  <el-option
                    v-for="(item, index) in boothPriceList"
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
              <el-form-item label="计租面积" prop="calculateArea">
                <el-input clearable class="input-m2" v-model.trim="ruleForm.calculateArea" maxlength="8"></el-input>  m²
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="实际面积" prop="usableArea">
                <el-input clearable class="input-m2" v-model.trim="ruleForm.usableArea" maxlength="8"></el-input>  m²
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="24" :xs="24">
              <el-form-item label="备注" prop="notes" class="textarea">
                <el-input type="textarea" class="textareaInput" v-model.trim="ruleForm.notes" maxlength="500"></el-input>
              </el-form-item>
            </el-col>
          </el-row>



        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button class="btn-primary btn-save" type="primary"  @click="submitForm('ruleForm')">保 存</el-button>
    <el-button class="btn-primary btn-reset" type="primary" @click="reset">取 消</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api/boothApi';
  import Pagenation from '@/components/pagenation';
  import selectMarket from '@/components/selectMarket';
  export default {
    name:'boothMain',
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
        centerDialogVisible: false,
        title:'',
        pageDefault: {//分页默认参数
          totalRecords: 0,
          currentPage:1,
          pageSize: 20
        },
        formType:'add',
        affiliation:true, //是否是总部账号   false是
        boothCode:0,//摊位id
        floor:[], //楼层列表
        area:[],//区域列表
        marketInfo:{},  //登录商场信息
        marketList:[],//商场列表
        pageParams: { //搜索表单
          boothNumber: '',
          boothTypeCode: '',
          floor: '',
          managerName: '',
          boothStatus:'',
          marketCode:'',
          currentPage:1
        },
        ruleForm:{
          boothNumber: '',
          boothPrice: '',
          boothTypeCode: '',
          calculateArea: '',
          floor: '',
          area: '',
          marketCode: '',
          notes: '',
          units: 1,
          usableArea:''
        },
        rules:{
          boothNumber:[
            {required:true,message:'请输入摊位号',trigger:'change'},
            {
              pattern: /^[0-9a-zA-Z-]{1,}$/,
              message: "摊位号只能输入字母数字中划线",
              trigger: "blur"
            }
          ],
          floor:[
            {required:true,message:'请选择楼层',trigger:'change'}
          ],
          marketCode:[
            {required:true,message:'请选择商场',trigger:'change'}
          ],
          calculateArea:[
            {required:true,message:'请输入计租面积',trigger:'change'},
            {
              pattern: /^(\d{1,5}|\d{1,5}\.\d{1,2})$/,
              message: "计租面积只能小于10万",
              trigger: "blur"
            }
          ],
          boothPrice:[
            { message: '请输入摊位单价',trigger: 'change',required: true},
            {
              pattern: /^(\d{1,5}|\d{1,5}\.\d{1,2})$/,
              message: "单价只能小于10万",
              trigger: "blur"
            }
          ],
          usableArea:[
            {required:true,message:'请输入实际面积',trigger:'change'},
            {
              pattern: /^(\d{1,5}|\d{1,5}\.\d{1,2})$/,
              message: "实际面积只能小于10万",
              trigger: "blur"
            }
          ]
        },
        itemList:[  //列表
        ],
        statusList:[
          {label: '未出租', value: 1},
          {label: '签约待审核', value: 2},
          {label: '已出租', value: 3},
          {label: '交款期', value: 4},
          {label: '欠款待缴费', value: 5},
          {label: '合同到期', value: 6},
          {label: '已预定', value: 7}
        ],
        boothPriceList:[
          {label: '元/年/平米', value: 1},
          {label: '元/月/平米', value: 2},
          {label: '元/日/平米', value: 3},
          {label: '元', value: 4},
          {label: '元/年', value: 5},
          {label: '元/月', value: 6},
          {label: '元/日', value: 7},
          {label: '其他', value: 8}
        ],
        typeList:[]
      }
    },
    watch:{
      pageParams:{//监听商场名称
            handler(val){
              let _this=this
              if(!_this.affiliation){
                // 获取楼层
                this.$http.get(api.marketFloor, {params: {marketCode:val.marketCode}}).then(res=>{
                  if (res.code === 0) {
                    _this.floor=res.data.floors.split(',')
                    _this.area=res.data.marketPartitionNames
                  }
                });
              }
            },
            deep:true
        }
    },
    mounted(){
      let _this=this

      // 获取商场名称
      this.$http.get(api.marketsName, {params: {areaCode:''}}).then(res=>{
        if (res.code === 0) {
          _this.marketList=res.data
        }
      });

      let marketName = this.$route.params.marketName || '';
      if(marketName){
        setTimeout(function(){
          _this.marketList.forEach(item=>{
            if(item.marketName == marketName){
              _this.pageParams.marketCode = item.marketCode
              _this.$http.get(api.boothMaintains, {params: _this.pageParams}).then(res=>{
                if (res.code === 0) {
                  _this.pageDefault.totalRecords = res.page.totalRecords;
                  _this.itemList=res.data;
                }
              });
            }
          })
        },500)

      }else{
        this.getPageList(1)
      }

      this.marketInfo=this.currentUser
      if(this.currentUser.affiliation ==1){
        this.affiliation=false
      }else{  //商场账号
        this.affiliation=true
        // 获取楼层
        this.$http.get(api.marketFloor, {params: {marketCode:_this.marketInfo.marketCode}}).then(res=>{
          if (res.code === 0) {
            _this.floor=res.data.floors.split(',')
            _this.area=res.data.marketPartitionNames
          }
        });
      }
      // 获取类型
      this.$http.get(api.boothName, {params: {marketCode:_this.marketInfo.marketCode}}).then(res=>{
        if (res.code === 0) {
          _this.typeList=res.data;
        }
      });


    },
    methods: {
      marketChange(val){
        let _this=this
        _this.ruleForm.floor=''
        _this.ruleForm.boothTypeCode=''
        _this.ruleForm.area=''
        _this.ruleForm.boothCode=''
        _this.marketList.forEach(item=>{
          if(item.marketCode == val){
            _this.marketInfo.marketName=item.marketName
            _this.marketInfo.marketCode=val
          }
        })
        // 获取类型
        this.$http.get(api.boothName, {params: {marketCode:_this.marketInfo.marketCode}}).then(res=>{
          if (res.code === 0) {
            _this.typeList=res.data;
          }
        });
        // 获取楼层
        this.$http.get(api.marketFloor, {params: {marketCode:_this.marketInfo.marketCode}}).then(res=>{
          if (res.code === 0) {
            _this.floor=res.data.floors.split(',')
            _this.area=res.data.marketPartitionNames
          }
        });
      },
        // 权限判断
      rightControl (id) {
        return this.$store.getters.getPermission(id)
      },
      reset(){
        let _this=this
        this.centerDialogVisible = false
        this.$refs['ruleForm'].resetFields();
        this.$refs['ruleForm'].clearValidate();
      },
      getPageList(index){
        let _this=this
        this.pageParams.currentPage = index || 1;
        this.$http.get(api.boothMaintains, {params: this.pageParams}).then(res=>{
          if (res.code === 0) {
            _this.pageDefault.totalRecords = res.page.totalRecords;
            _this.itemList=res.data;
          }
        });
      },
      Dialog(type,id){
        var _this=this
        this.centerDialogVisible=true;
        if(type == 'add'){
          this.title='摊位-添加'
          this.formType='add'
          setTimeout(function(){
            if(_this.affiliation){
              _this.ruleForm.marketCode=_this.marketInfo.marketCode
            }else{
              _this.marketInfo={}
            }
            _this.$refs['ruleForm'].clearValidate();
          },100)
        }else{
          this.title='摊位-修改'
          this.formType='edit'
          this.boothCode =id
          this.$http.get(api.maintainsDetails, {params:{boothCode:id}}).then(res=>{
            if (res.code === 0) {
              _this.ruleForm=res.data
              _this.ruleForm.units=res.data.units.code
              // console.log(_this.ruleForm)
            }
          });
        }
      },
      submitForm(form){
        var _this=this
        this.$refs[form].validate((valid) => {
          if(valid){
            var title=''
            // _this.ruleForm.groupsStatus=parseInt(_this.ruleForm.groupsStatus)

            if(_this.formType=='add'){
              title='添加成功'
              this.$http({
                url:api.boothMaintains,
                method:'post',
                data:_this.ruleForm,
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
              _this.ruleForm.boothCode =_this.boothCode
              let boothCode=_this.boothCode
              this.$http.put(api.boothMaintains+`/${boothCode}`,_this.ruleForm).then(res=>{ //
                if(res.code===0){
                  this.$message.success(title);
                  _this.centerDialogVisible=false;
                  _this.getPageList(this.pageParams.currentPage)
                }
              })
            }

          }
        });
      },

    }
  };
</script>
<style lang="less" scoped>
  .booth-maintenance{
    .footer-btn{
      width: 342px;
      text-align: right;
    }
    .el-dialog .el-form-item__content{
      width:80%
    }
    .el-dialog{
      .el-form-item.textarea{
        .textareaInput{
          width:500px
        }
      }
      .el-form-item .input-m2{
        width:85%
      }
    }
  }

  .unit-div{
    margin-top: 30px;
    text-align: right;
  }
</style>
<style lang="less">
  .booth-maintenance{
      .el-table .cell {
      padding-left: 11px;
    }
    .el-table__fixed-right {
      td {
        height: 100%;
      }
    }
  }
</style>
