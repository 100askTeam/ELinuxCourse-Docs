import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'

import styles from './styles.module.css'

const courseGroups = [
    {
        id: 'core',
        eyebrow: 'CORE CURRICULUM',
        title: '核心教程体系',
        description: '从学习路线、开发环境一路进入应用、驱动和综合项目，适合按篇系统学习。',
        tone: 'blue',
        courses: [
            {mark: 'C', title: 'C语言基础语法与STM32实践', description: '补齐嵌入式开发所需的 C 语言基础，并结合 STM32 理解实际用法。', href: '/docs/Linux-CourseList/CLanguageBasic/Introduction', tag: '基础'},
            {mark: '01', title: '第1篇：学习路线、教程介绍、资料下载', description: '了解课程组成、学习顺序以及配套资料的获取方式。', href: '/docs/Linux-CourseList/Part1/Introduction', tag: '导学'},
            {mark: '02', title: '第2篇：Ubuntu基本操作', description: '完成虚拟机、Ubuntu 和常用 Linux 命令的基础训练。', href: '/docs/Linux-CourseList/Part2/Introduction', tag: '环境'},
            {mark: '03', title: '第3篇：环境搭建与开发板操作', description: '搭建交叉开发环境，掌握开发板连接、烧写和调试流程。', href: '/docs/Linux-CourseList/Part3/Introduction', tag: '实操'},
            {mark: '04', title: '第4篇：嵌入式Linux应用程序基础知识', description: '学习文件 IO、进程线程、网络通信和常用设备访问。', href: '/docs/Linux-CourseList/Part4/Introduction', tag: '应用'},
            {mark: '05', title: '第5篇：嵌入式Linux驱动程序基础知识', description: '进入字符设备、总线模型、设备树和中断等驱动基础。', href: '/docs/Linux-CourseList/Part5/Introduction', tag: '驱动'},
            {mark: '06', title: '第6篇：嵌入式Linux项目基础', description: '把应用与驱动能力组合到完整的嵌入式 Linux 项目中。', href: '/docs/Linux-CourseList/Part6/Introduction', tag: '项目'},
        ],
    },
    {
        id: 'quick',
        eyebrow: 'QUICK START',
        title: '快速入门课程',
        description: '希望尽快动手、先建立开发闭环，可以从这些实验型课程开始。',
        tone: 'green',
        courses: [
            {mark: 'APP', title: '嵌入式Linux应用开发入门实验班', description: '从开发环境到第一个应用项目，用较短路径建立应用开发体验。', href: '/docs/Linux-CourseList/ElinuxAPPQuick/Introduction', tag: '快速项目'},
            {mark: 'DRV', title: '嵌入式Linux驱动开发入门实验班', description: '通过可复用模板理解驱动框架，适合第一次接触 Linux 驱动。', href: '/docs/Linux-CourseList/LLDQuick/Introduction', tag: '套模板'},
            {mark: '70D', title: '70天30节Linux驱动开发快速入门', description: '以更细的训练节奏学习字符设备、设备树和常用硬件接口。', href: '/docs/Linux-CourseList/27-70dayLinuxQuickDev/Introduction', tag: '系统训练'},
        ],
    },
    {
        id: 'system',
        eyebrow: 'SYSTEM BUILD',
        title: '系统构建课程',
        description: '面向需要定制产品系统、根文件系统和软件包的开发者。',
        tone: 'amber',
        courses: [
            {mark: 'BR', title: '使用Buildroot制作根文件系统', description: '掌握 Buildroot 配置、软件包管理和根文件系统自动化构建。', href: '/docs/Linux-CourseList/ElinuxQuickBuildroot/Introduction', tag: 'Buildroot'},
            {mark: 'BB', title: '使用Busybox制作根文件系统', description: '理解根文件系统的基本组成，并从 BusyBox 开始手工构建。', href: '/docs/Linux-CourseList/eLinuxQuickROOTFS/Introduction', tag: 'BusyBox'},
        ],
    },
    {
        id: 'project',
        eyebrow: 'PROJECT LAB',
        title: '项目与专题课程',
        description: '围绕图形界面、摄像头、物联网和工业通信完成更贴近产品的综合实践。',
        tone: 'violet',
        courses: [
            {mark: 'GUI', title: '百问网LVGL v8系列课程', description: '基于 LVGL v8.2 学习控件、布局和嵌入式图形界面开发。', href: '/docs/Linux-CourseList/lvgl_v8.2/Introduction', tag: 'LVGL'},
            {mark: 'CAM', title: '嵌入式Linux相机', description: '围绕摄像头采集、图像数据和 Linux 多媒体接口展开实践。', href: '/docs/Linux-CourseList/ElinuxCamera/Introduction', tag: '摄像头'},
            {mark: 'MQT', title: '使用MQTT实现智能家居', description: '学习发布订阅通信，并完成设备消息交互和智能家居案例。', href: '/docs/Linux-CourseList/ELinuxMQTT/Introduction', tag: '物联网'},
            {mark: 'MON', title: '智慧家居视频监控系统', description: '综合视频采集、网络传输和系统集成搭建监控应用。', href: '/docs/Linux-CourseList/SmartHomeVideoSystem/Introduction', tag: '综合项目'},
            {mark: 'QT', title: 'QT工业物联网开发实战', description: '结合 OpenOCD 烧录、Modbus 通信与 Qt 界面完成工业物联网实践。', href: '/docs/Linux-CourseList/QTIndustrialIoTOpenOCDModbus/Introduction', tag: '工业通信'},
            {mark: 'PIC', title: '数码相框与文件浏览器', description: '通过图片显示和文件浏览理解应用界面与文件系统协作。', href: '/docs/Linux-CourseList/ElinuxDigitalphotoFileBrowser/Introduction', tag: '应用项目'},
            {mark: 'EBK', title: '嵌入式Linux电子书阅读器', description: '完成文本读取、字库显示、页面交互和阅读器功能组合。', href: '/docs/Linux-CourseList/ELinuxeBook/Introduction', tag: '界面项目'},
        ],
    },
]

