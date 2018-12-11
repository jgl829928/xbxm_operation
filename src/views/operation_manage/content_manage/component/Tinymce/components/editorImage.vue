<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}"
               @click=" dialogVisible=true" type="primary">上传图片
    </el-button>
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <el-upload class="editor-slide-upload"
                 :headers="uploadHeaders"
                 :action="uploadUrl"
                 :file-list="fileList"
                 :show-file-list="true"
                 list-type="picture-card" :on-remove="handleRemove" :on-success="handleSuccess"
                 :before-upload="beforeUpload">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button type="primary" class="btn-search btn-reset" @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" class="btn-search btn-save" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState(['gTicket'])
    },
    name: 'editorSlideUpload',
    props: {
      color: {
        type: String,
        default: '#1890ff'
      }
    },
    data() {
      return {
        uploadUrl: '',
        uploadHeaders: {
          gTicket: ''
        },
        dialogVisible: false,
        listObj: {},
        fileList: []
      }
    },
    methods: {
      checkAllSuccess() {
        return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
      },
      handleSubmit() {
        const arr = Object.keys(this.listObj).map(v => this.listObj[v])
        if (!this.checkAllSuccess()) {
          this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
          return
        }
        console.log(arr)
        this.$emit('successCBK', arr)
        this.listObj = {}
        this.fileList = []
        this.dialogVisible = false
      },
      handleSuccess(response, file) {
        const uid = file.uid
        const objKeyArr = Object.keys(this.listObj)
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            this.listObj[objKeyArr[i]].url = response.data;
            this.listObj[objKeyArr[i]].hasSuccess = true
            return
          }
        }
      },
      handleRemove(file) {
        const uid = file.uid
        const objKeyArr = Object.keys(this.listObj)
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            delete this.listObj[objKeyArr[i]]
            return
          }
        }
      },
      beforeUpload(file) {
        const isLt5M = file.size / 1024 / 1024 <= 20;
        if (!isLt5M) {
          this.$message.error("上传头像图片大小不能超过20MB!");
          return isLt5M;
        }
        const _self = this
        const _URL = window.URL || window.webkitURL
        const fileName = file.uid
        this.listObj[fileName] = {}
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = _URL.createObjectURL(file)
          img.onload = function () {
            _self.listObj[fileName] = {hasSuccess: false, uid: file.uid, width: this.width, height: this.height}
          }
          resolve(true)
        })
      }
    },
    beforeMount() {
      this.uploadUrl = `${this.$http.defaults.baseURL}/business/operation/image/upload`;
      this.uploadHeaders.gTicket = this.gTicket;
    }
  }
</script>

<style lang="less">
  .editor-slide-upload {
    margin-bottom: 20px;
    .el-upload--picture-card {
      width: 100%;
    }
  }
</style>
