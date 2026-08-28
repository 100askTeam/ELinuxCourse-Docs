---
title: "第3章 普适的GPIO引脚操作方法"
sidebar_label: "第3章 普适的GPIO引脚操作方法"
sidebar_position: 3
toc_max_heading_level: 4
---
<a id="_Ref109290209"></a>
<a id="_Ref109290218"></a>
<a id="_Toc197788676"></a>

GPIO: General-purpose input/output，通用的输入输出口

<a id="_Toc197788677"></a>
## 3.1 GPIO模块一般结构

-   有多组GPIO，每组有多个GPIO
-   使能：电源/时钟
-   模式(Mode)：引脚可用于GPIO或其他功能
-   方向：引脚Mode设置为GPIO时，可以继续设置它是输出引脚，还是输入引脚
-   数值：
    -   对于输出引脚，可以设置寄存器让它输出高、低电平
    -   对于输入引脚，可以读取寄存器得到引脚的当前电平

<a id="_Toc197788678"></a>
## 3.2 GPIO寄存器操作

-   芯片手册一般有相关章节，用来介绍：power/clock
    -   可以设置对应寄存器使能某个GPIO模块(Module)
    -   有些芯片的GPIO是没有使能开关的，即它总是使能的
-   一个引脚可以用于GPIO、串口、USB或其他功能，
    -   有对应的寄存器来选择引脚的功能
-   对于已经设置为GPIO功能的引脚，有方向寄存器用来设置它的方向：输出、输入
-   对于已经设置为GPIO功能的引脚，有数据寄存器用来写、读引脚电平状态

GPIO寄存器的2种操作方法：**原则：不能影响到其他位**

1.  直接读写：读出、修改对应位、写入
    1.  要设置bit n：

```
val = data_reg;
val = val | (1<<n);
data_reg = val;
```

-   1.  要清除bit n：

```
val = data_reg;
val = val & ~(1<<n);
data_reg = val;
```

1.  set-and-clear protocol：

set\_reg, clr\_reg, data\_reg 三个寄存器对应的是同一个物理寄存器,

-   1.  要设置bit n：set\_reg = (1&lt;&lt;n);
    2.  要清除bit n：clr\_reg = (1&lt;&lt;n);
