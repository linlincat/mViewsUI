<template>
  <div class="entertheshop">
    <!-- 内容 -->
    <van-cell
      class="pointer-events"
      :icon="datas?.icon"
      :title="datas?.shopName"
      is-link
      :value="datas?.copywriting"
      :to="datas?.type == 10 ? datas.http.externalLink : ''"
      :url="datas?.type == 11 ? datas.http.externalLink : ''"
    />

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
type ObjectProps = Record<string, any>;
defineProps({
  datas: Object as PropType<Partial<ObjectProps>>,
});
</script>

<style scoped lang="less">
.entertheshop {
  position: relative;
  :deep(.van-cell__left-icon) {
    display: flex;
    align-items: center;
  }
}
</style>
