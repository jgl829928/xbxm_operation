<template>
  <div class="g-booth-map">
    <div class="Filter" v-show="rightControl('boothMap_1')">
      <el-select v-model.trim="areaCode" clearable placeholder="省市" @change="selectArea">
        <el-option
          v-for="(item, index) in ProvincesList"
          :key="index"
          :label="item.areaName"
          :value="item.areaCode">
        </el-option>
      </el-select>
      <el-select v-model.trim="marketCode" clearable placeholder="商场名称">
        <el-option
          v-for="(item, index) in shopList"
          :key="index"
          :label="item.marketName"
          :value="item.marketCode">
        </el-option>
      </el-select>
      <el-button class="btn-search" type="primary" icon="el-icon-search" @click="select">查询</el-button>
    </div>

    <div class="masking" @click="close" :class="displayFla?'':'displayFla'"></div>
    <div class="dialog-map" :class="displayFla?'':'displayFla'">
      <div class="dialog-title">摊位 - 详情</div>
      <div class="dialog-content">
        <el-form >
          <el-row :gutter="32">
            <el-col :span="12" :xs="24">
              <el-form-item label="摊位号">
                <span class="boothNumber gray">{{particularsData.boothNumber}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="摊位编号" class="boothCodeChunk">
                <span class="boothCode gray">{{particularsData.boothCode}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="12" :xs="24">
              <el-form-item label="商场名称" >
                <span class="marketName gray">{{particularsData.marketName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="摊位类型" >
                <span class="boothType gray">{{particularsData.boothType}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="12" :xs="24">
              <el-form-item label="楼层经理" >
                <span class="manager gray">{{particularsData.manager}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="楼层" >
                <span class="floor gray">{{particularsData.floor}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="12" :xs="24">
              <el-form-item label="区域" >
                <span class="area gray">{{particularsData.area}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="状态" >
                <span class="boothStatus gray">{{particularsData.boothStatus}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="12" :xs="24">
              <el-form-item label="计租面积" >
                <span class="calculateArea gray">{{particularsData.calculateArea}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="使用面积" >
                <span class="usableArea gray">{{particularsData.usableArea}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="12" :xs="24">
              <el-form-item label="摊位单价" >
                <span class="boothPrice gray">{{particularsData.boothPrice}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="单位" >
                <span class="units gray">{{particularsData.units}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="12" :xs="24">
              <el-form-item label="合同编号" >
                <span class="contractBatchNum gray">{{particularsData.contractBatchNum}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="商户名称" >
                <span class="merchantName gray">{{particularsData.merchantName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="12" :xs="24">
              <el-form-item label="合同开始日期"  class="rentTime">
                <span class="rentBeginTime gray">{{particularsData.rentBeginTime}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12" :xs="24">
              <el-form-item label="合同结束日期"  class="rentTime">
                <span class="rentEndTime gray">{{particularsData.rentEndTime}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="dialog-footer">
          <!-- <el-button class="btn-primary btn-save" @click="toHtml" type="primary" >编 辑</el-button> -->
          <el-button class="btn-primary btn-save" type="primary" @click="close">取 消</el-button>
        </div>
      </div>
    </div>

    <div id="indoor3d" style="width: 750px; height:600px; top:20px; left: 6%; position: relative;z-index:2"></div>
    <div class="statusColor">
      <ul>
        <li>
          <div class="unrentable"></div>
          <span>未出租</span>
        </li>
        <li>
          <div class="alreadyTaken"></div>
          <span>已出租</span>
        </li>
        <li>
          <div class="payment"></div>
          <span>交款期</span>
        </li>
        <li>
          <div class="predetermine"></div>
          <span>已预定</span>
        </li>
        <li>
          <div class="expire"></div>
          <span>合同即将到期</span>
        </li>
        <li>
          <div class="authstr"></div>
          <span>签约待审核</span>
        </li>
        <li>
          <div class="Arrears"></div>
          <span>欠款待缴费</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import api from '@/api/boothApi';
import url from '@/api/apiSetting'
export default {
  name:'boothMap',
  computed: {
    currentUser() {
      return this.$store.state.currentUser
    }
  },
  data() {
    return {
      displayFla:false,
      ProvincesList: [],
      areaCode: "510",
      shopList: [],//商场列表
      marketCode: "51000007",
      address:{areaCode:510,marketCode:51000007},
      particularsData:{
        area:'',
        boothCode:'',
        boothNumber:'',
        boothPrice:'',
        boothStatus:'',
        boothType:'',
        calculateArea:'',
        contractBatchNum:'',
        floor:'',
        manager:'',
        marketCode:'',
        merchantName:'',
        rentBeginTime:'',
        rentEndTime:'',
        units:'',
        usableArea:''
      }
    };
  },
  mounted() {
    let _this=this
    this.address.marketCode=this.currentUser.marketCode || '51000007'
    this.marketCode=this.currentUser.marketCode || '51000007'
    vueThis=this
    httpApi=api.boothMapParticulars
    this.boothMap(this.address);
    this.$http.get(api.areasMarket).then(res=>{
      if(res.code===0){
        this.ProvincesList=res.data;
      }
    })

    this.$http.get(api.marketsName, {params: {areaCode:this.areaCode}}).then(res=>{
      if(res.code===0){
        _this.shopList=res.data;
      }
    })


  },
  methods: {
    // 权限判断
    rightControl (id) {
     return this.$store.getters.getPermission(id)
    },
    selectArea(val){  //选择省市切换
      var _this=this
      this.$http.get(api.marketsName, {params: {areaCode:val}}).then(res=>{
        if(res.code===0){
          _this.shopList=res.data;
          _this.marketCode='';
        }
      })
    },
    select(){
      var data={areaCode:this.areaCode,marketCode:this.marketCode}
      $('.floorsUI').remove()
      this.boothMap(data)
    },
   	map(data){
   		var params = {
        mapDiv:"indoor3d",
        dim:"2d"
      }
    var map = IndoorMap(params);
    map.load(data, function(){
        map.showAreaNames(true).setSelectable(true);
        var ul = IndoorMap.getUI(map);
        document.querySelector(".g-booth-map").appendChild(ul);
      });
    },
    boothMap(data) {
      var mapData={}
      // base: 'http://172.16.101.22:9150',
      // http://172.16.9.121:9150
      this.$http.get(api.boothMap,{params:data}).then(res => {
        if(res.code==0){
          var floorList=res.data.boothArray.boothMapList;
          var boothList=res.data.boothNumberList;
          var floorS=[]
          for(let i=0;i<floorList.length;i++){
            var _id,Name,floorOutline,floorOutlineList=[]
            var cToObj
            floorOutline=eval("("+floorList[i].boothMap.coordinate+")");
            //空白
            // floorOutline=floorList[i].boothMap.coordinate.replace(/[\r\n]/g,"").split(',')
            // floorOutlineList=floorOutline.map(function(data){
            //     return +data;
            // });


            var blankAreaCoordinate=floorList[i].boothMap.blankAreaCoordinate
            cToObj=eval("("+blankAreaCoordinate+")"); //空白区域
            // console.log(cToObj)

            var floorData={
              "PubPoint":[],
              "Outline":floorOutline, //楼层坐标
              "FuncAreas":cToObj,//摊位坐标
              "_id": i,
              "floor":floorList[i].boothMap.floor,
              "Name":floorList[i].boothMap.floor+'层'
            }
            floorS.push(floorData)
          }
          for(let j=0;j<floorS.length;j++){
            var boothData=boothList[floorS[j].floor] || [];

            for(let i=0;i<boothData.length;i++){
              var boothOutline,boothCoordinateList=[]
              boothData[i].boothCoordinate=boothData[i].boothCoordinate || '[[[0,0]]]'
              boothCoordinateList=eval('('+boothData[i].boothCoordinate+')')

              // console.log(boothCoordinateList)

              var data={
                "Center":[0,0],
                "Outline": boothCoordinateList,
                "Category": boothData[i].boothStatus.code,
                "Name": boothData[i].boothNumber,
                "BrandShop": boothData[i].boothCode
              }
              // console.log(data)
              floorS[j]["FuncAreas"].push(data)
            }
          }
          mapData['data']={
            "Floors":floorS,
            "building":{
              "DefaultFloor":0,
              "Name":res.data.boothArray.marketName
            }
          }
          this.map(mapData);
          // console.log(mapData)
        }

      })

    },
    close(){
      this.displayFla=false
      $('.dialog-map').addClass('displayFla');
      $('.masking').addClass('displayFla');
    }
  }
};
</script>
<style lang="less" scoped>
.g-booth-map {
  height: 700px;
  position: relative;
  // overflow-y: auto;
  .masking{
    position: fixed;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.3);
    top:0;
    left:0;
    z-index:3;
  }
  .displayFla{
    display:none
  }
  .dialog-map{
    position: fixed;
    top:10%;
    left:50%;
    z-index: 4;
    margin: 0 auto 50px;
    background: #fff;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 60%;
    margin-left:-30%;
    .el-form-item{
      margin-bottom: 0;
    }
    .dialog-title{
      padding: 20px 20px 10px;
      font-size: 14px;
      color: #444;
      // text-align:center;
      border-bottom:1px solid #ccc;
    }
    .dialog-content{
      padding: 10px 38px 0 20px;
      font-size: 12px;
      color: #444;
      .gray{
        color:#9B9B9B
      }
    }
    .dialog-footer{
      margin-top:30px;
      text-align:center;
      padding-bottom:20px;
    }
    .boothCodeChunk .boothCode,.boothNumber{
      display:block;
      width:65%;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    // .rentTime{
    //   display:block;
    //   width:50%;
    //   overflow: hidden;
    //   text-overflow:ellipsis;
    //   white-space: nowrap;
    // }

  }

  .Filter {
    margin-left: 120px;
  }
  .Filter .el-select,.Filter .el-button{
    margin-left: 20px;
  }
  .statusColor {
    position: absolute;
    top: 20px;
    right: 0;
    width: 140px;
    overflow: hidden;
    li {
      width: 45%;
      float: left;
      text-align: center;
      margin-bottom: 10px;
      margin-left: 2%;
      color: #999;
      font-size: 12px;
      div {
        width: 80%;
        height: 30px;
        margin: auto;
        margin-bottom: 10px;
      }
    }
  }
  .unrentable {
    background: #99cfa1;
  }
  .alreadyTaken {
    background: #95d5f2;
  }
  .payment {
    background: #9999cc;
  }
  .predetermine {
    background: #afcbda;
  }
  .expire {
    background: #feedb8;
  }
  .authstr {
    background: #fec180;
  }
  .Arrears {
    background: #f5b0b1;
  }
}
</style>
