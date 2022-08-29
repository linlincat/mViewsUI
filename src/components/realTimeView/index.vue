<template>
  <div class="RealTimeView">
    <el-dialog
      v-model="datas!.show"
      width="414px"
      @closed="handleCloseEvent"
      top="8vh"
    >
      <div>{{ datas!.show }} datas.show</div>
      <img src="@/assets/images/phoneTop.png" style="width: 375px" />
      <iframe
        v-if="datas!.show"
        ref="refFrame"
        class="screen"
        scrolling="false"
        :src="'http://was666.gitee.io/as-editor-h5/#/?type=iframe'"
        @load="load"
      ></iframe>
      <van-loading v-if="loading" size="24px" vertical>加载中</van-loading>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { PropType } from "vue";

type RealTimeViewProp = Record<string, any>;

const props = defineProps({
  val: Object as PropType<Partial<RealTimeViewProp>>,
  datas: Object as PropType<Partial<RealTimeViewProp>>,
});

const emits = defineEmits(["toggleShow"]);

const handleCloseEvent = () => {
  emits("toggleShow", false);
};
// 是否在加载中
const loading = ref(true);
const refFrame = ref();
console.log(props.datas, "props datas show");
// debugger;
// 加载完成事件
const load = () => {
  loading.value = false;
  console.log(props.val, "kdkdkdkdk");
  // debugger;
  //   const { proxy } = getCurrentInstance();
  // const _input = proxy.$refs['appidInput'];
  // console.log(_input)
  // const iframeEl = document.querySelector("frame") as any;

  // refFrame.value.postMessage(props.val, "http://was666.gitee.io");
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
