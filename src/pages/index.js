import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'

import Heading from '@theme/Heading'
import styles from './index.module.css'

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext()
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className='container'>
                <Heading as='h1' className='hero__title'>
                    {siteConfig.title}
                </Heading>
                <p className='hero__subtitle'>{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link className='button button--secondary button--lg' to='/docs/intro'>
                        开启您的嵌入式开发之旅 🚆
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext()
    return (
        <Layout title={`Hello from ${siteConfig.title}`} description='Description will go into a meta tag in <head />'>
            <div className={styles.roadmapContainer}>
                <div className={styles.roadmapSection}>
                    <div className={styles.roadmapRow}>
                        <div className={styles.roadmapHalf}>
                            <div className={styles.roadmapTop}>
                                <div className={styles.cloudTitle}>
                                    <img src="/img/9.jpg" alt="最后：根文件系统" className={styles.cloudImage3}/>
                                </div>
                                <div className={styles.characterContainer}>
                                    <div className={styles.character}></div>
                                </div>
                            </div>
                            <div className={styles.boxContainer}>
                                <div className={styles.whiteBox} onClick={() => {window.open('')}}>
                                    <div>裁剪移植根文件系统：</div>
                                    <div>使用Buildroot构建根文件系统</div>
                                </div>
                                <div className={styles.whiteBox1} onClick={() => {window.open('')}}>
                                    <div>裁剪移植根文件系统：</div>
                                    <div>使用Busybox构建根文件系统</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.roadmapHalf2}>
                            <div className={styles.roadmapTopRight}>
                                <div className={styles.cloudTitle}>
                                    <img src="/img/8.jpg" alt="最后：系统移植" className={styles.cloudImage4}/>
                                </div>
                                <div className={styles.characterContainer}>
                                    <div className={styles.meditatingCharacter}></div>
                                </div>
                            </div>
                            <div className={styles.boxContainer}>
                                <div className={styles.disflex}>
                                    <div className={styles.yellowBox}></div>
                                    <div>未录制</div>
                                </div>
                                <div className={styles.yellowBoxLarge2} onClick={() => {window.open('')}}>uboot裁剪移植</div>
                                <div className={styles.yellowBoxLarge1} onClick={() => {window.open('')}}>内核裁剪移植</div>
                                <div className={styles.right2} onClick={() => {window.open('')}}>
                                    <div>裁剪移植根文件系统：</div>
                                    <div>使用Buildroot构建根文件系统</div>
                                </div>
                                <div className={styles.right1} onClick={() => {window.open('')}}>
                                    <div>裁剪移植根文件系统：</div>
                                    <div>使用Busybox构建根文件系统</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 分隔线 */}
                    <div className={styles.xuexi}>各个项目关联技术学习</div>

                    <div className={styles.line}></div>

                    {/* 第二行：项目和路线 */}
                    <div className={styles.roadmapRow}>
                        <div className={styles.projectSection}>
                            <div className={styles.duiqi1}>
                                <div className={styles.redBoxLarge} onClick={() => {window.open('')}}>
                                    <div>QT工业物联网开发实践</div>
                                    <div>OpenOCD烧录与Modbus通信</div>
                                </div>
                                <div className={styles.redBoxLarge1} onClick={() => {window.open('')}}>
                                    <div className={styles.redLabel}></div>
                                    <div>推荐学习的项目</div>
                                </div>
                            </div>
                            <div className={styles.duiqi}>
                                <div className={styles.whiteBoxs} onClick={() => {window.open('')}}>
                                    <div>手把手教你如何从零建</div>
                                    <div>智慧家居中的视频监控系统</div>
                                </div>
                                <div className={styles.redBoxLarges} onClick={() => {window.open('')}}>嵌入式Linux相机</div>
                            </div>
                            <div className={styles.duiqi}>
                                <div className={styles.whiteBoxs} onClick={() => {window.open('')}}>
                                    <div>使用MQTT</div>
                                    <div>实现智能家居</div>
                                </div>
                                <div className={styles.whiteBox} onClick={() => {window.open('')}}>
                                    <div>数码相框与</div>
                                    <div>文件浏览器</div>
                                </div>
                            </div>
                            <div className={styles.arrow}>
                            </div>
                            <div className={styles.yellowBorderedBox}></div>
                            <div className={styles.duiqi2} onClick={() => {window.open('')}}>
                                <div className={styles.whiteBoxs}>
                                    <div>百问网LVGL(v8)系列课程</div>
                                    <div>基于lvgl v8.2版本</div>
                                </div>
                                <div className={styles.whiteBox} onClick={() => {window.open('')}}>
                                    <div>嵌入式Linux</div>
                                    <div>电子书阅读器</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.whiteBox3} onClick={() => {window.open('')}}>
                            <div>第6篇</div>
                            <div>嵌入式Linux项目基础</div>
                        </div>

                        <div className={styles.roadmapMiddle}>
                            <div className={styles.yinyong}>
                                <div className={styles.cloudTitle}>
                                    <img src="/img/7.jpg" alt="应用开发路线" className={styles.cloudImage}/>
                                </div>
                                <div className={styles.characterContainer}>
                                    <div className={styles.character}></div>
                                </div>
                            </div>

                            <div className={styles.genju}>
                                <div className={styles.cloudTitle}>
                                    <img src="/img/5.jpg" alt="再根据路线学习" className={styles.cloudImage1}/>
                                </div>
                                <div className={styles.characterContainer}>
                                    <div className={styles.study}></div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.twoRight}>
                            <div className={styles.roadmapTwoRight}>
                                <div className={styles.cloudTitle}>
                                    <img src="/img/6.jpg" alt="驱动开发路线" className={styles.cloudImage}/>
                                </div>
                                <div className={styles.characterContainer}>
                                    <div className={styles.meditatingCharacter}></div>
                                </div>
                            </div>
                            <div className={styles.boxContainer}>
                                <div className={styles.disflex}>
                                    <div className={styles.greenBox}></div>
                                    <div>收费</div>
                                </div>
                                <div className={styles.whiteBox6} onClick={() => {window.open('')}}>
                                    <div>驱动大全</div>
                                    <div className={styles.disflex}>(
                                        <div className={styles.red}>非常系统、深入</div>
                                        )
                                    </div>
                                </div>
                                <div className={styles.whiteBox5} onClick={() => {window.open('')}}>
                                    <div className={styles.disflex}>第5篇(
                                        <div className={styles.red}>各类理论</div>
                                        )
                                    </div>
                                    <div>嵌入式Linux驱动开发基础知识</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 分隔线 */}
                    <div className={styles.dividerLine}></div>

                    {/* 第三行：基础学习 */}
                    <div className={styles.roadmapRow}>
                        <div className={styles.leftSection}>
                            <div className={styles.cloudTitle}>
                                <img src="/img/4.jpg" alt="先学基础" className={styles.cloudImage}/>
                            </div>
                            <div className={styles.characterContainer}>
                                <div className={styles.meditatingCharacter}></div>
                            </div>
                        </div>
                        <div className={styles.rightSection}>
                            <div className={styles.learningPath}>
                                <div className={styles.boxItem1}>
                                    <div className={styles.whiteBoxWides} onClick={() => {window.open('')}}>
                                        <div>嵌入式Linux驱动开发入门</div>
                                        <div className={styles.disflex}>实验班(
                                            <div className={styles.red}>套模块，快速</div>
                                            )
                                        </div>
                                    </div>
                                    <div className={styles.arrowheng}></div>
                                    <div className={styles.whiteBoxWide} onClick={() => {window.open('')}}>
                                        <div>70天30节Linux驱动开发</div>
                                        <div className={styles.disflex}>快速入门系列课程(
                                            <div className={styles.red}>非常细</div>
                                            )
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.labelBox}>
                                    <div>驱动</div>
                                    <div>基础</div>
                                </div>
                            </div>
                            <div className={styles.learningPath}>
                                <div className={styles.boxItem2}>
                                    <div className={styles.whiteBoxWides} onClick={() => {window.open('')}}>
                                        <div>嵌入式Linux应用开发入门</div>
                                        <div className={styles.disflex}>实验班(
                                            <div className={styles.red}>快速做第1个项目</div>
                                            )
                                        </div>
                                    </div>
                                    <div className={styles.arrowheng}></div>
                                    <div className={styles.whiteBoxWide} onClick={() => {window.open('')}}>
                                        <div className={styles.disflex}>第4篇(
                                            <div className={styles.red}>各类基础</div>
                                            )
                                        </div>
                                        <div>嵌入式Linux应用开发基础知识</div>
                                    </div>
                                </div>
                                <div className={styles.labelBox}>
                                    <div>应用</div>
                                    <div>基础</div>
                                </div>
                            </div>
                            <div className={styles.learningPath}>
                                <div className={styles.boxItem3}>
                                    <div className={styles.whiteBoxWides} onClick={() => {window.open('')}}>
                                        <div>第2篇</div>
                                        <div>安装虚拟机/Ubuntu基本操作</div>
                                    </div>
                                    <div className={styles.arrowheng}></div>
                                    <div className={styles.whiteBoxWide} onClick={() => {window.open('')}}>
                                        <div>第3篇</div>
                                        <div>环境搭建与开发板操作</div>
                                    </div>
                                </div>
                                <div className={styles.labelBox}>
                                    <div>基础</div>
                                    <div>操作</div>
                                </div>
                            </div>
                            <div className={styles.disflex}>
                                <div className={styles.whiteBoxLarge} onClick={() => {window.open('')}}>
                                    <div>C语言基础语法与STM32实践</div>
                                </div>
                                <div className={styles.labelBox}>
                                    <div>C语言</div>
                                    <div>基础</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
