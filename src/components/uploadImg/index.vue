<template>
  <div class="uploadImg">
    <!-- 上传图片 -->
    <el-dialog
      title="上传图片"
      :lock-scroll="true"
      v-model="datas.dialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
      center
      width="500px"
    >
      <!-- 上传图片 -->
      <el-upload
        v-if="datas.dialogVisible"
        name="file"
        :action="baseupload"
        list-type="picture-card"
        :limit="1"
        :on-preview="preview"
        :on-success="onSuccess"
        :with-credentials="true"
        :on-error="uploadError"
        :before-upload="uploads"
        :before-remove="handleRemove"
        :class="datas.uploadShow ? 'disable' : ''"
      >
        <i class="el-icon-plus">+</i>
      </el-upload>

      <!-- 按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消 上 传</el-button>
          <el-button
            type="primary"
            @click="uploadInformation"
            :disabled="disabl"
            >点 击 上 传</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 图片放大 -->
    <el-dialog v-model="datas.dialogVisibles">
      <img
        draggable="false"
        style="width: 640px; height: 400px; margin: 20px 0px"
        :src="datas.dialogImageUrl"
        alt=""
      />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
const emits = defineEmits(["uploadInformation", "handleClose"]);

/* 报漏接口显示上传文件组件 */
defineExpose({
  showUpload() {
    datas.dialogVisible = true;
  },
});
// 数据集合
const datas = reactive({
  dialogVisible: false, //弹框默认隐藏
  dialogVisibles: false, // 放大的图片
  dialogImageUrl: "", // 上传的图片
  uploadShow: false, //是否显示上传图片
});
/* 传递图片地址 */
const uploadInformation = () => {
  emits("uploadInformation", datas.dialogImageUrl);
  // 隐藏上传弹框
  datas.dialogVisible = false;
  datas.uploadShow = false;
  datas.dialogImageUrl = "";
};
// 关闭弹框
const handleClose = () => {
  ElMessageBox.confirm("点击取消后您填写的信息将丢失，您确定取消？")
    .then(() => {
      handleRemove();
      emits("handleClose");
      // 隐藏上传文件
      datas.dialogVisible = false;
      datas.dialogImageUrl = "";
    })
    .catch((e) => {
      console.log(e);
    });
};

// 删除图片
const handleRemove = () => {
  datas.uploadShow = false;
  datas.dialogImageUrl = "";
  return true;
};

// 预览
const preview = () => {
  datas.dialogVisibles = true;
};

// 上传成功
const onSuccess = (response: any) => {
  // 返回错误
  if (response.success != true)
    return ElMessage.error("上传图片失败，请删除后重新上传");

  datas.dialogImageUrl = response.data.src;
};

// 上传前
const uploads = (file: File) => {
  if (!file.type.includes("image")) {
    ElMessage.error("请上传图片！");
    return false;
  }
  datas.uploadShow = true;
};

// 上传失败
const uploadError = () => {
  ElMessage.error("请重新上传");
  datas.uploadShow = false;
};
// 通过computed获得baseupload
const baseupload = computed(() => {
  return `${import.meta.env.VITE_APP_BASE_URL}upload/miniShop`;
});

// 通过computed获得disabl
const disabl = computed(() => {
  if (!datas.dialogImageUrl) return true;
  return false;
});
</script>

<style lang="less" scoped>
@import "../../assets/css/minx.less";
.uploadImg {
  // 上传弹框内容部分
  :deep(.el-dialog__body) {
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: center;
  }

  .disable {
    :deep(.el-upload) {
      display: none !important;
    }
  }
  .el-icon-plus {
    display: block;
    margin-top: 50px;
  }
}
</style>
