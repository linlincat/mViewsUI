<template>
  <div class="custommodulestyle">
    <!-- 标题 -->
    <h2>{{ datas?.text }}</h2>
    <h2>{{ datas }}</h2>
    <el-input v-model="datas!.demo" placeholder="请输入公告" />
    <el-input v-model="datas!.img" placeholder="图片地址" />
    {{ datas?.type }}
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
type ObjectProp = Record<string, any>;
defineProps({
  datas: Object as PropType<Partial<ObjectProp>>,
  dataType: String,
});
</script>

<style scoped lang="less">
.custommodulestyle {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 10px 20px;
  box-sizing: border-box;
  /* 标题 */
  h2 {
    padding: 24px 16px 24px 0;
    margin-bottom: 15px;
    border-bottom: 1px solid #f2f4f6;
    font-size: 18px;
    font-weight: 600;
    color: #323233;
  }
}
</style>
