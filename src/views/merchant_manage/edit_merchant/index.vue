<template>
  <div class="contract-receipts edit-merchant">
    <div class="main-title">
      <!--<span class="el-icon-back back-btn" @click="$router.push({name:'merchantManage'})"></span>-->
      修改商户信息
    </div>
    <el-form class="c-search-form" :model="reqData" :rules="rules" ref="ruleForm" label-width="128px"
             label-position="right" :inline="true">
      <div class="title">商户基本信息</div>
      <el-row>
        <el-col :span="9">
          <el-form-item label="商户名称" prop="merchantName">
            <el-input clearable v-model.trim="reqData.merchantName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="门店名称" prop="storeName">
            <el-input class="store-name-all" clearable v-model.trim="reqData.storeName"
                      @focus="dialogVisible=true"></el-input>
          </el-form-item>
          <!--<span class="storeNameTip">注：门店名称只读，获取鼠标交点后弹出录入页面，可重复，必填，最多支持20个名称</span>-->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="商户性质" prop="merchantNature">
            <el-select v-model.trim="reqData.merchantNature" disabled clearable placeholder="请选择" @change="changeLoginNumStatus">
              <el-option
                v-for="(item, index) in merchantNatureList"
                :key="index"
                :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="注册号" prop="loginNumber">
            <el-input clearable v-model.trim="reqData.loginNumber"></el-input>
          </el-form-item>
          <!--<span class="storeNameTip">注：商户性质为企业的，注册号必填</span>-->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="法人代表/负责人" prop="leaderName">
            <el-input clearable v-model.trim="reqData.leaderName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="负责人身份证号" prop="leaderCard">
            <el-input clearable v-model.trim="reqData.leaderCard"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="联系电话" prop="leaderTel">
            <el-input clearable v-model.trim="reqData.leaderTel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="紧急联系人电话" prop="urgencyTel">
            <el-input clearable v-model.trim="reqData.urgencyTel"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="微信号" prop="wxId">
            <el-input clearable v-model.trim="reqData.wxId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="固定电话" prop="telephone">
            <el-input clearable v-model.trim="reqData.telephone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="电子邮箱" prop="email">
            <el-input clearable v-model.trim="reqData.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="QQ" prop="qq">
            <el-input clearable v-model.trim="reqData.qq"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="法人代表证号" prop="legalCard">
            <el-input clearable v-model.trim="reqData.legalCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="联系地址" prop="address">
            <el-input type="textarea" clearable v-model.trim="reqData.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">经营品牌信息</div>
      <el-row class="brand-wrap">
        <el-col :span="2" class="brand">
          主品牌
        </el-col>
        <el-col :span="7">
          <el-form-item label="类别" prop="mainType" label-width="60px">
            <!--<el-select v-model.trim="reqData.merchantBrandRQList[0].brandClass" clearable placeholder="请选择">-->
            <el-select v-model.trim="reqData.mainType" clearable placeholder="请选择" @change="changeMainType">
              <el-option
                v-for="(item, index) in typeOption"
                :key="index"
                :label="item.managementTypeName"
                :value="item.managementTypeId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="品牌" prop="mainBrand" label-width="60px">
            <el-select v-model.trim="reqData.mainBrand" clearable placeholder="请选择" @change="changeMainBrand">
              <el-option
                v-for="(item, index) in brandOption"
                :key="index"
                :label="item.brandName"
                :value="item.brandCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代理级别" prop="mainAgencyLevel" label-width="80px">
            <el-select v-model.trim="reqData.mainAgencyLevel" clearable placeholder="请选择" @change="changeMainAgencyLevel">
              <el-option
                v-for="(item, index) in levelOption"
                :key="index"
                :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="brand-wrap">
        <el-col :span="2" class="brand">
          子品牌1
        </el-col>
        <el-col :span="7">
          <el-form-item label="类别" label-width="60px">
            <el-select v-model.trim="merchantBrandList1.managementTypeId" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in typeOption"
                :key="index"
                :label="item.managementTypeName"
                :value="item.managementTypeId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="品牌" label-width="60px">
            <el-select v-model.trim="merchantBrandList1.brandCode" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in brandOption"
                :key="index"
                :label="item.brandName"
                :value="item.brandCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代理级别" label-width="80px">
            <el-select v-model.trim="merchantBrandList1.agencyLevel" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in levelOption"
                :key="index"
                :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="brand-wrap">
        <el-col :span="2" class="brand">
          子品牌2
        </el-col>
        <el-col :span="7">
          <el-form-item label="类别" label-width="60px">
            <el-select v-model.trim="merchantBrandList2.managementTypeId" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in typeOption"
                :key="index"
                :label="item.managementTypeName"
                :value="item.managementTypeId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="品牌" label-width="60px">
            <el-select v-model.trim="merchantBrandList2.brandCode" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in brandOption"
                :key="index"
                :label="item.brandName"
                :value="item.brandCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代理级别" label-width="80px">
            <el-select v-model.trim="merchantBrandList2.agencyLevel" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in levelOption"
                :key="index"
                :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">返款账户信息</div>
      <el-row>
        <el-col :span="10">
          <el-form-item label="账户姓名" prop="refundAccountName">
            <el-input clearable v-model.trim="reqData.refundAccountName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="开户行" prop="refundAccountBank">
            <el-input clearable v-model.trim="reqData.refundAccountBank"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="返款账户卡号" prop="refundAccountNumber">
            <el-input clearable v-model.trim="reqData.refundAccountNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="备注" class="otherInfo">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model.trim="reqData.remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">附件</div>
      <el-row class="img-row">
        <el-col :span="8">
          <p>营业执照</p>
          <el-form-item label="">
            <el-upload
              :index="1"
              class="avatar-uploader"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :show-file-list="false"
              accept="image/jpg,image/jpeg,image/png,image/bmp,image/gif"
              :before-upload="beforeImgUpload"
              :on-success="licenseUpload">
              <div class="avatar" v-if="reqData.merchantPictureList[0].merchantPictureUrl">
                <img :src="reqData.merchantPictureList[0].merchantPictureUrl">
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span v-if="reqData.merchantPictureList[0].merchantPictureUrl" class="el-icon-error delete-img"
                  @click="deleteImg(0)"></span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <p>税务登记证</p>
          <el-form-item label="">
            <el-upload
              class="avatar-uploader"
              :headers="uploadHeaders"
              :action="uploadUrl"
              accept="image/jpg,image/jpeg,image/png,image/bmp,image/gif"
              :show-file-list="false"
              :before-upload="beforeImgUpload"
              :on-success="taxUpload">
              <div class="avatar" v-if="reqData.merchantPictureList[1].merchantPictureUrl">
                <img :src="reqData.merchantPictureList[1].merchantPictureUrl">
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span v-if="reqData.merchantPictureList[1].merchantPictureUrl" class="el-icon-error delete-img"
                  @click="deleteImg(1)"></span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="img-row">
        <el-col :span="8">
          <p>法人代表身份证正面</p>
          <el-form-item label="">
            <el-upload
              class="avatar-uploader"
              :headers="uploadHeaders"
              :action="uploadUrl"
              accept="image/jpg,image/jpeg,image/png,image/bmp,image/gif"
              :show-file-list="false"
              :before-upload="beforeImgUpload"
              :on-success="idCardAUpload">
              <div class="avatar" v-if="reqData.merchantPictureList[2].merchantPictureUrl">
                <img :src="reqData.merchantPictureList[2].merchantPictureUrl">
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span v-if="reqData.merchantPictureList[2].merchantPictureUrl" class="el-icon-error delete-img"
                  @click="deleteImg(2)"></span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <p>法人代表身份证反面</p>
          <el-form-item label="">
            <el-upload
              class="avatar-uploader"
              :headers="uploadHeaders"
              :action="uploadUrl"
              accept="image/jpg,image/jpeg,image/png,image/bmp,image/gif"
              :show-file-list="false"
              :before-upload="beforeImgUpload"
              :on-success="idCardBUpload">
              <div class="avatar" v-if="reqData.merchantPictureList[3].merchantPictureUrl">
                <img :src="reqData.merchantPictureList[3].merchantPictureUrl">
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span v-if="reqData.merchantPictureList[3].merchantPictureUrl" class="el-icon-error delete-img"
                  @click="deleteImg(3)"></span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="img-row">
        <el-col :span="24">
          <p>门店照片</p>
        </el-col>
        <el-col :span="4" v-for="(item,index) in reqData.merchantPictureList" :key="index" v-if="index>4">
          <el-form-item label="">
            <div class="avatar">
              <img :src="item.merchantPictureUrl">
            </div>
            <span class="el-icon-error delete-img" @click="deleteStoreImg(index)"></span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="">
            <el-upload
              class="avatar-uploader"
              :headers="uploadHeaders"
              :action="uploadUrl"
              accept="image/jpg,image/jpeg,image/png,image/bmp,image/gif"
              :show-file-list="false"
              :before-upload="beforeImgUpload"
              :on-success="storeUpload">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="img-row">
        <el-col :span="8">
          <p>其他</p>
          <el-form-item label="">
            <el-upload
              class="avatar-uploader"
              :headers="uploadHeaders"
              :action="uploadUrl"
              accept="image/jpg,image/jpeg,image/png,image/bmp,image/gif"
              :show-file-list="false"
              :before-upload="beforeImgUpload"
              :on-success="otherUpload">
              <div class="avatar" v-if="reqData.merchantPictureList[4].merchantPictureUrl">
                <img :src="reqData.merchantPictureList[4].merchantPictureUrl">
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span v-if="reqData.merchantPictureList[4].merchantPictureUrl" class="el-icon-error delete-img"
                  @click="deleteImg(4)"></span>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="save-div">
        <el-button class="btn-save-small" type="primary" @click="submitForm('ruleForm')">保 存</el-button>
        <el-button class="btn-save-small btn-cancle" type="primary" @click="$router.push({name:'merchantManage'})">取 消</el-button>
      </div>
    </el-form>
    <el-dialog
      title="门店"
      :visible.sync="dialogVisible"
      class="m-dialog">
      <div class="table-wrap">
        <el-button type="text" class="table-add-btn" icon="el-icon-circle-plus-outline"
                   @click="addStoreName"></el-button>
        <el-table
          :data="tableData"
          style="width: 100%"
          stripe
          align="center">
          <el-table-column
            label="序号"
            align="center"
            width="120"
            type="index">
          </el-table-column>
          <el-table-column
            label="门店名称"
            align="center">
            <template slot-scope="scope">
              <el-input v-model.trim="scope.row.name" class="store-name-input"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="">
            <template slot-scope="scope">
              <el-button type="text" @click="deleteStoreName(scope.$index)" icon="el-icon-remove-outline"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-save" type="primary" @click="showName">确 定</el-button>
        <el-button class="btn-reset" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api/operation-manage';
  import {mapState} from 'vuex';

  export default {
    name:'editMerchant',
    computed: {
      ...mapState(['gTicket'])
    },
    data() {
      return {
        uploadUrl: '',
        uploadHeaders: {
          gTicket: ''
        },
        dialogVisible: false,
        merchantNatureList: [],//商户性质下拉列表,
        typeOption: [],//类别下拉列表
        brandOption: [],//品牌下拉列表
        levelOption: [],//代理级别下拉列表
        tableData: [{name: ''}],
        reqData: {
          merchantName: '',
          storeName: '',
          shopName: [],
          merchantNature: '',
          loginNumber: '',
          leaderName: '',
          leaderCard: '',
          leaderTel:'',
          urgencyTel: '',
          wxId: '',
          telephone: '',
          email: '',
          qq: '',
          legalCard: '',
          address: '',
          mainType: '',//解决表单验证新增字段
          mainBrand: '',//解决表单验证新增字段
          mainAgencyLevel: '',//解决表单验证新增字段
          merchantBrandList: [],
          refundAccountName: '',
          refundAccountBank: '',
          refundAccountNumber: '',
          remark: '',
          merchantPictureList: [
            {merchantPictureType: 1, merchantPictureUrl: '', desc: '营业执照'},
            {merchantPictureType: 2, merchantPictureUrl: '', desc: '税务登记证'},
            {merchantPictureType: 3, merchantPictureUrl: '', desc: '身份证正面'},
            {merchantPictureType: 4, merchantPictureUrl: '', desc: '身份证反面'},
            {merchantPictureType: 5, merchantPictureUrl: '', desc: '其他'}
          ]
        },
        merchantBrandList: {brandClass: 1, managementTypeId: '', brandCode: '', agencyLevel: ''},
        merchantBrandList1: {brandClass: 2, managementTypeId: '', brandCode: '', agencyLevel: ''},
        merchantBrandList2: {brandClass: 2, managementTypeId: '', brandCode: '', agencyLevel: ''},
        rules: {
          merchantName: [
            {required: true, message: '请输入商户名称', trigger: 'blur'},
            {min: 1, max: 50, message: '请输入1-50位商户名称', trigger: 'blur'}
          ],
          storeName: [
            {required: true, message: '请输入门店名称', trigger: 'change'},
          ],
          merchantNature: [
            {required: true, message: '请选择商户性质', trigger: 'change'},
          ],
          loginNumber: [
            {required: false, message: '请输入注册号', trigger: 'blur'},
            {min: 1, max: 50, message: '请输入1-50位注册号', trigger: 'blur'},
            {pattern:/^[0-9a-zA-Z]+$/, message: '只能输入字母和数字', trigger: 'blur'}
          ],
          leaderName: [
            {required: true, message: '请输入负责人', trigger: 'blur'},
            {min: 1, max: 20, message: '长度1-20位', trigger: 'blur'}
          ],
          leaderCard: [
            {required: true, message: '请输入负责人身份证号', trigger: 'blur'},
            {
              message: '请输入正确的身份证号',
              trigger: 'blur',
              pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
            }
          ],
          leaderTel: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
            {
              message: '请输入正确的手机号',
              trigger: 'blur',
              pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0-9]|18[0-9])\d{8}$/
            }
          ],
          urgencyTel: [
            {required: true, message: '请输入紧急联系人电话', trigger: 'blur'},
            {
              message: '请输入正确的手机号',
              trigger: 'blur',
              pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0-9]|18[0-9])\d{8}$/
            }
          ],
          wxId: [
            {required: true, message: '请输入微信号', trigger: 'blur'},
            {min: 1, max: 40, message: '请输入1-40位微信号', trigger: 'blur'},
            {message: '请输入正确的微信号', trigger: 'blur', pattern: /^[a-zA-Z\d_@]{5,}$/}
          ],
          mainType: [
            {required: true, message: '请选择类别', trigger: 'change'},
          ],
          mainBrand: [
            {required: true, message: '请选择品牌', trigger: 'change'},
          ],
          mainAgencyLevel: [
            {required: true, message: '请选择代理级别', trigger: 'change'},
          ],
          refundAccountName: [
            {required: true, message: '请输入账户姓名', trigger: 'blur'},
            {min: 1, max: 20, message: '请输入1-20位账户姓名', trigger: 'blur'}
          ],
          refundAccountBank: [
            {required: true, message: '请输入开户行', trigger: 'blur'},
            {min: 1, max: 50, message: '请输入1-50位开户行', trigger: 'blur'}
          ],
          refundAccountNumber: [
            {required: true, message: '请输入返款账户卡号', trigger: 'blur'},
            {pattern: /^\d{1,30}$/, message: '请输入1-30位正确的账户卡号', trigger: 'blur'}
          ],
          telephone: [{pattern: /^(0\d{2}-?\d{8})|0\d{3}-?\d{7}$/, message: '请输入正确的固定电话', trigger: 'blur'}],
          qq: [{pattern: /^\d{5,15}$/, message: '请输入5-15位正确的QQ号', trigger: 'blur'}],
          legalCard: [{max: 20, message: '输入位数最多20位', trigger: 'blur'},
            {
              message: '请输入正确的注册号（身份证号）',
              trigger: 'blur',
              pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
            }
          ],
          address: [{required: true, message: '请输入联系地址', trigger: 'blur'},
            {max: 100, message: '输入位数最多100位', trigger: 'blur'}],
          email: [
            {pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, message: '请输入正确的邮箱', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getOptionData() {
        let otherOption = this.$http.get(api.merchantsOptionInfo);
        let brandOption = this.$http.get(api.allBrand);
        Promise.all([otherOption, brandOption]).then(res => {
          if (res[0].code === 0) {
            this.merchantNatureList = [];
            this.typeOption = [];
            this.levelOption = [];
            this.merchantNatureList = [...res[0].data.merchantNatureList];
            this.typeOption = [...res[0].data.mangementTypeDTOList];
            this.levelOption = [...res[0].data.agencyLevelList];
          }
          if (res[1].code === 0) {
            this.brandOption = [];
            this.brandOption = [...res[1].data];
          }
        })
      },
      addStoreName() {
        if (this.tableData.length < 20) {
          this.tableData.push({name: ''});
        } else {
          this.$message.warning('最多添加20个门店名称')
        }
      },
      deleteStoreName(index) {
        this.tableData.splice(index, 1)
      },
      showName() {
        let arr = [];
        let tableData = [...this.tableData];
        for (let i = 0; i < tableData.length; i++) {
          if (tableData[i].name !== '') {
            arr.push(tableData[i].name)
          }
        }
        this.reqData.storeName = arr.join(',');
        this.reqData.shopName = [];
        this.reqData.shopName = [...arr];
        this.dialogVisible = false;
      },
      changeLoginNumStatus(e) {
        (e === 2) ? this.rules.loginNumber[0].required = true : this.rules.loginNumber[0].required = false;
      },
      changeMainType(e) {//主品牌类别赋值，用以解决表单正常验证
        this.merchantBrandList.managementTypeId = e;
      },
      changeMainBrand(e) {//主品牌的品牌赋值，用以解决表单正常验证
        this.merchantBrandList.brandCode = e;
      },
      changeMainAgencyLevel(e) {//主品牌的代理级别赋值，用以解决表单正常验证
        this.merchantBrandList.agencyLevel = e;
      },
      beforeImgUpload(file) {
        const isLt5M = file.size / 1024 / 1024 <= 5;
        if (!isLt5M) {
          this.$message.error("上传头像图片大小不能超过5MB!");
        }
        return isLt5M;
      },
      licenseUpload(res) {//营业执照上传
        this.reqData.merchantPictureList[0].merchantPictureUrl = res.data.merchantPictureUrl;
      },
      taxUpload(res) {//税务登记证上传
        this.reqData.merchantPictureList[1].merchantPictureUrl = res.data.merchantPictureUrl;
      },
      idCardAUpload(res) {//身份证正面上传
        this.reqData.merchantPictureList[2].merchantPictureUrl = res.data.merchantPictureUrl;
      },
      idCardBUpload(res) {//身份证反面上传
        this.reqData.merchantPictureList[3].merchantPictureUrl = res.data.merchantPictureUrl;
      },
      otherUpload(res) {//其他照片上传
        this.reqData.merchantPictureList[4].merchantPictureUrl = res.data.merchantPictureUrl;
      },
      storeUpload(res) {//门店上传
        let url = res.data.merchantPictureUrl;
        let obj = {merchantPictureType: 6, merchantPictureUrl: url, desc: '门店照片'};
        this.reqData.merchantPictureList.push(obj);
      },
      deleteImg(index) {
        this.reqData.merchantPictureList[index].merchantPictureUrl = '';
      },
      deleteStoreImg(index) {
        this.reqData.merchantPictureList.splice(index, 1)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //品牌数据处理
            let brand1 = {...this.merchantBrandList1};
            let brand2 = {...this.merchantBrandList2};
            let mainBrand = {...this.merchantBrandList};//主品牌
            let arr = [mainBrand];
            if (brand1.managementTypeId !== '' && brand1.brandCode !== '' && brand1.agencyLevel !== '') {
              arr.push(brand1);//子品牌1
            }
            if (brand2.managementTypeId !== '' && brand2.brandCode !== '' && brand2.agencyLevel !== '') {
              arr.push(brand2);//子品牌2
            }
            this.reqData.merchantBrandList = [...arr];
            this.$http.put(api.merchants, this.reqData).then(res => {
              if (res.code === 0) {
                this.$message.success('修改成功');
                this.$router.push({path: '/merchant/merchantManage'});
              }
            });
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
      this.uploadUrl = `${this.$http.defaults.baseURL}/business/merchants/pictures/uploads`;
      this.uploadHeaders.gTicket = this.gTicket;
      this.getOptionData();
      let merchantCode = this.$route.params.id;
      if (merchantCode) {
        this.$http.get(api.merchants + `/${merchantCode}`).then(res => {
          Object.assign(this.reqData, res.data);
          //门店名称处理
          let tableDataArr = [...this.reqData.shopNameList];
          this.reqData.storeName = tableDataArr.join(',');
          this.reqData.shopName = [];
          this.reqData.shopName = [...this.reqData.shopNameList];
          if (tableDataArr.length > 0) {
            this.tableData = [];
            for (let i = 0; i < tableDataArr.length; i++) {
              this.tableData.push({name: tableDataArr[i]})
            }
          }
          //商户性质处理
          let obj = {...this.reqData.merchantNature};
          this.reqData.merchantNature = obj.code;

          //经营品牌处理
          let brandArr = [...this.reqData.merchantBrandList];
          //1、主品牌
          this.reqData.mainType = brandArr[0].managementTypeId;
          this.reqData.mainBrand = brandArr[0].brandCode;
          this.reqData.mainAgencyLevel = brandArr[0].agencyLevel.code;
          this.merchantBrandList.managementTypeId = brandArr[0].managementTypeId;
          this.merchantBrandList.brandCode = brandArr[0].brandCode;
          this.merchantBrandList.agencyLevel = brandArr[0].agencyLevel.code;
          //2、子品牌
          if (brandArr.length > 1) {
            this.merchantBrandList1.managementTypeId = brandArr[1].managementTypeId;
            this.merchantBrandList1.brandCode = brandArr[1].brandCode;
            this.merchantBrandList1.agencyLevel = brandArr[1].agencyLevel.code;
          }
          if (brandArr.length > 2) {
            this.merchantBrandList2.managementTypeId = brandArr[2].managementTypeId;
            this.merchantBrandList2.brandCode = brandArr[2].brandCode;
            this.merchantBrandList2.agencyLevel = brandArr[2].agencyLevel.code;
          }
          //图片列表处理
          let imgaArr = [...this.reqData.merchantPictureList];
          for (let i = 0; i < imgaArr.length; i++) {
            this.reqData.merchantPictureList[i].merchantPictureType = imgaArr[i].merchantPictureType.code;
          }
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
</style>
<style lang="less">
  .edit-merchant {
    .c-search-form > div > div:nth-child(2) {
      text-align: left;
    }
    .main-title {
      width: 100%;
      height: 28px;
      line-height: 28px;
      font-size: 16px;
      color: #444444;
      font-weight: bold;
      text-align: center;
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
    .title {
      width: 100%;
      height: 38px;
      line-height: 38px;
      background: #FFF7F2;
      font-size: 14px;
      color: #444444;
      font-weight: bold;
      margin: 30px 0 18px 0;
      text-indent: 15px;
    }
    .store-name-all .el-input__suffix {
      visibility: hidden;
    }
    .address {
      width: 100%;
      .el-form-item__content {
        width: 80%;
      }
    }
    .brand-wrap {
      .brand {
        padding: 0 !important;
        line-height: 40px;
        text-align: right;
      }
      div:nth-child(3) {
        text-align: left;
      }
    }
    .otherInfo {
      width: 100%;
      .el-form-item__content {
        width: 80%;
      }
    }
    .save-div {
      width: 100%;
      text-align: center;
      .btn-save-small{
        width: 120px;
        height: 40px;
        font-size: 16px;
      }
      .btn-cancle{
        color:#606266;
        background: #FFFFFF;
        border: 1px solid #dcdfe6;
        &:hover{
          color: #FF7623;
          border-color: rgb(255, 214, 189);
          background-color: rgb(255, 241, 233);
        }
      }
    }
    .img-row .el-col {
      min-width: 220px;
      padding-left: 60px !important;
      p {
        font-size: 12px;
        margin: 40px 0 20px;
      }
    }
    .avatar-uploader .el-upload {
      /*border: 1px dashed #d9d9d9;*/
      /*border-radius: 6px;*/
      cursor: pointer;
      position: relative;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      color: #e1e1e1;
      width: 200px;
      height: 100px;
      line-height: 100px;
      font-size: 50px;
      text-align: center;
    }
    .avatar {
      position: relative;
      display: block;
      width: 200px;
      height: 100px;
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      img {
        width: 90%;
        height: 100%;
      }
    }
    .delete-img {
      position: absolute;
      top: -7px;
      right: -7px;
      font-size: 14px;
      color: #EB3941;
      cursor: pointer;
    }
    .table-wrap {
      position: relative;
      margin: 0 auto;
      width: 418px;
      background: #FFFFFF;
      border: 1px solid #EBEBEB;
      border-radius: 4px;
    }
    .table-add-btn {
      position: absolute;
      top: 5px;
      right: 67px;
      color: #FF7722;
      font-weight: bold;
      font-size: 14px;
      z-index: 1;
    }
    .el-icon-remove-outline {
      color: #D8D8D8;
    }
  }
</style>
