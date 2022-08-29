/// <reference types="vite/client" />
// 为window添加未能识别的属性
declare interface Window {
  global_config?: global_config & typeof global_config;
}
