#  14 CAN编程

## 14.1 CAN介绍

### 14.1.1 CAN是什么？

​		CAN，全称为“Controller Area Network”，即控制器局域网，是国际上应用最广泛的现场总线之一。

最初，CAN 被设计作为汽车环境中的微控制器通讯，在车载各电子控制装置 ECU 之间交换信息，形成汽车 

电子控制网络。比如：发动机管理系统、变速箱控制器、仪表装备、电子主干系统中，均嵌入 CAN 控制装 

置。 

​		一个由 CAN 总线构成的单一网络中，理论上可以挂接无数个节点。实际应用中，节点数目受网络硬件 

的电气特性所限制。例如，当使用 Philips P82C250 作为 CAN 收发器时，同一网络中允许挂接 110 个节点。 

CAN 可提供高达 1Mbit/s 的数据传输速率，这使实时控制变得非常容易。另外，硬件的错误检定特性也增

强了 CAN 的抗电磁干扰能力。

### 14.1.2 CAN的起源

​		CAN 最初出现在 80 年代末的汽车工业中，由德国 Bosch 公司最先提出。当时，由于消费者对于汽车功

能的要求越来越多，而这些功能的实现大多是基于电子操作的，这就使得电子装置之间的通讯越来越复杂，

同时意味着需要更多的连接信号线。提出 CAN 总线的最初动机就是为了解决现代汽车中庞大的电子控制装 

置之间的通讯，减少不断增加的信号线。于是，他们设计了一个单一的网络总线，所有的外围器件可以被

挂接在该总线上。1993 年，CAN 已成为国际标准 ISO11898(高速应用)和 ISO11519（低速应用）。 

CAN 是一种多主方式的串行通讯总线，基本设计规范要求有高的位速率，高抗电磁干扰性，而且能够检

测出产生的任何错误。当信号传输距离达到 10Km 时，CAN 仍可提供高达 50Kbit/s 的数据传输速率。

由于 CAN 总线具有很高的实时性能，因此，CAN 已经在汽车工业、航空工业、工业控制、安全防护等领 

域中得到了广泛应用。

### 14.1.3 CAN传输模型

​		CAN 通讯协议主要描述设备之间的信息传递方式。CAN 层的定义与开放系统互连模型（OSI）一致。每 

一层与另一设备上相同的那一层通讯。实际的通讯发生在每一设备上相邻的两层，而设备只通过模型物理

层的物理介质互连。CAN 的规范定义了模型的最下面两层：数据链路层和物理层。下表中展示了 OSI 开放 

式互连模型的各层。应用层协议可以由 CAN 用户定义成适合特别工业领域的任何方案。已在工业控制和制 

造业领域得到广泛应用的标准是 DeviceNet，这是为 PLC 和智能传感器设计的。在汽车工业，许多制造商 

都应用他们自己的标准。 

| 表格 OSI开发系统互联模型         |            |                                                      |
| ------- | -------- | -------------------------------------------------- |
| **序号** | **层次** | **描述**                                           |
| 7        | 应用层    | 最高层。用户、软件、网络终端等之间用来进行信息交换。       |
| 6        | 表示层    | 将两个应用不同数据格式的系统信息转化为能共同理解的格式       |
| 5        | 会话层    | 依靠低层的通信功能来进行数据的有效传递。                 |
| 4        | 传输层    | 两通讯节点之间数据传输控制。操作如：数据重发，数据错误修复   |
| 3        | 网络层    | 规定了网络连接的建立、维持和拆除的协议。如：路由和寻址       |
| 2        | 数据链路层 | 规定了在介质上传输的数据位的排列和组织。如：数据校验和帧结构 |
| 1        | 物理层    | 规定通讯介质的物理特性。如：电气特性和信号交换的解释       |

​		虽然CAN传输协议参考了OSI 七层模型，但是实际上CAN协议只定义了两层“物理层”和“数据链路层”，因此出现了各种不同的“应用层”协议，比如用在自动化技术的现场总线标准DeviceNet，用于工业控制的CanOpen,用于乘用车的诊断协议OBD、UDS(统一诊断服务，ISO14229)，用于商用车的CAN总线协议SAEJ1939.

| **表格 CAN的** |            |                                                              |
| -------------- | ---------- | ------------------------------------------------------------ |
| **序号**       | **层次**   | **描述**                                                     |
| 7              | 应用层     | 主要定义CAN应用层。                                          |
| 2 | 数据链路层 | 数据链路层分为逻辑链接控制子层LLC和介质访问控制子层MAC。MAC 子层是 CAN 协议的核心。它把接收到的报文提供给  LLC 子层，并接收来自 LLC 子层的报文。 MAC 子层负责报文分帧、仲裁、应答、错误检测和标定。MAC 子层也被称作故障界定的管理 实体监管  LLC 子层涉及报文滤波、过载通知、以及恢复管理。`LLC = Logical Link  Control   MAC = Medium Access  Control` |
| 1              | 物理层     | 物理层，为物理编码子层PCS.  该层定义信号是如何实际地传输的，因此涉及到位时间、位编码、同步。 |

### 14.1.4 CAN网络拓扑

​		CAN总线是一种分布式的控制总线。

​		CAN总线作为一种控制器局域网，和普通以太网一样，它的网络很多CAN节点构成。

其网络拓扑结构如下图所示：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0001.png)

​		CAN网络的每个节点非常简单，均由一个MCU（微控制器）、一个CAN控制器和一个CAN收发器构成，然后使用双绞线连接到CAN网络中。

### 14.1.5 CAN物理特性

​		CAN总线遵循国际标准ISO11898，如ISO11898-1,ISO11898-2,ISO11898-3,ISO11898-4标准。

| 序号 | 标准       | 描述                     |
| ---- | ---------- | ------------------------ |
| 1    | ISO11898-1 | 数据链路层和物理层信号   |
| 2    | ISO11898-2 | 高速接入单元             |
| 3    | ISO11898-3 | 低速容错接入单元         |
| 4    | ISO11898-4 | 时间触发通讯             |
| 5    | ISO11898-5 | 低功耗的接入单元         |
| 6    | ISO11898-6 | 选择性唤醒的高速接入单元 |

CAN 能够使用多种物理介质，例如双绞线、光纤等。最常用的就是双绞线。

信号使用差分电压传送，两条信号线被称为“CAN_H”和“CAN_L”。

静态时CAN_H和CAN_L均是 2.5V 左右，此时状态表示为逻辑“1”，也可以叫做 “隐性”。

用 CAN_H 比 CAN_L 高表示逻辑“0”，称为“显形”，此时，通常电压值为：CAN_H = 3.5V 和 CAN_L 

= 1.5V 。



目前实际常用的CAN收发器有如下几种型号：

| 序号 | 型号      | 描述            |
| ---- | --------- | --------------- |
| 1    | PCA82C250 | 高速 CAN 收发器 |
| 2    | PCA82C251 | 高速 CAN 收发器 |
| 3    | PCA82C252 | 容错 CAN 收发器 |
| 4    | TJA1040   | 高速 CAN 收发器 |
| 5    | TJA1041   | 高速 CAN 收发器 |
| 6    | TJA1042   | 高速 CAN 收发器 |
| 7    | TJA1043   | 高速 CAN 收发器 |
| 8    | TJA1050   | 高速 CAN 收发器 |
| 9    | TJA1053   | 容错 CAN 收发器 |
| 10   | TJA1054   | 容错 CAN 收发器 |



目前实际常用的CAN控制器有如下几种型号：

| 序号 | 型号          | 描述                                                         |
| ---- | ------------- | ------------------------------------------------------------ |
| 1    | SJA1000       | 独立CAN控制器                                                |
| 2    | MCU内部控制器 | 目前市面上如STM32系列，S32K系列，IMX6系列等等很多单片机均内部集成了CAN控制。 |

### 14.1.6 CAN报文帧

#### 14.1.6.1 CAN报文格式

标准 CAN 的标志符长度是 11 位，而扩展格式 CAN 的标志符长度可达 29 位。

CAN 协议的 2.0A 版本 规定 CAN 控制器必须有一个 11 位的标志符。

同时，在 2.0B 版本中规定，CAN 控制器的标志符长度可以是 11 位或 29 位。

遵循 CAN2.0B 协议的 CAN 控制器可以发送和接收 11 位标识符的标准格式报文或 29 位标识符的扩展格式报文。

| **标准帧&扩展帧对比** |             |                       |
| --------------------- | ----------- | --------------------- |
| **帧格式**            | **标准帧**  | **扩展帧**            |
| 规范                  | CAN2.0A     | CAN2.0B               |
| CAN ID（标识符）长度  | 11 bits     | 29 bits               |
| CAN ID（标识符）范围  | 0x000~0x7FF | 0x00000000~0x1FFFFFFF |

#### 14.1.6.2 CAN报文帧类型

CAN报文类型又分如5种帧类型：

数据帧：主要用于发送方向接收方传输数据的帧；

遥控帧：主要用于接收方向具有相同ID的发送方请求数据的帧；

错误帧：主要用于当检测出错误时向其他节点通知错误的帧。

过载帧：主要用于接收方通知其他尚未做好接收准备的帧。

间隔帧：主要用于将数据帧及遥控帧与前一帧分隔开来的帧。


其中数据帧是使用最多的帧类型，这里重点介绍以下数据帧。
数据帧如下图所示：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0002.jpeg)

由上图所示，数据帧包括：
（1）帧起始。表示数据帧开始的段。

（2）仲裁段。表示该帧优先级的段。

（3）控制段。表示数据的字节数及保留位的段。

（4）数据段。数据的内容，一帧可发送0~8个字节的数据。

（5）CRC段。检查帧的传输错误的段。

（6）ACK段。表示确认正常接收的段。

（7）帧结束。表示数据帧结束的段。

具体介绍可以查看”CAN2.0A”、”CAN2.0B”详细介绍。

 

我们主要关注我们编程所需要关注的几个段：

ID: CAN报文ID；

IDE: 为0是标准帧，为1是扩展帧；

RTR: 为0是数据帧，为1是远程帧；

DLC: CAN报文数据长度，范围0~8字节；

Data：数据，0~8个字节；



## 14.2 CAN编程框架创建

当前我们所学习的是应用编程，为了以后CAN编程框架的通用性和可移植性，我们创建一个抽象的CAN应用编程框架，此框架可以适用于单片机应用编程，也可以适用于linux应用编程。

 

因此，根据CAN总线编程的通用属性，我们抽象出如下属性：

| 属性          | 属性描述                                                     | 说明 |
| ------------- | ------------------------------------------------------------ | ---- |
| CAN端口号     | 描述CAN端口，如CAN1,CAN2,CAN3,与具体硬件外设有关。           |      |
| CAN收发器配置 | 描述CAN收发器模式设置，收发器模式有Normal，Stanby，Sleep，ListenOnly等模式；  本章节所使用的收发器是硬件默认配置，因此不需要配置。 |      |
| CAN控制器配置 | 描述CAN收发器配置，如CAN波特率配置，采样率设置，过滤器设置等； |      |
| CAN中断配置   | 描述CAN中断接收函数配置                                      |      |
| 读取CAN报文   | 描述CAN读取报文实现                                          |      |
| 发送CAN报文   | 描述CAN发送报文实现                                          |      |

根据上面表格所描述的属性，创建CAN应用编程框架如下：

```c
typedef struct _CAN_COMM_STRUCT
{
    /* CAN硬件名称 */
    char name[10];
    /* CAN端口号，裸机里为端口号;linux应用里作为socket套接口 */
    int  can_port;                                
    /* CAN控制器配置函数，返回端口号赋值给can_port */
    int  (*can_set_controller)( void );                  
    /* CAN接口中断创建，在linux中对应创建接收线程 */
    void (*can_set_interrput)( int can_port , pCanInterrupt callback );             
    /* CAN读取报文接口 */
    void (*can_read)( int can_port , CanRxMsg* recv_msg);   
    /* CAN发送报文接口*/
    void (*can_write)( int can_port , CanTxMsg send_msg);   
}CAN_COMM_STRUCT, *pCAN_COMM_STRUCT;
```

此框架可以用类比套用在单片机上，也可以使用在linux socketcan应用编程上。

## 14.3 STM32 CAN应用编程

本节主要使用14.2中的应用编程框架，在单片机上试验框架的可行性，以一个基本的接收和发送的案例来做讲解；

### 14.3.1 STM32 CAN接口电路

如下图所示，为本章STM32例程所使用的开发板STM32最小系统和CAN收发器接口电路。

![图14.3.1-1 STM32F407最小系统](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0003.png)


![图14.3.1-1 TJA1050 CAN收发器接口电路](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0004.png)


### 14.3.2 STM32 CAN应用编程步骤

下面我们按照CAN通信的编程框架来一步一步实现基于STM32的CAN应用编程。

STM32 CAN应用编程，步骤如下：

#### **14.3.2.1** **准备STM32工程模版**

请参见第14章节代码“01_stm32f407_can”例程；

所使用的开发环境为：MDK 5.24.

打开MDK工程后，如下图所示：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0005.png)

上图中目录CMSIS, STM32F407_LIB，main均为STM32运行的基础框架。

目录app_can为CAN应用编程所需要的文件。

#### **14.3.2.2** **编写CAN抽象框架的实现函数**



**（1）定义CAN端口号**

见第14章节代码“01_stm32f407_can_addline”中“can_controller.h”文件。

主要根据STM32硬件的CAN有多路，依次定义为CAN_PORTCAN1, CAN_PORT_CAN2等，从“14.3.1 STM32 CAN接口电路”可知道，当前使用的CAN1.

```c
25 /* CAN端口号定义*/
26 enum
27 {
28     CAN_PORT_NONE = 0,
29     CAN_PORT_CAN1,
30     CAN_PORT_CAN2,
31     CAN_PORT_MAX
32 };
```

**（2）配置CAN控制器**

