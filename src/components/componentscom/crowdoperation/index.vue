<template>
  <div class="crowdoperation">
    {{ datas?.text }}

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
.crowdoperation {
  position: relative;
}
</style>