const startingPoints = [
    {label: '第一次学习', title: '先看学习路线', description: '根据基础确定课程顺序，避免从项目中间开始。', href: '/docs/Learn-Linux/LearnStudyPath'},
    {label: '系统查阅', title: '阅读完整手册', description: '使用 V5.3 在线手册按章查阅应用和驱动知识。', href: '/docs/Linux-Application-Development-Manual'},
    {label: '直接动手', title: '选择快速入门', description: '优先完成应用或驱动实验，再回头补充理论体系。', href: '#quick'},
]

function ArrowIcon() {
    return (
        <svg viewBox='0 0 20 20' aria-hidden='true'>
            <path d='M4 10h11M11 5l5 5-5 5' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.8'/>
        </svg>
    )
}

function CourseCard({course, index, tone}) {
    return (
        <Link className={`${styles.courseCard} ${styles[`courseCard_${tone}`]}`} to={course.href}>
            <div className={styles.courseMark}>{course.mark}</div>
            <div className={styles.courseContent}>
                <div className={styles.courseMeta}>
                    <span>{course.tag}</span>
                    <small>{String(index + 1).padStart(2, '0')}</small>
                </div>
                <Heading as='h3'>{course.title}</Heading>
                <p>{course.description}</p>
                <div className={styles.courseAction}>打开课程 <ArrowIcon/></div>
            </div>
        </Link>
    )
}

export default function CourseCatalog() {
    const totalCourses = courseGroups.reduce((total, group) => total + group.courses.length, 0)

    return (
        <div className={styles.catalog}>
            <header className={styles.hero}>
                <div className={styles.heroGrid}></div>
                <div className={styles.heroContent}>
                    <span className={styles.eyebrow}>100ASK COURSE LIBRARY</span>
                    <Heading as='h1'>嵌入式 Linux 课程中心</Heading>
                    <p>从基础操作、应用开发、驱动开发到系统构建和项目实战，把人工整理的课程内容变成一套更容易选择和持续学习的知识体系。</p>
                    <div className={styles.heroActions}>
                        <Link className={styles.primaryAction} to='/docs/Learn-Linux/LearnStudyPath'>查看学习路线 <ArrowIcon/></Link>
                        <Link className={styles.secondaryAction} to='/docs/Linux-Application-Development-Manual'>阅读完整手册</Link>
                    </div>
                </div>
                <div className={styles.heroStats}>
                    <div><strong>{totalCourses}</strong><span>门课程与专题</span></div>
                    <div><strong>4</strong><span>类学习方向</span></div>
                    <div><strong>6</strong><span>篇核心教程</span></div>
                </div>
            </header>

            <section className={styles.startSection} aria-labelledby='course-start-title'>
                <div className={styles.sectionIntro}>
                    <span className={styles.sectionIndex}>01</span>
                    <div>
                        <Heading id='course-start-title' as='h2'>先确定起点</Heading>
                        <p>课程没有唯一顺序，选择与你当前目标最接近的入口即可。</p>
                    </div>
                </div>
                <div className={styles.startGrid}>
                    {startingPoints.map((item) => (
                        <Link key={item.title} className={styles.startCard} to={item.href}>
                            <span>{item.label}</span>
                            <Heading as='h3'>{item.title}</Heading>
                            <p>{item.description}</p>
                            <ArrowIcon/>
                        </Link>
                    ))}
                </div>
            </section>

            <nav className={styles.groupNav} aria-label='课程分类快速导航'>
                {courseGroups.map((group) => <a key={group.id} href={`#${group.id}`}>{group.title}</a>)}
            </nav>

            {courseGroups.map((group, groupIndex) => (
                <section key={group.id} id={group.id} className={styles.courseSection}>
                    <div className={styles.sectionIntro}>
                        <span className={`${styles.sectionIndex} ${styles[`sectionIndex_${group.tone}`]}`}>{String(groupIndex + 2).padStart(2, '0')}</span>
                        <div>
                            <span className={styles.groupEyebrow}>{group.eyebrow}</span>
                            <Heading as='h2'>{group.title}</Heading>
                            <p>{group.description}</p>
                        </div>
                    </div>
                    <div className={styles.courseGrid}>
                        {group.courses.map((course, index) => <CourseCard key={course.title} course={course} index={index} tone={group.tone}/>)}
                    </div>
                </section>
            ))}
        </div>
    )
}
