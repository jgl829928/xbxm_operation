<template>
    <div class="g-index-market">
    	<div class="m-market-pie">
                <div id="u-pie-longquan-market" @click="routerTo('contractReceipts_1',{name:'contractReceiptsMarket',params:{marketCode:tatisticsFinancial.marketCode}})"></div>
                <i class="el-icon-oms-shuju2" v-show="JSON.stringify(tatisticsFinancial) == '{}'"></i>
          </div>

      <div class="m-booth-bar">
        <i class="el-icon-oms-data-detail" v-show="statisticsBooths.length == 0"></i>
      	<div id="m-booth-bar-market" @click="routerTo('boothMain_1',{name:'boothMain',params:{marketName:statisticsBooths[0].marketName}})">
      	</div>
      </div>


      <div class="m-property-pie">
        <span class="u-main-title" v-show="JSON.stringify(statisticsProperties) != '{}'">物业信息</span>
        <i class="el-icon-oms-shuju" v-show="JSON.stringify(statisticsProperties) == '{}'"></i>
      		<div id="m-property-pie-market" @click="routerTo('device_search',{name:'device'})"></div>
      		<div class="m-property-message fr" v-show="JSON.stringify(statisticsProperties) != '{}'">
      			<div class="u-title clearfix">
      			<h4 class="u-inline fl">维保</h4>
      			<router-link :to="{name:'maintenance'}" class="fr" v-show="rightControl('maintenance_search')">
      				 详情<i class="el-icon-d-arrow-right"></i>
      			</router-link>
      		</div>
      			<div class="clearfix">
      				<div class="u-inline fl u-left">
	      			<h5>{{statisticsProperties.maintenanceCount}} 次</h5>
	      			<h6>总次数</h6>
      			</div>
				<div class="u-inline fr u-right">
	      			<h5>{{statisticsProperties.maintenanceAmount}} 元</h5>
	      			<h6>总费用</h6>
      			</div>
      			</div>
      			<div class="u-title clearfix">
      			<h4 class="u-inline fl">维修</h4>
      			<router-link :to="{name:'seviceRecord'}" class="fr"v-show="rightControl('maintenance_search')">
      				 详情<i class="el-icon-d-arrow-right"></i>
      			</router-link>
      		</div>
      			<div class="clearfix">
      				<div class="u-inline fl u-left">
	      			<h5>{{statisticsProperties.repairCount}} 次</h5>
	      			<h6>总次数</h6>
      			</div>
				<div class="u-inline fr u-right">
	      			<h5>{{statisticsProperties.repairAmount}} 元</h5>
	      			<h6>总费用</h6>
      			</div>
      			</div>
      		</div>
      	<div class="u-inline u-tip" v-show="JSON.stringify(statisticsProperties) != '{}'">
      		<h5 class="u-inline">设备总量</h5>
      		<h5 class="u-inline">{{statisticsProperties.totalEquipmentCount}}</h5>
      	</div>
  </div>
     <div class="m-category-pie">
        <i class="el-icon-oms-shuju1" v-show="JSON.stringify(contractMerchants) == '{}'"></i>
      	<div id="u-market-contract-market" @click="routerTo('contractSearch_1',{name:'contractSearch'})"></div>
      	<div class="u-inline u-tip1" v-show="JSON.stringify(contractMerchants) != '{}'">
      		<h5 class="u-inline">合同总数</h5>
      		<h5 class="u-inline">{{contractMerchants.totalContractNum || 0}}</h5>
      	</div>
      </div>
      <div class="u-category">
        <i class="el-icon-oms-shuju1" v-show="merchantStaticItems == 0"></i>
        <div id="u-category-market" @click="routerTo('merchantManage_1',{name:'merchantManage'})"></div>
        <div class="u-inline u-tip1" v-show="merchantStaticItems != 0">
            <h5 class="u-inline">分类总数</h5>
            <h5 class="u-inline">{{categoryNum}}</h5>
        </div>
      </div>
    </div>
</template>

