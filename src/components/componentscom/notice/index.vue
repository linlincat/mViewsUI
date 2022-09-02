<template>
  <div class="notice">
    <!-- 公告 -->
    <van-notice-bar
      :text="datas?.noticeText"
      left-icon="volume-o"
      :background="datas?.backColor"
      :color="datas?.textColor"
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
.notice {
  position: relative;
}
</style>
