---
sidebar_position: 1
---
# 3 输入系统

## 3.1 什么是输入系统？

​		在了解输入系统之前，先来了解什么是输入设备？常见的输入设备有键盘、鼠标、遥控杆、书写板、触摸屏等等，用户通过这些输入设备与Linux系统进行数据交换，Linux系统为了统一管控和处理这些设备，于是就实现了一套固定的与硬件无关的输入系统框架，供用户空间程序使用，这就是输入系统。

## 3.2 输入系统应用框架描述

​		在Linux输入系统中，主要分三层进行管理，分别是input core(输入系统核心层)、drivers(输入系统驱动层)以及event handlers(输入系统事件层)，如下图所示，这就是Linux输入系统的基本框架:

![](http://photos.100ask.net/NewHomeSite/InputSystem_Image001.png)

​		举个非常简单的例子，比如用户按下键盘里的其中一个按键，它遵循流程是这样的：

​		按键按下-->输入系统驱动层-->输入系统核心层-->输入系统事件层--->用户空间

​		对于应用程序软件编程的角度，我们只需要关注用户空间是怎么得到按键按下以后获取的是什么事件就可以了，例如我想知道我当前按下的按是短按还是长按？或者我想知道当前我按下键盘的是空格键还是回车键等等。

## 3.3 输入系统事件的读取与分析

​		用户空间的设备节点那么多，怎么知道当前是哪个设备上报的呢？例如想知道键盘是由哪个设备节点上报的，就可以通过以下这条指令来获取：

```c
cat /proc/bus/input/devices
```

​		这条指令的含义就是获取与event对应的相关设备信息，在ubuntu系统上，我们输入这个指令可以看到以下结果： 

![](http://photos.100ask.net/NewHomeSite/InputSystem_Image002.png)

​		那么这里的I、N、P、S、U、H、B对应的每一行是什么含义呢？

**I:id of the device(设备ID)**

该参数由结构体struct input_id来进行描述

```c
41 struct input_id {
42 	//总线类型
43 	__u16 bustype;
44 	//与厂商相关ID
45 	__u16 vendor;
46 	//与产品相关ID
47 	__u16 product;
48 	//版本ID
49 	__u16 version;
50 };
```

**N:name of the device**

设备名称

**P:physical path to the device in the system hierarchy**

系统层次结构中设备的物理路径。

**S:sysfs path**

位于sys文件系统的路径

**U:unique identification code for the device(if device has it)**

设备的唯一标识码

**H:list of input handles associated with the device.**

与设备关联的输入句柄列表。

**B:bitmaps(位图)**

PROP:device properties and quirks.

EV:types of events supported by the device.

KEY:keys/buttons this device has.

MSC:miscellaneous events supported by the device.

LED:leds present on the device.

PROP:设备属性和怪癖。

EV:设备支持的事件类型。

KEY:此设备具有的键/按钮。

MSC:设备支持的其他事件。

LED:设备上的指示灯。

通过了解以上参数的含义，结合以下指令

```c
cat /proc/bus/input/devices
```

显示出来的信息很容易可以知道event1即是键盘上报的事件设备节点，通过读取这个event1即可获得当前用户按下的按键具体是哪个事件。

**使用cat命令来测试键盘事件**

![](http://photos.100ask.net/NewHomeSite/InputSystem_Image003.png)

当我们在终端输入

```c
cat /dev/input/event1
```

​		这条指令并按回车键后可以看到一堆乱码数据，这些数据我们看不懂，但是我们可以知道如果按下了按键，终端有反馈消息，这时候就知道这个事件就是我们当前操作的这个设备上报的事件，那么如何能让这些数据看得懂呢？这时候可以使用hexdump命令来读取键盘事件。

**使用hexdump命令来测试键盘事件**

![](http://photos.100ask.net/NewHomeSite/InputSystem_Image004.png)

这些数值是通过input_event结构体来上报的，它位于/usr/include/linux/input.h这个头文件，input_event结构体描述如下：

```c
24 struct input_event {
25 	//事件发生的事件
26 	struct timeval time;
27 	//事件类型
28 	__u16 type;
29 	//事件值
30 	__u16 code;
31 	//该事件上报的数值
32 	__s32 value;
33 };
```

而input_event结构体中的time即是：

```c
1 struct timeval
2 {
3 	__time_t tv_sec;        /* Seconds. */
4 	__suseconds_t tv_usec;    /*Microseconds. */
5 };
```

​		其中tv_sec为Epoch到创建struct timeval时的秒数，tv_usec为微秒数，即秒后面的零头，Epoch的意思是指定为1970年一月一日凌晨零点零分零秒，格林威治时间。

​		回到input_event结构体，事件类型type主要有以下三种，分别是：相对事件、绝对事件、键盘事件

​		例如：鼠标就是一个相对事件，有些情况下也有可能是绝对事件，当移动鼠标的时候，type类型也就是底层上报给用户的事件类型，那么code表示的就是相对于鼠标当前的位置的X或者Y的坐标，value则表示相对于当前的位置偏移了多少。

**事件类型(type)**

文件头文件路径：

```c
/usr/include/linux/input-event-codes.h
```

当然Linux内核版本较低的有可能在以下路径的这个头文件：

```c
/usr/include/linux/input.h
```

```c
34 /*
35  * Event types
36  */
37 
38 #define EV_SYN			0x00	//同步事件
39 #define EV_KEY			0x01	//按键事件
40 #define EV_REL			0x02	//相对事件
41 #define EV_ABS			0x03	//绝对事件
42 #define EV_MSC			0x04
43 #define EV_SW			0x05
44 #define EV_LED			0x11
45 #define EV_SND			0x12
46 #define EV_REP			0x14
47 #define EV_FF			0x15
48 #define EV_PWR			0x16
49 #define EV_FF_STATUS		0x17
50 #define EV_MAX			0x1f
51 #define EV_CNT			(EV_MAX+1)
```

**事件值(code)**

由于事件值种类繁多，这里就不一一列举出来，这里举例键盘的部分事件值:

文件头文件路径：

```c
/usr/include/linux/input-event-codes.h
```

当然Linux内核版本较低的有可能在以下路径的这个头文件：

```c
/usr/include/linux/input.h
64 /*
65  * Keys and buttons
66  *
67  * Most of the keys/buttons are modeled after USB HUT 1.12
68  * (see http://www.usb.org/developers/hidpage).
69  * Abbreviations in the comments:
70  * AC - Application Control
71  * AL - Application Launch Button
72  * SC - System Control
73  */
74 
75 #define KEY_RESERVED		0
76 #define KEY_ESC			1
77 #define KEY_1			2
78 #define KEY_2			3
79 #define KEY_3			4
80 #define KEY_4			5
81 #define KEY_5			6
82 #define KEY_6			7
83 #define KEY_7			8
84 #define KEY_8			9
85 #define KEY_9			10
86 #define KEY_0			11
87 #define KEY_MINUS		12
88 #define KEY_EQUAL		13
89 #define KEY_BACKSPACE		14
90 #define KEY_TAB			15
91 #define KEY_Q			16
92 #define KEY_W			17
...
```

当然还有鼠标事件值、摇杆事件值、触摸屏事件值等等。

**该事件上报的数值(value)**

​		这部分上面已经举了鼠标的案例进行了介绍，接下来我们就通过应用程序来获取事件，后面章节将会通过鼠标、键盘以及触摸屏三个案例，进一步的了解输入系统的应用编程。

## 3.4 输入系统应用编程实战一：通用USB鼠标事件读取

​		根据前面章节的讲解，如果我们需要获取USB鼠标的事件，首先我们要先通过cat /proc/bus/input/devices这个指令查询与USB鼠标事件对应的相关设备信息，通过实际测试得知，event2为USB鼠标上报的事件节点。

![](http://photos.100ask.net/NewHomeSite/InputSystem_Image005.png)

接下来，通过hexdump命令测试一下鼠标事件的输出:

![](http://photos.100ask.net/NewHomeSite/InputSystem_Image006.png)

​		具体上报的数值是什么含义可以结合3.3章节进行分析，这里就不再进行阐述，本节的目的是编写一个获取通用USB鼠标的事件的应用程序，要获取一个事件，我们需要了解以下几个部分。

**1** **设备上报事件类型(type)**

通过3.3章节，我们知道找到对应的事件类型的定义：

文件头文件路径：

```c
/usr/include/linux/input-event-codes.h
```

当然Linux内核版本较低的有可能在以下路径的这个头文件：

```c
/usr/include/linux/input.h
```

```c
34 /*
35  * Event types
36  */
37 
38 #define EV_SYN			0x00	//同步事件
39 #define EV_KEY			0x01	//按键事件
40 #define EV_REL			0x02	//相对事件
41 #define EV_ABS			0x03	//绝对事件
42 #define EV_MSC			0x04
43 #define EV_SW			0x05
44 #define EV_LED			0x11
45 #define EV_SND			0x12
46 #define EV_REP			0x14
47 #define EV_FF			0x15
48 #define EV_PWR			0x16
49 #define EV_FF_STATUS		0x17
50 #define EV_MAX			0x1f
51 #define EV_CNT			(EV_MAX+1)
```

**2** **设备上报的事件值(code)**

由于本节我们写的是通用USB鼠标的应用程序，所以我们找到鼠标相关的code,如下：

文件头文件路径：

```c
/usr/include/linux/input-event-codes.h
```

当然Linux内核版本较低的有可能在以下路径的这个头文件：

```c
/usr/include/linux/input.h
```

```c
696 /*
697  * Relative axes
698  */
699 
700 #define REL_X			0x00	//相对X坐标
701 #define REL_Y			0x01	//相对Y坐标
702 #define REL_Z			0x02
703 #define REL_RX			0x03
704 #define REL_RY			0x04
705 #define REL_RZ			0x05
706 #define REL_HWHEEL		0x06
707 #define REL_DIAL		0x07
708 #define REL_WHEEL		0x08
709 #define REL_MISC		0x09
710 #define REL_MAX			0x0f
711 #define REL_CNT			(REL_MAX+1)
```

在这里，我们暂时只会用来REL_X和REL_Y这两个参数。

​		那么所谓的value,就是选择具体的事件类型(type)和具体的事件值(code)以后所反应出来的值，鼠标就是相对于当前X或者相对于当前Y的值，接下来，我们来看一下如何来读取鼠标事件。

在编写input应用程序之前，在程序中需要包含以下头文件：

```c
#include <linux/input.h>
```

程序编写步骤：

1 定义一个结构体变量input_event用于描述input事件

```c
struct input_event event_mouse ;
```

2 打开input设备的事件节点，这里我们获取的通用USB鼠标是event2

```c
open("/dev/input/event2",O_RDONLY);
```

3 读取事件

```c
read(fd ,&event_mouse ,sizeof(event_mouse));
```

4 根据上报的事件进行处理

```c
//判断鼠标上报的类型，可能为绝对事件，也有可能是相对事件
if(EV_ABS == event_mouse.type || EV_REL == event_mouse.type)
{
   //code表示相对位移X或者Y，当判断是X时，打印X的相对位移value
   //当判断是Y时，打印Y的相对位移value
   if(event_mouse.code == REL_X)
   {
      printf("event_mouse.code_X:%d\n", event_mouse.code);
      printf("event_mouse.value_X:%d\n", event_mouse.value);
   }
   else if(event_mouse.code == REL_Y)
   {
      printf("event_mouse.code_Y:%d\n", event_mouse.code);
      printf("event_mouse.value_Y:%d\n", event_mouse.value);
   }
}
```

5 关闭文件描述符

```c
close(fd);
```

不难发现，获取一个输入系统事件，也是标准的文件操作，这体现了Linux一切皆文件的思想。

完整的程序案例如下：

```c
01 #include <stdio.h>
02 #include <unistd.h>
03 #include <stdlib.h>
04 #include <fcntl.h>
05 #include <linux/input.h>
06 
07 int main(void)
08 {
09     //1、定义一个结构体变量用来描述input事件
10     struct input_event event_mouse ;
11     //2、打开input设备的事件节点  我的通用USB鼠标事件的节点是event2
12     int fd    = -1 ;
13 	   fd = open("/dev/input/event2", O_RDONLY);
14     if(-1 == fd)
15     {
16         printf("open mouse event fair!\n");
17         return -1 ;
18     }
19     while(1)
20     {
21         //3、读事件
22         read(fd, &event_mouse, sizeof(event_mouse));
23 		   if(EV_ABS == event_mouse.type || EV_REL == event_mouse.type)
24 		   {
25             //code表示相对位移X或者Y，当判断是X时，打印X的相对位移value
26 			   //当判断是Y时，打印Y的相对位移value
27             if(event_mouse.code == REL_X)
28             {
29 				   printf("event_mouse.code_X:%d\n", event_mouse.code);
30                 printf("event_mouse.value_X:%d\n", event_mouse.value);
31             }
32             else if(event_mouse.code == REL_Y)
33             {
34                 printf("event_mouse.code_Y:%d\n", event_mouse.code);
35                 printf("event_mouse.value_Y:%d\n", event_mouse.value);
36             }
37 		}
38     }
39     close(fd);
40     return 0 ;
41 }
```

代码编写完毕后，然后执行

```c
gcc test_mouse.c -o test_mouse
```

编译程序：

![](http://photos.100ask.net/NewHomeSite/InputSystem_Image007.png)

编译成功后会生成test_mouse，接下来执行test_mouse这个程序。

当鼠标左右移动的时候上报的事件：

![](http://photos.100ask.net/NewHomeSite/InputSystem_Image008.png)

这时候可以看到，只有相对于X的事件值在发生，这时候打印的value是X方向相对于原点坐标的偏移值。

当鼠标上下移动的时候上报的事件：

![](http://photos.100ask.net/NewHomeSite/InputSystem_Image009.png)

这时候可以看到，只有相对于Y的事件值在发生，这时候打印的value是Y方向相对于原点坐标的偏移值。

## 3.5 输入系统应用编程实战二：通用键盘事件读取

​		如何获取键盘事件在3.3章节已经有了相应的介绍，这里就不再写出来，本节实现的是通用键盘事件的获取，结合3.4章节获取鼠标事件的方式，这里通用键盘事件的节点为event1,通过结合3.3章节与3.4章节，编写步骤如下：

在编写input应用程序之前，在程序中需要包含以下头文件：

```c
#include <linux/input.h>
```

程序编写步骤：

1 定义一个结构体变量input_event用于描述input事件

```c
struct input_event event_keyboard ;
```

2 打开input设备的事件节点，我的通用键盘事件的节点是event1

```c
open("/dev/input/event1",O_RDONLY);
```

3 读取事件

```c
read(fd ,&event_keyboard ,sizeof(event_keyboard));
```

4 根据上报的事件进行处理

```c
//判断键盘事件上报的类型
if(EV_KEY == event_keyboard.type)
{
    if(1 == event_keyboard.value)
      printf("事件类型:%d  事件值:%d 按下\n", event_keyboard.type, 				         event_keyboard.code);
    else if(0 == event_keyboard.value)
      printf("事件类型:%d  事件值:%d 释放\n", event_keyboard.type, event_keyboard.code);
}
```

5 关闭文件描述符

```c
close(fd);
```

完整程序案例实现如下：

```c
01 #include <stdio.h>
02 #include <unistd.h>
03 #include <stdlib.h>
04 #include <fcntl.h>
05 #include <linux/input.h>
06 
07 int main(void)
08 {
09     //1、定义一个结构体变量用来描述input事件
10     struct input_event event_keyboard ;
11     //2、打开input设备的事件节点  我的通用键盘事件的节点是event1
12     int fd    = -1 ;
13 	   fd = open("/dev/input/event1", O_RDONLY);
14     if(-1 == fd)
15     {
16         printf("open mouse event fair!\n");
17         return -1 ;
18     }
19     while(1)
20     {
21         //3、读事件
22         read(fd, &event_keyboard, sizeof(event_keyboard));
23 		   if(EV_KEY == event_keyboard.type)
24 		   {
25 				if(1 == event_keyboard.value)
26 					printf("事件类型:%d  事件值:%d 按下\n",event_keyboard.type,event_keyboard.code);
27 				else if(0 == event_keyboard.value)
28 					printf("事件类型:%d  事件值:%d 释放\n",event_keyboard.type,event_keyboard.code);
29 		}
30     }
31     close(fd);
32     return 0 ;
33 }
```

​		不难发现，通用USB键盘程序编写步骤与通用USB鼠标程序编写步骤几乎一样，区别只是读取的事件类型以及后面处理的数据value不同。

代码编写完毕后，然后执行

```c
gcc test_keyboard.c -o test_keyboard
```

编译程序：

![](http://photos.100ask.net/NewHomeSite/InputSystem_Image010.png)

编译成功后会生成test_keyboard，接下来执行test_keyboard这个程序。

![](http://photos.100ask.net/NewHomeSite/InputSystem_Image011.png)

当按下按键时候，可以观察到按键的按下和释放的过程，这其实就是同一个事件下的两个不同的状态。

## 3.6 输入系统应用编程实战三：百问网imx6ul开发板触摸屏事件读取

​		在前面，我们已经熟悉了鼠标、键盘的基本操作，但发现一个规律，那就是编程方法类似，唯一不同的地方就是获取的事件类型以及事件值不同，那么触摸屏在input系统中是一类什么事件呢？

​		一般情况下，触摸屏在input系统中属于绝对事件，也就是触摸的坐标点X和Y会在屏幕的分辨率范围内上报一个绝对的坐标。

绝对事件对应的值为：EV_ABS

相应X和Y分量的值分别为：

ABS_MT_POSITION_X、ABS_MT_POSITION_Y

通过结合前面的章节内容，很容易编写如下程序：

```c
01 #include <stdio.h>
02 #include <unistd.h>
03 #include <fcntl.h>
04 #include <stdlib.h>
05 #include <linux/input.h>
06 
07 int main(int argc, char **argv)
08 {
09     int tp_fd  = -1 ;
10     int tp_ret = -1 ;
11     int touch_x,touch_y ;
12     struct input_event imx6ull_ts ;  
13     //1、打开触摸屏事件节点
14     tp_fd = open("/dev/input/event1",O_RDONLY);
15     if(tp_fd < 0)
16     {
17        printf("open /dev/input/event1 fail!\n");
18        return -1 ;
19     }
20     while(1)
21     {  
22 	 		//2、获取触摸屏相应的事件，并打印出当前触摸的坐标
23          read(tp_fd ,&imx6ull_ts ,sizeof(imx6ull_ts));  
24          switch(imx6ull_ts.type)
25 	 		{  
26 	    		case EV_ABS:  
27 		 		if(imx6ull_ts.code == ABS_MT_POSITION_X)  
28 		    		touch_x = imx6ull_ts.value ;
29 		 		if(imx6ull_ts.code == ABS_MT_POSITION_Y) 
30 		    		touch_y = imx6ull_ts.value ;
31 		 		break ;
32 		 		defalut:  
33 		 		break ;  
34 	 		}     	
35 	 		printf("touch_x:%d touch_y:%d\n",touch_x,touch_y);
36 	 		usleep(100);
37     }	
38     close(tp_fd);
39     return 0;
40 }
```

代码编写完毕后，然后执行

```c
gcc test_touchscreen.c -o test_touchscreen
```

交叉编译程序：(注意这里是要在开发板运行，不是在PC端)

![](http://photos.100ask.net/NewHomeSite/InputSystem_Image012.png)

接下来启动开发板，然后串口终端输出rz命令，等待接收PC端的文件，这里我们将test_touchscreen这个文件传输到开发板。

![](http://photos.100ask.net/NewHomeSite/InputSystem_Image013.png)

具体操作步骤可参考第11章：PC和开发板之间传输文件

接下来给test_touchscreen添加可执行权限:

![](http://photos.100ask.net/NewHomeSite/InputSystem_Image014.png)

执行test_touchscreen，然后用手触摸屏，可以看到有相应的坐标值打印：

![](http://photos.100ask.net/NewHomeSite/InputSystem_Image015.png)

















