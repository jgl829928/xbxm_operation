<template>
  <div class="confirm-view">
    <h4>合同确认</h4>
    <div class="contact-content">
      <div v-for="(v,i) in dataMap" :key="i">
        <p>
          <span>{{ i === 0 || i === 1 ? '&nbsp;&nbsp;':''}}{{v}}</span>
          <a>预览</a>
        </p>
      </div>
    </div>
    <div class="con-verification">
      <p>填写验证码提交审核，即视为商户对协议内容确认完成且无异议</p>
      <div>
        <span>负责人手机号</span>
        <span>188****8888</span>
      </div>
      <div class="verification-box">
        <span>验证码</span>
        <el-input v-model.trim="input" placeholder="请输入验证码"></el-input>
        <el-button class="verification-code-btn" type="primary" @click="getVerificationCode">获取验证码</el-button>
      </div>
    </div>
    <div class="c-detail-footer-box">
      <el-button class="cancel-btn" type="primary" @click="prvHandle">上一步</el-button>
      <el-button type="primary" @click="submitReview">提交审核</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataMap:['新博新美连锁商场管理合同（专用条款篇）', '新博新美连锁商场管理合同（权利义务篇）',
               '【附件1】新博新美连锁商场消防及安全责任书', '【附件2】新博新美连锁商品售后服务协议',
               '【附件3】新博新美连锁营业员管理协议', '【附件4】新博新美连锁价格保护协议',
               '【附件5】新博新美连锁商场统一收款合同书', '【附件6】新博新美连锁反商业贿赂协议'
              ],
      input:''
    }
  },
  methods: {
    getVerificationCode() {

    },
    prvHandle() {
      this.$emit('prvHandle')
    },
    submitReview() {

    }
  }
};
</script>
<style lang="less" scoped>
  .confirm-view{
    h4{
      font-size: 16px;
      color: #444;
      text-align: center;
      font-weight: bold;
    }
    p{
      font-size: 14px;
      color: #444;
    }
    .contact-content{
      overflow: hidden;
      padding: 40px 0 75px;
      &>div{
        text-align: center;
        float: left;
        width: 50%;
        margin-bottom: 20px;
      }
      &>div:nth-child(7), &>div:nth-child(8){
        margin-bottom: 0;
      }
      p{
        display: inline-block;
        width: 390px;
        text-align: left;
        a{
          color: #3F87F5;
          margin-left: 68px;
          float: right;
        }
      }
    }
    .con-verification{
      width: 396px;
      margin: 0 auto;
      &>div{
        span:first-child{
          display: inline-block;
          width: 85px;
          margin-right: 30px;
        }
      }
      &>div:nth-child(2){
        margin: 25px 0;
      }
    }
  }
</style>
<style lang="less">
  .confirm-view{
    .verification-box{
      margin-bottom: 68px;
      div.el-input{
        width: 130px;
        height: 26px;
        input {
          height: 26px;
          line-height: 26px;
        }
      }
      .verification-code-btn{
        width: 80px;
        height: 26px;
        font-size: 12px;
        padding: 0;
        line-height: 24px;
      }
    }
  }
</style>