配置CAN控制器有3个部分：GPIO(CAN_TX,CAN_RX管脚）配置，CAN波特率配置，CAN过滤器配置。

见第14章节代码“01_stm32f407_can_addline”中“can_controller.c”文件int CAN_Set_Controller( void )函数。

 

**A.GPIO(CAN_TX,CAN_RX管脚）配置**

配置GPIO代码如下：

```c
96     /*************************************************************/
97     /*CAN相关GPIO配置，此处为：CAN_TX, CAN_RX*/
98
99     /*使能GPIO时钟*/
100     RCC_AHB1PeriphClockCmd(RCC_AHB1Periph_GPIOD, ENABLE);
101     /*初始化管脚配置*/
102     GPIO_InitStructure.GPIO_Pin     = GPIO_Pin_0 ;
103     GPIO_InitStructure.GPIO_Mode    = GPIO_Mode_AF;
104     GPIO_InitStructure.GPIO_Speed   = GPIO_Speed_50MHz;
105     GPIO_InitStructure.GPIO_OType   = GPIO_OType_PP;
106     GPIO_InitStructure.GPIO_PuPd    = GPIO_PuPd_UP;
107     GPIO_Init(GPIOD, &GPIO_InitStructure);
108
109     GPIO_InitStructure.GPIO_Pin     = GPIO_Pin_1;
110     GPIO_InitStructure.GPIO_Mode    = GPIO_Mode_AF;
111     GPIO_InitStructure.GPIO_Speed   = GPIO_Speed_50MHz;
112     GPIO_InitStructure.GPIO_OType   = GPIO_OType_PP;
113     GPIO_InitStructure.GPIO_PuPd    = GPIO_PuPd_UP;
114     GPIO_Init(GPIOD, &GPIO_InitStructure);
115     /*将GPIO设置为CAN复用模式*/
116     GPIO_PinAFConfig(GPIOD, GPIO_PinSource0, GPIO_AF_CAN1);
117     GPIO_PinAFConfig(GPIOD, GPIO_PinSource1, GPIO_AF_CAN1);
```

**B.配置波特率，工作模式**

按照如下代码，使能CAN外设，设置CAN工作模式为Normal，设置波特率为500kbps。

```c
119     /*************************************************************/
120     /*CAN控制器相关配置，此处为波特率，采样率等*/
121
122     /* 使能CAN时钟 */
123     RCC_APB1PeriphClockCmd(RCC_APB1Periph_CAN1, ENABLE);
124
125     /* 初始化CAN控制器工作模式*/
126     CAN_DeInit(CAN1);
127     CAN_StructInit(&CAN_InitStructure);
128     CAN_InitStructure.CAN_TTCM = DISABLE;
129     CAN_InitStructure.CAN_ABOM = DISABLE;
130     CAN_InitStructure.CAN_AWUM = DISABLE;
131     CAN_InitStructure.CAN_NART = DISABLE;
132     CAN_InitStructure.CAN_RFLM = DISABLE;
133     CAN_InitStructure.CAN_TXFP = DISABLE;
134     CAN_InitStructure.CAN_Mode = CAN_Mode_Normal;//CAN工作模式
135
136     /* 初始化CAN波特率 */
137     CAN_Baud_Process(500,&CAN_InitStructure);
138     CAN_Init(CAN1, &CAN_InitStructure);
```

其中配置波特率的函数是一个自定义函数，这里可以不了解，只需要知道是配置波特率即可，如果需要使用本章代码，可以查看具体的源码工程。

 

**C.** **配置CAN过滤器**

如下代码为配置过滤器：

```c
141     /*************************************************************/
142     /* 初始化CAN过滤器 */
143     CAN_FilterInitStructure.CAN_FilterNumber = 0;                       /* CAN1滤波器号从0到13 */
144     CAN_FilterInitStructure.CAN_FilterMode = CAN_FilterMode_IdMask;     /* 滤波屏蔽模式 */
145     CAN_FilterInitStructure.CAN_FilterScale = CAN_FilterScale_32bit;
146     CAN_FilterInitStructure.CAN_FilterIdHigh = 0x0000;
147     CAN_FilterInitStructure.CAN_FilterIdLow = 0x0000;
148     CAN_FilterInitStructure.CAN_FilterMaskIdHigh = 0x0000;      /* 不屏蔽任何ID */
149     CAN_FilterInitStructure.CAN_FilterMaskIdLow = 0x0000;           /* 不屏蔽任何ID */
150     CAN_FilterInitStructure.CAN_FilterFIFOAssignment = 0;
151
152     CAN_FilterInitStructure.CAN_FilterActivation = ENABLE;
153     CAN_FilterInit(&CAN_FilterInitStructure);
154
155     /*************************************************************/
156     /* 设置完CAN后，返回当前设置的CAN的端口号，此处主要类比linux socketcan中的套接口 */
```

此处我们设置过滤器不屏蔽任何报文ID，这里只是了解单片机下的一些过程。

 

**（3）配置CAN接收中断**

CAN总线支持发送中断和接收中断，此处仅仅使用了接收中断。

见第14章节代码“01_stm32f407_can_addline”中“can_controller.c”文件void CAN_Set_Interrupt(int can_port, pCanInterrupt callback)函数。

CAN中断配置代码如下：

```c
163 /**********************************************************************
164 * 函数名称： void CAN_Set_Interrupt(int can_port,  pCanInterrupt callback)
165 * 功能描述： 使能CAN中断处理，并传入应用的的回调函数，回调函数主要处理应用层的功能
166 * 输入参数： can_port,端口号
167 *            callback： 中断具体处理应用功能的回调函数
168 * 输出参数： 无
169 * 返 回 值： 无
170 * 修改日期             版本号        修改人           修改内容
171 * -----------------------------------------------
172 * 2020/05/13         V1.0             bert            创建
173 ***********************************************************************/
174 void CAN_Set_Interrupt(int can_port,  pCanInterrupt callback)
175 {
176     NVIC_InitTypeDef NVIC_InitStructure;
177
178     /* 根据CAN端口号配置中断 */
179     switch( can_port )
180     {
181         case CAN_PORT_CAN1:
182         {
183             /* 初始化回调接口函数 */
184             if ( NULL != callback )
185             {
186                 g_pCanInterrupt = callback;
187             }
188
189             /* 使用CAN0_RX中断，在linux socket can中类似创建接收线程 */
190             NVIC_InitStructure.NVIC_IRQChannel = CAN1_RX0_IRQn;
191             NVIC_PriorityGroupConfig(NVIC_PriorityGroup_4);
192             NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 0;
193             NVIC_InitStructure.NVIC_IRQChannelSubPriority = 0;
194             NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE;
195             NVIC_Init(&NVIC_InitStructure);
196             CAN_ITConfig(CAN1, CAN_IT_FMP0, ENABLE);
197         }
198         break;
199
200         default:
201             break;
202
203     }
204     return ;
205 }
```

CAN接收中断函数如下：

```c
275 /**********************************************************************
276 * 函数名称： void CAN1_RX0_IRQHandler(void)
277 * 功能描述： CAN接收中断函数
278 * 输入参数： 无
279 * 输出参数： 无
280 * 返 回 值： 无
281 * 修改日期             版本号        修改人           修改内容
282 * -----------------------------------------------
283 * 2020/05/13         V1.0             bert            创建
284 ***********************************************************************/
285 void CAN1_RX0_IRQHandler(void)
286 {
287     /* 如果回调函数存在，则执行回调函数 */
288     if( g_pCanInterrupt != NULL)
289     {
290         g_pCanInterrupt();
291     }
292
293     /* 清除挂起中断 */
294     CAN_ClearITPendingBit(CAN1,CAN_IT_FMP0);
295 }
```

此处CAN中断通过回调函数g_pCanInterrupt()函数将应用层需要的代码分层到应用层，此处为驱动部分通用接口。

 

**（4）CAN报文读取函数**

当CAN接收中断产生，通过CAN报文读取函数从FIFO中读取已经接收到的CAN报文。

见第14章节代码“01_stm32f407_can_addline”中“can_controller.c”文件void CAN_Read(int can_port, CanRxMsg* recv_msg)函数。

CAN报文读取函数如下：

```c
208 /**********************************************************************
209 * 函数名称： void CAN_Read(int can_port, CanRxMsg* recv_msg)
210 * 功能描述： CAN读取接收寄存器，取出接收到的报文
211 * 输入参数： can_port,端口号
212 * 输出参数： recv_msg：接收报文
213 * 返 回 值： 无
214 * 修改日期             版本号        修改人           修改内容
215 * -----------------------------------------------
216 * 2020/05/13         V1.0             bert            创建
217 ***********************************************************************/
218 void CAN_Read(int can_port, CanRxMsg* recv_msg)
219 {
220     switch( can_port )
221     {
222         case CAN_PORT_CAN1:
223         {
224             /* 从FIFO中读取CAN报文 */
225             CAN_Receive(CAN1,CAN_FIFO0, recv_msg);
226         }
227         break;
228
229         default:
230             break;
231     }
232     return ;
233 }
```

**（5）CAN报文发送函数**

当需要发送CAN报文时，通过向CAN发送邮箱填充数据，启动发送报文。

见第14章节代码“01_stm32f407_can_addline”中“can_controller.c”文件void CAN_Write(int can_port, CanTxMsg send_msg)函数。

CAN报文读取函数如下：

```c
235 /**********************************************************************
236 * 函数名称： void CAN_Write(int can_port, CanTxMsg send_msg)
237 * 功能描述： CAN报文发送接口，调用发送寄存器发送报文
238 * 输入参数： can_port,端口号
239 * 输出参数： send_msg：发送报文
240 * 返 回 值： 无
241 * 修改日期             版本号        修改人           修改内容
242 * -----------------------------------------------
243 * 2020/05/13         V1.0             bert            创建
244 ***********************************************************************/
245 void CAN_Write(int can_port, CanTxMsg send_msg)
246 {
247     unsigned char i;
248     uint8_t transmit_mailbox = 0;
249     CanTxMsg TxMessage;
250
251     switch( can_port )
252     {
253         case CAN_PORT_CAN1:
254         {
255             TxMessage.StdId = send_msg.StdId;     // 标准标识符为0x000~0x7FF
256             TxMessage.ExtId = 0x0000;             // 扩展标识符0x0000
257             TxMessage.IDE   = CAN_ID_STD;         // 使用标准标识符
258             TxMessage.RTR   = CAN_RTR_DATA;       // 设置为数据帧
259             TxMessage.DLC   = send_msg.DLC;       // 数据长度, can报文规定最大的数据长度为8字节
260
261             for(i=0; i<TxMessage.DLC; i++)
262             {
263                 TxMessage.Data[i] = send_msg.Data[i];
264             }
265             transmit_mailbox = CAN_Transmit(CAN1,&TxMessage);  /* 返回这个信息请求发送的邮箱号0,1,2或没有邮箱申请发送no_box */
266         }
267         break;
268
269         default:
270             break;
271     }
272     return ;
273 }
```

**（6）CAN抽象结构体框架初始化**

定义一个can1通信结构实例CAN_COMM_STRUCT can1_controller；

使用（1）~（5）步骤实现的函数，初始化can1_controller，构成与应用层关联的一个连接点。

```c
298 /**********************************************************************
299 * 名称：     can1_controller
300 * 功能描述： CAN1结构体初始化
301 * 修改日期             版本号        修改人           修改内容
302 * -----------------------------------------------
303 * 2020/05/13         V1.0             bert            创建
304 ***********************************************************************/
305 CAN_COMM_STRUCT can1_controller = {
306     .name                   = "can0",
307     .can_port               = CAN_PORT_CAN1,
308     .can_set_controller     = CAN_Set_Controller,
309     .can_set_interrput      = CAN_Set_Interrupt,
310     .can_read               = CAN_Read,
311     .can_write              = CAN_Write,
312 };
```

#### **14.3.2.3** **编写CAN应用层代码**

根据14.3.2.2 已经将具体的CAN硬件操作已经实现，并且已经抽象实例化了CAN编程框架。

但是我们现在还没关联到应用层，应用层并不知道调用哪个接口。

 

**（1）CAN应用层注册实例**

在应用层编写一个通用的实例化注册函数。

见第14章节代码“01_stm32f407_can_addline”中“app_can.c”文件int register_can_controller(const pCAN_COMM_STRUCT p_can_controller)函数。

代码实现如下：

```c
62 /**********************************************************************
63 * 函数名称： int register_can_controller(const pCAN_COMM_STRUCT p_can_controller)
64 * 功能描述： 应用层进行CAN1结构体注册
65 * 输入参数： p_can_controller，CAN控制器抽象结构体
66 * 输出参数： 无
67 * 返 回 值： 无
68 * 修改日期             版本号        修改人           修改内容
69 * -----------------------------------------------
70 * 2020/05/13         V1.0             bert            创建
71 ***********************************************************************/
72 int register_can_controller(const pCAN_COMM_STRUCT p_can_controller)
73 {
74     /* 判断传入的p_can_controller为非空，目的是确认这个结构体是实体*/
75     if( p_can_controller != NULL )
76     {
77         /* 将传入的参数p_can_controller赋值给应用层结构体gCAN_COMM_STRUCT */
78
79         /*端口号，类比socketcan套接口*/
80         gCAN_COMM_STRUCT.can_port              = p_can_controller->can_port;
81         /*CAN控制器配置函数*/
82         gCAN_COMM_STRUCT.can_set_controller    = p_can_controller->can_set_controller;
83         /*CAN中断配置*/
84         gCAN_COMM_STRUCT.can_set_interrput     = p_can_controller->can_set_interrput;
85         /*CAN报文读函数*/
86         gCAN_COMM_STRUCT.can_read              = p_can_controller->can_read;
87         /*CAN报文发送函数*/
88         gCAN_COMM_STRUCT.can_write             = p_can_controller->can_write;
89         return 1;
90     }
91      return 0;
92 }
```

然后通过调用register_can_controller( &can1_controller );将实例can1_controller注册给应用的4 static CAN_COMM_STRUCT gCAN_COMM_STRUCT;

之后应用层只需要调用应用层自己的gCAN_COMM_STRUCT实例即可操作CAN通信功能。

```c
315 /**********************************************************************
316 * 函数名称： void CAN1_contoller_add(void)
317 * 功能描述： CAN结构体注册接口，应用层在使用can1_controller前调用
318 * 输入参数： 无
319 * 输出参数： 无
320 * 返 回 值： 无
321 * 修改日期             版本号        修改人           修改内容
322 * -----------------------------------------------
323 * 2020/05/13         V1.0             bert            创建
324 ***********************************************************************/
325 void CAN1_contoller_add(void)
326 {
327     /*将can1_controller传递给应用层*/
328     register_can_controller( &can1_controller );
329 }
```

**（2）CAN应用层初始化**

CAN应用层初始化代码如下；

```c
94 /**********************************************************************
95 * 函数名称： void app_can_init(void)
96 * 功能描述： CAN应用层初始化
97 * 输入参数： 无
98 * 输出参数： 无
99 * 返 回 值： 无
100 * 修改日期             版本号        修改人           修改内容
101 * -----------------------------------------------
102 * 2020/05/13         V1.0             bert            创建
103 ***********************************************************************/
104 void app_can_init(void)
105 {
106     /**
107     * 应用层进行CAN1结构体注册
108     */
109     CAN1_contoller_add();
110
111     /*
112     *调用can_set_controller进行CAN控制器配置，
113     *返回can_port，类比linux socketcan中的套接口，单片机例程中作为自定义CAN通道
114     */
115     gCAN_COMM_STRUCT.can_port = gCAN_COMM_STRUCT.can_set_controller();
116     /**
117     * 调用can_set_interrput配置CAN接收中断，类比socketcan中的接收线程
118     */
119     gCAN_COMM_STRUCT.can_set_interrput( gCAN_COMM_STRUCT.can_port, CAN_RX_IRQHandler_Callback );
120 }
```

**（3）设计一个简单的周期发送报文功能**

CAN周期发送报文的功能代码实现如下：

```c
123 /**********************************************************************
124 * 函数名称： void app_can_tx_test(void)
125 * 功能描述： CAN应用层报文发送函数，用于测试周期发送报文
126 * 输入参数： 无
127 * 输出参数： 无
128 * 返 回 值： 无
129 * 修改日期             版本号        修改人           修改内容
130 * -----------------------------------------------
131 * 2020/05/13         V1.0             bert            创建
132 ***********************************************************************/
133 void app_can_tx_test(void)
134 {
135     // 以10ms为基准，运行CAN测试程序
136
137     unsigned char i=0;
138
139     /* 发送报文定义 */
140     CanTxMsg TxMessage;
141
142     /* 发送报文中用一个字节来作为计数器 */
143     static unsigned char tx_counter = 0;
144
145     /* 以10ms为基准，通过timer计数器设置该处理函数后面运行代码的周期为1秒钟*/
146     static unsigned int timer =0;
147     if(timer++>100)
148     {
149         timer = 0;
150     }
151     else
152     {
153         return ;
154     }
155
156     /* 发送报文报文数据填充，此报文周期是1秒 */
157     TxMessage.StdId = TX_CAN_ID;          /* 标准标识符为0x000~0x7FF */
158     TxMessage.ExtId = 0x0000;             /* 扩展标识符0x0000 */
159     TxMessage.IDE   = CAN_ID_STD;         /* 使用标准标识符 */
160     TxMessage.RTR   = CAN_RTR_DATA;       /* 设置为数据帧  */
161     TxMessage.DLC   = 8;                  /* 数据长度, can报文规定最大的数据长度为8字节 */
162
163     /* 填充数据，此处可以根据实际应用填充 */
164     TxMessage.Data[0] = tx_counter++;       /* 用来识别报文发送计数器 */
165     for(i=1; i<TxMessage.DLC; i++)
166     {
167         TxMessage.Data[i] = i;
168     }
169
170     /*  调用can_write发送CAN报文 */
171     gCAN_COMM_STRUCT.can_write(gCAN_COMM_STRUCT.can_port, TxMessage);
172
173 }
```

**（4）设计一个简单的接收报文功能**

```c
220 /**********************************************************************
221 * 函数名称： void CAN_RX_IRQHandler_Callback(void)
222 * 功能描述： CAN1接收中断函数；在linux中可以类比用线程，或定时器去读CAN数据
223 * 输入参数： 无
224 * 输出参数： 无
225 * 返 回 值： 无
226 * 修改日期             版本号        修改人           修改内容
227 * -----------------------------------------------
228 * 2020/05/13         V1.0             bert            创建
229 ***********************************************************************/
230 void CAN_RX_IRQHandler_Callback(void)
231 {
232     /* 接收报文定义 */
233     CanRxMsg RxMessage;
234
235     /* 接收报文清零 */
236     memset( &RxMessage, 0, sizeof(CanRxMsg) );
237
238     /* 通过can_read接口读取寄存器已经接收到的报文 */
239     gCAN_COMM_STRUCT.can_read(gCAN_COMM_STRUCT.can_port, &RxMessage);
240
241     /* 将读取到的CAN报文存拷贝到全局报文结构体g_CAN1_Rx_Message */
242     memcpy(&g_CAN1_Rx_Message, &RxMessage, sizeof( CanRxMsg ) );
243
244     /* 设置当前接收完成标志，判断当前接收报文ID为RX_CAN_ID，则设置g_CAN1_Rx_Flag=1*/
245     if( g_CAN1_Rx_Message.StdId == RX_CAN_ID )
246     {
247         g_CAN1_Rx_Flag = 1;
248     }
249 }
```

```c
176 /**********************************************************************
177 * 函数名称： void app_can_rx_test(void)
178 * 功能描述： CAN应用层接收报文处理函数，用于处理中断函数中接收的报文
179 * 输入参数： 无
180 * 输出参数： 无
181 * 返 回 值： 无
182 * 修改日期             版本号        修改人           修改内容
183 * -----------------------------------------------
184 * 2020/05/13         V1.0             bert            创建
185 ***********************************************************************/
186 void app_can_rx_test(void)
187 {
188     unsigned char i=0;
189
190     /* 发送报文定义 */
191     CanTxMsg TxMessage;
192
193     /* 发送报文中用一个字节来作为计数器 */
194     static unsigned char rx_counter = 0;
195
196
197     if( g_CAN1_Rx_Flag == 1)
198     {
199         g_CAN1_Rx_Flag = 0;
200
201         /* 发送报文报文数据填充，此报文周期是1秒 */
202         TxMessage.StdId = RX_TO_TX_CAN_ID;    /* 标准标识符为0x000~0x7FF */
203         TxMessage.ExtId = 0x0000;             /* 扩展标识符0x0000 */
204         TxMessage.IDE   = CAN_ID_STD;         /* 使用标准标识符 */
205         TxMessage.RTR   = CAN_RTR_DATA;       /* 设置为数据帧  */
206         TxMessage.DLC   = 8;                  /* 数据长度, can报文规定最大的数据长度为8字节 */
207
208         /* 填充数据，此处可以根据实际应用填充 */
209         TxMessage.Data[0] = rx_counter++;      /* 用来识别报文发送计数器 */
210         for(i=1; i<TxMessage.DLC; i++)
211         {
212             TxMessage.Data[i] = g_CAN1_Rx_Message.Data[i];
213         }
214
215         /*  调用can_write发送CAN报文 */
216         gCAN_COMM_STRUCT.can_write(gCAN_COMM_STRUCT.can_port, TxMessage);
217     }
218 }
```

#### **14.3.2.4 STM32 CAN案例测试**

在前面几个章节将代码编写完成之后，我们做个测试；

测试工具使用的是：英特蓓斯的Valuecan3(CAN协议盒)，Vehicle Vspy3（电脑端软件）。

也可以在淘宝上购买便宜的USB转CAN的工具即可。

 

测试步骤如下：

Step1：将已经完成的STM32 CAN测试程序下载到实际开发板上；

Step2：通过CAN测试工具Vehicle Vspy3发送报文ID为0X201的报文；

Step3：观察CAN测试软件显示如下：

报文ID为0x101的报文是按照1秒周期进行发送，如图14.3.2.4-1。

报文ID为0x201的报文是Vehicle Spy3按照周期500ms发送给STM32开发板，如图14.3.2.4-1

报文ID为0x301的报文是在接收到报文ID为0x201的报文后，然后转发出报文ID为0x301的报文，如图14.3.2.4-2。

![图14.3.2.4-1 报文发送结果查看](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0006.png)


![图14.3.2.4-2 报文接收情况查看](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0007.png)


## **14.4 Linux socketcan基础应用编程**

### **14.4.1 socketcan概述**

​		socketcan是在Linux下CAN协议(Controller Area Network)实现的一种实现方法。 CAN是一种在世界范围内广泛用于自动控制、嵌入式设备和汽车领域的网络技术。Linux下最早使用CAN的方法是基于字符设备来实现的，与之不同的是Socket CAN使用伯克利的socket接口和linux网络协议栈，这种方法使得can设备驱动可以通过网络接口来调用。Socket CAN的接口被设计的尽量接近TCP/IP的协议，让那些熟悉网络编程的程序员能够比较容易的学习和使用。

​		使用Socket CAN的主要目的就是为用户空间的应用程序提供基于Linux网络层的套接字接口。与广为人知的TCP/IP协议以及以太网不同，CAN总线没有类似以太网的MAC层地址，只能用于广播。CAN ID仅仅用来进行总线的仲裁。因此CAN ID在总线上必须是唯一的。当设计一个CAN-ECU(Electronic Control Unit 电子控制单元）网络的时候，CAN报文ID可以映射到具体的ECU。因此CAN报文ID可以当作发送源的地址来使用。

### **14.4.2 socketcan基本知识点**

​		在“14.3 STM32 CAN应用编程”中我们已经完整的构建了CAN应用编程框架，但是在linux应用编程中，操作CAN底层驱动与STM32思路上相似，但是操作方法或者说调用的接口还是差异很大的，因为STM32是直接调用的SDK包或直接操作寄存器，但是linux系统是需要通过调用系统命令或linuxCAN驱动来实现物理层的操作。

因此这里我们重点介绍linux上的一些系统调用命令，和一些socketcan相关的概念。

#### **14.4.2.1 CAN设备操作**

​		CAN设备有开启、关闭、设置参数3个功能。因为linux下CAN设备是模拟网络操作的方式，这里CAN设备的开启、关闭和设置，均通过ip命令来操作。

​		在100ask_IMX6ULL开发板上打开串口，使用“ifconfig -a”查看所有的网络节点，发现第1个节点就是“can0”。

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0008.png)

（1）Linux CAN设备开启：

```c
#define ip_cmd_open      "ifconfig can0 up"     /* 打开CAN0 */
```

说明：can0：can设备名；

up： 打开设备命令

（2）Linux CAN设备关闭：

```c
#define ip_cmd_close      "ifconfig can0 down"    /* 关闭CAN0 */
```

说明：can0：can设备名；

down： 关闭设备命令

（2）Linux CAN参数设置（波特率，采样率）：

```c
#define ip_cmd_set_can_params "ip link set can0 type can bitrate 500000 triple-sampling on"

/* 将CAN0波特率设置为500000 bps */
```

说明：can0：can设备名；

down： 关闭设备命令

 Type can： 设备类型为can

 Bitrate 500000： 波特率设置为500kbps

 Triple-sampleing on: 采样打开

#### **14.4.2.2 什么是Socket套接口**

​		在linux里网络操作使用socket进行接口创建，竟然CAN设备也是虚拟成网络接口，也是使用的socket套接口。

​		如下图所示，电话A呼叫电话B，电话A会输入电话B的号码，电话B会接收到电话A的来电。

电话A和电话B是两个端点。而linux套接口与这个电话通信类似，套接口就是一个通信的端点，端点之间是通信链路；电话通信是通过电话号码进行拨号通信，而套接口是使用地址进行识别对方的。

![图14.2.2.2 电话通信模型](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0009.png)



#### **14.4.2.3 Socket接口函数**

我们要创建并使用socket套接口进行通信编程，就需要了解一下socket相关的接口函数。

需要查询linux系统里的函数，可以通过man命令查看。

举例：

man socket  /* 查看socket函数描述 */

**（1）socket()函数**

在linux系统下，通过“man socket”命令，查询socket()函数描述如下：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0010.png)

Socket函数原型如下：

```c
#include <sys/types.h>     

#include <sys/socket.h>

int socket(int domain, int type, int protocol);  /* 套接口函数原型 */
```

函数三个参数如下:

| domain：即协议域，又称为协议族（family）。  常用的协议族有，AF_INET、AF_INET6、AF_LOCAL（或称AF_UNIX，Unix域socket）、AF_ROUTE等等。协议族决定了socket的地址类型，在通信中必须采用对应的地址，如AF_INET决定了要用ipv4地址（32位的）与端口号（16位的）的组合、AF_UNIX决定了要用一个绝对路径名作为地址。 |
| ------------------------------------------------------------ |
| type： 指定socket类型。常用的socket类型有，  SOCK_STREAM、SOCK_DGRAM、SOCK_RAW、SOCK_PACKET、SOCK_SEQPACKET等等。 |
| protocol：就是指定协议。  常用的协议有，IPPROTO_TCP、IPPTOTO_UDP、IPPROTO_SCTP、IPPROTO_TIPC等，它们分别对应TCP传输协议、UDP传输协议、STCP传输协议、TIPC传输协议。 |

注意：

​		1.并不是上面的type和protocol可以随意组合的，如SOCK_STREAM不可以跟IPPROTO_UDP组合。当protocol为0时，会自动选择type类型对应的默认协议。

​		当我们调用socket创建一个socket时，返回的socket描述字它存在于协议族（address family，AF_XXX）空间中，但没有一个具体的地址。如果想要给它赋值一个地址，就必须调用bind()函数，否则就当调用connect()、listen()时系统会自动随机分配一个端口。

​		2. Socketcan使用的domain协议域是AF_CAN(或PF_CAN)，type类型是SOCK_RAW, 指定协议protocol是CAN_RAW.

**（2）bind()函数**

​		在linux系统下，通过“man bind”命令，查询bind()函数描述如下：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0011.png)

