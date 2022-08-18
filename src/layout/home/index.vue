<template>
  <div class="home">
    <!-- 按钮集合 -->
    <section class="buttons">
      <p
        style="
          font-size: 12px;
          color: #4f4f4f;
          margin-left: 15px;
          cursor: pointer;
        "
      >
        <!-- 返回 -->
      </p>
      <div>
        <!-- <el-button type="danger">重置</el-button> -->
        <!-- <el-button>预览</el-button> -->
        <el-button>查看JSON </el-button>
        <el-button>导入JSON </el-button>
        <el-button>导出JSON </el-button>
      </div>
    </section>

    <!-- 装修操作 -->
    <section class="operation">
      <!-- 页面设置tab -->
      <div class="decorateTab">
        tab
      </div>

      <!-- 右侧工具栏 -->
      <div class="decorateAll">
        right
      </div>
    </section>
  </div>
</template>