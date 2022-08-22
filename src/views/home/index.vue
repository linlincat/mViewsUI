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
        <el-button type="danger">重置</el-button>
        <el-button>预览</el-button>
        <el-button>查看JSON </el-button>
        <el-button>导入JSON </el-button>
        <el-button>导出JSON </el-button>
        <!-- <input
          type="file"
          ref="file"
          id="file"
          accept=".json"
          style="display: none"
        /> -->
      </div>
    </section>
    <!-- 装修操作 -->
    <section class="operation">
      <!-- 组件 -->
      <sliderassembly :pointer="choose.pointer" />

      <!-- 手机 -->
      <div class="phone">
        <section class="phoneAll" ref="imageTofile" id="imageTofile">
          <img src="@/assets/images/phoneTop.png" alt="" class="statusBar" />

          <!-- 头部导航 -->
          <headerTop :pageSetup="datas.pageSetup" @click="headTop" />

          <!-- 主体内容 -->
          <!-- <section
            class="phone-container"
            :style="{
              'background-color': pageSetup.bgColor,
              backgroundImage: 'url(' + pageSetup.bgImg + ')',
            }"
            @drop="drop($event)"
            @dragover="allowDrop($event)"
            @dragleave="dragleaves($event)"
          > -->
          <!-- 动态组件 -->
          <!-- <vuedraggable
              :class="pointer.show ? 'pointer-events' : ''"
              :list="pageComponents"
              item-key="index"
              :forceFallback="true"
              :animation="200"
            >
              <template #item="{ element, index }">
                <component
                  :is="element.component"
                  :datas="element.setStyle"
                  :style="{
                    border:
                      element.active && deleShow ? '2px solid #155bd4' : '',
                  }"
                  @click="activeComponent(element, index)"
                  class="componentsClass"
                  :data-type="element.type"
                >
                  <template #deles>
                    <div
                      v-show="deleShow"
                      class="deles"
                      @click.stop="deleteObj(index)"
                    > -->
          <!-- 删除组件 -->
          <!-- <span class="iconfont icon-sanjiaoxingzuo"></span>
                      {{ element.text }}
                      <van-icon name="delete" />
                    </div>
                  </template>
                </component>
              </template>
            </vuedraggable> -->
          <!-- </section> -->

          <!-- 手机高度 -->
          <div class="phoneSize">iPhone 8手机高度</div>

          <!-- 底部 -->
          <!-- <phoneBottom /> -->
        </section>
        <!-- 底部 -->
      </div>

      <!-- 页面设置tab -->
      <div class="decorateTab">
        <span
          :class="choose.rightcom === 'decorate' ? 'active' : ''"
          @click="choose.rightcom = 'decorate'"
        >
          <i class="iconfont icon-wangye" />
          页面设置
        </span>
        <span
          :class="choose.rightcom === 'componenmanagement' ? 'active' : ''"
          @click="choose.rightcom = 'componenmanagement'"
        >
          <i class="iconfont icon-zujian" />
          组件管理
        </span>
        <span
          class="active"
          v-show="
            choose.rightcom != 'componenmanagement' &&
            choose.rightcom != 'decorate'
          "
        >
          <i class="iconfont icon-zujian" />
          组件设置
        </span>
      </div>

      <!-- 右侧工具栏 -->
      <div class="decorateAll">
        <!-- 页面设置 -->
        <transition name="decorateAnima">
          <!-- 动态组件 -->
          <component
            :is="choose.rightcom"
            :datas="choose.currentproperties"
            @componenmanagement="componenmanagement"
          />
        </transition>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import utils from "@/utils/index"; // 方法类
import componentProperties from "@/utils/componentProperties"; // 组件数据
// import FileSaver from "file-saver"; // 导出JSON
import { reactive, watch, toRefs, inject } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import vuedraggable from "vuedraggable";

// 是否显示预览
const realTimeView = reactive({ show: false });

// 页面数据
const datas = reactive({
  id: null, //当前页面id
  pageSetup: {
    // 页面设置属性
    name: "页面标题", //页面名称
    details: "", //页面描述
    isPerson: false, // 是否显示个人中心
    isBack: true, // 是否返回按钮
    titleHeight: 35, // 高度
    bgColor: "rgba(249, 249, 249, 10)", //背景颜色
    bgImg: "", // 背景图片
  },
  pageComponents: [], //页面组件
});

/**
 * 切换组件位置  用于组件管理中删除功能
 *
 * @param {Object} res 组件切换后返回的位置
 */
const componenmanagement = (res: any) => {
  datas.pageComponents = res;
};