​		bind()函数把一个地址族中的特定地址赋给socket。例如对应AF_INET、AF_INET6就是把一个ipv4或ipv6地址和端口号组合赋给socket。

​		Bind函数原型如下所示：

```c
#include <sys/types.h>          
#include <sys/socket.h>
int bind(int sockfd, const struct sockaddr *addr,socklen_t addrlen);
```

函数的三个参数分别为：

**sockfd**：即socket描述字，它是通过socket()函数创建了，唯一标识一个socket。bind()函数就是将给这个描述字绑定一个名字。  

**addr**：一个const struct sockaddr *指针，指向要绑定给sockfd的协议地址。这个地址结构根据地址创建socket时的地址协议族的不同而不同，

如ipv4对应的是：

```c
struct sockaddr_in {
    sa_family_t    sin_family;   /* address family: AF_INET */
    in_port_t      sin_port;    /* port in network byte order */
    struct in_addr sin_addr;     /* internet address */
};
/* Internet address. */struct in_addr {
    uint32_t       s_addr;     /* address in network byte order */
};
```

ipv6对应的是：

```c
struct sockaddr_in6 { 
    sa_family_t     sin6_family;   /* AF_INET6 */ 
    in_port_t       sin6_port;     /* port number */ 
    uint32_t        sin6_flowinfo; /* IPv6 flow information */ 
    struct in6_addr  sin6_addr;     /* IPv6 address */ 
    uint32_t        sin6_scope_id; /* Scope ID (new in 2.4) */ 
};
struct in6_addr { 
    unsigned char   s6_addr[16];   /* IPv6 address */ 
};
```

