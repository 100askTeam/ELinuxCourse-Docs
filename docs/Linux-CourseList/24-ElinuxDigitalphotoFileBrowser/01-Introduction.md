---
sidebar_position: 1
---

:::tip

课程目录、观看方式、请滑动到页面底部点击 下一页按钮跳转。

:::

# 课程简介
本课程基于嵌入式Linux环境，通过 “核心模块开发→系统集成→性能优化” 全流程，手把手实现支持多输入控制、网络打印、图像解码、中文显示的数码相框系统。课程涵盖Makefile工程化管理、多输入架构设计、libjpeg图像处理、Framebuffer显存控制等关键技术，培养复杂嵌入式GUI开发能力。

## 课程亮点
🔥 工业级项目驱动：完整开发数码相框 + 文件浏览器双功能系统

🔥 深度技术栈覆盖：
    ✅ 多输入架构：轮询/select/多线程三种高并发处理方案（课05系列）

    ✅ 网络打印系统：实现跨设备日志输出与分级控制（课07系列）

    ✅ 图像处理核心：libjpeg解码→RGB转换→缩放→LCD显示全链路（课08系列）

    ✅ 显存管理：Framebuffer底层操作与页面优化（课11-12系列）

## 课程大纲
### 第一阶段：工程化基础
课2-4：Makefile深度解析（规则/通用模板/多工程管理）

课13-15：TCP/UDP网络编程实战（含双源码案例）

### 第二阶段：核心子系统开发
输入系统（课05系列）：

轮询模式（stdin/触摸屏）→ select多路复用 → 多线程架构

打印系统（课07系列）：

stdout重定向 → 网络打印服务端/客户端 → 日志分级控制

图像系统（课08系列）：

libjpeg解码 → RGB提取 → 动态缩放 → Framebuffer渲染

### 第三阶段：数码相框集成开发

课29-30：系统框架设计与搭建

课31-36：BMP图标处理（格式解析/像素提取/缩放/合成）

课37-40：显存管理 + 页面布局 + 输入响应

课41-42：性能优化与中文支持

### 第四阶段：拓展与交付

课43：文件浏览器功能扩展作业

课25/36/40：3大模块上机测试方案

## 学习资源
📺 视频：效果演示（课2） + 关键流程操作（课30/41）

📚 文档：每课2份技术文档（框架图+命令手册+调试指南）

💻 源码：38个核心模块源码（含Makefile/网络/图像/显存工程）

### 实战成果

1. 掌握工业级Makefile编写规范（支持多工程/跨平台编译）  
2. 实现触摸屏+键盘+网络指令的多输入响应系统  
3. 开发支持BMP/JPG显示的数码相框（含动态缩放）  
4. 构建网络日志系统（服务端/客户端/分级过滤）  
5. 完成Framebuffer页面管理与中文渲染优化  

## 适合人群
嵌入式Linux应用开发工程师

需要提升GUI开发能力的开发者

学习嵌入式系统集成的在校生

欲从单片机转向Linux的工程师

课程入口：课1《百问网Linux视频总入口》

### 特色实战：

课05.4：多输入轮询真机测试

课22：网络打印系统联调

课36：BMP图标合成压力测试