// 选择组件数据
const choose = reactive({
  deleShow: true, //删除标签显示
  index: "", //当前选中的index
  rightcom: "decorate", //右侧组件切换
  currentproperties: {}, //当前属性
  offsetY: 0, //记录上一次距离父元素高度
  onlyOne: ["1-5", "1-16"], // 只能存在一个的组件(组件的type)
  pointer: { show: false }, //穿透
});

// 切换标题
const headTop = () => {
  choose.rightcom = "decorate";
  /* 替换 */
  datas.pageComponents.forEach((res: any) => {
    /* 修改选中 */
    if (res.active === true) res.active = false;
  });
};
</script>
<style lang="less" scoped>
.pointer-events {
  pointer-events: none;
}

.home {
  width: 100%;
  height: 100%;

  /* 删除组件 */
  .deles {
    position: absolute;
    min-width: 80px;
    text-align: center;
    line-height: 25px;
    background: #fff;
    height: 25px;
    font-size: 12px;
    left: 103%;
    top: 50%;
    transform: translateY(-50%);
    .icon-sanjiaoxingzuo {
      position: absolute;
      left: -11px;
      color: #fff;
      font-size: 12px;
      top: 50%;
      transform: translateY(-50%);
    }
    &:hover {
      i {
        display: block;
        position: absolute;
        left: 0;
        font-size: 16px;
        top: 0;
        text-align: center;
        line-height: 25px;
        width: 100%;
        color: #fff;
        height: 100%;
        z-index: 10;
        background: rgba(0, 0, 0, 0.5);
      }
      .icon-sanjiaoxingzuo {
        color: rgba(0, 0, 0, 0.5);
      }
    }

    i {
      display: none;
    }
  }

  /* 按钮集合 */
  .buttons {
    height: 8%;
    border-bottom: 1px solid #ebedf0;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 15px;
    align-items: center;
    /* 下拉 */
    .frop {
      padding-right: 15px;
      .el-button.el-button--primary.el-dropdown-selfdefine {
        background: #fff;
        color: #000;
        border: 1px solid #dcdee0;
      }
    }
    .el-button {
      font-size: 14px;
      padding: 0 16px;
      height: 30px;
      &.el-button--primary {
        background: #155bd4;
      }
      &.el-button--danger {
        background: red;
      }
    }
  }

  /* 操作主体 */
  .operation {
    width: 100%;
    height: 92%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #f7f8fa;
  }

  /* 手机 */
  .phone {
    width: 55%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    background: #f7f8fa;
    &::-webkit-scrollbar {
      width: 1px;
    }
    // &::-webkit-scrollbar-thumb {
    //   background-color: #155bd4;
    // }

    /* 手机样式 */
    .phoneAll {
      width: 375px;
      min-height: 760px;
      box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
      margin: 45px 0;
      position: relative;

      /* 手机高度 */
      .phoneSize {
        position: absolute;
        left: -137px;
        top: 640px;
        font-size: 12px;
        color: #a2a2a2;
        border-bottom: 1px solid #dedede;
        width: 130px;
        height: 21px;
        line-height: 21px;
      }

      /* 状态栏 */
      .statusBar {
        width: 100%;
        display: block;
      }

      /* 主体内容 */
      .phone-container {
        min-height: 603px;
        box-sizing: border-box;
        cursor: pointer;
        width: 100%;
        position: relative;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .componentsClass {
          border: 1px solid #fff;
          &:hover {
            border: 1px dashed #155bd4;
          }
        }
      }
    }
  }

  /* 右侧工具栏 */
  .decorateAll {
    width: 376px;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    padding: 0 12px;
    background: #fff;
    &::-webkit-scrollbar {
      width: 1px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #155bd4;
    }
  }

  /* 页面设置tab */
  .decorateTab {
    position: fixed;
    display: flex;
    right: 380px;
    top: 115px;
    flex-direction: column;
    span {
      background-color: #fff;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      width: 94px;
      height: 32px;
      display: inline-block;
      text-align: center;
      line-height: 32px;
      margin-bottom: 12px;
      transition: all 0.8s;
      cursor: pointer;
      &.active {
        background-color: #155bd4;
        color: #fff;
      }
      /* 图标 */
      i {
        font-size: 12px;
        margin-right: 5px;
      }
    }
  }
}

/* 动画 */
.decorateAnima-enter-active {
  transition: all 1.5s ease;
}
.decorateAnima-leave-active {
  transition: all 1.5s ease;
}
.decorateAnima-enter {
  transform: translate(8px, 8px);
  opacity: 0;
}
.decorateAnima-leave-to {
  transform: translate(8px, 8px);
  opacity: 0;
}
</style>
