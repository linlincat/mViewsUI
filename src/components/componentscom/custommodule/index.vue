<template>
  <div class="custommodule">
    {{ datas?.demo }}
    <img :src="datas?.img" alt="" />
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
.custommodule {
  position: relative;
  img {
    width: 100%;
  }
}
</style>
