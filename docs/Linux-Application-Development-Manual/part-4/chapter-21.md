---
title: "第10章 I2C应用编程"
sidebar_label: "第10章 I2C应用编程"
sidebar_position: 10
toc_max_heading_level: 4
---
<a id="_Toc197788657"></a>

<a id="_Toc197788658"></a>
## 10.1 I2C视频介绍

参考资料：I2Ctools

[https://mirrors.edge.kernel.org/pub/software/utils/i2c-tools/](https://mirrors.edge.kernel.org/pub/software/utils/i2c-tools/)

### 10.1.1 I2C硬件框架

![图示
描述已自动生成](../images/manual-320.png)

图 10.1 I2C总线拓扑图

-   在一个芯片(SoC)内部，有一个或多个I2C控制器
-   在一个I2C控制器上，可以连接一个或多个I2C设备
-   I2C总线只需要2条线：时钟线SCL、数据线SDA
-   在I2C总线的SCL、SDA线上，都有上拉电阻

<a id="X7df6fa8647c5725910780dcd7aa9c37bae37f63"></a>
### 10.1.2 I2C软件框架

![图形用户界面, 文本, 应用程序, 电子邮件
描述已自动生成](../images/manual-321.png)

图 10.2 I2C软件框架

以I2C接口的存储设备AT24C02为例：

-   APP：
    -   提出要求：把字符串"[www.100ask.net](file:///E:\\VXwork\\WXWork\\1688850409580420\\Cache\\File\\2021-08\\www.100ask.net)"写入AT24C02地址16开始的地方
    -   它是大爷，不关心底层实现的细节
    -   它只需要调用设备驱动程序提供的接口
-   AT24C02驱动：
    -   它知道AT24C02要求的地址、数据格式
    -   它知道发出什么信号才能让AT24C02执行擦除、烧写工作
    -   它知道怎么判断数据是否烧写成功
    -   它构造好一系列的数据，发给I2C控制器
-   I2C控制器驱动
    -   它根据I2C协议发出各类信号：I2C设备地址、I2C存储地址、数据
    -   它根据I2C协议判断

### 10.1.3 我们讲什么

-   -   -   -   1.  对于Linux

![图示
描述已自动生成](../images/manual-322.png)

图 10.3 Linux I2C结构

从上到下：

-   先讲I2C协议
-   APP可以通过两类驱动程序访问设备
    -   I2C设备自己的驱动程序
    -   内核自带的i2c-dev.c驱动程序，它是i2c控制器驱动程序暴露给用户空间的驱动程序(i2c-dev.c)
-   I2C Device Driver
    -   I2C设备自己的驱动程序
    -   内核自带的i2c-dev.c驱动程序，它是i2c控制器驱动程序暴露给用户空间的驱动程序(i2c-dev.c)
-   I2C Controller Driver
    -   芯片I2C控制器的驱动程序(称为adapter)
    -   使用GPIO模拟的I2C控制器驱动程序(i2c-gpio.c)
        -   -   1.  对于单片机/裸机

![图示
描述已自动生成](../images/manual-323.png)

图 10.4 单片机I2C结构

从上到下：

-   先讲I2C协议
-   APP
-   I2C Device Driver
-   I2C Controller Driver(也被称为adapter)

<a id="_Toc197788659"></a>
## 10.2 I2C协议

参考资料：

i2c\_spec.pdf

<a id="Xfe46f7e7996f168fe370525d4944204fd619b8d"></a>
### 10.2.1 硬件连接

I2C在硬件上的接法如下所示，主控芯片引出两条线SCL,SDA线，在一条I2C总线上可以接很多I2C设备，我们还会放一个上拉电阻（放一个上拉电阻的原因以后我们再说）。

![图示, 示意图
描述已自动生成](../images/manual-324.png)

图 10.5 I2C硬件连接

<a id="Xd16764ea31de7baeaca2461b5aaabe73e49aae5"></a>
### 10.2.2 传输数据类比

怎么通过I2C传输数据，我们需要把数据从主设备发送到从设备上去，也需要把数据从从设备传送到主设备上去，数据涉及到双向传输。

举个例子：

![文本, 图标
描述已自动生成](../images/manual-325.png)

图 10.6 I2C举例示意图

体育老师：可以把球发给学生，也可以把球从学生中接过来。

-   发球：
    -   老师：开始了(start)
    -   老师：A！我要发球给你！(地址/方向)
    -   学生A：到！(回应)
    -   老师把球发出去（传输）
    -   A收到球之后，应该告诉老师一声（回应）
    -   老师：结束（停止）
-   接球：
    -   老师：开始了(start)
    -   老师：B！把球发给我！(地址/方向)
    -   学生B：到！
    -   B把球发给老师（传输）
    -   老师收到球之后，给B说一声，表示收到球了（回应）
    -   老师：结束（停止）

我们就使用这个简单的例子，来解释一下IIC的传输协议：

-   老师说开始了，表示开始信号(start)
-   老师提醒某个学生要发球，表示发送地址和方向(address/read/write)
-   老师发球/接球，表示数据的传输
-   收到球要回应：回应信号(ACK)
-   老师说结束，表示IIC传输结束(P)

<a id="X5b07de2e0a76b58346df9d9ce1a6c963afe7647"></a>
### 10.2.3 IIC传输数据的格式

-   -   -   -   1.  <a id="Xdc618fb81c4d5b4df1c13295fb963422cb53652"></a>写操作

流程如下：

-   主芯片要发出一个start信号
-   然后发出一个设备地址(用来确定是往哪一个芯片写数据)，方向(读/写，0表示写，1表示读)
-   从设备回应(用来确定这个设备是否存在)，然后就可以传输数据
-   主设备发送一个字节数据给从设备，并等待回应
-   每传输一字节数据，接收方要有一个回应信号（确定数据是否接受完成)，然后再传输下一个数据。
-   数据发送完之后，主芯片就会发送一个停止信号。
-   下图：白色背景表示"主→从"，灰色背景表示"从→主"

