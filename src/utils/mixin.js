import pagenation from '@/components/pagenation'
import { mapGetters } from 'vuex'
export const pageListMixin = { //页面list
  data() {
    return {
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
      itemList:[],
      pageInfo:{},
      getListUrl:''
    }
  },
  methods: {
    async getList(url) {
      let data = {
        ...this.reqData
      };
      this.getListUrl = url;
      if(this.beginTime && this.beginTime.length){ // 合同管理-合同查询
        data.beginRentBeginTime = this.beginTime[0];
        data.endRentBeginTime = this.beginTime[1]
      }
      if(this.endTime && this.endTime.length){  // 合同管理-合同查询
        data.beginRentEndTime = this.endTime[0];
        data.endRentEndTime = this.endTime[1]
      }
      if(this.paymentTime && this.paymentTime.length){ //财务管理-合同收款
        data.startTime =  this.paymentTime[0];
        data.endTime =  this.paymentTime[1];
      }
      if(this.refundTime && this.refundTime.length){ //财务管理-日常退款
        data.refundApplyBeginTime =  this.refundTime[0];
        data.refundApplyEndTime =  this.refundTime[1];
      }
      let res = await this.$http.get(url,{params: data});
      if(res){
        this.itemList = res.data;
        this.pageInfo = res.page;
      }
    },
    indexMethod(index) {
      let currentPage = this.pageInfo && this.pageInfo.currentPage || 1;
      return index + (currentPage - 1)*20 + 1
    },
    handlePage(page){
      this.reqData.currentPage = page || 1;
      this.getList(this.getListUrl);
    }
  },
  components:{
    pagenation
  },
  computed: {
    ...mapGetters({
      checkKey: 'getPermission',
    })
  }
};

export const contractDetailMixin = { //合同收退款详情
  data() {
    return {
      itemListInfo:[],
      itemList:[],
      merchant:{}, //商户信息
    }
  },
  computed:{
    canInput() {
      return this.submitData.costId.length === 1
    }
  },
  methods: {
    async getData(url, contractBatchNum, deposit = '') {
      let curUrl;
      if(deposit){
        curUrl = `${url}/${contractBatchNum}?deposit=${deposit}`
      }else {
        curUrl = `${url}/${contractBatchNum}`
      }
      let res = await this.$http.get(curUrl);
      if(res){
        this.merchant = res.data.merchant;
        this.itemList = res.data.list || res.data.resultRefundDTO;
        this.paymentSuccess = res.data.paymentSuccess;
        this.unpaidPayment = res.data.unpaidPayment;
      }
    },
    handleSelectionChange(val) {
      this.submitData.costId = [];
      this.submitData.payAmount =  0;
      val.forEach((item)=>{
        this.submitData.costId.push(item.contractCostId);
        this.submitData.payAmount += item.unpaidPayment || 0;
      });
      if(this.submitData.payAmount > 0){
        this.submitData.payAmount = this.submitData.payAmount.toString();
      }
      if(this.submitData.costId.length > 1){
        this.$refs['submitData'].clearValidate(['payAmount']);
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += '';
        } else {
          sums[index] = '--';
        }
      });
      return sums;
    }
  }
};

// ajax请求
export const ajaxData = {
  methods:{
    /**
     * ajax请求 ajaxGet,ajaxPost,ajaxPut,ajaxDelete
     * @param bean
     * url,data,
     * resetForm 表单重置model字段,
     * validateModel 表单验证model字段,
     * callBack ajax请求成功的返回的函数,
     * success bool 默认为false 默认成功提示,
     * fail bool 默认为false 默认错误提示
     * validateAfterBool 判断是否在表单自动验证后有自己的验证
     * validateAfter 具体验证方法,要通过if 返回false,true
     */
    ajaxRequest(bean){
      // 表单验证
      if(bean.validateModel){
        this.$refs[bean.validateModel].validate((valid) => {
          if(valid){
            if(bean.validateAfterBool){
              if(bean.validateAfter()){
                this.ajaxDetail(bean);
              }else{
                bean.validateAfter();
              }
            }else{
              this.ajaxDetail(bean);
            }
          }else{
            return false
          }
        });
      }else{
        this.ajaxDetail(bean);
      }
    },
    ajaxDetail(bean){
      this.$http({
        url:bean.url,
        method:bean.method,
        data:bean.data,
        params:bean.data
      }).then(res => {
        if(res){
          if(res.code == 0){
            if(bean.success){
              this.$message.success(res.msg)
            }
            if(bean.resetForm){
              this.$refs[bean.resetForm].resetFields();
            }
            if(bean.callBack){
              bean.callBack(res);
            }
          }else{
            if(bean.fail){
              this.$message.error(res.msg)
            }
          }
        }
      });
    },
    ajaxGet(bean){
      bean.method = 'get';
      bean.data = {
        params: bean.data
      }
      this.ajaxRequest({...bean});
    },
    ajaxPost(bean){
      bean.method = 'post';
      this.ajaxRequest({...bean});
    },
    ajaxPut(bean){
      bean.method = 'put';
      this.ajaxRequest({...bean});
    },
    ajaxDelete(bean){
      bean.method = 'delete';
      this.ajaxRequest({...bean});
    }
  }
};

// 弹框
export const messageBox = {
  methods: {
    /**
     * confirm 弹框
     * @param bean
     * message, title, btn(确认,取消), type, callBack, cancelBack
     */
    confirmBox(bean){
      this.$confirm(
        bean.message,
        bean.title ? bean.title : '提示信息',
        {
          confirmButtonText: bean.btn && bean.btn.split(',').length > 1 ? bean.btn.split(',')[0] : '确定',
          cancelButtonText: bean.btn && bean.btn.split(',').length > 1 ? bean.btn.split(',')[1] : '取消',
          type: bean.type? bean.type :'warning'
        }
      ).then(() => {
        if(bean.callBack){
          bean.callBack();
        }
      }).catch(() => {
        if(bean.cancelBack){
          bean.cancelBack();
        }
      });
    }
  }
};
