<template>
  <div class="pagination">
    <!-- <h1>{{startNumAndNum}}--当前页码{{pageNo}}</h1> -->
    <button :disabled="pageNo==1" @click="$emit('getpageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndNum.start > 1" @click="$emit('getpageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="startNumAndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button v-for="(page,index) in startNumAndNum.end" :key="index" v-if="page>=startNumAndNum.start" @click="$emit('getpageNo',page)" :class="{active:pageNo==page}">{{page}}</button>
    
    <!-- 下 -->
    <button v-if="startNumAndNum.end < totalPage-1">···</button>
    <button v-if="startNumAndNum.end < totalPage" @click="$emit('getpageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
    <!-- <div>{{startNumAndNum}}</div> -->
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props:['pageNo','pageSize','total','continues'],
  computed:{
    // 总共多少页
    totalPage(){
      return Math.ceil(this.total / this.pageSize); 
    },
    // 计算出连续的页码的起始数字与结束数字[连续页码的数字：至少是5]
    startNumAndNum(){
      const {continues,pageNo,totalPage} =this;
      // 先定义两个变量存储起始数字与结束数字
      let start = 0 , end = 0;
      // 连续页码数字5【就是至少5页】，如果出现不正常的现象【就是不够5页(总页数没有连续页码多)】
      if(continues>totalPage){
        start = 1;
        end = totalPage
      }else{
        // 正常现象【连续页码是5，但是你的总页数一定是大于5的】
        start = pageNo - parseInt(continues/2);
        // 结束数字
        end = pageNo + parseInt(continues/2);
        // 把出现不正常的现象【start数字出现0|负数】纠正
        if(start < 1){
           start = 1;
           end = continues;
        }
        // 把出现不正常的现象[end数字大于总页码]纠正
        if(end > totalPage){
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return {start,end}
    } 
  }
};
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: skyblue;
}
</style>