<script>
import ApiSetting from '@/api/basicApi-estateApi'
import echarts from "echarts";
export default {
  data() {
    return {
        categoryNum:0,
        marketsList:[],
        //摊位统计查询柱状表 2
        statisticsBooths:[
    ],
        //合同租赁合同到期表4
        contractMerchants:{
            
    },
    merchantStaticItems:[],
        //摊位合同 饼图 1
        tatisticsFinancial:{
        },
        //维保查询 3
        statisticsProperties:{
    }
    }
  },
  created(){
    let { marketCode, marketName } = this.$store.getters.currentUser;
    if(marketCode && marketName) {
        this.marketsList = [{marketCode,marketName}]
      }
  },
  mounted(){
    this.handleBoothLongquanPie(this.marketsList[0].marketCode)
    this.handleBoothBar()
    this.handlePropertyPic()
    this.handleMarketContractPie()
  },
  methods: {
      // 权限判断
    rightControl (id) {
      return this.$store.getters.getPermission(id)
    },
    routerTo(id,params){
        if(this.rightControl(id)){
           this.$router.push(params)
        }else{
            this.$message.error('您没有权限访问')
        }

    },
  	//1号摊位图 龙泉
  	handleBoothLongquanPie(marketCode){
        this.$http({url:ApiSetting.tatisticsFinancial,
            method:'get',
            showLoading:false,
            params:{marketCode:marketCode}}).then(res => {
            if(res && res.code == 0 && res.data){
            this.tatisticsFinancial = res.data[0]
            let data = res.data[0]
  		var myChart = echarts.init(document.getElementById('u-pie-longquan-market'));
        let showName
         if(data.expenseWaitPayAmount == 0 && data.expensePayAmount == 0){
              showName = false
             }else{
              showName = true
             }
  	myChart.setOption({
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        confine:false,
        position: ['30%', '50%']
    },
    series: [
        {
            name:'',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

             label: {
                normal: {
                    show:showName,
                    formatter: "{b}\n{c}({d}%)",
                }
            },
            labelLine: {
                normal: {
                    show: showName,
                    length:50,
                    length2:10,
                }
            },
            data:[
                {value:data.expenseWaitPayAmount, name:'日常待缴'},
                {value:data.expensePayAmount, name:'日常已缴'}
            ]
        },
        {
            name:'',
            type:'pie',
            radius: ['40%', '55%'],
            label: {
                normal: {
                    show:true,
                    formatter: "{b}\n{c}({d}%)",
                }
            },
            labelLine: {
                normal: {
                    show: true,
                    length:5,
                    length2:3
                }
            },
            data:[
                {value:data.contractPayAmount, name:'合同已缴'},
                {value:data.contractWaitPayAmount, name:'合同待缴'},
            ]
        }
    ],
    color:['#FF7623','#FAA877','#5AB2E0','#AAE0FC']
})
  }
})
  	},
    //2号 摊位信息饼状图
  	handleBoothBar(){
        this.$http.get(ApiSetting.statisticsBooths).then(res => {
            if(res && res.code == 0 && res.data){
                this.statisticsBooths = res.data
                let data = res.data
        var myChart = echarts.init(document.getElementById('m-booth-bar-market'));
        	let marketData = data[0].boothStatusStatics.map(item => {
        		return {'value':item.count,'name':item.boothStatus.desc}
        	})
    myChart.setOption({
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    series : [
        {
            name: '摊位状态',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:marketData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
                normal: {
                    show:true,
                    formatter: "{b}\n{c}({d}%)",
                }
            },
            labelLine: {
                normal: {
                    show: true
                }
            }
        }
    ],
    color:['#AAE0FC','#5AB2E0','#FFC86E','#F5A623','#FDCFB3','#FD9E65 ','#FF7623']
})
}
})
 },
    /*3号饼状图*/
    handlePropertyPic(){
 this.$http.get(ApiSetting.statisticsProperties).then(res => {
            if(res && res.code == 0 && res.data && res.data.length != 0){
                let data = res.data
                this.statisticsProperties = res.data
           var myChart = echarts.init(document.getElementById('m-property-pie-market'));
         var pieData = data.runStatusStatics.map(item => {
                return {'value':item.count,'name':item.runStatus.desc}
            })
        myChart.setOption({
    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)",
        confine:false,
        position: ['70%', '50%']
    },
    // legend: {
    //     left: 'left',
    //     data: ['正常运行','维修中','停止运行','报废']
    // },
    series : [
        {
            name: '运营状况',
            type: 'pie',
            radius : '40%',
            center: ['50%', '60%'],
            label:{show:false},
            data:pieData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
                normal: {
                    show:true,
                    formatter: "{b}\n{c}({d}%)",
                }
            },
            labelLine: {
                normal: {
                    show: true,
                    length:15,
                    length2:5,
                }
            },
        }
    ],
     color: ['#5AB2E0','#AAE0FC','#FF7623','#BCBCBC']
})
            }
        })
    },
    /*4号饼状图 左*/
    handleMarketContractPie(){
        this.$http.get(ApiSetting.contractMerchants).then(res => {
            if(res && res.code == 0 && res.data && res.data.length != 0){
                
                this.contractMerchants = res.data
                let data = res.data
                            var myChart = echarts.init(document.getElementById('u-market-contract-market'));
                myChart.setOption({
      title: {
        text: '合同信息',
        x: 26,
        top: 17,
        textStyle: {
            color: '#666',
            fontSize:'14',
            fontWeight:'400'
        }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    series : [
        {
            name: '合同状态',
            type: 'pie',
            radius : '40%',
            center: ['50%', '60%'],
            data:[
                {value:data.nearPastDueContractNum, name:'即将到期'},
                {value:data.pastDueContractNum, name:'正常'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
                normal: {
                    show:true,
                    formatter: "{b}\n{c}({d}%)",
                }
            },
            labelLine: {
                normal: {
                    show: true,
                    length: 2,
                    length: 1
                }
            },
        }
    ],
    color: ['#428DCF','#B6D6F1']
})
        if(data.merchantStaticItems && data.merchantStaticItems.length != 0){
            this.merchantStaticItems = res.data.merchantStaticItems
        var myChart = echarts.init(document.getElementById('u-category-market'));
         let categoryNum = 0
        data.merchantStaticItems.forEach(item => {
          categoryNum += item.count
        })
        this.categoryNum = categoryNum
                let dataArr = data.merchantStaticItems.map(item => {
                    return {'value':item.count,'name':item.manageType}
                })
    myChart.setOption({
    title: {
        text: '分类信息',
        x: 26,
        top: 17,
        textStyle: {
            color: '#666',
            fontSize:'14',
            fontWeight:'400'
        }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    series : [
        {
            name: '类型',
            type: 'pie',
            radius : '40%',
            center: ['50%', '60%'],
            data:dataArr,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
                normal: {
                    show:true,
                    formatter: "{b}\n{c}({d}%)",
                }
            },
            labelLine: {
                normal: {
                    show: true
                }
            },
        }
    ],
      color: ['#E69D58','#FAB26D','#CF9F1A','#AB4B19','#BB8A5D','#A0A073','#56260F','#543B24','#B4B487','#A48C46','#BB8B00','#570D00','#FFC86E','#FF7623','#82B5CA','#AAE0FC','#7BCADF','#00A2CC','#5AB2E0','#428DCF','#00517B','#A0A120','#9BB63C','#598E00','#505000','#A0A15B','#3B5C04','#8ACD7B','#F0F0F0','#141414','#A77649','#684F50','#FFF0D9','#646464','#BB8A75','#A48C5E','#FD9C0F','#954D1C','#D28974','#411100','#E3B36E','#954D37','#E88841','#AC3300','#F7C76A','#FD9C3B']
})
        }

            }
        })  
    },
  }
};
</script>
<style scoped lang="less">
@import './marketIndex.less';
</style>