![图示
描述已自动生成](../images/manual-326.png)

图 10.7 I2C写传输格式

-   -   -   -   1.  <a id="Xbd3c06919e511e35788f6b3f982cb8b841b4003"></a>读操作

流程如下：

-   主芯片要发出一个start信号
-   然后发出一个设备地址(用来确定是往哪一个芯片写数据)，方向(读/写，0表示写，1表示读)
-   从设备回应(用来确定这个设备是否存在)，然后就可以传输数据
-   从设备发送一个字节数据给主设备，并等待回应
-   每传输一字节数据，接收方要有一个回应信号（确定数据是否接受完成)，然后再传输下一个数据。
-   数据发送完之后，主芯片就会发送一个停止信号。

下图：白色背景表示"主→从"，灰色背景表示"从→主"

![图示
描述已自动生成](../images/manual-327.png)

图 10.8 I2C读传输格式

-   -   -   -   1.  <a id="Xd3f550b02c44f4570ccf454fd31762d0ebb784c"></a>I2C信号

I2C协议中数据传输的单位是字节，也就是8位。但是要用到9个时钟：前面8个时钟用来传输8数据，第9个时钟用来传输回应信号。传输时，先传输最高位(MSB)。

-   开始信号（S）：SCL为高电平时，SDA山高电平向低电平跳变，开始传送数据。
-   结束信号（P）：SCL为高电平时，SDA由低电平向高电平跳变，结束传送数据。
-   响应信号(ACK)：接收器在接收到8位数据后，在第9个时钟周期，拉低SDA
-   SDA上传输的数据必须在SCL为高电平期间保持稳定，SDA上的数据只能在SCL为低电平期间变化

I2C协议信号如下：

![图示
描述已自动生成](../images/manual-328.png)

图 10.9 I2C协议信号

-   -   -   -   1.  <a id="X6c5d253dcee2c137b1493fa520af1141445fc80"></a>协议细节
-   如何在SDA上实现双向传输？
    -   主芯片通过一根SDA线既可以把数据发给从设备，也可以从SDA上读取数据，连接SDA线的引脚里面必然有两个引脚（发送引脚/接受引脚）。
-   主、从设备都可以通过SDA发送数据，肯定不能同时发送数据，怎么错开时间？在9个时钟里：
    -   前8个时钟由主设备发送数据的话，第9个时钟就由从设备发送数据；
    -   前8个时钟由从设备发送数据的话，第9个时钟就由主设备发送数据。
-   双方设备中，某个设备发送数据时，另一方怎样才能不影响SDA上的数据？
    -   设备的SDA中有一个三极管，使用开极/开漏电路(三极管是开极，CMOS管是开漏，作用一样)，如下图：

![fig:](../images/manual-329.png)

图 10.10 I2C上拉/开漏电路

真值表如下：

![fig:](../images/manual-330.png)

图 10.11 开漏真值表

从真值表和电路图我们可以知道：

-   当某一个芯片不想影响SDA线时，那就不驱动这个三极管
-   想让SDA输出高电平，双方都不驱动三极管(SDA通过上拉电阻变为高电平)
-   想让SDA输出低电平，就驱动三极管

从下面的例子可以看看数据是怎么传的（实现双向传输）。
举例：主设备发送（8bit）给从设备

-   前8个clk
    -   从设备不要影响SDA，从设备不驱动三极管
    -   主设备决定数据，主设备要发送1时不驱动三极管，要发送0时驱动三极管
-   第9个clk，由从设备决定数据
    -   主设备不驱动三极管
    -   从设备决定数据，要发出回应信号的话，就驱动三极管让SDA变为0

从这里也可以知道ACK信号是低电平

从上面的例子，就可以知道怎样在一条线上实现双向传输，这就是SDA上要使用上拉电阻的原因。

为何SCL也要使用上拉电阻？在第9个时钟之后，如果有某一方需要更多的时间来处理数据，它可以一直驱动三极管把SCL拉低。
当SCL为低电平时候，大家都不应该使用IIC总线，只有当SCL从低电平变为高电平的时候，IIC总线才能被使用。

当它就绪后，就可以不再驱动三极管，这是上拉电阻把SCL变为高电平，其他设备就可以继续使用I2C总线了。

对于IIC协议它只能规定怎么传输数据，数据是什么含义由从设备决定。

<a id="_Toc197788660"></a>
## 10.3 SMBus协议

参考资料：

