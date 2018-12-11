<template>
  <div class="contract-receipts content-manage">
    <el-form  class="c-search-form" :model="pageParams" ref="pageParams" label-position="right" :inline="true">
      <el-row>
        <el-col :span="8">
          <el-form-item label="文章标题" prop="itemCode">
            <el-input clearable v-model.trim="pageParams.title"></el-input>
          </el-form-item>
         <!-- <el-form-item label="" prop="itemCode">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="search">筛选</el-button>
          </el-form-item>-->
        </el-col>
        <el-col :span="16">
          <div class="c-footer-btn">
            <el-button class="btn-search" type="primary" icon="el-icon-search" @click="getPageList(1)">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div v-show="$store.getters.getPermission('content_2')">
      <router-link :to="{name:'addContent'}">
        <el-button class="btn-search btn-add" type="primary">添加内容</el-button>
      </router-link>
    </div>
    <div class="c-table-wrap">
      <el-table
        :data="tableList"
        style="width: 100%"
        align="center"
        stripe height="500">
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          min-width="120"
          align="center"
          prop="title"
          label="文章标题">
        </el-table-column>
        <el-table-column
          min-width="120"
          align="center"
          prop="subtitle"
          label="小标题">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          label="封面图">
          <template slot-scope="scope">
            <img :src="scope.row.coverImageUrl" alt="" style="width: 100px;height: 65px;">
          </template>
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="author"
          label="作者">
        </el-table-column>
        <el-table-column
          min-width="110"
          align="center"
          prop="contentAbstract"
          label="摘要">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="110"
          label="正文类型">
          <template slot-scope="scope">
             <span>{{scope.row.contentType.desc}}</span>
             <a v-if="scope.row.contentType.code===1" :href="scope.row.link" target="_blank">打开</a>
             <span v-else class="skipBtn" @click="skipContent(scope.row.contentCode)">预览</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          min-width="165"
          label="创建时间">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="110"
          label="发布渠道">
          <template slot-scope="scope">
             <span v-for="(data,index) in scope.row.releaseChannel" :key="data.code">{{data.desc+((index+1)!==scope.row.releaseChannel.length?'、':'')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width="80"
          align="center"
          prop="publishType.desc"
          label="发布状态">
        </el-table-column>
        <el-table-column
          align="center"
          prop="publishTime"
          min-width="165"
          label="发布时间">
        </el-table-column>
        <el-table-column
          align="center"
          width="300"
          label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              :disabled="!($store.getters.getPermission('content_5'))"
              class="btn-handle" type="primary"
              @click="publishContent(scope.row.contentCode,1)"
              v-if="scope.row.publishType.code===0"
              >发布</el-button>
            <el-button
              :disabled="!($store.getters.getPermission('content_6'))"
              v-else
              class="btn-handle" type="primary"
              @click="publishContent(scope.row.contentCode,2)"
              >取消发布</el-button>
            <el-button :disabled="!($store.getters.getPermission('content_3'))||!(scope.row.publishType.code===0)" class="btn-handle" type="primary"
                        @click="modifyContent(scope.row.contentCode)">修改</el-button>
            <el-button :disabled="!($store.getters.getPermission('content_4'))||!(scope.row.publishType.code===0)" class="btn-handle btn-add" type="primary" @click="deleteContent(scope.row.contentCode)"
                       >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="内容预览"
      :visible.sync="dialogVisible"
      class="l-dialog"
      center>
      <div v-html="skipContentInfo"></div>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-reset" type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <Pagenation :pageparams="pageDefault" @handlePage="getPageList" :itemList="tableList"/>
  </div>
</template>

<script>
  import Pagenation from '@/components/pagenation';
  import api from '@/api/operation-manage';

  export default {
    name:'contentManagement',
    components: {
      Pagenation
    },
    data() {
      return {
        dialogVisible:false,
        skipContentInfo:'',
        pageDefault: {//分页默认参数
          totalRecords: 0,
          currentPage: 1,
          pageSize: 20
        },
        pageParams: {//表格查询参数
          title: '',
          currentPage: 1
        },
        tableList: []
      }
    },
    methods: {
      async getPageList(index) {
        this.pageParams.currentPage = index || 1;
        this.pageDefault.currentPage = index || 1;
        let res = await this.$http.get(api.contentList, {params: this.pageParams});
        if (res.code === 0) {
          this.pageDefault.totalRecords = res.page.totalRecords;
          this.tableList = [];
          this.tableList = [...res.data];
        }
      },
      deleteContent(id) {
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(api.addContent + `/${id}`).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg);
              this.getPageList();
            }else{
              this.$message.error(res.msg);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      publishContent(id,status){
        this.$http.put(api.publishContent+`/${id}?releaseType=${status}`).then(res=>{
          if(res.code===0){
            this.$message.success(res.msg);
            this.getPageList();
          }else{
            this.$message.error(res.msg)
          }
        })
      },
      skipContent(contentCode){
        this.$http.get(`${api.singleContent}/${contentCode}`).then(res=>{
          if(res.code===0){
            this.skipContentInfo=res.data.content;
          }
        })
        this.dialogVisible=true;
      },
      modifyContent(id){
        this.$router.push({name:'editContent',params:{id:id}})
      },
      indexMethod(index) {
        return index + (this.pageParams.currentPage - 1) * 20 + 1
      },
    },
    beforeMount() {
      this.getPageList();
    }
  };
</script>
<style lang="less" scoped>
  .contract-receipts{
    .footer-btn{
      width: 342px;
      text-align: right;
    }
  }
</style>
<style lang="less">
  .content-manage{
    .skipBtn{
      color: #3D68FF;
      cursor:pointer;
    }
    .el-dialog__body{
      min-height: 300px;
      padding: 15px;
      border: 1px solid #e1e1e1;
      div{
        width: 100%;
         img{
           max-width: 100%;
         }
      }
    }
  }
</style>
