---
id: index
slug: /Linux-Application-Development-Manual
title: 嵌入式Linux应用开发完全手册
sidebar_label: 手册首页
sidebar_position: 1
hide_title: true
description: 嵌入式Linux应用开发完全手册 V5.3，适用于 100ASK_IMX6ULL Pro 开发板。
---

<div className="manual-online-cover">
  <img className="manual-online-cover__frame" src={require('./images/manual-001.png').default} alt="" />
  <div className="manual-online-cover__content">
    <img className="manual-online-cover__logo" src={require('./images/manual-002.png').default} alt="百问网" />
    <span>ARM Cortex-A7 · Embedded Development Platform</span>
    <h1>嵌入式Linux应用开发<br />完全手册</h1>
    <p>V5.3 · 100ASK_IMX6ULL Pro 开发板</p>
  </div>
</div>

本在线手册由《嵌入式Linux应用开发完全手册 V5.3（IMX6ULL Pro 开发板）》转换而来，适用于 **100ASK_IMX6ULL Pro**。正文、表格、代码和插图均按原文顺序整理，并按“篇—章—节”拆分为适合在线阅读的页面。

:::info 在线版说明
Word 原稿中的静态页码目录已替换为左侧导航和本页章节索引；原稿第六篇“实战项目”和第七篇“驱动大全”只有目录占位、没有独立正文，因此本在线版按实际正文展示六个内容分组。
:::

## 手册信息

| 项目 | 内容 |
| --- | --- |
| 类别 | 嵌入式开发 |
| 文档名 | 嵌入式Linux应用开发完全手册·韦东山全系列视频文档全集 |
| 当前版本 | V5.3 |
| 适用型号 | 100ASK_IMX6ULL Pro |
| 编辑 | 百问科技文档编辑团队 |
| 审核 | 韦东山 |
| 修订日期 | 2025/05/10 |

## 更新记录

| 更新日期 | 更新内容 | 版本 |
| --- | --- | --- |
| 2022/08/12 | 前三篇格式整理完毕 | V5.0 |
| 2022/08/22 | 修正封面、2-2-2.5 | V5.0 |
| 2022/09/02 | 修正 Windows 下烧写镜像到 SD 卡 | V5.1 |
| 2022/09/13 | 正式发布 | V5.1 |
| 2024/05/17 | 根据常见问题修改文档 | V5.2 |
| 2024/05/18 | 修改 tslib 的编译命令 | 未发布 |
| 2025/05/10 | 改为使用 adb | V5.3 |

## 章节目录

### 第一篇 学习路线、教程介绍、资料下载

- [第1章 嵌入式Linux的学习新路线](./part-1/chapter-01.md)
- [第2章 资料下载](./part-1/chapter-02.md)

### 第二篇 Ubuntu 基本操作

- [第1章 安装VMware运行Ubuntu](./part-2/chapter-03.md)
- [第2章 Ubuntu操作入门](./part-2/chapter-04.md)

### 第三篇 环境搭建与开发板操作

- [第1章 搭建开发环境](./part-3/chapter-05.md)
- [第2章 安装软件](./part-3/chapter-06.md)
- [第3章 IMX6ULL Pro开发板基本操作](./part-3/chapter-07.md)
- [第4章 开发板的第1个APP实验](./part-3/chapter-08.md)
- [第5章 开发板的第1个驱动实验](./part-3/chapter-09.md)
- [第6章 构建bootloader、内核、文件系统](./part-3/chapter-10.md)
- [第7章 烧写整个系统或更新部分系统](./part-3/chapter-11.md)

### 第四篇 嵌入式 Linux 应用开发基础知识

- [第1章 HelloWorld背后没那么简单](./part-4/chapter-12.md)
- [第2章 GCC编译器的使用](./part-4/chapter-13.md)
- [第3章 Makefile的使用](./part-4/chapter-14.md)
- [第4章 文件IO](./part-4/chapter-15.md)
- [第5章 Framebuffer应用编程](./part-4/chapter-16.md)
- [第6章 文字显示](./part-4/chapter-17.md)
- [第7章 输入系统应用编程](./part-4/chapter-18.md)
- [第8章 网络通信](./part-4/chapter-19.md)
- [第9章 多线程编程](./part-4/chapter-20.md)
- [第10章 I2C应用编程](./part-4/chapter-21.md)
- [第11章 Linux串口应用编程](./part-4/chapter-22.md)

### 第五篇 嵌入式 Linux 驱动开发基础知识

- [第1章 Hello驱动(不涉及硬件操作)](./part-5/chapter-23.md)
- [第2章 硬件知识_LED原理图](./part-5/chapter-24.md)
- [第3章 普适的GPIO引脚操作方法](./part-5/chapter-25.md)
- [第4章 具体单板的GPIO操作方法](./part-5/chapter-26.md)
- [第5章 最简单的LED驱动程序](./part-5/chapter-27.md)
- [第6章 LED驱动程序框架](./part-5/chapter-28.md)
- [第7章 具体单板的LED驱动程序](./part-5/chapter-29.md)
- [第8章 驱动设计的思想](./part-5/chapter-30.md)
- [第9章 驱动进化之路：总线设备驱动模型](./part-5/chapter-31.md)
- [第10章 LED模板驱动程序的改造：总线设备驱动模型](./part-5/chapter-32.md)
- [第11章 驱动进化之路：设备树的引入及简明教程](./part-5/chapter-33.md)
- [第12章 LED模板驱动程序的改造：设备树](./part-5/chapter-34.md)
- [第13章 APP怎么读取按键值](./part-5/chapter-35.md)
- [第14章 查询方式的按键驱动程序_编写框架](./part-5/chapter-36.md)
- [第15章 具体单板的按键驱动程序(查询方式)](./part-5/chapter-37.md)
- [第16章 GPIO和Pinctrl子系统的使用](./part-5/chapter-38.md)
- [第17章 异常与中断的概念及处理流程](./part-5/chapter-39.md)
- [第18章 Linux系统对中断的处理](./part-5/chapter-40.md)
- [第19章 驱动程序基石](./part-5/chapter-41.md)

### 第八篇 其他应用

- [第1章 Qt应用开发(仅供测试)](./part-8/chapter-42.md)
- [第2章 开发板板载系统应用、库、工具、使用](./part-8/chapter-43.md)
