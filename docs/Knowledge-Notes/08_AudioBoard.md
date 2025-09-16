# 8 ALSA

## 8.1 音频相关概念

​		音频信号是一种连续变化的模拟信号，但计算机只能处理和记录二进制的数字信号，由自然音源得到的音频信号必须经过一定的变换，成为数字音频信号之后，才能送到计算机中作进一步的处理。

​		数字音频系统通过将声波的波型转换成一系列二进制数据，来实现对原始声音的重现，实现这一步骤的设备常被称为（A/D）。A/D转换器以每秒钟上万次的速率对声波进行采样，每个采样点都记录下了原始模拟声波在某一时刻的状态，通常称之为样本（sample），而每一秒钟所采样的数目则称为采样频率，通过将一串连续的样本连接起来，就可以在计算机中描述一段声音了。对于采样过程中的每一个样本来说，数字音频系统会分配一定存储位来记录声波的振幅，一般称之为采样分辩率或者采样精度，采样精度越高，声音还原时就会越细腻。

![](http://photos.100ask.net/NewHomeSite/AudioBoard_Image001.png)

​		数字音频涉及到的概念非常多，对于在Linux下进行音频编程的程序员来说，最重要的是7406解声音数字化的两个关键步骤：采样和量化。

- 采样就是每隔一定时间就读一次声音信号的幅度，从本质上讲，采样是时间上的数字化。

- 量化则是将采样得到的声音信号幅度转换为数字值，从本质上讲，量化则是幅度上的数字化。

### 8.1.1 采样频率

​		采样频率是指将模拟声音波形进行数字化时，每秒钟抽取声波幅度样本的次数。采样频率的选择应该遵循奈奎斯特（Harry Nyquist）采样理论：如果对某一模拟信号进行采样，则采样后可还原的最高信号频率只有采样频率的一半，或者说只要采样频率高于输入信号最高频率的两倍，就能从采样信号系列重构原始信号。

![](http://photos.100ask.net/NewHomeSite/AudioBoard_Image002.png)

​		如上图所示 用40KHz的频率去采样20KHz的信号可以正确捕捉到原始信号。用30KHz的频率去采样20KHz的信号会出现混淆信号。

​		一般重建音乐信号时采用的最低采样频率为44.1KHz。在许多高品质的系统中，采用的48KHz的采样频率。

| 系统     | 采样频率 |
| -------- | -------- |
| 电话     | 8000Hz   |
| CD       | 44100Hz  |
| 专业音频 | 48000Hz  |
| DVD音频  | 96000Hz  |

### 8.1.2 量化位数

​		量化位数是对模拟音频信号的幅度进行数字化，它决定了模拟信号数字化以后的动态范围，常用的有8位、12位和16位。量化位越高，信号的动态范围越大，数字化后的音频信号就越可能接近原始信号，但所需要的存贮空间也越大。

​		音频应用中常用的数字表示方法为脉冲编码调制(Pulse-Code-Modulated，PCM)信号。在这种表示方法中，每个采样周期用一个数字电平对模拟信号的幅度进行编码。得到的数字波形是一组采样自输入模拟波形的近似值。由于所有A/D转换器的分辨率都是有限的，所以在数字音频系统中，A/D转换器带来的量化噪声是不可避免的。

![](http://photos.100ask.net/NewHomeSite/AudioBoard_Image003.png)

## 8.2 ALSA架构

​		ALSA全称是Advanced Linux Sound Architecture，中文音译是Linux高级声音体系。ALSA 是Linux内核2.6后续版本中支持音频系统的标准接口程序，由ALSA库、内核驱动和相关测 试开发工具组成，更好的管理Linux中音频系统。 

​		本小节将介绍ALSA的架构。

### 8.2.1 ALSA架构介绍

​		ALSA是Linux系统中为声卡提供驱动的内核组件。它提供了专门的库函数来简化相应应用程序的编写。相较于OSS的编程接口,ALSA的函数库更加便于使用。

​		对应用程序而言ALSA无疑是一个更佳的选择,因为它具有更加友好的编程接口,并且完全兼容于OSS。

​		ALSA系统包括7个子项目：

- 驱动包alsa-driver
- 开发包alsa-libs
- 开发包插件alsa-libplugins
- 设置管理工具包alsa-utils
- OSS接口兼容模拟层工具alsa-oss
- 特殊音频固件支持包alsa-finnware
- 其他声音相关处理小程序包alsa-tools

ALSA声卡驱动与用户空间体系结构交互如下图所示：

![](http://photos.100ask.net/NewHomeSite/AudioBoard_Image004.png)

## 8.3 移植ALSA库及工具

移植ALSA主要是移植alsa-Ub和alsa-utils。

- **alsa-lib**：用户空间函数库, 封装驱动提供的抽象接口, 通过文件libasound.so提供API给应用程序使用。

- **alsa-utils**：实用工具包,通过调用alsa-lib实现播放音频(aplay)、录音(arecord) 等工具。

![](http://photos.100ask.net/NewHomeSite/AudioBoard_Image005.png)

​		ALSA Util是纯应用层的软件，相当于ALSA设备的测试程序，ALSA-Lib则是支持应用API的中间层程序，ALSA-Util中的应用程序中会调用到ALSA-Lib中的接口来操作到我们的音频编解码芯片的寄存器，而lib中接口就是依赖于最底层驱动代码，因此移植ALSA程序的顺序就是先后移植Driver,Lib,Util。

### 8.3.1 ALSA库下载

​		ALSA首先需要在ALSA的官网上下载官网http://www.alsa-project.org下载alsa-lib和alsa-utils。

![](http://photos.100ask.net/NewHomeSite/AudioBoard_Image006.png)

如上图所示我们下载的版本为：

- alsa-lib-1.2.2.tar.bz2
- alsa-utils-1.2.2.tar.bz2

### 8.3.2 ALSA Lib编译

​		ALSA Lib移植不需要修改源码，只需要重新编译库代码以支持自己的平台。

```c
tar -xvf alsa-lib-1.0.27.2.tar.bz2 
cd alsa-lib-1.0.27.2  
CC=arm-none-linux-gnueabi-gcc
./configure --host=arm-linux  --prefix=/home/m/3rd/alsa/install/  
make  
make install 
```

​		在上述命令中./configure配置的几个重要的配置选项解释如下：

-  --host指定编译器，这里指定为交叉编译器，运行本配置命令前务必保证编译器已经可以在Shell下可以直接执行了。

-  --prefix指定编译后文件的安装路径，这样安装命令就还会指定的这个目录中创建lib和include两个目录。

### 8.3.3 ALSA Util编译

​		ALSA Util可以生成用于播放，录制，配置音频的应用可执行文件，测试驱动代码时用处很大，编译过程如下：

```c
tar -xvf alsa-utils-1.0.27.2.tar.bz2  
cd alsa-utils-1.0.27.2  
CC=arm-none-linux-gnueabi-gcc 
./configure --prefix=/home/m/3rd/alsa/install/ --host=arm-linux --with-alsa-inc-prefix=/home/m/3rd/alsa/install/include --with-alsa-prefix=/home/m/3rd/alsa/install/lib --disable-alsamixer --disable-xmlto --disable-nls  
make  
```

### 8.3.4 ALSA库和工具移植入嵌入式平台

​		ALSA库和测试工具的移植就是将相应库文件和可执行文件放在目标板上，以下文件 必须被拷贝至对应位置 : 

（1）ALSA Lib文件，放在/lib/中。

（2）配置文件放在/usr/local/share中，与编译时指定的目录相同。

（3）测试应用文件，ALSA Util能产生aplay、amixer、arecord，我们可以把这些可执行文件放在/usr/sbin中。

（4）内核目录中保证有/dev/snd/目录，这个目录下存放controlC0，pcmC0D0，/usr/sbintimer，timer这些设备文件，如果这些设备文件已经在/dev目录下，可手动拷贝到/snd目录中。

​		在LINUX系统中，每个设备文件都是文件。音频设备也是一样，它的设备文件被放在/dev/snd目录下，我们来看下这些设备文件：

```c
ls /dev/snd -l
crw-rw----+ 1 root audio 116,  2 5月  19 21:24 controlC0     用于声卡的
crw-rw----+ 1 root audio 116,  4 6月   6 19:31 pcmC0D0c
crw-rw----+ 1 root audio 116,  3 6月  11 11:53 pcmC0D0p
crw-rw----+ 1 root audio 116, 33 5月  19 21:24 timer
```

（1）controlC0：音频控制设备文件，例如通道选择，混音，麦克风的控制等；

（2）pcmC0D0c：声卡0设备0的录音设备，c表示capter；

（3）pcmC0D0p：声卡0设备0的播音设备，p表示play；

（4）timer：定时器设置。

## 8.4 ALSA的调试

​		本小节将着重讲解tinyalsa工具使用，tinyalsa 是 alsa-lib 的一个简化版。它提供了 pcm 和 control 的基本接口；没有太多太复杂的操作、功能。可以按需使用接口。 tinyalsa-utils 是基于 tinyalsa 的一些工具，下面对几个常用的工具作介绍。 

### 8.4.1 amixer

​		与 amixer 作用类似，用于操作 mixer control。

使用方法：

- 常用选项

| 选项        | 功能                        |
| ----------- | --------------------------- |
| -D,--device | 指定声卡设备, 默认使用card0 |

- 常用命令

| 命令     | 功能                             |
| -------- | -------------------------------- |
| controls | 列出指定声卡的所有控件           |
| contents | 列出指定声卡的所有控件的具体信息 |
| get      | 获取指定控件的信息               |
| set      | 设定指定控件的值                 |

举例：

```c
获取audiocodec声卡的所有控件名
amixer -Dhw:audiocodec controls
获取当前硬件音量
amixer -Dhw:audiocodec cget name='LINEOUT volume'
设置当前硬件音量
amixer -Dhw:audiocodec cget name='LINEOUT volume' 25 
```

### 8.4.2 aplay

​		aplay 是命令行的 ALSA 声卡驱动的播放工具，用于播放功能。
使用方法：

| 选项              | 功能                                                         |
| ----------------- | ------------------------------------------------------------ |
| -D,--device       | 指定声卡设备, 默认使用 default                               |
| -l,--list-devices | 列出当前所有声卡                                             |
| -t,--file-type    | 指定播放文件的格式, 如 voc,wav,raw, 不指定的情况下会去读取文件头部作识别 |
| -c,--channels     | 指定通道数                                                   |
| -f,--format       | 指定采样格式                                                 |
| -r,--rate         | 采样率                                                       |
| -d,--duration     | 指定播放的时间                                               |
| --period-size     | 指定 period size                                             |
| --buffer-size     | 指定 buffer size                                             |

举例：

```c
aplay -Dhw:audiocodec /mnt/UDISK/test.wav
```

### 8.4.3 arecord

​		arecord 是命令行的 ALSA 声卡驱动的录音工具，用于录音功能。
使用方法：

| 选项              | 功能                                                         |
| ----------------- | ------------------------------------------------------------ |
| -D,--device       | 指定声卡设备, 默认使用 default                               |
| -l,--list-devices | 列出当前所有声卡                                             |
| -t,--file-type    | 指定播放文件的格式, 如 voc,wav,raw, 不指定的情况下会去读取文件头部作识别 |
| -c,--channels     | 指定通道数                                                   |
| -f,--format       | 指定采样格式                                                 |
| -r,--rate         | 采样率                                                       |
| -d,--duration     | 指定播放的时间                                               |
| --period-size     | 指定 period size                                             |
| --buffer-size     | 指定 buffer size                                             |

举例：

```c
录制5s,通道数为2, 采样率为16000, 采样精度为16bit, 保存为wav文件
arecord -Dhw:audiocodec -f S16_LE -r 16000 -c 2 -d 5 /mnt/UDISK/test.wav
```

## 8.5 常用接口说明

​		从代码角度体现了alsa-lib和alsa-driver及hardwared的交互关系。用户层的alsa-lib通过操作alsa-driver创建的设备文件/dev/snd/pcmC0D0p等对内核层进行访问。内核层的alsa-drivier驱动再经由sound core对硬件声卡芯片进行访问。

![](http://photos.100ask.net/NewHomeSite/AudioBoard_Image007.png)

### 8.5.1 PCM接口

​		为了方便操作访问， alsa-lib 中封装了相关接口, 通过 pcmCXDXp/pcmCXDXc 节点 (/dev/snd/pcmCXDXx) 去实现播放、录音功能。

​		主要涉及到的接口： 

| 函数名                                 | 解释 |
| -------------------------------------- | ---- |
| snd_pcm_open                           |      |
| snd_pcm_info                           |      |
| snd_pcm_hw_params_any                  |      |
| snd_pcm_hw_params_set_access           |      |
| snd_pcm_hw_params_set_format           |      |
| snd_pcm_hw_params_set_channels         |      |
| snd_pcm_hw_params_set_rate_near        |      |
| snd_pcm_hw_params_set_buffer_size_near |      |
| snd_pcm_hw_params                      |      |
| snd_pcm_sw_params_current              |      |
| snd_pcm_sw_params                      |      |
| snd_pcm_readi                          |      |
| snd_pcm_writei                         |      |
| snd_pcm_close                          |      |

​		详细 pcm 接口说明请查阅： 

https://www.alsa-project.org/alsa-doc/alsa-lib/pcm.html
https://www.alsa-project.org/alsa-doc/alsa-lib/group___p_c_m.html

## 8.6 基于ALSA的音量控制程序设计

### 8.6.1 程序设计

- 文件列表：

| 序号 | 文件名         | 描述           |
| ---- | -------------- | -------------- |
| 1    | AlsaVolume.h   | 音量控制头文件 |
| 2    | AlsaVolume.cpp | 音量控制程序   |

- 成员函数设计：

| 序号 | 函数名           | 参数        | 参数描述 | 函数描述             |
| ---- | ---------------- | ----------- | -------- | -------------------- |
| 1    | setMasterVolume  | long volume | 音量值   | 设置音量             |
| 2    | getCurrentVolume | 无          | 无       | 获取当前音量         |
| 3    | increaseVolume   | 无          | 无       | 单步减小音量接口函数 |
| 4    | decreaseVolume   | 无          | 无       | 单步增加音量接口函数 |

- 成员变量设计：

| 序号 | 成员变量名     | 类型              | 描述                 |
| ---- | -------------- | ----------------- | -------------------- |
| 1    | _VOLUMECHANGE  | const float       | 音量调节步进大小     |
| 2    | handle         | snd_mixer_t*      | Mixer handle         |
| 3    | element_handle | snd_mixer_elem_t* | Mixer element handle |
| 4    | minVolume      | long              | 最小音量             |
| 5    | maxVolume      | long              | 最大音量             |

### 8.6.2 AlsaVolume 类的定义

```c
#pragma once
#include <alsa/asoundlib.h>
namespace rv1108_audio{
class AlsaVolume
{
  public:
    AlsaVolume();
    ~AlsaVolume();
    int setMasterVolume(long volume); 
    long getCurrentVolume();
    long increaseVolume();
    long decreaseVolume();
  protected:
    const float _VOLUMECHANGE = 5; 
  private:
    snd_mixer_t* handle = nullptr;
    snd_mixer_elem_t* element_handle = nullptr;
    long minVolume,maxVolume;
};
}// namespace rv1108_camera
```

### 8.6.3 AlsaVolume类中成员函数的实现

- AlsaVolume类的构造函数

```c
AlsaVolume::AlsaVolume()
{
    snd_mixer_selem_id_t* sid = NULL;
    const char* card = "default";
    const char* selem_name = "Playback";
    //1. 打开混音设备
    auto res = snd_mixer_open(&handle, 0);

    //2. attach HCTL to open mixer
    res = snd_mixer_attach(handle, card);

    //3. Register mixer simple element class.
snd_mixer_selem_register(handle, NULL, NULL);

    //4. 取得第一個 element，也就是 Master
snd_mixer_load(handle);

    //5. allocate an invalid snd_mixer_selem_id_t using standard alloca
snd_mixer_selem_id_alloca(&sid);

    //6. 设置元素ID的位置
snd_mixer_selem_id_set_index(sid, 0);

    //7. 设置元素ID的名字
    snd_mixer_selem_id_set_name(sid, selem_name);

    //8. 查找元素
    element_handle = snd_mixer_find_selem(handle, sid);

    res = snd_mixer_selem_get_playback_volume_range(element_handle, 
                                                                           &minVolume, 
                                                                           &maxVolume);
}
```

- 设置音量函数

```c
int AlsaVolume::setMasterVolume(long volume)
{
    long alsaVolume = volume * (maxVolume - minVolume) / 100 ;

    if(snd_mixer_selem_set_playback_volume_all(element_handle, alsaVolume) < 0){
        if(handle)
        snd_mixer_close(handle);
        return -1;
    }

    return 0;
}
```

- 获取当前音量函数

```c
long AlsaVolume::getCurrentVolume()
{
    long alsaVolume;
if(snd_mixer_selem_get_playback_volume(element_handle, SND_MIXER_SCHN_MONO, &alsaVolume) < 0){
    if(handle)
        snd_mixer_close(handle);
        return -1;
      }
    return (alsaVolume*100)/(maxVolume - minVolume);
}
```

- 音量步进减少函数

```c
long AlsaVolume::decreaseVolume()
{
    long newVolume = 0;
if (getCurrentVolume() >= 0 + _VOLUMECHANGE) // check that we won't go below minimum volume
        newVolume = getCurrentVolume() - _VOLUMECHANGE;
    else
        newVolume = 0;
    setMasterVolume(newVolume);
    return newVolume;
}
```

- 音量步进增加函数

```c
long AlsaVolume::increaseVolume()
{
    long newVolume = 0;
if (getCurrentVolume() <= 100 - _VOLUMECHANGE) // check that we don't go above the max volume
        newVolume = getCurrentVolume() + _VOLUMECHANGE;
    else
        newVolume = 100;
    setMasterVolume(newVolume);
    return newVolume;
}
```

## 8.7 ALSA基类的设计

### 8.7.1 程序设计

- 文件列表：

| 序号 | 文件名       | 描述           |
| ---- | ------------ | -------------- |
| 1    | AlsaBase.h   | ALSA基类头文件 |
| 2    | AlsaBase.cpp | 基类的实现程序 |

- public成员变量：

| 序号 | 成员变量名                 | 类型              | 描述             |
| ---- | -------------------------- | ----------------- | ---------------- |
| 1    | rate                       | int               | 码率             |
| 2    | channels                   | int               | 通道数           |
| 3    | bits_per_frame             | mutable int       | 每帧数据大小     |
| 4    | default_output_buffer_size | int               | 默认输出缓存大小 |
| 5    | frames                     | snd_pcm_uframes_t | 帧数             |
| 6    | buffer_size                | snd_pcm_uframes_t | 缓存大小         |
| 7    | buffer_frames              | snd_pcm_uframes_t | 缓存大小         |
| 8    | period_size                | snd_pcm_uframes_t | 时间段大小       |
| 9    | period_frames              | snd_pcm_uframes_t |                  |
| 10   | period_time                | unsigned int      |                  |
| 11   | buffer_time                | unsigned int      |                  |
| 12   | bits_per_sample            | size_t            |                  |

- protected成员变量：

| 序号 | 成员变量名    | 类型                  | 描述 |
| ---- | ------------- | --------------------- | ---- |
| 1    | device        | const char *          |      |
| 2    | handle        | snd_pcm_t *           |      |
| 3    | params        | snd_pcm_hw_params_t * |      |
| 4    | format        | snd_pcm_format_t      |      |
| 5    | access_type   | snd_pcm_access_t      |      |
| 6    | DEVICE_OPENED | bool                  |      |
| 7    | PARAMS_SETED  | bool                  |      |

### 8.7.2 AlsaBase类中成员函数的实现

- AlsaBase类的构造函数

```c
AlsaBase::AlsaBase(const std::string &dev)
{
device = dev.c_str();
        rate = 8000;
        channels = 2;
        format = SND_PCM_FORMAT_S16_LE;
        access_type = SND_PCM_ACCESS_RW_INTERLEAVED;
        frames = 480;

        DEVICE_OPENED = false;
        PARAMS_SETED = false;

        bits_per_sample = snd_pcm_format_physical_width(format);
        bits_per_frame = (bits_per_sample >> 3) * channels;
        
        default_output_buffer_size = frames * bits_per_frame / 8; // in byte

        buffer_frames = frames * 8;
        buffer_time = 0;
        
        period_frames = buffer_frames / 4;
        period_time = 0;
}

AlsaBase::~AlsaBase()
{
    if (DEVICE_OPENED){
        if((err = snd_pcm_close(handle)) < 0){
            ;
        }else{
            ;
        }

    }
}

int AlsaBase::set_params()
{

    if (!DEVICE_OPENED)
        return -1;
    // 分配硬件参数空间
    snd_pcm_hw_params_alloca(&params);

    //1、以默认值填充硬件参数
    if ((err = snd_pcm_hw_params_any(handle, params)) < 0) {
        return err;
    }

    //2、 Restrict a configuration space to contain only real hardware rates.
    if ((err = snd_pcm_hw_params_set_rate_resample(handle, params, 0)) < 0) {
        return err;
    }

    //3、设置存取方式
    if ((err = snd_pcm_hw_params_set_access(handle, params, access_type)) < 0) {
        return err;
    }

    //4、设置格式，S16_LE等
    if ((err = snd_pcm_hw_params_set_format(handle, params, format)) < 0) {
        return err;
    }

    //5 设置通道
    if ((err = snd_pcm_hw_params_set_channels(handle, params, channels)) < 0) {
        return err;
    }

    //6 设置码率
    unsigned int rrate;
    rrate =rate;
    if ((err = snd_pcm_hw_params_set_rate_near(handle, params, &rrate, NULL)) < 0) 	   {
        return err;
    }
    //7
    if (buffer_time == 0 && buffer_frames == 0)
    {
        err = snd_pcm_hw_params_get_buffer_time_max(params, &buffer_time, 0);
        assert(err >= 0);
        if (buffer_time > 500000)
            buffer_time = 500000;
    }
    //8
    if (period_time == 0 && period_frames == 0)
    {
        if (buffer_time > 0)
        period_time = buffer_time / 4;
    else
        period_frames = buffer_frames / 4;
    }
    //9
    if (period_time > 0)
    {
        err = snd_pcm_hw_params_set_period_time_near(handle,
                                                     params,
                                                     &period_time,
                                                     0);
    }                                                 
    else
    {
        err = snd_pcm_hw_params_set_period_size_near(handle,
                                                     params,
                                                     &period_frames,
                                                     0);
    }                                                 
    assert(err >= 0);
    //10
    if (buffer_time > 0)
    {
        err = snd_pcm_hw_params_set_buffer_time_near(handle, params,
                                                     &buffer_time,
                                                     0);
    }
    else
    {
        err = snd_pcm_hw_params_set_buffer_size_near(handle, params,
                                                     &buffer_frames);
    }
    assert(err >= 0);

    // 将参数写入设备
    if ((err = snd_pcm_hw_params(handle, params)) < 0)
    {
        return -1;
    }
    else
    {
        PARAMS_SETED = true;
    }
    snd_pcm_uframes_t t_buffer_frames;
    snd_pcm_hw_params_get_buffer_size(params, &t_buffer_frames);
    buffer_frames = t_buffer_frames;

    snd_pcm_uframes_t t_period_frames;
    snd_pcm_hw_params_get_period_size(params, &t_period_frames, 0);
    period_frames = t_period_frames;

    return 0;
}
```

## 8.8 基于ALSA音频的播放

### 8.8.1 程序设计

- 文件列表

| 序号 | 文件名           | 描述               |
| ---- | ---------------- | ------------------ |
| 1    | AlsaPlayback.h   | 音频播放控制头文件 |
| 2    | AlsaPlayback.cpp | 音频播放程序       |

- 成员函数设计

| 序号 | 函数名   | 参数                                                        | 参数描述 | 函数描述 |
| ---- | -------- | ----------------------------------------------------------- | -------- | -------- |
| 1    | playback | const char *input_buffer <br/> const long input_buffer_size |          | 播放音频 |

### 8.1.2 AlsaPlay类的定义

```c
#pragma once
#include "AlsaBase.h"
namespace rv1108_audio{
    
class AlsaPlayback : public AlsaBase
{
    public:
    AlsaPlayback(const std::string &dev);
~AlsaPlayback();

    int open_device();
    int playback(const char *input_buffer, const long input_buffer_size) const;
    private:
    int err;
};
}
```

### 8.1.3 AlsaPlayback类中成员函数的实现

- AlsaPlayback类的构造函数

```c
AlsaPlayback::AlsaPlayback(const std::string &dev) : AlsaBase(dev)
{
if (!DEVICE_OPENED)
	open_device();
}
```

```c
int AlsaPlayback::open_device()
{
        if(snd_pcm_open(&handle,
                        device,
                        SND_PCM_STREAM_PLAYBACK,
                        0) < 0)
        {
            DEVICE_OPENED = false;
        }
        else
        {
            DEVICE_OPENED = true;
        }
        return 0;
}
```

- playback函数的实现

```c
int AlsaPlayback::playback(const char *_input_buffer, const long input_buffer_size) const
{
        int res = -1;
        char *input_buffer = const_cast<char *>(_input_buffer);
        long r = input_buffer_size / bits_per_frame * 8;
        AUDIO_DEV_LOCK;
        while (r > 0)
        {
                snd_pcm_wait(handle, 100);
                do
                {
                        res = snd_pcm_writei(handle, input_buffer, frames);
                        if (res == -EPIPE){
                                AUDIO_DEV_UNLOCK;
                                snd_pcm_prepare(handle);
                                continue;
                        }
                }while (res < 0);
                r -= err;
                input_buffer += res * bits_per_frame / 8;
        }
        return 0;
}
```

## 8.9 基于ALSA音频的录制

### 8.9.1 程序设计

- 文件列表

| 序号 | 文件名          | 描述           |
| ---- | --------------- | -------------- |
| 1    | AlsaCapture.h   | 音频录制头文件 |
| 2    | AlsaCapture.cpp | 音频录制程序   |

- 成员函数设计

| 序号 | 函数名  | 参数 | 参数描述 | 函数描述 |
| ---- | ------- | ---- | -------- | -------- |
| 1    | capture | 无   |          | 录制音频 |

- 成员变量设计

| 序号 | 成员变量名     | 类型              | 描述                 |
| ---- | -------------- | ----------------- | -------------------- |
| 1    | _VOLUMECHANGE  | const float       | 音量调节步进大小     |
| 2    | handle         | snd_mixer_t*      | Mixer handle         |
| 3    | element_handle | snd_mixer_elem_t* | Mixer element handle |
| 4    | minVolume      | long              | 最小音量             |
| 5    | maxVolume      | long              | 最大音量             |

### 8.9.2 AlsaPlay类的定义

```c
#pragma once
#include "AlsaBase.h"
namespace rv1108_audio{

class AlsaCapture : public AlsaBase
{
  public:
    // 输出数据缓存
    char *output_buffer;
    // 输出缓存大小
    unsigned int output_buffer_size;
    // int frames_to_read;
    // 用于返回已读的帧数
    int frames_readed;

    AlsaCapture(const std::string &dev);
    ~AlsaCapture();
    int open_device();
    int capture();
  private:
    int err;
};

}
```

### 8.9.3 AlsaCapture类中成员函数的实现

- AlsaCapture类的构造函数

```c
AlsaCapture::AlsaCapture(const std::string &dev) : AlsaBase(dev)
{
    if (!DEVICE_OPENED)
        open_device();
    if (!PARAMS_SETED)
        set_params();

    output_buffer_size = default_output_buffer_size;
    output_buffer = (char *)calloc(output_buffer_size, sizeof(char));
}
```

```c
int AlsaCapture::open_device()
{
    if ((err = snd_pcm_open(&handle,
                            device,
                            SND_PCM_STREAM_CAPTURE,
                            0)) < 0)
    { 
        DEVICE_OPENED = false;
        return -1;
    }
    else
    {
        DEVICE_OPENED = true;
    }

    return 0;
}
```

- AlsaCapture类的构造函数

```c
int AlsaCapture::capture()
{
    while (1)
    {
        int err;

        if ((frames_readed = snd_pcm_readi(handle, output_buffer, frames)) < 0)
        {
            // Overrun happened
            if (frames_readed == -EPIPE)
            {
                snd_pcm_prepare(handle);
                continue;
            }
            return -1;
        }
        else
        {
            return frames_readed;
        }
    }
}
```































