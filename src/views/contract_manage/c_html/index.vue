<template>
  <el-dialog
    class="contract-tpl-box"
    :visible.sync="contractHtml"
    center>
    <div class="content-html">
      <component :is="currentTpl" :tplData="tplData"></component>
    </div>
  </el-dialog>
</template>
<script>
  import one from './_/one'
  import two from './_/two'
  import three from './_/three'
  import four from './_/four'
  import five from './_/five'
  import six from './_/six'
  import seven from './_/seven'
  import eight from './_/eight'

  export default {
    props:['tplData'],
    data() {
      return {
        currentTpl: 'one',
        contractHtml: false
      }
    },
    methods: {
      showDialog(v) {
        switch (v) {
          case 1:
            this.currentTpl = 'one';
            break;
          case 2:
            this.currentTpl = 'two';
            break;
          case 3:
            this.currentTpl = 'three';
            break;
          case 4:
            this.currentTpl = 'four';
            break;
          case 5:
            this.currentTpl = 'five';
            break;
          case 6:
            this.currentTpl = 'six';
            break;
          case 7:
            this.currentTpl = 'seven';
            break;
          case 8:
            this.currentTpl = 'eight';
            break;
        }
        this.contractHtml = true;
      }
    },
    components: {one, two, three, four, five, six, seven, eight},
  };
</script>

<style lang="less">
  @import "index";
</style>
