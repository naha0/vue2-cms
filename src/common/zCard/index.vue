<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
      </div>
      <div>
        <slot name="content"></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "zCard",
  props:['title']
};
</script>

<style scoped lang="less">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

</style>