Unix域对应的是：

```c
#define UNIX_PATH_MAX  108
struct sockaddr_un { 
  sa_family_t sun_family;        /* AF_UNIX */ 
  char    sun_path[UNIX_PATH_MAX]; /* pathname */ 
};
```

CAN域对应的是：

在文件“Linux-4.9.88\include\uapi\linux\can.h”中有定义，这个是本章需要重点了解的。

```c
/**
 * struct sockaddr_can - CAN sockets的地址结构
 * @can_family:  地址协议族 AF_CAN.
 * @can_ifindex:  CAN网络接口索引
 * @can_addr:    协议地址信息
 */
struct sockaddr_can {
	__kernel_sa_family_t can_family;
	int         can_ifindex;
	union {
		/* 传输协议类地址信息 (e.g. ISOTP) */
		struct { canid_t rx_id, tx_id; } tp;

		/* 预留给将来使用的CAN协议地址信息*/
	} can_addr;
};
```

**addrlen**：对应的是地址的长度。

通常服务器在启动的时候都会绑定一个众所周知的地址（如ip地址+端口号），用于提供服务，客户就可以通过它来接连服务器；而客户端就不用指定，有系统自动分配一个端口号和自身的ip地址组合。这就是为什么通常服务器端在listen之前会调用bind()，而客户端就不会调用，而是在connect()时由系统随机生成一个。

**（3）ioctl()函数**

在linux系统下，通过“man ioctl”命令，查询ioctl()函数描述如下：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0012.png)

Ioctl()函数调用层次如下图所示：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0013.png)

Ioctl()函数原型如下：

```c
#include <sys/ioctl.h>
int ioctl(int fd, unsigned long request, ...);
```

用ioctl获得本地网络接口地址时要用到两个结构体ifconf和ifreq。

**struct ifreq定义**
ifreq用来保存某个接口的信息。

在文件“Linux-4.9.88\include\uapi\linux\if.h”中有定义struct ifreq，这个只需要了解是在ioctl()函数调用时用来获取CAN设备索引（ifr_ifindex）使用，其他的参数可以不用关注。

```c
/*
 * Interface request structure used for socket
 * ioctl's.  All interface ioctl's must have parameter
 * definitions which begin with ifr_name.  The
 * remainder may be interface specific.
 */

/* for compatibility with glibc net/if.h */
#if __UAPI_DEF_IF_IFREQ
struct ifreq {
#define IFHWADDRLEN	6
	union
	{
		char	ifrn_name[IFNAMSIZ];		/* if name, e.g. "en0" */
	} ifr_ifrn;
	
	union {
		struct	sockaddr ifru_addr;
		struct	sockaddr ifru_dstaddr;
		struct	sockaddr ifru_broadaddr;
		struct	sockaddr ifru_netmask;
		struct  sockaddr ifru_hwaddr;
		short	ifru_flags;
		int	ifru_ivalue;
		int	ifru_mtu;
		struct  ifmap ifru_map;
		char	ifru_slave[IFNAMSIZ];	/* Just fits the size */
		char	ifru_newname[IFNAMSIZ];
		void __user *	ifru_data;
		struct	if_settings ifru_settings;
	} ifr_ifru;
};
#endif /* __UAPI_DEF_IF_IFREQ */

#define ifr_name	ifr_ifrn.ifrn_name	/* interface name 	*/
#define ifr_hwaddr	ifr_ifru.ifru_hwaddr	/* MAC address 		*/
#define	ifr_addr	ifr_ifru.ifru_addr	/* address		*/
#define	ifr_dstaddr	ifr_ifru.ifru_dstaddr	/* other end of p-p lnk	*/
#define	ifr_broadaddr	ifr_ifru.ifru_broadaddr	/* broadcast address	*/
#define	ifr_netmask	ifr_ifru.ifru_netmask	/* interface net mask	*/
#define	ifr_flags	ifr_ifru.ifru_flags	/* flags		*/
#define	ifr_metric	ifr_ifru.ifru_ivalue	/* metric		*/
#define	ifr_mtu		ifr_ifru.ifru_mtu	/* mtu			*/
#define ifr_map		ifr_ifru.ifru_map	/* device map		*/
#define ifr_slave	ifr_ifru.ifru_slave	/* slave device		*/
#define	ifr_data	ifr_ifru.ifru_data	/* for use by interface	*/
#define ifr_ifindex	ifr_ifru.ifru_ivalue	/* interface index	*/
#define ifr_bandwidth	ifr_ifru.ifru_ivalue    /* link bandwidth	*/
#define ifr_qlen	ifr_ifru.ifru_ivalue	/* Queue length 	*/
#define ifr_newname	ifr_ifru.ifru_newname	/* New name		*/
#define ifr_settings	ifr_ifru.ifru_settings	/* Device/proto settings*/
```

**struct ifconf定义**
ifconf通常是用来保存所有接口信息的，本章节未使用到，在此不作详细介绍。

**（4）setsockopt()函数**

​		在linux系统下，通过“man setsockopt”命令，查询setsockopt()函数描述如下：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0014.png)

setsockopt()和getsockopt函数原型如下：

```c
#include <sys/types.h>    
#include <sys/socket.h>
int getsockopt(int sockfd, int level, int optname,void *optval, socklen_t *optlen);
int setsockopt(int sockfd, int level, int optname, const void *optval, socklen_t optlen);
```

Setsockopt()用于任意类型、任意状态[套接口](https://baike.baidu.com/item/套接口/10058888)的设置选项值。尽管在不同协议层上存在选项，但本函数仅定义了最高的“套接口”层次上的选项。

其函数参数如下：可以看出其参数

| sockfd：标识一个套接口的描述字。                             |
| ------------------------------------------------------------ |
| level：选项定义的层次；支持SOL_SOCKET、IPPROTO_TCP、IPPROTO_IP，IPPROTO_IPV6，SOL_CAN_RAW等。 |
| optname：需设置的选项。                                      |
| optval：[指针](https://baike.baidu.com/item/指针)，指向存放选项待设置的新值的[缓冲区](https://baike.baidu.com/item/缓冲区)。 |
| optlen：optval缓冲区长度。                                   |

函数调用示例如下：

| **示例1：设置CAN过滤器为不接收所有报文。**                   |
| ------------------------------------------------------------ |
| //禁用过滤规则，本进程不接收报文，只负责发送    //设置过滤规则  setsockopt(s, SOL_CAN_RAW, CAN_RAW_FILTER, NULL,  0); |

| **示例2：设置CAN过滤器为接收某个指定报文**                   |
| ------------------------------------------------------------ |
| //定义接收规则，只接收表示符等于 0x201 的报文     //在linux头文件有定义，也可以自己定义  #define CAN_SFF_MASK 0x000007ffU     //定义过滤器（1个）  struct can_filter rfilter[1];  rfilter[0].can_id = 0x201;  rfilter[0].can_mask = CAN_SFF_MASK;  //设置过滤规则 setsockopt(s, SOL_CAN_RAW, CAN_RAW_FILTER,  &rfilter, sizeof(rfilter)); |

| **示例2：设置CAN过滤器为接收某个指定报文**                   |
| ------------------------------------------------------------ |
| //定义接收规则，只接收表示符等于 0x201 的报文     //在linux头文件有定义，也可以自己定义  #define CAN_SFF_MASK 0x000007ffU     //定义过滤器（3个）  struct can_filter rfilter[3];  rfilter[0].can_id = 0x201;  rfilter[0].can_mask = CAN_SFF_MASK;     rfilter[1].can_id = 0x401;  rfilter[1].can_mask = CAN_SFF_MASK;     rfilter[2].can_id = 0x601;  rfilter[2].can_mask = CAN_SFF_MASK;     //设置过滤规则 setsockopt(s, SOL_CAN_RAW, CAN_RAW_FILTER,  &rfilter, sizeof(rfilter)); |

**（5）write()函数**

在linux系统下，通过“man 2 write”命令，查询write()函数描述如下：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0015.png)

Write函数原型如下：

```c
#include <unistd.h>
ssize_t write(int fd, const void *buf, size_t count);
```

**（6）read()函数**

在linux系统下，通过“man 2 read”命令，查询read()函数描述如下：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0016.png)

Read函数原型如下：

```c
#include <unistd.h>
ssize_t read(int fd, void *buf, size_t count);
```

**（7）close()函数**

在linux系统下，通过“man 2 close”命令，查询close()函数描述如下：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0017.png)

close()函数原型如下：

```c
#include <unistd.h>
int close(int fd);
```

### **14.4.3 socket_can简单发送实例**

简单发送实例代码目录：“02_socketcan_send”

 

案例描述：

1. 实现周期1秒发送报文ID：0x101的报文；

 

**了解内容：IMX6 CAN接口电路**

从下面CAN外围电路看，和STM32是完全相同的，只是处理内部的CAN控制器因为不同芯片制造厂家的不同，会有一些较小的差异。这里电路只是对比了解一下，做linux应用可以不需要关注底层驱动处理。

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0018.png)

那我们现在按照14.3章节构建STM32下CAN应用编程的框架，一步一步编写linux下socketCAN的应用编程。

**准备工作：**

我们按照14.3章节准备好can应用的代码文件：

| 文件名           | 文件内容描述                                                 |
| ---------------- | ------------------------------------------------------------ |
| App_can.c        | CAN应用功能实现                                              |
| App_can.h        | CAN应用功能头文件                                            |
| Can_controller.c | CAN驱动操作抽象层具体实现                                    |
| Can_controller.h | CAN驱动操作抽象层头文件                                      |
| Can_msg.h        | CAN报文基本结构体，从STM32 CAN驱动拷贝过来的，主要在使用CAN报文时使用我们最熟悉的结构体。  此文件相对STM32为新增文件，因为我们的框架是基于单片机应用，然后类比迁移学习到linux上。 |
| Makefile         | Makefile编译脚本                                             |

#### **14.4.3.1** **编写抽象框架的实现函数**

 

首先我们使用14.3章节已经构建好的抽象结构体，如下：

见第14章节代码“02_socketcan_send_addline”中“can_controller.h”。

```c
34 /* CAN通信抽象结构体定义*/
35 typedef struct _CAN_COMM_STRUCT
36 {
37     /* CAN硬件名称 */
38     char *name;
39     /* CAN端口号，裸机里为端口号;linux应用里作为socket套接口 */
40     int  can_port;                                
41     /* CAN控制器配置函数，返回端口号赋值给can_port */
42     int  (*can_set_controller)( void );                  
43     /* CAN接口中断创建，在linux中对应创建接收线程 */
44     void (*can_set_interrput)( int can_port , pCanInterrupt callback );             
45     /* CAN读取报文接口 */
46     void (*can_read)( int can_port , CanRxMsg* recv_msg);   
47     /* CAN发送报文接口*/
48     void (*can_write)( int can_port , CanTxMsg send_msg);   
49 }CAN_COMM_STRUCT, *pCAN_COMM_STRUCT;
50 
```

我们就按照这个结构体的顺序依次编写can_controller.c中的CAN驱动操作具体实现函数。

 

**（1）定义CAN设备**

根据14.4.2.1章节描述，linux应用层操作CAN设备，需要知道设备名。.

在100ask_IMX6ULL开发板上打开串口，使用“ifconfig -a”命令查看，知道当前CAN设备名称为”can0”。

 

直接在linux命令行直接使用ip命令可以打开，设置，和关闭CAN设备，因此我们定义了三个宏ip_cmd_open, ip_cmd_close,ip_cmd_set_can_params, 这三个宏可以通过系统调用system()进行执行。

 

见第14章节代码“02_socketcan_send_addline”中“can_controller.c”文件中宏定义。

```c
29 /**************宏定义**************************************************/
30 
31 /* 将CAN0波特率设置为500000 bps */
32 #define ip_cmd_set_can_params  "ip link set can0 type can bitrate 500000 triple-sampling on"
33 
34 /* 打开CAN0 */
35 #define ip_cmd_open            "ifconfig can0 up"     
36 
37 /* 关闭CAN0 */    
38 #define ip_cmd_close           "ifconfig can0 down"   
```

**（2）配置CAN控制器**

配置CAN控制器有3个部分：打开can0设备，CAN波特率配置，CAN过滤器配置。

见第14章节代码“01_stm32f407_can_addline”中“can_controller.c”文件int CAN_Set_Controller( void )函数。

 

**A.配置波特率，打开can0设备**

使用（1）中的三个命令ip_cmd_open, ip_cmd_close,ip_cmd_set_can_params,通过system系统调用：具体代码如下

```c
77     /* 通过system调用ip命令设置CAN波特率 */
78     system(ip_cmd_close);               
79     system(ip_cmd_set_can_params);
80     system(ip_cmd_open);
```

**B.创建套接口**

