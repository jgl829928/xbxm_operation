<template>
    <div class="g-index">
    	<div class="m-market-pie">
        <i class="el-icon-oms-shuju2" v-show="tatisticsFinancial.length ==0"></i>
    <span class="u-select" v-show="tatisticsFinancial.length !=0">选择商场</span>
   <el-select class="el-input-h" v-model="reqData.marketCode"  v-show="tatisticsFinancial.length !=0" placeholder="全部" @change="handleBoothPie1(reqData.marketCode)" clearable>
    <el-option
      v-for="(item, index) in marketsList"
      :key="index"
      :label="item.marketName"
      :value="item.marketCode">
    </el-option>
  </el-select>
      <div class="u-market-pie"></div>
         </div>
      
      <div class="m-booth-bar">
         <i class="el-icon-oms-data-detail" v-show="statisticsBooths.length == 0"></i>
      	<div id="m-booth-bar">
      	</div>
       
      </div>
  	 <div class="u-legend" v-show="statisticsBooths.length != 0">
          <span class="u-1">未出租</span>
          <span class="u-2">已出租</span>
          <span class="u-3">已预定</span>
          <span class="u-4">交款期</span>
          <span class="u-5">合同即将到期</span>
          <span class="u-6">签约待审核</span>
          <span class="u-7">欠款待缴费</span>
        </div>
  	
      <div class="m-property-pie">
        <span class="u-main-title" v-show="JSON.stringify(statisticsProperties) != '{}'">物业信息</span>
        <i class="el-icon-oms-shuju" v-show="JSON.stringify(statisticsProperties) == '{}'"></i>
      		<div id="m-property-pie" @click="routerTo('device_search',{name:'device'})"></div>
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
      			<router-link :to="{name:'seviceRecord'}" class="fr" v-show="rightControl('maintenance_search')">
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
      	<div id="u-market-contract" @click="routerTo('contractSearch_1',{name:'contractSearch'})"></div>
      	<div class="u-inline u-tip1" v-show="JSON.stringify(contractMerchants) != '{}'">
      		<h5 class="u-inline">合同总数</h5>
      		<h5 class="u-inline">{{contractMerchants.totalContractNum || 0}}</h5>
      	</div>
      </div>
      <div class="u-category">
        <i class="el-icon-oms-shuju1" v-show="merchantStaticItems == 0"></i>
        <div id="u-category" @click="routerTo('merchantManage_1',{name:'merchantManage'})"></div>
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
import Api from '@/api/contact'
export default {
  data() {
    return {
      categoryNum:0,
      reqData:{
        marketCode:'',
      },
      marketsList:[],
        //摊位统计查询柱状表 2
        statisticsBooths:[
    ],
        //合同租赁合同到期表4
        contractMerchants:{
          
    },
    merchantStaticItems:[],
        //摊位合同 饼图 1
        tatisticsFinancial:[],
        //维保查询 3
        statisticsProperties:{
    },
    }
  },
  mounted(){ 
 
        this.getMarketsList();
      
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
    getMarketsList() {
       this.$http.get(Api.marketsList).then(res => {
        if(res && res.data.length != 0) {
          this.marketsList = res.data;
        this.handleBoothPie1()
      }
       })
      },
  	//1号摊位图 龙泉
  	handleBoothPie1(marketCode){  
        this.$http({
          url:ApiSetting.tatisticsFinancial,
          method:'get',
          params:{marketCode:marketCode},
          showLoading:false
        }).then(res => {
            if(res && res.code == 0 && res.data && res.data.length != 0){
              let _this = this
              this.tatisticsFinancial = res.data
        let data = res.data[0]
        $('.u-market-pie').html(`
            <div class="u-1">
                <div id="u-pie-0"></div>
            </div>`)
             let dataName=document.getElementById('u-pie-'+0);
             let dataItem,dataPosition
             let echart = echarts.init(dataName);
             let showName
             if(data.expenseWaitPayAmount == 0 && data.expensePayAmount == 0){
              showName = false
             }else{
              showName = true
             }
         echart.on('click', function (params) {
            if(params.name == "合同已缴" || params.name == "合同待缴"){
              if(data.marketCode == -1){
              _this.routerTo('contractReceipts_1',{name:'contractReceipts'})
              }else{
                 _this.routerTo('contractReceipts_1',{name:'contractReceiptsMarket',params:{marketCode:params.seriesName}})
              }
                
            }else{
              if(data.marketCode == -1){
                 _this.routerTo('dailyCosthandling_1',{name:'dailyCosthandling'})
               }else{
                 _this.routerTo('dailyCosthandling_1',{name:'dailyCostHandlingMarket',params:{marketCode:params.seriesName}})
               }
            }
            });       
     echart.setOption({
    tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)",
        confine:false,
       position: function (pos, params, dom, rect, size) {
      // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
      var obj = {top: 60};
      obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
      return obj;
         },
    },

    series: [
        {
            name:data.marketCode,
            type:'pie',
            selectedMode: 'single',
            radius: [0, '40%'],

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
                {value:data.expensePayAmount, name:'日常已缴'},
                {value:data.expenseWaitPayAmount, name:'日常待缴'}
            ]
        },
        {
            name:data.marketCode,
            type:'pie',
            radius: ['50%', '65%'],
            label: {
                normal: {
                    show:true,
                    formatter: "{b}\n{c}({d}%)",
                }
            },
            labelLine: {
                normal: {
                    show: true,
                    length: 5,
                    length2: 3
                }
            },
            data:[
                
                {value:data.contractPayAmount || 0, name:'合同已缴'},
                {value:data.contractWaitPayAmount || 0, name:'合同待缴'},
            ]
        }
    ],
    color:['#FF7623','#FAA877','#5AB2E0','#AAE0FC']
},true)
   
            }
        })
  	
  	},

  //2号 摊位信息柱状图
  	handleBoothBar(){
         this.$http(ApiSetting.statisticsBooths).then(res => {
           if(res && res.code == 0 && res.data && res.data.length != 0){
                let data = res.data
                let _this=this
                this.statisticsBooths = res.data
      var myChart = echarts.init(document.getElementById('m-booth-bar'));
                       let dataName,dataCategory,dataNotRent,dataAudit,dataRent,dataPayTime,dataDebtPay,dataContractOver,dataReserve = []
 
            //商场名称
             dataName = data.map(item => {
                return item.marketName
            })
             //未出租
             dataNotRent = data.map(item => {
                return item.boothStatusStatics[0].count
             })
             //签约待审核
            dataAudit = data.map(item => {
                return item.boothStatusStatics[2].count
             })
            //已出租
            dataRent = data.map(item => {
                return item.boothStatusStatics[3].count
             })
            //交款期
            dataPayTime = data.map(item => {
                return item.boothStatusStatics[4].count
             })
            //欠款待缴费
            dataDebtPay = data.map(item => {
                return item.boothStatusStatics[5].count
             })
            //合同到期
            dataContractOver =data.map(item => {
                return item.boothStatusStatics[6].count
             })
            //已预定
            dataReserve = data.map(item => {
                return item.boothStatusStatics[1].count
             })
            let maxNum = []
              function dataNum(i){
                let maxSum =new Number()
                 data[i].boothStatusStatics.map((item1,index) => {
                 return maxSum += item1.count
             })
                 return maxSum
            }
              data.forEach((item,i)=> {
                    maxNum.push(dataNum(i))
                  })
             var compare = function (x, y) {//比较函数
    if (x > y) {
        return -1;
    } else if (x < y) {
        return 1;
    } else {
        return 0;
    }
}
            let maxResult = maxNum.sort(compare)
    myChart.on('click', function (params) {
         _this.routerTo('boothMain_1',{name:'boothMain',params:{marketName:params.name}})
    });   
 myChart.setOption({
    tooltip : {
        trigger: 'axis',
        formatter:'{b0}: {c0}<br />{b1}: {c1}',
        confine:false,
        position: function(point, params, dom, rect, size){
        //其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
        var x = point[0];//
        var y = point[1];
        var viewWidth = size.viewSize[0];
        var viewHeight = size.viewSize[1];
        var boxWidth = size.contentSize[0];
        var boxHeight = size.contentSize[1];
        var posX = 0;//x坐标位置
        var posY = 0;//y坐标位置
        
        if(x<boxWidth){//左边放不开
            posX = x+30; 
        }else{//左边放的下
            posX = x+30; 
        }
        
        if(y<boxHeight){//上边放不开
            posY = 5; 
        }else{//上边放得下
            posY = y-boxHeight;
        }
        
        return [posX,posY];
 },
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter:function(params)//数据格式
            {
            var relVal = params[0].name+"<br/>";
            var arr =[]
            var sum = 0
            var result
           params.forEach((item,index) => {
                sum +=item.value
            })
             params.forEach(item => {
             if(item.value != 0){
               let num =(item.value*100)/sum
               let numRound = num.toFixed(2)
              result =item.seriesName+':'+item.value+'个'+'('+numRound+'%)'
                arr.push(result)  
            }else{
                result = `${item.seriesName}:0%`
                 arr.push(result)
            }    
            })  
            var a = relVal+arr.join().replace(/,/g,'<br/>')+'</br>总数:'+sum+'个'
            return a;
        }
     
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis:  {
        type: 'value',
        max:maxResult[0]+50
    },
    xAxis: {
        type: 'category',
        axisLabel: {
                    interval: 0,
                    rotate:40
                   },
        data: dataName
    },
    series: [

        {   
            name: '未出租',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: dataNotRent,
            barWidth:30
        },
             {
            name: '已预订',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: dataReserve
        },
        {
            name: '签约待审核',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: dataAudit
        },
        {
            name: '已出租',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: dataRent
        },
        {
            name: '交款期',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: dataPayTime
        },
        {
            name: '欠款待缴费',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: dataDebtPay
        },
        {
            name: '合同即将到期',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: dataContractOver
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
           var myChart = echarts.init(document.getElementById('m-property-pie'));
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
                            var myChart = echarts.init(document.getElementById('u-market-contract'));
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
        var myChart = echarts.init(document.getElementById('u-category'));
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
<style lang="less">
@import './index.less';
</style>
