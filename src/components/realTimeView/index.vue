<template>
  <div class="RealTimeView">
    <el-dialog
      v-model="datas!.show"
      width="414px"
      @closed="handleCloseEvent"
      top="8vh"
    >
      <img src="@/assets/images/phoneTop.png" style="width: 375px" />
      <div v-if="datas!.show" class="screen">
        <template v-if="pageCon">
          <div v-for="(item, index) in pageCon" :key="index">
            <component
              :is="item.component"
              :datas="item.setStyle"
              class="componentsClass"
              :data-type="item.type"
            >
            </component>
          </div>
        </template>
        <template v-else>
          <div>没有内容</div>
        </template>
      </div>
      <!-- <van-loading v-if="loading" size="24px" vertical>加载中</van-loading> -->
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import type { PropType } from "vue";

type RealTimeViewProp = Record<string, any>;
type showProps = {
  show: boolean;
};
type RealTimeArrayProp = string;

const props = defineProps({
  val: Object as PropType<Partial<RealTimeViewProp>>,
  datas: Object as PropType<showProps>,
  pageComponents: Object as PropType<RealTimeArrayProp>,
});

/* 因为数据结构导致数据变化页面没有变化
let state = reactive({
  data:[]
})
state.data= res.data
/////////////////////////////////////////////////
let data = ref([])
//赋值
data.value = res.data
*/
const pageCon: any = ref([]);
watch(
  () => props.pageComponents,
  (pre) => {
    pageCon.value = reactive(Array.from(JSON.parse(pre!)));
  },
  { immediate: true }
);

const emits = defineEmits(["toggleShow"]);
// 关闭的时候让预览按钮恢复为false,实现显示触发预览效果
const handleCloseEvent = () => {
  emits("toggleShow", false);
};
</script>

<style lang="less" scoped>
.RealTimeView {
  .screen {
    width: 375px /*no*/;
    height: 667px /*no*/;
    border: 0;

    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}
</style>