因为linux应用操作设备均使用读read写write操作，linux一切皆文件，而socketcan又是一个特殊的文件，因此我们需要调用socket()函数创建一个socketcan接口，获取sock_fd描述符。

具体代码如下：

```c
82   /*************************************************************/
83   /* 创建套接口 sock_fd */
84   sock_fd = socket(AF_CAN, SOCK_RAW, CAN_RAW);
85 	if(sock_fd < 0)
86 	{
87 		perror("socket create error!\n");
88 		return -1;
89 	}
```

**C.绑定can0设备与套接口**

 

具体代码如下：

```c
92   //将套接字与 can0 绑定
93   strcpy(ifr.ifr_name, "can0");
94 	ioctl(sock_fd, SIOCGIFINDEX,&ifr); // 设置设备为can0
95 
96 	ifr.ifr_ifindex = if_nametoindex(ifr.ifr_name);
97 	printf("ifr_name:%s \n",ifr.ifr_name);
98 	printf("can_ifindex:%d \n",ifr.ifr_ifindex);
99 
100 addr.can_family = AF_CAN;
101 addr.can_ifindex = ifr.ifr_ifindex;
102 		
103 if( bind(sock_fd, (struct sockaddr *)&addr, sizeof(addr)) < 0 )
104 {
105 	perror("bind error!\n");
106 	return -1;
107 }
```

**C.配置过滤器**

 

具体代码如下：

```c
109 	/*************************************************************/
110 	//禁用过滤规则，本进程不接收报文，只负责发送
111  setsockopt(sock_fd, SOL_CAN_RAW, CAN_RAW_FILTER, NULL, 0); 
```

**D.配置非阻塞操作**

Linux系统调用read和write函数有阻塞和非阻塞，我们在周期调用时，此采用非阻塞方式对CAN报文进行读写操作。

具体代码实现如下：

```c
114     //设置read()和write()函数设置为非堵塞方式
115     int flags;
116     flags = fcntl(sock_fd, F_GETFL);
117     flags |= O_NONBLOCK;
118     fcntl(sock_fd, F_SETFL, flags);  
```

**E.返回sock_fd套接口**

具体代码实现如下：

int CAN_Set_Controller( void )函数直接结束后，返回值赋值给CAN_COMM_STRUCT的can_port成员。

后续应用层所访问的sock_fd描述符即为can_port.

**（3）创建CAN接收线程**

在STM32中，接收使用的接收FIFO中断进行处理，在linux应用中，我们则采用线程轮询去读取报文。

因此我们需要创建一个CAN接收线程，具体代码实现如下：

```c
127 /**********************************************************************
128 * 函数名称： void CAN_Set_Interrupt(int can_port,  pCanInterrupt callback)
129 * 功能描述： 创建CAN接收线程，并传入应用的的回调函数，回调函数主要处理应用层的功能
130 * 输入参数： can_port,端口号
131 *          callback： 中断具体处理应用功能的回调函数
132 * 输出参数： 无
133 * 返 回 值： 无
134 * 修改日期             版本号        修改人           修改内容
135 * -----------------------------------------------
136 * 2020/05/13         V1.0             bert            创建
137 ***********************************************************************/
138 void CAN_Set_Interrupt(int can_port,  pCanInterrupt callback)
139 {
140     int err;
141     
142     if ( NULL != callback ) 
143     {
144         g_pCanInterrupt = callback;
145     }
146     
147     err = pthread_create(&ntid, NULL,CAN1_RX0_IRQHandler, NULL );
148     if( err !=0 )
149     {
150         printf("create thread fail! \n");
151         return ;
152     }
153     printf("create thread success!\n");
154     
155 
156     return ;
157 }
```

创建后的线程函数如下所示：

CAN1_RX0_IRQHandler是一个CAN接收线程函数，与CAN接收中断功能相似，只这里采用轮询方式读取CAN报文。

```c
253 /**********************************************************************
254 * 函数名称： void CAN1_RX0_IRQHandler(void)
255 * 功能描述： CAN接收线程函数
256 * 输入参数： 无  
257 * 输出参数： 无
258 * 返 回 值： 无
259 * 修改日期             版本号        修改人           修改内容
260 * -----------------------------------------------
261 * 2020/05/13         V1.0             bert            创建
262 ***********************************************************************/
263 void *CAN1_RX0_IRQHandler(void *arg)
264 {
265     /* 接收报文定义 */
266     while( 1 )
267     {
268     /* 如果回调函数存在，则执行回调函数 */
269         if( g_pCanInterrupt != NULL)
270         {
271             g_pCanInterrupt();
272         }
273         usleep(10000);
274     }
275 }
```

**（4）CAN报文读取函数**

```c
161 /**********************************************************************
162 * 函数名称： void CAN_Read(int can_port, CanRxMsg* recv_msg)
163 * 功能描述： CAN读取接收寄存器，取出接收到的报文
164 * 输入参数： can_port,端口号     
165 * 输出参数： recv_msg：接收报文
166 * 返 回 值： 无
167 * 修改日期             版本号        修改人           修改内容
168 * -----------------------------------------------
169 * 2020/05/13         V1.0             bert            创建
170 ***********************************************************************/
171 void CAN_Read(int can_port, CanRxMsg* recv_msg)
172 { 
173     unsigned char i;
174     static unsigned int rxcounter =0;
175     
176     int nbytes;
177     struct can_frame rxframe;
178     
179     
180     nbytes = read(can_port, &rxframe, sizeof(struct can_frame));
181 	if(nbytes>0)
182 	{
183 	    printf("nbytes = %d \n",nbytes );
184 	    
185 	    recv_msg->StdId = rxframe.can_id;
186 	    recv_msg->DLC = rxframe.can_dlc;
187 	    memcpy( recv_msg->Data, &rxframe.data[0], rxframe.can_dlc);
188 	    
189 		rxcounter++;
190 		printf("rxcounter=%d, ID=%03X, DLC=%d, data=%02X %02X %02X %02X %02X %02X %02X %02X \n",  \
191 			rxcounter,
192 			rxframe.can_id, rxframe.can_dlc,  \
193 			rxframe.data[0],\
194 			rxframe.data[1],\
195 			rxframe.data[2],\
196 			rxframe.data[3],\
197 			rxframe.data[4],\
198 			rxframe.data[5],\
199 			rxframe.data[6],\
200 			rxframe.data[7] );
201 	}
202 
203     return ;
204 }
205  
```

**（5）CAN报文发送函数**

```c
206 /**********************************************************************
207 * 函数名称： void CAN_Write(int can_port, CanTxMsg send_msg)
208 * 功能描述： CAN报文发送接口，调用发送寄存器发送报文
209 * 输入参数： can_port,端口号     
210 * 输出参数： send_msg：发送报文
211 * 返 回 值： 无
212 * 修改日期             版本号        修改人           修改内容
213 * -----------------------------------------------
214 * 2020/05/13         V1.0             bert            创建
215 ***********************************************************************/
216 void CAN_Write(int can_port, CanTxMsg send_msg)
217 {
218     unsigned char i;
219     static unsigned int txcounter=0;
220     int nbytes;
221     
222     struct can_frame txframe;
223     
224     txframe.can_id = send_msg.StdId;
225     txframe.can_dlc = send_msg.DLC;
226     memcpy(&txframe.data[0], &send_msg.Data[0], txframe.can_dlc);
227 
228     nbytes = write(can_port, &txframe, sizeof(struct can_frame)); //发送 frame[0]
229 	
230 	if(nbytes == sizeof(txframe))
231 	{
232 	    txcounter++;
233 	    printf("txcounter=%d, ID=%03X, DLC=%d, data=%02X %02X %02X %02X %02X %02X %02X %02X \n",  \
234 			txcounter,
235 			txframe.can_id, txframe.can_dlc,  \
236 			txframe.data[0],\
237 			txframe.data[1],\
238 			txframe.data[2],\
239 			txframe.data[3],\
240 			txframe.data[4],\
241 			txframe.data[5],\
242 			txframe.data[6],\
243 			txframe.data[7] );
244     }
245     else
246 	{
247 		//printf("Send Error frame[0], nbytes=%d\n!",nbytes);
248 	}
249 
250     return ;
251 }
252 
```

**（6）CAN抽象结构体框架初始化**

与14.3章节STM32定义实例类似。

定义一个can1通信结构实例CAN_COMM_STRUCT can1_controller；

使用（1）~（5）步骤实现的函数，初始化can1_controller，构成与应用层关联的一个连接点。

```c
298 /**********************************************************************
299 * 名称：     can1_controller
300 * 功能描述： CAN1结构体初始化
301 * 修改日期             版本号        修改人           修改内容
302 * -----------------------------------------------
303 * 2020/05/13         V1.0             bert            创建
304 ***********************************************************************/
305 CAN_COMM_STRUCT can1_controller = {
306     .name                   = "can0",
307     .can_port               = CAN_PORT_CAN1,
308     .can_set_controller     = CAN_Set_Controller,
309     .can_set_interrput      = CAN_Set_Interrupt,
310     .can_read               = CAN_Read,
311     .can_write              = CAN_Write,
312 };
```

#### **14.4.3.2 编写应用层代码**

根据14.4.3.1 已经将具体的linux下socketCAN硬件操作已经实现，并且已经抽象实例化了CAN编程框架。

但是我们现在还没关联到应用层，应用层并不知道调用哪个接口。

**（1）CAN应用层注册实例**

在应用层编写一个通用的实例化注册函数。

见第14章节代码“02_socketcan_send_addline”中“app_can.c”文件int register_can_controller(const pCAN_COMM_STRUCT p_can_controller)函数。

代码实现如下：（和STM32应用编程完全一样，代码几乎不用更改）

```c
73 /**********************************************************************
74 * 函数名称： int register_can_controller(const pCAN_COMM_STRUCT p_can_controller)
75 * 功能描述： 应用层进行CAN1结构体注册
76 * 输入参数： p_can_controller，CAN控制器抽象结构体
77 * 输出参数： 无
78 * 返 回 值： 无
79 * 修改日期             版本号        修改人           修改内容
80 * -----------------------------------------------
81 * 2020/05/13         V1.0             bert            创建
82 ***********************************************************************/
83 int register_can_controller(const pCAN_COMM_STRUCT p_can_controller)
84 {
85     /* 判断传入的p_can_controller为非空，目的是确认这个结构体是实体*/
86     if( p_can_controller != NULL )
87     {
88         /* 将传入的参数p_can_controller赋值给应用层结构体gCAN_COMM_STRUCT */
89         
90         /*端口号，类比socketcan套接口*/
91         gCAN_COMM_STRUCT.can_port              = p_can_controller->can_port; 
92         /*CAN控制器配置函数*/
93         gCAN_COMM_STRUCT.can_set_controller    = p_can_controller->can_set_controller; 
94         /*CAN中断配置*/
95         gCAN_COMM_STRUCT.can_set_interrput     = p_can_controller->can_set_interrput;
96         /*CAN报文读函数*/
97         gCAN_COMM_STRUCT.can_read              = p_can_controller->can_read;
98         /*CAN报文发送函数*/
99         gCAN_COMM_STRUCT.can_write             = p_can_controller->can_write;
100         return 1;
101     }
102 	return 0;
103 }
```

**（2）CAN应用层初始化**

CAN应用层代码初始化如下：（和STM32 CAN应用代码完全一样）

```c
105 /**********************************************************************
106 * 函数名称： void app_can_init(void)
107 * 功能描述： CAN应用层初始化
108 * 输入参数： 无
109 * 输出参数： 无
110 * 返 回 值： 无
111 * 修改日期             版本号        修改人           修改内容
112 * -----------------------------------------------
113 * 2020/05/13         V1.0             bert            创建
114 ***********************************************************************/
115 void app_can_init(void)
116 {
117     /** 
118     * 应用层进行CAN1结构体注册
119     */
120     CAN1_contoller_add();
121     
122     /*
123     *调用can_set_controller进行CAN控制器配置，
124     *返回can_port，类比linux socketcan中的套接口，单片机例程中作为自定义CAN通道 
125     */
126     gCAN_COMM_STRUCT.can_port = gCAN_COMM_STRUCT.can_set_controller();
127     /** 
128     * 调用can_set_interrput配置CAN接收中断，类比socketcan中的接收线程，本例不用接收，因此回调函数传入NULL
129     */
130     gCAN_COMM_STRUCT.can_set_interrput( gCAN_COMM_STRUCT.can_port, NULL );
131 }
```

**（3）设计一个简单的周期发送报文功能**

我们需要先设计一个在10ms周期函数中调用的void app_can_tx_test(void)功能函数，这个函数在main主线程函数中进行调用。

 

CAN周期发送报文的功能函数代码实现如下：

```c
134 /**********************************************************************
135 * 函数名称： void app_can_tx_test(void)
136 * 功能描述： CAN应用层报文发送函数，用于测试周期发送报文
137 * 输入参数： 无
138 * 输出参数： 无
139 * 返 回 值： 无
140 * 修改日期             版本号        修改人           修改内容
141 * -----------------------------------------------
142 * 2020/05/13         V1.0             bert            创建
143 ***********************************************************************/
144 void app_can_tx_test(void)
145 {
146     // 以10ms为基准，运行CAN测试程序
147     
148     unsigned char i=0;
149     
150     /* 发送报文定义 */
151     CanTxMsg TxMessage;
152     
153     /* 发送报文中用一个字节来作为计数器 */
154     static unsigned char tx_counter = 0;
155     
156     /* 以10ms为基准，通过timer计数器设置该处理函数后面运行代码的周期为1秒钟*/  
157     static unsigned int timer =0;
158     if(timer++>100)
159     {
160         timer = 0;
161     }
162     else
163     {
164         return ;
165     }
166     
167     /* 发送报文报文数据填充，此报文周期是1秒 */
168     TxMessage.StdId = TX_CAN_ID;	      /* 标准标识符为0x000~0x7FF */
169     TxMessage.ExtId = 0x0000;             /* 扩展标识符0x0000 */
170     TxMessage.IDE   = CAN_ID_STD;         /* 使用标准标识符 */
171     TxMessage.RTR   = CAN_RTR_DATA;       /* 设置为数据帧  */
172     TxMessage.DLC   = 8;                  /* 数据长度, can报文规定最大的数据长度为8字节 */
173     
174     /* 填充数据，此处可以根据实际应用填充 */
175     TxMessage.Data[0] = tx_counter++;       /* 用来识别报文发送计数器 */
176     for(i=1; i<TxMessage.DLC; i++)
177     {
178         TxMessage.Data[i] = i;            
179     }
180     
181     /*  调用can_write发送CAN报文 */
182     gCAN_COMM_STRUCT.can_write(gCAN_COMM_STRUCT.can_port, TxMessage);
183     
184 }
185 
```

