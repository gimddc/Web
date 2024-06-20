import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  // 配置项目路径别名
  resolve: {
    // 设置文件./src路径为 @
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "./src")
      }
    ]
  },
  server: {
    port: 3000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域

    // 设置代理
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true //是否跨域
      }
    }
  }
});