-   Linux内核文档：Documentation\\i2c\\smbus-protocol.rst
-   SMBus协议：
-   [http://www.smbus.org/specs/](http://www.smbus.org/specs/)
-   SMBus\_3\_0\_20141220.pdf
-   I2CTools:

https://mirrors.edge.kernel.org/pub/software/utils/i2c-tools/

<a id="X945bd7e7dd46c0f9677ec37af1a5789b80ee2f9"></a>
### 10.3.1 SMBus是I2C协议的一个子集

SMBus: System Management Bus，系统管理总线。
SMBus最初的目的是为智能电池、充电电池、其他微控制器之间的通信链路而定义的。
SMBus也被用来连接各种设备，包括电源相关设备，系统传感器，EEPROM通讯设备等等。
SMBus 为系统和电源管理这样的任务提供了一条控制总线，使用 SMBus 的系统，设备之间发送和接收消息都是通过 SMBus，而不是使用单独的控制线，这样可以节省设备的管脚数。
SMBus是基于I2C协议的，SMBus要求更严格，SMBus是I2C协议的子集。

![图示, 维恩图
描述已自动生成](../images/manual-331.png)

图 10.12 SMBus是I2C的子集

SMBus有哪些更严格的要求？跟一般的I2C协议有哪些差别？

-   VDD的极限值不一样
    -   I2C协议：范围很广，甚至讨论了高达12V的情况
    -   SMBus：1.8V~5V
-   最小时钟频率、最大的Clock Stretching
    -   Clock Stretching含义：某个设备需要更多时间进行内部的处理时，它可以把SCL拉低占住I2C总线
    -   I2C协议：时钟频率最小值无限制，Clock Stretching时长也没有限制
    -   SMBus：时钟频率最小值是10KHz，Clock Stretching的最大时间值也有限制
-   地址回应(Address Acknowledge)：一个I2C设备接收到它的设备地址后，是否必须发出回应信号？
    -   I2C协议：没有强制要求必须发出回应信号
    -   SMBus：强制要求必须发出回应信号，这样对方才知道该设备的状态：busy，failed，或是被移除了
-   SMBus协议明确了数据的传输格式
    -   I2C协议：它只定义了怎么传输数据，但是并没有定义数据的格式，这完全由设备来定义
    -   SMBus：定义了几种数据格式(后面分析)
-   REPEATED START Condition(重复发出S信号)

比如读EEPROM时，涉及2个操作：

1.  把存储地址发给设备
2.  读数据

在写、读之间，可以不发出P信号，而是直接发出S信号：这个S信号就是REPEATED START，如图 10.13所示

![fig:](../images/manual-332.png)

<a id="_Ref108713474"></a>图 10.13 REPEATED START Condition

-   SMBus Low Power Version：SMBus也有低功耗的版本

<a id="X307efd385fd925a31e32fbe752468ea0516c0fd"></a>
### 10.3.2 SMBus协议分析

对于I2C协议，它只定义了怎么传输数据，但是并没有定义数据的格式，这完全由设备来定义。
对于SMBus协议，它定义了几种数据格式。

**注意：**下面文档中的Functionality flag是Linux的某个I2C控制器驱动所支持的功能。比如Functionality flag: I2C\_FUNC\_SMBUS\_QUICK，表示需要I2C控制器支持SMBus Quick Command

-   -   -   -   1.  <a id="X94f6fde8ef883b7bbba8dbe52174cb3c70622f7"></a>symbols(符号)

```
S     (1 bit) : Start bit(开始位)Sr    (1 bit) : 重复的开始位P     (1 bit) : Stop bit(停止位)R/W#  (1 bit) : Read/Write bit. Rd equals 1, Wr equals 0.(读写位)A, N  (1 bit) : Accept and reverse accept bit.(回应位)Address(7 bits): I2C 7 bit address. Note that this can be expanded as usual to                get a 10 bit I2C address.                (地址位，7位地址)Command Code  (8 bits): Command byte, a data byte which often selects a register on                the device.                (命令字节，一般用来选择芯片内部的寄存器)Data Byte (8 bits): A plain data byte. Sometimes, I write DataLow, DataHigh                for 16 bit data.                (数据字节，8位；如果是16位数据的话，用2个字节来表示：DataLow、DataHigh)Count (8 bits): A data byte containing the length of a block operation.				(在block操作总，表示数据长度)[..]:           Data sent by I2C device, as opposed to data sent by the host                adapter.                (中括号表示I2C设备发送的数据，没有中括号表示host adapter发送的数据)
```

-   -   -   -   1.  <a id="_Hlk108713553"></a><a id="X3ebcec46d83f8988a3286ed519a4fb59439f220"></a>SMBus Quick Command

![图片包含 图示
描述已自动生成](../images/manual-333.png)

图 10.14 2 SMBus Quick Command

只是用来发送一位数据：R/W#本意是用来表示读或写，但是在SMBus里可以用来表示其他含义。比如某些开关设备，可以根据这一位来决定是打开还是关闭。

```
Functionality flag: I2C_FUNC_SMBUS_QUICK
```

-   -   -   -   1.  <a id="X80cda5adf425575aef90b931401a2ca502eda84"></a>3 SMBus Receive Byte

![图示
中度可信度描述已自动生成](../images/manual-334.png)

图 10.15 SMBus Receive Byte

I2C-tools中的函数：i2c\_smbus\_read\_byte()。读取一个字节，Host adapter接收到一个字节后不需要发出回应信号(上图中N表示不回应)。

```
Functionality flag: I2C_FUNC_SMBUS_READ_BYTE
```

-   -   -   -   1.  <a id="X7bdc91f180049421a42bd3364b1f74fa71b07b8"></a>4 SMBus Send Byte

![图片包含 图示
描述已自动生成](../images/manual-335.png)

图 10.16 SMBus Send Byte

I2C-tools中的函数：i2c\_smbus\_write\_byte()。发送一个字节。

```
Functionality flag: I2C_FUNC_SMBUS_WRITE_BYTE
```

-   -   -   -   1.  <a id="X092f8d394691d34fc18d25dd2c4fe8be1b04cee"></a>SMBus Read Byte

![图片包含 箱线图
描述已自动生成](../images/manual-336.png)

图 10.17 5 SMBus Read Byte

I2C-tools中的函数：i2c\_smbus\_read\_byte\_data()。先发出Command Code(它一般表示芯片内部的寄存器地址)，再读取一个字节的数据。上面介绍的SMBus Receive Byte是不发送Comand，直接读取数据。

```
Functionality flag: I2C_FUNC_SMBUS_READ_BYTE_DATA
```

-   -   -   -   1.  <a id="Xd61c4c139988d36079003f2cdcead76fb69c8c4"></a>6 SMBus Read Word

![图形用户界面, 文本, 应用程序
描述已自动生成](../images/manual-337.png)

图 10.18 SMBus Read Word

I2C-tools中的函数：i2c\_smbus\_read\_word\_data()。先发出Command Code(它一般表示芯片内部的寄存器地址)，再读取2个字节的数据。

```
Functionality flag: I2C_FUNC_SMBUS_READ_WORD_DATA
```

-   -   -   -   1.  <a id="X23bbc6ba41a121ea5f6bd59e3874cfe272a17a3"></a>SMBus Write Byte

![](../images/manual-338.png)

图 10.19 SMBus Write Byte

I2C-tools中的函数：i2c\_smbus\_write\_byte\_data()。先发出Command Code(它一般表示芯片内部的寄存器地址)，再发出1个字节的数据。

```
Functionality flag: I2C_FUNC_SMBUS_WRITE_BYTE_DATA
```

-   -   -   -   1.  <a id="X4b2bd6fbcf70181a5bd47a3082b0ebda4754828"></a>SMBus Write Word

![图示
中度可信度描述已自动生成](../images/manual-339.png)

图 10.20 8 SMBus Write Word

I2C-tools中的函数：i2c\_smbus\_write\_word\_data()。先发出Command Code(它一般表示芯片内部的寄存器地址)，再发出1个字节的数据。

```
Functionality flag: I2C_FUNC_SMBUS_WRITE_WORD_DATA
```

-   -   -   -   1.  <a id="Xb7b077fb1f401e1d12eae78116473e80325ce0b"></a>SMBus Block Read

![图形用户界面, 应用程序
描述已自动生成](../images/manual-340.png)

图 10.21 9 SMBus Block Read

I2C-tools中的函数：i2c\_smbus\_read\_block\_data()。先发出Command Code(它一般表示芯片内部的寄存器地址)，再发起度操作：

-   先读到一个字节(Block Count)，表示后续要读的字节数
-   然后读取全部数据

```
Functionality flag: I2C_FUNC_SMBUS_READ_BLOCK_DATA
```

-   -   -   -   1.  <a id="X9bfcef2e9236691696b6a3d0735264a0712eb17"></a>SMBus Block Write

![图片包含 图形用户界面
描述已自动生成](../images/manual-341.png)

图 10.22 10 SMBus Block Write

I2C-tools中的函数：i2c\_smbus\_write\_block\_data()。先发出Command Code(它一般表示芯片内部的寄存器地址)，再发出1个字节的Byte Conut(表示后续要发出的数据字节数)，最后发出全部数据。

```
Functionality flag: I2C_FUNC_SMBUS_WRITE_BLOCK_DATA
```

-   -   -   -   1.  <a id="_Hlk108714482"></a><a id="X23ac20d90a1edeb6427d0b797d6e459383ab7ac"></a>I2C Block Read

在一般的I2C协议中，也可以连续读出多个字节。它跟SMBus Block Read的差别在于设备发出的第1个数据不是长度N，如下图所示：

![图形用户界面, 文本
描述已自动生成](../images/manual-342.png)

图 10.23 11 I2C Block Read

I2C-tools中的函数：i2c\_smbus\_read\_i2c\_block\_data()。先发出Command Code(它一般表示芯片内部的寄存器地址)，再发出1个字节的Byte Conut(表示后续要发出的数据字节数)，最后发出全部数据。

```
Functionality flag: I2C_FUNC_SMBUS_READ_I2C_BLOCK
```

-   -   -   -   1.  <a id="X2f553092827e57678cc9f0325f2a8dd5b3f77ed"></a>I2C Block Write

在一般的I2C协议中，也可以连续发出多个字节。它跟SMBus Block Write的差别在于发出的第1个数据不是长度N，如下图所示：

![表格
描述已自动生成](../images/manual-343.png)

图 10.24 12 I2C Block Write

I2C-tools中的函数：i2c\_smbus\_write\_i2c\_block\_data()。先发出Command Code(它一般表示芯片内部的寄存器地址)，再发出1个字节的Byte Conut(表示后续要发出的数据字节数)，最后发出全部数据。

```
Functionality flag: I2C_FUNC_SMBUS_WRITE_I2C_BLOCK
```

-   -   -   -   1.  <a id="Xad2be366853b08dcbaf199731f77a591bba5ba8"></a>SMBus Block Write - Block Read Process Call

![fig:](../images/manual-344.png)

图 10.25 13 SMBus Block Write - Block Read Process Call

先写一块数据，再读一块数据。

```
Functionality flag: I2C_FUNC_SMBUS_BLOCK_PROC_CALL
```

-   -   -   -   1.  <a id="Xe3902762da82b54b6c52f2e73c0274ba3833d6d"></a>Packet Error Checking (PEC)

PEC是一种错误校验码，如果使用PEC，那么在P信号之前，数据发送方要发送一个字节的PEC码(它是CRC-8码)。以SMBus Send Byte为例，下图中，一个未使用PEC，另一个使用PEC：

![图形用户界面, 文本, 应用程序, 电子邮件
描述已自动生成](../images/manual-345.png)

图 10.26 Packet Error Checking

<a id="X0ad42ad537fdb1e0718f55878ad7fe05f18d038"></a>
### 10.3.3 SMBus和I2C的建议

因为很多设备都实现了SMBus，而不是更宽泛的I2C协议，所以优先使用SMBus。即使I2C控制器没有实现SMBus，软件方面也是可以使用I2C协议来模拟SMBus。所以：Linux建议优先使用SMBus。

<a id="_Toc197788661"></a>
## 10.4 I2C系统的重要结构体

参考资料：

-   Linux驱动程序:_（某版本的Linux，比如Linux-4.9.88）/drivers/i2c_
-   I2CTools:

https://mirrors.edge.kernel.org/pub/software/utils/i2c-tools/

### 10.4.1 重要结构体

使用一句话概括I2C传输：APP通过I2C Controller与I2C Device传输数据。

在Linux中要思索下面几个问题。

-   怎么表示I2C Controller
-   一个芯片里可能有多个I2C Controller，比如第0个、第1个、……
-   对于使用者，只要确定是第几个I2C Controller即可
-   使用i2c\_adapter表示一个I2C BUS，或称为I2C Controller，里面有2个重要的成员：
    1.  nr：第几个I2C BUS(I2C Controller)
    2.  i2c\_algorithm，里面有该I2C BUS的传输函数，用来收发I2C数据

<a id="_Hlk109122996"></a>i2c\_adapter原型：

![](../images/manual-346.png)

图 10.27 i2c\_adapter原型

i2c\_algorithm原型：

![](../images/manual-347.png)

图 10.28 i2c\_algorithm原型

-   -   -   -   1.  怎么表示I2C Device
-   一个I2C Device，一定有**设备地址**
-   它连接在哪个I2C Controller上，即对应的i2c\_adapter是什么

使用i2c\_client来表示一个I2C Device

![](../images/manual-348.png)

图 10.29 i2c\_client

-   -   -   -   1.  怎么表示要传输的数据

在上面的i2c\_algorithm结构体中可以看到要传输的数据被称为：i2c\_msg

i2c\_msg原型：

![](../images/manual-349.png)

图 10.30 i2c\_msg

-   -   i2c\_msg中的flags用来表示传输方向：bit 0等于I2C\_M\_RD表示读，bit 0等于0表示写
    -   一个i2c\_msg要么是读，要么是写

举例：设备地址为0x50的EEPROM，要读取它里面存储地址为0x10的一个字节，应该构造几个i2c\_msg？要构造2个i2c\_msg

-   1.  第一个i2c\_msg表示写操作，把要访问的存储地址0x10发给设备
    2.  第二个i2c\_msg表示读操作

代码如下

```
u8 data_addr = 0x10;
i8 data;
struct i2c_msg msgs[2];
msgs[0].addr   = 0x50;
msgs[0].flags  = 0;
msgs[0].len    = 1;
msgs[0].buf    = &data_addr;
msgs[1].addr   = 0x50;
msgs[1].flags  = I2C_M_RD;
msgs[1].len    = 1;
msgs[1].buf    = &data;
```

### 10.4.2 内核里怎么传输数据

使用一句话概括I2C传输：

1.  APP通过I2C Controller与I2C Device传输数据
2.  APP通过i2c\_adapter与i2c\_client传输i2c\_msg
3.  内核函数i2c\_transfer

i2c\_msg里含有addr，所以这个函数里不需要i2c\_client

![](../images/manual-350.png)

图 10.31 i2c\_transfer

<a id="_Toc197788662"></a>
## 10.5 无需编写驱动程序即可访问I2C设备

APP访问硬件肯定是需要驱动程序的，对于I2C设备，内核提供了驱动程序**_drivers/i2c/i2c-dev.c_**，通过它可以直接使用下面的I2C控制器驱动程序来访问I2C设备。

框架如下：

![](../images/manual-351.png)

图 10.32 I2C控制器框架

i2c-tools是一套好用的工具，也是一套示例代码。

### 10.5.1 体验I2C-Tools

使用一句话概括I2C传输：APP通过I2C Controller与I2C Device传输数据。

所以使用I2C-Tools时也需要指定：

-   哪个I2C控制器(或称为I2C BUS、I2C Adapter)
-   哪个I2C设备(设备地址)
-   数据：读还是写、数据本身
    -   -   -   1.  交叉编译
-   配置环境：vim ~/.bashrc

```bash
export ARCH=arm
export CROSS_COMPILE=arm-buildroot-linux-gnueabihf-
export PATH=$PATH:/home/book/100ask_imx6ull-sdk/ToolChain/arm-buildroot-linux-gnueabihf_sdk-buildroot/bin
```

-   修改I2C-Tools的Makefile指定交叉编译工具链

```bash
CC      ?= gcc
AR      ?= ar
STRIP   ?= strip
```

改为(指定交叉编译工具链前缀, 去掉问号)：

```bash
CC      = $(CROSS_COMPILE)gcc
AR      = $(CROSS_COMPILE)ar
STRIP   = $(CROSS_COMPILE)strip
```

在Makefile中，“?=”在第一次设置变量时才会起效果，如果之前设置过该变量，则不会起效果。

-   -   -   -   1.  执行make
-   执行make时，是动态链接，需要把libi2c.so也放到单板上
-   想静态链接的话，执行：make USE\_STATIC\_LIB=1
    -   -   -   1.  用法
-   i2cdetect：I2C检测

```bash
// 列出当前的I2C Adapter(或称为I2C Bus、I2C Controller)
i2cdetect -l
// 打印某个I2C Adapter的Functionalities, I2CBUS为0、1、2等整数
i2cdetect -F I2CBUS
// 看看有哪些I2C设备, I2CBUS为0、1、2等整数
i2cdetect -y -a I2CBUS
// 效果如下
# i2cdetect -l
i2c-1   i2c             STM32F7 I2C(0x40013000)                 I2C adapter
i2c-2   i2c             STM32F7 I2C(0x5c002000)                 I2C adapter
i2c-0   i2c             STM32F7 I2C(0x40012000)                 I2C adapter
# i2cdetect -F 0
Functionalities implemented by /dev/i2c-0:
I2C                              yes
SMBus Quick Command              yes
SMBus Send Byte                  yes
SMBus Receive Byte               yes
SMBus Write Byte                 yes
SMBus Read Byte                  yes
SMBus Write Word                 yes
SMBus Read Word                  yes
SMBus Process Call               yes
SMBus Block Write                yes
SMBus Block Read                 yes
SMBus Block Process Call         yes
SMBus PEC                        yes
I2C Block Write                  yes
I2C Block Read                   yes
// --表示没有该地址对应的设备, UU表示有该设备并且它已经有驱动程序,
// 数值表示有该设备但是没有对应的设备驱动
# i2cdetect -y -a 0
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00: 00 -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- UU -- -- -- 1e --
20: -- -- UU -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
```

-   i2cget：I2C读

使用说明如下:

```bash
# i2cget
Usage: i2cget [-f] [-y] [-a] I2CBUS CHIP-ADDRESS [DATA-ADDRESS [MODE]]
  I2CBUS is an integer or an I2C bus name
  ADDRESS is an integer (0x03 - 0x77, or 0x00 - 0x7f if -a is given)
  MODE is one of:
    b (read byte data, default)
    w (read word data)
    c (write byte/read byte)
Append p for SMBus PEC
```

使用示例：

```bash
// 读一个字节: I2CBUS为0、1、2等整数, 表示I2C Bus; CHIP-ADDRESS表示设备地址
i2cget -f -y I2CBUS CHIP-ADDRESS
// 读某个地址上的一个字节:
//    I2CBUS为0、1、2等整数, 表示I2C Bus
//    CHIP-ADDRESS表示设备地址
//    DATA-ADDRESS: 芯片上寄存器地址
//    MODE：有2个取值, b-使用`SMBus Read Byte`先发出DATA-ADDRESS, 再读一个字节, 中间无P信号
//                   c-先write byte, 在read byte，中间有P信号
i2cget -f -y I2CBUS CHIP-ADDRESS DATA-ADDRESS MODE
// 读某个地址上的2个字节:
//    I2CBUS为0、1、2等整数, 表示I2C Bus
//    CHIP-ADDRESS表示设备地址
//    DATA-ADDRESS: 芯片上寄存器地址
//    MODE：w-表示先发出DATA-ADDRESS，再读2个字节
i2cget -f -y I2CBUS CHIP-ADDRESS DATA-ADDRESS MODE
```

-   i2cset：I2C写

使用说明如下：

```bash
# i2cset
Usage: i2cset [-f] [-y] [-m MASK] [-r] [-a] I2CBUS CHIP-ADDRESS DATA-ADDRESS [VALUE] ... [MODE]
  I2CBUS is an integer or an I2C bus name
  ADDRESS is an integer (0x03 - 0x77, or 0x00 - 0x7f if -a is given)
  MODE is one of:
    c (byte, no value)
    b (byte data, default)
    w (word data)
  i (I2C block data)
    s (SMBus block data)
Append p for SMBus PEC
```

使用示例：

```bash
// 写一个字节: I2CBUS为0、1、2等整数, 表示I2C Bus; CHIP-ADDRESS表示设备地址
  //           DATA-ADDRESS就是要写的数据
  i2cset -f -y I2CBUS CHIP-ADDRESS DATA-ADDRESS

  // 给address写1个字节(address, value):
  //           I2CBUS为0、1、2等整数, 表示I2C Bus; CHIP-ADDRESS表示设备地址
  //           DATA-ADDRESS: 8位芯片寄存器地址;
  //           VALUE: 8位数值
  //           MODE: 可以省略，也可以写为b
  i2cset -f -y I2CBUS CHIP-ADDRESS DATA-ADDRESS VALUE [b]

  // 给address写2个字节(address, value):
  //           I2CBUS为0、1、2等整数, 表示I2C Bus; CHIP-ADDRESS表示设备地址
  //           DATA-ADDRESS: 8位芯片寄存器地址;
  //           VALUE: 16位数值
  //           MODE: w
  i2cset -f -y I2CBUS CHIP-ADDRESS DATA-ADDRESS VALUE w

  // SMBus Block Write：给address写N个字节的数据
  //   发送的数据有：address, N, value1, value2, ..., valueN
  //   跟`I2C Block Write`相比, 需要发送长度N
  //           I2CBUS为0、1、2等整数, 表示I2C Bus; CHIP-ADDRESS表示设备地址
  //           DATA-ADDRESS: 8位芯片寄存器地址;
  //           VALUE1~N: N个8位数值
  //           MODE: s
  i2cset -f -y I2CBUS CHIP-ADDRESS DATA-ADDRESS VALUE1 ... VALUEN s

  // I2C Block Write：给address写N个字节的数据
  //   发送的数据有：address, value1, value2, ..., valueN
  //   跟`SMBus Block Write`相比, 不需要发送长度N
  //           I2CBUS为0、1、2等整数, 表示I2C Bus; CHIP-ADDRESS表示设备地址
  //           DATA-ADDRESS: 8位芯片寄存器地址;
  //           VALUE1~N: N个8位数值
  //           MODE: i
  i2cset -f -y I2CBUS CHIP-ADDRESS DATA-ADDRESS VALUE1 ... VALUEN i
```

-   i2ctransfer：I2C传输(不是基于SMBus)

使用说明如下：

```bash
# i2ctransfer
Usage: i2ctransfer [-f] [-y] [-v] [-V] [-a] I2CBUS DESC [DATA] [DESC [DATA]]...
  I2CBUS is an integer or an I2C bus name
  DESC describes the transfer in the form: {r|w}LENGTH[@address]
    1) read/write-flag 2) LENGTH (range 0-65535) 3) I2C address (use last one if omitted)
  DATA are LENGTH bytes for a write message. They can be shortened by a suffix:
    = (keep value constant until LENGTH)
    + (increase value by 1 until LENGTH)
    - (decrease value by 1 until LENGTH)
    p (use pseudo random generator until LENGTH with value as seed)
Example (bus 0, read 8 byte at offset 0x64 from EEPROM at 0x50):
  # i2ctransfer 0 w1@0x50 0x64 r8
Example (same EEPROM, at offset 0x42 write 0xff 0xfe ... 0xf0):
  # i2ctransfer 0 w17@0x50 0x42 0xff-
```

使用举例：

```bash
// Example (bus 0, read 8 byte at offset 0x64 from EEPROM at 0x50):
# i2ctransfer -f -y 0 w1@0x50 0x64 r8
// Example (bus 0, write 3 byte at offset 0x64 from EEPROM at 0x50):
# i2ctransfer -f -y 0 w9@0x50 0x64 val1 val2 val3
// Example
// first: (bus 0, write 3 byte at offset 0x64 from EEPROM at 0x50)
// and then: (bus 0, read 3 byte at offset 0x64 from EEPROM at 0x50)
# i2ctransfer -f -y 0 w9@0x50 0x64 val1 val2 val3 r3@0x50
# i2ctransfer -f -y 0 w9@0x50 0x64 val1 val2 val3 r3 //如果设备地址不变,后面的设备地址可省略
```

-   -   -   -   1.  使用I2C-Tools操作传感器AP3216C

百问网的开发板上有光感芯片AP3216C：

![](../images/manual-352.png)

AP3216C是红外、光强、距离三合一的传感器，以读出光强、距离值为例，步骤如下：

-   复位：往寄存器0写入0x4
-   使能：往寄存器0写入0x3
-   读光强：读寄存器0xC、0xD得到2字节的光强
-   读距离：读寄存器0xE、0xF得到2字节的距离值

AP3216C的设备地址是0x1E，假设节在I2C BUS0上，操作命令如下：

-   使用SMBus协议

```bash
i2cset -f -y 0 0x1e 0 0x4
i2cset -f -y 0 0x1e 0 0x3
i2cget -f -y 0 0x1e 0xc w
i2cget -f -y 0 0x1e 0xe w
```

-   使用I2C协议

```bash
i2ctransfer -f -y 0 w2@0x1e 0 0x4
i2ctransfer -f -y 0 w2@0x1e 0 0x3
i2ctransfer -f -y 0 w1@0x1e 0xc r2
i2ctransfer -f -y 0 w1@0x1e 0xe r2
```

### 10.5.2 I2C-Tools访问I2C设备的2种方式

I2C-Tools可以通过SMBus来访问I2C设备，也可以使用一般的I2C协议来访问I2C设备。

使用一句话概括I2C传输：APP通过I2C Controller与I2C Device传输数据。

在APP里，有这几个问题：

1.  怎么指定I2C控制器？

-   i2c-dev.c为每个I2C控制器(I2C Bus、I2C Adapter)都生成一个设备节点：/dev/i2c-0、/dev/i2c-1等等；
-   open某个/dev/i2c-X节点，就是去访问该I2C控制器下的设备；

1.  怎么指定I2C设备？

通过ioctl指定I2C设备的地址

-   ioctl(file, I2C\_SLAVE, address)
    -   如果该设备已经有了对应的设备驱动程序，则返回失败。
-   ioctl(file, I2C\_SLAVE\_FORCE, address)
    -   如果该设备已经有了对应的设备驱动程序但是还是想通过i2c-dev驱动来访问它，则使用这个ioctl来指定I2C设备地址。

1.  怎么传输数据？

两种方式

-   一般的I2C方式：ioctl(file, I2C\_RDWR, &rdwr)
-   SMBus方式：ioctl(file, I2C\_SMBUS, &args)

### 10.5.3 源码流程分析

-   -   -   -   1.  使用I2C方式

示例代码：i2ctransfer.c

![](../images/manual-353.png)

图 10.33 I2C读写源码流程

-   -   -   -   1.  使用SMBus方式

示例代码：i2cget.c、i2cset.c

![](../images/manual-354.png)

图 10.34 SMBus读写源码流程

<a id="_Toc197788663"></a>
## 10.6 编写APP直接访问EEPROM

参考资料：

-   Linux驱动程序: drivers/i2c/i2c-dev.c
-   2C-Tools-4.2:

https://mirrors.edge.kernel.org/pub/software/utils/i2c-tools/

-   AT24cxx.pdf

### 10.6.1 硬件连接

IMX6ULL的I2C模块连接方法：

![](../images/manual-355.png)

图 10.35

### 10.6.2 AT24C02访问方法

-   -   -   -   1.  设备地址

从芯片手册上可以知道，AT24C02的设备地址跟它的A2、A1、A0引脚有关：

![](../images/manual-356.png)

图 10.36 AT24C02设备地址引脚配置

打开I2C模块的原理图：

开发板配套网盘资料\\04\_开发板原理图\\

04\_Extend\_modules\\通用模块\\eeprom.zip\\i2c\_eeprom\_module\_v1.0.pdf

![](../images/manual-357.png)

图 10.37

从原理图可知，A2A1A0都是0，所以AT24C02的设备地址是：0b1010000，即0x50。

-   -   -   -   1.  写数据

![](../images/manual-358.png)

图 10.38 AT24C02写数据时序

-   -   -   -   1.  读数据

可以读1个字节，也可以连续读出多个字节。连续读多个字节时，芯片内部的地址会自动累加。当地址到达存储空间最后一个地址时，会从0开始。

![](../images/manual-359.png)

图 10.39 AT24C02读数据时序

### 10.6.3 使用I2C-Tools的函数编程

I2C\_Tools上一小节已经讲解过，读者可自行学习编写程序。

### 10.6.4 编译

编译应用程序需要设置交叉编译工具链：vim ~/.bashrc

```bash
export ARCH=arm
export CROSS_COMPILE=arm-buildroot-linux-gnueabihf-
export PATH=$PATH:/home/book/100ask_imx6ull-sdk/ToolChain/arm-buildroot-linux-gnueabihf_sdk-buildroot/bin
```

-   -   -   -   1.  使用I2C-Tools的源码

01\_all\_series\_quickstart\\

04\_嵌入式Linux应用开发基础知识\\source\\15\_I2C\\01\_at24c02\_test

![](../images/manual-360.png)

图 10.40 测试源码

-   -   -   -   1.  编译

为IMX6ULL编译时，有如下错误：

![](../images/manual-361.png)

图 10.41 IMX6ULL编译I2C例程错误提示

这是因为IMX6ULL的工具链自带的include目录中，没有smbus.h，需要我们自己提供这个头文件，解决方法：

-   提供头文件：

![](../images/manual-362.png)

图 10.42 复制头文件

-   修改Makefile指定头文件目录

```
all:
$(CROSS_COMPILE)gcc -I ./include -o at24c02_test at24c02_test.c i2cbusses.c smbus.c
```

### 10.6.5 上机测试

先在Ubuntu上使用adb下载程序到开发板，执行如下命令：

```bash
Adb  push   at24c02_test   /bin
```

然后在开发板中执行程序：

```bash
[root@100ask:~]# at24c02_test 0 w www.100ask.net
[root@100ask:~]# at24c02_test 0 r
get data: www.100ask.net
```