然后将void app_can_tx_test(void)函数加入到main函数中，进行10ms周期执行，其代码实现如下：

```c
188 /**********************************************************************
189 * 函数名称： int main(int argc, char **argv)
190 * 功能描述： 主函数
191 * 输入参数： 无
192 * 输出参数： 无
193 * 返 回 值： 无
194 * 修改日期             版本号        修改人           修改内容
195 * -----------------------------------------------
196 * 2020/05/13         V1.0             bert            创建
197 ***********************************************************************/
198 int main(int argc, char **argv)
199 {
200     /* CAN应用层初始化 */
201     app_can_init();
202     
203     while(1)
204     {
205         /* CAN应用层周期发送报文 */
206         app_can_tx_test();
207         
208         /* 利用linux的延时函数设计10ms的运行基准 */
209         usleep(10000);
210     }
211 }
```

#### **14.4.3.3 案例测试验证**

当我们上面代码完成编写后，目录文件如下：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0019.png)

**（1）编写Makfile**

Makefile文件内容如下：

```c
all:
	arm-linux-gnueabihf-gcc -lpthread -o socketcan_send   can_controller.c  app_can.c
clean:
	rm socketcan_send
```

**（2）编译socket_send**

 注意：编译是在100ask-vmware_ubuntu18.04虚拟机环境中。

进入ubuntu虚拟机对应的socket_send目录下

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0020.png)

输入make命令：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0021.png)

通过make命令编译后，生成socket_send可执行文件。

**（3）运行socket_send**

注意：运行在100ask_imx6开发板上运行。

此处使用的是nfs文件进行运行。

 

先给100ask_imx6ull开发板上电，打开串口：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0022.png)

输入root用户登录进入开发板linux系统；

然后挂载nfs，操作如下：

```c
Mount -t nfs -o nolock 192.168.1.100:/home/book  /mnt
```

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0023.png)

注意：目前我的开发板IP：192.168.1.101， Ubuntu虚拟机是192.168.1.100.

 

然后再运行./socketcan_send

如果运行时提示权限不允许，可以使用chmod命令设置权限:

```c
Chmod 777 socketcan_send
```

运行后串口查看打印信息如下：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0024.png)

然后再观察Vehcile Spy3上位机测试结果如下：

报文按照时间1S的周期性发送报文ID为0x101的CAN报文。

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0025.png)

**（4）测试总结**

到此为止，我们已经通过socketcan建立起来了linux下应用编程的框架，并且成功的调试成功了CAN周期发送报文的功能编程。

后面将基于此框架，一步一步的了解linux下CAN应用编程；

 

对于相关案例章节的目的设置如下：

| 章节                            | 目的                     |
| ------------------------------- | ------------------------ |
| 14.4.3 socket_can简单发送实例   | 简单直接的了解发送报文   |
| 14.4.4 socket_can简单接收实例   | 简单直接的了解接收报文   |
| 14.4.5 socket_can接收和发送实例 | 发送和接收报文的组合操作 |

### **14.4.4 socket_can 简单接收实例**

简单接收实例代码目录：“03_socketcan_recv”

我们在14.4.3章节已经了解了发送报文发送的功能，而且已经建立起了linux下应用编程的框架；本节重点了解简单接收功能。

 

案例描述：

1.实现接收报文0x201的报文。

 

#### **14.4.4.1 编写抽象框架的实现函数**

**（1）定义CAN设备**

参考“14.4.3.1 编写抽象框架的实现函数”中“（1）定义CAN设备”描述。

 

**（2）配置CAN控制器**

参考“14.4.3.1 编写抽象框架的实现函数”中“（2）配置CAN控制器”描述。

因为在“14.4.3.1”中我们只发送，并且设置了过滤器为禁止所有报文。具体代码如下：

```c
109 /*************************************************************/
110 //禁用过滤规则，本进程不接收报文，只负责发送
111 setsockopt(sock_fd, SOL_CAN_RAW, CAN_RAW_FILTER, NULL, 0);  
```

而本案例需要配置接收，过滤器配置会有相应差异，我们目前是配置仅仅接收报文ID为0x201的报文，

具体实现代码如下：

```c
110 	//定义接收规则，只接收表示符等于 0x201 的报文
111 	struct can_filter rfilter[1];
112 	rfilter[0].can_id = 0x201;
113 	rfilter[0].can_mask = CAN_SFF_MASK;
114 	//设置过滤规则
115 	setsockopt(sock_fd, SOL_CAN_RAW, CAN_RAW_FILTER, &rfilter, sizeof(rfilter));
```

作为扩展，我们也可以设置多个过滤器：

定义过滤器：

```c
struct can_filter rfilter[5];  /*定义10个过滤器*/
rfilter[0].can_id = 0x201;
rfilter[0].can_mask = 0x7FF;  /*过滤规则：can_id & mask = 0x201 & 0x7FF = 0x201*/
rfilter[1].can_id = 0x302;
rfilter[1].can_mask = 0x7FF;  /*过滤规则：can_id & mask = 0x302& 0x7FF = 0x302*/
rfilter[2].can_id = 0x403;
rfilter[2].can_mask = 0x7FF;  /*过滤规则：can_id & mask = 0x403& 0x7FF = 0x403*/
rfilter[3].can_id = 0x504;
rfilter[3].can_mask = 0x700;  /*过滤规则：can_id & mask = 0x504 & 0x700 = 0x500,即接收报文ID为0x5**的报文*/
rfilter[3].can_id = 0x605;
rfilter[3].can_mask = 0x700;  /*过滤规则：can_id & mask = 0x504 & 0x700 = 0x600*/
setsockopt(sock_fd, SOL_CAN_RAW, CAN_RAW_FILTER, &rfilter, sizeof(rfilter));
```

**（3）创建CAN接收线程**

参考“14.4.3.1 编写抽象框架的实现函数”中“（3）创建CAN接收线程”描述。

**（4）CAN报文读取函数**

参考“14.4.3.1 编写抽象框架的实现函数”中“（4）CAN报文读取函数”描述。

**（5）CAN报文发送函数**

参考“14.4.3.1 编写抽象框架的实现函数”中“（5）CAN报文发送函数”描述。

**（6）CAN抽象结构体框架初始化**

参考“14.4.3.1 编写抽象框架的实现函数”中“（6）CAN抽象结构体框架初始化”描述。



#### **14.4.4.2** **编写应用层代码**

**（1）CAN应用层注册实例**

参考“14.4.3.2 编写应用层代码”中“（1）CAN应用层注册实例”描述。

 

**（2）CAN应用层初始化**

在本简单接收实例中，我们需要将接收线程里的回调指针函数CAN_RX_IRQHandler_Callback传入，在这个函数里，应用层可以自行进行读取CAN报文等处理。

```c
105 /**********************************************************************
106 * 函数名称： void app_can_init(void)
107 * 功能描述： CAN应用层初始化
108 * 输入参数： 无
109 * 输出参数： 无
110 * 返 回 值： 无
111 * 修改日期             版本号        修改人           修改内容
112 * -----------------------------------------------
113 * 2020/05/13         V1.0             bert            创建
114 ***********************************************************************/
115 void app_can_init(void)
116 {
117     /** 
118     * 应用层进行CAN1结构体注册
119     */
120     CAN1_contoller_add();
121     
122     /*
123     *调用can_set_controller进行CAN控制器配置，
124     *返回can_port，类比linux socketcan中的套接口，单片机例程中作为自定义CAN通道 
125     */
126     gCAN_COMM_STRUCT.can_port = gCAN_COMM_STRUCT.can_set_controller();
127     /** 
128     * 调用can_set_interrput配置CAN接收中断，类比socketcan中的接收线程
129     */
130     gCAN_COMM_STRUCT.can_set_interrput( gCAN_COMM_STRUCT.can_port, CAN_RX_IRQHandler_Callback );
131 }
```

**（3）设计一个简单的接收报文功能**

 

关于void CAN_RX_IRQHandler_Callback(void)的具体实现如下所示：

CAN_RX_IRQHandler_Callback是在接收线程中循环执行，应用层在CAN_RX_IRQHandler_Callback函数进行gCAN_COMM_STRUCT.can_read读取CAN报文。

```c
133 /**********************************************************************
134 * 函数名称： void CAN_RX_IRQHandler_Callback(void)
135 * 功能描述： CAN1接收中断函数；在linux中可以类比用线程，或定时器去读CAN数据
136 * 输入参数： 无
137 * 输出参数： 无
138 * 返 回 值： 无
139 * 修改日期             版本号        修改人           修改内容
140 * -----------------------------------------------
141 * 2020/05/13         V1.0             bert            创建
142 ***********************************************************************/
143 void CAN_RX_IRQHandler_Callback(void)
144 {
145     /* 接收报文定义 */
146     CanRxMsg RxMessage; 
147     
148     /* 接收报文清零 */
149     memset( &RxMessage, 0, sizeof(CanRxMsg) );
150    
151     /* 通过can_read接口读取寄存器已经接收到的报文 */
152     gCAN_COMM_STRUCT.can_read(gCAN_COMM_STRUCT.can_port, &RxMessage);
153 
154     /* 将读取到的CAN报文存拷贝到全局报文结构体g_CAN1_Rx_Message */
155     memcpy(&g_CAN1_Rx_Message, &RxMessage, sizeof( CanRxMsg ) );
156     
157 }
```

本案例无发送报文功能，主线程中无代码处理，只需要空跑运行即可。

```c
159 /**********************************************************************
160 * 函数名称： int main(int argc, char **argv)
161 * 功能描述： 主函数
162 * 输入参数： 无
163 * 输出参数： 无
164 * 返 回 值： 无
165 * 修改日期             版本号        修改人           修改内容
166 * -----------------------------------------------
167 * 2020/05/13         V1.0             bert            创建
168 ***********************************************************************/
169 int main(int argc, char **argv)
170 {
171     /* CAN应用层初始化 */
172     app_can_init();
173     
174     while(1)
175     {        
176         /* 利用linux的延时函数设计10ms的运行基准 */
177         usleep(10000);
178     }
179 }
180 
```

 

#### **14.4.4.3** **案例测试验证**

**（1）编写Makfile**

Makefile文件内容如下：

```c
all:

   arm-linux-gnueabihf-gcc -lpthread -o socketcan_recv  can_controller.c app_can.c

clean:

   rm socketcan_recv
```

**（2）编译socket_recv**

 注意：编译是在100ask-vmware_ubuntu18.04虚拟机环境中。

进入ubuntu虚拟机对应的socket_recv目录下，执行make all进行编译。

编译过程如下：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0026.png)

**（3）运行socket_recv**

注意：运行在100ask_imx6开发板上运行。

此处使用的是nfs文件进行运行。

Nfs挂载，请参考“14.4,3.3 案例测试验证”。

在100ask_imx6开发板环境下，执行“./socket_recv”,运行程序；

然后通过Vhicle Spy3向100ask_imx6开发板CAN端发送报文ID未0x201的报文，报文trace如下：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0027.png)

100ask_imx6开发板串口打印信息如下：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0028.png)

**（4）测试总结**

到此为止，我们已经调试成功了CAN报文接收的功能编程。



### **14.4.5 socket_can 接收和发送实例**

简单接收实例代码目录：“04_socketcan_recv_send”

本案例整合了“14.4.3 简单发送实例”和“14.4.3 简单接收实例”，构建成一个发送和接收均有的组合案例。

 

案例描述：

1. 实现周期1秒发送报文ID：0x101的报文；

2. 实现接收报文0x201的报文，并将内容复制到报文0x301的报文，并发送出去；

 

#### **14.4.5.1 编写抽象框架的实现函数**

**（1）定义CAN设备**

参考“14.4.3.1 编写抽象框架的实现函数”中“（1）定义CAN设备”描述。

参考“14.4.4.1 编写抽象框架的实现函数”中“（1）定义CAN设备”描述。

 

**（2）配置CAN控制器**

参考“14.4.3.1 编写抽象框架的实现函数”中“（2）配置CAN控制器”描述。

参考“14.4.4.1 编写抽象框架的实现函数”中“（2）配置CAN控制器”描述。

 

**（3）创建CAN接收线程**

参考“14.4.3.1 编写抽象框架的实现函数”中“（3）创建CAN接收线程”描述。

参考“14.4.4.1 编写抽象框架的实现函数”中“（3）创建CAN接收线程”描述。

 

**（4）CAN报文读取函数**

参考“14.4.3.1 编写抽象框架的实现函数”中“（4）CAN报文读取函数”描述。

参考“14.4.4.1 编写抽象框架的实现函数”中“（4）CAN报文读取函数”描述。

 

**（5）CAN报文发送函数**

参考“14.4.3.1 编写抽象框架的实现函数”中“（5）CAN报文发送函数”描述。

参考“14.4.4.1 编写抽象框架的实现函数”中“（5）CAN报文发送函数”描述。

 

**（6）CAN抽象结构体框架初始化**

参考“14.4.3.1 编写抽象框架的实现函数”中“（6）CAN抽象结构体框架初始化”描述。

参考“14.4.4.1 编写抽象框架的实现函数”中“（6）CAN抽象结构体框架初始化”描述。

 

**14.4.5.2** **编写应用层代码**

**（1）CAN应用层注册实例**

参考“14.4.3.2 编写应用层代码”中“（1）CAN应用层注册实例”描述。

参考“14.4.4.2 编写应用层代码”中“（1）CAN应用层注册实例”描述。

 

**（2）CAN应用层初始化**

