import {useEffect, useRef} from 'react'
import Layout from '@theme/Layout'
import * as THREE from 'three'

import styles from './index.module.css'

function cardNavigation(href) {
    const navigate = () => {
        const normalizedHref = href.startsWith('http') || href.startsWith('/') ? href : `/${href}`
        if (normalizedHref.startsWith('http')) {
            window.open(normalizedHref, '_blank', 'noopener,noreferrer')
        } else {
            window.location.assign(normalizedHref)
        }
    }

    return {
        role: 'link',
        tabIndex: 0,
        onClick: navigate,
        onKeyDown: (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                navigate()
            }
        },
    }
}

function RoadmapBackdrop() {
    const mountRef = useRef(null)

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return undefined

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 30)
        camera.position.set(0, 0, 8)

        let renderer
        try {
            renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
        } catch {
            return undefined
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        renderer.outputColorSpace = THREE.SRGBColorSpace
        mount.appendChild(renderer.domElement)

        const group = new THREE.Group()
        scene.add(group)

        const geometry = new THREE.BoxGeometry(1.15, 0.42, 0.22)
        const edgeGeometry = new THREE.EdgesGeometry(geometry)
        const colors = [0x2f80ed, 0x13a37b, 0xf2a33b, 0xe96556]
        const meshes = []

        for (let index = 0; index < 14; index += 1) {
            const material = new THREE.MeshStandardMaterial({
                color: colors[index % colors.length],
                transparent: true,
                opacity: 0.12,
                roughness: 0.62,
                metalness: 0.08,
            })
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.set(
                ((index % 4) - 1.5) * 2.35 + (index % 2 ? 0.32 : -0.18),
                (Math.floor(index / 4) - 1.4) * 1.7,
                -1.1 - (index % 3) * 0.45,
            )
            mesh.rotation.z = (index % 2 ? 1 : -1) * 0.045
            mesh.userData.offset = index * 0.7
            mesh.userData.baseY = mesh.position.y

            const edgeMaterial = new THREE.LineBasicMaterial({
                color: colors[index % colors.length],
                transparent: true,
                opacity: 0.2,
            })
            mesh.add(new THREE.LineSegments(edgeGeometry, edgeMaterial))
            group.add(mesh)
            meshes.push(mesh)
        }

        scene.add(new THREE.AmbientLight(0xffffff, 1.8))
        const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
        keyLight.position.set(4, 6, 8)
        scene.add(keyLight)

        const pointerTarget = {x: 0, y: 0}
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        let animationFrame = 0

        const resize = () => {
            const width = mount.clientWidth
            const height = mount.clientHeight
            if (!width || !height) return
            renderer.setSize(width, height, false)
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.render(scene, camera)
        }

        const handlePointerMove = (event) => {
            const bounds = mount.getBoundingClientRect()
            pointerTarget.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.13
            pointerTarget.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.09
        }

        const animate = (time) => {
            group.rotation.y += (pointerTarget.x - group.rotation.y) * 0.035
            group.rotation.x += (-pointerTarget.y - group.rotation.x) * 0.035
            meshes.forEach((mesh) => {
                mesh.position.y = mesh.userData.baseY + Math.sin(time * 0.00045 + mesh.userData.offset) * 0.035
            })
            renderer.render(scene, camera)
            animationFrame = window.requestAnimationFrame(animate)
        }

        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(mount)
        mount.parentElement?.addEventListener('pointermove', handlePointerMove)
        resize()
        if (!reducedMotion) animationFrame = window.requestAnimationFrame(animate)

        return () => {
            window.cancelAnimationFrame(animationFrame)
            resizeObserver.disconnect()
            mount.parentElement?.removeEventListener('pointermove', handlePointerMove)
            geometry.dispose()
            edgeGeometry.dispose()
            meshes.forEach((mesh) => {
                mesh.material.dispose()
                mesh.children.forEach((child) => child.material?.dispose())
            })
            renderer.dispose()
            renderer.domElement.remove()
        }
    }, [])

    return <div ref={mountRef} className={styles.roadmapBackdrop} aria-hidden='true'/>
}

