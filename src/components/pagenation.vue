<template>
	<div class="pagination-box" v-if="itemList.length != 0 || JSON.stringify(pageparams) == '{currentPage:1}'">
      <el-pagination
        background
        layout="total,prev, pager, next"
        @current-change="handlePage"
        :page-size="pageparams.pageSize"
        :total="pageparams.totalRecords"
        :current-page="pageparams.currentPage">
      </el-pagination>
    </div>
</template>
<script>
	export default {
		props:['pageparams','itemList'],
    methods:{
    	handlePage(val){
    		this.$emit('handlePage',val)
    	}
    }
	}
</script>