参考“14.4.4.2 编写应用层代码”中“（2）CAN应用层初始化”描述。

 

**（3）设计一个简单的周期发送报文功能**

参考“14.4.3.2 编写应用层代码”中“（3）设计一个简单的发送报文功能”描述。

 

**（4）设计一个简单的周期接收报文功能**

参考“14.4.4.2 编写应用层代码”中“（3）设计一个简单的接收报文功能”描述。

 

​		同时，我们此处需要将接收到的ID:0X201的报文，将内容复制给报文ID：0x301的报文，并发送出去。

我们在“14.4.4 简单接收报文”的基础上增加一个简单的逻辑，在接收线程的回调函数CAN_RX_IRQHandler_Callback中，调用gCAN_COMM_STRUCT.can_read(gCAN_COMM_STRUCT.can_port, &RxMessage);接收到报文ID：0x201的报文后，设置标志g_CAN1_Rx_Flag = 1; 然后去主线程去判断此标志是否被设置为1，标识已经接收到，则在void app_can_rx_test(void)中去拷贝报文ID:0X201的报文内容，然后赋值给报文ID:0x301的报文。

接收线程回调函数CAN_RX_IRQHandler_Callback的实现代码如下：

```c
231 /**********************************************************************
232 * 函数名称： void CAN_RX_IRQHandler_Callback(void)
233 * 功能描述： CAN1接收中断函数；在linux中可以类比用线程，或定时器去读CAN数据
234 * 输入参数： 无
235 * 输出参数： 无
236 * 返 回 值： 无
237 * 修改日期             版本号        修改人           修改内容
238 * -----------------------------------------------
239 * 2020/05/13         V1.0             bert            创建
240 ***********************************************************************/
241 void CAN_RX_IRQHandler_Callback(void)
242 {
243     /* 接收报文定义 */
244     CanRxMsg RxMessage; 
245     
246     /* 接收报文清零 */
247     memset( &RxMessage, 0, sizeof(CanRxMsg) );
248    
249     /* 通过can_read接口读取寄存器已经接收到的报文 */
250     gCAN_COMM_STRUCT.can_read(gCAN_COMM_STRUCT.can_port, &RxMessage);
251 
252     /* 将读取到的CAN报文存拷贝到全局报文结构体g_CAN1_Rx_Message */
253     memcpy(&g_CAN1_Rx_Message, &RxMessage, sizeof( CanRxMsg ) );
254     
255     /* 设置当前接收完成标志，判断当前接收报文ID为RX_CAN_ID，则设置g_CAN1_Rx_Flag=1*/
256     if( g_CAN1_Rx_Message.StdId == RX_CAN_ID )
257     {
258         g_CAN1_Rx_Flag = 1;  
259     }
260 }
```

主线程中app_can_rx_test的接收触发处理函数代码如下：

```c
187 /**********************************************************************
188 * 函数名称： void app_can_rx_test(void)
189 * 功能描述： CAN应用层接收报文处理函数，用于处理中断函数中接收的报文
190 * 输入参数： 无
191 * 输出参数： 无
192 * 返 回 值： 无
193 * 修改日期             版本号        修改人           修改内容
194 * -----------------------------------------------
195 * 2020/05/13         V1.0             bert            创建
196 ***********************************************************************/
197 void app_can_rx_test(void)
198 {
199     unsigned char i=0;
200     
201     /* 发送报文定义 */
202     CanTxMsg TxMessage;
203     
204     /* 发送报文中用一个字节来作为计数器 */
205     static unsigned char rx_counter = 0;
206     
207     
208     if( g_CAN1_Rx_Flag == 1)
209     {
210         g_CAN1_Rx_Flag = 0;
211         
212         /* 发送报文报文数据填充，此报文周期是1秒 */
213         TxMessage.StdId = RX_TO_TX_CAN_ID;	  /* 标准标识符为0x000~0x7FF */
214         TxMessage.ExtId = 0x0000;             /* 扩展标识符0x0000 */
215         TxMessage.IDE   = CAN_ID_STD;         /* 使用标准标识符 */
216         TxMessage.RTR   = CAN_RTR_DATA;       /* 设置为数据帧  */
217         TxMessage.DLC   = 8;                  /* 数据长度, can报文规定最大的数据长度为8字节 */
218         
219         /* 填充数据，此处可以根据实际应用填充 */
220         TxMessage.Data[0] = rx_counter++;      /* 用来识别报文发送计数器 */
221         for(i=1; i<TxMessage.DLC; i++)
222         {
223             TxMessage.Data[i] = g_CAN1_Rx_Message.Data[i];            
224         }
225         
226         /*  调用can_write发送CAN报文 */
227         gCAN_COMM_STRUCT.can_write(gCAN_COMM_STRUCT.can_port, TxMessage);
228     }
229 }
```

 

**14.4.5.3** **案例测试验证**

**（1）编写Makfile**

Makefile文件容如下：

```c
all:

   arm-linux-gnueabihf-gcc -lpthread -o socketcan_recv_send  can_controller.c app_can.c

clean:

   rm socketcan_recv_send
```



**（2）编译socket_recv_send**

 注意：编译是在100ask-vmware_ubuntu18.04虚拟机环境中。

进入ubuntu虚拟机对应的socket_send目录下，执行make all进行编译。

编译过程如下：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0029.png)

**（3）运行socket_recv_send**

注意：运行在100ask_imx6开发板上运行。

此处使用的是nfs文件进行运行。

Nfs挂载，请参考“14.4,3.3 案例测试验证”。

在100ask_imx6开发板环境下，执行“./socket_recv_send”,运行程序；

然后通过Vhicle Spy3向100ask_imx6开发板CAN端发送报文ID未0x201的报文，报文trace如下：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0030.png)

然后观察100ask_imx6开发串口打印信息如下：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0028.png)

**（4）测试总结**

到此为止，我们已经调试成功了CAN报文接收和发送的功能编程。

## **14.5** **汽车行业CAN总线应用**

### **14.5.1** **车厂CAN总线需求**

CAN总线应用最广泛的应该是汽车领域，几乎所有的车均支持CAN总线，在这里就简单介绍一些汽车相关的CAN总线需求。

 

#### **14.5.1.1** **网络拓扑结构**

下面这张网络拓扑图和我开发过的大部分实际车辆拓扑大致一致。一般是汽车厂商提供给零部件供应商的。

如下图所示：

![图14.5.1 整车网络拓扑](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0032.png)


一般车身网络分为如下6个局域CAN网络：

| 车辆拓扑分组                                                 | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| PT CAN (PowerTrain CAN )   动力总成CAN总线         | 主要负责车辆动力相关的ECU组网，是整车要求传输速率最高的一路CAN网络；  一般包括如下相关ECU单元：  ECM(Engine Control  Module）发动机控制模块；  SRS (  SupplementalRestraintSystem) 电子安全气囊   BMS ( Battery Management System ) 电池管理系统   EPB Electronic Park Brake, 电子驻车系统 |
| CH CAN   (Chassis CAN)   底盘控制CAN总线           | CH CAN负责汽车底盘及4个轮子的制动/稳定/转向，由于涉及整车制动/助力转向等, 所以其网络信号优先级也是较高的。  一般包括如下相关ECU单元：  ABS ( Antilock Brake  System ) 防抱死制动系统  ESP(Electronic  Stability Program)车身电子稳定系统  EPS(Electric Power  Steering)电子转向助力 |
| Body CAN  车身控制总线                                  | Body CAN负责车身上的一些提高舒适性/安全性的智能硬件的管理与控制，其网络信号优先级较低, 因为以上设备都是辅助设备。  一般包括如下相关ECU单元： AC ( Air Condition ) 空调  AVM(Around View  Monitor) 360环视  BCM(Body Control  Module) 天窗, 车窗, 雾灯, 转向灯, 雨刮…  IMMO(Immobilizer) 发动机防盗系统  TPMS(Tire Pressure  Monitoring System) 胎压监控系统 |
| Info CAN   ( Infomercial CAN )   娱乐系统总线 | Info CAN是辅助可选设备, 所以优先级也是较低的，主要负责车身上的一些提高娱乐性的智能硬件的管理与控制。  一般包括如下相关ECU单元：  VAES( Video Audio  Entertainment System) 车载娱乐系统(中控)  IP(Instrument Pack) 组合仪表, 当今的数字仪表, 基本有音乐, 地图, 通话等娱乐功能. |
| DiagCAN   ( Diagnose CAN )   诊断控制总线                    | DiagCAN总线主要提供远程诊断功能，只有一个ECU:   Tbox(Telematics BOX) 远程控制模块 |
| OBD CAN                                                      | OBD一般是提供外接诊断仪，基本是接在整车网关ECU上。           |

 

#### **14.5.1.2 CAN 报文分类**

在汽车CAN网络里面，CAN报文主要分为三种：应用报文，网络报文，和诊断报文。

不论是网络报文，还是诊断报文，均是按照不同的功能需求划分的，根据不同的需求，制定CAN报文数据的不同协议。

 

**（1）CAN应用报文**

CAN应用报文，主要用于车身网络中不同ECU节点之间的数据信息的发送和接收，与具体应用功能相关；

汽车CAN应用报文，由车厂进行定义和发布“信号矩阵表（excel格式）”和“信号矩阵（DBC格式）”。

详见“14.5.2 CAN应用报文应用分析及实例”。

 

**（2）CAN网络管理报文**

汽车电子系统通过车载网络对所有的ECU 进行配置管理和协调工作的过程称之为网络管理。

网络管理可以通过对于网络上的各个 ECU 的控制，发出一些命令规则，实现各个 ECU 的协同睡眠和唤醒，用于协同控制的CAN报文，就是网络管理报文。

网络管理有OSEK网络管理和AUTOSAR网络管理两种。一般前装车厂项目才会要求支持网络管理。

 

**（3）CAN诊断报文**

CAN诊断主要是是实现车辆的功能监控，故障检测，记录/存储故障信息，存储/读取数据，还有EOL下线检测，ECU升级等功能。

 

基于CAN的通信分层模型：

| OSI分层    | 车厂诊断标准            | OBD标准    |
| ---------- | ----------------------- | ---------- |
| 诊断应用   | 用户定义                | ISO15031-5 |
| 应用层     | ISO15765-3 / ISO14229-1 | ISO15031-5 |
| 表示层     | 无                      | 无         |
| 会话层     | ISO15765-3              | ISO15765-4 |
| 传输层     | 无                      | 无         |
| 网络层     | ISO15765-2              | ISO15765-4 |
| 数据链路层 | ISO11898-1              | ISO15765-4 |
| 物理层     | 用户定义                | ISO15765-4 |

![图 CAN诊断服务OSI模型](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0034.png)


### **14.5.2 CAN 应用报文应用分析及实例**

#### **14.5.2.1 CAN 应用报文定义**

当一个车厂项目启动之后，根据项目的需求，车厂会提供CAN信号矩阵（excel），和DBC信号矩阵数据库。

**（1）CAN信号矩阵-excel格式**

车厂提供的信号矩阵（excel）的文件格式，详见第14章代码目录：CAN_Signal_Matrix.xlsx，

从CAN_Signal_Matrix.xlsx中截取报文定义，如下所示：

ECU_TX_MSG1: (周期发送报文，ID：0x123）

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0035.png)

ECU_TX_MSG2: (事件发送报文，ID：0x124）

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0036.png)

ECU_TX_MSG3: (周期&事件发送报文，ID：0x125）

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0037.png)

ECU_RX_MSG1:(事件接收报文，ID: 0X201)

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0038.png)

​		从上报文定义可以看出，车厂会定义报文的很多属性，如报文名称，报文ID,报文长度, 报文周期，报文发送类型， 以及报文中的信号名称，信号起始字节，信号长度，排列格式（Intel或Motorala），信号的取值范围，信号的发送方式等等。

（2）CAN信号矩阵-DBC

本章提供的示例CAN矩阵“CAN_Signal_Matrix.xlsx”对应的DBC文件，该DBC文件使用vector CANdb+ Editor编辑；如下图所示为DBC文件所显示的报文信息内容，和excel表格所展示内容是一致的，文件格式不是最关键的，只要理解车厂对CAN信号的要求即可。

![图 CAN信号矩阵DBC](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0039.png)

 

#### 14.5.2.2 CAN应用报文发送规则

​		我们提到车厂会提供CAN信号矩阵表，会定义周期报文，事件报文，周期事件混合报文，那么定义这些信号的通用规则在哪里？一般车厂会提供关于CAN总线的通信规范，车厂根据通信规范才定义出CAN信号矩阵。

​		下面是某车厂的通信规范《XXX Communication Requirement Specification.pdf》，其规范目录如下图所示，从目录可以看出，主要介绍CAN物理层，数据链路层，通信交互层等相关规则。

​		本小节，我们主要介绍应用报文相关的通信交互层“4 Interaction Layer”相关的内容：CAN报文发送类型（Message Send Type）。

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0040.png)

CAN报文发送类型按照之前矩阵表展示的逐一介绍如下：

**（1）周期型报文（Cyclic Message）**

周期报文，即为周期定时发送，周期为T。

如下图所示：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0042.png)

当系统运行后，ECU就按照周期T定时发送CAN报文。

**（2）事件型报文（Event Message）**

触发事件时发送事件型消息，如下图所示：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0043.png)

当系统运行后，ECU并不主动发送事件型报文，而是当ECU被某一条件触发（Event），则ECU会连续发送三帧事件报文。

当然车厂要求不仅仅如此，车厂还会有更多其他要求，

比如，

要求1,：触发发送三帧报文后，要求信号恢复为默认值；

要求2：触发发送三帧，帧与帧间间隔要求50ms;

**（3）周期事件型报文（Cyclic And Event Message）**

​		周期事件混合型报文（简称CE），当无事件触发的情况下，按照周期T定时发送报文，当有事件触发的情况下，按照event事件触发方式发送报文。

如下图所示：

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0044.png)

实际车厂定义的CAN报文发送类型并不仅仅是上面三种，但是这三种是最重要的发送方式。



#### 14.5.2.3 汽车CAN应用报文发送应用实例