export default function Home() {
    return (
        <Layout title='嵌入式Linux学习路线图' description='百问网嵌入式Linux应用、驱动、项目与系统移植课程学习路线。'>
            <div className={styles.roadmapViewport}>
              <div className={styles.scrollHint}>← 左右滑动查看完整学习路线 →</div>
              <div className={styles.roadmapContainer}>
                <RoadmapBackdrop/>
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
                                <div className={styles.whiteBox} {...cardNavigation('/docs/Linux-CourseList/ElinuxQuickBuildroot/Introduction')}>
                                    <div>裁剪移植根文件系统：</div>
                                    <div>使用Buildroot构建根文件系统</div>
                                </div>
                                <div className={styles.whiteBox1} {...cardNavigation('/docs/Linux-CourseList/eLinuxQuickROOTFS/Introduction')}>
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
                                <div className={styles.yellowBoxLarge2} {...cardNavigation('docs/Learn-Linux/LearnStudyPath')}>uboot裁剪移植</div>
                                <div className={styles.yellowBoxLarge1} {...cardNavigation('docs/Learn-Linux/LearnStudyPath')}>内核裁剪移植</div>
                                <div className={styles.right2} {...cardNavigation('/docs/Linux-CourseList/ElinuxQuickBuildroot/Introduction')}>
                                    <div>裁剪移植根文件系统：</div>
                                    <div>使用Buildroot构建根文件系统</div>
                                </div>
                                <div className={styles.right1} {...cardNavigation('/docs/Linux-CourseList/eLinuxQuickROOTFS/Introduction')}>
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
                                <div className={styles.redBoxLarge} {...cardNavigation('/docs/Linux-CourseList/QTIndustrialIoTOpenOCDModbus/Introduction')}>
                                    <div>QT工业物联网开发实践</div>
                                    <div>OpenOCD烧录与Modbus通信</div>
                                </div>
                                <div className={styles.redBoxLarge1} >
                                    <div className={styles.redLabel}></div>
                                    <div>推荐学习的项目</div>
                                </div>
                            </div>
                            <div className={styles.duiqi}>
                                <div className={styles.whiteBoxs} {...cardNavigation('/docs/Linux-CourseList/SmartHomeVideoSystem/Introduction')}>
                                    <div>手把手教你如何从零建</div>
                                    <div>智慧家居中的视频监控系统</div>
                                </div>
                                <div className={styles.redBoxLarges} {...cardNavigation('/docs/Linux-CourseList/ElinuxCamera/Introduction')}>嵌入式Linux相机</div>
                            </div>
                            <div className={styles.duiqi}>
                                <div className={styles.whiteBoxs} {...cardNavigation('/docs/Linux-CourseList/ELinuxMQTT/Introduction')}>
                                    <div>使用MQTT</div>
                                    <div>实现智能家居</div>
                                </div>
                                <div className={styles.whiteBox} {...cardNavigation('/docs/Linux-CourseList/ElinuxDigitalphotoFileBrowser/Introduction')}>
                                    <div>数码相框与</div>
                                    <div>文件浏览器</div>
                                </div>
                            </div>
                            <div className={styles.arrow}>
                            </div>
                            <div className={styles.yellowBorderedBox}></div>
                            <div className={styles.duiqi2}>
                                <div className={styles.whiteBoxs} {...cardNavigation('/docs/Linux-CourseList/lvgl_v8.2/Introduction')}>
                                    <div>百问网LVGL(v8)系列课程</div>
                                    <div>基于lvgl v8.2版本</div>
                                </div>
                                <div className={styles.whiteBox} {...cardNavigation('/docs/Linux-CourseList/ELinuxeBook/Introduction')}>
                                    <div>嵌入式Linux</div>
                                    <div>电子书阅读器</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.whiteBox3} {...cardNavigation('/docs/Linux-CourseList/Part6/Introduction')}>
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
                                <div className={styles.whiteBox6} {...cardNavigation('https://ldd.100ask.net')}>
                                    <div>驱动大全</div>
                                    <div className={styles.disflex}>(
                                        <div className={styles.red}>非常系统、深入</div>
                                        )
                                    </div>
                                </div>
                                <div className={styles.whiteBox5} {...cardNavigation('/docs/Linux-CourseList/Part5/Introduction')}>
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
                                    <div className={styles.whiteBoxWides} {...cardNavigation('/docs/Linux-CourseList/LLDQuick/Introduction')}>
                                        <div>嵌入式Linux驱动开发入门</div>
                                        <div className={styles.disflex}>实验班(
                                            <div className={styles.red}>套模块，快速</div>
                                            )
                                        </div>
                                    </div>
                                    <div className={styles.arrowheng}></div>
                                    <div className={styles.whiteBoxWide} {...cardNavigation('/docs/Linux-CourseList/27-70dayLinuxQuickDev/Introduction')}>
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
                                    <div className={styles.whiteBoxWides} {...cardNavigation('/docs/Linux-CourseList/ElinuxAPPQuick/Introduction')}>
                                        <div>嵌入式Linux应用开发入门</div>
                                        <div className={styles.disflex}>实验班(
                                            <div className={styles.red}>快速做第1个项目</div>
                                            )
                                        </div>
                                    </div>
                                    <div className={styles.arrowheng}></div>
                                    <div className={styles.whiteBoxWide} {...cardNavigation('/docs/Linux-CourseList/Part4/Introduction')}>
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
                                    <div className={styles.whiteBoxWides} {...cardNavigation('/docs/Linux-CourseList/Part2/Introduction')}>
                                        <div>第2篇</div>
                                        <div>安装虚拟机/Ubuntu基本操作</div>
                                    </div>
                                    <div className={styles.arrowheng}></div>
                                    <div className={styles.whiteBoxWide} {...cardNavigation('/docs/Linux-CourseList/Part3/Introduction')}>
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
                                <div className={styles.whiteBoxLarge} {...cardNavigation('/docs/Linux-CourseList/CLanguageBasic/Introduction')}>
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
            </div>
        </Layout>
    )
}