通过上一小节的描述，我们已经了解了车厂规范中三个应用报文发送类型，现在我们就开始在100ask_imx6开发板上进行试验，实现车厂应用报文的需求。

 

关于linux socketcan的应用编程框架我们已经在“14.4 linux socketcan基础应用编程”详细讲解了，我们现在就基于“14.4.5 socketcan接收和发送实例”进行本章案例应用编程，重点侧重于app_can.c编程，can_controller.c可以完全沿用。

 

以下应用编程，我们使用14.5.2.1中介绍的CAN报文矩阵中的CAN报文。

 

**（1）linux can编程框架准备**

使用案例“04_socketcan_recv_send”代码，复制文件夹改名为“06_socketcan_ecu_application”。

在app_can.c文件中定义报文ID:

```c
30 /**************宏定义**************************************************/
31 /* 本例程中测试周期发送的CAN报文ID */
32 #define TX_CAN_CYCLIC_ID    0X123
33 #define TX_CAN_EVENT_ID     0X124
34 #define TX_CAN_CE_ID        0X125
35 
36 /* 本例程中测试接收的CAN报文ID */
37 #define RX_CAN_ID           0x201   
```

**（2）周期型报文实现**

实现功能：

A.编程实现周期发送报文ID:0x123， 周期T为1000ms。

 

代码实现如下：

```c
136 /**********************************************************************
137 * 函数名称： void app_can_cyclicmsg_test(void)
138 * 功能描述： CAN应用层测试发送周期型报文(ID:0X123)
139 * 输入参数： 无
140 * 输出参数： 无
141 * 返 回 值： 无
142 * 修改日期             版本号        修改人           修改内容
143 * -----------------------------------------------
144 * 2020/05/13         V1.0             bert            创建
145 ***********************************************************************/
146 void app_can_cyclicmsg_test(void)
147 {
148     // 以10ms为基准，运行CAN测试程序
149     
150     unsigned char i=0;
151     
152     /* 发送报文定义 */
153     CanTxMsg TxMessage;
154     
155     /* 发送报文中用一个字节来作为计数器 */
156     static unsigned char tx_counter = 0;
157     
158     /* 以10ms为基准，通过timer计数器设置该处理函数后面运行代码的周期为1秒钟*/  
159     static unsigned int timer =0;
160     if(timer++>100)
161     {
162         timer = 0;
163     }
164     else
165     {
166         return ;
167     }
168     
169     /* 发送报文报文数据填充，此报文周期是1秒 */
170     TxMessage.StdId = TX_CAN_CYCLIC_ID;	  /* 标准标识符为0x000~0x7FF */
171     TxMessage.ExtId = 0x0000;             /* 扩展标识符0x0000 */
172     TxMessage.IDE   = CAN_ID_STD;         /* 使用标准标识符 */
173     TxMessage.RTR   = CAN_RTR_DATA;       /* 设置为数据帧  */
174     TxMessage.DLC   = 8;                  /* 数据长度, can报文规定最大的数据长度为8字节 */
175     
176     /* 填充数据，此处可以根据实际应用填充 */
177     TxMessage.Data[0] = tx_counter++;       /* 用来识别报文发送计数器 */
178     for(i=1; i<TxMessage.DLC; i++)
179     {
180         TxMessage.Data[i] = i;            
181     }
182     
183     /*  调用can_write发送CAN报文 */
184     gCAN_COMM_STRUCT.can_write(gCAN_COMM_STRUCT.can_port, TxMessage);
185     
186 }
```

**（3）事件型报文实现**

实现功能：

A.   编程实现当接收到一帧报文（ID：0x201）的信号ECU_RX_MSG1_signal1=1时，触发发送事件型报文（ID:0x124），让ECU_MSG2_signal2（Byte1字节）=2 且两帧报文间时间间隔为50ms。

B.   事件触发条件：接收到报文(ID:0x201)，且ECU_RX_MSG1_signal1（Byte0字节bit0）为1

 

代码实现如下：

```c
188 /**********************************************************************
189 * 函数名称： void app_can_eventmsg_test(void)
190 * 功能描述： CAN应用层测试发送事件型报文(ID:0X124)
191 * 输入参数： 无
192 * 输出参数： 无
193 * 返 回 值： 无
194 * 修改日期             版本号        修改人           修改内容
195 * -----------------------------------------------
196 * 2020/05/13         V1.0             bert            创建
197 ***********************************************************************/
198 void app_can_eventmsg_test(void)
199 {
200     unsigned char i=0;
201 
202     /* 发送报文中用一个字节来作为事件触发计数器 */
203     static unsigned char tx_counter = 0;
204 
205     /* 发送报文定义 */
206     CanTxMsg TxMessage;
207 
208     if( g_CAN1_Rx_Event_Flag == 1 )
209     {
210 	g_CAN1_Rx_Event_Flag = 0;
211 	printf("Message:0x124 is Triggered!\n");
212 
213         /* 发送报文报文数据填充，此报文周期是1秒 */
214         TxMessage.StdId = TX_CAN_EVENT_ID;	  /* 标准标识符为0x000~0x7FF */
215         TxMessage.ExtId = 0x0000;             /* 扩展标识符0x0000 */
216         TxMessage.IDE   = CAN_ID_STD;         /* 使用标准标识符 */
217         TxMessage.RTR   = CAN_RTR_DATA;       /* 设置为数据帧  */
218         TxMessage.DLC   = 8;                  /* 数据长度, can报文规定最大的数据长度为8字节 */
219         
220         /* 填充数据，此处可以根据实际应用填充 */
221         for(i=0; i<TxMessage.DLC; i++)
222         {
223             TxMessage.Data[i] = 0x00;            
224         }
225         /* 填充数据，此处可以根据实际应用填充 */
226 	tx_counter = 0;
227 	
228 	/*更新第1帧数据*/
229 	TxMessage.Data[1] = 0x02;
230 	TxMessage.Data[7] = (++tx_counter);
231         /*  调用can_write发送CAN报文，第1帧 */
232         gCAN_COMM_STRUCT.can_write(gCAN_COMM_STRUCT.can_port, TxMessage);
233 	/*延时50ms,作为事件报文间隔*/
234 	usleep(50000);
235 
236 	/*更新第2帧数据*/
237 	TxMessage.Data[1] = 0x02;
238 	TxMessage.Data[7] = (++tx_counter);
239 	/*  调用can_write发送CAN报文，第2帧 */
240         gCAN_COMM_STRUCT.can_write(gCAN_COMM_STRUCT.can_port, TxMessage);
241 	/*延时50ms,作为事件报文间隔*/
242 	usleep(50000);
243 
244 	/*更新第3帧数据*/
245 	TxMessage.Data[1] = 0x02;
246 	TxMessage.Data[7] = (++tx_counter);
247 	/*  调用can_write发送CAN报文，第3帧 */
248         gCAN_COMM_STRUCT.can_write(gCAN_COMM_STRUCT.can_port, TxMessage);
249 	/*延时50ms,作为事件报文间隔*/
250 	usleep(50000);
251     }
252 }
```

**（4）周期事件型报文实现**

实现功能：

A.   编程实现周期发送报文（ID：0x125）；

B.   而当接收到一帧报文（ID：0x201）的信号ECU_RX_MSG1_signal2=1时，触发发送周期事件型报文（ID:0x125）， 让ECU_MSG3_signal9（Byte1字节bit0）=1，且连续发送三帧，且两帧报文间时间间隔为50ms，三帧发送完成后恢复成ECU_MSG3_signal5=0；

A.   事件触发条件：接收到报文(ID:0x201)，且ECU_RX_MSG1_signal2（Byte0字节bit1）为1

 

代码实现如下：

```c
255 /**********************************************************************
256 * 函数名称： void app_can_cycliceventmsg_test(void)
257 * 功能描述： CAN应用层测试发送周期事件混合报文(ID:0X125)
258 * 输入参数： 无
259 * 输出参数： 无
260 * 返 回 值： 无
261 * 修改日期             版本号        修改人           修改内容
262 * -----------------------------------------------
263 * 2020/05/13         V1.0             bert            创建
264 ***********************************************************************/
265 void app_can_cycliceventmsg_test(void)
266 {
267     unsigned char i=0;
268     
269     /* 发送报文定义 */
270     CanTxMsg TxMessage;
271     
272     /* 发送报文中用一个字节来作为事件触发计数器 */
273     static unsigned char tx_counter = 0;
274 
275     /* 以10ms为基准，通过timer计数器设置该处理函数后面运行代码的周期为1秒钟*/  
276     static unsigned int timer =0;
277 
278     if( g_CAN1_Rx_CE_Flag == 1)
279     {
280 	g_CAN1_Rx_CE_Flag = 0;
281 	printf("Message:0x125 is Triggered!\n");
282 
283 	/* 发送报文报文数据填充，此报文周期是1秒 */
284         TxMessage.StdId = TX_CAN_CE_ID;	     /* 标准标识符为0x000~0x7FF */
285         TxMessage.ExtId = 0x0000;             /* 扩展标识符0x0000 */
286         TxMessage.IDE   = CAN_ID_STD;         /* 使用标准标识符 */
287         TxMessage.RTR   = CAN_RTR_DATA;       /* 设置为数据帧  */
288         TxMessage.DLC   = 8;                  /* 数据长度, can报文规定最大的数据长度为8字节 */
289         
290         /* 清零数据区 */
291         for(i=0; i<TxMessage.DLC; i++)
292         {
293             TxMessage.Data[i] = 0x00;            
294         }
295 	/* 填充数据，此处可以根据实际应用填充 */
296 	tx_counter = 0;
297 
298         /*更新第1帧数据*/
299 	TxMessage.Data[1] = 0x01;
300 	TxMessage.Data[7] = (++tx_counter);
301         /*  调用can_write发送CAN报文，第1帧 */
302         gCAN_COMM_STRUCT.can_write(gCAN_COMM_STRUCT.can_port, TxMessage);
303 	/*延时50ms,作为事件报文间隔*/
304 	usleep(50000);
305 
306 	/*更新第2帧数据*/
307 	TxMessage.Data[1] = 0x01;
308 	TxMessage.Data[7] = (++tx_counter);
309 	/*  调用can_write发送CAN报文，第2帧 */
310         gCAN_COMM_STRUCT.can_write(gCAN_COMM_STRUCT.can_port, TxMessage);
311 	/*延时50ms,作为事件报文间隔*/
312 	usleep(50000);
313 
314 	/*更新第3帧数据*/
315 	TxMessage.Data[1] = 0x01;
316 	TxMessage.Data[7] = (++tx_counter);
317 	/*  调用can_write发送CAN报文，第3帧 */
318         gCAN_COMM_STRUCT.can_write(gCAN_COMM_STRUCT.can_port, TxMessage);
319 	/*延时50ms,作为事件报文间隔*/
320 	usleep(50000);
321     }
322 
323     /* 以10ms为基准，通过timer计数器设置该处理函数后面运行代码的周期为1秒钟*/  
324     if(timer++>100)
325     {
326         timer = 0;
327     }
328     else
329     {
330         return ;
331     }
332 
333     /* 发送报文报文数据填充，此报文周期是1秒 */
334     TxMessage.StdId = TX_CAN_CE_ID;	  /* 标准标识符为0x000~0x7FF */
335     TxMessage.ExtId = 0x0000;             /* 扩展标识符0x0000 */
336     TxMessage.IDE   = CAN_ID_STD;         /* 使用标准标识符 */
337     TxMessage.RTR   = CAN_RTR_DATA;       /* 设置为数据帧  */
338     TxMessage.DLC   = 8;                  /* 数据长度, can报文规定最大的数据长度为8字节 */
339         
340     /* 填充数据，此处可以根据实际应用填充 */
341     for(i=1; i<TxMessage.DLC; i++)
342     {
343 	TxMessage.Data[i] = 0x00;            
344     }
345      
346     /*  调用can_write发送CAN报文 */
347     gCAN_COMM_STRUCT.can_write(gCAN_COMM_STRUCT.can_port, TxMessage);
348 }
```

**（4）案例测试**

 

**第一步：测试周期报文**

运行socket_ecu_test，串口打印信息如下所示：
![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0031.png)

然后观察Vehicle Spy3软件获取的报文trace，如下所示：
报文ID:0x123,0x125两个报文均以1000ms的周期发送报文；

![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0046.png)

**第二步：测试事件型报文**
在Vehicle Spy3软件上Messages里面过滤出报文ID:0X201,0X124.
然后手动点击右侧的Tx Panel上的ID:0X201的报文，左侧Messages的记录为100ask_imx6开发板发出3帧ID:0x124的报文。
通过开发板串口打印信息看出：“Message:0x124 is Triggered!”,在这条打印信息之后，存在三帧ID:0x124的报文。
![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0047.png)
观察出左侧的Messages的trace如下图所示：
![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0048.png)
**第三步：测试周期事件型报文**
在Vehicle Spy3软件上Messages里面过滤出报文ID:0X201,0X125.
然后手动点击右侧的Tx Panel上的ID:0X201的报文，左侧Messages的记录为100ask_imx6开发板发出3帧ID:0x125的报文，但是报文数据与默认数据不同，数据内容Byte7依次为0x01,0x02,0x03。
通过开发板串口打印信息看出：“Message:0x125 is Triggered!”,在这条打印信息之后，存在三帧ID:0x124的报文。
![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0049.png)
观察出左侧的Messages的trace如下图所示：
ID:0X125正常情况下以1000ms的周期发送默认报文，当ID:201的报文触发事件，引起ID:0X125发送事件报文。
**（5）事件报文发送改进**
通过前面步骤，我们已经了解应用报文的发送类型和实现不同发送类型的方式，但是上面事件处理有一个缺陷，就是当事件触发时，发送时通过ucsleep()函数实现的报文间隔，这个延时会使得周期报文的周期变长，这个可以通过观察CAN报文trace查找到。
这里对案例“06_socketcan_ecu_application”做了一个小小的改进，对触发事件的处理采用周期计数来实现，具体请查看案例代码“07_socketcan_ecu_application_new”。
![](http://photos.100ask.net/NewHomeSite/LinuxCan_Image0050.png)
